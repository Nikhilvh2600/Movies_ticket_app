from django.shortcuts import render, redirect
from movies.models import Movie
from accounts.models import User
from bookings.models import Booking, BookingSeats
from payments.models import Payments
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from datetime import timedelta

# Create your views here.

def home(request):
    movies = Movie.objects.all()
    context = {
        'movies': movies
    }
    return render(request, 'dashboard/home.html', context)

@login_required
def your_orders(request):
    user = User.objects.get(username=request.user)
    bookings = Booking.objects.filter(user=user, booking_status='booked').order_by('-booking_time')
    
    ticket = {}
    for booking in bookings:
        payment = Payments.objects.filter(booking=booking).first()
        if payment:
            ticket[payment.id] = BookingSeats.objects.filter(booking=booking)

        showtime = booking.showtime.show_time
        now = timezone.now()
        time_difference = showtime - now
        booking.can_cancel = timedelta(minutes=0) < time_difference <= timedelta(minutes=60)


    context = {
        'bookings': bookings,
        'ticket': ticket,
        'user': user,
    }
    return render(request, 'dashboard/your_orders.html', context)


def search_view(request):
    if request.method == 'POST':
        search_query = request.POST['search_query']
        movies = Movie.objects.filter(title__icontains=search_query)
        context = {'movies':movies }
        return render(request,'dashboard/search.html',context)
    return redirect('home')


from django.http import JsonResponse

@login_required
def profile_view(request):
    if request.method == 'POST' and request.headers.get('x-requested-with') == 'XMLHttpRequest':
        user = request.user
        profile = getattr(user, 'profile', None)

        user.first_name = request.POST.get('first_name', '')
        user.last_name = request.POST.get('last_name', '')
        user.email = request.POST.get('email', '')

        if profile:
            profile.phone_number = request.POST.get('phone_number', '')
            profile.location = request.POST.get('location', '')
            profile.save()

        user.save()

        return JsonResponse({'status': 'success', 'message': 'Profile updated successfully!'})

    # GET request — fetch booking data
    bookings = Booking.objects.filter(user=request.user).select_related('showtime__movie', 'showtime__theater')
    booking_data = []

    for booking in bookings:
        seats = BookingSeats.objects.filter(booking=booking).select_related('seat')
        seat_labels = [seat.seat.label for seat in seats if seat.seat]
        booking_data.append({
            'movie_title': booking.showtime.movie.title,
            'theater_name': booking.showtime.theater.name,
            'show_time': booking.showtime.show_time,
            'seats': seat_labels,
            'status': booking.booking_status,
            'id': booking.id,
        })

    return render(request, 'dashboard/profile.html', {'user': request.user, 'booking_data': booking_data})


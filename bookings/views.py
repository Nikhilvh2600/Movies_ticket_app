from django.shortcuts import render,redirect,HttpResponse
from theater.models import Theaters, Showtimes, Seats
from accounts.models import User
from movies.models import Movie
from datetime import datetime,timedelta,date
from .models import Showtimes, Booking, Seats, BookingSeats
import json
from django.conf import settings
import stripe
from django.contrib import messages
from django.contrib.auth.decorators import login_required

stripe.api_key = settings.STRIPE_SECRET_KEY

def threater_show_time_view(request,slug):
    today = datetime.today().date()
    start_date = today - timedelta(days=today.weekday()-today.weekday())
    week = []
    for i in range(7):
        day = start_date + timedelta(days=i)
        week.append({
            'name' : day.strftime('%a').upper(),
            'day' : day.day,
            'month' :day.strftime('%b').upper(),
            'date': day,
        })
        
    if Movie.objects.filter(slug=slug).exists():
        movie = Movie.objects.get(slug=slug)
        theater_showtimes =[
            Showtimes.objects.filter(movie=movie, theater=theater).order_by('show_time')
            for theater in Theaters.objects.all() if Showtimes.objects.filter(movie=movie, theater=theater).exists() 
            ]
        context = {
            'theater_showtimes' : theater_showtimes,
            'week' : week,
            'today' : today,
        }
        return render(request, 'theater/theater_showtime_list.html', context)
    return render(request, 'theater/404.html', status=404)
        
@login_required(login_url='/accounts/signin/')
def theater_show_time_selected_date_view(request,slug,date_str):
    try:
        selected_date = datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        selected_date = datetime.today().date()
    print(selected_date)
    today = datetime.today().date()
    start_date = today - timedelta(days=0)
    week = []
    for i in range(7):
        day = start_date + timedelta(days=i)
        week.append({
            'name' : day.strftime('%a').upper(),
            'day' : day.day,
            'month' :day.strftime('%b').upper(),
            'date': day,
        })

    if Movie.objects.filter(slug=slug).exists():
        movie = Movie.objects.get(slug=slug)
        default_time_slots = ['12:00', '15:30', '18:30']
        for theater in Theaters.objects.all():
            for time_str in default_time_slots:
                show_datetime = datetime.combine(selected_date, datetime.strptime(time_str, '%H:%M').time())
                if not Showtimes.objects.filter(movie=movie, theater=theater, show_time=show_datetime).exists():
                    Showtimes.objects.create(
                        movie=movie,
                        theater=theater,
                        show_time=show_datetime,
                        screen_number=1
                    )

        theater_showtimes = [
            Showtimes.objects.filter(movie=movie, theater=theater, show_time__date=selected_date).order_by('show_time')
            for theater in Theaters.objects.all() if Showtimes.objects.filter(movie=movie, theater=theater, show_time__date=selected_date).exists()
        ]
        context = {
            'theater_showtimes' : theater_showtimes,
            'week' : week,
            'today' : selected_date,
            'slug' : slug,
        }
        return render(request, 'theater/theater_showtime_list.html', context)
    return render(request, 'movies/404.html')


def seat_selection_view(request, showtime_id):
    showtime = Showtimes.objects.get(id=showtime_id)

    all_seats = Seats.objects.filter(
        theater=showtime.theater,
        screen_number=showtime.screen_number
    ).order_by('row_label', 'seat_number')

    # Fetch booked seat IDs for this showtime
    booked_seat_ids = BookingSeats.objects.filter(
        booking__showtime=showtime,
        booking__booking_status='booked'  # assuming 'booked' is the active status
    ).values_list('seat__id', flat=True)

    # Organize seats by row
    seat_rows = {}
    for seat in all_seats:
        row = seat.row_label
        if row not in seat_rows:
            seat_rows[row] = []
        seat_rows[row].append(seat)

    # Sort each row by seat_number
    for row in seat_rows:
        seat_rows[row] = sorted(seat_rows[row], key=lambda x: int(x.seat_number))

    context = {
        'showtime': showtime,
        'seat_rows': seat_rows,
        'booked_seat_ids': list(booked_seat_ids),  # pass to template
    }
    return render(request, 'theater/seating.html', context)



def book_ticket_view(request, showtime_id):
    if request.method == "POST":
        selected_seats = json.loads(request.POST['selected_seats'])
        total_amount = int(request.POST['total_amount'])
        
        tickets = []
        showtime = Showtimes.objects.get(id=showtime_id)
        user = User.objects.get(username=request.user)
        

        booking = Booking.objects.create(
            user=user,
            showtime=showtime,
            total_amount=total_amount,
            booking_status="pending"
        )
        

        for seat in selected_seats:
            tickets.append(seat["key"])
            seat_id = seat["id"]
            seat_obj = Seats.objects.get(id=seat_id)
            BookingSeats.objects.create(booking=booking, seat=seat_obj)
        
        context = {
            'convenience_fee': 49,
            'showtime': showtime,
            'total_amount': total_amount,
            'sub_total': total_amount + 49,
            'ticket': tickets,
            'booking': booking,
            'stripe_public_key':settings.STRIPE_PUBLIC_KEY
        }
        
        print(booking)
        return render(request, 'payments/proceed_to_payment.html', context)
    
    return HttpResponse("Invalid Request")


@login_required(login_url='/accounts/signin/')
def cancel_booking(request, booking_id):
    booking = Booking.objects.get(id=booking_id)
    booking.booking_status = 'Cancelled'
    booking.save()
    qs=BookingSeats.objects.filter(booking=booking)
    qs.delete()
    messages.error(request, 'Booking cancelled successfully. And your amount will be refunded in 7-10 working days.')
    return redirect('your_orders')



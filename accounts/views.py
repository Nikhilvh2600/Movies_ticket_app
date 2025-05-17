from django.shortcuts import render, redirect
from .forms import RegisterForm,LoginForm
from .utils import get_otp
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages

def registerview(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.otp = get_otp()
            user.save()

            username = form.cleaned_data['username']
            email = form.cleaned_data['email']

            send_mail(
                'Registration successful',
                f'{username}, you have successfully created an account in MovieZone!',
                'nikhilvh2600@gmail.com',
                [email],
                fail_silently=True
            )

            return redirect('home')  
    else:
        form = RegisterForm()

    context = {
        'registerform': form
    }
    return render(request, 'accounts/register.html', context)


def LoginView(request):
    context = {
        'LoginForm': LoginForm()
    }

    if request.method == 'POST':
        fm = LoginForm(data=request.POST)
        if fm.is_valid():
            username = fm.cleaned_data['username']
            password = fm.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None and user.is_authenticated:
                login(request, user)
                messages.success(request,f'logged in as {username}')
                return redirect("allmovies")

    return render(request, 'accounts/login.html', context)


def logoutViews(request):
    logout(request)
    messages.success(request, 'You have been logged out.')
    return redirect('allmovies')


@login_required(login_url='/accounts/signin/')


def home(request):
    return render(request, 'accounts/home.html')
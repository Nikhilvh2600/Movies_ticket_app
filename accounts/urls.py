from django.urls import path
from .import views

urlpatterns = [
    path('register/', views.registerview, name='register'),  
    path ('home/',views.home,name='home'),
    path ('signin/',views.LoginView,name='signin'),
    path('logout/', views.logoutViews, name='logout'),
]
from django.urls import path
from . import views

urlpatterns = [
    path('your-orders/', views.your_orders, name='your_orders'),
    path('search/',views.search_view,name='search'),
    path('profile/',views.profile_view,name='profile'), 
]
from django.urls import path
from . import views

urlpatterns = [
    path('add/<slug>/', views.add_review, name='add_review'),
    path('review/delete/<int:review_id>/', views.delete_review, name='delete_review'),

]
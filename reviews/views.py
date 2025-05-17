from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from .models import Reviews
from accounts.models import User
from movies.models import Movie
from django.contrib.auth.decorators import login_required

@login_required(login_url='/accounts/signin/')
def add_review(request, slug):
    user = request.user
    movie = get_object_or_404(Movie, slug=slug)

    if request.method == 'POST':
        rating = request.POST["rating"]
        review_text = request.POST["review_text"]

        Reviews.objects.create(user=user, movie=movie, rating=rating, review_text=review_text)
        return redirect(f"/movie/{slug}/")

    return render(request, "reviews/add_review.html")

 
def delete_review(request, review_id):
    review = get_object_or_404(Reviews, review_id=review_id)

    if request.method == 'POST':
        review.delete()

    return redirect(f"/movie/{review.movie.slug}/")


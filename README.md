# 🎬 CineStream – OTT Booking & Streaming Platform

**CineStream** is a full-stack web application inspired by platforms like *BookMyShow*, offering users the ability to register, browse movies, book/cancel tickets, and stream content — all with real-time notifications and email integrations.

---

## 🚀 Features

### 👤 User Authentication
- Secure **user registration** and **login** with form validation.
- Email confirmation sent upon successful registration.
- Password validation and error-handling mechanisms.

### 🎞️ Movie Listings & Details
- Dynamic movie listing page with title, genre, duration, language, and poster.
- Each movie has a dedicated detail page displaying:
  - Movie description
  - Available showtimes
  - Book button for each showtime

### 🎟️ Ticket Booking System
- Registered users can select showtimes and book tickets.
- Pop-up (toast) notifications for successful ticket bookings.
- Email confirmation is sent with showtime and seat details.

### ❌ Ticket Cancellation
- Users can view and cancel booked tickets.
- Tickets can only be cancelled **at least 1 hour before showtime**.
- Cancellation confirmation via:
  - Pop-up message
  - Email notification

### 🎥 Movie Streaming
- After booking, users get access to stream the movie directly.
- Access control ensures only ticket holders can stream.

### ✉️ Real-Time Notifications
- All critical user actions (signup, booking, cancellation) trigger:
  - In-app popup messages (JavaScript/Bootstrap Toasts)
  - Automated emails using **SMTP** with Django’s built-in system

---

## 🛠️ Tech Stack

| Category        | Technology                             |
|----------------|-----------------------------------------|
| Backend         | Python, Django, Django ORM              |
| Frontend        | HTML5, CSS3, JavaScript, Bootstrap      |
| Database        | SQLite3 (default, can be swapped)       |
| Authentication  | Django Auth                             |
| Notifications   | SMTP (Email), JavaScript Toasts         |
| Version Control | Git + GitHub                            |

---

## 📂 Project Structure (Simplified)
movie_ticket_booking/
│
├── book_movie_tickets/ # Main Django app
│ ├── models.py # Models: User, Movie, Show, Booking
│ ├── views.py # Views and core logic
│ ├── urls.py # URL patterns
│ ├── templates/ # HTML templates
│ └── static/ # Static assets (JS, CSS, images)
│
├── templates/ # Global base templates
├── .env # (DO NOT COMMIT) Secret keys & credentials
├── requirements.txt # Python dependencies
└── manage.py

## 🧪 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/krakesh1309/movie_ticket_.git
cd movie_ticket_
2. Set up a virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate (Windows)
3. Install dependencies
bash
Copy
Edit
pip install -r requirements.txt
4. Set up .env file
Create a .env file and store sensitive variables (like SMTP credentials) there:

ini
Copy
Edit
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_email_password
SECRET_KEY=your_django_secret_key
5. Run the server
bash
Copy
Edit
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
Visit: http://127.0.0.1:8000

📧 Notifications
Action	Notification Method
Registration	Email + Popup
Ticket Booking	Email + Popup
Ticket Cancellation	Email + Popup (with time logic)

🔐 Security Notes
All passwords are hashed securely using Django.

Push protection enabled to avoid secret leaks.

Environment variables handled using .env (keep it out of version control).

📌 Future Enhancements
Role-based admin panel (movie upload, user management).

Razorpay/Stripe integration for paid bookings.
Reviews and ratings for each movie.



📬 Contact
Rakesh Kumar
📍 Bangalore, Karnataka
📧 sprakesh4114@gmail.com
🔗 LinkedIn | GitHub


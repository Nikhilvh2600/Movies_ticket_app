
  // Animation with GSAP
document.addEventListener('DOMContentLoaded', function () {
  // Animate header
  gsap.to('header', {
    opacity: 1,
    duration: 1,
    ease: "power3.out"
  });

  // Animate tickets with stagger
  gsap.to('.ticket', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)",
    delay: 0.5
  });

  // Animate empty state
  gsap.to('.empty-state', {
    opacity: 1,
    duration: 1,
    delay: 0.5,
    ease: "power2.out"
  });

  // Hover effect for tickets
  const tickets = document.querySelectorAll('.ticket');
  tickets.forEach(ticket => {
    ticket.addEventListener('mouseenter', function () {
      gsap.to(this, {
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
        duration: 0.3
      });
    });

    ticket.addEventListener('mouseleave', function () {
      gsap.to(this, {
        scale: 1,
        boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
        duration: 0.3
      });
    });
  });

  // Download PDF logic (Dummy for now, replace with actual functionality)
  const downloadButtons = document.querySelectorAll('.button-secondary');
  downloadButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      alert('PDF download feature is not yet implemented.');
    });
  });

  // Placeholder for QR Code generation (Dummy for now, replace with actual QR logic)
  const qrPlaceholders = document.querySelectorAll('.qr-placeholder');
  qrPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', function () {
      alert('QR Code will be generated here.');
    });
  });

  // Button animation for cancel ticket
  const cancelButtons = document.querySelectorAll('.button-primary');
  cancelButtons.forEach(button => {
    button.addEventListener('click', function () {
      if (confirm('Are you sure you want to cancel this booking?')) {
        // Call Django URL for cancellation (for now, it just alerts)
        alert('Your booking has been canceled.');
        // Optionally, you can use AJAX to cancel the booking and reload the page
        // Example: make an AJAX call to cancel booking:
        // $.ajax({
        //   url: button.href, // URL where the cancellation is handled
        //   type: 'POST',
        //   success: function(response) {
        //     alert('Booking canceled.');
        //     location.reload(); // Reload to update the view
        //   },
        //   error: function(error) {
        //     alert('Error canceling booking.');
        //   }
        // });
      }
    });
  });

  // Shimmer effect for seat badges (already applied in CSS, but you can trigger from JS if needed)
  const seatBadges = document.querySelectorAll('.seat-badge');
  seatBadges.forEach(seat => {
    seat.addEventListener('mouseenter', function () {
      gsap.to(this, {
        scale: 1.1,
        duration: 0.2
      });
    });

    seat.addEventListener('mouseleave', function () {
      gsap.to(this, {
        scale: 1,
        duration: 0.2
      });
    });
  });

  // Optional: Handle window resize to re-trigger animations (if needed)
  window.addEventListener('resize', function () {
    gsap.to('.ticket', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)",
      delay: 0.5
    });
  });
});
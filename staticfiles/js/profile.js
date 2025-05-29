
// Tab Switching
document.querySelectorAll('.profile-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    const tabId = tab.dataset.tab;
    const tabContent = document.getElementById(tabId);
    if (tabContent) {
      tabContent.classList.add('active');
    }
  });
});

// AJAX Profile Save
const profileForm = document.getElementById('profile-form');
if (profileForm) {
  profileForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const csrfToken = form.querySelector('[name=csrfmiddlewaretoken]').value;

    const data = new FormData(form);

    // Disable button while saving
    if (submitBtn) submitBtn.disabled = true;

    fetch("{% url 'profile' %}", {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken,
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: data
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        alert(data.message);

        // Update the details section
        const fullName = `${form.first_name.value} ${form.last_name.value}`;
        const email = form.email.value;
        const phone = form.phone_number.value || "Not provided";
        const location = form.location.value || "Not provided";

        const liveDetails = document.getElementById('live-details');
        if (liveDetails) {
          liveDetails.innerHTML = `
            <li><strong>Full Name:</strong> ${fullName}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Location:</strong> ${location}</li>
          `;
        }
      } else {
        alert('Error: ' + (data.message || 'Could not update profile.'));
      }
    })
    .catch(err => {
      console.error('AJAX error:', err);
      alert('Something went wrong.');
    })
    .finally(() => {
      // Re-enable button
      if (submitBtn) submitBtn.disabled = false;
    });
  });
}
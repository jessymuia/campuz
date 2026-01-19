// forms.js - Incident report form handling and validation (no auto-reply)

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

function validateIncidentForm(form) {
  const type = form.querySelector('#incidentType').value.trim();
  const desc = form.querySelector('#description').value.trim();
  const contact = form.querySelector('#contact').value.trim();
  let errors = [];

  if (!type) errors.push("Please select an incident type.");
  if (!desc) errors.push("Description is required.");
  if (contact && !validateEmail(contact)) errors.push("Invalid email format.");

  return errors;
}

async function submitIncidentReport(form) {
  const errors = validateIncidentForm(form);
  const feedback = form.querySelector('.form-feedback');
  feedback.innerHTML = '';

  if (errors.length > 0) {
    feedback.innerHTML = errors.map(e => `<div class="error">${e}</div>`).join('');
    return false;
  }

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      feedback.innerHTML = `<div class="success">✅ Thank you for reporting! Your information has been submitted anonymously. We'll review this threat shortly.</div>`;
      form.reset();
    } else {
      feedback.innerHTML = `<div class="error">❌ There was a problem submitting your report. Please try again later.</div>`;
    }
  } catch (error) {
    feedback.innerHTML = `<div class="error">⚠️ Network error. Please check your connection.</div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('incidentForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      this.querySelector('[type="submit"]').disabled = true;
      submitIncidentReport(this).finally(() => {
        setTimeout(() => {
          this.querySelector('[type="submit"]').disabled = false;
        }, 2000);
      });
    });
  }
});

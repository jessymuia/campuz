// core.js - Shared utilities (hamburger menu, etc.)

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link (mobile)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('active');
      });
    });
  }

  // Optional: Populate threat alerts (static example – replace with real fetch if needed)
  const alertsGrid = document.getElementById('threatAlerts');
  if (alertsGrid) {
    alertsGrid.innerHTML = `
      <div class="alert-card">
        <h3>⚠️ Active Phishing Campaign</h3>
        <p>Fake M-Pesa SMS messages circulating. Do not click links or reply.</p>
      </div>
      <div class="alert-card">
        <h3>🔐 Password Reset Scam</h3>
        <p>Emails pretending to be from university IT asking for credentials.</p>
      </div>
    `;
  }

  // Handle preloader
// preloader.js
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  
  // Add a small delay for better visual effect
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1500); // Show for 1.5 seconds minimum
});
  // Initialize AOS directly if preloader doesn't exist
  if (typeof AOS !== 'undefined' && !preloader) {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }
});
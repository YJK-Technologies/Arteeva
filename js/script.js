/**
 * ARTEEVA - Consultants & Contractors
 * Master Vanilla JavaScript Controller
 */

'use strict';

// Global Configuration
const CONFIG = {
  companyName: "ARTEEVA",
  companyEmail: "yjktechnologiesdev@gmail.com",
  phone: "+91 7305443860",
  address: "ARTEEVA Towers, Plot 42, Prime Industrial & Commercial Zone",
  location: "Kanyakumari District, Tamil Nadu, India",
  workingHours: "Monday - Saturday: 8:30 AM - 6:30 PM",
  // Google Apps Script Web App Endpoint:
  // Follow instructions in README.md to deploy your script and paste the URL below
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbxaKbkzV6hm1nwb4jknYxU53UzBQnNY6AfPEZt705EUU0YyhdTxprzv29L7D95c-vCl/exec" 
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbarBehavior();
  initActiveNavLink();
  initStatCounters();
  initProjectFiltering();
  initContactForm();
  initScrollAnimations();
  initBackToTop();
});

/**
 * 1. Navbar Scroll & Mobile Menu Handling
 */
function initNavbarBehavior() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Auto-close mobile navbar on link click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .nav-cta-btn');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        } else {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });
}

/**
 * 2. Active Navigation State Detection
 */
function initActiveNavLink() {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.navbar-custom .nav-link');
  
  // Clean path to extract filename (e.g., 'about.html')
  let pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  if (pageName === '' || pageName === '/') pageName = 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    const targetFile = href.substring(href.lastIndexOf('/') + 1) || 'index.html';

    if (pageName === targetFile || (pageName === 'index.html' && (targetFile === 'index.html' || targetFile === './' || targetFile === ''))) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * 3. Animated Demonstration Stat Counters
 */
function initStatCounters() {
  const statElements = document.querySelectorAll('[data-counter-target]');
  if (!statElements.length) return;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetEl = entry.target;
        const targetValue = parseInt(targetEl.getAttribute('data-counter-target'), 10);
        const suffix = targetEl.getAttribute('data-counter-suffix') || '';
        const duration = 1600; // ms
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentCount = Math.floor(easeProgress * targetValue);

          targetEl.textContent = currentCount + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            targetEl.textContent = targetValue + suffix;
          }
        };

        requestAnimationFrame(updateCounter);
        observer.unobserve(targetEl);
      }
    });
  }, { threshold: 0.25 });

  statElements.forEach(el => counterObserver.observe(el));
}

/**
 * 4. Interactive Project Category Filtering (projects.html)
 */
function initProjectFiltering() {
  const filterButtons = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-item-col');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter') || 'all';

      projectCards.forEach(col => {
        const category = col.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          col.style.display = 'block';
          col.classList.add('fade-up', 'visible');
        } else {
          col.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 5. Contact Form Validation & Google Apps Script Submission
 */
function initContactForm() {
  const form = document.getElementById('arteevaContactForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');
  const successAlert = document.getElementById('formSuccessAlert');
  const errorAlert = document.getElementById('formErrorAlert');
  const errorMessageText = document.getElementById('errorMessageText');

  // Input validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^[\d\s+\-()]{8,20}$/;

  const validateField = (input, condition, feedbackId) => {
    const feedbackEl = document.getElementById(feedbackId);
    if (!condition) {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      if (feedbackEl) feedbackEl.style.display = 'block';
      return false;
    } else {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (feedbackEl) feedbackEl.style.display = 'none';
      return true;
    }
  };

  // Live input validation listeners
  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('emailAddress');
  const phoneInput = document.getElementById('phoneNumber');
  const projectTypeInput = document.getElementById('projectType');
  const locationInput = document.getElementById('projectLocation');
  const serviceInput = document.getElementById('serviceRequired');
  const messageInput = document.getElementById('projectMessage');

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      validateField(nameInput, nameInput.value.trim().length >= 2, 'nameFeedback');
    });
  }
  if (emailInput) {
    emailInput.addEventListener('input', () => {
      validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'emailFeedback');
    });
  }
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      validateField(phoneInput, phoneRegex.test(phoneInput.value.trim()), 'phoneFeedback');
    });
  }
  if (projectTypeInput) {
    projectTypeInput.addEventListener('input', () => {
      validateField(projectTypeInput, projectTypeInput.value.trim().length >= 2, 'projectTypeFeedback');
    });
  }
  if (locationInput) {
    locationInput.addEventListener('input', () => {
      validateField(locationInput, locationInput.value.trim().length >= 2, 'locationFeedback');
    });
  }
  if (serviceInput) {
    serviceInput.addEventListener('change', () => {
      validateField(serviceInput, serviceInput.value.trim() !== '', 'serviceFeedback');
    });
  }
  if (messageInput) {
    messageInput.addEventListener('input', () => {
      validateField(messageInput, messageInput.value.trim().length >= 10, 'messageFeedback');
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset previous alerts
    if (successAlert) successAlert.classList.add('d-none');
    if (errorAlert) errorAlert.classList.add('d-none');

    // Run complete validation
    const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2, 'nameFeedback');
    const isEmailValid = validateField(emailInput, emailRegex.test(emailInput.value.trim()), 'emailFeedback');
    const isPhoneValid = validateField(phoneInput, phoneRegex.test(phoneInput.value.trim()), 'phoneFeedback');
    const isProjectTypeValid = validateField(projectTypeInput, projectTypeInput.value.trim().length >= 2, 'projectTypeFeedback');
    const isLocationValid = validateField(locationInput, locationInput.value.trim().length >= 2, 'locationFeedback');
    const isServiceValid = validateField(serviceInput, serviceInput.value.trim() !== '', 'serviceFeedback');
    const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10, 'messageFeedback');

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isProjectTypeValid || !isLocationValid || !isServiceValid || !isMessageValid) {
      if (errorAlert) {
        errorMessageText.textContent = "Please correct all highlighted fields before submitting.";
        errorAlert.classList.remove('d-none');
      }
      return;
    }

    // Prepare payload
    const companyInput = document.getElementById('companyName');
    const formData = {
      name: nameInput.value.trim(),
      company: companyInput ? companyInput.value.trim() : '',
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      projectType: projectTypeInput.value.trim(),
      location: locationInput.value.trim(),
      serviceRequired: serviceInput.value.trim(),
      message: messageInput.value.trim(),
      timestamp: new Date().toISOString()
    };

    // UI Loading State
    submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Transmitting Enquiry...';
    if (btnSpinner) btnSpinner.classList.remove('d-none');

    try {
      const endpoint = CONFIG.appsScriptUrl && CONFIG.appsScriptUrl.trim() !== "" 
        ? CONFIG.appsScriptUrl.trim() 
        : null;

      if (endpoint) {
        // Real Google Apps Script transmission
        // Using URLSearchParams or FormData for Google Apps Script doPost compatibility
        const payload = new URLSearchParams();
        for (const [key, val] of Object.entries(formData)) {
          payload.append(key, val);
        }

        const response = await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors', // Standard for Google Apps Script Web App without complex CORS headers
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: payload.toString()
        });

        // In no-cors mode, opaque response is returned
        displaySuccess();
      } else {
        // High-fidelity demonstration mode when Apps Script URL is not yet populated
        await new Promise(resolve => setTimeout(resolve, 850));
        console.info('[ARTEEVA Notice] Form submitted in demonstration mode. To receive real emails, set CONFIG.appsScriptUrl in js/script.js as outlined in README.md.', formData);
        displaySuccess();
      }
    } catch (err) {
      console.error('[ARTEEVA Error] Form submission error:', err);
      if (errorAlert) {
        errorMessageText.textContent = "An error occurred while transmitting your request. Please try again or reach us directly by phone or email.";
        errorAlert.classList.remove('d-none');
      }
    } finally {
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Send Enquiry';
      if (btnSpinner) btnSpinner.classList.add('d-none');
    }

    function displaySuccess() {
      if (successAlert) {
        successAlert.classList.remove('d-none');
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
      // Clear valid class styles
      form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
    }
  });
}

/**
 * 6. Smooth Scroll Reveal Animations
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

/**
 * 7. Back-to-Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

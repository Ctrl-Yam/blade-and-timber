// Blade & Timber Co. — main.js
// Modular Vanilla JavaScript: Lightbox Gallery, Form Validation, Mobile Nav, and Service Filter

document.addEventListener('DOMContentLoaded', function () {

  // MODULE 1: Lightbox Gallery for homepage haircuts
  (function initLightbox() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    if (galleryCards.length === 0) return;

    // Collect image source, alt, and caption text from cards
    const slides = [];
    galleryCards.forEach(function (card) {
      const img = card.querySelector('img');
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');

      if (img) {
        slides.push({
          src: img.getAttribute('src'),
          alt: img.getAttribute('alt') || '',
          caption: h3 ? h3.textContent : '',
          desc: p ? p.textContent : ''
        });
      }
    });

    if (slides.length === 0) return;

    // Dynamically inject the lightbox overlay modal into the DOM
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.id = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Image gallery lightbox');
    overlay.setAttribute('aria-hidden', 'true');

    overlay.innerHTML = [
      '<div class="lightbox-content">',
      '  <img class="lightbox-img" id="lightbox-img" src="" alt="" />',
      '  <div class="lightbox-caption">',
      '    <div class="lightbox-caption-title" id="lightbox-title"></div>',
      '    <div class="lightbox-caption-desc" id="lightbox-desc"></div>',
      '  </div>',
      '  <div class="lightbox-counter" id="lightbox-counter"></div>',
      '</div>',
      '<button class="lightbox-prev" id="lightbox-prev" aria-label="Previous image">&#8249;</button>',
      '<button class="lightbox-next" id="lightbox-next" aria-label="Next image">&#8250;</button>',
      '<button class="lightbox-close" id="lightbox-close" aria-label="Close lightbox">&times;</button>'
    ].join('\n');

    document.body.appendChild(overlay);

    // Cache lightbox DOM element references
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const btnPrev = document.getElementById('lightbox-prev');
    const btnNext = document.getElementById('lightbox-next');
    const btnClose = document.getElementById('lightbox-close');

    let currentIndex = 0;

    // Display the slide at the specified index with wraparound looping
    function showSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      currentIndex = index;
      const slide = slides[currentIndex];
      lightboxImg.setAttribute('src', slide.src);
      lightboxImg.setAttribute('alt', slide.alt);
      lightboxTitle.textContent = slide.caption;
      lightboxDesc.textContent = slide.desc;
      lightboxCounter.textContent = (currentIndex + 1) + ' / ' + slides.length;
    }

    // Open lightbox, lock background scroll, and set focus to close button
    function openLightbox(index) {
      showSlide(index);
      overlay.classList.add('lightbox-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-active');
      btnClose.focus();
    }

    // Close lightbox and restore body scrolling
    function closeLightbox() {
      overlay.classList.remove('lightbox-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-active');
    }

    // Open lightbox when clicking any gallery card
    galleryCards.forEach(function (card, index) {
      card.addEventListener('click', function () {
        openLightbox(index);
      });
    });

    // Previous image button
    btnPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      showSlide(currentIndex - 1);
    });

    // Next image button
    btnNext.addEventListener('click', function (e) {
      e.stopPropagation();
      showSlide(currentIndex + 1);
    });

    // Close button
    btnClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeLightbox();
    });

    // Close when clicking directly on the backdrop outside content
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeLightbox();
      }
    });

    // Keyboard navigation: Escape to close, left/right arrows to cycle
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('lightbox-open')) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          showSlide(currentIndex - 1);
          break;
        case 'ArrowRight':
          showSlide(currentIndex + 1);
          break;
      }
    });
  })();

  // MODULE 2: Advanced Form Validation and Simulated Asynchronous AJAX
  (function initFormValidation() {
    const forms = document.querySelectorAll('.enquiry-form');
    if (forms.length === 0) return;

    // Field-level validation rules keyed by input id
    const rules = {
      fullName: {
        required: true, minLen: 2, maxLen: 50,
        pattern: /^[A-Za-z\s\-']+$/,
        patternMsg: 'Only letters, spaces, hyphens, and apostrophes allowed'
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMsg: 'Please enter a valid email address (e.g. name@example.com)'
      },
      phone: {
        required: true,
        pattern: /^(\+27|0)\d{9}$/,
        patternMsg: 'Enter a valid SA phone number (e.g. 0821234567 or +27821234567)'
      },
      branch: { required: true, isSelect: true },
      service: { required: true, isSelect: true },
      message: { required: false, maxLen: 500 },
      contactName: {
        required: true, minLen: 2, maxLen: 50,
        pattern: /^[A-Za-z\s\-']+$/,
        patternMsg: 'Only letters, spaces, hyphens, and apostrophes allowed'
      },
      contactEmail: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMsg: 'Please enter a valid email address'
      },
      contactPhone: {
        required: false,
        pattern: /^(\+27|0)\d{9}$/,
        patternMsg: 'Enter a valid SA phone number (e.g. 0821234567)'
      },
      contactSubject: { required: true, minLen: 2, maxLen: 100 },
      contactMessage: { required: true, minLen: 10, maxLen: 500 }
    };

    // Validates a single input and returns an error message or empty string
    function validateField(input) {
      const id = input.id;
      const rule = rules[id];
      if (!rule) return '';

      const value = input.value.trim();

      if (rule.required && value === '') {
        return rule.isSelect ? 'Please select an option' : 'This field is required';
      }

      if (!rule.required && value === '') return '';

      if (rule.minLen && value.length < rule.minLen) {
        return 'Must be at least ' + rule.minLen + ' characters';
      }

      if (rule.maxLen && value.length > rule.maxLen) {
        return 'Must be no more than ' + rule.maxLen + ' characters';
      }

      if (rule.pattern) {
        let testVal = value;
        if (id === 'phone' || id === 'contactPhone') {
          testVal = value.replace(/[\s\-()]/g, '');
        }
        if (!rule.pattern.test(testVal)) {
          return rule.patternMsg || 'Invalid format';
        }
      }

      return '';
    }

    // Updates field error classes and error message container text
    function showError(input, msg) {
      const errorSpan = document.getElementById(input.id + '-error');
      if (!errorSpan) return;

      if (msg) {
        errorSpan.textContent = msg;
        input.classList.add('input-error');
        input.classList.remove('input-valid');
      } else {
        errorSpan.textContent = '';
        input.classList.remove('input-error');
        if (input.value.trim() !== '') {
          input.classList.add('input-valid');
        }
      }
    }

    // Validates all inputs in a form and returns boolean
    function validateForm(form) {
      const inputs = form.querySelectorAll('input, select, textarea');
      let isValid = true;

      inputs.forEach(function (input) {
        if (!input.id) return;
        const error = validateField(input);
        showError(input, error);
        if (error) isValid = false;
      });

      return isValid;
    }

    // Simulates an asynchronous AJAX POST request with loading indicator and success banner
    function simulateAjaxSubmit(form) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting\u2026';
      submitBtn.style.opacity = '0.7';

      setTimeout(function () {
        const oldAlert = form.querySelector('.success-alert');
        if (oldAlert) oldAlert.remove();

        const alert = document.createElement('div');
        alert.className = 'success-alert';
        alert.id = 'form-success-alert';
        alert.innerHTML = '<span style="font-size:1.2rem;">&#10003;</span> Your submission has been received! We will be in touch shortly.';
        form.appendChild(alert);

        form.reset();
        form.querySelectorAll('input, select, textarea').forEach(function (el) {
          el.classList.remove('input-valid', 'input-error');
        });
        form.querySelectorAll('.error-msg').forEach(function (span) {
          span.textContent = '';
        });

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';

        setTimeout(function () {
          if (alert.parentNode) {
            alert.style.transition = 'opacity 0.4s ease';
            alert.style.opacity = '0';
            setTimeout(function () { alert.remove(); }, 400);
          }
        }, 6000);
      }, 1500);
    }

    // Attach real-time and submit listeners to each form
    forms.forEach(function (form) {
      form.querySelectorAll('input, select, textarea').forEach(function (input) {
        input.addEventListener('blur', function () {
          const error = validateField(input);
          showError(input, error);
        });

        input.addEventListener('input', function () {
          if (input.classList.contains('input-error')) {
            const error = validateField(input);
            showError(input, error);
          }
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateForm(form)) {
          simulateAjaxSubmit(form);
        } else {
          const firstError = form.querySelector('.input-error');
          if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    });
  })();

  // MODULE 3: Mobile Navigation Drawer Toggle
  (function initMobileNav() {
    const toggleBtn = document.getElementById('nav-toggle');
    const header = document.querySelector('.site-header');
    if (!toggleBtn || !header) return;

    // Toggle nav drawer on hamburger button click
    toggleBtn.addEventListener('click', function () {
      header.classList.toggle('nav-open');
      const isOpen = header.classList.contains('nav-open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when clicking any nav link
    const navLinks = header.querySelectorAll('.nav-links a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  })();

  // MODULE 4: Service Category Tab Filter
  (function initServiceFilter() {
    const filterBar = document.getElementById('service-filter-bar');
    if (!filterBar) return;

    const filterBtns = filterBar.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card[data-category]');
    if (filterBtns.length === 0 || serviceCards.length === 0) return;

    // Filter service cards based on clicked category button
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filterValue = btn.getAttribute('data-filter');

        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        serviceCards.forEach(function (card) {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.classList.remove('filter-hidden');
          } else {
            card.classList.add('filter-hidden');
          }
        });
      });
    });
  })();

});

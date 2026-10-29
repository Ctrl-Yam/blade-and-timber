/**
 * ==========================================================================
 *  Blade & Timber Co. — main.js
 *  Part 3: JavaScript Interactivity Module
 *  Author: Yamkelo
 * ==========================================================================
 *
 *  ARCHITECTURE OVERVIEW
 *  ---------------------
 *  This file is organised into self-contained modules using IIFEs
 *  (Immediately Invoked Function Expressions) so that each feature
 *  has its own scope and doesn't pollute the global namespace.
 *
 *  Module 1: Lightbox Gallery       — Image overlay for homepage gallery
 *  Module 2: Form Validation & AJAX — Client-side validation + simulated submit
 *  Module 3: Mobile Navigation      — Hamburger toggle for responsive nav
 *  Module 4: Service Filter         — Category filter for services page
 *
 *  The DOMContentLoaded event ensures the DOM is fully parsed
 *  before any querySelector calls run.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ========================================================================
   *  MODULE 1: Lightbox Gallery
   *  -----------------------------------------------------------------------
   *  Scans .gallery-card elements for image data, dynamically injects a
   *  full-screen overlay into the DOM, and handles open / close / prev / next
   *  via click and keyboard events.
   * ======================================================================== */
  (function initLightbox() {

    var galleryCards = document.querySelectorAll('.gallery-card');
    if (galleryCards.length === 0) return;

    // Step 1: Build slides array from gallery card DOM elements
    var slides = [];
    galleryCards.forEach(function (card) {
      var img = card.querySelector('img');
      var h3  = card.querySelector('h3');
      var p   = card.querySelector('p');
      if (img) {
        slides.push({
          src:     img.getAttribute('src'),
          alt:     img.getAttribute('alt') || '',
          caption: h3 ? h3.textContent : '',
          desc:    p  ? p.textContent  : ''
        });
      }
    });
    if (slides.length === 0) return;

    // Step 2: Inject overlay markup into the DOM
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.id = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Image gallery lightbox');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<div class="lightbox-content">' +
      '  <img class="lightbox-img" id="lightbox-img" src="" alt="" />' +
      '  <div class="lightbox-caption">' +
      '    <div class="lightbox-caption-title" id="lightbox-title"></div>' +
      '    <div class="lightbox-caption-desc" id="lightbox-desc"></div>' +
      '  </div>' +
      '  <div class="lightbox-counter" id="lightbox-counter"></div>' +
      '</div>' +
      '<button class="lightbox-prev" id="lightbox-prev" aria-label="Previous image">&#8249;</button>' +
      '<button class="lightbox-next" id="lightbox-next" aria-label="Next image">&#8250;</button>' +
      '<button class="lightbox-close" id="lightbox-close" aria-label="Close lightbox">&times;</button>';
    document.body.appendChild(overlay);

    // Step 3: Cache DOM references
    var lightboxImg     = document.getElementById('lightbox-img');
    var lightboxTitle   = document.getElementById('lightbox-title');
    var lightboxDesc    = document.getElementById('lightbox-desc');
    var lightboxCounter = document.getElementById('lightbox-counter');
    var btnPrev         = document.getElementById('lightbox-prev');
    var btnNext         = document.getElementById('lightbox-next');
    var btnClose        = document.getElementById('lightbox-close');
    var currentIndex    = 0;

    // Step 4: Core functions
    function showSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;
      var slide = slides[currentIndex];
      lightboxImg.setAttribute('src', slide.src);
      lightboxImg.setAttribute('alt', slide.alt);
      lightboxTitle.textContent = slide.caption;
      lightboxDesc.textContent  = slide.desc;
      lightboxCounter.textContent = (currentIndex + 1) + ' / ' + slides.length;
    }

    function openLightbox(index) {
      showSlide(index);
      overlay.classList.add('lightbox-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-active');
      btnClose.focus();
    }

    function closeLightbox() {
      overlay.classList.remove('lightbox-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-active');
    }

    // Step 5: Event listeners
    galleryCards.forEach(function (card, index) {
      card.addEventListener('click', function () {
        openLightbox(index);
      });
    });

    btnPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      showSlide(currentIndex - 1);
    });

    btnNext.addEventListener('click', function (e) {
      e.stopPropagation();
      showSlide(currentIndex + 1);
    });

    btnClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeLightbox();
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('lightbox-open')) return;
      switch (e.key) {
        case 'Escape':    closeLightbox();            break;
        case 'ArrowLeft': showSlide(currentIndex - 1); break;
        case 'ArrowRight': showSlide(currentIndex + 1); break;
      }
    });

  })();


  /* ========================================================================
   *  MODULE 2: Form Validation & AJAX Simulation
   *  -----------------------------------------------------------------------
   *  Targets every form with class .enquiry-form. Applies field-level
   *  validation on blur and full-form validation on submit. On success,
   *  simulates an asynchronous POST with a 1.5 s delay before showing
   *  a styled success alert.
   * ======================================================================== */
  (function initFormValidation() {

    var forms = document.querySelectorAll('.enquiry-form');
    if (forms.length === 0) return;

    // ── Validation rules keyed by input id ──
    var rules = {
      // Enquiry form fields
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
      branch:  { required: true, isSelect: true },
      service: { required: true, isSelect: true },
      message: { required: false, maxLen: 500 },

      // Contact form fields
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

    /**
     * validateField(input)
     * Checks one input against its rule set.
     * Returns an error string, or '' if the field is valid.
     */
    function validateField(input) {
      var id   = input.id;
      var rule = rules[id];
      if (!rule) return '';

      var value = input.value.trim();

      // Required check
      if (rule.required && value === '') {
        return rule.isSelect ? 'Please select an option' : 'This field is required';
      }

      // Skip further checks if optional and empty
      if (!rule.required && value === '') return '';

      // Minimum length
      if (rule.minLen && value.length < rule.minLen) {
        return 'Must be at least ' + rule.minLen + ' characters';
      }

      // Maximum length
      if (rule.maxLen && value.length > rule.maxLen) {
        return 'Must be no more than ' + rule.maxLen + ' characters';
      }

      // Pattern match (strip whitespace/dashes from phone numbers first)
      if (rule.pattern) {
        var testVal = value;
        if (id === 'phone' || id === 'contactPhone') {
          testVal = value.replace(/[\s\-()]/g, '');
        }
        if (!rule.pattern.test(testVal)) {
          return rule.patternMsg || 'Invalid format';
        }
      }

      return '';
    }

    /**
     * showError(input, msg)
     * Toggles inline error/valid states and populates the error span.
     */
    function showError(input, msg) {
      var errorSpan = document.getElementById(input.id + '-error');
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

    /**
     * validateForm(form)
     * Runs every input through validateField. Returns true only if
     * every field passes.
     */
    function validateForm(form) {
      var inputs  = form.querySelectorAll('input, select, textarea');
      var isValid = true;

      inputs.forEach(function (input) {
        if (!input.id) return;
        var error = validateField(input);
        showError(input, error);
        if (error) isValid = false;
      });

      return isValid;
    }

    /**
     * simulateAjaxSubmit(form)
     * Fakes an async form submission:
     *  1. Disables button and shows "Submitting…"
     *  2. Waits 1.5 s (simulated network)
     *  3. Appends a .success-alert element
     *  4. Resets form and clears validation states
     *  5. Auto-hides the alert after 6 s
     */
    function simulateAjaxSubmit(form) {
      var submitBtn    = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;

      // ── Loading state ──
      submitBtn.disabled    = true;
      submitBtn.textContent = 'Submitting\u2026';
      submitBtn.style.opacity = '0.7';

      setTimeout(function () {
        // Remove any previous success alert
        var old = form.querySelector('.success-alert');
        if (old) old.remove();

        // Build success alert
        var alert = document.createElement('div');
        alert.className = 'success-alert';
        alert.id = 'form-success-alert';
        alert.innerHTML = '<span style="font-size:1.2rem;">&#10003;</span> Your submission has been received! We will be in touch shortly.';
        form.appendChild(alert);

        // Reset form and clear states
        form.reset();
        form.querySelectorAll('input, select, textarea').forEach(function (el) {
          el.classList.remove('input-valid', 'input-error');
        });
        form.querySelectorAll('.error-msg').forEach(function (span) {
          span.textContent = '';
        });

        // Restore button
        submitBtn.disabled    = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';

        // Auto-hide alert after 6 seconds
        setTimeout(function () {
          if (alert.parentNode) {
            alert.style.transition = 'opacity 0.4s ease';
            alert.style.opacity    = '0';
            setTimeout(function () { alert.remove(); }, 400);
          }
        }, 6000);

      }, 1500);
    }

    // ── Wire up each form ──
    forms.forEach(function (form) {

      // Real-time validation on blur
      form.querySelectorAll('input, select, textarea').forEach(function (input) {
        input.addEventListener('blur', function () {
          var error = validateField(input);
          showError(input, error);
        });

        // Clear error as user types
        input.addEventListener('input', function () {
          if (input.classList.contains('input-error')) {
            var error = validateField(input);
            showError(input, error);
          }
        });
      });

      // Submit handler — prevent default, validate, then simulate AJAX
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateForm(form)) {
          simulateAjaxSubmit(form);
        } else {
          // Scroll to and focus the first errored field
          var firstError = form.querySelector('.input-error');
          if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    });

  })();


  /* ========================================================================
   *  MODULE 3: Mobile Navigation Toggle
   *  -----------------------------------------------------------------------
   *  Listens for clicks on the #nav-toggle hamburger button and toggles
   *  the .nav-open class on the site header, which controls mobile nav
   *  visibility via CSS max-height transition.
   * ======================================================================== */
  (function initMobileNav() {

    var toggleBtn = document.getElementById('nav-toggle');
    var header    = document.querySelector('.site-header');
    if (!toggleBtn || !header) return;

    toggleBtn.addEventListener('click', function () {
      header.classList.toggle('nav-open');
      var isOpen = header.classList.contains('nav-open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav when a link is clicked (smooth UX on single-page navigations)
    var navLinks = header.querySelectorAll('.nav-links a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

  })();


  /* ========================================================================
   *  MODULE 4: Service Category Filter
   *  -----------------------------------------------------------------------
   *  Reads data-filter from .filter-btn clicks and hides/shows
   *  .service-card elements whose data-category doesn't match.
   * ======================================================================== */
  (function initServiceFilter() {

    var filterBar = document.getElementById('service-filter-bar');
    if (!filterBar) return;

    var filterBtns   = filterBar.querySelectorAll('.filter-btn');
    var serviceCards  = document.querySelectorAll('.service-card[data-category]');
    if (filterBtns.length === 0 || serviceCards.length === 0) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filterValue = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Show / hide cards
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

}); // End of DOMContentLoaded

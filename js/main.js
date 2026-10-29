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
 *  Module 1: Lightbox Gallery
 *    - Scans .gallery-card elements for image data
 *    - Dynamically injects a full-screen overlay into the DOM
 *    - Handles open / close / prev / next via click + keyboard
 *
 *  The DOMContentLoaded event ensures the DOM is fully parsed
 *  before any querySelector calls run.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ========================================================================
   *  MODULE 1: Lightbox Gallery
   * ======================================================================== */
  (function initLightbox() {

    // ── Step 1: Collect image data from the gallery cards ──────────────
    // We query every .gallery-card, then extract the <img> src/alt and
    // the <h3> caption text. This builds our "slides" array.

    const galleryCards = document.querySelectorAll('.gallery-card');

    // If this page has no gallery cards (e.g. services.html), bail out.
    if (galleryCards.length === 0) return;

    const slides = [];

    galleryCards.forEach(function (card) {
      const img = card.querySelector('img');
      const h3  = card.querySelector('h3');
      const p   = card.querySelector('p');

      if (img) {
        slides.push({
          src:     img.getAttribute('src'),
          alt:     img.getAttribute('alt') || '',
          caption: h3 ? h3.textContent : '',
          desc:    p  ? p.textContent  : ''
        });
      }
    });

    // If no valid images were found, don't build the lightbox
    if (slides.length === 0) return;

    // ── Step 2: Build the overlay DOM structure ────────────────────────
    // We create the entire lightbox markup in JavaScript rather than
    // hardcoding it in HTML. This is "progressive enhancement" — if JS
    // fails to load, the page still works, just without the lightbox.

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

    // ── Step 3: Cache DOM references ──────────────────────────────────
    const lightboxImg     = document.getElementById('lightbox-img');
    const lightboxTitle   = document.getElementById('lightbox-title');
    const lightboxDesc    = document.getElementById('lightbox-desc');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const btnPrev         = document.getElementById('lightbox-prev');
    const btnNext         = document.getElementById('lightbox-next');
    const btnClose        = document.getElementById('lightbox-close');

    let currentIndex = 0;

    // ── Step 4: Core functions ────────────────────────────────────────

    /**
     * showSlide(index)
     * Updates the lightbox image, caption, and counter to reflect
     * the slide at the given index.
     */
    function showSlide(index) {
      // Wrap around: if index goes below 0, loop to end; if past end, loop to 0
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      currentIndex = index;

      const slide = slides[currentIndex];
      lightboxImg.setAttribute('src', slide.src);
      lightboxImg.setAttribute('alt', slide.alt);
      lightboxTitle.textContent = slide.caption;
      lightboxDesc.textContent  = slide.desc;
      lightboxCounter.textContent = (currentIndex + 1) + ' / ' + slides.length;
    }

    /**
     * openLightbox(index)
     * Displays the overlay and loads the slide at the given index.
     * Also locks body scroll and updates ARIA attributes.
     */
    function openLightbox(index) {
      showSlide(index);
      overlay.classList.add('lightbox-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-active');
      // Move focus to close button for accessibility
      btnClose.focus();
    }

    /**
     * closeLightbox()
     * Hides the overlay and restores normal page scroll.
     */
    function closeLightbox() {
      overlay.classList.remove('lightbox-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-active');
    }

    // ── Step 5: Wire up event listeners ───────────────────────────────

    // Click on a gallery card → open lightbox at that card's index
    galleryCards.forEach(function (card, index) {
      card.addEventListener('click', function () {
        openLightbox(index);
      });
    });

    // Navigation arrows
    btnPrev.addEventListener('click', function (e) {
      e.stopPropagation(); // Don't trigger the overlay backdrop click
      showSlide(currentIndex - 1);
    });

    btnNext.addEventListener('click', function (e) {
      e.stopPropagation();
      showSlide(currentIndex + 1);
    });

    // Close button
    btnClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeLightbox();
    });

    // Click on the dark backdrop (but not on the image/content) → close
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      // Only respond if the lightbox is currently open
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

  })(); // End of Lightbox IIFE

}); // End of DOMContentLoaded

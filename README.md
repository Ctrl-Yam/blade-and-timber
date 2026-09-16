# Blade & Timber Co. — Website Development

## Student Information
- **Full Name:** Yamkelo Paballo Vilakazi
- **Student ID / Number:** ST10526419
- **Institution:** Rosebank International (The IIE)
- **Module:** Web Development (WEDE5020)
- **Project Repository:** [GitHub Repository — Blade & Timber Co.](https://github.com/Ctrl-Yam/blade-and-timber)
- **Live Deployment:** [GitHub Pages Live Link](https://ctrl-yam.github.io/blade-and-timber/)

---

## Project Overview
**Blade & Timber Co.** is an upscale grooming, traditional barbering, and men's lifestyle brand based in Johannesburg, South Africa (operating across flagship branches in Rosebank and Braamfontein). 

This project is a multi-page, responsive web application developed as part of the **WEDE5020** curriculum. It provides prospective and returning clients with an immersive digital experience—enabling them to browse curated grooming services, view operational schedules and branch locations, and seamlessly submit service booking enquiries online.

---

## Website Goals and Objectives
1. **Premium Brand Identity:** Reflect an artisanal, luxury dark-aesthetic atmosphere matching physical barbershop spaces through high-contrast typography, dark obsidian backdrops, and warm amber gold accents.
2. **Transparent Service Catalog:** Clearly present grooming packages, accurate pricing in South African Rands (ZAR), and procedure durations.
3. **Frictionless Booking & Enquiries:** Offer an accessible, well-structured client enquiry form with clear field guidance and validation feedback.
4. **Multi-Branch Visibility:** Display physical addresses, direct telephone/email contact channels, and operating hours for Rosebank and Braamfontein branches.
5. **Universal Accessibility & Responsiveness:** Ensure smooth usability across modern smartphones, tablets, laptops, and ultra-wide desktop monitors through progressive enhancement and semantic HTML5.

---

## Information Architecture & Sitemap
```text
Blade & Timber Co.
├── Home (index.html)                 # Hero introduction, brand positioning, and quick booking CTA
├── About Us (about.html)             # Brand story, core artisan values, and master barber roster
├── Services & Pricing (services.html)# Full service menu cards with pricing, duration, and booking triggers
├── Service Enquiry (enquiry.html)    # Multi-field booking request and customer inquiry form
└── Contact & Locations (contact.html)# Physical branch cards, operating hours, and location specifics
```

---

## Project Milestones & Timeline
- **Phase 1 (Part 1):** Research, information architecture, semantic HTML5 skeleton, initial repository setup, and GitHub Pages deployment.
- **Phase 2 (Part 2):** Master CSS stylesheet (`style.css`), typography scale with relative units (`rem`, `em`, `%`), CSS Flexbox and Grid multi-column desktop layouts, interactive pseudo-classes (`:hover`, `:focus`, `:active`), responsive media queries (tablet and mobile), and responsive image strategy (`<picture>`, `srcset`, `sizes`).
- **Phase 3 (Part 3):** Client-side JavaScript functionality, DOM manipulation, dynamic booking calculations, and advanced form validation.

---

## Part 2 Implementation Summary: CSS Architecture & Responsive Design

### 1. CSS Reset & Standard Baseline
- Implemented an industry-standard modern CSS box-sizing reset (`box-sizing: border-box; margin: 0; padding: 0`) across all elements and pseudo-elements.
- Normalised HTML root sizing (`html { font-size: 100%; scroll-behavior: smooth; }`) to honor native user-agent accessibility settings.

### 2. Design Tokens & CSS Custom Properties (`:root`)
- **Luxury Dark Palette:** Established an obsidian base (`#0c0e12`), slate-card surfaces (`#1a1e27`), and glowing amber-gold gradients (`#c99b3b` to `#f0cd7d`) representing razor brass and timber craft.
- **Typography Scale:** Employed Google Fonts—**'Poppins'** for crisp, geometric headings and **'Open Sans'** for highly legible body copy.
- **Relative Units:** Built entirely using `rem`, `em`, and `%` to enable proportionate scaling across varying device zoom levels and viewports.

### 3. Modern Layout Systems (CSS Grid & Flexbox)
- **Header & Navigation:** CSS Flexbox with `justify-content: space-between` and `align-items: center`, featuring animated indicator underlines on navigation items.
- **Service Cards:** Multi-column 3-column CSS Grid (`grid-template-columns: repeat(3, 1fr)`) with internal Flexbox alignment ensuring all booking trigger buttons align at the base of cards.
- **Enquiry Form:** 2-column CSS Grid for form field groupings (`.form-row`), stacking smoothly on mobile devices.
- **Multi-Column Footer:** 3-column desktop layout (`grid-template-columns: 2fr 1fr 1.5fr`) separating brand mission, quick navigation links, and operational details.

### 4. Visual Styles & Micro-Interactions
- Subtle card borders (`border: 0.0625rem solid var(--color-border-subtle)`), deep elevation shadows (`box-shadow: 0 0.625rem 1.875rem -0.625rem rgba(0,0,0,0.65)`), and smooth cubic-bezier transitions.
- Interactive pseudo-classes:
  - `:hover` — Visual card lift (`transform: translateY(-0.375rem)`), expanded glow shadow, and button brightness boost.
  - `:focus` & `:focus-visible` — WCAG-compliant high-contrast gold outline (`outline: 0.125rem solid var(--color-gold-light); outline-offset: 0.1875rem;`) ensuring keyboard accessibility.
  - `:active` — Tactile press feedback (`transform: translateY(0.0625rem)`).

### 5. Responsive Breakpoints
- **Desktop (> 992px):** Expansive multi-column layouts (3-column services, 2-column about, 3-column footer, horizontal navigation).
- **Tablet (max-width: 992px):** Downscales root base font to `93.75%` (15px), converts services grid to 2 columns, and condenses padding.
- **Mobile (max-width: 640px):** Downscales root base font to `87.5%` (14px), converts multi-column desktop grids into a dedicated **single-column layout** (`grid-template-columns: 1fr;`), stacks navigation links, and stretches action buttons to 100% width for effortless thumb taps.

---

## Responsive Design Evidence

Below is visual evidence of cross-device testing conducted across Desktop, Tablet, and Mobile viewport breakpoints using browser extension captures:

### Desktop View
![Desktop View](assets/images/desktop.png)

---

### Tablet View
![Tablet View](assets/images/tablet.png)

---

### Mobile View
![Mobile View](assets/images/mobile.png)

---

## Changelog

### Part 1 - HTML Skeleton & Structure
- Built semantic HTML5 structure across all 5 pages (`index.html`, `about.html`, `services.html`, `enquiry.html`, `contact.html`).
- Set up project repository and initial GitHub Pages deployment.
- Formatted accessibility tags, headings hierarchy, and navigation links.

### Part 2 - CSS & Responsive Design
- Linked external CSS stylesheet (`css/styles.css` / `style.css`) across all HTML files for unified site styling.
- Implemented CSS Flexbox and Grid multi-column desktop layouts for navigation menu, service cards, and footer.
- Added media queries for mobile and tablet breakpoints to collapse multi-column layouts into a responsive single-column format.
- Uploaded cross-device testing screenshots to the documentation under `assets/screenshots/` verifying Desktop, Tablet, and Mobile compatibility.

---

## References

- Google Fonts. 2026. *Open Sans Font Family*. [Online] Available at: <https://fonts.google.com/specimen/Open+Sans> [Accessed 16 September 2026].
- Google Fonts. 2026. *Poppins Font Family*. [Online] Available at: <https://fonts.google.com/specimen/Poppins> [Accessed 16 September 2026].
- Marcotte, E. 2010. *Responsive Web Design*. A List Apart, No. 306. [Online] Available at: <https://alistapart.com/article/responsive-web-design/> [Accessed 16 September 2026].
- Mozilla Developer Network (MDN). 2026. *CSS Grid Layout*. [Online] Available at: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout> [Accessed 16 September 2026].
- Mozilla Developer Network (MDN). 2026. *CSS Flexible Box Layout*. [Online] Available at: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout> [Accessed 16 September 2026].
- Mozilla Developer Network (MDN). 2026. *The Picture element*. [Online] Available at: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture> [Accessed 16 September 2026].
- Mozilla Developer Network (MDN). 2026. *Responsive images: Using srcset and sizes*. [Online] Available at: <https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images> [Accessed 16 September 2026].
- The Independent Institute of Education (IIE). 2024. *The IIE Quick Reference Guide: IIE Harvard Reference Method*. Johannesburg: The Independent Institute of Education.
- World Wide Web Consortium (W3C). 2023. *Web Content Accessibility Guidelines (WCAG) 2.1*. [Online] Available at: <https://www.w3.org/TR/WCAG21/> [Accessed 16 September 2026].
/**
 * Blade & Timber Co. — Main JavaScript
 * Handles form validation, interactive enquiries, and dynamic UI state.
 */

document.addEventListener('DOMContentLoaded', () => {
  const enquiryForm = document.getElementById('enquiryForm');
  
  if (enquiryForm) {
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const branchSelect = document.getElementById('branch');
    const serviceSelect = document.getElementById('service');
    const formSuccess = document.getElementById('formSuccess');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const branchError = document.getElementById('branchError');
    const serviceError = document.getElementById('serviceError');

    // Pre-select service from URL query params if present (e.g. enquiry.html?service=haircut)
    const urlParams = new URLSearchParams(window.location.search);
    const requestedService = urlParams.get('service');
    if (requestedService && serviceSelect) {
      serviceSelect.value = requestedService;
    }

    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Reset errors
      nameError.textContent = '';
      emailError.textContent = '';
      phoneError.textContent = '';
      branchError.textContent = '';
      serviceError.textContent = '';
      formSuccess.style.display = 'none';

      // Validate Full Name
      if (!fullNameInput.value.trim()) {
        nameError.textContent = 'Please enter your full name.';
        isValid = false;
      } else if (fullNameInput.value.trim().length < 3) {
        nameError.textContent = 'Name must be at least 3 characters long.';
        isValid = false;
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email address.';
        isValid = false;
      } else if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      // Validate Phone Number
      const phonePattern = /^[\d\s+\-()]{8,15}$/;
      if (!phoneInput.value.trim()) {
        phoneError.textContent = 'Please enter your contact phone number.';
        isValid = false;
      } else if (!phonePattern.test(phoneInput.value.trim())) {
        phoneError.textContent = 'Please enter a valid phone number.';
        isValid = false;
      }

      // Validate Branch
      if (!branchSelect.value) {
        branchError.textContent = 'Please choose a branch location.';
        isValid = false;
      }

      // Validate Service
      if (!serviceSelect.value) {
        serviceError.textContent = 'Please select a desired grooming service.';
        isValid = false;
      }

      if (isValid) {
        // Show success notification
        formSuccess.style.display = 'flex';
        enquiryForm.reset();
        
        // Scroll to success banner smoothly
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
});

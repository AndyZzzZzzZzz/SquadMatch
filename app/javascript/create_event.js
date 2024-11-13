// app/javascript/packs/create_event.js
import "@hotwired/turbo-rails"
import "controllers"

document.addEventListener('turbo:load', () => {
    const form = document.getElementById('create_event_form');
    if (form) {
      // Get form fields
      const title = document.getElementById('event_title');
      const description = document.getElementById('event_description');
      const eventDatetime = document.getElementById('event_event_datetime');
      const capacity = document.getElementById('event_capacity');
      const location = document.getElementById('event_location');
      const categoryId = document.getElementById('event_category_id');
      const eventTypeId = document.getElementById('event_event_type_id');
      const clubId = document.getElementById('event_club_id');
  
      // Initialize date and time picker (if using one)
    //   if (eventDatetime) {
    //     flatpickr(eventDatetime, {
    //       enableTime: true,
    //       dateFormat: "Y-m-d H:i",
    //       minDate: "today"
    //     });
    //   }
  
      // Add event listeners for 'blur' event on each field
      if (title && description && eventDatetime && capacity && location && categoryId && eventTypeId) {
        title.addEventListener('blur', validateTitle);
        eventDatetime.addEventListener('blur', validateEventDatetime);
        capacity.addEventListener('blur', validateCapacity);
        location.addEventListener('blur', validateLocation);
        categoryId.addEventListener('blur', validateCategoryId);
        eventTypeId.addEventListener('blur', validateEventTypeId);
        // Description and Club ID are optional
      }
  
      // Submit event listener
      form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission until validations are complete
  
        // Clear existing error messages
        clearErrorMessages();
  
        let valid = true;
  
        // Validate all required fields
        if (!validateTitle()) valid = false;
        if (!validateEventDatetime()) valid = false;
        if (!validateCapacity()) valid = false;
        if (!validateLocation()) valid = false;
        if (!validateCategoryId()) valid = false;
        if (!validateEventTypeId()) valid = false;
  
        if (valid) {
          // All validations passed, submit the form via AJAX
          submitForm();
        }
        // If not valid, the error messages have already been displayed
      });
  
      // Validation functions
      function validateTitle() {
        removeError(title);
        if (!title.value.trim()) {
          showError(title, "Title can't be blank");
          return false;
        } else if (title.value.length > 255) {
          showError(title, "Title can't be longer than 255 characters");
          return false;
        }
        return true;
      }
  
      function validateEventDatetime() {
        removeError(eventDatetime);
        if (!eventDatetime.value.trim()) {
          showError(eventDatetime, "Event date and time can't be blank");
          return false;
        } else if (new Date(eventDatetime.value) < new Date()) {
          showError(eventDatetime, "Event date and time must be in the future");
          return false;
        }
        return true;
      }
  
      function validateCapacity() {
        removeError(capacity);
        const value = capacity.value;
        if (!value) {
          showError(capacity, "Capacity can't be blank");
          return false;
        } else if (!Number.isInteger(parseFloat(value)) || parseInt(value) <= 0) {
          showError(capacity, "Capacity must be a positive integer");
          return false;
        }
        return true;
      }
  
      function validateLocation() {
        removeError(location);
        if (!location.value.trim()) {
          showError(location, "Location can't be blank");
          return false;
        }
        return true;
      }
  
      function validateCategoryId() {
        removeError(categoryId);
        if (!categoryId.value.trim()) {
          showError(categoryId, "Category can't be blank");
          return false;
        }
        return true;
      }
  
      function validateEventTypeId() {
        removeError(eventTypeId);
        if (!eventTypeId.value.trim()) {
          showError(eventTypeId, "Event type can't be blank");
          return false;
        }
        return true;
      }
  
      // Helper functions
      function showError(input, message) {
        removeError(input);
        const error = document.createElement('span');
        error.className = 'error-message';
        error.style.color = '#c62828';
        error.textContent = message;
        input.parentNode.insertBefore(error, input.nextSibling);
      }
  
      function removeError(input) {
        if (!input) return;
        const error = input.parentNode.querySelector('.error-message');
        if (error) {
          error.remove();
        }
      }
  
      function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
      }
  
      // Form submission via AJAX
      function submitForm() {
        // Gather form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
  
        // Fetch CSRF token from meta tags
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
        // Send AJAX request to create the event
        fetch(form.action, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken
          },
          body: JSON.stringify({ event: data })
        });
      }
  
      function displayServerErrors(errors) {
        // Assuming errors is an array of error messages
        errors.forEach(errorMessage => {
          const field = getFieldByErrorMessage(errorMessage);
          if (field) {
            showError(field, errorMessage);
          } else {
            // Handle general errors not associated with a specific field
            const generalError = document.createElement('div');
            generalError.className = 'error-message';
            generalError.style.color = '#c62828';
            generalError.textContent = errorMessage;
            form.prepend(generalError);
          }
        });
      }
  
      function getFieldByErrorMessage(errorMessage) {
        // Map error messages to form fields
        if (errorMessage.toLowerCase().includes('title')) return title;
        if (errorMessage.toLowerCase().includes('date')) return eventDatetime;
        if (errorMessage.toLowerCase().includes('capacity')) return capacity;
        if (errorMessage.toLowerCase().includes('location')) return location;
        if (errorMessage.toLowerCase().includes('category')) return categoryId;
        if (errorMessage.toLowerCase().includes('type')) return eventTypeId;
        // Add more mappings as needed
        return null;
      }
    }
  });
  

// document.addEventListener('turbo:load', () => {
//     const form = document.querySelector('form');
//     if (form) {
//       form.addEventListener('submit', function(event) {
//         // Clear existing error messages
//         const errorMessages = document.querySelectorAll('.error-message');
//         errorMessages.forEach(msg => msg.remove());
  
//         let valid = true;
  
//         // Get form fields
//         const firstName = document.getElementById('user_first_name');
//         const lastName = document.getElementById('user_last_name');
//         const username = document.getElementById('user_username');
//         const email = document.getElementById('user_email');
//         const password = document.getElementById('user_password');
//         const passwordConfirmation = document.getElementById('user_password_confirmation');
  
//         // Validate first name
//         if (!firstName.value.trim()) {
//           showError(firstName, "First name can't be blank");
//           valid = false;
//         }
  
//         // Validate last name
//         if (!lastName.value.trim()) {
//           showError(lastName, "Last name can't be blank");
//           valid = false;
//         }
  
//         // Validate username
//         if (!username.value.trim()) {
//             showError(username, "Username can't be blank");
//             valid = false;
//           } else if (username.value.trim().length < 4) {
//             showError(username, "Username must be at least 4 characters long");
//             valid = false;
//           } else {
//             // Check if username is unique
//             const usernamePromise = checkUsernameUnique(username.value.trim()).then(isUnique => {
//               if (!isUnique) {
//                 showError(username, "Username has already been taken");
//                 valid = false;
//               }
//             });
//             validationPromises.push(usernamePromise);
//           }
  
//         // Validate email
//         if (!email.value.trim()) {
//             showError(email, "Email can't be blank");
//             valid = false;
//           } else if (!validateEmail(email.value.trim())) {
//             showError(email, "Email is invalid");
//             valid = false;
//           } else {
//             // Check if email is unique
//             const emailPromise = checkEmailUnique(email.value.trim()).then(isUnique => {
//               if (!isUnique) {
//                 showError(email, "Email has already been taken");
//                 valid = false;
//               }
//             });
//             validationPromises.push(emailPromise);
//           }
  
//         // Validate password
//         if (!password.value) {
//           showError(password, "Password can't be blank");
//           valid = false;
//         } else if (password.value.length < 6) {
//           showError(password, "Password must be at least 6 characters long");
//           valid = false;
//         }
  
//         // Validate password confirmation
//         if (!passwordConfirmation.value) {
//           showError(passwordConfirmation, "Password confirmation can't be blank");
//           valid = false;
//         } else if (password.value !== passwordConfirmation.value) {
//           showError(passwordConfirmation, "Passwords do not match");
//           valid = false;
//         }
  
//         Promise.all(validationPromises).then(() => {
//             if (!valid) {
//               event.preventDefault(); // Prevent form submission
//             }
//           });
    
//           // Prevent form submission until validations are complete
//           event.preventDefault();
//       });
//     }
  
//     function showError(input, message) {
//       const error = document.createElement('span');
//       error.className = 'error-message';
//       error.style.color = '#c62828';
//       error.textContent = message;
//       input.parentNode.insertBefore(error, input.nextSibling);
//     }
  
//     function validateEmail(email) {
//       // Simple email regex for demonstration purposes
//       const re = /\S+@\S+\.\S+/;
//       return re.test(email);
//     }

//     function checkUsernameUnique(username) {
//         return fetch(`/users/check_username?username=${encodeURIComponent(username)}`)
//             .then(response => response.json())
//             .then(data => data.is_unique)
//             .catch(error => {
//             console.error('Error checking username uniqueness:', error);
//             return false;
//             });
//     }

//     function checkEmailUnique(email) {
//         return fetch(`/users/check_email?email=${encodeURIComponent(email)}`)
//             .then(response => response.json())
//             .then(data => data.is_unique)
//             .catch(error => {
//             console.error('Error checking email uniqueness:', error);
//             return false;
//             });
//     }
//   });

// app/javascript/packs/register.js (for Rails 6 and above)
// Or app/assets/javascripts/register.js (for Rails 5 and below)

document.addEventListener('turbo:load', () => {
    const form = document.querySelector('form');
    if (form) {
      // Get form fields
      const firstName = document.getElementById('user_first_name');
      const lastName = document.getElementById('user_last_name');
      const username = document.getElementById('user_username');
      const email = document.getElementById('user_email');
      const password = document.getElementById('user_password');
      const passwordConfirmation = document.getElementById('user_password_confirmation');
  
      // Add event listeners for 'blur' event on each field
      firstName.addEventListener('blur', validateFirstName);
      lastName.addEventListener('blur', validateLastName);
      username.addEventListener('blur', validateUsername);
      email.addEventListener('blur', validateEmailField);
      password.addEventListener('blur', validatePassword);
      passwordConfirmation.addEventListener('blur', validatePasswordConfirmation);
  
      // Submit event listener
      form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission until validations are complete
  
        // Clear existing error messages
        clearErrorMessages();
  
        let valid = true;
        let validationPromises = [];
  
        // Validate all fields
        if (!validateFirstName()) valid = false;
        if (!validateLastName()) valid = false;
        if (!validateUsername(validationPromises)) valid = false;
        if (!validateEmailField(validationPromises)) valid = false;
        if (!validatePassword()) valid = false;
        if (!validatePasswordConfirmation()) valid = false;
  
        // Wait for all async validations to complete
        Promise.all(validationPromises).then(() => {
          if (valid) {
            // All validations passed, submit the form
            form.submit();
          }
          // If not valid, the error messages have already been displayed
        });
      });
  
      // Validation functions
      function validateFirstName() {
        removeError(firstName);
        if (!firstName.value.trim()) {
          showError(firstName, "First name can't be blank");
          return false;
        }
        return true;
      }
  
      function validateLastName() {
        removeError(lastName);
        if (!lastName.value.trim()) {
          showError(lastName, "Last name can't be blank");
          return false;
        }
        return true;
      }
  
      function validateUsername(validationPromises = []) {
        removeError(username);
        const value = username.value.trim();
        if (!value) {
          showError(username, "Username can't be blank");
          return false;
        } else if (value.length < 4) {
          showError(username, "Username must be at least 4 characters long");
          return false;
        } else {
          // Check if username is unique
          const usernamePromise = checkUsernameUnique(value).then(isUnique => {
            if (!isUnique) {
              showError(username, "Username has already been taken");
              return false;
            }
            return true;
          });
          validationPromises.push(usernamePromise);
          return true;
        }
      }
  
      function validateEmailField(validationPromises = []) {
        removeError(email);
        const value = email.value.trim();
        if (!value) {
          showError(email, "Email can't be blank");
          return false;
        } else if (!validateEmail(value)) {
          showError(email, "Email is invalid");
          return false;
        } else {
          // Check if email is unique
          const emailPromise = checkEmailUnique(value).then(isUnique => {
            if (!isUnique) {
              showError(email, "Email has already been taken");
              return false;
            }
            return true;
          });
          validationPromises.push(emailPromise);
          return true;
        }
      }
  
      function validatePassword() {
        removeError(password);
        if (!password.value) {
          showError(password, "Password can't be blank");
          return false;
        } else if (password.value.length < 6) {
          showError(password, "Password must be at least 6 characters long");
          return false;
        }
        return true;
      }
  
      function validatePasswordConfirmation() {
        removeError(passwordConfirmation);
        if (!passwordConfirmation.value) {
          showError(passwordConfirmation, "Password confirmation can't be blank");
          return false;
        } else if (password.value !== passwordConfirmation.value) {
          showError(passwordConfirmation, "Passwords do not match");
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
        const error = input.parentNode.querySelector('.error-message');
        if (error) {
          error.remove();
        }
      }
  
      function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
      }
  
      function validateEmail(email) {
        // Simple email regex for demonstration purposes
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      }
  
      function checkUsernameUnique(username) {
        return fetch(`/users/check_username?username=${encodeURIComponent(username)}`)
          .then(response => response.json())
          .then(data => data.is_unique)
          .catch(error => {
            console.error('Error checking username uniqueness:', error);
            // Assume not unique to prevent form submission
            return false;
          });
      }
  
      function checkEmailUnique(email) {
        return fetch(`/users/check_email?email=${encodeURIComponent(email)}`)
          .then(response => response.json())
          .then(data => data.is_unique)
          .catch(error => {
            console.error('Error checking email uniqueness:', error);
            // Assume not unique to prevent form submission
            return false;
          });
      }
    }
  });
  
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', (event) => {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !password) {
          alert('Both username and password are required.');
          event.preventDefault();
        }
      });
    }
  });
  
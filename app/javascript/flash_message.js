document.addEventListener('turbo:load', () => {
    const flashNotice = document.getElementById('flash-notice');
    if (flashNotice) {
      setTimeout(() => {
        flashNotice.style.display = 'none';
      }, 3000); // Disappear after 3 seconds
    }
  });
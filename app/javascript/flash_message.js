document.addEventListener('turbo:load', () => {
    const flashNotice = document.getElementById('flash-notice');
    if (flashNotice) {
      setTimeout(() => {
        flashNotice.style.display = 'none';
      }, 2000); // Disappear after 2 seconds
    }
  });
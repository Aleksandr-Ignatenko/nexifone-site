(function () {
  const mobileLinks = document.querySelectorAll('.mobile-link');

  window.toggleMenu = function () {
    const button = document.querySelector('.hamburger');
    const nav = document.getElementById('mobileMenu'); 
    const overlay = document.getElementById('overlay');

    const expanded = button.getAttribute('aria-expanded') === 'true';
    const newState = !expanded;

    button.setAttribute('aria-expanded', newState);
    nav.classList.toggle('open', newState);
    overlay.classList.toggle('open', newState);

    document.body.style.overflow = newState ? 'hidden' : '';
  };

  mobileLinks.forEach(link =>
    link.addEventListener('click', () => toggleMenu())
  );

  overlay.addEventListener('click', () => toggleMenu());

  document.getElementById('year').textContent = new Date().getFullYear();
})();

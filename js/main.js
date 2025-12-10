(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('nav-links');
  const overlay = document.getElementById('overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

/* Открыть / закрыть меню */
function toggleMenu() {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  const newState = !expanded;

  hamburger.setAttribute('aria-expanded', newState);

  mobileMenu.classList.toggle('open', newState);
  overlay.classList.toggle('open', newState);

  document.body.style.overflow = newState ? 'hidden' : '';
}

/* Кнопка ☰ / ✖ */
hamburger.addEventListener('click', toggleMenu);

/* Клик по оверлею */
overlay.addEventListener('click', toggleMenu);

/* Клик по пункту меню */
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

/* Год в футере */
document.getElementById('year').textContent = new Date().getFullYear();

})();

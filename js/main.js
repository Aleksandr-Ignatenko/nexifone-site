function toggleMenu() {
  const button = document.querySelector('.hamburger');
  const nav = document.getElementById('mobileMenu');  // ИМЯ ТВОЕГО БЛОКА
  const overlay = document.getElementById('overlay');

  const expanded = button.getAttribute('aria-expanded') === 'true';
  const newState = !expanded;

  button.setAttribute('aria-expanded', newState);
  nav.classList.toggle('open', newState);
  overlay.classList.toggle('open', newState);

  document.body.style.overflow = newState ? 'hidden' : '';
}

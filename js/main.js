// js/main.js
(() => {
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!burger || !mobileMenu) return;

  const openMenu = () => {
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    overlay.hidden = true;
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', () => {
    burger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Закрытие по клику вне меню
  document.addEventListener('click', e => {
    if (!mobileMenu.classList.contains('open')) return;
    if (burger.contains(e.target) || mobileMenu.contains(e.target)) return;
    closeMenu();
  });

  // Автоматический год в футере
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

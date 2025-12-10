(function () {
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    overlay.hidden = true;
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    burger.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.getElementById('year').textContent = new Date().getFullYear();
})();

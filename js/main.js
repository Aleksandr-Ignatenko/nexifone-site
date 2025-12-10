(function () {
  // Элементы
  const button = document.querySelector('.hamburger');
  const nav = document.getElementById('mobileMenu'); // твой мобильный блок
  const overlay = document.getElementById('overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // expose глобально, т.к. у тебя в HTML onclick="toggleMenu()"
  window.toggleMenu = function () {
    if (!button) return;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const newState = !expanded;

    // ARIA + визуальный класс (Block Beagle использует .hamburger.open)
    button.setAttribute('aria-expanded', newState ? 'true' : 'false');
    button.classList.toggle('open', newState);

    // Открываем/закрываем шторку
    if (nav) nav.classList.toggle('open', newState);

    // overlay — используем hidden, чтобы соответствовать твоему CSS
    if (overlay) {
      overlay.hidden = !newState;
      overlay.classList.toggle('open', newState); // на случай, если нужно CSS-переходы
    }

    // блокируем scroll body при открытом меню
    document.body.style.overflow = newState ? 'hidden' : '';
  };

  // Закрыть меню при клике на оверлей
  if (overlay) {
    overlay.addEventListener('click', () => {
      if (button && (button.getAttribute('aria-expanded') === 'true')) toggleMenu();
    });
  }

  // Закрыть меню при клике по ссылке в мобильном меню
  if (mobileLinks && mobileLinks.length) {
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (button && (button.getAttribute('aria-expanded') === 'true')) toggleMenu();
      });
    });
  }

  // Поведение: клик вне меню закрывает его (как в Block Beagle)
  document.addEventListener('click', (e) => {
    if (!nav || !button) return;
    const isOpen = nav.classList.contains('open');
    if (!isOpen) return;

    const clickedInsideNav = nav.contains(e.target);
    const clickedOnButton = button.contains(e.target);

    if (!clickedInsideNav && !clickedOnButton) {
      toggleMenu();
    }
  });

  // Если у тебя есть якорные ссылки — при клике закрываем мобильное меню (не ломая скролл)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function () {
      if (nav && nav.classList.contains('open') && button && button.getAttribute('aria-expanded') === 'true') {
        // небольшой тайм-аут можно добавить, но закрываем сразу
        toggleMenu();
      }
    });
  });

  // год в футере
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

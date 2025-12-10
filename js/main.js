<script>
(function () {
  const burger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    burger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    overlay.hidden = true;
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  mobileLinks.forEach(link =>
    link.addEventListener('click', closeMenu)
  );

  // footer year
  document.getElementById('year').textContent = new Date().getFullYear();
})();
</script>

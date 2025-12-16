(() => {
  function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      toggleMenu();
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // → export to global so inline onclick works
  window.toggleMenu = toggleMenu;

    /* ============================
     TELECOM TYPING TEXT
  ============================ */

  const texts = [
    "Voice Termination for Call Centers",
    "DID Number Services",
    "Text-to-Speech",
    "GSM Gateway Services"
  ];

  const typingEl = document.getElementById("typing-text");
  if (typingEl) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const current = texts[textIndex];

      if (!isDeleting) {
        typingEl.textContent = current.slice(0, charIndex++);
        if (charIndex > current.length) {
          setTimeout(() => isDeleting = true, 2000);
        }
      } else {
        typingEl.textContent = current.slice(0, charIndex--);
        if (charIndex < 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }

      setTimeout(typeLoop, isDeleting ? 45 : 70);
    }

    typeLoop();
  }

})();

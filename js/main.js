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

      // ПЕЧАТЬ
      if (!isDeleting) {
        typingEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 1600);
        }
      }
      // УДАЛЕНИЕ
      else {
        typingEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;

          // 🔑 КРИТИЧЕСКИ ВАЖНО
          typingEl.textContent = "";
        }
      }

      setTimeout(typeLoop, isDeleting ? 45 : 70);
    }


    typeLoop();
  }



  document.addEventListener("DOMContentLoaded", () => {
  const aboutGlass = document.querySelector(".about-appear");

  if (!aboutGlass) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        aboutGlass.classList.add("is-visible");
        observer.disconnect(); // один раз
      }
    },
    {
      threshold: 0.25,
    }
  );

  observer.observe(aboutGlass);
});

/* ============================
   METRICS ANIMATION
============================ */

const metrics = document.querySelectorAll(".metric");

if (metrics.length) {

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    const decimals = el.dataset.decimals
      ? parseInt(el.dataset.decimals, 10)
      : 0;

    const duration = 2000;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutCubic
      const value = target * eased;

      el.textContent = value.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = "true";
          entry.target.classList.add("visible");

          const counter = entry.target.querySelector(
            ".metric-value[data-target]"
          );

          if (counter) {
            animateCounter(counter);
          }
        }
      });
    },
    { threshold: 0.6 }
  );

  metrics.forEach(metric => observer.observe(metric));
}

})();

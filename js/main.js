(() => {

  /* =========================================================
     NAVIGATION / MOBILE MENU
  ========================================================= */
  function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    const isOpen = navLinks.classList.toggle('open');
    
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  /* -----------------------------------------------------
     Close menu on outside click
  ----------------------------------------------------- */
  document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      toggleMenu();
    }
  });

  /* -----------------------------------------------------
     Close menu on link click
  ----------------------------------------------------- */
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  
  /* -----------------------------------------------------
     Export for inline onclick
  ----------------------------------------------------- */
  window.toggleMenu = toggleMenu;

  /* =========================================================
     HERO | TELECOM TYPING TEXT
  ========================================================= */
  const typingEl = document.getElementById("typing-text");
  
  if (typingEl) {
    const texts = [
      "Voice Termination for Call Centers",
      "DID Number Services",
      "Text-to-Speech",
      "GSM Gateway Services"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const current = texts[textIndex];

  /* -----------------------------------------------------
     Print
  ----------------------------------------------------- */
      if (!isDeleting) {
        typingEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 1600);
        }
      }
        
  /* -----------------------------------------------------
     Delete
  ----------------------------------------------------- */
      else {
        typingEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          typingEl.textContent = "";
        }
      }
      setTimeout(typeLoop, isDeleting ? 45 : 70);
    }
    typeLoop();
  }

  /* =========================================================
     ABOUT | SLIDE IN FROM LEFT
  ========================================================= */
const aboutSection = document.querySelector(".about");
const aboutGlass = document.querySelector(".about-glass");

if (aboutSection && aboutGlass) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        aboutGlass.classList.add("is-visible");
        observer.disconnect();
      }
    },
    {
      threshold: 0,
      rootMargin: "0px 0px -20% 0px"
    }
  );
  observer.observe(aboutSection);
}

  /* =========================================================
     METRICS | COUNTER + FADE IN
  ========================================================= */
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

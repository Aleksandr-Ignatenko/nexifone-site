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

  /* =========================================================
     ABOUT | SLIDE IN FROM LEFT
  ========================================================= */
const aboutSection = document.querySelector(".about");
const aboutGlass = document.querySelector(".about-animate");

if (aboutSection && aboutGlass) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        aboutGlass.classList.add("is-visible");
        observer.disconnect();
      }
    },
    {
      threshold: 0.35
    }
  );
  observer.observe(aboutSection);
}

/* =========================================================
   PROCESS STRIP | TYPE SEQUENCE (FIXED)
========================================================= */
(() => {
  const el = document.getElementById("processText");
  if (!el) return;

  const steps = ["Connect", "Route", "Monitor", "Scale"];
  const arrow = " → ";
  const dots = " ...";

  const typeSpeed = 70;
  const pauseAfterArrow = 700;
  const pauseAfterDots = 800;
  const pauseAfterFull = 2500;
  const eraseSpeed = 40;

  let stepIndex = 0;
  let charIndex = 0;
  let text = "";
  let isErasing = false;

  function blinkChunk(chunk, times, interval, afterPause, done) {
    let count = 0;
    let visible = true;

    function tick() {
      if (count >= times * 2) {
        el.textContent = text;
        setTimeout(done, afterPause);
        return;
      }

      el.textContent = visible
        ? text
        : text.slice(0, -chunk.length);

      visible = !visible;
      count++;
      setTimeout(tick, interval);
    }

    tick();
  }

  function loop() {
    if (!isErasing) {

      if (charIndex < steps[stepIndex].length) {
        text += steps[stepIndex][charIndex++];
        el.textContent = text;
        setTimeout(loop, typeSpeed);
        return;
      }

      if (stepIndex < steps.length - 1) {
        text += arrow;
        el.textContent = text;

        blinkChunk(arrow, 3, 450, pauseAfterArrow, () => {
          stepIndex++;
          charIndex = 0;
          loop();
        });

      } else {
        text += dots;
        el.textContent = text;

        blinkChunk(dots, 3, 450, pauseAfterDots, () => {
          setTimeout(() => {
            isErasing = true;
            loop();
          }, pauseAfterFull);
        });
      }

    } else {

      if (text.length) {
        text = text.slice(0, -1);
        el.textContent = text;
        setTimeout(loop, eraseSpeed);
      } else {
        isErasing = false;
        stepIndex = 0;
        charIndex = 0;
        loop();
      }

    }
  }

  loop();
})();

/* =========================================================
   WHY US | SLIDE IN FROM LEFT
========================================================= */
const whySection = document.querySelector(".why");
const whyAnimate = document.querySelector(".why-animate");

if (whySection && whyAnimate) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        whyAnimate.classList.add("is-visible");
        observer.disconnect();
      }
    },
    { threshold: 0.35 }
  );
  observer.observe(whySection);
}
  
/* =========================================================
   SOLUTIONS | CARD ACCORDION (FIXED)
========================================================= */
document.addEventListener("click", (e) => {
  const isDesktop = window.matchMedia("(min-width: 769px)").matches;
  const toggle = e.target.closest(".solution-toggle");
  const card = e.target.closest(".solution-item");

  /* ===== CLICK ON TOGGLE ===== */
  if (toggle && card) {
    const isOpen = card.classList.contains("is-open");

    if (isDesktop) {
      // На ПК: закрыть все остальные, открыть текущую
      document.querySelectorAll(".solution-item.is-open").forEach(item => {
        if (item !== card) {
          item.classList.remove("is-open");
          const btn = item.querySelector(".solution-toggle");
          if (btn) {
            btn.textContent = "More";
            btn.setAttribute("aria-expanded", "false");
          }
        }
      });
    } else {
      // На мобильных: просто закрыть все
      document.querySelectorAll(".solution-item.is-open").forEach(item => {
        item.classList.remove("is-open");
        const btn = item.querySelector(".solution-toggle");
        if (btn) {
          btn.textContent = "More";
          btn.setAttribute("aria-expanded", "false");
        }
      });
    }

    // Переключить текущую карточку
    if (!isOpen) {
      card.classList.add("is-open");
      toggle.textContent = "Less";
      toggle.setAttribute("aria-expanded", "true");
      
      // На десктопе - плавная прокрутка к карточке если она не видна
      if (isDesktop) {
        const rect = card.getBoundingClientRect();
        if (rect.bottom > window.innerHeight) {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    } else {
      card.classList.remove("is-open");
      toggle.textContent = "More";
      toggle.setAttribute("aria-expanded", "false");
    }

    return;
  }

  /* ===== CLICK OUTSIDE ===== */
  if (!card && !toggle) {
    // Закрыть все карточки при клике вне их
    document.querySelectorAll(".solution-item.is-open").forEach(item => {
      item.classList.remove("is-open");
      const btn = item.querySelector(".solution-toggle");
      if (btn) {
        btn.textContent = "More";
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }
});

// Закрывать карточки при скролле на десктопе
window.addEventListener('scroll', () => {
  if (window.matchMedia("(min-width: 769px)").matches) {
    document.querySelectorAll(".solution-item.is-open").forEach(item => {
      item.classList.remove("is-open");
      const btn = item.querySelector(".solution-toggle");
      if (btn) {
        btn.textContent = "More";
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }
});


})();

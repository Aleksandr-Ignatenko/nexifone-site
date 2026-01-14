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
      link.addEventListener('click', () => {
        const navLinks = document.getElementById('navLinks');
        if (navLinks.classList.contains('open')) {
          toggleMenu();
        }
      });
    });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  
  /* -----------------------------------------------------
     Export for inline onclick
  ----------------------------------------------------- */
  window.toggleMenu = toggleMenu;

/* =========================================================
   HOME LINKS | SMART SCROLL / REDIRECT (LOGO + NAV)
========================================================= */
document.querySelectorAll('.js-home-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const isHome =
      location.pathname === '/' ||
      location.pathname.endsWith('/index.html');

    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // если не главная — обычный переход по href="/"
  });
});

/* =========================================================
   NAV ANCHORS | SMART SCROLL OR REDIRECT
========================================================= */
document.querySelectorAll('.js-anchor-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const hash = link.getAttribute('href');
    const isHome =
      location.pathname === '/' ||
      location.pathname.endsWith('/index.html');

    const is404 = document.body.classList.contains('page-404');

    if (isHome && !is404) {
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    e.preventDefault();
    window.location.href = '/' + hash;
  });
});


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
const processEl = document.getElementById("processText");
if (processEl) {
  
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
}

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
  const card   = e.target.closest(".solution-item");

  /* ===== CLICK ON TOGGLE ===== */
  if (toggle && card) {
    const isOpen = card.classList.contains("is-open");

    // we close EVERYTHING
    document.querySelectorAll(".solution-item.is-open").forEach(item => {
      item.classList.remove("is-open");
      const btn = item.querySelector(".solution-toggle");
      if (btn) {
        btn.textContent = "More";
        btn.setAttribute("aria-expanded", "false");
      }
    });

    // If it was closed, open it.
    if (!isOpen) {
      card.classList.add("is-open");
      toggle.textContent = "Less";
      toggle.setAttribute("aria-expanded", "true");
    }

    return;
  }

  /* ===== CLICK OUTSIDE (MOBILE + DESKTOP) ===== */
  if (!card) {
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

/* =========================================================
   CONTACT | MESSAGE CHAR COUNTER
========================================================= */
const messageField = document.getElementById("message");
const counterEl = document.querySelector(".char-counter");
const MAX_CHARS = 1000;

if (messageField && counterEl) {
  counterEl.textContent = `0 / ${MAX_CHARS}`;

  messageField.addEventListener("input", () => {
    const length = messageField.value.length;
    counterEl.textContent = `${length} / ${MAX_CHARS}`;
  });
}
/* =========================================================
   CONTACT | EMAIL VALIDATION (FIXED)
========================================================= */
const emailInput = document.getElementById("email");

if (emailInput) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

  const validateEmail = () => {
    const value = emailInput.value.trim();

    if (!emailRegex.test(value)) {
      emailInput.setCustomValidity(
        "Use format: name@domain.com (latin letters and numbers only)"
      );
    } else {
      emailInput.setCustomValidity("");
    }
  };

  emailInput.addEventListener("input", validateEmail);
  emailInput.addEventListener("blur", validateEmail);
}

/* =========================================================
   404 | MESH ANIMATION
========================================================= */
const canvas = document.getElementById("mesh");
if (canvas) {
  const main = document.querySelector(".error-page");
  const ctx = canvas.getContext("2d");
  let w, h;

  function resize() {
    w = canvas.width  = main.clientWidth;
    h = canvas.height = main.clientHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const nodes = [];
  const NUM = 45;

  for (let i = 0; i < NUM; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 232, 255, 0.75)";
      ctx.fill();
    });

    for (let i = 0; i < NUM; i++) {
      for (let j = i + 1; j < NUM; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);

        if (dist < 160) {
          ctx.strokeStyle = `rgba(0, 232, 255, ${1 - dist / 160})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}
  

})();

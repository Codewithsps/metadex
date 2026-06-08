
    // ── Navbar scroll ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── Mobile menu ──
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    function openMenu() {
      mobileMenu.classList.add('open');
      document.body.classList.add('menu-open');
    }
    function closeMenu() {
      mobileMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    }

    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);

    // Close on any link click
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

    // Close on backdrop tap (outside links area)
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMenu();
    });

    // ── Hero slider ──
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const slideCounter = document.getElementById('slide-current');
    let currentSlide = 0;
    let slideTimer;

    function goToSlide(n) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
      slideCounter.textContent = String(currentSlide + 1).padStart(2, '0');
    }

    dots.forEach(d => d.addEventListener('click', () => {
      clearInterval(slideTimer);
      goToSlide(+d.dataset.idx);
      slideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }));

    goToSlide(0);
    slideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
    setTimeout(() => document.getElementById('hero-scroll').classList.add('visible'), 1200);

    // ── Scroll reveal ──
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));

    // ── Smooth scroll ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      });
    });

    // ── Contact form ──
    function handleSubmit(e) {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        document.getElementById('form-success').classList.remove('hidden');
        document.getElementById('contact-form').reset();
        btn.textContent = 'Send Enquiry';
        btn.disabled = false;
      }, 1200);
    }
  

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Slide-in & Scroll Effect
  const nav = document.querySelector('nav');
  if (nav) {
    // Initial entrance animation for navbar
    setTimeout(() => {
      nav.style.transform = 'translateY(0)';
    }, 100);

    // Scroll listener for background color change
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('bg-[#0A1628]/95', 'backdrop-blur-md', 'border-b', 'border-[#1E3A5F]/50', 'shadow-lg');
        nav.classList.remove('bg-transparent');
      } else {
        nav.classList.remove('bg-[#0A1628]/95', 'backdrop-blur-md', 'border-b', 'border-[#1E3A5F]/50', 'shadow-lg');
        nav.classList.add('bg-transparent');
      }
    });
  }

  // 2. Mobile Menu Toggle
  const menuBtn = document.querySelector('button[aria-controls="mobile-menu"]');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    const toggleMobileMenu = () => {
      const isOpen = mobileMenu.classList.contains('opacity-100');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    };

    const openMobileMenu = () => {
      mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
      mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x w-5 h-5">
          <line x1="18" x2="6" y1="6" y2="18"></line>
          <line x1="6" x2="18" y1="6" y2="18"></line>
        </svg>
      `;
    };

    const closeMobileMenu = () => {
      mobileMenu.classList.add('opacity-0', 'pointer-events-none');
      mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu w-5 h-5">
          <line x1="4" x2="20" y1="12" y2="12"></line>
          <line x1="4" x2="20" y1="6" y2="6"></line>
          <line x1="4" x2="20" y1="18" y2="18"></line>
        </svg>
      `;
    };

    menuBtn.addEventListener('click', toggleMobileMenu);
    
    // Expose close function to window for link click triggers
    window.closeMobileMenu = closeMobileMenu;
  }

  // 3. Smooth Scroll for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 4. Interactive Hero Canvas Particle Animation (Neural Network)
  const canvas = document.querySelector('canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1
        });
      }
    };

    const drawFrame = () => {
      ctx.fillStyle = 'rgba(10, 22, 40, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Boundary bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201, 169, 97, 0.6)';
        ctx.fill();

        // Connect near particles
        for (let j = idx + 1; j < particles.length; j++) {
          const target = particles[j];
          const dx = p.x - target.x;
          const dy = p.y - target.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = `rgba(91, 163, 197, ${0.2 - dist / 750})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    resizeCanvas();
    initParticles();
    drawFrame();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  }

  // 5. Scroll-Fade-In Observer (Replicating Framer Motion)
  const animatedElements = [];
  document.querySelectorAll('*').forEach(el => {
    const styleAttr = el.getAttribute('style');
    if (styleAttr && (styleAttr.includes('opacity:0') || styleAttr.includes('opacity: 0'))) {
      animatedElements.push(el);
      // Inject smooth transitions for properties
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }
  });

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1) translateZ(0)';
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => {
    scrollObserver.observe(el);
  });

  // 6. Contact Form Frontend Validation & Interactive Success Toast
  const form = document.querySelector('form');
  if (form) {
    // Add success toast layout dynamically
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 z-50 transform translate-y-20 opacity-0 bg-[#0D1B2A] border border-[#C9A961] rounded-2xl p-5 shadow-2xl transition-all duration-500 max-w-sm flex gap-4';
    toast.innerHTML = `
      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A961] to-[#D4AF37] flex items-center justify-center shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0A1628" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-5 h-5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <div>
        <h4 class="text-white font-bold text-base mb-1">Demande Reçue !</h4>
        <p class="text-gray-400 text-xs leading-relaxed">Merci pour votre intérêt. Notre équipe d'experts analysera vos besoins et vous répondra sous 24 heures.</p>
      </div>
    `;
    document.body.appendChild(toast);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple inputs validation check
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let allValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          allValid = false;
          input.classList.add('border-red-500');
        } else {
          input.classList.remove('border-red-500');
        }
      });

      if (allValid) {
        // Trigger success message animation
        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        // Reset fields
        form.reset();

        // Dismiss toast after 5 seconds
        setTimeout(() => {
          toast.classList.add('translate-y-20', 'opacity-0');
          toast.classList.remove('translate-y-0', 'opacity-100');
        }, 5000);
      }
    });
  }
});

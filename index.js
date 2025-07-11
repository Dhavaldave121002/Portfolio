document.addEventListener("DOMContentLoaded", function() {
  // Check for required features
  if (!('IntersectionObserver' in window) || !window.gsap) {
    console.warn("Required features not supported - applying simplified animations");
    applyFallbackAnimations();
    return;
  }

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // ===================== PRELOADER =====================
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    const preloaderTL = gsap.timeline();
    
    preloaderTL
      .from(".ring1", { 
        scale: 0, 
        rotation: 0, 
        opacity: 0, 
        duration: 0.6, 
        ease: "back.out(1.7)" 
      })
      .from(".ring2", { 
        scale: 0, 
        rotation: 180, 
        opacity: 0, 
        duration: 0.6, 
        ease: "back.out(1.7)" 
      }, "-=0.25")
      .from(".ring3", { 
        scale: 0, 
        rotation: -180, 
        opacity: 0, 
        duration: 0.6, 
        ease: "back.out(1.7)" 
      }, "-=0.25")
      .from(".core-logo", { 
        scale: 0, 
        rotateY: 360, 
        opacity: 0, 
        duration: 0.7, 
        ease: "elastic.out(1, 0.5)" 
      }, "-=0.3")
      .from(".flare", { 
        scale: 0, 
        opacity: 0, 
        duration: 0.6, 
        ease: "power3.out" 
      }, "-=0.4")
      .from(".loader-title", { 
        y: 50, 
        opacity: 0, 
        duration: 0.5, 
        ease: "power3.out" 
      }, "-=0.3")
      .to(".preloader", {
        opacity: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "power4.out",
        onComplete: () => {
          preloader.style.display = "none";
          document.body.style.overflow = "auto";
          initMainAnimations();
        }
      });
  }

  // ===================== MAIN ANIMATIONS =====================
  function initMainAnimations() {
    // Header animations
    gsap.from(".logo", {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: "bounce.out",
      scale: 0.5,
      delay: 0.2
    });

    gsap.from(".logo img", {
      rotation: 360,
      transformOrigin: "center",
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2
    });

    gsap.from(".nav .nav-item", {
      x: 80,
      opacity: 0,
      duration: 0.3,
      ease: "back.out",
      scale: 0.8,
      stagger: 0.08,
      delay: 0.3
    });

    // Hero section animations
    gsap.from(".hero h1", {
      y: -60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.4
    });

    gsap.from(".hero p", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      delay: 0.6
    });

    gsap.from(".hero-btn", {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
      delay: 0.8
    });

    // Initialize scroll animations
    setupScrollAnimations();
    setupInteractiveElements();
  }

  // ===================== SCROLL ANIMATIONS =====================
  function setupScrollAnimations() {
    // Section headings
    gsap.utils.toArray(".section-heading").forEach((heading, i) => {
      ScrollTrigger.create({
        trigger: heading,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.fromTo(heading,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              delay: i * 0.1
            }
          );
        }
      });
    });

    // About section
    gsap.utils.toArray(".about-content").forEach((content, i) => {
      ScrollTrigger.create({
        trigger: content,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.fromTo(content,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              delay: i * 0.15
            }
          );
        }
      });
    });

    // Cards (services, projects, etc.)
    gsap.utils.toArray(".animated-card").forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.fromTo(card,
            { y: 70, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
              delay: i * 0.1
            }
          );

          // Special icon animation if present
          const icon = card.querySelector('.card-icon');
          if (icon) {
            gsap.fromTo(icon,
              { scale: 0.7, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "elastic.out(1, 0.5)",
                delay: 0.3
              }
            );
          }
        }
      });
    });

    // Skill cards with progress animation
    gsap.utils.toArray(".skill-card").forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: i * 0.08,
              onComplete: animateSkillProgress.bind(null, card)
            }
          );
        }
      });
    });
  }

  // ===================== SKILL PROGRESS ANIMATION =====================
  function animateSkillProgress(card) {
    const percentage = parseInt(card.dataset.percentage) || 0;
    const circle = card.querySelector("circle.progress");
    const label = card.querySelector(".percentage");
    
    if (circle && label) {
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      circle.style.strokeDasharray = circumference;
      
      gsap.to(card, {
        progress: 0,
        duration: 2,
        ease: "power2.out",
        onUpdate: function() {
          const progress = this.progress() * percentage;
          const offset = circumference - (circumference * progress) / 100;
          circle.style.strokeDashoffset = offset;
          label.textContent = Math.round(progress) + "%";
        }
      });
    }
  }

  // ===================== INTERACTIVE ELEMENTS =====================
  function setupInteractiveElements() {
    // Mobile menu toggle
    const menuIcon = document.querySelector(".menu-icon");
    const nav = document.querySelector(".main-nav");
    
    if (menuIcon && nav) {
      menuIcon.addEventListener("click", function() {
        nav.classList.toggle("active");
        
        if (nav.classList.contains("active")) {
          gsap.from(".nav .nav-item", {
            x: 50,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            stagger: 0.08
          });
          document.body.style.overflow = "hidden";
        } else {
          gsap.to(".nav .nav-item", {
            x: -30,
            opacity: 0,
            duration: 0.2
          });
          document.body.style.overflow = "auto";
        }
      });
    }

    // Project modals
    window.openModal = function(projectId) {
      const modal = document.getElementById("projectModal");
      if (!modal) return;
      
      modal.style.display = "block";
      gsap.from(".modal-content", {
        y: 50,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
    };

    window.closeModal = function() {
      const modal = document.getElementById("projectModal");
      if (!modal) return;
      
      gsap.to(".modal-content", {
        y: 50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          modal.style.display = "none";
        }
      });
    };

    // Contact form
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        // Form submission logic here
      });
    }
  }

  // ===================== FALLBACK ANIMATIONS =====================
  function applyFallbackAnimations() {
    // Simple fade-in for all elements
    gsap.utils.toArray("section, .card, .section-heading").forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        delay: Math.random() * 0.5
      });
    });

    // Make sure preloader is hidden
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  // ===================== RESPONSIVE ADJUSTMENTS =====================
  function handleResponsiveChanges() {
    const isMobile = window.innerWidth < 768;
    
    ScrollTrigger.getAll().forEach(trigger => {
      if (isMobile) {
        // Adjust trigger points for mobile
        trigger.vars.start = trigger.vars.start.replace("80%", "85%")
          .replace("75%", "80%")
          .replace("85%", "90%");
      }
    });
  }

  // Initialize responsive adjustments
  window.addEventListener('load', handleResponsiveChanges);
  window.addEventListener('resize', handleResponsiveChanges);

  // ===================== INFINITE ANIMATIONS =====================
  if (document.querySelector(".flare")) {
    gsap.to(".flare", {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none",
      transformOrigin: "center"
    });
  }

  if (document.querySelector(".ring1")) {
    gsap.to(".ring1", {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: "none",
      transformOrigin: "center"
    });
  }
});
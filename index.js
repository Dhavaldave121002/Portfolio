document.addEventListener("DOMContentLoaded", () => {
  // ===== UTILITIES =====
  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
  const isTablet = () => window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches;
  
  const debounce = (func, wait = 100) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // ===== GLOBAL ANIMATION CONTROLS =====
  let animations = {
    mainTimeline: null,
    marqueeAnimation: null,
    ringAnimations: [],
    scrollTriggers: [],
    hasAnimated: {} // Track which elements have been animated
  };

  // ===== CLEANUP FUNCTION =====
  function cleanupAnimations() {
    if (animations.mainTimeline) animations.mainTimeline.kill();
    if (animations.marqueeAnimation) animations.marqueeAnimation.kill();
    animations.ringAnimations.forEach(anim => anim.kill());
    if (typeof ScrollTrigger !== "undefined") {
      animations.scrollTriggers.forEach(st => st.kill());
      ScrollTrigger.getAll().forEach(st => st.kill());
    }
    animations.ringAnimations = [];
    animations.scrollTriggers = [];
  }

  // ===== TYPED ANIMATION (PRESERVED AS IS) =====
  function initTypedSkills() {
    if (window.Typed) {
      try {
        new Typed("#typed-skills", {
          strings: [
            "Web Developer", 
            "App Developer",
            "Frontend Developer",
            "UI/UX Designer"
          ],
          typeSpeed: 60,
          backSpeed: 30,
          backDelay: 700,
          loop: true,
        });
      } catch (e) {
        console.error("Typed.js initialization error:", e);
      }
    }
  }

  // ===== GSAP SETUP =====
  function setupGSAP() {
    if (typeof gsap !== "undefined") {
      if (typeof ScrollTrigger !== "undefined" && !isMobile()) {
        gsap.registerPlugin(ScrollTrigger);
      }
      cleanupAnimations();
      animations.hasAnimated = {}; // Reset animation tracking
      return true;
    }
    return false;
  }

  // ===== PRELOADER =====
  const preloader = document.querySelector(".preloader");

  function runInit() {
    if (preloader) {
      preloader.style.display = "none";
      document.body.style.overflow = "auto";
    }
    
    initTypedSkills(); // Initialize Typed.js (unchanged)
    animateTogDesktop();
    animateAboutImageFrame();
    setupScroll();
    initMarquee();
    
    if (!isMobile() && animations.mainTimeline) {
      animations.mainTimeline.play();
    }
  }

  // ===== NAVIGATION HANDLING =====
  function setupNavigation() {
    const menuIcon = document.querySelector(".menu-icon");
    const nav = document.querySelector(".main-nav");
    const navItems = document.querySelectorAll(".nav-item a");
    const togs = document.querySelectorAll(".tog");

    if (!menuIcon || !nav) return;

    // Mobile initial styles
    if (isMobile()) {
      togs.forEach(t => {
        t.style.opacity = "1";
        t.style.transform = "none";
        t.style.pointerEvents = "auto";
      });
    }

    // Toggle menu function
    function toggleMenu() {
      nav.classList.toggle("active");
      const isActive = nav.classList.contains("active");
      document.body.style.overflow = isActive && isMobile() ? "hidden" : "auto";
      
      if (!isMobile() && typeof gsap !== "undefined") {
        if (isActive) {
          gsap.fromTo(".nav .nav-item", 
            { opacity: 0, x: 100 }, 
            {
              opacity: 1, 
              x: 0, 
              stagger: 0.08, 
              duration: 0.15, 
              ease: "power2.out"
            }
          );
        } else {
          gsap.to(".nav .nav-item", { 
            opacity: 0, 
            x: -50, 
            duration: 0.15 
          });
        }
      }
    }

    // Menu icon click handler
    menuIcon.addEventListener("click", toggleMenu);

    // Nav item click handlers
    navItems.forEach(item => {
      item.addEventListener("click", (e) => {
        const targetId = item.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          e.preventDefault();
          
          // Close menu if mobile
          if (isMobile()) {
            nav.classList.remove("active");
            document.body.style.overflow = "auto";
          }
          
          // Handle scroll to section
          targetSection.scrollIntoView({ behavior: "smooth" });
          
          // Animate the section if not already animated
          if (!animations.hasAnimated[targetId]) {
            animateSection(targetSection);
            animations.hasAnimated[targetId] = true;
          }
        }
      });
    });
  }

  // ===== SKILL BAR ANIMATION (FIXED) =====
  function animateBar(card) {
    const pct = parseInt(card.dataset.percentage) || 0;
    const fill = card.querySelector(".progress-fill");
    const level = card.querySelector(".skill-level");
    
    if (!fill || !level) return;
    
    // Set skill level text
    level.textContent = pct >= 80 ? "Expert" : pct >= 60 ? "Intermediate" : "Beginner";
    level.style.opacity = "1"; // Ensure it's visible
    
    if (typeof gsap !== "undefined") {
      gsap.fromTo(fill, 
        { width: "0%" },
        { 
          width: pct + "%", 
          duration: 1.5, 
          ease: "power2.out" 
        }
      );
    } else {
      fill.style.width = pct + "%";
    }
  }

  // ===== SECTION ANIMATION =====
  function animateSection(section) {
    if (typeof gsap === "undefined") return;

    const sectionId = '#' + section.id;
    
    if (sectionId === "#skills") {
      // Special handling for skills section
      document.querySelectorAll(".skill-card").forEach((card, index) => {
        gsap.fromTo(card, 
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.05,
            ease: "power2.out",
            onComplete: () => animateBar(card)
          }
        );
      });
    } else {
      // Default section animation
      gsap.fromTo(section.querySelectorAll(".section-title, .section-content"), 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }
  }

  // ===== MAIN GSAP TIMELINE (Desktop) =====
  function setupMainTimeline() {
    if (!isMobile() && typeof gsap !== "undefined") {
      animations.mainTimeline = gsap.timeline({ paused: true });
      
      animations.mainTimeline
        .from(".logo", { 
          y: -80, 
          opacity: 0, 
          duration: 0.7, 
          ease: "bounce.out", 
          scale: 0.5 
        }, "start")
        .from(".logo img", { 
          rotation: 360, 
          duration: 0.7, 
          ease: "power2.out" 
        }, "start")
        .from(".nav .nav-item", { 
          x: 80, 
          opacity: 0, 
          duration: 0.3, 
          ease: "back.out", 
          scale: 0.5, 
          stagger: 0.07 
        }, "start+=0.2")
        .from(".sec1", { 
          x: -100, 
          opacity: 0, 
          duration: 0.7, 
          ease: "power2.out" 
        }, "start+=0.2")
        .from(".sec2 img", { 
          x: 100, 
          opacity: 0, 
          duration: 0.6, 
          ease: "power2.out" 
        }, "start+=0.3")
        .from(".hero h1", { 
          y: -50, 
          opacity: 0, 
          duration: 0.7, 
          ease: "power3.out", 
          delay: 0.1 
        }, "start+=0.4")
        .from(".hero p", { 
          y: 30, 
          opacity: 0, 
          duration: 0.5, 
          ease: "power2.out", 
          delay: 0.15 
        }, "start+=0.5")
        .from(".btn", { 
          scale: 0.8, 
          opacity: 0, 
          duration: 0.6, 
          ease: "back.out(1.7)", 
          delay: 0.2 
        }, "start+=0.6")
        .add(animateTogDesktop, "start+=0.7")
        .add(animateAboutImageFrame, "start+=0.8");
    }
  }

  // ===== PRELOADER ANIMATION =====
  function runPreloader() {
    if (!preloader || typeof gsap === "undefined") {
      runInit();
      return;
    }
    
    const timeline = gsap.timeline({ onComplete: runInit });
    
    if (isMobile()) {
      timeline
        .set(".preloader", { opacity: 1, display: "flex" })
        .set([".ring1", ".ring2", ".ring3", ".core-logo"], { scale: 0.8, opacity: 0 })
        .set(".loader-title", { y: 20, opacity: 0 })
        .to([".ring1", ".ring2", ".ring3"], { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5, 
          ease: "power2.out", 
          stagger: 0.3 
        })
        .to(".core-logo", { 
          scale: 1, 
          opacity: 1, 
          duration: 0.5, 
          ease: "power2.out" 
        })
        .to(".loader-title", { 
          y: 0, 
          opacity: 1, 
          duration: 0.4, 
          ease: "power2.out" 
        })
        .to(".preloader", { 
          opacity: 0, 
          duration: 0.5, 
          delay: 0.5, 
          ease: "power2.out" 
        });
    } else {
      timeline
        .from(".ring1", { 
          scale: 0, 
          rotation: 0, 
          opacity: 0, 
          duration: 0.5, 
          ease: "back.out(1.7)" 
        })
        .from(".ring2", { 
          scale: 0, 
          rotation: 180, 
          opacity: 0, 
          duration: 0.5, 
          ease: "back.out(1.7)" 
        }, "-=0.2")
        .from(".ring3", { 
          scale: 0, 
          rotation: -180, 
          opacity: 0, 
          duration: 0.5, 
          ease: "back.out(1.7)" 
        }, "-=0.2")
        .from(".core-logo", { 
          scale: 0, 
          rotateY: 360, 
          opacity: 0, 
          duration: 0.5, 
          ease: "elastic.out(1, 0.5)" 
        }, "-=0.2")
        .from(".flare", { 
          scale: 0, 
          opacity: 0, 
          duration: 0.5, 
          ease: "power2.out" 
        }, "-=0.4")
        .from(".loader-title", { 
          y: 40, 
          opacity: 0, 
          duration: 0.4, 
          ease: "power2.out" 
        }, "-=0.3")
        .to(".preloader", { 
          opacity: 0, 
          duration: 0.5, 
          delay: 0.1, 
          ease: "power4.out" 
        });
    }
    
    // Continuous animations for desktop
    if (!isMobile()) {
      const flareAnim = gsap.to(".flare", { 
        rotation: 360, 
        duration: 4, 
        repeat: -1, 
        ease: "linear" 
      });
      const ring1Anim = gsap.to(".ring1", { 
        rotation: 360, 
        duration: 6, 
        repeat: -1, 
        ease: "none" 
      });
      
      animations.ringAnimations.push(flareAnim, ring1Anim);
    }
  }

  // ===== INITIALIZATION =====
  function init() {
    setupGSAP();
    setupMainTimeline();
    setupNavigation(); // Fixed navigation handling
    initTypedSkills(); // Initialize Typed.js exactly as it was
    
    // Run preloader or initialize directly
    if (document.readyState === "complete") {
      runInit();
    } else {
      runPreloader();
    }
    
    // Mobile initial styles
    if (isMobile()) {
      document.querySelectorAll(".part").forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      
      const frame = document.querySelector(".about-img-frame");
      if (frame) {
        frame.style.opacity = "1";
        frame.style.visibility = "visible";
      }
    }
    
    // Handle window resize
    window.addEventListener("resize", debounce(() => {
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
      setupScroll();
      
      if (!isMobile()) {
        animateTogDesktop();
        animateAboutImageFrame();
      }
    }, 200));
    
    // Clean up on page unload
    window.addEventListener("beforeunload", cleanupAnimations);
  }

  // Start everything
  init();
});
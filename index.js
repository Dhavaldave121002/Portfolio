document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // ===================== PERFORMANCE OPTIMIZATIONS =====================
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const isLowPower = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || isMobile;

  // Simplified defaults for low power devices
  if (isLowPower) {
    gsap.defaults({ 
      duration: 0.3,
      ease: "power2.out"
    });
  }

  // ===================== PRELOADER (OPTIMIZED) =====================
  const preloader = document.querySelector(".preloader");
  const preloaderTL = gsap.timeline();
  
  preloaderTL
    .from(".ring1, .ring2, .ring3", { 
      scale: 0, 
      opacity: 0, 
      duration: 0.4,
      stagger: 0.1 
    })
    .from(".core-logo", { 
      scale: 0, 
      duration: 0.4 
    }, "-=0.1")
    .from(".loader-title", { 
      y: 40, 
      opacity: 0, 
      duration: 0.3 
    }, "-=0.2")
    .to(".preloader", {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        preloader.style.display = "none";
        document.body.style.overflow = "auto";
        initMainAnimations();
      }
    });

  // ===================== MAIN ANIMATIONS =====================
  function initMainAnimations() {
    // Header animations
    const mainTL = gsap.timeline();
    
    mainTL
      .from(".logo", { 
        y: -60, 
        opacity: 0, 
        duration: 0.4, 
        ease: "bounce.out" 
      })
      .from(".nav .nav-item", { 
        x: 60, 
        opacity: 0, 
        duration: 0.2, 
        stagger: isMobile ? 0.02 : 0.03 
      }, "-=0.1")
      .from(".sec1", { 
        x: isMobile ? -30 : -80, 
        opacity: 0, 
        duration: 0.4 
      }, "start")
      .from(".sec2 img", { 
        x: isMobile ? 30 : 80, 
        opacity: 0, 
        duration: 0.4 
      }, "start")
      .from(".tog", { 
        opacity: 0, 
        x: -20, 
        duration: 0.3 
      }, "start");

    // Hero text
    gsap.from(".hero h1", { 
      y: -30, 
      opacity: 0, 
      duration: 0.4 
    });
    gsap.from(".hero p", { 
      y: 20, 
      opacity: 0, 
      duration: 0.3, 
      delay: 0.2 
    });

    // Initialize marquee after everything else
    setTimeout(initMarqueeScroll, 500);
  }

  // ===================== NAVIGATION TOGGLE =====================
  const menuIcon = document.querySelector(".menu-icon");
  const nav = document.querySelector(".main-nav");
  
  if (menuIcon && nav) {
    menuIcon.addEventListener("click", () => {
      nav.classList.toggle("active");
      document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "auto";
      
      gsap.fromTo(
        ".nav .nav-item",
        { opacity: 0, x: isMobile ? 30 : 60 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.15, 
          stagger: 0.03 
        }
      );
    });
  }

  // ===================== TOG BUTTON (OFFCANVAS) =====================
  const togButton = document.querySelector(".tog");
  if (togButton) {
    togButton.addEventListener("click", () => {
      const offcanvas = document.querySelector(".offcanvas-body");
      gsap.set(".offcanvas-body .social-icon i", { opacity: 1, x: 0 });
      gsap.set(".offcanvas-body .contact h3", { opacity: 1, x: 0 });
      gsap.to(togButton, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: "power1.inOut" });
      gsap.timeline()
        .from(".offcanvas-body .contact h3", { x: -100, opacity: 0, duration: 0.3, ease: "power1.out" })
        .from(".offcanvas-body .social-icon i", { x: -100, opacity: 0, duration: 0.2, ease: "power1.out", stagger: 0.05 }, "-=0.2");
      offcanvas.style.display = "block";
    });
  }

  // ===================== TYPED.JS =====================
  if (window.Typed) {
    new Typed("#typed-skills", {
      strings: ["Web Developer", "App Developer", "Frontend Developer", "UI/UX Designer"],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 700,
      loop: true,
    });
  }

  // ===================== SCROLLTRIGGER ANIMATIONS =====================
  function setupScrollAnimations() {
    // About section
    gsap.from(".about-img-wrapper", {
      scrollTrigger: {
        trigger: ".about-img-wrapper",
        start: "top 80%",
      },
      opacity: 0,
      scale: 0.8,
      duration: 0.4
    });

    gsap.from(".about-heading", {
      scrollTrigger: {
        trigger: ".about-heading",
        start: "top 85%",
      },
      opacity: 0,
      y: 20,
      duration: 0.4
    });

    gsap.from(".about-intro", {
      scrollTrigger: {
        trigger: ".about-intro",
        start: "top 90%",
      },
      opacity: 0,
      y: 20,
      duration: 0.4
    });

    // Mobile-specific animations
    ScrollTrigger.matchMedia({
      "(max-width: 767px)": function() {
        // Set initial state for mobile
        gsap.set(".part", { opacity: 0, x: -30, scale: 0.98 });
        
        // Create animation for mobile
        gsap.to(".part", {
          scrollTrigger: {
            trigger: ".part",
            start: "top 80%",
          },
          opacity: 0,
          scale: 0.8,
          duration: 0.4
        });

        // Other mobile animations...
        gsap.utils.toArray('.road-map-card').forEach((card, i) => {
          const icon = card.querySelector('.card-icon');
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 50%",
            },
            opacity: 0,
            x: 40,
            scale: 0.93,
            duration: 0.3,
            delay: i * 0.02,
            ease: "power2.out",
            onStart: () => {
              if (icon) {
                gsap.fromTo(icon,
                  { scale: 0.7, backgroundColor: "#111" },
                  { scale: 1, backgroundColor: "#ffd700", duration: 0.15, yoyo: true, repeat: 1, ease: "back.inOut(2)" }
                );
              }
            }
          });
        });

        // Add other mobile-specific animations here...
      },

      // Desktop/tablet animations
      "(min-width: 768px)": function() {
        gsap.from(".part", {
          scrollTrigger: {
            trigger: ".part",
            start: "top 80%",
          },
          opacity: 0,
          scale: 0.8,
          duration: 0.4
        });



        // Add other desktop-specific animations here...
      }
    });

    // Common animations for all devices
    gsap.from(".contact-card", {
      scrollTrigger: {
        trigger: ".contact-card",
        start: "top 85%",
      },
      opacity: 0,
      y: 20,
      duration: 0.3
    });

    gsap.from(".footer-copy", {
      scrollTrigger: {
        trigger: ".footer-copy",
        start: "top 100%",
      },
      opacity: 0,
      y: 10,
      duration: 0.3
    });
  }

  // ===================== PROJECT MODAL FUNCTIONS =====================
  const projects = {
    FireApp: {
      title: "Champion Site",
      description: "An all-in-one platform that lets users book services (like travel, appointments), order products (food, groceries, electronics), and manage stock market investments from a single dashboard.",
      github: "https://github.com/Dhavaldave121002/Champions_Site_Flutter",
    },
    IgniteUI: {
      title: "Travel App",
      description: "A modern travel platform that lets users search destinations, explore tour packages, and book trips — all from a beautifully designed, responsive interface built for fast performance and smooth navigation.",
      github: "https://github.com/Dhavaldave121002/Flutter_Travel_App",
    },
    BlazeWeb: {
      title: "Stock Management",
      description: "A lightweight, high-performance web app that allows users to track stock portfolios, view performance charts, and monitor investments in real-time — all within an animated, optimized dashboard interface.",
      github: "https://github.com/Dhavaldave121002/Stock-Management",
    },
  };

  window.openModal = function(projectKey) {
    const p = projects[projectKey];
    document.getElementById("modalTitle").textContent = p.title;
    document.getElementById("modalDescription").textContent = p.description;
    document.getElementById("modalGithub").href = p.github;
    
    gsap.fromTo("#projectModal", 
      { display: "none", opacity: 0 },
      { display: "block", opacity: 1, duration: 0.2 }
    );
  };

  window.closeModal = function() {
    gsap.to("#projectModal", {
      opacity: 0,
      duration: 0.15,
      onComplete: () => {
        document.getElementById("projectModal").style.display = "none";
      }
    });
  };

  // ===================== CONTACT FORM =====================
  function openGmailWithMessage(name, email, phone, message) {
    const subject = encodeURIComponent("Contact From Portfolio");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=dhavaldave121002@gmail.com&su=${subject}&body=${body}`, "_blank");
  }

  document.querySelector(".send-btn")?.addEventListener("click", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    if (name && email && phone && message) {
      openGmailWithMessage(name, email, phone, message);
    }
  });

  // ===================== MARQUEE =====================
  function initMarqueeScroll() {
    const marqueeTrack = document.querySelector('.marquee-track');
    if (!marqueeTrack) return;
    
    const marqueeAnim = gsap.to(marqueeTrack, {
      xPercent: -50,
      repeat: -1,
      ease: "none",
      duration: 8
    });

    ScrollTrigger.create({
      trigger: marqueeTrack,
      onEnter: () => marqueeAnim.play(),
      onLeaveBack: () => marqueeAnim.pause()
    });

    window.addEventListener('wheel', function(e) {
      if (e.deltaY > 0) {
        gsap.to(marqueeAnim, { timeScale: 1, duration: 0.3 });
        gsap.to(".marque i", { rotate: 180, duration: 0.2 });
      } else {
        gsap.to(marqueeAnim, { timeScale: -1, duration: 0.3 });
        gsap.to(".marque i", { rotate: 0, duration: 0.2 });
      }
    });
  }

  // ===================== INITIALIZE EVERYTHING =====================
  setupScrollAnimations();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        gsap.to(window, {
          scrollTo: target,
          duration: 0.8,
          ease: "power2.inOut"
        });
      }
    });
  });

  // Infinite rotation for decorative elements
  if (!isLowPower) {
    gsap.to(".flare", { 
      rotation: 360, 
      duration: 4, 
      repeat: -1, 
      ease: "linear" 
    });
    gsap.to(".ring1", { 
      rotation: 360, 
      duration: 6, 
      repeat: -1, 
      ease: "none" 
    });
  }
});
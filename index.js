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

  // ===================== PRELOADER (FASTER) =====================
  const preloader = document.querySelector(".preloader");
  const preloaderTL = gsap.timeline();
  
  preloaderTL
    .from(".ring1, .ring2, .ring3", { 
      scale: 0, 
      opacity: 0, 
      duration: 0.3,
      stagger: 0.1 
    })
    .from(".core-logo", { 
      scale: 0, 
      duration: 0.3 
    }, "-=0.1")
    .from(".loader-title", { 
      y: 40, 
      opacity: 0, 
      duration: 0.3 
    }, "-=0.2")
    .to(".preloader", {
      opacity: 0,
      duration: 0.3,
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
      duration: 0.1
    });

    gsap.from(".part", {
      scrollTrigger: {
        trigger: ".part",
        start: isMobile ? "top 85%" : "top 75%",
      },
      opacity: 0,
      y: 40,
      duration: 0.3
    });

    // Roadmap cards
    gsap.utils.toArray('.road-map-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: isMobile ? "top 90%" : "top 85%",
        },
        opacity: 0,
        y: isMobile ? 40 : 60,
        duration: 0.3,
        delay: i * (isMobile ? 0.02 : 0.03)
      });
    });

    // Services
    gsap.utils.toArray('.neon-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: isMobile ? "top 90%" : "top 85%",
        },
        opacity: 0,
        y: 40,
        duration: 0.3,
        delay: i * 0.02
      });
    });

    // Skills
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: isMobile ? "top 95%" : "top 90%",
        onEnter: () => {
          gsap.fromTo(card, 
            { opacity: 0, y: 30 }, 
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.3, 
              delay: i * 0.02 
            }
          );
          
          // Animate progress circles
          if (!card.dataset.animated) {
            card.dataset.animated = "true";
            const percentage = parseInt(card.dataset.percentage);
            const circle = card.querySelector("circle.progress");
            const label = card.querySelector(".percentage");
            
            if (circle && label) {
              let current = 0;
              const circumference = 2 * Math.PI * parseFloat(circle.getAttribute("r"));
              circle.style.strokeDasharray = circumference;
              
              const interval = setInterval(() => {
                if (current <= percentage) {
                  label.textContent = current + "%";
                  const offset = circumference - (circumference * current) / 100;
                  circle.style.strokeDashoffset = offset;
                  current++;
                } else {
                  clearInterval(interval);
                }
              }, isMobile ? 10 : 7);
            }
          }
        }
      });
    });

    // Projects
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: isMobile ? "top 90%" : "top 85%",
        },
        opacity: 0,
        y: 30,
        duration: 0.3,
        delay: i * 0.02
      });
    });

    // Contact section
    gsap.from(".contact-card", {
      scrollTrigger: {
        trigger: ".contact-card",
        start: "top 85%",
      },
      opacity: 0,
      y: 20,
      duration: 0.3
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

  // ===================== PROJECT MODAL =====================
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

    // Only interact with marquee when it's visible
    ScrollTrigger.create({
      trigger: marqueeTrack,
      onEnter: () => marqueeAnim.play(),
      onLeaveBack: () => marqueeAnim.pause()
    });

    // Speed control on scroll
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
  }
});
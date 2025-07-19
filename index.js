document.addEventListener("DOMContentLoaded", () => {
  // ======================
  // === DEVICE DETECTION ===
  // ======================
  const Device = {
    isMobile: () => window.matchMedia("(max-width: 767px)").matches,
    isTablet: () => window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches,
    isDesktop: () => window.matchMedia("(min-width: 1024px)").matches,
    isReducedMotion: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    canHover: () => window.matchMedia("(hover: hover)").matches,
    getType: function() {
      if (this.isMobile()) return 'mobile';
      if (this.isTablet()) return 'tablet';
      return 'desktop';
    }
  };

  // ======================
  // === PERFORMANCE UTILS ===
  // ======================
  const debounce = (func, wait = 100) => {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // ======================
  // === GSAP SETUP ===
  // ======================
  if (typeof gsap !== "undefined") {
    if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);
    if (typeof ScrollToPlugin !== "undefined") gsap.registerPlugin(ScrollToPlugin);
  }

  // ======================
  // === PRELOADER ===
  // ======================
  const preloader = document.querySelector(".preloader");
  let mainTimeline;

  function runInit() {
    if (preloader) preloader.style.display = "none";
    document.body.style.overflow = "auto";
    if (!Device.isMobile() && mainTimeline) mainTimeline.play();
    initTypedSkills();
    animateTogDesktop();
    animateAboutImageFrame();
    setupScrollAnimations();
  }

  // Preloader animation
  if (preloader && typeof gsap !== "undefined") {
    const timeline = gsap.timeline({ onComplete: runInit });
    
    if (Device.isMobile()) {
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
  } else {
    runInit();
  }

  // ======================
  // === TYPED ANIMATION ===
  // ======================
  function initTypedSkills() {
    const typedElement = document.getElementById("typed-skills");
    if (!typedElement) return;
    
    // Check if Typed.js is loaded
    if (typeof Typed !== "undefined") {
      new Typed("#typed-skills", {
        strings: ["Web Developer", "App Developer", "Frontend Developer", "UI/UX Designer"],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 700,
        loop: true,
        showCursor: true,
        cursorChar: "|",
        autoInsertCss: true
      });
    } else {
      // Fallback if Typed.js isn't available
      typedElement.textContent = "Web Developer";
    }
  }

  // ======================
  // === SPECIAL ANIMATIONS ===
  // ======================
  function animateTogDesktop() {
    const togs = document.querySelectorAll(".tog");
    if (!togs.length) return;

    if (!Device.isMobile() && typeof gsap !== "undefined") {
      gsap.set(togs, { opacity: 1, x: 0, scale: 1, pointerEvents: "auto" });
      gsap.fromTo(togs, {
        opacity: 0,
        scale: 0.5,
        y: -40,
        filter: "blur(6px)",
        backgroundColor: "#fff0"
      }, {
        opacity: 1,
        scale: 1.1,
        y: 0,
        filter: "blur(0px)",
        backgroundColor: "#ffd700",
        duration: 0.7,
        ease: "elastic.out(1, 0.6)",
        stagger: 0.1,
        onComplete: () => {
          gsap.to(togs, {
            scale: 1,
            backgroundColor: "#fff",
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
      gsap.to(togs, {
        y: "+=6",
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut"
      });
      gsap.to(togs, {
        boxShadow: "0 0 16px 4px #ffd70066",
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut"
      });
    } else {
      togs.forEach(tog => {
        tog.style.opacity = "1";
        tog.style.transform = "none";
      });
    }
  }

  function animateAboutImageFrame() {
    const wrapper = document.querySelector(".about-img-wrapper");
    const frame = document.querySelector(".image-frame");
    const img = document.querySelector(".about-img");
    const decorTop = document.querySelector(".decor-top-left");
    const decorBottom = document.querySelector(".decor-bottom-right");

    if (!wrapper || !frame || !img) {
        console.error("About image elements not found!");
        return;
    }

    // Reset styles to ensure elements are visible
    wrapper.style.opacity = "1";
    frame.style.opacity = "1";
    img.style.opacity = "1";
    frame.style.transform = "none";
    img.style.transform = "none";

    if (typeof gsap !== "undefined") {
        if (!Device.isMobile()) {
            // Desktop animation
            gsap.set([frame, img], {
                scale: 0.85,
                filter: "blur(6px)",
                opacity: 0
            });

            gsap.set([decorTop, decorBottom], {
                scale: 0,
                opacity: 0
            });

            // Main image animation
            gsap.to([frame, img], {
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    markers: false // Set to true for debugging
                },
                scale: 1,
                filter: "blur(0px)",
                opacity: 1,
                duration: 1.1,
                ease: "elastic.out(1, 0.6)"
            });

            // Corner decorations animation
            gsap.to([decorTop, decorBottom], {
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                stagger: 0.2
            });

            // Subtle floating animation
            gsap.to([frame, img], {
                y: "+=6",
                rotate: "+=1",
                repeat: -1,
                yoyo: true,
                duration: 3,
                ease: "sine.inOut"
            });

        } else {
            // Mobile animation
            gsap.set([frame, img], { opacity: 0, scale: 0.9 });
            gsap.set([decorTop, decorBottom], { scale: 0, opacity: 0 });

            gsap.to([frame, img], {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
            });

            gsap.to([decorTop, decorBottom], {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                delay: 0.3,
                stagger: 0.1
            });
        }
    } else {
        // Fallback if GSAP isn't available
        frame.style.opacity = "1";
        img.style.opacity = "1";
        decorTop.style.opacity = "1";
        decorBottom.style.opacity = "1";
    }
}

  // ======================
  // === MAIN TIMELINE ===
  // ======================
  if (!Device.isMobile() && typeof gsap !== "undefined") {
    mainTimeline = gsap.timeline({ paused: true });
    mainTimeline
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

  // ======================
  // === NAVIGATION ===
  // ======================
  const nav = document.querySelector(".main-nav");
  const menuIcon = document.querySelector(".menu-icon");
  const navItems = document.querySelectorAll(".nav-item");
  const navLinks = document.querySelectorAll('a[href^="#"]');

  function handleNavClick(e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) {
      console.warn("No matched section for:", targetId);
      return;
    }

    // Close Mobile Nav if open
    if (nav?.classList.contains("active")) {
      nav.classList.remove("active");
      document.body.style.overflow = "auto";
    }

    // Scroll using GSAP if available
    if (typeof gsap !== "undefined" && gsap.plugins?.scrollTo) {
      gsap.to(window, {
        duration: 0.8,
        scrollTo: { y: target, offsetY: 80, autoKill: false },
        onComplete: () => {
          if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
        }
      });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Initialize navigation links
  navLinks.forEach(link => {
    link.addEventListener("click", handleNavClick);
  });

  if (menuIcon && nav) {
    menuIcon.addEventListener("click", () => {
      nav.classList.toggle("active");
      document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "auto";
      
      if (!Device.isMobile() && typeof gsap !== "undefined") {
        if (nav.classList.contains("active")) {
          gsap.fromTo(navItems, 
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
          gsap.to(navItems, { 
            opacity: 0, 
            x: -50, 
            duration: 0.15,
            onComplete: () => {
              gsap.set(navItems, { opacity: 1, x: 0 });
            }
          });
        }
      }
    });

    // Close mobile menu when clicking nav items
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        if (Device.isMobile() && nav.classList.contains("active")) {
          nav.classList.remove("active");
          document.body.style.overflow = "auto";
        }
      });
    });
  }

  // ======================
  // === SCROLL ANIMATIONS ===
  // ======================
  function setupScrollAnimations() {
    if (typeof gsap === "undefined") return;

    // Mobile: Intersection Observer animations (lightweight)
    if (Device.isMobile()) {
      const ioAnimate = (els, { x = 0, y = 30, scale = 1, duration = 0.5, delay = 0 } = {}) => {
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              gsap.to(e.target, {
                opacity: 1, x: 0, y: 0, scale, duration, delay, ease: "power2.out"
              });
              obs.unobserve(e.target);
            }
          });
        }, { threshold: 0.1 });
        els.forEach(el => {
          gsap.set(el, { opacity: 0, x, y, scale });
          obs.observe(el);
        });
      };

      ioAnimate(document.querySelectorAll(".road-map-card, .neon-card, .project-card"));
      ioAnimate(document.querySelectorAll(".about-heading, .about-intro"), { y: 20, duration: 0.4 });
      ioAnimate(document.querySelectorAll(".contact-card"), { y: 20, duration: 0.3 });

      document.querySelectorAll(".skill-card").forEach(card => {
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              gsap.to(card, {
                opacity: 1, y: 0, duration: 0.4, ease: "power2.out",
                onComplete: () => animateSkillCircle(card)
              });
              obs.unobserve(card);
            }
          });
        }, { threshold: 0.1 });
        gsap.set(card, { opacity: 0, y: 40 });
        obs.observe(card);
      });
    } else {
      // Desktop: GSAP ScrollTrigger
      if (typeof ScrollTrigger === "undefined") return;

      gsap.utils.toArray(".road-map-card").forEach((card, i) => {
        const icon = card.querySelector(".card-icon");
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
          opacity: 0, y: 80, scale: 0.8, duration: 0.6, delay: i * 0.06, ease: "elastic.out(1, 0.4)",
          onStart: () => {
            if (icon) gsap.fromTo(icon, { scale: 0.6, backgroundColor: "#111" }, {
              scale: 1.18, backgroundColor: "#ffd700", duration: 0.2, yoyo: true, repeat: 1, ease: "back.inOut(2)"
            });
          }
        });
      });

      gsap.utils.toArray(".neon-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 92%", toggleActions: "play none none none" },
          opacity: 0, y: 60, scale: 0.9, duration: 0.5, delay: i * 0.04, ease: "back.out(1.5)"
        });
      });

      gsap.utils.toArray(".skill-card").forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card, start: "top 95%", toggleActions: "play none none none",
          onEnter: () => {
            gsap.fromTo(card, { opacity: 0, rotateY: 90 }, {
              opacity: 1, rotateY: 0, duration: 0.5, delay: i * 0.04, ease: "back.out(1.7)"
            });
            animateSkillCircle(card);
          }
        });
      });

      gsap.utils.toArray(".project-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 92%", toggleActions: "play none none none" },
          opacity: 0, y: 50, scale: 0.93, duration: 0.5, delay: i * 0.04, ease: "expo.out"
        });
      });

      ["about-heading", "about-intro", "footer-copy"].forEach(sel => {
        gsap.from(`.${sel}`, {
          scrollTrigger: { trigger: `.${sel}`, start: sel === "footer-copy" ? "top 100%" : "top 90%", toggleActions: "play none none none" },
          opacity: 0, y: 20, duration: 0.5, ease: "power2.out"
        });
      });
    }
  }

  function animateSkillCircle(card) {
    const pct = +card.dataset.percentage || 0;
    const fill = card.querySelector(".progress-fill");
    const lvl = card.querySelector(".skill-level");
    lvl.textContent = pct >= 80 ? "Expert" : pct >= 60 ? "Intermediate" : "Beginner";
    gsap.to(fill, { width: `${pct}%`, duration: 1.5, ease: "power2.out" });
  }

  // ======================
  // === PROJECT MODALS ===
  // ======================
  const projects = {
    FireApp: {
      title: "Champion Site",
      description: "A multi-module web app including ecommerce, food delivery, booking, and stock market pages. Built with responsive design and user authentication.Tech Used: Flutter(Dart), Firebase",
      github: "https://github.com/Dhavaldave121002/Champions_Site_Flutter",
    },
    IgniteUI: {
      title: "Travel App",
      description: "Mobile travel booking app showing destinations, pricing, and date filters. Designed using Flutter with a focus on user-friendly navigation.Tech Used: Flutter(Dart), Firebase",
      github: "https://github.com/Dhavaldave121002/Flutter_Travel_App",
    },
    BlazeWeb: {
      title: "Stock Management",
      description: "A desktop app to manage inventory, categories, users, and orders. Built with CRUD functionalities.Tech Used: ASP.NET",
      github: "https://github.com/Dhavaldave121002/Stock-Management",
    },
  };

  window.openModal = function(projectKey) {
    const p = projects[projectKey];
    if (!p) return;
    const modal = document.getElementById("projectModal");
    if (!modal) return;
    document.getElementById("modalTitle").textContent = p.title;
    document.getElementById("modalDescription").textContent = p.description;
    document.getElementById("modalGithub").href = p.github;
    modal.style.display = "block";
    if (!Device.isMobile() && typeof gsap !== "undefined") {
      gsap.from("#projectModal .modal-content", {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    } else {
      const content = modal.querySelector('.modal-content');
      if (content) {
        content.style.opacity = "1";
        content.style.transform = "none";
      }
    }
  };

  window.closeModal = function() {
    const modal = document.getElementById("projectModal");
    if (!modal) return;
    if (Device.isMobile() || typeof gsap === "undefined") {
      modal.style.display = "none";
    } else {
      gsap.to("#projectModal .modal-content", {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.15,
        ease: "power1.in",
        onComplete: () => {
          modal.style.display = "none";
        }
      });
    }
  };

  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.closest('a,button')) return;
      const key = card.dataset.project;
      window.openModal(key);
    });
  });

  document.addEventListener("click", (e) => {
    const modal = document.getElementById("projectModal");
    if (modal && modal.style.display === "block" && !e.target.closest(".modal-content") && !e.target.closest('.project-card')) {
      window.closeModal();
    }
  });

  // ======================
  // === CONTACT FORM ===
  // ======================
  function isMobileDevice() {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
  }

  function openGmailWithMessage(name = "", email = "", phone = "", message = "") {
    const subject = encodeURIComponent("Contact From Portfolio");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=dhavaldave121002@gmail.com&su=${subject}&body=${body}`, "_blank");
  }

  function sendMessage(name, email, phone, message) {
    if (isMobileDevice()) {
      const whatsappMessage = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`;
      const whatsappURL = `https://wa.me/918511172099?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappURL, "_blank");
    } else {
      openGmailWithMessage(name, email, phone, message);
    }
  }

  document.getElementById("emailLink")?.addEventListener("click", e => {
    e.preventDefault();
    const subject = encodeURIComponent("Contact From Portfolio");
    const mailtoLink = `mailto:dhavaldave121002@gmail.com?subject=${subject}`;
    window.location.href = mailtoLink;
  });

  document.getElementById("whatsappLink")?.addEventListener("click", e => {
    e.preventDefault();
    window.open(`https://wa.me/918511172099?text=${encodeURIComponent("Hi, I saw your portfolio and want to connect.")}`, "_blank");
  });

  document.getElementById("callLink")?.addEventListener("click", e => {
    e.preventDefault();
    window.open("tel:8511172099");
  });

  document.querySelector(".send-btn")?.addEventListener("click", e => {
    e.preventDefault();
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const message = document.getElementById("message")?.value.trim();
    if (!name || !email || !phone || !message) {
      alert("Please fill in all fields");
    } else {
      sendMessage(name, email, phone, message);
    }
  });

  // ======================
  // === MARQUEE ===
  // ======================
  function initMarquee() {
    const track = document.querySelector(".marquee-track");
    if (!track) return;
    if (Device.isMobile()) {
      track.style.animation = "marquee 20s linear infinite";
      if (!document.getElementById("marquee-style")) {
        const style = document.createElement("style");
        style.id = "marquee-style";
        style.textContent = `@keyframes marquee { 0% {transform: translateX(0);}100% {transform: translateX(-50%);} }`;
        document.head.appendChild(style);
      }
    } else if (typeof gsap !== "undefined") {
      const anim = gsap.to(track, { xPercent: -50, repeat: -1, ease: "none", duration: 20 });
      window.addEventListener("wheel", e => {
        gsap.to(anim, { timeScale: e.deltaY > 0 ? 1 : -1, duration: 0.5 });
        gsap.to(".marque i", { rotate: e.deltaY > 0 ? 180 : 0, duration: 0.2 });
      });
    }
  }
  initMarquee();

  // ======================
  // === RESIZE HANDLER ===
  // ======================
  window.addEventListener("resize", debounce(() => {
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
    setupScrollAnimations();
    if (!Device.isMobile()) {
      animateTogDesktop();
      animateAboutImageFrame();
    }
  }));

  // ======================
  // === MOBILE FALLBACK ===
  // ======================
  if (Device.isMobile()) {
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
});
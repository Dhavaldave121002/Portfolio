document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // ===================== PRELOADER =====================
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    gsap.timeline()
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
        ease: "power4.out",
        onComplete: () => {
          preloader.style.display = "none";
          document.body.style.overflow = "auto";
          if (mainTimeline) mainTimeline.play();
        },
      });
  }

  // ===================== HEADER & HERO (on load) =====================
  const mainTimeline = gsap.timeline({ paused: true });
  gsap.set(".tog", { opacity: 0, x: -30, scale: 0.8, pointerEvents: "none" });
  
  mainTimeline
    .from(".logo", { 
      y: -80, 
      opacity: 0, 
      duration: 0.5, 
      ease: "bounce.out", 
      scale: 0.5 
    }, "start")
    .from(".logo img", { 
      rotation: 360, 
      transformOrigin: "center", 
      duration: 0.5, 
      ease: "power2.out" 
    }, "start")
    .from(".nav .nav-item", { 
      x: 80, 
      opacity: 0, 
      duration: 0.2, 
      ease: "back.out", 
      scale: 0.5, 
      stagger: 0.05 
    }, "start")
    .from(".sec1", { 
      x: -100, 
      opacity: 0, 
      duration: 0.5, 
      ease: "power2.out" 
    }, "start")
    .from(".sec2 img", { 
      x: 100, 
      opacity: 0, 
      duration: 0.5, 
      ease: "power2.out" 
    }, "start")
    .to(".tog", {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
      pointerEvents: "auto",
      onStart: () => {
        gsap.to(".tog", {
          backgroundColor: "#e6b800",
          duration: 0.2,
          repeat: 1,
          yoyo: true,
          ease: "power1.inOut",
        });
      },
    }, "start");

  // --- HERO TEXT (on load) ---
  gsap.from(".hero h1", { 
    duration: 0.6, 
    y: -50, 
    opacity: 0, 
    ease: "power3.out", 
    delay: 0.2 
  });
  gsap.from(".hero p", { 
    duration: 0.4, 
    delay: 0.3, 
    y: 30, 
    opacity: 0, 
    ease: "power2.out" 
  });
  gsap.from(".btn", { 
    duration: 0.4, 
    delay: 0.5, 
    scale: 0.8, 
    opacity: 0, 
    ease: "back.out(1.7)" 
  });

  // ===================== NAVIGATION: MOBILE TOGGLE =====================
  const menuIcon = document.querySelector(".menu-icon");
  const nav = document.querySelector(".main-nav");
  if (menuIcon && nav) {
    menuIcon.addEventListener("click", () => {
      nav.classList.toggle("active");
      if (nav.classList.contains("active")) {
        gsap.fromTo(
          ".nav .nav-item",
          { opacity: 0, x: 100 },
          { 
            opacity: 1, 
            x: 0, 
            stagger: 0.08, 
            duration: 0.15, 
            ease: "power2.out" 
          }
        );
        document.body.style.overflow = "hidden";
      } else {
        gsap.to(".nav .nav-item", { 
          opacity: 0, 
          x: -50, 
          duration: 0.15 
        });
        document.body.style.overflow = "auto";
      }
    });
  }

  // ===================== TOG BUTTON (OFFCANVAS) =====================
  const togButton = document.querySelector(".tog");
  if (togButton) {
    togButton.addEventListener("click", () => {
      const offcanvas = document.querySelector(".offcanvas-body");
      gsap.set(".offcanvas-body .social-icon i", { opacity: 1, x: 0 });
      gsap.set(".offcanvas-body .contact h3", { opacity: 1, x: 0 });
      gsap.to(togButton, { 
        scale: 0.9, 
        duration: 0.1, 
        yoyo: true, 
        repeat: 1, 
        ease: "power1.inOut" 
      });
      
      gsap.timeline()
        .from(".offcanvas-body .contact h3", { 
          x: -100, 
          opacity: 0, 
          duration: 0.3, 
          ease: "power1.out" 
        })
        .from(".offcanvas-body .social-icon i", { 
          x: -100, 
          opacity: 0, 
          duration: 0.2, 
          ease: "power1.out", 
          stagger: 0.05 
        }, "-=0.2");
      
      if (offcanvas) offcanvas.style.display = "block";
    });
  }

  // ===================== TYPED.JS =====================
  if (window.Typed) {
    try {
      new Typed("#typed-skills", {
        strings: ["Web Developer", "App Developer", "Frontend Developer", "UI/UX Designer"],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 700,
        loop: true,
      });
    } catch (e) {
      console.error("Typed.js initialization error:", e);
    }
  }

  // ===================== RESPONSIVE SCROLLTRIGGER ANIMATIONS =====================
  function setupDesktopAnimations() {
    // About text
    // gsap.from(".part", {
    //   scrollTrigger: {
    //     trigger: ".part",
    //     // start: "top 85%",
    //     toggleActions: "play none none none",
    //     markers: false
    //   },
    //   opacity: 0,
    //   y: 60,
    //   scale: 0.97,
    //   duration: 0.5,
    //   ease: "power3.out"
    // });

    // Roadmap cards
    gsap.utils.toArray('.road-map-card').forEach((card, i) => {
      const icon = card.querySelector('.card-icon');
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 80,
        scale: 0.8,
        duration: 0.5,
        delay: i * 0.06,
        ease: "bounce.out",
        onStart: () => {
          if (icon) {
            gsap.fromTo(icon,
              { scale: 0.6, backgroundColor: "#111" },
              { 
                scale: 1.15, 
                backgroundColor: "#ffd700", 
                duration: 0.2, 
                yoyo: true, 
                repeat: 1, 
                ease: "back.inOut(2)" 
              }
            );
          }
        }
      });
    });

    // Services
    gsap.utils.toArray('.neon-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 92%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 0.4,
        delay: i * 0.04,
        ease: "back.out(1.5)"
      });
    });

    // Skills
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 95%",
        toggleActions: "play none none none",
        onEnter: () => {
          gsap.fromTo(card, 
            { opacity: 0, rotateY: 90 }, 
            { 
              opacity: 1, 
              rotateY: 0, 
              duration: 0.4, 
              delay: i * 0.04, 
              ease: "back.out(1.7)" 
            }
          );
          
          // Progress circle animation
          const percentage = parseInt(card.dataset.percentage) || 0;
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
            }, 10);
          }
        }
      });
    });

    // Projects
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 92%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        scale: 0.93,
        duration: 0.4,
        delay: i * 0.04,
        ease: "expo.out"
      });
    });
  }

  function setupMobileAnimations() {
    // About text
    // gsap.from(".part", {
    //   scrollTrigger: {
    //     trigger: ".part",
    //     start: "top 90%",
    //     end: "top 50%",
    //     toggleActions: "play none none none",
    //     markers: false
    //   },
    //   opacity: 0,
    //   x: -30,
    //   scale: 0.98,
    //   duration: 0.3,
    //   ease: "power2.out"
    // });

    // Roadmap cards
    gsap.utils.toArray('.road-map-card').forEach((card, i) => {
      const icon = card.querySelector('.card-icon');
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 98%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        x: 40,
        scale: 0.93,
        duration: 0.3,
        delay: i * 0.03,
        ease: "power2.out",
        onStart: () => {
          if (icon) {
            gsap.fromTo(icon,
              { scale: 0.7, backgroundColor: "#111" },
              { 
                scale: 1, 
                backgroundColor: "#ffd700", 
                duration: 0.15, 
                yoyo: true, 
                repeat: 1, 
                ease: "back.inOut(2)" 
              }
            );
          }
        }
      });
    });

    // Services
    gsap.utils.toArray('.neon-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 98%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        x: 30,
        scale: 0.95,
        duration: 0.3,
        delay: i * 0.03,
        ease: "back.out(1.5)"
      });
    });

    // Skills
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 99%",
        toggleActions: "play none none none",
        onEnter: () => {
          gsap.fromTo(card, 
            { opacity: 0, y: 40 }, 
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.3, 
              delay: i * 0.03, 
              ease: "back.out(1.7)" 
            }
          );
          
          // Progress circle animation
          const percentage = parseInt(card.dataset.percentage) || 0;
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
            }, 10);
          }
        }
      });
    });

    // Projects
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 98%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        x: 30,
        scale: 0.97,
        duration: 0.3,
        delay: i * 0.03,
        ease: "expo.out"
      });
    });
  }

  // Set up responsive ScrollTriggers
  ScrollTrigger.matchMedia({
    // Desktop/tablet
    "(min-width: 768px)": function() {
      setupDesktopAnimations();
    },
    // Mobile
    "(max-width: 767px)": function() {
      setupMobileAnimations();
    }
  });

  // ===================== COMMON ANIMATIONS =====================
  // About image & heading
  // gsap.from(".about-img-wrapper", {
  //   scrollTrigger: {
  //     trigger: ".about-img-wrapper",
  //     start: "top 85%",
  //     toggleActions: "play none none none"
  //   },
  //   opacity: 0,
  //   scale: 0.7,
  //   duration: 0.4
  // });

  gsap.from(".about-heading", {
    scrollTrigger: {
      trigger: ".about-heading",
      start: "top 85%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 20,
    duration: 0.4
  });

  gsap.from(".about-intro", {
    scrollTrigger: {
      trigger: ".about-intro",
      start: "top 90%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 20,
    duration: 0.4
  });

  // Contact section
  gsap.from(".contact-card", {
    scrollTrigger: {
      trigger: ".contact-card",
      start: "top 90%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 20,
    duration: 0.3
  });

  // Footer
  gsap.from(".footer-copy", {
    scrollTrigger: {
      trigger: ".footer-copy",
      start: "top 100%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    y: 10,
    duration: 0.3
  });

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
    if (!p) return;
    
    const modal = document.getElementById("projectModal");
    if (!modal) return;
    
    document.getElementById("modalTitle").textContent = p.title;
    document.getElementById("modalDescription").textContent = p.description;
    document.getElementById("modalGithub").href = p.github;
    modal.style.display = "block";
    
    gsap.from("#projectModal .modal-content", { 
      y: 20, 
      opacity: 0, 
      duration: 0.2, 
      ease: "back.out(1.7)" 
    });
  };

  window.closeModal = function() {
    const modal = document.getElementById("projectModal");
    if (!modal) return;
    
    gsap.to("#projectModal .modal-content", {
      y: 20, 
      opacity: 0, 
      duration: 0.15, 
      ease: "power1.in",
      onComplete: () => { 
        modal.style.display = "none"; 
      }
    });
  };

  // Close modal when clicking outside content
  document.addEventListener("click", (e) => {
    const modal = document.getElementById("projectModal");
    if (modal && modal.style.display === "block" && !e.target.closest(".modal-content")) {
      closeModal();
    }
  });

  // ===================== CONTACT FORM & ICONS =====================
  function openGmailWithMessage(name, email, phone, message) {
    const subject = encodeURIComponent("Contact From Portfolio");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=dhavaldave121002@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  }

  const sendBtn = document.querySelector(".send-btn");
  if (sendBtn) {
    sendBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const name = document.getElementById("name")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const phone = document.getElementById("phone")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";
      
      if (!name || !email || !phone || !message) {
        alert("Please fill in all fields");
        return;
      }
      
      openGmailWithMessage(name, email, phone, message);
    });
  }

  const emailLink = document.getElementById("emailLink");
  if (emailLink) {
    emailLink.addEventListener("click", function (e) {
      e.preventDefault();
      const name = document.getElementById("name")?.value.trim() || "Visitor";
      const email = document.getElementById("email")?.value.trim() || "No email";
      const phone = document.getElementById("phone")?.value.trim() || "No phone";
      const message = document.getElementById("message")?.value.trim() || "Hi, I'd like to connect with you.";
      openGmailWithMessage(name, email, phone, message);
    });
  }

  const whatsappLink = document.getElementById("whatsappLink");
  if (whatsappLink) {
    whatsappLink.addEventListener("click", function (e) {
      e.preventDefault();
      const name = document.getElementById("name")?.value.trim() || "Visitor";
      const phone = "918511172099";
      const text = encodeURIComponent(`Hi, I'm ${name}. I saw your portfolio and want to connect.`);
      window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    });
  }

  const callLink = document.getElementById("callLink");
  if (callLink) {
    callLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.open("tel:8511172099");
    });
  }

  // ===================== SMOOTH SCROLL FOR ANCHORS =====================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href === "#") return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // ===================== MARQUEE =====================
  function initMarqueeScroll() {
    const marqueeTrack = document.querySelector('.marquee-track');
    if (!marqueeTrack) return;
    
    const marqueeAnim = gsap.to(marqueeTrack, {
      xPercent: -50,
      repeat: -1,
      ease: "none",
      duration: 20
    });
    
    window.addEventListener('wheel', function (e) {
      if (e.deltaY > 0) {
        gsap.to(marqueeAnim, { timeScale: 1, duration: 0.5 });
        gsap.to(".marque i", { 
          rotate: 180, 
          duration: 0.2, 
          ease: "power2.out" 
        });
      } else {
        gsap.to(marqueeAnim, { timeScale: -1, duration: 0.5 });
        gsap.to(".marque i", { 
          rotate: 0, 
          duration: 0.2, 
          ease: "power2.out" 
        });
      }
    });
  }
  
  initMarqueeScroll();

  // ===================== INFINITE ANIMATIONS =====================
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

  // ===================== CLEAN UP ON UNLOAD =====================
  window.addEventListener('beforeunload', () => {
    // Kill all GSAP animations to prevent memory leaks
    gsap.globalTimeline.getChildren().forEach(anim => anim.kill());
    ScrollTrigger.getAll().forEach(st => st.kill());
  });
});
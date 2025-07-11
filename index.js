document.addEventListener("DOMContentLoaded", () => {
  // Enhanced mobile detection
  const isMobile = window.matchMedia("(max-width: 767px)").matches || 
                  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Always register GSAP plugins (simpler animations will be used for mobile)
  gsap.registerPlugin(ScrollTrigger);

  // ===================== PRELOADER =====================
  const preloader = document.querySelector(".preloader");
  const mainTimeline = gsap.timeline({ paused: true }); // Define mainTimeline early

  if (preloader) {
    if (isMobile) {
      // Mobile-optimized preloader animation
      gsap.timeline()
        .from(".preloader *", { 
          opacity: 0, 
          y: 20, 
          duration: 0.4, 
          stagger: 0.1,
          ease: "power2.out" 
        })
        .to(preloader, { 
          opacity: 0, 
          duration: 0.6, 
          delay: 0.8,
          ease: "power2.out",
          onComplete: () => {
            preloader.style.display = "none";
            document.body.style.overflow = "auto";
            if (mainTimeline) mainTimeline.play();
          }
        });
    } else {
      // Desktop preloader animation
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
  }

  // ===================== HEADER & HERO =====================
  // Initialize main timeline (moved before preloader completion)
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

  // Hero animations (will play after preloader)
  const heroTimeline = gsap.timeline({ paused: true });
  heroTimeline
    .from(".hero h1", { 
      duration: 0.6, 
      y: -50, 
      opacity: 0, 
      ease: "power3.out" 
    })
    .from(".hero p", { 
      duration: 0.4, 
      y: 30, 
      opacity: 0, 
      ease: "power2.out" 
    }, "-=0.3")
    .from(".btn", { 
      duration: 0.4, 
      scale: 0.8, 
      opacity: 0, 
      ease: "back.out(1.7)" 
    }, "-=0.2");

  // Play hero timeline when main timeline starts
  mainTimeline.add(() => heroTimeline.play(), "start+=0.2");

  // ===================== NAVIGATION =====================
  const menuIcon = document.querySelector(".menu-icon");
  const nav = document.querySelector(".main-nav");
  if (menuIcon && nav) {
    menuIcon.addEventListener("click", () => {
      nav.classList.toggle("active");
      if (nav.classList.contains("active")) {
        gsap.fromTo(
          ".nav .nav-item",
          { opacity: 0, x: isMobile ? 30 : 100 },
          { 
            opacity: 1, 
            x: 0, 
            stagger: isMobile ? 0.05 : 0.08, 
            duration: 0.15, 
            ease: "power2.out" 
          }
        );
        document.body.style.overflow = "hidden";
      } else {
        gsap.to(".nav .nav-item", { 
          opacity: 0, 
          x: isMobile ? -30 : -50, 
          duration: 0.15 
        });
        document.body.style.overflow = "auto";
      }
    });
  }

  // ===================== RESPONSIVE ANIMATIONS =====================
  function setupAnimations() {
    // Common animation function
    const animateOnScroll = (selector, options) => {
      gsap.utils.toArray(selector).forEach((element, i) => {
        ScrollTrigger.create({
          trigger: element,
          start: options.start || "top 90%",
          toggleActions: "play none none none",
          onEnter: () => {
            gsap.fromTo(element, 
              { 
                opacity: 0, 
                y: options.y || 40, 
                x: options.x || 0,
                scale: options.scale || 0.95 
              }, 
              { 
                opacity: 1, 
                y: 0, 
                x: 0,
                scale: 1,
                duration: options.duration || 0.5,
                delay: i * (options.delay || 0.04),
                ease: options.ease || "back.out(1.7)"
              }
            );
            
            // Special handling for skill cards
            if (element.classList.contains('skill-card')) {
              const percentage = parseInt(element.dataset.percentage) || 0;
              const circle = element.querySelector("circle.progress");
              const label = element.querySelector(".percentage");
              
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
          }
        });
      });
    };

    // Apply animations to all sections
    animateOnScroll('.road-map-card', { 
      y: 80, 
      ease: "bounce.out",
      onStart: (el) => {
        const icon = el.querySelector('.card-icon');
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

    animateOnScroll('.neon-card', { 
      y: 60, 
      scale: 0.9 
    });

    animateOnScroll('.skill-card', { 
      rotateY: isMobile ? 0 : 90,
      scale: 0.9
    });

    animateOnScroll('.project-card', { 
      y: 50, 
      scale: 0.93,
      ease: "expo.out"
    });

    animateOnScroll('.about-heading, .about-intro', { 
      y: 20, 
      duration: 0.4 
    });

    animateOnScroll('.contact-card', { 
      y: 20, 
      duration: 0.3 
    });

    animateOnScroll('.footer-copy', { 
      y: 10, 
      duration: 0.3 
    });
  }

  // Initialize animations after a slight delay
  setTimeout(setupAnimations, 100);

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

  // Close modal when clicking outside
  document.addEventListener("click", (e) => {
    const modal = document.getElementById("projectModal");
    if (modal && modal.style.display === "block" && !e.target.closest(".modal-content")) {
      closeModal();
    }
  });

  // ===================== CONTACT FORM =====================
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

  // ===================== SMOOTH SCROLL =====================
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
    
    if (isMobile) {
      marqueeTrack.style.animation = "marquee 20s linear infinite";
      const style = document.createElement('style');
      style.textContent = `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `;
      document.head.appendChild(style);
    } else {
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

  // ===================== CLEAN UP =====================
  window.addEventListener('beforeunload', () => {
    gsap.globalTimeline.getChildren().forEach(anim => anim.kill());
    ScrollTrigger.getAll().forEach(st => st.kill());
  });
});
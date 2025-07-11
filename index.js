document.addEventListener("DOMContentLoaded", () => {
  // ===================== UTILITY FUNCTIONS =====================
  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
  
  const debounce = (func, wait = 100) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // ===================== GSAP INITIALIZATION =====================
  if (!isMobile()) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ===================== PRELOADER ANIMATION =====================
  const preloader = document.querySelector(".preloader");
  let mainTimeline;

  // Initialize main timeline for desktop
  if (!isMobile()) {
    mainTimeline = gsap.timeline({ paused: true });
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

    // Hero text animations
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
  }

  // Handle preloader for all devices
  if (preloader) {
    if (isMobile()) {
      // Mobile preloader with simple fade but still animated
      gsap.set(".preloader", { opacity: 1, display: "flex" });
      gsap.set([".ring1", ".ring2", ".ring3"], { scale: 0.8, opacity: 0 });
      gsap.set(".core-logo", { scale: 0.8, opacity: 0 });
      gsap.set(".loader-title", { y: 20, opacity: 0 });

      // Mobile animation sequence
      gsap.timeline()
        .to(".ring1", {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        })
        .to(".ring2", {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.3")
        .to(".ring3", {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.3")
        .to(".core-logo", {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.3")
        .to(".loader-title", {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.2")
        .to(".preloader", {
          opacity: 0,
          duration: 0.5,
          delay: 0.5,
          ease: "power2.out",
          onComplete: () => {
            preloader.style.display = "none";
            document.body.style.overflow = "auto";
          }
        });
    } else {
      // Desktop preloader with GSAP
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

  // ===================== NAVIGATION =====================
  const menuIcon = document.querySelector(".menu-icon");
  const nav = document.querySelector(".main-nav");
  
  if (menuIcon && nav) {
    menuIcon.addEventListener("click", () => {
      nav.classList.toggle("active");
      
      if (isMobile()) {
        document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "auto";
      } else {
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
      }
    });
  }

  // Close mobile menu when clicking on nav items
  document.querySelectorAll('.nav-item a').forEach(item => {
    item.addEventListener('click', () => {
      if (isMobile() && nav.classList.contains('active')) {
        nav.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // ===================== SCROLL ANIMATIONS =====================
  const setupScrollAnimations = () => {
    if (isMobile()) {
      // Mobile animations with Intersection Observer
      const animateOnScroll = (elements, options) => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target;
              gsap.to(el, {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                duration: options.duration || 0.4,
                ease: "power2.out",
                delay: options.delay || 0
              });
              observer.unobserve(el);
            }
          });
        }, { threshold: 0.1 });

        elements.forEach(el => {
          gsap.set(el, { 
            opacity: 0, 
            y: options.y || 30,
            x: options.x || 0,
            scale: options.scale || 1
          });
          observer.observe(el);
        });
      };

      // Animate sections
      animateOnScroll(document.querySelectorAll('.road-map-card, .neon-card, .project-card'), {
        y: 30,
        duration: 0.5
      });

      animateOnScroll(document.querySelectorAll('.about-heading, .about-intro'), {
        y: 20,
        duration: 0.4
      });

      animateOnScroll(document.querySelectorAll('.contact-card'), {
        y: 20,
        duration: 0.3
      });

      // Special handling for skill cards with progress animation
      document.querySelectorAll('.skill-card').forEach(card => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out",
                onComplete: () => {
                  // Animate progress circle
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
              observer.unobserve(card);
            }
          });
        }, { threshold: 0.1 });

        gsap.set(card, { opacity: 0, y: 40 });
        observer.observe(card);
      });
    } else {
      // Desktop animations with GSAP ScrollTrigger
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
    }
  };

  // Initialize scroll animations
  setupScrollAnimations();

  // Refresh on resize
  window.addEventListener('resize', debounce(() => {
    if (!isMobile()) {
      ScrollTrigger.refresh();
    }
    setupScrollAnimations();
  }));

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
    
    if (!isMobile()) {
      gsap.from("#projectModal .modal-content", { 
        y: 20, 
        opacity: 0, 
        duration: 0.2, 
        ease: "back.out(1.7)" 
      });
    }
  };

  window.closeModal = function() {
    const modal = document.getElementById("projectModal");
    if (!modal) return;
    
    if (isMobile()) {
      modal.style.display = "none";
    } else {
      gsap.to("#projectModal .modal-content", {
        y: 20, 
        opacity: 0, 
        duration: 0.15, 
        ease: "power1.in",
        onComplete: () => { 
          modal.style.display = "none"; 
        }
      });
    }
  };

  // Close modal when clicking outside content
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

  // Contact icons functionality
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
        
        // Close mobile menu if open
        if (isMobile() && nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
          document.body.style.overflow = 'auto';
        }
      }
    });
  });

  // ===================== MARQUEE =====================
  const initMarquee = () => {
    const marqueeTrack = document.querySelector('.marquee-track');
    if (!marqueeTrack) return;
    
    if (isMobile()) {
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
  };
  initMarquee();

  // ===================== INFINITE ANIMATIONS =====================
  if (!isMobile()) {
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

  // ===================== CLEAN UP =====================
  window.addEventListener('beforeunload', () => {
    if (!isMobile()) {
      gsap.globalTimeline.getChildren().forEach(anim => anim.kill());
      ScrollTrigger.getAll().forEach(st => st.kill());
    }
  });

  // ===================== INITIAL MOBILE SETUP =====================
  if (isMobile()) {
    document.querySelectorAll('.part').forEach(section => {
      section.style.opacity = '1';
      section.style.transform = 'none';
    });
  }
});
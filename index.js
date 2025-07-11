document.addEventListener("DOMContentLoaded", () => {
  // ===================== UTILITY FUNCTIONS =====================
  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
  const isTablet = () => window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches;
  
  // Debounce function for resize events
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

  if (!isMobile()) {
    // Initialize main timeline for desktop
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

  if (preloader) {
    if (isMobile()) {
      // Mobile preloader
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
          document.body.style.overflow = 'auto';
        }, 300);
      }, 1500);
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

  // ===================== TOG BUTTON (OFFCANVAS) =====================
  const togButton = document.querySelector(".tog");
  if (togButton) {
    togButton.addEventListener("click", () => {
      const offcanvas = document.querySelector(".offcanvas-body");
      if (offcanvas) {
        if (isMobile()) {
          offcanvas.style.display = offcanvas.style.display === 'block' ? 'none' : 'block';
        } else {
          if (offcanvas.style.display !== 'block') {
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
            
            offcanvas.style.display = "block";
          } else {
            offcanvas.style.display = "none";
          }
        }
      }
    });
  }

  // ===================== TYPED.JS =====================
  if (window.Typed && !isMobile()) {
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

  // ===================== SCROLL ANIMATIONS =====================
  const setupScrollAnimations = () => {
    // Common elements to animate
    const animateElements = [
      { selector: '.road-map-card, .neon-card, .project-card', options: { y: 50, opacity: 0 } },
      { selector: '.about-heading, .about-intro', options: { y: 20, opacity: 0 } },
      { selector: '.contact-card', options: { y: 20, opacity: 0 } },
      { selector: '.footer-copy', options: { y: 10, opacity: 0 } }
    ];

    if (isMobile()) {
      // Mobile animations with Intersection Observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.style.transition = 'all 0.4s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.1 });

      animateElements.forEach(item => {
        document.querySelectorAll(item.selector).forEach(el => {
          el.style.opacity = item.options.opacity;
          el.style.transform = `translateY(${item.options.y}px)`;
          observer.observe(el);
        });
      });

      // Special handling for skill cards
      document.querySelectorAll('.skill-card').forEach(card => {
        const cardObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const card = entry.target;
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
              
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
              
              cardObserver.unobserve(card);
            }
          });
        }, { threshold: 0.1 });

        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        cardObserver.observe(card);
      });
    } else {
      // Desktop animations with GSAP ScrollTrigger
      animateElements.forEach(item => {
        gsap.utils.toArray(item.selector).forEach((el, i) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            },
            y: item.options.y,
            opacity: 0,
            duration: 0.4,
            delay: i * 0.05,
            ease: "power2.out"
          });
        });
      });

      // Roadmap cards with bounce effect
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

      // Skills cards with 3D rotation
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
    }
  };

  // Initialize scroll animations
  setupScrollAnimations();

  // Re-run setup on resize (with debounce)
  window.addEventListener('resize', debounce(() => {
    ScrollTrigger.refresh();
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
  const setupContactIcons = () => {
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
  };
  setupContactIcons();

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
        if (isMobile() && nav.classList.contains('active')) {
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

  // ===================== RESPONSIVE ADJUSTMENTS =====================
  // Ensure part sections are visible on mobile
  if (isMobile()) {
    document.querySelectorAll('.part').forEach(section => {
      section.style.opacity = '1';
      section.style.transform = 'none';
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // 📦 Element References
  const menuIcon = document.querySelector(".menu-icon");
  const nav = document.querySelector(".main-nav");
  const preloader = document.querySelector(".preloader");
  const togButton = document.querySelector(".tog");
  const navLinks = document.querySelectorAll(".nav-link");
  let isMenuOpen = false;

  // 🌀 PRELOADER ANIMATION
  const loaderTimeline = gsap.timeline();

  loaderTimeline
    .from(".ring1", {
      scale: 0,
      rotation: 0,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    })
    .from(
      ".ring2",
      {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.5"
    )
    .from(
      ".ring3",
      {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
      },
      "-=0.5"
    )
    .from(
      ".core-logo",
      {
        scale: 0,
        rotateY: 360,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.5"
    )
    .from(
      ".flare",
      {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=1"
    )
    .from(
      ".loader-title",
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.8"
    )
    .to(".preloader", {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power4.out",
      onComplete: () => {
        preloader.style.display = "none";
        document.body.style.overflow = "auto";
        mainTimeline.play();
        setupScrollAnimations();
      },
    });

  // 🌟 MAIN TIMELINE ANIMATIONS
  const mainTimeline = gsap.timeline({ paused: true });

  // Initialize elements
  gsap.set(".tog", {
    opacity: 0,
    x: -30,
    scale: 0.8,
    pointerEvents: "none",
    display: "none"
  });

  // Build main animations
  mainTimeline
    .from(".logo", {
      y: -80,
      opacity: 0,
      duration: 2,
      ease: "bounce.out",
      scale: 0.5,
    }, "start")
    .from(".logo img", {
      rotation: 360,
      transformOrigin: "center",
      duration: 1.5,
      ease: "power2.out",
    }, "start")
    .from(".nav .nav-item", {
      x: 80,
      opacity: 0,
      duration: 0.5,
      ease: "back.out",
      scale: 0.5,
      stagger: 0.1,
    }, "start")
    .from(".sec1", {
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    }, "start")
    .from(".sec2 img", {
      x: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    }, "start")
    .to(".tog", {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "back.out(1.7)",
      pointerEvents: "auto",
      display: "flex",
      onStart: () => {
        gsap.to(".tog", {
          backgroundColor: "#e6b800",
          duration: 0.5,
          repeat: 1,
          yoyo: true,
          ease: "power1.inOut",
        });
      },
    }, "start+=2");

  // 🔤 TYPED.JS INITIALIZATION
  const typed = new Typed("#typed-skills", {
    strings: [
      "Web Developer",
      "App Developer",
      "Frontend Developer",
      "UI/UX Designer",
    ],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1500,
    loop: true,
  });

  // 📱 MENU TOGGLE FUNCTIONALITY
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      nav.classList.add("active");
      gsap.fromTo(
        ".nav .nav-item",
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.3,
          ease: "power2.out",
        }
      );
      gsap.to(".tog", { opacity: 0, pointerEvents: "none", duration: 0.3 });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(".nav .nav-item", {
        opacity: 0,
        x: -50,
        duration: 0.3,
        onComplete: () => {
          nav.classList.remove("active");
          gsap.to(".tog", { 
            opacity: 1, 
            pointerEvents: "auto", 
            duration: 0.3,
            delay: 0.3
          });
        }
      });
      document.body.style.overflow = "auto";
    }
  }

  if (menuIcon) menuIcon.addEventListener("click", toggleMenu);

  // Handle nav link clicks
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          toggleMenu();
          gsap.to(window, {
            scrollTo: target,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.4
          });
        }
      }
    });
  });

  // ✨ SCROLLTRIGGER ANIMATIONS - RESPONSIVE SETUP
  function setupScrollAnimations() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    const isDesktop = window.innerWidth >= 700;
    const mobileAnimDuration = 0.8;
    
    // Common elements to animate
    const elementsToAnimate = [
      { selector: ".about-img-wrapper", props: { x: isDesktop ? -100 : -50, opacity: 0 } },
      { selector: ".part", props: { x: isDesktop ? 50 : 30, opacity: 0 } },
      { selector: ".roadmap-grid", props: { y: isDesktop ? 30 : 20, opacity: 0 } },
      { selector: ".about-points p", props: { y: isDesktop ? 50 : 20, opacity: 0 } },
      { selector: ".skills-left .row", props: { x: isDesktop ? -50 : -30, opacity: 0 } },
      { selector: ".services-section h2", props: { x: isDesktop ? -40 : -20, opacity: 0 } },
      { selector: ".services-section p", props: { x: isDesktop ? -20 : -10, opacity: 0 } },
      { selector: ".neon-card", props: { y: isDesktop ? 50 : 30, opacity: 0 } },
      { selector: ".project-card", props: { y: isDesktop ? 50 : 30, opacity: 0 } },
      { selector: ".contact-card", props: { y: isDesktop ? 100 : 50, opacity: 0 } }
    ];

    elementsToAnimate.forEach(element => {
      if (isDesktop) {
        gsap.from(element.selector, {
          scrollTrigger: {
            trigger: element.selector,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            markers: false,
          },
          duration: 1,
          ease: "power2.out",
          ...element.props
        });
      } else {
        gsap.from(element.selector, {
          ...element.props,
          duration: mobileAnimDuration,
          ease: "power2.out",
          stagger: element.selector.includes("card") ? 0.1 : 0
        });
      }
    });

    // Special staggered animations
    if (isDesktop) {
      gsap.from(".road-map-card", {
        scrollTrigger: {
          trigger: ".roadmap-grid",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    } else {
      gsap.from(".road-map-card", {
        y: 30,
        opacity: 0,
        duration: mobileAnimDuration,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  }

  // 🎯 SKILL CARDS ANIMATION
  const skillCards = document.querySelectorAll(".skill-card");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("in-view")) {
          const card = entry.target;
          card.classList.add("in-view");
          const percentage = parseInt(card.dataset.percentage);
          const circle = card.querySelector("circle.progress");
          const label = card.querySelector(".percentage");

          if (circle && label) {
            let current = 0;
            const interval = setInterval(() => {
              if (current <= percentage) {
                label.textContent = current + "%";
                const circumference = 2 * Math.PI * parseFloat(circle.getAttribute("r"));
                const offset = circumference - (circumference * current) / 100;
                circle.style.strokeDasharray = circumference;
                circle.style.strokeDashoffset = offset;
                current++;
              } else {
                clearInterval(interval);
              }
            }, 15);
          }
          skillObserver.unobserve(card);
        }
      });
    },
    { threshold: 0.1 }
  );

  skillCards.forEach((card) => skillObserver.observe(card));

  // 🔁 INFINITE ANIMATIONS
  gsap.to(".flare", {
    rotation: 360,
    duration: 6,
    repeat: -1,
    ease: "linear",
  });

  gsap.to(".ring1", {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "none",
  });

  // Handle window resize
  function handleResize() {
    setupScrollAnimations();
    ScrollTrigger.refresh();
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
      if (this.hash !== "") {
        e.preventDefault();
        const hash = this.hash;
        gsap.to(window, {
          scrollTo: hash,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            if (history.pushState) {
              history.pushState(null, null, hash);
            } else {
              location.hash = hash;
            }
          }
        });
      }
    });
  });
});

// PROJECT MODAL FUNCTIONS
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

function openModal(projectKey) {
  const p = projects[projectKey];
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDescription").textContent = p.description;
  document.getElementById("modalGithub").href = p.github;

  document.getElementById("projectModal").style.display = "block";

  gsap.from("#projectModal .modal-content", {
    y: 50,
    opacity: 0,
    duration: 0.5,
    ease: "back.out(1.7)",
  });
}

function closeModal() {
  gsap.to("#projectModal .modal-content", {
    y: 50,
    opacity: 0,
    duration: 0.3,
    ease: "power1.in",
    onComplete: () => {
      document.getElementById("projectModal").style.display = "none";
    },
  });
}

// CONTACT FORM FUNCTIONS
function openGmailWithMessage(name, email, phone, message) {
  const subject = encodeURIComponent("Contact From Portfolio");
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
  );
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=dhavaldave121002@gmail.com&su=${subject}&body=${body}`;
  window.open(gmailUrl, "_blank");
}

// Form submission
document.querySelector(".send-btn")?.addEventListener("click", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();
  
  if (!name || !email || !phone || !message) {
    // Add error animation
    gsap.to(".form-control", {
      x: [5, -5, 0],
      duration: 0.3,
      ease: "power1.out",
      stagger: 0.05
    });
    return;
  }
  
  openGmailWithMessage(name, email, phone, message);
  
  // Success animation
  gsap.to(".contact-card", {
    backgroundColor: "rgba(0, 128, 0, 0.2)",
    duration: 0.5,
    yoyo: true,
    repeat: 1
  });
});

// Social icons animation
document.querySelectorAll(".social-icon i").forEach(icon => {
  icon.addEventListener("mouseenter", () => {
    gsap.to(icon, {
      scale: 1.2,
      rotation: 360,
      duration: 0.5,
      ease: "back.out(1.7)"
    });
  });
  icon.addEventListener("mouseleave", () => {
    gsap.to(icon, {
      scale: 1,
      rotation: 0,
      duration: 0.3
    });
  });
});
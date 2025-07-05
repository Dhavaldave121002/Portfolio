document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // 📦 Element References
  const menuIcon = document.querySelector(".menu-icon");
  const nav = document.querySelector(".main-nav");
  const preloader = document.querySelector(".preloader");
  const togButton = document.querySelector(".tog");
  const navLinks = document.querySelectorAll(".nav-link");
  let isMenuOpen = false;

  // 🌀 PRELOADER ANIMATION
  if (preloader) {
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
  }

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
  if (document.getElementById("typed-skills")) {
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
  }

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
        stagger: 0.2,
        duration: 1.5,
        ease: "power2.out",
      });
    }
  }

  // 👀 Resize Listener for Mobile/Tablet vs Desktop Layout
  window.addEventListener("resize", setupScrollAnimations);

  // 🔄 Initialize scroll animations on first load
  setupScrollAnimations();
});

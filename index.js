document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // 📦 Element References
  const menuIcon = document.querySelector(".menu-icon");
  const nav = document.querySelector(".main-nav");
  const preloader = document.querySelector(".preloader");
  const togButton = document.querySelector(".tog");
  const togButtonIcon = document.querySelector(".tog i");

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
      },
    });

  // 🌟 MAIN TIMELINE ANIMATIONS
  const mainTimeline = gsap.timeline({ paused: true });

  // Initial hidden state for .tog button
  gsap.set(".tog", {
    opacity: 0,
    x: -30,
    scale: 0.8,
    pointerEvents: "none",
  });

  // Build main animations
  mainTimeline
    // Logo animation
    .from(
      ".logo",
      {
        y: -80,
        opacity: 0,
        duration: 2,
        ease: "bounce.out",
        scale: 0.5,
      },
      "start"
    )
    // Logo image rotation
    .from(
      ".logo img",
      {
        rotation: 360,
        transformOrigin: "center",
        duration: 1.5,
        ease: "power2.out",
      },
      "start"
    )
    // Navigation items
    .from(
      ".nav .nav-item",
      {
        x: 80,
        opacity: 0,
        duration: 0.5,
        ease: "back.out",
        scale: 0.5,
        stagger: 0.1,
      },
      "start"
    )
    // Section 1
    .from(
      ".sec1",
      {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      },
      "start"
    )
    // Section 2 image
    .from(
      ".sec2 img",
      {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      },
      "start"
    )
    // .tog button animation (delayed)
    .to(
      ".tog",
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "back.out(1.7)",
        pointerEvents: "auto",
        onStart: () => {
          // Additional effects when button appears
          gsap.to(".tog", {
            backgroundColor: "#e6b800",
            duration: 0.5,
            repeat: 1,
            yoyo: true,
            ease: "power1.inOut",
          });
        },
      },
      "start+=2"
    ); // 2 seconds after timeline starts

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
  if (menuIcon && nav) {
    menuIcon.addEventListener("click", () => {
      nav.classList.toggle("active");

      if (nav.classList.contains("active")) {
        // Menu open animation
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
        document.body.style.overflow = "hidden";
      } else {
        // Menu close animation
        gsap.to(".nav .nav-item", {
          opacity: 0,
          x: -50,
          duration: 0.3,
        });
        document.body.style.overflow = "auto";
      }
    });
  }

  // 📞 TOG BUTTON CLICK ANIMATION
  togButton.addEventListener("click", () => {
    const offcanvas = document.querySelector(".offcanvas-body");

    // First make sure elements are visible before animating
    gsap.set(".offcanvas-body .social-icon i", { opacity: 1, x: 0 });
    gsap.set(".offcanvas-body .contact h3", { opacity: 1, x: 0 });

    // Button animation
    gsap.to(togButton, {
      scale: 0.9,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });

    // Content animation
    const tl = gsap.timeline();
    tl.from(".offcanvas-body .contact h3", {
      x: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power1.out",
    })
      .from(".offcanvas-body .social-icon i", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power1.out",
        stagger: 0.1,
      }, "-=0.5"); // Reduced overlap to 0.5 seconds
  });

  // ✨ SCROLLTRIGGER ANIMATIONS
  // Simplified scroll animations setup
  const scrollAnimations = [
    {
      selector: ".about-img-wrapper",
      trigger: ".about-section",
      props: { x: -100, opacity: 0 },
    },
    {
      selector: ".part",
      trigger: ".about-section",
      props: { x: 50, opacity: 0 },
    },
    {
      selector: ".roadmap-grid",
      trigger: ".about-section",
      props: { y: 30, opacity: 0, stagger: 0.7 },
    },
    {
      selector: ".about-points p",
      trigger: ".skills-section",
      props: { y: 50, opacity: 0, stagger: 0.4 },
    },
    {
      selector: ".skills-left .row",
      trigger: ".skills-section",
      props: { x: -50, opacity: 0, stagger: 1 },
    },
    {
      selector: ".services-section h2",
      trigger: ".services-section h2",
      props: { x: -40, opacity: 0 },
    },
    {
      selector: ".services-section p",
      trigger: ".services-section p",
      props: { x: -20, opacity: 0 },
    },
    {
      selector: ".neon-card",
      trigger: ".neon-card",
      props: { y: 50, opacity: 0, stagger: 0.1 },
    },
  ];

  scrollAnimations.forEach((anim) => {
    gsap.from(anim.selector, {
      scrollTrigger: {
        trigger: anim.trigger,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false, // Set to true for debugging
      },
      duration: 1,
      ease: "power2.out",
      ...anim.props,
    });
  });

  // Roadmap cards animation
  gsap.utils.toArray(".road-map-card").forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 70%",
        end: "bottom 30%",
        scrub: true,
        markers: false,
      },
      opacity: 1,
      y: 0,
      delay: i * 0.1, // Stagger the animations for smooth effect
    });
  });

  // 🍃 MARQUEE SCROLL
  function initMarqueeScroll() {
    const marqueeTrack = document.querySelector(".marquee-track");
    const marqueeAnim = gsap.to(marqueeTrack, {
      xPercent: -50,
      repeat: -1,
      ease: "power4.inOut",
      duration: 15,
    });

    let lastScrollY = window.scrollY;

    window.addEventListener("wheel", function (e) {
      if (e.deltaY > 0) {
        marqueeAnim.timeScale(1);
        gsap.to(".marque i", { rotate: 180, duration: 0.5 });
      } else {
        marqueeAnim.timeScale(-1);
        gsap.to(".marque i", { rotate: 0, duration: 0.5 });
      }

      lastScrollY = window.scrollY;
    });
  }

  initMarqueeScroll();

  // 🚀 PROJECT MODAL
  function openModal(projectKey) {
    const p = projects[projectKey];
    document.getElementById("modalTitle").textContent = p.title;
    document.getElementById("modalDescription").textContent = p.description;
    document.getElementById("modalGithub").href = p.github;

    document.getElementById("projectModal").style.display = "block";

    // Modal entrance animation
    gsap.from("#projectModal .modal-content", {
      y: 50,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  }

  function closeModal() {
    // Modal exit animation
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

  // 📩 CONTACT FORM EMAIL INTEGRATION
  document.querySelector(".send-btn").addEventListener("click", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    if (!name || !email || !phone || !message) return;
    openGmailWithMessage(name, email, phone, message);
  });

  function openGmailWithMessage(name, email, phone, message) {
    const subject = encodeURIComponent("Contact From Portfolio");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=dhavaldave121002@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  }
});

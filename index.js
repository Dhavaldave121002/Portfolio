document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // --- PRELOADER ANIMATION ---
  const preloader = document.querySelector(".preloader");
  const loaderTimeline = gsap.timeline();
  loaderTimeline
    .from(".ring1", { scale: 0, rotation: 0, opacity: 0, duration: 1, ease: "back.out(1.7)" })
    .from(".ring2", { scale: 0, rotation: 180, opacity: 0, duration: 1, ease: "back.out(1.7)" }, "-=0.5")
    .from(".ring3", { scale: 0, rotation: -180, opacity: 0, duration: 1, ease: "back.out(1.7)" }, "-=0.5")
    .from(".core-logo", { scale: 0, rotateY: 360, opacity: 0, duration: 1, ease: "elastic.out(1, 0.5)" }, "-=0.5")
    .from(".flare", { scale: 0, opacity: 0, duration: 1, ease: "power2.out" }, "-=1")
    .from(".loader-title", { y: 40, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.8")
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

  // --- MAIN TIMELINE ---
  const mainTimeline = gsap.timeline({ paused: true });
  gsap.set(".tog", { opacity: 0, x: -30, scale: 0.8, pointerEvents: "none" });
  mainTimeline
    .from(".logo", { y: -80, opacity: 0, duration: 2, ease: "bounce.out", scale: 0.5 }, "start")
    .from(".logo img", { rotation: 360, transformOrigin: "center", duration: 1.5, ease: "power2.out" }, "start")
    .from(".nav .nav-item", { x: 80, opacity: 0, duration: 0.5, ease: "back.out", scale: 0.5, stagger: 0.1 }, "start")
    .from(".sec1", { x: -100, opacity: 0, duration: 1.5, ease: "power2.out" }, "start")
    .from(".sec2 img", { x: 100, opacity: 0, duration: 1.5, ease: "power2.out" }, "start")
    .to(".tog", {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "back.out(1.7)",
      pointerEvents: "auto",
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

  // --- TYPED.JS ---
  new Typed("#typed-skills", {
    strings: ["Web Developer", "App Developer", "Frontend Developer", "UI/UX Designer"],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1500,
    loop: true,
  });

  // --- MENU TOGGLE ---
  const menuIcon = document.querySelector(".menu-icon");
  const nav = document.querySelector(".main-nav");
  if (menuIcon && nav) {
    menuIcon.addEventListener("click", () => {
      nav.classList.toggle("active");
      if (nav.classList.contains("active")) {
        gsap.fromTo(
          ".nav .nav-item",
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, stagger: 0.2, duration: 0.3, ease: "power2.out" }
        );
        document.body.style.overflow = "hidden";
      } else {
        gsap.to(".nav .nav-item", { opacity: 0, x: -50, duration: 0.3 });
        document.body.style.overflow = "auto";
      }
    });
  }

  // --- TOG BUTTON CLICK ---
  const togButton = document.querySelector(".tog");
  togButton.addEventListener("click", () => {
    const offcanvas = document.querySelector(".offcanvas-body");
    gsap.set(".offcanvas-body .social-icon i", { opacity: 1, x: 0 });
    gsap.set(".offcanvas-body .contact h3", { opacity: 1, x: 0 });
    gsap.to(togButton, { scale: 0.9, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" });
    gsap.timeline()
      .from(".offcanvas-body .contact h3", { x: -100, opacity: 0, duration: 1.5, ease: "power1.out" })
      .from(".offcanvas-body .social-icon i", { x: -100, opacity: 0, duration: 1, ease: "power1.out", stagger: 0.1 }, "-=0.5");
    offcanvas.style.display = "block";
  });

  // --- SCROLLTRIGGER ANIMATIONS (ONE-TIME, ALL SCREENS) ---
  // About Image
  gsap.from(".about-img-wrapper img", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 85%",
      toggleActions: "play none none none",
      once: true
    },
    x: -60,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
  });
  // About Text
  gsap.from(".about-section .part", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 90%",
      toggleActions: "play none none none",
      once: true
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
  // Roadmap Cards (staggered)
  gsap.utils.toArray('.road-map-card').forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 92%",
        toggleActions: "play none none none",
        once: true
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      delay: i * 0.13
    });
  });
  // About Points
  gsap.from(".about-points p", {
    scrollTrigger: {
      trigger: ".about-points",
      start: "top 95%",
      toggleActions: "play none none none",
      once: true
    },
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: "power2.out",
    stagger: 0.08
  });

  // --- GENERIC SECTION ANIMATIONS (ONE-TIME) ---
  gsap.utils.toArray("section").forEach(section => {
    const header = section.querySelector('h2, h1');
    if (header) {
      gsap.from(header, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });
    }
    gsap.from(section.querySelectorAll('p'), {
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.08
    });
    gsap.from(section.querySelectorAll('img'), {
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true
      },
      scale: 0.97,
      y: 20,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.07
    });
    gsap.from(section.querySelectorAll('.card, .list-item'), {
      scrollTrigger: {
        trigger: section,
        start: "top 92%",
        toggleActions: "play none none none",
        once: true
      },
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.07
    });
  });

  // --- SKILL CARD ANIMATION ---
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
            }, 15);
          }
          skillObserver.unobserve(card);
        }
      });
    }, { threshold: 0.1 }
  );
  skillCards.forEach((card) => skillObserver.observe(card));

  // --- PROJECT CARD ANIMATION ---
  const projectCards = document.querySelectorAll(".Projects-section .project-card");
  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
          entry.target.classList.add("visible");
          projectObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 }
  );
  projectCards.forEach((card) => projectObserver.observe(card));

  // --- HERO TEXT ANIMATIONS ---
  gsap.from(".hero h1", { duration: 1.5, y: -50, opacity: 0, ease: "power3.out", delay: 0.5 });
  gsap.from(".hero p", { duration: 1, delay: 1, y: 30, opacity: 0, ease: "power2.out" });
  gsap.from(".btn", { duration: 1, delay: 1.5, scale: 0.8, opacity: 0, ease: "back.out(1.7)" });

  // --- PROJECT MODAL FUNCTIONS ---
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
    document.getElementById("projectModal").style.display = "block";
    gsap.from("#projectModal .modal-content", { y: 50, opacity: 0, duration: 0.5, ease: "back.out(1.7)" });
  };

  window.closeModal = function() {
    gsap.to("#projectModal .modal-content", {
      y: 50, opacity: 0, duration: 0.3, ease: "power1.in",
      onComplete: () => { document.getElementById("projectModal").style.display = "none"; }
    });
  };

  // --- CONTACT FORM & ICONS ---
  function openGmailWithMessage(name, email, phone, message) {
    const subject = encodeURIComponent("Contact From Portfolio");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=dhavaldave121002@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  }
  document.querySelector(".send-btn").addEventListener("click", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    if (!name || !email || !phone || !message) return;
    openGmailWithMessage(name, email, phone, message);
  });
  document.getElementById("emailLink").addEventListener("click", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim() || "Visitor";
    const email = document.getElementById("email").value.trim() || "No email";
    const phone = document.getElementById("phone").value.trim() || "No phone";
    const message = document.getElementById("message").value.trim() || "Hi, I’d like to connect with you.";
    openGmailWithMessage(name, email, phone, message);
  });
  document.getElementById("whatsappLink").addEventListener("click", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim() || "Visitor";
    const phone = "918511172099";
    const text = encodeURIComponent(`Hi, I'm ${name}. I saw your portfolio and want to connect.`);
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  });
  document.getElementById("callLink").addEventListener("click", function (e) {
    e.preventDefault();
    window.open("tel:8511172099");
  });

  // --- SMOOTH SCROLL FOR ANCHORS ---
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => { ScrollTrigger.refresh(); }, 500);
      }
    });
  });

  // --- MARQUEE ---
  function initMarqueeScroll() {
    const marqueeTrack = document.querySelector('.marquee-track');
    if (!marqueeTrack) return;
    const marqueeAnim = gsap.to(marqueeTrack, { xPercent: -50, repeat: -1, ease: "power4.inOut", duration: 15 });
    marqueeAnim.timeScale(1);
    window.addEventListener('wheel', function (e) {
      if (e.deltaY > 0) {
        marqueeAnim.timeScale(1);
        gsap.to(".marquee i", { rotate: 180, duration: 0.5 });
      } else {
        marqueeAnim.timeScale(-1);
        gsap.to(".marquee i", { rotate: 0, duration: 0.5 });
      }
    });
  }
  initMarqueeScroll();

  // --- INFINITE ANIMATIONS ---
  gsap.to(".flare", { rotation: 360, duration: 6, repeat: -1, ease: "linear" });
  gsap.to(".ring1", { rotation: 360, duration: 10, repeat: -1, ease: "none" });
});

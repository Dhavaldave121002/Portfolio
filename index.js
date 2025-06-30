document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 📦 Element References
  const menuIcon = document.querySelector(".menu-icon");
  const nav = document.querySelector(".main-nav");
  const openIcon = document.querySelector(".open-icon");
  const closeIcon = document.querySelector(".close-icon");
  const preloader = document.querySelector(".preloader");

  // 🌀 PRELOADER Animation
  let loaderTimeline = gsap.timeline();

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
        mainTimeline.play();
      },
    });

  // 🌟 MAIN Hero Animations
  let mainTimeline = gsap.timeline({ paused: true });

  mainTimeline.from(".logo", {
    y: -80,
    opacity: 0,
    duration: 2,
    ease: "bounce.out",
    scale: 0.5,
  }, "start");

  mainTimeline.from(".logo img", {
    rotation: 360,
    transformOrigin: "0% 0%",
    duration: 1.5,
    ease: "power2.out",
  }, "start");

  mainTimeline.from(".nav .nav-item, .open-icon", {
    x: 80,
    opacity: 0,
    duration: 0.5,
    ease: "back.out",
    scale: 0.5,
    stagger: 0.1,
  }, "start");

  mainTimeline.from(".tog i", {
    x: -30,
    opacity: 1,
    scale: 0.8,
    duration: 1.5,
    ease: "back.out(1.7)",
  }, "start");

  mainTimeline.from(".sec1", {
    x: -100,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
  }, "start");

  mainTimeline.from(".sec2 img", {
    x: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
  }, "start");

  // 🔤 Typed.js Skills Typing
  const typed = new Typed("#typed-skills", {
    strings: ["Web Developer", "App Developer", "Frontend Developer", "UI/UX Designer"],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 1500,
    loop: true,
  });

  // 📱 Menu Toggle Animation
  menuIcon.addEventListener("click", () => {
    nav.classList.toggle("active");
    openIcon.classList.toggle("d-none");
    closeIcon.classList.toggle("d-none");

    if (nav.classList.contains("active")) {
      gsap.fromTo(".nav .nav-item", { opacity: 0, x: 100 }, {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 0.3,
        ease: "power2.out"
      });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(".nav .nav-item", {
        opacity: 0,
        x: -50,
        duration: 0.3
      });
      document.body.style.overflow = "";
    }
  });

  // 📞 Sidebar Contact Animation
  document.querySelector(".tog").addEventListener("click", () => {
    const tl = gsap.timeline();
    tl.from(".contact h3", { x: -100, opacity: 0, duration: 1.5, ease: "power1.out" }, "do")
      .from(".social-icon i", { x: -100, opacity: 0, duration: 1.5, ease: "power1.out" }, "do");
  });

  // ✅ ScrollTrigger Animations
  gsap.from(".about-img-wrapper", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
    },
    x: -100,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out"
  });

  gsap.from(".part", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
    },
    x: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",

  });
  gsap.from(".roadmap-grid", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
      markers: false // set to true if you want to debug
    },
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.7 // Smooth entrance one after another
  });

  // gsap.from(".about-heading", {
  //   scrollTrigger: {
  //     trigger: ".about-section",
  //     start: "top 80%",
  //     end: "bottom 20%",
  //     scrub: true,
  //   },
  //   x: 50,
  //   opacity: 0,
  //   ease: "power2.out"
  // });

  gsap.from(".about-points p", {
    scrollTrigger: {
      trigger: ".skills-section",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.4,
    ease: "power2.out"
  });
  gsap.from(".skills-left .row", {
    scrollTrigger: {
      trigger: ".skills-section",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
    },
    x: -50,
    opacity: 0,
    duration: 1,
    stagger: 1,
    ease: "power2.out"
  });

  gsap.from(".services-section h2", {
    scrollTrigger: {
      trigger: ".services-section h2",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true
    },
    opacity: 0,
    x: -40,
    duration: 1,
  });

  gsap.from(".services-section p", {
    scrollTrigger: {
      trigger: ".services-section p",
      start: "top 80%",
      end: "bottom 20%",
      scrub: true
    },
    opacity: 0,
    x: -20,
    duration: 1,
    delay: 0.2
  });

  gsap.from(".neon-card", {
    scrollTrigger: {
      trigger: ".neon-card",
      start: "top 80%",
      end: "bottom 20%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out"
  });

  gsap.utils.toArray(".road-map-card").forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "bottom 20%",
        // scrub: true,
        toggleActions: "play none none reverse"
      },
      opacity: 1,
      y: -100,
      duration: 1,
      ease: "power3.out",
      delay: i * 0.2
    });
  });

  // 🎯 Skill Card Observer for Circular Progress
  const cards = document.querySelectorAll('.skill-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('in-view')) {
        const card = entry.target;
        card.classList.add('in-view');
        const percentage = parseInt(card.dataset.percentage);
        const circle = card.querySelector('circle.progress');
        const label = card.querySelector('.percentage');

        let current = 0;
        const interval = setInterval(() => {
          if (current <= percentage) {
            label.textContent = current + '%';
            const offset = 314 - (314 * current / 100);
            circle.style.strokeDashoffset = offset;
            current++;
          } else {
            clearInterval(interval);
          }
        }, 15);
        observer.unobserve(card);
      }
    });
  }, { paused: true });

  cards.forEach(card => observer.observe(card));

  // 🔁 Infinite Animations
  gsap.to(".flare", {
    rotation: 360,
    duration: 6,
    repeat: -1,
    ease: "linear"
  });

  gsap.to(".ring1", {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "none"
  });
});

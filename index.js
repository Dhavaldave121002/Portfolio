document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  // Element references
  const menuIcon = document.querySelector(".menu-icon");
  const nav = document.querySelector(".main-nav");
  const preloader = document.querySelector(".preloader");
  const togButton = document.querySelector(".tog");
  
  // 🍿 Preloader (runs on ALL screens)
  const loaderTL = gsap.timeline();
  loaderTL
    .from(".ring1", { scale: 0, rotation: 0, opacity: 0, duration: 0.8, ease: "back.out(1.7)" })
    .from(".ring2", { scale: 0, rotation: 180, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4")
    .from(".ring3", { scale: 0, rotation: -180, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4")
    .from(".core-logo", { scale: 0, rotateY: 360, opacity: 0, duration: 0.8, ease: "elastic.out(1,0.5)" }, "-=0.4")
    .from(".flare", { scale: 0, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
    .from(".loader-title", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
    .to(".preloader", {
      opacity: 0, duration: 0.6, delay: 0.3, ease: "power4.out",
      onComplete: () => {
        preloader.style.display = "none";
        document.body.style.overflow = "auto";
        if (mainTimeline) mainTimeline.play();
      }
    });

  let mainTimeline;

  // ======= MatchMedia Timelines =======
  mm.add({
    // Desktop / Tablet configuration
    "(min-width: 600px)": () => {
      mainTimeline = gsap.timeline({ paused: true });
      gsap.set(".tog", { opacity: 0, x: -30, scale: 0.8, pointerEvents: "none" });

      mainTimeline
        .from(".logo", { y: -80, opacity: 0, duration: 1.5, scale: 0.5, ease: "bounce.out" }, "start")
        .from(".logo img", { rotation: 360, duration: 1.2, ease: "power2.out" }, "start")
        .from(".nav .nav-item", { x: 80, opacity: 0, scale: 0.5, duration: 0.5, ease: "back.out", stagger: 0.1 }, "start")
        .from(".sec1", { x: -100, opacity: 0, duration: 1 }, "start")
        .from(".sec2 img", { x: 100, opacity: 0, duration: 1 }, "start")
        .to(".tog", {
          x: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", pointerEvents: "auto",
          onStart: () => gsap.to(".tog", { backgroundColor: "#e6b800", duration: 0.4, repeat: 1, yoyo: true })
        }, "start+=1.5");
    },

    // Mobile configuration
    "(max-width: 599px)": () => {
      mainTimeline = gsap.timeline({ paused: true });
      gsap.set(".tog", { opacity: 0, x: -15, scale: 0.7, pointerEvents: "none" });

      mainTimeline
        .from(".logo", { y: -40, opacity: 0, scale: 0.7, duration: 1, ease: "power2.out" })
        .from(".logo img", { rotation: 360, duration: 1, ease: "power2.out" }, "-=0.8")
        .from(".nav .nav-item", { x: 30, opacity: 0, duration: 0.4, stagger: 0.08 }, "-=0.6")
        .from(".sec1", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .to(".tog", {
          x: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", pointerEvents: "auto",
          onStart: () => gsap.to(".tog", { backgroundColor: "#e6b800", duration: 0.3, repeat: 1, yoyo: true })
        }, "+=0.5");
    }
  });

  // 🌟 Typed.js animation
  new Typed("#typed-skills", {
    strings: ["Web Developer", "App Developer", "Frontend Developer", "UI/UX Designer"],
    typeSpeed: 80, backSpeed: 40, backDelay: 1200, loop: true
  });

  // 📱 Menu toggle
  menuIcon?.addEventListener("click", () => {
    nav.classList.toggle("active");
    if (nav.classList.contains("active")) {
      gsap.fromTo(".nav .nav-item", { opacity: 0, x: 100 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.3 });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(".nav .nav-item", { opacity: 0, x: -50, duration: 0.2 });
      document.body.style.overflow = "auto";
    }
  });

  // 🌀 Tog offcanvas animation
  togButton?.addEventListener("click", () => {
    gsap.to(togButton, { scale: 0.9, duration: 0.2, yoyo: true, repeat: 1 });
    const tl = gsap.timeline();
    tl.from(".offcanvas-body .contact h3", { x: -80, opacity: 0, duration: 0.8 })
      .from(".offcanvas-body .social-icon i", { x: -80, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.5");
  });

  // 🔄 ScrollTrigger blocks
  const scrollTriggerOpts = { start: "top 85%", end: "bottom 15%", scrub: true, invalidateOnRefresh: true };
  const scrollGroups = [
    [".about-img-wrapper", { x: -60, opacity: 0 }],
    [".part", { x: 40, opacity: 0 }],
    [".roadmap-grid", { y: 20, opacity: 0, stagger: 0.5 }],
    [".about-points p", { y: 30, opacity: 0, stagger: 0.3 }],
    [".skills-left .row", { x: -30, opacity: 0, stagger: 0.6 }],
    [".services-section h2", { x: -30, opacity: 0 }],
    [".services-section p", { x: -20, opacity: 0 }],
    [".neon-card", { y: 30, opacity: 0, stagger: 0.08 }],
  ];
  scrollGroups.forEach(([sel, props]) => {
    gsap.from(sel, { ...props, scrollTrigger: scrollTriggerOpts });
  });

  // 📈 Roadmap cards reveal
  gsap.utils.toArray(".road-map-card").forEach((card, i) => {
    gsap.from(card, {
      y: 60, opacity: 0, duration: 0.8, delay: i * 0.15,
      scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none reverse", invalidateOnRefresh: true }
    });
  });

  // 🎯 Skill-card circular progress
  document.querySelectorAll(".skill-card").forEach(card => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(ent => {
        if (ent.isIntersecting && !card.classList.contains("in-view")) {
          const pct = +card.dataset.percentage;
          const circ = card.querySelector("circle.progress");
          const lab = card.querySelector(".percentage");
          const totalLen = 2 * Math.PI * +circ.getAttribute("r");
          let cur = 0;
          const iv = setInterval(() => {
            if (cur <= pct) {
              circ.style.strokeDasharray = totalLen;
              circ.style.strokeDashoffset = totalLen - (totalLen * cur) / 100;
              lab.textContent = cur + "%";
              cur++;
            } else clearInterval(iv);
          }, 12);
          card.classList.add("in-view");
          obs.disconnect();
        }
      });
    }, { threshold: 0.25 });
    obs.observe(card);
  });

  // 🎁 Project cards
  document.querySelectorAll(".Projects-section .project-card").forEach(card => {
    new IntersectionObserver(entries => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          card.classList.add("visible");
          ent.target.disconnect();
        }
      });
    }, { threshold: 0.25 }).observe(card);
  });

  // 🧨 Hero text slide-in
  gsap.from(".hero h1", { y: -30, opacity: 0, duration: 1.2, delay: 0.4, ease: "power3.out" });
  gsap.from(".hero p", { y: 20, opacity: 0, duration: 1, delay: 0.8, ease: "power2.out" });
  gsap.from(".btn", { scale: 0.8, opacity: 0, duration: 0.8, delay: 1.2, ease: "back.out(1.7)" });

  // 🔄 Infinite spinner rotation
  gsap.to(".flare", { rotation: 360, repeat: -1, ease: "linear", duration: 5 });
  gsap.to(".ring1", { rotation: 360, repeat: -1, ease: "none", duration: 9 });

  // 📡 Anchor smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const tgt = document.querySelector(a.getAttribute("href"));
      if (tgt) {
        e.preventDefault();
        tgt.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => ScrollTrigger.refresh(), 300);
      }
    });
  });

  // 🎠 Marquee auto scroll
  const marqueeTrack = document.querySelector(".marquee-track");
  if (marqueeTrack) {
    const ma = gsap.to(marqueeTrack, { xPercent: -50, ease: "power4.inOut", duration: 15, repeat: -1 });
    window.addEventListener("wheel", e => {
      ma.timeScale(e.deltaY > 0 ? 1 : -1);
      gsap.to(".marque i", { rotation: e.deltaY > 0 ? 180 : 0, duration: 0.4 });
    });
  }
});

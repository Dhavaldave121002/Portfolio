// window.addEventListener("load", () => {
//   // Logo bounce + glow pulse
//   gsap.fromTo("#loader-logo", {
//     scale: 0.5,
//     opacity: 0
//   }, {
//     scale: 1,
//     opacity: 1,
//     duration: 1,
//     rotation: 360,
//     ease: "bounce.out"
//   });

//   gsap.to("#loader-logo", {
//     repeat: -1,
//     yoyo: true,
//     duration: 1.2,
//     scale: 1.05,
//     ease: "sine.inOut"
//   });

//   // Text fade + pulse
//   gsap.from("#loader-text", {
//     opacity: 0,
//     y: 20,
//     delay: 0.5,
//     duration: 1.2,
//     ease: "power2.out"
//   });

//   // Hide loader and reveal main content
//   setTimeout(() => {
//     gsap.to("#loader", {
//       opacity: 0,
//       duration: 1,
//       onComplete: () => {
//         document.getElementById("loader").style.display = "none";
//         document.getElementById("main-content").style.display = "block";

//         // Animate main content
//         gsap.from("header", {
//           opacity: 0,
//           y: -50,
//           duration: 1,
//           ease: "power2.out"
//         });
//       }
//     });
//   }, 3000); // Wait 3 seconds
// });
var cursor = document.querySelector(".circle");
var log = document.querySelector(".logo");
var list = document.querySelector(".list");
var menu = document.querySelector(".list i");
var tl = gsap.timeline();

log.addEventListener("mouseenter", () => {
  cursor.innerHTML = "Welcome";
  gsap.to(cursor, {
    scale: 2.5,
    opacity: 0.5,
    ease: "power1.out"
  });
});

log.addEventListener("mouseleave", () => {
  cursor.innerHTML = "";
  gsap.to(cursor, {
    scale: 1,
    opacity: 1,
    ease: "power1.out"
  });
});

list.addEventListener("mouseenter", () => {
  cursor.innerHTML = "Click me";
  gsap.to(cursor, {
    scale: 2.5,
    opacity: 0.5,
    ease: "power1.out"
  });
});
list.addEventListener("mouseleave", () => {
  cursor.innerHTML = "";
  gsap.to(cursor, {
    scale: 1,
    opacity: 1,
    ease: "power1.out"
  });
});

tl.from(log, {
  opacity: 0,
  y: -80,
  scale: 0.5,
  duration: 1,
  ease: "bounce.out"
});

tl.from(list, {
  opacity: 0,
  x: -80,
  scale: 0.5,
  duration: 1,
  stagger: 0.5,
  ease: "back.out(1.5)"
});
var tl1 = gsap.timeline();

tl1.from(menu, {
  opacity: 0,
  x: -10,
  duration: 0.5,
  ease: "back.out(1.5)"
});
menu.addEventListener("click", () => {
  list.classList.toggle("show");

  if (list.classList.contains("show")) {
    gsap.from(".list h4", {
      opacity: 0,
      x: 30,
      duration: 0.4,
      stagger: 0.1,
      ease: "power1.out"
    });
  }
});

window.addEventListener("mousemove", e => {

  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
  cursor.style.opacity = 1;
});







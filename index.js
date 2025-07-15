document.addEventListener('DOMContentLoaded', function() {
  // Preloader animation
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 1500);
  }

  // Mobile menu toggle
  const menuIcon = document.querySelector('.menu-icon');
  const navWrapper = document.querySelector('.nav-md-wrapper');
  if (menuIcon && navWrapper) {
    menuIcon.addEventListener('click', function() {
      const openIcon = this.querySelector('.open-icon');
      const closeIcon = this.querySelector('.close-icon');
      
      openIcon.classList.toggle('d-none');
      closeIcon.classList.toggle('d-none');
      navWrapper.classList.toggle('active');
    });
  }

  // Typed.js initialization
  if (document.getElementById('typed-skills')) {
    const typed = new Typed('#typed-skills', {
      strings: ['Web Developer', 'App Developer', 'UI/UX Designer', 'Frontend Engineer'],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true
    });
  }

  // Animate skill percentages
  const animateSkills = () => {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      const percentage = card.getAttribute('data-percentage');
      const progressCircle = card.querySelector('.progress');
      const percentageText = card.querySelector('.percentage');
      
      if (progressCircle && percentageText) {
        const radius = progressCircle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;
        
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = circumference;
        
        setTimeout(() => {
          progressCircle.style.strokeDashoffset = offset;
          let current = 0;
          const interval = setInterval(() => {
            if (current >= percentage) {
              clearInterval(interval);
            } else {
              current++;
              percentageText.textContent = current + '%';
            }
          }, 20);
        }, 500);
      }
    });
  };

  // Initialize GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Section animations
  const sections = {
    'main': { trigger: '#main', animation: gsap.from('#main', { y: 50, opacity: 0, duration: 1 }) },
    'about': { 
      trigger: '#about',
      animation: gsap.from('#about', { 
        y: 50, 
        opacity: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }),
      onEnter: animateSkills
    },
    'services': { 
      trigger: '#services',
      animation: gsap.from('#services', { 
        y: 50, 
        opacity: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: '#services',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    },
    'skills': { 
      trigger: '#skills',
      animation: gsap.from('#skills', { 
        y: 50, 
        opacity: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: '#skills',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    },
    'projects': { 
      trigger: '#projects',
      animation: gsap.from('#projects', { 
        y: 50, 
        opacity: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    },
    'contact': { 
      trigger: '#contact',
      animation: gsap.from('#contact', { 
        y: 50, 
        opacity: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    }
  };

  // Enhanced navigation with animations
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('href');
      const sectionName = this.getAttribute('data-section');
      const targetSection = document.querySelector(sectionId);

      if (targetSection) {
        // Close mobile menu if open
        if (navWrapper && navWrapper.classList.contains('active')) {
          const openIcon = menuIcon.querySelector('.open-icon');
          const closeIcon = menuIcon.querySelector('.close-icon');
          
          openIcon.classList.toggle('d-none');
          closeIcon.classList.toggle('d-none');
          navWrapper.classList.toggle('active');
        }

        // Smooth scroll to section
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: sectionId,
            offsetY: 80,
            autoKill: false
          },
          onComplete: () => {
            // Trigger section-specific animations
            if (sections[sectionName]) {
              if (sections[sectionName].onEnter) {
                sections[sectionName].onEnter();
              }
              // Restart the animation
              sections[sectionName].animation.restart();
            }
          }
        });
      }
    });
  });

  // Project modal functionality
  const projects = {
    'FireApp': {
      title: 'Champion Site',
      description: 'A modern showcase website for sports teams with real-time updates and interactive features.',
      github: 'https://github.com/Dhavaldave121002/champion-site'
    },
    'IgniteUI': {
      title: 'Travel App',
      description: 'A travel management application that helps users plan and organize their trips efficiently.',
      github: 'https://github.com/Dhavaldave121002/travel-app'
    },
    'BlazeWeb': {
      title: 'Stock Management',
      description: 'Inventory management system with real-time stock tracking and reporting features.',
      github: 'https://github.com/Dhavaldave121002/stock-management'
    }
  };

  window.openModal = function(projectId) {
    const modal = document.getElementById('projectModal');
    const project = projects[projectId];
    
    if (modal && project) {
      document.getElementById('modalTitle').textContent = project.title;
      document.getElementById('modalDescription').textContent = project.description;
      document.getElementById('modalGithub').href = project.github;
      modal.style.display = 'block';
      
      // Animate modal appearance
      gsap.from(modal, {
        opacity: 0,
        y: 50,
        duration: 0.3
      });
    }
  };

  window.closeModal = function() {
    const modal = document.getElementById('projectModal');
    if (modal) {
      gsap.to(modal, {
        opacity: 0,
        y: 50,
        duration: 0.3,
        onComplete: () => {
          modal.style.display = 'none';
        }
      });
    }
  };

  // Contact form functionality
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const message = document.getElementById('message').value;
      
      // Update the contact links
      const emailSubject = encodeURIComponent('Contact from Portfolio');
      const emailBody = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
      );
      
      document.getElementById('emailLink').href = `mailto:dhavaldave121002@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      document.getElementById('whatsappLink').href = `https://wa.me/918511172099?text=${emailBody}`;
      document.getElementById('callLink').href = `tel:8511172099`;
      
      // Show success message with animation
      const successMsg = document.createElement('div');
      successMsg.className = 'alert alert-success mt-3';
      successMsg.textContent = 'Thank you for your message! Please choose a contact method to continue.';
      contactForm.appendChild(successMsg);
      
      gsap.from(successMsg, {
        opacity: 0,
        y: 20,
        duration: 0.5
      });
      
      setTimeout(() => {
        gsap.to(successMsg, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          onComplete: () => successMsg.remove()
        });
      }, 5000);
    });
  }

  // Marquee animation
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    gsap.to(marqueeTrack, {
      x: '-50%',
      duration: 20,
      repeat: -1,
      ease: 'linear'
    });
  }

  // Initialize all section animations
  Object.values(sections).forEach(section => {
    if (section.animation) {
      section.animation.pause();
    }
  });
});
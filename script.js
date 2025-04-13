document.addEventListener('DOMContentLoaded', () => {
  // Theme Management
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? 'Light Mode☀️' : 'Dark Mode🌙';
  };

  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Navigation
  window.toggleMenu = () => {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
  };

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Typewriter Effect
  const typewriterText = document.querySelector('.typewriter-text');
  if (typewriterText) {
    const phrases = ['Civil Engineer', 'Web Developer', 'AI Enthusiast'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      typewriterText.textContent = currentPhrase.substring(0, charIndex);
      if (!isDeleting && charIndex < currentPhrase.length) {
        charIndex++;
        setTimeout(type, 100);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50);
      } else if (!isDeleting) {
        isDeleting = true;
        setTimeout(type, 1000);
      } else {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 200);
      }
    }
    type();
  }

  // Animate Circular Skills
  const animateCircularSkills = (container) => {
    if (!container.classList.contains('animate')) {
      const percent = container.getAttribute('data-percent');
      container.style.setProperty('--percent', percent);
      container.classList.add('animate');
    }
  };

  // Reset Circular Skills
  const resetCircularSkills = (container) => {
    container.classList.remove('animate');
    container.style.setProperty('--percent', 0);
  };

  // Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('circle-container')) {
            animateCircularSkills(entry.target);
          } else {
            entry.target.classList.add('animate');
          }
        } else if (entry.target.classList.contains('circle-container')) {
          resetCircularSkills(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '50px' }
  );

  // Observe elements
  document.querySelectorAll('.overview-card, .timeline-item, .interest-card, .circle-container, .project-card, .testimonial-card, .welcome-card').forEach(el => observer.observe(el));

  // Trigger animations for all circles on load with slight delay
  const triggerAllCircularAnimations = () => {
    setTimeout(() => {
      document.querySelectorAll('.circle-container').forEach(container => {
        animateCircularSkills(container);
      });
    }, 100); // Small delay to ensure DOM rendering
  };

  // Initial animation on load
  triggerAllCircularAnimations();

  // Reset and re-trigger on navigation (when returning to page)
  window.addEventListener('pageshow', () => {
    document.querySelectorAll('.circle-container').forEach(container => {
      resetCircularSkills(container);
    });
    triggerAllCircularAnimations();
  });

  // Modal Handling
  window.openModal = (id) => {
    document.getElementById(id).style.display = 'block';
  };

  window.closeModal = (id) => {
    document.getElementById(id).style.display = 'none';
  };

  // Scroll-to-Top
  window.scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', () => {
    const scrollTopBtn = document.getElementById('scroll-top');
    scrollTopBtn.classList.toggle('show', window.scrollY > 300);
  });

  // Form Handling with Validation
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const email = formData.get('email');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' },
        });
        if (response.ok) {
          alert('Message sent successfully!');
          form.reset();
        } else {
          alert('There was a problem sending your message. Please try again.');
        }
      } catch (error) {
        alert('Network error. Please check your connection and try again.');
      }
    });
  });
});
import './style.css';

// ── MOBILE MENU ──
const mobileMenuButton = document.querySelector('.hamburger') as HTMLButtonElement | null;
const mobileCloseButton = document.querySelector('.mobile-close') as HTMLButtonElement | null;
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
const mobileMenu = document.getElementById('mobileMenu') as HTMLDivElement | null;

function toggleMenu(): void {
  if (mobileMenu) {
    mobileMenu.classList.toggle('open');
  }
}

if (mobileMenuButton) {
  mobileMenuButton.addEventListener('click', toggleMenu);
}

if (mobileCloseButton) {
  mobileCloseButton.addEventListener('click', toggleMenu);
}

mobileMenuLinks.forEach(link => {
  link.addEventListener('click', toggleMenu);
});

// ── SCROLL ANIMATIONS & DYNAMIC EFFECTS ──
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in, section h2, .section-tag');
fadeElements.forEach((el, index) => {
  const element = el as HTMLElement;
  // Apply a dynamic transition delay to stagger child elements slightly
  if(element.classList.contains('fade-in')) {
     element.style.transitionDelay = `${(index % 3) * 0.1}s`;
  }
  observer.observe(element);
});

// ── 3D TILT EFFECT FOR CARDS ──
const tiltCards = document.querySelectorAll('.project-card, .info-card, .award-card, .skill-category');
tiltCards.forEach((card) => {
  const el = card as HTMLElement;
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate rotation limits (max 5 degrees)
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

// ── CONTACT FORM ──
const contactForm = document.querySelector('.contact-form') as HTMLFormElement | null;

if (contactForm) {
  contactForm.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    const nameInput = document.getElementById('name') as HTMLInputElement | null;
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const subjectInput = document.getElementById('subject') as HTMLInputElement | null;
    const messageInput = document.getElementById('message') as HTMLTextAreaElement | null;

    if (nameInput && emailInput && subjectInput && messageInput) {
      const name = nameInput.value;
      const email = emailInput.value;
      const subject = subjectInput.value;
      const message = messageInput.value;
      
      const mailtoLink = `mailto:amanwadadar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      window.location.href = mailtoLink;
      
      const formSuccess = document.getElementById('form-success') as HTMLDivElement | null;
      if (formSuccess) {
        formSuccess.style.display = 'block';
      }
    }
  });
}

// ── NAV HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    const section = s as HTMLElement;
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(a => {
    const anchor = a as HTMLAnchorElement;
    if (anchor.getAttribute('href') === '#' + current) {
      anchor.style.color = 'var(--accent)';
    } else {
      anchor.style.color = '';
    }
  });
});
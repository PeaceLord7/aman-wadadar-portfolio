import { useEffect, useState } from 'react';
import './style.css';

export default function App() {

  useEffect(() => {
    // ── MOBILE MENU ──
    const mobileMenuButton = document.querySelector('.hamburger');
    const mobileCloseButton = document.querySelector('.mobile-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    const mobileMenu = document.getElementById('mobileMenu');

    function toggleMenu() {
      if (mobileMenu) {
        mobileMenu.classList.toggle('open');
      }
    }

    if (mobileMenuButton) mobileMenuButton.addEventListener('click', toggleMenu);
    if (mobileCloseButton) mobileCloseButton.addEventListener('click', toggleMenu);
    mobileMenuLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // ── SCROLL ANIMATIONS & DYNAMIC EFFECTS ──
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, section h2, .section-tag');
    fadeElements.forEach((el, index) => {
      if (el.classList.contains('fade-in')) {
        (el as HTMLElement).style.transitionDelay = `${(index % 3) * 0.1}s`;
      }
      observer.observe(el);
    });

    // ── 3D TILT EFFECT FOR CARDS ──
    const tiltCards = document.querySelectorAll('.project-card, .info-card, .award-card, .skill-category');
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const el = mouseEvent.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    const handleMouseLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = '';
    };

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    // ── CONTACT FORM ──
    const contactForm = document.querySelector('.contact-form');
    const handleFormSubmit = (e: Event) => {
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
        if (formSuccess) formSuccess.style.display = 'block';
      }
    };
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);
    }

    // ── NAV HIGHLIGHT ──
    const sections = document.querySelectorAll('section[id]');
    const handleScroll = () => {
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
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (mobileMenuButton) mobileMenuButton.removeEventListener('click', toggleMenu);
      if (mobileCloseButton) mobileCloseButton.removeEventListener('click', toggleMenu);
      mobileMenuLinks.forEach(link => link.removeEventListener('click', toggleMenu));
      observer.disconnect();
      tiltCards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
      if (contactForm) contactForm.removeEventListener('submit', handleFormSubmit);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  return (
    <>
      {/*  NAV  */}
      <nav>
        <a className="nav-logo" href="#home">Aman Wadadar <span> (QA Professional)</span></a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#awards">Awards</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/*  MOBILE MENU  */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} id="mobileMenu">
        <button className="mobile-close" onClick={closeMenu}>✕</button>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#skills" onClick={closeMenu}>Skills</a>
        <a href="#experience" onClick={closeMenu}>Experience</a>
        <a href="#projects" onClick={closeMenu}>Projects</a>
        <a href="#awards" onClick={closeMenu}>Awards</a>
        <a href="#testimonials" onClick={closeMenu}>Testimonials</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
      </div>

      {/*  HERO  */}
      <section id="home">
        <div className="hero-glow"></div>
        <div className="hero-glow2"></div>
        <div className="hero-inner">
          <div className="hero-content fade-in">
            <div className="hero-badge">Available for Opportunities</div>
            <h1>Aman<br /><span className="accent">Wadadar</span></h1>
            <div className="hero-title-sub">Senior QA Analyst & Project Coordinator</div>
            <p className="hero-desc">
              7 years of delivering flawless software quality across 40+ projects.
              Specializing in QA Automation, Performance Testing, Microservices, and AI-driven testing solutions.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="#projects">View My Work →</a>
              {import.meta.env.VITE_RESUME_URL && (
                <a className="btn-resume" href={import.meta.env.VITE_RESUME_URL} target="_blank" rel="noreferrer">Download Resume ↓</a>
              )}
              <a className="btn-ghost" href="#contact">Get in Touch</a>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-num">7</div>
                <div className="stat-label">Years of Experience</div>
              </div>
              <div className="stat">
                <div className="stat-num">40+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat">
                <div className="stat-num">6+</div>
                <div className="stat-label">Awards Won</div>
              </div>
              <div className="stat">
                <div className="stat-num">4</div>
                <div className="stat-label">Certifications</div>
              </div>
            </div>
          </div>

          <div className="hero-avatar-wrap fade-in">
            <div className="avatar-ring">
              <div className="avatar-inner">
                <img src={import.meta.env.VITE_AVATAR_URL || "avatar.png"} alt="Aman Wadadar" className="avatar-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/*  ABOUT  */}
      <section id="about">
        <div className="section-inner">
          <div className="section-tag">01 · About</div>
          <h2>Who I <span>Am</span></h2>
          <div className="about-grid fade-in">
            <div className="about-text">
              <p>
                I'm a geeky-tech, agile practitioner, and client-focused QA Engineer with <strong>7 years of experience</strong> in the IT industry.
                I deliver intuitive, functional, and compelling quality solutions that fulfil user needs and surpass client expectations.
              </p>
              <p>
                Currently working as a <strong>Project Coordinator & Senior QA Analyst</strong> at Particle41, Pune, managing AI-based, Farming SaaS, and Donation SaaS products. I lead cross-functional teams, spearhead automation initiatives, and drive quality at every stage of the SDLC.
              </p>
              <p>
                With vast experience across <strong>40+ projects</strong>, I have deep knowledge in Java, Selenium, Playwright, TestNG, CI/CD integration, Maven, MySQL, TestRail, and much more.
              </p>
            </div>
            <div className="about-certs">
              <div className="cert-list">
                <span className="cert-pill">🏅 Oracle Java SE 6 Certified</span>
                <span className="cert-pill">🏅 Agile Practitioner Certified</span>
                <span className="cert-pill">☁️ AWS Cloud Practitioner</span>
                <span className="cert-pill">🏅 ISTQB Foundation 4.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/*  SKILLS  */}
      <section id="skills">
        <div className="section-inner">
          <div className="section-tag">02 · Skills</div>
          <h2>Tech <span>Stack</span></h2>
          <p className="section-lead">A comprehensive toolkit built over 7 years of hands-on experience across diverse domains and industries.</p>
          <div className="skills-grid fade-in">
            <div className="skill-category">
              <div className="skill-cat-title"><span className="skill-cat-icon">🎭</span> Test Automation</div>
              <div className="skill-tags">
                <span className="skill-tag">Selenium</span>
                <span className="skill-tag">Playwright</span>
                <span className="skill-tag">TestNG</span>
                <span className="skill-tag">Gauge Framework</span>
                <span className="skill-tag">SOAP UI</span>
                <span className="skill-tag">Groovy</span>
                <span className="skill-tag">ContextQA</span>
                <span className="skill-tag">DocketQA</span>
              </div>
            </div>
            <div className="skill-category">
              <div className="skill-cat-title"><span className="skill-cat-icon">📡</span> API Testing</div>
              <div className="skill-tags">
                <span className="skill-tag">Postman</span>
                <span className="skill-tag">Rest API</span>
                <span className="skill-tag">SOAP</span>
                <span className="skill-tag">RestAssured</span>
                <span className="skill-tag">AWS SQS</span>
                <span className="skill-tag">RabbitMQ</span>
              </div>
            </div>
            <div className="skill-category">
              <div className="skill-cat-title"><span className="skill-cat-icon">⚡</span> Performance Testing</div>
              <div className="skill-tags">
                <span className="skill-tag">JMeter</span>
                <span className="skill-tag">Azure Load Testing</span>
                <span className="skill-tag">New Relic</span>
                <span className="skill-tag">AWS CloudWatch</span>
              </div>
            </div>
            <div className="skill-category">
              <div className="skill-cat-title"><span className="skill-cat-icon">☕</span> Languages & Frameworks</div>
              <div className="skill-tags">
                <span className="skill-tag">Java</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">Maven</span>
                <span className="skill-tag">Angular 4</span>
                <span className="skill-tag">HTML/CSS</span>
              </div>
            </div>
            <div className="skill-category">
              <div className="skill-cat-title"><span className="skill-cat-icon">🛠</span> DevOps & Cloud</div>
              <div className="skill-tags">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">CI/CD Pipeline</span>
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">OCP4</span>
                <span className="skill-tag">Redis Insights</span>
                <span className="skill-tag">Grafana</span>
              </div>
            </div>
            <div className="skill-category">
              <div className="skill-cat-title"><span className="skill-cat-icon">🗂</span> Test Management & Monitoring</div>
              <div className="skill-tags">
                <span className="skill-tag">TestRail</span>
                <span className="skill-tag">Qtest</span>
                <span className="skill-tag">JIRA</span>
                <span className="skill-tag">ClickUp</span>
                <span className="skill-tag">Elastic</span>
                <span className="skill-tag">Splunk</span>
                <span className="skill-tag">Kibana</span>
              </div>
            </div>
            <div className="skill-category">
              <div className="skill-cat-title"><span className="skill-cat-icon">🤖</span> AI Testing Tools</div>
              <div className="skill-tags">
                <span className="skill-tag">Claude Code</span>
                <span className="skill-tag">Playwright MCP</span>
                <span className="skill-tag">Comet Browser</span>
                <span className="skill-tag">Antigravity</span>
                <span className="skill-tag">Postman AI</span>
              </div>
            </div>
            <div className="skill-category">
              <div className="skill-cat-title"><span className="skill-cat-icon">🗄</span> Databases</div>
              <div className="skill-tags">
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">SQL/PL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/*  EXPERIENCE  */}
      <section id="experience">
        <div className="section-inner">
          <div className="section-tag">03 · Experience</div>
          <h2>Work <span>History</span></h2>
          <p className="section-lead">7+ years of progressive growth across top-tier technology companies.</p>
          <div className="timeline fade-in">

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="tl-header">
                <span className="tl-role">Project Coordinator</span>
                <span className="tl-company">Particle41</span>
                <span className="tl-date">📅 Dec 2025 – Present · Pune, India</span>
              </div>
              <div className="tl-body">
                <ul>
                  <li>Managing 3 concurrent projects: AI-based domain, Farming SaaS, and Donation SaaS product</li>
                  <li>Received the <strong>Empowering Award (Feb 2026)</strong> for helping the team achieve blocked tasks</li>
                  <li>Client-facing role with end-to-end project delivery responsibility</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="tl-header">
                <span className="tl-role">Senior Quality Assurance Analyst</span>
                <span className="tl-company">Particle41</span>
                <span className="tl-date">📅 Aug 2023 – Present · Pune, India</span>
              </div>
              <div className="tl-body">
                <ul>
                  <li>Led a QA team of 4 members with successful delivery of 5+ automation projects for US client</li>
                  <li>Delivered 3+ microservices-based projects with Redis caching, AWS SQS, and RabbitMQ testing</li>
                  <li>Authored Test Strategy and Test Planning Documentation for all major projects</li>
                  <li>Conducted API testing on Postman and performance testing via JMeter & Azure Load Testing</li>
                  <li>Managed test execution in TestRail; monitored logs in New Relic and AWS CloudWatch</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot" style={{ background: "var(--accent2)" }}></div>
              <div className="tl-header">
                <span className="tl-role">Senior Analyst Quality Engineering</span>
                <span className="tl-company">Accenture</span>
                <span className="tl-date">📅 Sep 2022 – Aug 2023 · Gurugram, India</span>
              </div>
              <div className="tl-body">
                <ul>
                  <li>Worked directly with UK clients on BFSI domain (mutual funds & investment plans)</li>
                  <li>Selenium automation with Gauge Framework; API automation with SOAP UI & Groovy.io</li>
                  <li>Led team on Password and Device Harvesting using ThreatMetrix</li>
                  <li>Core member of the Java and QA Automation interview panel</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot" style={{ background: "var(--accent3)" }}></div>
              <div className="tl-header">
                <span className="tl-role">Analyst & Developer</span>
                <span className="tl-company">Tata Consultancy Services</span>
                <span className="tl-date">📅 Jul 2019 – Aug 2022 · Hyderabad, India</span>
              </div>
              <div className="tl-body">
                <ul>
                  <li>Led US(W) project automation using Selenium + Java; developed Save Document Utility tool</li>
                  <li>Integrated unit, smoke, and regression testing into automation pipeline</li>
                  <li>Led OCP4 migration, fixing multiple APIs and delivering to production with zero defects</li>
                  <li>Worked on Qtest–JIRA integration and multiple portal automations</li>
                  <li>Received Best Team Award, On the Spot Award, and multiple client appreciations</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot" style={{ background: "var(--muted)" }}></div>
              <div className="tl-header">
                <span className="tl-role">Development Intern</span>
                <span className="tl-company">63 Moons Technologies</span>
                <span className="tl-date">📅 May 2018 – Jul 2018 · Mumbai, India</span>
              </div>
              <div className="tl-body">
                <ul>
                  <li>Developed SurveyMoons (data collector) frontend using Angular 4 & TypeScript</li>
                  <li>Wrote SQL/PL queries to improve ER relationships between frontend and backend</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/*  PROJECTS  */}
      <section id="projects">
        <div className="section-inner">
          <div className="section-tag">04 · Projects</div>
          <h2>Featured <span>Projects</span></h2>
          <p className="section-lead">Key projects across AI, microservices, automation, and performance testing domains.</p>
          <div className="projects-grid fade-in">

            <div className="project-card">
              <div className="project-header">
                <div className="project-icon">🤖</div>
                <div className="project-duration">Dec 2025 – Present</div>
              </div>
              <div className="project-title">AI-Driven Testing for AI Agents</div>
              <div className="project-company">Particle41</div>
              <div className="project-desc">Testing of AI agents using ContextQA and DocketQA. Developed self-healing automation scripts with Playwright MCP. Used Claude Code, Comet Browser, and Antigravity for test case generation and code quality.</div>
              <div className="project-tags">
                <span className="project-tag">ContextQA</span>
                <span className="project-tag">Playwright MCP</span>
                <span className="project-tag">Claude Code</span>
                <span className="project-tag">AI Testing</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <div className="project-icon">🚜</div>
                <div className="project-duration">Jan 2025 – Dec 2025</div>
              </div>
              <div className="project-title">Farming Domain SaaS Testing</div>
              <div className="project-company">Particle41</div>
              <div className="project-desc">Solo QA for full functional, API, and performance testing of a Farming SaaS application. Built AI-based test case creation and reviewer system. Managed project delivery via ClickUp in a client-facing role.</div>
              <div className="project-tags">
                <span className="project-tag">Postman</span>
                <span className="project-tag">JMeter</span>
                <span className="project-tag">ClickUp</span>
                <span className="project-tag">AI Test Cases</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <div className="project-icon">🔀</div>
                <div className="project-duration">May 2024 – Dec 2024</div>
              </div>
              <div className="project-title">Monolith to Microservices Migration</div>
              <div className="project-company">Particle41</div>
              <div className="project-desc">SME for client application. Created 50+ Playwright automation scripts with sharding. Authored Test Strategy & Planning docs. Promoted to QA Lead. Delivered Phase-1 with API, Database, and Performance testing.</div>
              <div className="project-tags">
                <span className="project-tag">Playwright</span>
                <span className="project-tag">TypeScript</span>
                <span className="project-tag">API Testing</span>
                <span className="project-tag">QA Lead</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <div className="project-icon">☁️</div>
                <div className="project-duration">Mar 2022 – Jun 2022</div>
              </div>
              <div className="project-title">OCP4 Migration</div>
              <div className="project-company">Tata Consultancy Services</div>
              <div className="project-desc">Migrated OCP3 APIs to OCP4 workspace. Managed bug tracking via Grafana and Splunk/Kibana. Delivered all APIs to production on time with zero defects. Won Best Team Award and client appreciation.</div>
              <div className="project-tags">
                <span className="project-tag">OCP4</span>
                <span className="project-tag">Grafana</span>
                <span className="project-tag">Splunk</span>
                <span className="project-tag">REST API</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <div className="project-icon">🔒</div>
                <div className="project-duration">Oct 2022 – Jan 2023</div>
              </div>
              <div className="project-title">Device & Password Harvesting</div>
              <div className="project-company">Accenture</div>
              <div className="project-desc">ThreatMetrix-based device harvesting. Automated multiple APIs using SOAP and Groovy for password harvesting. Identified and raised multiple critical bugs during UAT testing.</div>
              <div className="project-tags">
                <span className="project-tag">ThreatMetrix</span>
                <span className="project-tag">SOAP UI</span>
                <span className="project-tag">Groovy</span>
                <span className="project-tag">BFSI</span>
              </div>
            </div>

            <div className="project-card">
              <div className="project-header">
                <div className="project-icon">📄</div>
                <div className="project-duration">Dec 2020 – Jan 2021</div>
              </div>
              <div className="project-title">Save Document Utility</div>
              <div className="project-company">Tata Consultancy Services</div>
              <div className="project-desc">Led development of an automated document downloading tool supporting PDF, DOCX, CSV, XLS. Completed 3 weeks ahead of schedule. Won multiple awards and client appreciation for innovation.</div>
              <div className="project-tags">
                <span className="project-tag">Java</span>
                <span className="project-tag">Selenium</span>
                <span className="project-tag">Robot Class</span>
                <span className="project-tag">Utility Tool</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/*  AWARDS  */}
      <section id="awards">
        <div className="section-inner">
          <div className="section-tag">05 · Recognition</div>
          <h2>Awards & <span>Achievements</span></h2>
          <p className="section-lead">Recognized consistently for excellence, innovation, and team leadership throughout my career.</p>
          <div className="awards-grid fade-in">

            <div className="award-card">
              <div className="award-icon">🏆</div>
              <div>
                <div className="award-title">Empowering Award for the ELITE values</div>
                <div className="award-org">Particle41 · 14/02/2026</div>
                <div className="award-desc">As a project coordinator helped the team achieving the blocked task</div>
              </div>
            </div>
            <div className="award-card">
              <div className="award-icon">🥇</div>
              <div>
                <div className="award-title">Best Project of 2025</div>
                <div className="award-org">Particle41 · 23/12/2025</div>
                <div className="award-desc">Recognized for outstanding project performance and delivery</div>
              </div>
            </div>
            <div className="award-card">
              <div className="award-icon">🏅</div>
              <div>
                <div className="award-title">Best Team Award</div>
                <div className="award-org">TCS</div>
                <div className="award-desc">Excellent work on Save Document Utility development</div>
              </div>
            </div>
            <div className="award-card">
              <div className="award-icon">⚡</div>
              <div>
                <div className="award-title">On the Spot Award</div>
                <div className="award-org">TCS</div>
                <div className="award-desc">Simpler portal document management using Selenium Save Document Utility</div>
              </div>
            </div>
            <div className="award-card">
              <div className="award-icon">🎯</div>
              <div>
                <div className="award-title">Milestone Award</div>
                <div className="award-org">TCS</div>
                <div className="award-desc">Completion of multiple technical courses</div>
              </div>
            </div>
            <div className="award-card">
              <div className="award-icon">🌟</div>
              <div>
                <div className="award-title">Recognition Program Awardee</div>
                <div className="award-org">Accenture</div>
                <div className="award-desc">Multiple client and onshore appreciations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/*  TESTIMONIALS  */}
      <section id="testimonials">
        <div className="section-inner">
          <div className="section-tag">06 · Testimonials</div>
          <h2>Client <span>Feedback</span></h2>
          <p className="section-lead">What professionals and clients have to say about working with me.</p>

          <div className="testimonials-slider fade-in">
            <div className="testimonial-track">

              <div className="testimonial-card">
                <div className="t-header">
                  <img className="t-avatar" src={import.meta.env.VITE_SOWMYA_URL || "/testimonials/sowmya.jpg"} alt="Sowmya Peyyeti" />
                  <div className="t-info">
                    <div className="t-name">Sowmya Peyyeti</div>
                    <div className="t-role">QA Analyst/Test engineer</div>
                  </div>
                </div>
                <div className="t-body">
                  "It was great talking your suggestions are really helpful and I will definitely implement them in my learning journey. Thanks for guiding me very patiently and giving answers to all my questions"
                </div>
              </div>

              <div className="testimonial-card">
                <div className="t-header">
                  <img className="t-avatar" src={import.meta.env.VITE_SARAH_URL || "/testimonials/sarah.jpg"} alt="Sarah Dempsey" />
                  <div className="t-info">
                    <div className="t-name">Sarah Dempsey</div>
                    <div className="t-role">IT Project Manager</div>
                  </div>
                </div>
                <div className="t-body">
                  "Aman is a rare find. He is a technically knowledgeable, thorough, and highly skilled engineer, and he is also a great leader who knows how to communicate to all levels of management. He has a natural ability to convey technical information to clients so that they may better understand project expectations and status."
                </div>
              </div>

              <div className="testimonial-card">
                <div className="t-header">
                  <img className="t-avatar" src={import.meta.env.VITE_RAVI_URL || "/testimonials/ravi.jpg"} alt="Ravi Gaur" />
                  <div className="t-info">
                    <div className="t-name">Ravi Gaur</div>
                    <div className="t-role">Senior Software Engineer</div>
                  </div>
                </div>
                <div className="t-body">
                  "I've had the chance to work closely with Aman Wadadar for over two years now... What I appreciate most is how he balances both sides of his role. On the QA front, his attention to detail is spot on — he catches things early, thinks through edge cases, and helps the team avoid issues before they even surface."
                </div>
              </div>

              <div className="testimonial-card">
                <div className="t-header">
                  <img className="t-avatar" src={import.meta.env.VITE_SHYAM_URL || "/testimonials/moti.jpg"} alt="Shyam Dua" />
                  <div className="t-info">
                    <div className="t-name">Shyam Dua</div>
                    <div className="t-role">Web Development | UiPath RPA</div>
                  </div>
                </div>
                <div className="t-body">
                  "Aman is a dedicated and ambitious professional who is clearly committed to excellence in his field. He possesses a strong analytical mindset and a proactive attitude toward learning and development. I have no doubt he will be a valuable asset to any forward-thinking organization"
                </div>
              </div>

              <div className="testimonial-card">
                <div className="t-header">
                  <img className="t-avatar" src={import.meta.env.VITE_SANJEEV_URL || "/testimonials/sanjeev.jpg"} alt="Sanjeev Hippurgikar" />
                  <div className="t-info">
                    <div className="t-name">Sanjeev Hippurgikar</div>
                    <div className="t-role">Software Engineer | AWS Certified</div>
                  </div>
                </div>
                <div className="t-body">
                  "His expertise in both automation and manual testing consistently ensures high-quality, reliable product releases. What truly sets him apart is his versatility—not only is he highly skilled in QA processes, but he also excels as a Scrum Master. Any organization would benefit greatly from his technical expertise, leadership, and dedication."
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/*  CONTACT  */}
      <section id="contact">
        <div className="section-inner">
          <div className="section-tag">07 · Contact</div>
          <h2>Let's <span>Connect</span></h2>
          <div className="contact-grid fade-in">
            <div className="contact-left">
              <p>
                I'm open to exciting QA opportunities, project coordination roles, and collaborations. Whether you have a question or just want to say hello — my inbox is always open!
              </p>
              <div className="contact-items">
                <a className="contact-item" href="mailto:amanwadadar@gmail.com">
                  <div className="contact-item-icon">📧</div>
                  <div>
                    <div className="contact-item-label">Email</div>
                    <div className="contact-item-value">amanwadadar@gmail.com</div>
                  </div>
                </a>
                <a className="contact-item" href="tel:+919927665268">
                  <div className="contact-item-icon">📱</div>
                  <div>
                    <div className="contact-item-label">Phone</div>
                    <div className="contact-item-value">+91 9927665268</div>
                  </div>
                </a>
                <a className="contact-item" href="https://linkedin.com/in/aman-wadadar-483859b1" target="_blank">
                  <div className="contact-item-icon">💼</div>
                  <div>
                    <div className="contact-item-label">LinkedIn</div>
                    <div className="contact-item-value">aman-wadadar-483859b1</div>
                  </div>
                </a>
                <a className="contact-item" href="https://github.com/PeaceLord7" target="_blank">
                  <div className="contact-item-icon">🐙</div>
                  <div>
                    <div className="contact-item-label">GitHub</div>
                    <div className="contact-item-value">github.com/PeaceLord7</div>
                  </div>
                </a>
                <a className="contact-item" href="https://www.youtube.com/@automateanythingtheqaguy349" target="_blank">
                  <div className="contact-item-icon">🎬</div>
                  <div>
                    <div className="contact-item-label">YouTube</div>
                    <div className="contact-item-value">@automateanythingtheqaguy349</div>
                  </div>
                </a>
                <a className="contact-item" href="#">
                  <div className="contact-item-icon">📍</div>
                  <div>
                    <div className="contact-item-label">Location</div>
                    <div className="contact-item-value">Dehradun, Uttarakhand, India</div>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" placeholder="What's this about?" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" rows={5} placeholder="Tell me about your project or opportunity..." required></textarea>
                </div>
                <button type="submit" className="btn-send">Send Message →</button>
                <div id="form-success" style={{ display: "none", color: "var(--accent3)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                  ✅ Message sent! I'll get back to you soon.
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/*  FOOTER  */}
      <footer>
        <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p>© 2026 <strong>Aman Wadadar</strong>. All rights reserved.</p>
          <div className="social-links">
            <a className="social-link" href="mailto:amanwadadar@gmail.com" title="Email">✉</a>
            <a className="social-link" href="https://linkedin.com/in/aman-wadadar-483859b1" target="_blank" title="LinkedIn">in</a>
            <a className="social-link" href="https://github.com/PeaceLord7" target="_blank" title="GitHub">gh</a>
            <a className="social-link" href="https://www.youtube.com/@automateanythingtheqaguy349" target="_blank" title="YouTube">🎬</a>
          </div>
        </div>
      </footer>


    </>
  );
}

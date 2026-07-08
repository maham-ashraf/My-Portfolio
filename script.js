/**
 * MAHAM ASHRAF PORTFOLIO - SCRIPT.JS
 * Vanilla JavaScript for premium animations, modal logic, and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // === 1. LOADING SCREEN ===
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) loader.classList.add('hidden');
            document.querySelector('.hero-content')?.classList.add('visible');
        }, 1200); 
    });

    // === 2. SCROLL PROGRESS & STICKY NAV ===
    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    let scrollTicking = false;
    const updateScrollUI = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        if (scrollProgress) scrollProgress.style.transform = `scaleX(${scrolled / 100})`;

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        scrollTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(updateScrollUI);
            scrollTicking = true;
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === 3. MOBILE MENU ===
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const mobileOverlay = document.getElementById('mobile-overlay');

    const toggleMenu = () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    };

    hamburger.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);
    document.querySelectorAll('.nav-link, .nav-cta-btn').forEach(l => l.addEventListener('click', () => {
        if(navLinks.classList.contains('open')) toggleMenu();
    }));

    // === 4. TYPING ANIMATION ===
    const typedTextSpan = document.getElementById('typed-text');
    const textArray = ["Frontend Developer", "BSIT Student", "AI Explorer", "UI Designer"];
    let textIdx = 0;
    let charIdx = 0;

    function resetTyping() {
        typedTextSpan.textContent = '';
        charIdx = 0;
        type();
    }

    function type() {
        if (charIdx < textArray[textIdx].length) {
            typedTextSpan.textContent += textArray[textIdx][charIdx];
            charIdx++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIdx > 0) {
            typedTextSpan.textContent = textArray[textIdx].substring(0, charIdx - 1);
            charIdx--;
            setTimeout(erase, 50);
        } else {
            textIdx = (textIdx + 1) % textArray.length;
            setTimeout(type, 500);
        }
    }

    if (typedTextSpan) setTimeout(type, 1000);

    // === 5. PROJECT MODAL LOGIC ===
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.modal-close');

    const projectData = {
        "resume-builder": {
            title: "Resume Builder",
            tech: "HTML, CSS, JavaScript",
            desc: "A highly interactive web application that allows users to create professional resumes in real-time. Featuring multiple templates, instant preview, and PDF export functionality.",
            features: ["Interactive Form", "Real-time Preview", "PDF Generation", "Mobile Responsive"],
            link: "https://maham-ashraf.github.io/resume-builder/"
        },
        "superior-it": {
            title: "Superior IT Society",
            tech: "HTML, CSS, JavaScript",
            desc: "A comprehensive multi-page platform designed for the IT Department of Superior University. It manages event registrations, showcases current projects, and introduces the society team.",
            features: ["Event Management", "Team Profiles", "Project Gallery", "Contact Portal"],
            link: "https://it-society.netlify.app/"
        },
        "echo-system": {
            title: "Echocardiography System",
            tech: "HTML, CSS, JS",
            desc: "A specialized medical UI developed for a client. It simulates a clinical environment for recording and managing echocardiography results with precision and clarity.",
            features: ["Medical UI Design", "Data Visualization", "Clinical Reporting", "Role-based Access"],
            link: ""
        },
        "transport-portal": {
            title: "Transport Automation Portal",
            tech: "HTML, CSS, JS, PHP, MySQL",
            desc: "A full-scale automation system for university transportation. Handles student registration, route mapping, fee tracking, and real-time attendance management.",
            features: ["Route Tracking", "Fee Management", "Attendance System", "Admin Dashboard"],
            link: "https://maham-ashraf.github.io/Transport-Automation-Portal/"
        },
        "fake-os": {
            title: "Web-Based Fake Operating System",
            tech: "HTML, CSS, JavaScript",
            desc: "A browser-based operating system simulation with draggable windows, taskbar controls, and mini applications that mimic a real desktop interface.",
            features: ["Desktop-style interface", "Draggable windows", "Open/minimize/close functionality", "Built-in mini apps"],
            link: "https://nexos-os.netlify.app"
        },
        "grand-event": {
            title: "Grand Event",
            tech: "HTML, CSS, JavaScript",
            desc: "A clean, attractive event website built to showcase event details, schedules, and venue information with a simple responsive design.",
            features: ["Event details display", "Simple navigation", "Responsive layout", "Beginner-friendly structure"],
            link: "https://maham-ashraf.github.io/Grand-Event/"
        },
        "pbl-management": {
            title: "PBL Management",
            tech: "HTML, CSS, JavaScript",
            desc: "A project-based learning management system designed to organize academic projects in one place. It helps manage teams, project submissions, progress tracking, and task updates through a clean student-friendly interface.",
            features: ["Project tracking", "Team management", "Submission workflow", "Progress overview"],
            link: "https://pbl-system.netlify.app"
        },
        "smart-expense-analyzer": {
            title: "Smart Expense Analyzer",
            tech: "HTML, CSS, JavaScript",
            desc: "A web-based expense analyzer that helps users record spending, review categories, and understand budget habits through a simple interactive dashboard.",
            features: ["Expense entry", "Category analysis", "Budget overview", "Responsive dashboard"],
            link: "https://smart-expens-analyzer.netlify.app/"
        },
        "mood-analyzer": {
            title: "Mood Analyzer",
            tech: "HTML, CSS",
            desc: "A lightweight mood analyzer interface that presents mood options and visual feedback in a calm, easy-to-use layout.",
            features: ["Mood selection UI", "Clean visual feedback", "Responsive layout", "Simple user flow"],
            link: "https://quick-mood-analyzer.netlify.app/"
        },
        "voice-notes": {
            title: "Voice Notes",
            tech: "HTML, CSS",
            desc: "A polished voice notes interface concept for capturing short thoughts, organizing recordings, and presenting notes in a clear card-based layout.",
            features: ["Recording-style interface", "Notes layout", "Organized note cards", "Mobile-friendly design"],
            link: "https://voice-note-input.netlify.app/"
        }
    };

    const exploreMoreBtn = document.getElementById('explore-more-projects');
    if (exploreMoreBtn) {
        exploreMoreBtn.addEventListener('click', () => {
            document.querySelectorAll('.project-extra').forEach((card, index) => {
                card.classList.add('visible');
                card.style.setProperty('--reveal-delay', `${Math.min(index * 0.08, 0.24)}s`);
                requestAnimationFrame(() => card.classList.add('visible'));
            });
            exploreMoreBtn.parentElement.style.display = 'none';
        });
    }

    document.querySelectorAll('.open-project').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.getAttribute('data-id');
            const data = projectData[id];
            
            modalBody.innerHTML = `
                <h2 style="margin-bottom:1rem; color:var(--primary-light);">${data.title}</h2>
                <p style="color:var(--primary-light); font-weight:600; margin-bottom:1rem;">Tech: ${data.tech}</p>
                <p style="color:var(--text-muted); line-height:1.8; margin-bottom:1.5rem;">${data.desc}</p>
                <h4 style="margin-bottom:1rem;">Key Features:</h4>
                <ul style="list-style:disc; padding-left:1.5rem; margin-bottom:2rem; color:var(--text-muted);">
                    ${data.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                ${data.link ? `<a href="${data.link}" class="btn btn-primary" target="_blank">Visit Project Site</a>` : ''}
            `;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // === 6. SCROLL REVEAL ===
    const revealGroups = [
        '.section-header',
        '.about-card',
        '.skill-chip',
        '.project-card',
        '.timeline-box',
        '.achievement-card',
        '.contact-info',
        '.contact-form-wrap'
    ];

    revealGroups.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            el.style.setProperty('--reveal-delay', `${Math.min(index * 0.08, 0.4)}s`);
            el.style.setProperty('--reveal-x', index % 2 === 0 ? '-56px' : '56px');
        });
    });

    document.querySelectorAll('.section-header').forEach((el, index) => {
        el.style.setProperty('--reveal-x', index % 2 === 0 ? '-42px' : '42px');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.14, rootMargin: '0px 0px -70px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // === 7. PARTICLE BACKGROUND ===
    const canvas = document.getElementById('particle-canvas');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    if (canvas && !reduceMotion && !isSmallScreen) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId = null;
        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < 28; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    s: Math.random() * 2
                });
            }
        };
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#00c27a33";
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
                ctx.fill();
            });
            animationId = requestAnimationFrame(animate);
        };
        init(); animate();
        window.addEventListener('resize', () => {
            if (animationId) cancelAnimationFrame(animationId);
            init();
            animate();
        }, { passive: true });
    } else if (canvas) {
        canvas.remove();
    }
});

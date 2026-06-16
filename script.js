// ── Mobile Menu ───────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', open);
    });

    // Close when a non-dropdown link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (!link.closest('.dropdown-menu')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Mobile dropdown toggles (tap to open/close)
    navLinks.querySelectorAll('.dropdown > a').forEach(trigger => {
        trigger.addEventListener('click', e => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                trigger.closest('.dropdown').classList.toggle('open');
            }
        });
    });
}

// ── Tabs (Fixtures / Results) ─────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(tabId);
        if (target) target.classList.add('active');
    });
});

// ── Squad Filter ──────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ── Smooth Scroll ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ── Scroll-reveal animations ──────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
    '.squad-card, .news-item, .fixture-item, .featured-player, .sponsor-logo, .stat-item'
).forEach(el => {
    el.classList.add('reveal-item');
    revealObserver.observe(el);
});

// ── Active nav link on scroll ─────────────────────────
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section[id], header[id]').forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.id;
        }
    });

    document.querySelectorAll('.nav-links > li > a').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent-gold)';
        }
    });
}, { passive: true });

// ── MORE / hamburger button ───────────────────────────
const moreBtn = document.getElementById('moreBtn');
const mainNav = document.getElementById('mainNav');

if (moreBtn && mainNav) {
    moreBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', e => {
        if (!moreBtn.contains(e.target) && !mainNav.contains(e.target)) {
            mainNav.classList.remove('open');
        }
    });

    // Close when nav link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mainNav.classList.remove('open'));
    });
}

// ── Smooth scroll ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({ top: target.offsetTop - offset - 8, behavior: 'smooth' });
            }
        }
    });
});

// ── Active nav link on scroll ─────────────────────────
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = document.querySelectorAll('.nav-item');

const activateNav = () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
    });
};

window.addEventListener('scroll', activateNav, { passive: true });

// ── Reveal on scroll ──────────────────────────────────
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll(
    '.article-card, .squad-player, .shop-item, .fixture-row, .news-thumb'
).forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
});

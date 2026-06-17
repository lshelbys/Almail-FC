// ── Menu Toggle ───────────────────────────────────────
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.querySelector('.main-nav');

if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
    });

    document.addEventListener('click', e => {
        if (!menuBtn.contains(e.target) && !mainNav.contains(e.target)) {
            mainNav.classList.remove('open');
        }
    });
}

// ── Secondary Nav Active Link ──────────────────────────
const secLinks = document.querySelectorAll('.sec-link');

secLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        secLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ── Smooth Scroll ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.main-header').offsetHeight +
                                    document.querySelector('.secondary-nav').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ── Scroll Animations ──────────────────────────────────
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(
    '.news-card, .player-card, .shop-item, .fixture, .info-box'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// ── Active Secondary Nav on Scroll ────────────────────
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    secLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, { passive: true });

// ── Match Detail Modal ────────────────────────────────
const matchDetails = {
    dumankaya: {
        title: 'ALMAIL SC vs SHABAB AL HURA',
        details: {
            'Competition': 'Dumankaya Cup Final',
            'Date': 'Friday, August 8, 2025',
            'Time': '7:55 PM',
            'Stadium': 'Dumankaya Street Stadium',
            'Result': 'ALMAIL SC 7 - 4 SHABAB AL HURA'
        }
    },
    'result-1': {
        title: 'ALMAIL SC vs LOCAL RIVALS',
        details: {
            'Competition': 'Friendly Match',
            'Date': 'Friday, March 15, 2024',
            'Time': 'TBD',
            'Stadium': "Bizarri's Stadium",
            'Result': 'ALMAIL SC 2 - 1 LOCAL RIVALS'
        }
    },
    'result-2': {
        title: 'CITY UNITED vs ALMAIL SC',
        details: {
            'Competition': 'League Match',
            'Date': 'Friday, March 8, 2024',
            'Time': 'TBD',
            'Stadium': 'City United Stadium',
            'Result': 'CITY UNITED 1 - 1 ALMAIL SC'
        }
    },
    'result-3': {
        title: 'ALMAIL SC vs RIVALS',
        details: {
            'Competition': 'Cup Match',
            'Date': 'Sunday, December 10, 2023',
            'Time': 'TBD',
            'Stadium': "Bizarri's Stadium",
            'Result': 'ALMAIL SC 3 - 0 RIVALS'
        }
    }
};

function openMatchDetail(matchId) {
    const modal = document.getElementById('matchModal');
    const matchData = matchDetails[matchId];

    if (matchData) {
        document.getElementById('modalTitle').textContent = matchData.title;

        let detailsHTML = '';
        for (const [key, value] of Object.entries(matchData.details)) {
            detailsHTML += `
                <div class="detail-row">
                    <span class="detail-label">${key}</span>
                    <span class="detail-value">${value}</span>
                </div>
            `;
        }

        document.getElementById('modalDetails').innerHTML = detailsHTML;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMatchDetail() {
    const modal = document.getElementById('matchModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('matchModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeMatchDetail();
    }
});

// ── Season Filter ──────────────────────────────────────
function filterSeason(season) {
    const seasonBtns = document.querySelectorAll('.season-btn');
    seasonBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const allFixtures = document.querySelectorAll('.fixture');
    allFixtures.forEach(fixture => {
        fixture.style.display = 'none';
    });

    const seasonFixtures = document.querySelectorAll(`.season-${season}`);
    seasonFixtures.forEach(fixture => {
        fixture.style.display = 'grid';
    });
}

// ── Mobile Menu Toggle ────────────────────────────────────
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

// ── Secondary Nav Active Link ─────────────────────────────
const secLinks = document.querySelectorAll('.sec-link');

secLinks.forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href || href === '#') {
            e.preventDefault();
        }
        secLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ── Smooth Scroll ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerEl = document.querySelector('.main-header');
                const secNavEl = document.querySelector('.secondary-nav');
                const headerHeight = (headerEl ? headerEl.offsetHeight : 0) +
                                     (secNavEl ? secNavEl.offsetHeight : 0);
                window.scrollTo({
                    top: target.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ── Scroll Reveal ────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.news-card, .info-box, .match-app-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
});

// ── Active Secondary Nav on Scroll ───────────────────────
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) {
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

// ── Season Tabs ───────────────────────────────────────────
document.querySelectorAll('.season-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        const season = this.getAttribute('data-season');

        document.querySelectorAll('.season-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.season-panel').forEach(p => p.classList.remove('active'));

        this.classList.add('active');
        const panel = document.getElementById('season-' + season);
        if (panel) panel.classList.add('active');
    });
});

// ── Match Detail Modal ────────────────────────────────────
const matchData = {
    'dumankaya': {
        competition: 'DUMANKAYA CUP — FINAL',
        homeTeam: 'ALMAIL SC', homeImg: 'logo.png', homeCrest: 'A',
        awayTeam: 'SHABAB AL HURA', awayImg: 'AlShababLogo.png', awayCrest: 'S',
        score: '7 – 4', status: 'FT', winner: 'Almail SC WIN',
        date: 'Friday, 8 August 2025', kickoff: '7:55 PM',
        venue: 'Dumankaya Street Stadium',
        lineup: ['tayem', 'jasem']
    },
    'dumankaya-2024': {
        competition: 'DUMANKAYA CUP — FINAL',
        homeTeam: 'ALMAIL SC', homeImg: 'logo.png', homeCrest: 'A',
        awayTeam: 'PALESTINE GUARDS', awayImg: '', awayCrest: 'PG',
        score: '6 – 4', status: 'FT', winner: 'Almail SC WIN',
        date: 'Thursday, 25 July 2024', kickoff: '7:00 PM',
        venue: 'Dumankaya Street Stadium',
        lineup: ['tayem', 'jasem', 'bassam', 'faisal', 'fawaz']
    }
};

function openMatchDetail(matchId) {
    const modal = document.getElementById('matchModal');
    const match = matchData[matchId];
    if (modal && match) {
        updateModalContent(match);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset to first tab
        document.querySelectorAll('.modal-tab').forEach((t, i) => {
            t.classList.toggle('active', i === 0);
        });
        document.querySelectorAll('.modal-tab-panel').forEach((p, i) => {
            p.classList.toggle('active', i === 0);
        });
    }
}

function updateModalContent(match) {
    // Update header
    document.querySelector('.modal-competition').textContent = match.competition;
    document.querySelector('.modal-score-block .modal-score').textContent = match.score;
    document.querySelector('.modal-score-block .modal-status').textContent = match.status;

    // Update teams
    const homeTeam = document.querySelector('.modal-team:first-of-type');
    const awayTeam = document.querySelector('.modal-team:last-of-type');

    const homeImg = homeTeam.querySelector('img');
    const homeCrest = homeTeam.querySelector('.crest-placeholder');
    homeImg.src = match.homeImg;
    homeCrest.textContent = match.homeCrest;
    homeTeam.querySelector('.modal-team-name').textContent = match.homeTeam;

    const awayImg = awayTeam.querySelector('img');
    const awayCrest = awayTeam.querySelector('.crest-placeholder');
    if (match.awayImg) {
        awayImg.src = match.awayImg;
        awayImg.style.display = '';
    } else {
        awayImg.style.display = 'none';
    }
    awayCrest.textContent = match.awayCrest;
    awayTeam.querySelector('.modal-team-name').textContent = match.awayTeam;

    // Update meta
    const metaRow = document.querySelector('.modal-meta-row');
    metaRow.innerHTML = `<span><i class="fas fa-calendar"></i> ${match.date}</span>
                         <span><i class="fas fa-clock"></i> ${match.kickoff}</span>
                         <span><i class="fas fa-map-marker-alt"></i> ${match.venue}</span>`;

    // Update details tab
    document.querySelector('#tab-details .detail-row:nth-child(5) .detail-value').textContent = match.kickoff;
    document.querySelector('#tab-details .detail-row:nth-child(4) .detail-value').textContent = match.date;
    document.querySelector('#tab-details .detail-row:nth-child(6) .detail-value').textContent = match.venue;
    document.querySelector('#tab-details .detail-value.winner').textContent = match.winner;

    // Update lineup tab
    const lineupList = document.querySelector('#tab-lineup #lineup-list-view .lineup-list');
    lineupList.innerHTML = match.lineup.map(id => {
        const player = playerData[id];
        return `<li class="lineup-player">
                    <button class="lineup-player-btn" onclick="showPlayerProfile('${id}')">
                        <span class="lineup-player-name">${player.name}</span>
                        <i class="fas fa-chevron-right lineup-chevron-right"></i>
                    </button>
                </li>`;
    }).join('');
}

function closeMatchDetail() {
    const modal = document.getElementById('matchModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on backdrop click
const matchModal = document.getElementById('matchModal');
if (matchModal) {
    matchModal.addEventListener('click', function (e) {
        if (e.target === this) closeMatchDetail();
    });
}

// Close modal on Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMatchDetail();
});

// ── Back to Top Button ────────────────────────────────────
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
}

// ── Floating Main Menu ────────────────────────────────────
const floatMenuBtn = document.getElementById('floatMenuBtn');
const floatMenuPanel = document.getElementById('floatMenuPanel');

function closeFloatMenu() {
    if (floatMenuPanel) floatMenuPanel.classList.remove('open');
}

if (floatMenuBtn && floatMenuPanel) {
    floatMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        floatMenuPanel.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        const wrap = document.getElementById('floatMenuWrap');
        if (wrap && !wrap.contains(e.target)) {
            closeFloatMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeFloatMenu();
    });
}

// ── Player Profile View ───────────────────────────────────
const playerData = {
    tayem: { name: 'Tayem Eyad', position: 'Left Winger', nationality: 'Palestinian', dob: 'March 5, 2012' },
    jasem: { name: 'Jasem Almail', position: 'Midfielder', nationality: 'Kuwaiti', dob: 'February 19, 2014' },
    bassam: { name: 'Bassam Al Shaman', position: 'Center Midfielder', nationality: 'Saudi Arabia', dob: 'April 18, 2009' },
    faisal: { name: 'Faisal Al Mansour', position: 'Goalkeeper', nationality: 'Saudi Arabia', dob: 'September 10, 2008' },
    fawaz: { name: 'Fawaz Al Mansour', position: 'Striker', nationality: '', dob: 'June 7, 2014' }
};

function showPlayerProfile(id) {
    const p = playerData[id];
    document.getElementById('player-profile-card').innerHTML =
        `<div class="profile-name">${p.name}</div>
        <div class="profile-detail-item"><span class="profile-label">Position</span><span class="profile-value">${p.position}</span></div>
        <div class="profile-detail-item"><span class="profile-label">Nationality</span><span class="profile-value">${p.nationality}</span></div>
        <div class="profile-detail-item"><span class="profile-label">Date of Birth</span><span class="profile-value">${p.dob}</span></div>`;
    document.getElementById('lineup-list-view').classList.add('hidden');
    document.getElementById('player-profile-view').classList.remove('hidden');
}

function hidePlayerProfile() {
    document.getElementById('player-profile-view').classList.add('hidden');
    document.getElementById('lineup-list-view').classList.remove('hidden');
}

// ── Modal Tab Switching ───────────────────────────────────
document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');

        document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.modal-tab-panel').forEach(p => p.classList.remove('active'));

        this.classList.add('active');
        const panel = document.getElementById('tab-' + tabId);
        if (panel) panel.classList.add('active');
    });
});

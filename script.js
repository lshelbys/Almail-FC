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
        compLabel: 'DUMANKAYA CUP — FINAL', compName: 'Dumankaya Cup', round: 'Final',
        homeTeam: 'ALMAIL SC', homeImg: 'AlmailScLogo.png', homeCrest: 'A',
        awayTeam: 'SHABAB AL HURA', awayImg: 'AlShababLogo.png', awayCrest: 'S',
        score: '7 – 4', status: 'FT', winner: 'Almail SC WIN',
        date: 'Friday, 8 August 2025', kickoff: '7:55 PM',
        venue: 'Dumankaya Street Stadium',
        goals: [
            { time: "1'",    side: 'away', scorer: 'Giyath', score: '0 — 1' },
            { time: "2'",    side: 'home', scorer: 'Tayem',  score: '1 — 1' },
            { time: "3'",    side: 'home', scorer: 'Tayem',  score: '2 — 1' },
            { time: "12'",   side: 'away', scorer: 'Samo',   score: '2 — 2' },
            { time: "13'",   side: 'home', scorer: 'Jasem',  score: '3 — 2' },
            { time: "14'",   side: 'home', scorer: 'Tayem',  score: '4 — 2' },
            { time: "15'",   side: 'away', scorer: 'Samo',   score: '4 — 3' },
            { time: "15'",   side: 'home', scorer: 'Jasem',  score: '5 — 3' },
            { time: "16'",   side: 'away', scorer: 'Samo',   score: '5 — 4' },
            { time: "17'",   side: 'home', scorer: 'Jasem',  score: '6 — 4' },
            { time: "20'+1", side: 'home', scorer: 'Tayem',  score: '7 — 4' }
        ],
        lineup: ['tayem', 'jasem']
    },
    'dumankaya-2024': {
        compLabel: 'DUMANKAYA CUP — FINAL', compName: 'Dumankaya Cup', round: 'Final',
        homeTeam: 'ALMAIL SC', homeImg: 'AlmailScLogo.png', homeCrest: 'A',
        awayTeam: 'PALESTINE GUARDS', awayImg: 'Guards.png', awayCrest: 'PG',
        score: '6 – 4', status: 'FT', winner: 'Almail SC WIN',
        date: 'Thursday, 25 July 2024', kickoff: '7:00 PM',
        venue: 'Dumankaya Street Stadium',
        goals: [],
        lineup: ['tayem', 'jasem', 'bassam', 'faisal', 'fawaz']
    },
    'dumankaya-2023-r1': {
        compLabel: 'DUMANKAYA CUP — GROUP STAGE', compName: 'Dumankaya Cup', round: 'Group Stage - Round 1',
        homeTeam: 'RIYADH UNITED', homeImg: '', homeCrest: 'RU',
        awayTeam: 'PALESTINE GUARDS', awayImg: 'Guards.png', awayCrest: 'PG',
        score: '5 – 0', status: 'FT', winner: 'Riyadh United WIN',
        date: 'Sunday, 13 July 2023', kickoff: '7:40 PM',
        venue: 'Dumankaya Street Stadium',
        goals: [],
        lineup: []
    },
    'dumankaya-2023-r2': {
        compLabel: 'DUMANKAYA CUP — GROUP STAGE', compName: 'Dumankaya Cup', round: 'Group Stage - Round 2',
        homeTeam: 'ALMAIL SC', homeImg: 'AlmailScLogo.png', homeCrest: 'A',
        awayTeam: 'PALESTINE GUARDS', awayImg: 'Guards.png', awayCrest: 'PG',
        score: '8 – 1', status: 'FT', winner: 'Almail SC WIN',
        date: 'Sunday, 16 July 2023', kickoff: '6:30 PM',
        venue: 'Dumankaya Street Stadium',
        goals: [],
        lineup: ['jasem', 'hamad', 'abulhasan']
    },
    'dumankaya-2023-r3': {
        compLabel: 'DUMANKAYA CUP — GROUP STAGE', compName: 'Dumankaya Cup', round: 'Group Stage - Round 3',
        homeTeam: 'ALMAIL SC', homeImg: 'AlmailScLogo.png', homeCrest: 'A',
        awayTeam: 'RIYADH UNITED', awayImg: '', awayCrest: 'RU',
        score: '5 – 2', status: 'FT', winner: 'Almail SC WIN',
        date: 'Tuesday, 18 July 2023', kickoff: '7:40 PM',
        venue: 'Dumankaya Street Stadium',
        goals: [],
        lineup: ['jasem', 'hamad', 'abulhasan', 'aalmail']
    },
    'friendly-2023': {
        compLabel: 'FRIENDLY MATCH', compName: 'Friendly', round: 'Friendly Match',
        homeTeam: 'ALMAIL SC', homeImg: 'AlmailScLogo.png', homeCrest: 'A',
        awayTeam: 'TURKISH BULDOGLER', awayImg: '', awayCrest: 'TB',
        score: '7 – 6', status: 'FT', winner: 'Almail SC WIN',
        date: 'Wednesday, 16 August 2023', kickoff: '5:30 PM',
        venue: 'Dumankaya Street Stadium',
        goals: [
            { time: "1'",    side: 'home', scorer: 'Jasem Almail', score: '1 — 0' },
            { time: "6'",    side: 'home', scorer: 'Jasem Almail', score: '2 — 0' },
            { time: "7'",    side: 'away', scorer: 'Kartal Efe', score: '2 — 1' },
            { time: "8'",    side: 'away', scorer: 'Kartal Efe', score: '2 — 2' },
            { time: "9'",    side: 'home', scorer: 'Faisal Al Mansour', score: '3 — 2' },
            { time: "10'",   side: 'away', scorer: 'Jasem Almail (OG)', score: '3 — 3' },
            { time: "10'+4", side: 'away', scorer: 'Mohammed Doruk', score: '3 — 4' },
            { time: "11'",   side: 'home', scorer: 'Faisal Al Mansour', score: '4 — 4' },
            { time: "14'",   side: 'home', scorer: 'Faisal Al Mansour', score: '5 — 4' },
            { time: "17'",   side: 'away', scorer: 'Mohammed Doruk (YC)', score: '5 — 4' },
            { time: "18'",   side: 'home', scorer: 'Jasem Almail', score: '6 — 4' },
            { time: "19'",   side: 'home', scorer: 'Faisal Al Mansour', score: '7 — 4' },
            { time: "20'",   side: 'away', scorer: 'Mohammed Doruk', score: '7 — 5' },
            { time: "20'+2", side: 'away', scorer: 'Mohammed Doruk', score: '7 — 6' }
        ],
        lineup: ['jasem', 'faisal']
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

        // Always reset line-up to list view (not a player profile)
        hidePlayerProfile();
    }
}

function updateModalContent(match) {
    // Header
    document.querySelector('.modal-competition').textContent = match.compLabel;
    document.querySelector('.modal-score-block .modal-score').textContent = match.score;
    document.querySelector('.modal-score-block .modal-status').textContent = match.status;

    // Teams
    const homeTeam = document.querySelector('.modal-team:first-of-type');
    const awayTeam = document.querySelector('.modal-team:last-of-type');

    const homeImg = homeTeam.querySelector('img');
    homeImg.src = match.homeImg;
    homeImg.style.display = '';
    homeTeam.querySelector('.crest-placeholder').textContent = match.homeCrest;
    homeTeam.querySelector('.modal-team-name').textContent = match.homeTeam;

    const awayImg = awayTeam.querySelector('img');
    if (match.awayImg) {
        awayImg.src = match.awayImg;
        awayImg.style.display = '';
    } else {
        awayImg.removeAttribute('src');
        awayImg.style.display = 'none';
    }
    awayTeam.querySelector('.crest-placeholder').textContent = match.awayCrest;
    awayTeam.querySelector('.modal-team-name').textContent = match.awayTeam;

    // Meta row
    document.querySelector('.modal-meta-row').innerHTML =
        `<span><i class="fas fa-calendar"></i> ${match.date}</span>
         <span><i class="fas fa-clock"></i> ${match.kickoff}</span>
         <span><i class="fas fa-map-marker-alt"></i> ${match.venue}</span>`;

    // Details tab — rebuilt fully so the rows always match the data
    document.getElementById('tab-details').innerHTML = `
        <div class="detail-row"><span class="detail-label">Competition</span><span class="detail-value">${match.compName}</span></div>
        <div class="detail-row"><span class="detail-label">Round</span><span class="detail-value">${match.round}</span></div>
        <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">${match.date}</span></div>
        <div class="detail-row"><span class="detail-label">Kick-off</span><span class="detail-value">${match.kickoff}</span></div>
        <div class="detail-row"><span class="detail-label">Venue</span><span class="detail-value">${match.venue}</span></div>
        <div class="detail-row"><span class="detail-label">Result</span><span class="detail-value winner">${match.winner}</span></div>`;

    // Goals tab — rebuilt from data
    const goalsPanel = document.getElementById('tab-goals');
    if (match.goals && match.goals.length) {
        const rows = match.goals.map(g => {
            const cell = `<i class="fas fa-futbol goal-ball"></i>
                          <span class="goal-score-pill">${g.score}</span>
                          <span class="goal-scorer">${g.scorer}</span>`;
            return `<div class="goal-row">
                        <div class="goal-home-col">${g.side === 'home' ? cell : ''}</div>
                        <div class="goal-time-col">${g.time}</div>
                        <div class="goal-away-col">${g.side === 'away' ? cell : ''}</div>
                    </div>`;
        }).join('');
        goalsPanel.innerHTML = `
            <div class="goals-timeline">
                <div class="goals-header-row">
                    <span class="goals-team-lbl">${match.homeTeam}</span>
                    <span></span>
                    <span class="goals-team-lbl align-right">${match.awayTeam}</span>
                </div>
                ${rows}
            </div>`;
    } else {
        goalsPanel.innerHTML = `<div class="coming-soon-matches" style="padding:2rem 1rem;">
            <i class="fas fa-futbol"></i>
            <h3>Goal-by-goal timeline coming soon.</h3>
        </div>`;
    }

    // Line-up tab
    if (match.lineup && match.lineup.length > 0) {
        document.querySelector('#tab-lineup #lineup-list-view .lineup-list').innerHTML =
            match.lineup.map(id => {
                const player = playerData[id];
                return `<li class="lineup-player">
                            <button class="lineup-player-btn" onclick="showPlayerProfile('${id}')">
                                <span class="lineup-player-name">${player.name}</span>
                                <i class="fas fa-chevron-right lineup-chevron-right"></i>
                            </button>
                        </li>`;
            }).join('');
    } else {
        document.querySelector('#tab-lineup #lineup-list-view .lineup-list').innerHTML =
            `<div style="padding: 2rem 1rem; text-align: center; color: rgba(255,255,255,0.6);">
                <p>Lineup information not available for this match</p>
            </div>`;
    }
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
    tayem: { name: 'Tayem Eyad', position: 'Forward', nationality: 'Palestinian', dob: 'March 5, 2012' },
    jasem: { name: 'Jasem Almail', position: 'Midfielder', nationality: 'Kuwaiti', dob: 'February 19, 2014' },
    bassam: { name: 'Bassam Al Shaman', position: 'Midfielder', nationality: 'Saudi Arabia', dob: 'April 18, 2009' },
    faisal: { name: 'Faisal Al Mansour', position: 'Goalkeeper', nationality: 'Saudi Arabia', dob: 'September 10, 2008' },
    fawaz: { name: 'Fawaz Al Mansour', position: 'Forward', nationality: 'Saudi Arabia', dob: 'June 7, 2014' },
    hamad: { name: 'Hamad Al Kazemi', position: 'Defender', nationality: 'Kuwaiti', dob: 'July 19, 2013' },
    abulhasan: { name: 'Mohammed Abulhasan', position: 'Midfielder', nationality: 'Kuwaiti', dob: 'December 29, 2008' },
    aalmail: { name: 'A.Almail', position: 'Defender', nationality: 'Kuwaiti', dob: '' },
    kartal: { name: 'Kartal Efe', position: 'Forward', nationality: 'Turkey', dob: '' },
    doruk: { name: 'Mohammed Doruk', position: 'Forward', nationality: 'Turkey', dob: '' }
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

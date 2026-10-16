/*

       _            __     _       __                              ____      _ 
      (_)___ ______/ /__  (_)___  / /_  ____  _________  ____    / __/_  __(_)
     / / __ `/ ___/ //_/ / / __ \/ __ \/ __ \/ ___/ __ \/ __ \  / /_/ / / / /
    / / /_/ / /__/ ,<   / / /_/ / / / / / / (__  ) /_/ / / / / / __/ /_/ / / 
 __/ /\__,_/\___/_/|_|_/ /\____/_/ /_/_/ /_/____/\____/_/ /_(_)_/  \__, /_/  
/___/               /___/                                          /____/     

*/
// SVG paths for Material Symbols Rounded — replaces the ~600 KB font load.
// viewBox: "0 -960 960 960" (Material Symbols coordinate space).
const ICONS = {
    arrow_outward:   'M640-624 284-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l356-356H280q-17 0-28.5-11.5T240-720q0-17 11.5-28.5T280-760h400q17 0 28.5 11.5T720-720v400q0 17-11.5 28.5T680-280q-17 0-28.5-11.5T640-320v-304Z',
    check:           'm382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z',
    content_copy:    'M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Zm160-240v-480 480Z',
    chevron_right:   'M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z',
    chevron_left:    'm432-480 156 156q11 11 11 28t-11 28q-11 11-28 11t-28-11L348-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 28-11t28 11q11 11 11 28t-11 28L432-480Z',
    refresh:         'M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-70q0-17 11.5-28.5T760-800q17 0 28.5 11.5T800-760v200q0 17-11.5 28.5T760-520H560q-17 0-28.5-11.5T520-560q0-17 11.5-28.5T560-600h128q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q68 0 124.5-34.5T692-367q8-14 22.5-19.5t29.5-.5q16 5 23 21t-1 30q-41 80-117 128t-169 48Z',
    code:            'm193-479 155 155q11 11 11 28t-11 28q-11 11-28 11t-28-11L108-452q-6-6-8.5-13T97-480q0-8 2.5-15t8.5-13l184-184q12-12 28.5-12t28.5 12q12 12 12 28.5T349-635L193-479Zm574-2L612-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L668-268q-12 12-28 11.5T612-269q-12-12-12-28.5t12-28.5l155-155Z',
    checklist:       'm221-313 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-228q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm0-320 142-142q12-12 28-11.5t28 12.5q11 12 11 28t-11 28L250-548q-12 12-28 12t-28-12l-86-86q-11-11-11-28t11-28q11-11 28-11t28 11l57 57Zm339 353q-17 0-28.5-11.5T520-320q0-17 11.5-28.5T560-360h280q17 0 28.5 11.5T880-320q0 17-11.5 28.5T840-280H560Zm0-320q-17 0-28.5-11.5T520-640q0-17 11.5-28.5T560-680h280q17 0 28.5 11.5T880-640q0 17-11.5 28.5T840-600H560Z',
    design_services: 'm352-522 86-87-56-57-16 16q-11 11-27.5 11.5T310-650q-12-12-12-28.5t12-28.5l15-15-45-45-87 87 159 158Zm328 329 87-87-45-45-16 15q-12 12-28 12t-28-12q-12-12-12-28t12-28l15-16-57-56-86 86 158 159Zm24-567 57 57-57-57ZM160-120q-17 0-28.5-11.5T120-160v-113q0-8 3-15.5t9-13.5l163-163-173-173q-17-17-17-42t17-42l116-116q17-17 42-16.5t42 17.5l174 173 151-152q12-12 27-18t31-6q16 0 31 6t27 18l53 54q12 12 18 27t6 31q0 16-6 30.5T816-647L665-495l173 173q17 17 17 42t-17 42L722-122q-17 17-42 17t-42-17L465-295 302-132q-6 6-13.5 9t-15.5 3H160Zm40-80h56l392-391-57-57-391 392v56Zm420-419-29-29 57 57-28-28Z',
    tune:            'M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z',
};

(function applyStoredTheme() {
    try { if (localStorage.getItem('theme') === 'dark') document.documentElement.setAttribute('data-theme', 'dark'); } catch {}
})();

(function replaceIcons() {
    document.querySelectorAll('.material-symbols-rounded').forEach(span => {
        const name = span.textContent.trim();
        const d = ICONS[name];
        if (!d) return;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 -960 960 960');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('fill', 'currentColor');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        svg.appendChild(path);
        span.textContent = '';
        span.appendChild(svg);
    });
})();

function init() {

    /* =========================================
       0. Page Transitions
       ========================================= */
    // Fixed white overlay — avoids touching body opacity which breaks position:fixed
    const overlay = document.createElement('div');
    overlay.style.cssText = [
        'position:fixed', 'inset:0', 'background:var(--bg)',
        'z-index:99999', 'pointer-events:none',
        'opacity:1', 'transition:opacity 0.35s ease'
    ].join(';');
    document.body.appendChild(overlay);

    requestAnimationFrame(() => requestAnimationFrame(() => { overlay.style.opacity = '0'; }));

    // Safari bfcache: Back navigation restores without DOMContentLoaded
    window.addEventListener('pageshow', e => {
        if (e.persisted) {
            overlay.style.transition = 'opacity 0.35s ease';
            requestAnimationFrame(() => requestAnimationFrame(() => { overlay.style.opacity = '0'; }));
        }
    });

    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || link.target === '_blank') return;
        link.addEventListener('click', e => {
            e.preventDefault();
            overlay.style.transition = 'opacity 0.22s ease';
            overlay.style.opacity = '1';
            setTimeout(() => { window.location = href; }, 220);
        });
    });

    /* =========================================
       1. Reading Progress (Visual Only)
       ========================================= */
    const scrollbar = document.querySelector('.progress-scrollbar');
    const fill = document.querySelector('.progress-fill');

    if (scrollbar && fill) {
        function updateProgress() {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollableHeight <= 0) { scrollbar.style.opacity = '0'; return; }
            scrollbar.style.opacity = '1';
            fill.style.height = `${Math.max(0, Math.min(window.scrollY / scrollableHeight, 1)) * 100}%`;
        }
        window.addEventListener('scroll', updateProgress, { passive: true });
        window.addEventListener('resize', updateProgress);
        setTimeout(updateProgress, 100);
    }

/* =========================================
       2. Local Time Generator (Gateshead, UK)
       ========================================= */
    const timeDisplay = document.querySelector('#local-time');
    
    if (timeDisplay) {
        const updateTime = () => {
            const raw = new Date().toLocaleTimeString('en-GB', {
                timeZone: 'Europe/London', hour: 'numeric', minute: '2-digit', hour12: true
            });
            timeDisplay.textContent = raw.toLowerCase().replace(' ', '');
        };
        updateTime();
        setInterval(updateTime, 1000);
    }

    /* =========================================
       3. Image Lightbox
       ========================================= */
    const modal = document.querySelector('.lightbox-modal');
    const modalImg = document.querySelector('.lightbox-content');
    const modalVideo = modal ? modal.querySelector('.lightbox-video') : null;
    const triggers = document.querySelectorAll('.lightbox-trigger');
    let openLightboxByTrigger = null; // shared with section 8's mobile tap-to-preview

    if (modal && modalImg && triggers.length > 0) {

        let currentIndex = 0;
        const triggerList = Array.from(triggers);

        const openLightbox = (index) => {
            currentIndex = index;
            const trigger = triggerList[currentIndex];
            const videoSrc = trigger.dataset.video;

            if (videoSrc && modalVideo) {
                modalImg.style.display = 'none';
                modalVideo.style.display = 'block';
                modalVideo.src = videoSrc;
                modalVideo.currentTime = 0;
                modalVideo.play().catch(() => {});
            } else {
                if (modalVideo) {
                    modalVideo.pause();
                    modalVideo.style.display = 'none';
                    modalVideo.removeAttribute('src');
                    modalVideo.load();
                }
                modalImg.style.display = '';
                modalImg.src = trigger.src;
                modalImg.alt = trigger.alt || 'Expanded case study image';
            }

            modal.classList.add('is-open');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            updateNavButtons();
        };

        const closeLightbox = () => {
            modal.style.display = 'none';
            modal.classList.remove('is-open');
            modalImg.src = '';
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.style.display = 'none';
                modalVideo.removeAttribute('src');
                modalVideo.load();
            }
            document.body.style.overflow = '';
        };

        const navigate = (dir) => {
            const next = currentIndex + dir;
            if (next >= 0 && next < triggerList.length) openLightbox(next);
        };

        const updateNavButtons = () => {
            modal.querySelector('.lightbox-prev').disabled = currentIndex <= 0;
            modal.querySelector('.lightbox-next').disabled = currentIndex >= triggerList.length - 1;
        };

        triggers.forEach((trigger, i) => {
            trigger.addEventListener('click', () => openLightbox(i));
        });

        openLightboxByTrigger = (trigger) => {
            const i = triggerList.indexOf(trigger);
            if (i !== -1) openLightbox(i);
        };

        modal.addEventListener('click', (e) => {
            if (!e.target.closest('.lightbox-nav')) closeLightbox();
        });

        modal.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
        modal.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });

        modal.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

        document.addEventListener('keydown', (e) => {
            if (modal.style.display !== 'flex') return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
        });
    }


    /* =========================================
       4. Rough Notation (Scroll-Triggered)
       ========================================= */
    // Deferred until container animation ends — live transform skews getBoundingClientRect()
    const _rnContainer = document.querySelector('.container');
    const _initRoughNotation = () => {
        if (typeof RoughNotation === 'undefined') return;
        const styles = [
            { selector: '.rn-highlight', type: 'highlight', color: '#F4B3F8', strokeWidth: 1.5 },
            { selector: '.rn-underline', type: 'underline', color: '#157CFF', strokeWidth: 2 },
            { selector: '.rn-circle',    type: 'circle',    color: '#FF9800', strokeWidth: 1.5 },
            { selector: '.rn-box',       type: 'box',       color: '#F44336', strokeWidth: 1.5 }
        ];
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target._rnAnnotation && !entry.target.dataset.animated) {
                    entry.target._rnAnnotation.show();
                    entry.target.dataset.animated = 'true';
                }
            });
        }, { threshold: 0.5 });
        styles.forEach(({ selector, type, color, strokeWidth }) => {
            document.querySelectorAll(selector).forEach(el => {
                el._rnAnnotation = RoughNotation.annotate(el, { type, color, strokeWidth, padding: 2, animationDuration: 600, multiline: true });
                observer.observe(el);
            });
        });
    };
    if (_rnContainer) {
        _rnContainer.addEventListener('animationend', _initRoughNotation, { once: true });
    } else {
        _initRoughNotation();
    }

    /* =========================================
       5. Section Reveal on Scroll
       ========================================= */
    const revealEls = document.querySelectorAll('.reveal');

    if (revealEls.length > 0) {
        const _initReveal = () => {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            revealEls.forEach(el => revealObserver.observe(el));
        };

        const _revealContainer = document.querySelector('.container');
        if (_revealContainer) {
            let _revealDone = false;
            const _safeInitReveal = () => { if (!_revealDone) { _revealDone = true; _initReveal(); } };
            _revealContainer.addEventListener('animationend', _safeInitReveal, { once: true });
            setTimeout(_safeInitReveal, 600); // fallback if animationend doesn't fire (some mobile browsers)
        } else {
            _initReveal();
        }
    }

    /* =========================================
       6. Random Lore
       ========================================= */
    const loreFacts = [
        "I was once choked in a pub by a Newcastle fan after mistaking me for a Sunderland supporter (I'm a Chelsea fan) 😵",
        "I ran the Great North Run half marathon in 2023 in under 2 hours 🏃",
        "I met and spoke with Jeremy Corbyn (British politician) on a street in Newcastle after bottomless brunch with my wife 🥂",
        "I used to play with tiger cubs as a child because my best friends dad was the head tiger keeper at Port Lympne zoo in Kent 🐅",
        "I used to play competitive division 1 volleyball for Hartlepool 🏐",
        "I was featured in a news article for The Chronicle over a pedestrian crossing because I've almost been hit there 4 times 🚗",
        "My dad was the mayor of Hawkinge from 2023-2024, which is a small town in Kent 🤴🏻",
        "I used to work as a car mechanic for fun whilst I studied at college 🔧",
        "I was featured in Sketch's best designs of 2022 ✏️",
        "I was an avid horse rider until my sister was thrown from her horse and shattered her shoulder which made me give up the sport 🐎",
        "I started an Onlyfans page for margaritas called OnlyMargs but it has since been deprecated 🍸",
        "Whilst at Komodo Digital I accidentally had the office Christmas cards printed upside down and it's still talked about to this day 🎄",
        "I once drank an entire pitcher of raspberry mojito and I turned red like a scene from Charlie and the Chocolate Factory 😳",
        "I was pushed away by royal security whilst petting a horse at York races because Queen Camilla also wanted to pet the horse 😅",
        "I applied to audition for Peaky Blinders season 3 - I did not receive a callback 😅",
         "I was once photographed by an abscure Chinese fashion magazine in London for their on the street fashion segment 👖",
         "I dyed my hair blonde for Euro 2020 using Holly Willoughby's Garnier hair dye 💇🏻‍♂️",
           "I have a margarita tattooed on my ankle 🍸",
        
        
    ];

    const loreBtn  = document.getElementById('lore-btn');
    const loreBody = document.getElementById('lore-body');
    const loreText = document.getElementById('lore-text');

    if (loreBtn) {
        let currentLoreIndex = 0;
        loreBtn.addEventListener('click', () => {
            loreBody.classList.add('is-rolling');
            setTimeout(() => {
                let next = currentLoreIndex;
                while (next === currentLoreIndex) next = Math.floor(Math.random() * loreFacts.length);
                currentLoreIndex = next;
                loreText.textContent = loreFacts[currentLoreIndex];
            }, 200);
            setTimeout(() => loreBody.classList.remove('is-rolling'), 400);
        });
    }

    /* =========================================
       7. Live Weather (Gateshead, UK)
       ========================================= */
    const weatherDisplay = document.querySelector('#local-weather');
    
    if (weatherDisplay) {
        async function fetchWeather() {
            try {
                const res  = await fetch('https://api.open-meteo.com/v1/forecast?latitude=54.962&longitude=-1.6017&current_weather=true');
                const data = await res.json();
                weatherDisplay.textContent = `${Math.round(data.current_weather.temperature)}°C`;
            } catch {
                weatherDisplay.textContent = '--°C';
            }
        }
        fetchWeather();
        setInterval(fetchWeather, 1800000);
    }

    /* =========================================
       8. About Page Picture Tooltips
       ========================================= */
    const stackedPics = document.querySelectorAll('.stacked-pic');
    const tooltip = document.getElementById('picture-tooltip');

    if (stackedPics.length > 0 && tooltip) {
        const positionTooltip = (pic) => {
            const rect = pic.getBoundingClientRect();
            tooltip.style.top  = `${rect.top - 16}px`;
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
        };

        const canHover = window.matchMedia('(hover: hover)');

        let activePic = null;
        let showTimer = null;
        let hideTimer = null;
        let swapTimer = null;

        // Guards against synthetic mouseenter fired by mobile browsers on tap
        stackedPics.forEach(pic => {
            pic.addEventListener('mouseenter', () => {
                if (!canHover.matches) return;
                activePic = pic;
                clearTimeout(hideTimer);
                clearTimeout(showTimer);

                if (tooltip.classList.contains('is-visible')) {
                    // Already visible — fade+blur out, update, fade+blur back in
                    clearTimeout(swapTimer);
                    tooltip.classList.add('is-swapping');
                    swapTimer = setTimeout(() => {
                        if (pic !== activePic) return;
                        tooltip.textContent = pic.getAttribute('data-tooltip');
                        positionTooltip(pic);
                        tooltip.classList.remove('is-swapping');
                    }, 110);
                } else {
                    // First reveal — animate in after short delay
                    showTimer = setTimeout(() => {
                        if (pic !== activePic) return;
                        tooltip.textContent = pic.getAttribute('data-tooltip');
                        positionTooltip(pic);
                        tooltip.classList.add('is-visible');
                    }, 250);
                }
            });
            pic.addEventListener('mouseleave', () => {
                if (!canHover.matches) return;
                clearTimeout(showTimer);
                clearTimeout(swapTimer);
                tooltip.classList.remove('is-swapping');
                // Short grace period — cancelled if mouse enters another card immediately
                hideTimer = setTimeout(() => {
                    tooltip.classList.remove('is-visible');
                }, 80);
            });
        });

        // Mobile: proximity tap — picks card whose centre is closest to the touch point
        const pictureStack = document.querySelector('.picture-stack');

        if (pictureStack && openLightboxByTrigger && !canHover.matches) {
            let touchStartX, touchStartY;
            pictureStack.addEventListener('touchstart', e => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            pictureStack.addEventListener('touchend', e => {
                const t = e.changedTouches[0];
                if (Math.abs(t.clientY - touchStartY) > 20) return;
                let closest = null, minDist = Infinity;
                stackedPics.forEach(pic => {
                    const r    = pic.getBoundingClientRect();
                    const dist = Math.abs(t.clientX - (r.left + r.width / 2));
                    if (dist < minDist) { minDist = dist; closest = pic; }
                });
                if (!closest) return;
                const cr = closest.getBoundingClientRect();
                if (t.clientY < cr.top - 8 || t.clientY > cr.bottom + 8) return;
                // Prevents synthetic click landing on the modal and immediately closing it
                e.preventDefault();
                const img = closest.querySelector('img');
                if (!img) return;
                openLightboxByTrigger(img);
            }, { passive: false });
        }

        // position:fixed tooltips don't track scroll
        window.addEventListener('scroll', () => tooltip.classList.remove('is-visible'), { passive: true });
    }

    /* =========================================
       9. Contact Card — 3D Tilt, Copy Email
       ========================================= */
    const contactCard = document.getElementById('contact-card');
    const copyBtn     = document.getElementById('copy-email-btn');

    if (contactCard) {
        const MAX_TILT = 10;
        let rafId;
        contactCard.addEventListener('mouseenter', () => { contactCard.style.transition = 'none'; });
        contactCard.addEventListener('mousemove', (e) => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const rect  = contactCard.getBoundingClientRect();
                const x     = (e.clientX - rect.left) / rect.width;
                const y     = (e.clientY - rect.top)  / rect.height;
                contactCard.style.transform = `perspective(900px) rotateX(${(y - 0.5) * -MAX_TILT}deg) rotateY(${(x - 0.5) * MAX_TILT}deg)`;
                contactCard.style.setProperty('--mouse-x', `${x * 100}%`);
                contactCard.style.setProperty('--mouse-y', `${y * 100}%`);
            });
        });
        contactCard.addEventListener('mouseleave', () => {
            cancelAnimationFrame(rafId);
            contactCard.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            contactCard.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
            contactCard.style.setProperty('--mouse-x', '50%');
            contactCard.style.setProperty('--mouse-y', '50%');
            setTimeout(() => { contactCard.style.transition = ''; }, 600);
        });
    }

    if (copyBtn) {
        const EMAIL = 'hello@jackjohnson.fyi';
        let resetTimer;

        copyBtn.addEventListener('click', async () => {
            try { await navigator.clipboard.writeText(EMAIL); } catch { return; }
            copyBtn.disabled = true;
            copyBtn.classList.add('is-copied');
            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => {
                copyBtn.classList.remove('is-copied');
                copyBtn.disabled = false;
            }, 2000);
        });
    }

    /* =========================================
       10. Spoons Status
       ========================================= */
    const spoonsPill = document.getElementById('spoons-pill');
    const spoonsInlineOrb = document.getElementById('spoons-inline-orb');
    const spoonsInlineText = document.getElementById('spoons-inline-text');
    const spoonsBottomPill = document.getElementById('spoons-bottom-pill');
    const spoonsBottomText = document.getElementById('spoons-bottom-text');

    async function checkSpoonsStatus() {
        try {
            const res = await fetch(
                'https://wbutnbxpntpxkovptooh.supabase.co/rest/v1/visits?select=checked_in_at,location_name&checked_out_at=is.null&order=checked_in_at.desc&limit=1',
                {
                    cache: 'no-store',
                    headers: {
                        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidXRuYnhwbnRweGtvdnB0b29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2NTExNjcsImV4cCI6MjEwMTIyNzE2N30.J8WuLz_cFQL0ZP2dURcPvPaPuvU8QgG34nRWgsyebwE',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndidXRuYnhwbnRweGtvdnB0b29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2NTExNjcsImV4cCI6MjEwMTIyNzE2N30.J8WuLz_cFQL0ZP2dURcPvPaPuvU8QgG34nRWgsyebwE'
                    }
                }
            );
            const rows = await res.json();
            const active = rows[0];

            if (spoonsInlineOrb && spoonsInlineText) {
                if (active) {
                    spoonsInlineOrb.className = 'spoons-orb';
                    spoonsInlineOrb.classList.add('spoons-active-orb');
                    spoonsInlineText.textContent = 'at a Spoons';
                } else {
                    spoonsInlineOrb.className = 'spoons-orb';
                    spoonsInlineText.textContent = 'not at a Spoons';
                }
            }

            if (spoonsBottomPill && spoonsBottomText) {
                if (active) {
                    const pub = active.location_name ? active.location_name.replace(/^wetherspoons\s*/i, '').trim() : 'a Spoons';
                    spoonsBottomText.textContent = `At ${pub}`;
                    spoonsBottomPill.classList.add('spoons-active');
                    spoonsBottomPill.classList.remove('spoons-inactive');
                    spoonsBottomPill.style.display = '';
                } else {
                    spoonsBottomPill.style.display = 'none';
                }
            }

            if (spoonsPill) {
                spoonsPill.style.display = 'none';
            }

        } catch (e) {
            if (spoonsInlineText) spoonsInlineText.textContent = 'not at a Spoons';
            if (spoonsBottomPill) spoonsBottomPill.style.display = 'none';
            console.log('Spoons radar offline', e);
        }
    }

    checkSpoonsStatus();
    setInterval(checkSpoonsStatus, 15 * 1000);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') checkSpoonsStatus();
    });

    /* =========================================
       11. Ghost (Dark Mode Toggle Easter Egg)
       ========================================= */
    // Call spawnGhost(toggleEl) from your dark mode toggle handler.
    // The ghost spawns near the element, floats up, and removes itself.
    window.spawnGhost = function spawnGhost(nearEl) {
        const BODY_PATH  = 'M 5,34 C 5,6 35,6 35,34 C 35,41 31,45 28,41 C 25,37 15,37 12,41 C 9,45 5,41 5,34 Z';
        const BODY_PATH2 = 'M 5,34 C 5,6 35,6 35,34 C 35,42 30,44 27,40 C 24,36 16,36 13,40 C 10,44 5,42 5,34 Z';

        let startX = window.innerWidth / 2;
        let startY = window.innerHeight / 2;
        if (nearEl) {
            const r = nearEl.getBoundingClientRect();
            startX = r.left + r.width / 2;
            startY = r.top + r.height / 4;
        }

        const wrap = document.createElement('div');
        wrap.style.cssText = `position:fixed;left:${startX}px;top:${startY}px;pointer-events:none;z-index:99998;animation:ghost-rise 1.5s ease-out forwards`;

        wrap.innerHTML = `<svg width="44" height="54" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg"
            style="display:block;animation:ghost-squish 0.55s ease-in-out infinite;transform-origin:center 68%">
            <path fill="white" d="${BODY_PATH}">
                <animate attributeName="d" dur="0.55s" repeatCount="indefinite"
                    values="${BODY_PATH};${BODY_PATH2};${BODY_PATH}"/>
            </path>
            <ellipse cx="14" cy="21" rx="3" ry="3.5" fill="#1a1a1a"/>
            <ellipse cx="26" cy="21" rx="3" ry="3.5" fill="#1a1a1a"/>
        </svg>`;

        document.body.appendChild(wrap);
        setTimeout(() => wrap.remove(), 1550);
    };

    /* =========================================
       12. Settings FAB (Theme + Disco)
       ========================================= */
    (function initSettings() {
        const wrap = document.createElement('div');
        wrap.className = 'settings-fab-wrap';
        wrap.innerHTML = `
            <div class="settings-menu" id="settings-menu" aria-hidden="true">
                <button class="settings-option" data-action="light">Light</button>
                <button class="settings-option" data-action="dark">Dark</button>
                <button class="settings-option" data-action="disco">Disco</button>
            </div>
            <button class="btn btn-secondary settings-fab" id="settings-fab" aria-label="Customise">
                <span class="material-symbols-rounded">tune</span>
            </button>`;
        document.body.appendChild(wrap);

        // Replace icons in newly injected markup
        wrap.querySelectorAll('.material-symbols-rounded').forEach(span => {
            const name = span.textContent.trim();
            const d = ICONS[name];
            if (!d) return;
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 -960 960 960');
            svg.setAttribute('aria-hidden', 'true');
            svg.setAttribute('fill', 'currentColor');
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', d);
            svg.appendChild(path);
            span.textContent = '';
            span.appendChild(svg);
        });

        const fab  = document.getElementById('settings-fab');
        const menu = document.getElementById('settings-menu');

        const getTheme  = () => document.documentElement.getAttribute('data-theme') || 'light';
        const isDiscoOn = () => document.body.classList.contains('disco-mode');

        const setTheme = (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            try { localStorage.setItem('theme', theme); } catch {}
            if (theme === 'dark') window.spawnGhost && window.spawnGhost(fab);
            syncStates();
        };

        const syncStates = () => {
            const theme = getTheme();
            menu.querySelectorAll('.settings-option').forEach(btn => {
                const a = btn.dataset.action;
                btn.classList.toggle('is-active',
                    (a === 'light' || a === 'dark') ? a === theme : isDiscoOn()
                );
            });
        };

        let open = false;
        const openMenu  = () => { open = true;  menu.classList.add('is-open');    menu.setAttribute('aria-hidden', 'false'); syncStates(); };
        const closeMenu = () => { open = false; menu.classList.remove('is-open'); menu.setAttribute('aria-hidden', 'true'); };

        fab.addEventListener('click', e => { e.stopPropagation(); open ? closeMenu() : openMenu(); });

        menu.addEventListener('click', e => {
            const btn = e.target.closest('.settings-option');
            if (!btn) return;
            const action = btn.dataset.action;
            if (action === 'light' || action === 'dark') {
                setTheme(action);
            } else if (action === 'disco') {
                const discoOn = document.body.classList.toggle('disco-mode');
                window._discoSetOn && window._discoSetOn(discoOn);
                syncStates();
            }
        });

        document.addEventListener('click', e => { if (open && !wrap.contains(e.target)) closeMenu(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) closeMenu(); });

        syncStates();
    })();

    /* =========================================
       13. Disco Ball
       ========================================= */
    (function initDisco() {
        const cv = document.createElement('canvas');
        cv.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:97;pointer-events:none';
        document.body.appendChild(cv);
        const ctx = cv.getContext('2d');

        let W, H, dpr = window.devicePixelRatio || 1;
        function resize() { W = window.innerWidth; H = window.innerHeight; cv.width = W * dpr; cv.height = H * dpr; }
        resize();
        window.addEventListener('resize', resize);

        const norm = v => { const l = Math.hypot(...v); return v.map(x => x / l); };
        const lights = [
            { L: norm([-0.55,  0.55, 0.62]), c: [255, 248, 235] },
            { L: norm([ 0.85,  0.15, 0.35]), c: [190, 150, 255] },
            { L: norm([ 0.1,  -0.3,  0.7 ]), c: [120, 220, 255] },
        ];

        function makeSprite(c, soft) {
            const s = document.createElement('canvas'); s.width = s.height = 64;
            const g = s.getContext('2d'), gr = g.createRadialGradient(32,32,0,32,32,32), k = c.join(',');
            if (soft) { gr.addColorStop(0,`rgba(${k},.55)`); gr.addColorStop(.5,`rgba(${k},.25)`); gr.addColorStop(1,`rgba(${k},0)`); }
            else       { gr.addColorStop(0,`rgba(${k},1)`);  gr.addColorStop(.45,`rgba(${k},.9)`); gr.addColorStop(.62,`rgba(${k},.15)`); gr.addColorStop(1,`rgba(${k},0)`); }
            g.fillStyle = gr; g.fillRect(0,0,64,64); return s;
        }
        lights.forEach(l => { l.sharp = makeSprite(l.c, false); l.soft = makeSprite(l.c, true); });

        const R = 72, rows = 18, facets = [];
        for (let i = 0; i < rows; i++) {
            const p0 = -Math.PI/2 + i*Math.PI/rows, p1 = p0 + Math.PI/rows, pc = (p0+p1)/2;
            const n = Math.max(6, Math.round(40*Math.cos(pc)));
            for (let j = 0; j < n; j++) facets.push({ p0, p1, pc, t0: j*2*Math.PI/n, t1: (j+1)*2*Math.PI/n, tc: (j+.5)*2*Math.PI/n, rnd: Math.random() });
        }

        let rot = 0, drop = 0, dark = 0, last = performance.now(), time = 0, on = false;

        function bounce(x) {
            const n = 7.5625, d = 2.75;
            if (x < 1/d)   return n*x*x;
            if (x < 2/d)   return n*(x -= 1.5/d)*x + .75;
            if (x < 2.5/d) return n*(x -= 2.25/d)*x + .9375;
            return n*(x -= 2.625/d)*x + .984375;
        }

        function frame(now) {
            const dt = Math.min(.05, (now - last) / 1000); last = now; time += dt;
            rot += dt * 0.5;
            drop = Math.max(0, Math.min(1, drop + (on ? dt/1.8 : -dt/1.2)));
            dark += ((on ? 1 : 0) - dark) * Math.min(1, dt * 2.5);

            ctx.setTransform(dpr,0,0,dpr,0,0);
            ctx.globalCompositeOperation = 'source-over';
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = `rgba(8,8,18,${dark * 0.35})`;
            ctx.fillRect(0, 0, W, H);

            if (drop > 0) {
                const cx = W/2, cy = -R - 30 + (150 + R + 30) * (on ? bounce(drop) : drop*drop);
                ctx.strokeStyle = `rgba(160,160,170,${.4 + .4*dark})`; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, cy - R); ctx.stroke();

                const D = 520;
                if (dark > .05) {
                    ctx.globalCompositeOperation = 'lighter';
                    for (const f of facets) {
                        const c = Math.cos(f.pc), th = f.tc + rot, nv = [c*Math.sin(th), Math.sin(f.pc), c*Math.cos(th)];
                        for (const l of lights) {
                            const nl = nv[0]*l.L[0] + nv[1]*l.L[1] + nv[2]*l.L[2]; if (nl <= 0) continue;
                            const r = [2*nl*nv[0]-l.L[0], 2*nl*nv[1]-l.L[1], 2*nl*nv[2]-l.L[2]]; if (r[2] > -.06) continue;
                            const t = D/-r[2], px = cx + nv[0]*R + r[0]*t, py = cy - nv[1]*R - r[1]*t;
                            if (px < -80 || px > W+80 || py < -80 || py > H+80) continue;
                            const sz = 3 + t*.0055, str = Math.min(3.2, 1/Math.max(.31,-r[2])), ang = Math.atan2(-r[1], r[0]);
                            const blur = Math.min(1, Math.max(0,(t-450)/1600)), a = dark * nl * Math.min(1, 520/t) * .9;
                            const co = Math.cos(ang), si = Math.sin(ang), sx = sz*str, sy = sz;
                            ctx.setTransform(dpr*co*sx, dpr*si*sx, -dpr*si*sy, dpr*co*sy, dpr*px, dpr*py);
                            ctx.globalAlpha = a*(1-blur); ctx.drawImage(l.sharp,-1,-1,2,2);
                            ctx.setTransform(dpr*co*sx*2.2, dpr*si*sx*2.2, -dpr*si*sy*2.2, dpr*co*sy*2.2, dpr*px, dpr*py);
                            ctx.globalAlpha = a*blur*.9; ctx.drawImage(l.soft,-1,-1,2,2);
                        }
                    }
                    ctx.globalAlpha = 1; ctx.setTransform(dpr,0,0,dpr,0,0);
                }

                ctx.globalCompositeOperation = 'source-over';
                const glints = [];
                for (const f of facets) {
                    const c = Math.cos(f.pc), th = f.tc + rot, nv = [c*Math.sin(th), Math.sin(f.pc), c*Math.cos(th)]; if (nv[2] < .03) continue;
                    const P = (p, t) => { const q = Math.cos(p), a = t + rot; return [cx + R*q*Math.sin(a), cy - R*Math.sin(p)]; };
                    let spec = 0, col = [0,0,0];
                    for (const l of lights) {
                        const nl = nv[0]*l.L[0] + nv[1]*l.L[1] + nv[2]*l.L[2]; if (nl <= 0) continue;
                        const s = Math.pow(Math.max(0, 2*nl*nv[2] - l.L[2]), 60) * dark; spec += s; col = col.map((v,k) => v + l.c[k]*s);
                    }
                    const b = 40 + 50*f.rnd + (-nv[1]*.5+.5)*30, sh = Math.min(1, .45 + .55*nv[2]);
                    ctx.fillStyle = `rgb(${Math.min(255,b*sh+col[0])|0},${Math.min(255,b*sh+col[1])|0},${Math.min(255,(b+12)*sh+col[2])|0})`;
                    ctx.beginPath();
                    ctx.moveTo(...P(f.p0,f.t0)); ctx.lineTo(...P(f.p0,f.t1)); ctx.lineTo(...P(f.p1,f.t1)); ctx.lineTo(...P(f.p1,f.t0));
                    ctx.closePath(); ctx.fill();
                    ctx.strokeStyle = 'rgba(10,10,15,.8)'; ctx.lineWidth = .7; ctx.stroke();
                    if (spec > .5) glints.push([cx + R*nv[0], cy - R*nv[1], spec, f.rnd]);
                }

                ctx.globalCompositeOperation = 'lighter';
                for (const [gx, gy, s, rn] of glints) {
                    const k = Math.min(1.4, s) * (.7 + .3*Math.sin(time*9 + rn*40)), L = 18*k;
                    ctx.strokeStyle = `rgba(255,255,255,${.8*k})`; ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(gx-L,gy); ctx.lineTo(gx+L,gy); ctx.moveTo(gx,gy-L); ctx.lineTo(gx,gy+L);
                    ctx.moveTo(gx-L*.4,gy-L*.4); ctx.lineTo(gx+L*.4,gy+L*.4); ctx.moveTo(gx-L*.4,gy+L*.4); ctx.lineTo(gx+L*.4,gy-L*.4);
                    ctx.stroke();
                    ctx.globalAlpha = .7*k; ctx.drawImage(lights[0].sharp, gx-6, gy-6, 12, 12); ctx.globalAlpha = 1;
                }
            }
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);

        window._discoSetOn = v => { on = v; };
    })();

} // end init

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

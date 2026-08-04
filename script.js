/*

       _            __     _       __                              ____      _ 
      (_)___ ______/ /__  (_)___  / /_  ____  _________  ____    / __/_  __(_)
     / / __ `/ ___/ //_/ / / __ \/ __ \/ __ \/ ___/ __ \/ __ \  / /_/ / / / /
    / / /_/ / /__/ ,<   / / /_/ / / / / / / (__  ) /_/ / / / / / __/ /_/ / / 
 __/ /\__,_/\___/_/|_|_/ /\____/_/ /_/_/ /_/____/\____/_/ /_(_)_/  \__, /_/  
/___/               /___/                                          /____/     

*/
function init() {

    /* =========================================
       0. Page Transitions
       ========================================= */
    // Fixed white overlay — avoids touching body opacity which breaks position:fixed
    const overlay = document.createElement('div');
    overlay.style.cssText = [
        'position:fixed', 'inset:0', 'background:#fff',
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
    const triggers = document.querySelectorAll('.lightbox-trigger');

    if (modal && modalImg && triggers.length > 0) {

        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                modalImg.src = trigger.src;
                modalImg.alt = trigger.alt || 'Expanded case study image';
                modal.classList.add('is-open');
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            modal.style.display = 'none';
            modal.classList.remove('is-open');
            modalImg.src = '';
            document.body.style.overflow = '';
        };

        modal.addEventListener('click', closeLightbox);

        // Prevent page scrolling through the modal on iOS (overflow:hidden alone is not enough)
        modal.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                closeLightbox();
            }
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
            _revealContainer.addEventListener('animationend', _initReveal, { once: true });
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
        "I was an avid horse rider until my sister was thrown from her horse and shattered her shoulder and then I promptly gave up the sport 🐎",
        "I started an Onlyfans page for margaritas called OnlyMargs but it has since been deprecated 🍸",
        "Whilst at Komodo Digital I accidentally had the office Christmas cards printed upside down and it's still talked about to this day 🎄",
        "I once drank an entire pitcher of raspberry mojito and I turned red like a scene from Charlie and the Chocolate Factory 😳",
        "I was pushed away by royal security whilst petting a horse at York races because Queen Camilla also wanted to pet the horse 😅",
        "I applied to audition for Peaky Blinders season 3 - I did not receive a callback 😅",
         "I was once photographed by an abscure Chinese fashion magazine in London for their on the street fashion segment",
         "I dyed my hair blonde for Euro 2020 using Holly Willoughby's garnier hair dye box",
        
        
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
        let tooltipTimer = null;

        // Guards against synthetic mouseenter fired by mobile browsers on tap
        stackedPics.forEach(pic => {
            pic.addEventListener('mouseenter', () => {
                if (!canHover.matches) return;
                activePic = pic;
                clearTimeout(tooltipTimer);
                tooltip.classList.remove('is-visible');
                tooltipTimer = setTimeout(() => {
                    if (pic !== activePic) return;
                    tooltip.textContent = pic.getAttribute('data-tooltip');
                    positionTooltip(pic);
                    tooltip.classList.add('is-visible');
                }, 250);
            });
            pic.addEventListener('mouseleave', () => {
                if (!canHover.matches) return;
                clearTimeout(tooltipTimer);
                tooltip.classList.remove('is-visible');
            });
        });

        // Mobile: proximity tap — picks card whose centre is closest to the touch point
        const pictureStack = document.querySelector('.picture-stack');
        const lbModal = document.querySelector('.lightbox-modal');
        const lbImg   = document.querySelector('.lightbox-content');

        if (pictureStack && lbModal && lbImg && !canHover.matches) {
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
                lbImg.src = img.src;
                lbImg.alt = img.alt;
                lbModal.classList.add('is-open');
                lbModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
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
        const EMAIL     = 'hello@jackjohnson.fyi';
        const copyIcon  = document.getElementById('copy-icon');
        const copyLabel = document.getElementById('copy-label');
        let resetTimer;

        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(EMAIL);
            } catch {
                return; // Clipboard unavailable — fail silently
            }

            copyIcon.textContent  = 'check';
            copyLabel.textContent = 'Copied!';
            copyBtn.disabled      = true;

            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => {
                copyIcon.textContent  = 'content_copy';
                copyLabel.textContent = 'Copy email';
                copyBtn.disabled      = false;
            }, 2000);
        });
    }

    /* =========================================
       10. Spoons Status
       ========================================= */
    const spoonsPill = document.getElementById('spoons-pill');
    const spoonsText = document.getElementById('spoons-text');

    if (spoonsPill && spoonsText) {
        async function checkSpoonsStatus() {
            try {
                const res = await fetch(
                    'https://wbutnbxpntpxkovptooh.supabase.co/rest/v1/visits?select=checked_in_at&checked_out_at=is.null&order=checked_in_at.desc&limit=1',
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
                const wasActive = spoonsPill.classList.contains('spoons-active');
                const wasInactive = spoonsPill.classList.contains('spoons-inactive');

                if (active) {
                    const time = new Date(active.checked_in_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
                    spoonsText.textContent = `At Spoons · ${time}`;
                    if (!wasActive && wasInactive) {
                        spoonsPill.classList.add('spoons-ripple');
                        setTimeout(() => spoonsPill.classList.remove('spoons-ripple'), 700);
                    }
                    spoonsPill.classList.add('spoons-active');
                    spoonsPill.classList.remove('spoons-inactive');
                } else {
                    spoonsText.textContent = 'Not at Spoons';
                    spoonsPill.classList.add('spoons-inactive');
                    spoonsPill.classList.remove('spoons-active');
                }
            } catch (e) {
                spoonsText.textContent = 'Not at Spoons';
                spoonsPill.classList.add('spoons-inactive');
                console.log('Spoons radar offline', e);
            }
        }
        checkSpoonsStatus();
        setInterval(checkSpoonsStatus, 15 * 1000);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') checkSpoonsStatus();
        });
    }

} // end init

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

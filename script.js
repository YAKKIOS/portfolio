function init() {

    /* =========================================
       0. Page Transitions
       ========================================= */
    // A fixed white overlay handles the fade so body opacity is never
    // touched — body opacity breaks position:fixed on all descendants.
    const overlay = document.createElement('div');
    overlay.style.cssText = [
        'position:fixed', 'inset:0', 'background:#fff',
        'z-index:99999', 'pointer-events:none',
        'opacity:1', 'transition:opacity 0.35s ease'
    ].join(';');
    document.body.appendChild(overlay);

    // Fade the overlay out (page enter)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            overlay.style.opacity = '0';
        });
    });

    // Safari bfcache: hitting Back restores the page without firing DOMContentLoaded,
    // leaving the overlay stuck at opacity:1. pageshow fires instead with e.persisted=true.
    window.addEventListener('pageshow', e => {
        if (e.persisted) {
            overlay.style.transition = 'opacity 0.35s ease';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => { overlay.style.opacity = '0'; });
            });
        }
    });

    // Fade the overlay in then navigate (page leave)
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
            
            if (scrollableHeight <= 0) {
                scrollbar.style.opacity = '0';
                return;
            } else {
                scrollbar.style.opacity = '1';
            }

            let progress = window.scrollY / scrollableHeight;
            progress = Math.max(0, Math.min(progress, 1)); 
            
            fill.style.height = `${progress * 100}%`;
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
            const now = new Date();
            const rawTime = now.toLocaleTimeString('en-GB', {
                timeZone: 'Europe/London',
                hour: 'numeric', /* <-- Changed from '2-digit' to remove the leading zero */
                minute: '2-digit',
                hour12: true
            });
            
            // Force lowercase and strip out the space before am/pm
            const cleanTime = rawTime.toLowerCase().replace(' ', '');
            
            timeDisplay.textContent = cleanTime; 
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
       4. Rough Notation (Scroll-Triggered, Multi-Element)
       ========================================= */
    // Defer until the container slide-up animation ends so getBoundingClientRect()
    // returns correct coordinates (a live transform shifts them off-screen).
    const _rnContainer = document.querySelector('.container');
    const _initRoughNotation = () => {
    if (typeof RoughNotation !== 'undefined') {
        const annotate = RoughNotation.annotate;
        
        // Define your styles. You can use these classes as many times as you want!
        const styles = [
            { selector: '.rn-highlight', type: 'highlight', color: '#F4B3F8', strokeWidth: 1.5 },
            { selector: '.rn-underline', type: 'underline', color: '#157CFF', strokeWidth: 2 },
            { selector: '.rn-circle', type: 'circle', color: '#FF9800', strokeWidth: 1.5 },
            { selector: '.rn-box', type: 'box', color: '#F44336', strokeWidth: 1.5 }
        ];

        // The scroll-watcher
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When the element comes into view and hasn't been animated yet
                if (entry.isIntersecting) {
                    const annotation = entry.target._rnAnnotation; 
                    if (annotation && !entry.target.dataset.animated) {
                        annotation.show();
                        entry.target.dataset.animated = 'true'; // Lock it so it only draws once
                    }
                }
            });
        }, { threshold: 0.5 }); // Triggers when 50% visible

        // Find ALL matching elements on the page and prep them
        styles.forEach(style => {
            const elements = document.querySelectorAll(style.selector); // Grab all of them!
            
            elements.forEach(el => {
                // Prep the drawing instructions and attach it to the element
                el._rnAnnotation = annotate(el, {
                    type: style.type,
                    color: style.color,
                    strokeWidth: style.strokeWidth,
                    padding: 2,
                    animationDuration: 600,
                    multiline: true /* <-- THE FIX: Tells the script to trace actual text lines */
                });
                
                // Tell the scroll-watcher to keep an eye on this specific element
                observer.observe(el);
            });
        });
    }
    }; // end _initRoughNotation

    if (_rnContainer) {
        _rnContainer.addEventListener('animationend', _initRoughNotation, { once: true });
    } else {
        _initRoughNotation();
    }

    /* =========================================
       5. Random Lore
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
        "I was an avid horse rider until my sister was thrown from her horse and broke her shoulder... I promptly gave up the sport 🐎",
        "I setup an Onlyfans page for margaritas called Onlymargs but has since been deprecated 🍸",
        "Whilst at Komodo Digital I accidentally had the office Christmas cards printed upside down and it's still talked about to this day 🎄",
        "I once drank an entire pitcher of raspberry mojito and I turned red like a scene from Charlie and the Chocolate Factory 😳",
        
        
    ];

    const loreDiceIcons = [
        'assets/icons/dice_one.png',
        'assets/icons/dice_two.svg',
        'assets/icons/dice_three.svg',
        'assets/icons/dice_four.svg',
        'assets/icons/dice_five.svg',
        'assets/icons/dice_six.svg',
    ];

    const loreBtn  = document.getElementById('lore-btn');
    const loreBody = document.getElementById('lore-body');
    const loreText = document.getElementById('lore-text');
    const loreDice = document.getElementById('lore-dice');

    if (loreBtn) {
        let currentLoreIndex = 0;
        let currentDiceIndex = 2;

        loreBtn.addEventListener('click', () => {
            loreBody.classList.add('is-rolling');

            // Swap content at peak blur (halfway through the 300ms animation)
            setTimeout(() => {
                // Pick a different fact and a random dice
                let nextLore = currentLoreIndex;
                while (nextLore === currentLoreIndex) {
                    nextLore = Math.floor(Math.random() * loreFacts.length);
                }
                let nextDice = currentDiceIndex;
                while (nextDice === currentDiceIndex) {
                    nextDice = Math.floor(Math.random() * loreDiceIcons.length);
                }
                currentLoreIndex = nextLore;
                currentDiceIndex = nextDice;
                loreText.textContent = loreFacts[currentLoreIndex];
                loreDice.src = loreDiceIcons[currentDiceIndex];
            }, 150);

            setTimeout(() => loreBody.classList.remove('is-rolling'), 300);
        });
    }

    /* =========================================
       6. Live Weather (Gateshead, UK)
       ========================================= */
    const weatherDisplay = document.querySelector('#local-weather');
    
    // SAFETY CHECK: Only run if the weather span exists on the page
    if (weatherDisplay) {
        async function fetchWeather() {
            try {
                // Fetching data for Gateshead (Lat: 54.962, Long: -1.6017)
                const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=54.962&longitude=-1.6017&current_weather=true');
                const data = await response.json();
                
                // Grab the temperature and round it so we don't get messy decimals
                const temp = Math.round(data.current_weather.temperature);
                
                // Inject the clean temperature with the Celsius symbol
                weatherDisplay.textContent = `${temp}°C`; 
                
            } catch (error) {
                // If the user is offline or the API fails, fail silently and cleanly
                console.error("Weather data unavailable", error);
                weatherDisplay.textContent = '--°C';
            }
        }

        fetchWeather(); // Run immediately on load
        setInterval(fetchWeather, 1800000); // Check for an update every 30 minutes
    }

    /* =========================================
       7. About Page Picture Tooltips
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

        stackedPics.forEach(pic => {
            // Tooltip: real pointer devices only — guards against synthetic
            // mouseenter fired by mobile browsers on tap.
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

        // Mobile lightbox — proximity based so z-index stacking doesn't cause
        // the wrong card to fire. Finds the card whose centre is closest to the
        // tap point, then opens that image in the lightbox.
        const pictureStack = document.querySelector('.picture-stack');
        const lbModal  = document.querySelector('.lightbox-modal');
        const lbImg    = document.querySelector('.lightbox-content');

        if (pictureStack && lbModal && lbImg && !canHover.matches) {
            let touchStartX, touchStartY;

            pictureStack.addEventListener('touchstart', e => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            pictureStack.addEventListener('touchend', e => {
                const t = e.changedTouches[0];
                // Ignore vertical drift — likely a scroll attempt
                if (Math.abs(t.clientY - touchStartY) > 20) return;

                // Cards spread horizontally — X distance alone picks the right card
                let closest = null, minDist = Infinity;
                stackedPics.forEach(pic => {
                    const r = pic.getBoundingClientRect();
                    const dist = Math.abs(t.clientX - (r.left + r.width / 2));
                    if (dist < minDist) { minDist = dist; closest = pic; }
                });

                if (!closest) return;

                // Ignore taps in the empty space above/below the cards
                const cr = closest.getBoundingClientRect();
                if (t.clientY < cr.top - 8 || t.clientY > cr.bottom + 8) return;

                // preventDefault stops the browser generating a synthetic click
                // that would land on the now-visible modal and immediately close it
                e.preventDefault();

                const img = closest.querySelector('img');
                if (!img) return;
                lbImg.src = img.src;
                lbImg.alt = img.alt;
                lbModal.classList.add('is-open');
                lbModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }, { passive: false }); // must be non-passive to call preventDefault
        }

        // Hide tooltip while scrolling — position:fixed doesn't track the card on scroll
        window.addEventListener('scroll', () => tooltip.classList.remove('is-visible'), { passive: true });
    }

    /* =========================================
       8. Contact Card — 3D Tilt, Holographic Glare, Copy Email
       ========================================= */
    const contactCard = document.getElementById('contact-card');
    const copyBtn     = document.getElementById('copy-email-btn');

    if (contactCard) {
        const MAX_TILT = 10; // degrees
        let rafId;

        // Disable CSS transition while tracking so updates are instant
        contactCard.addEventListener('mouseenter', () => {
            contactCard.style.transition = 'none';
        });

        contactCard.addEventListener('mousemove', (e) => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const rect  = contactCard.getBoundingClientRect();
                const x     = (e.clientX - rect.left) / rect.width;   // 0–1
                const y     = (e.clientY - rect.top)  / rect.height;  // 0–1
                const tiltX = (y - 0.5) * -MAX_TILT;
                const tiltY = (x - 0.5) *  MAX_TILT;

                contactCard.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                contactCard.style.setProperty('--mouse-x', `${x * 100}%`);
                contactCard.style.setProperty('--mouse-y', `${y * 100}%`);
            });
        });

        // Spring back to flat on leave
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
        const EMAIL     = 'hello@jackjohnson.co.uk';
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

} // end init

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

document.addEventListener('DOMContentLoaded', () => {

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
                modal.classList.remove('is-open', 'is-closing');
                modalImg.src = trigger.src;
                modalImg.alt = trigger.alt || 'Expanded case study image';
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                // Double rAF lets the browser paint the hidden state before transitioning in
                requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('is-open')));
            });
        });

        const closeLightbox = () => {
            modal.classList.remove('is-open');
            modal.classList.add('is-closing');
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('is-closing');
                modalImg.src = '';
                document.body.style.overflow = '';
            }, 200);
        };

        modal.addEventListener('click', closeLightbox);

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
       5. Live Weather (Gateshead, UK)
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

        stackedPics.forEach(pic => {
            // Desktop: show on enter, track live as card lifts via transition
            pic.addEventListener('mouseenter', () => {
                tooltip.textContent = pic.getAttribute('data-tooltip');
                positionTooltip(pic);
                tooltip.classList.add('is-visible');
            });
            pic.addEventListener('mousemove', () => positionTooltip(pic));
            pic.addEventListener('mouseleave', () => tooltip.classList.remove('is-visible'));

            // Mobile: tap to lift + show tooltip
            pic.addEventListener('touchstart', e => {
                e.preventDefault();
                const wasActive = pic.classList.contains('is-active');
                stackedPics.forEach(p => p.classList.remove('is-active'));
                tooltip.classList.remove('is-visible');

                if (!wasActive) {
                    // Capture position before lift; offset by the 6px translateY + 16px gap
                    const rect = pic.getBoundingClientRect();
                    tooltip.textContent = pic.getAttribute('data-tooltip');
                    tooltip.style.top  = `${rect.top - 6 - 16}px`;
                    tooltip.style.left = `${rect.left + rect.width / 2}px`;
                    pic.classList.add('is-active');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => tooltip.classList.add('is-visible'));
                    });
                }
            }, { passive: false });
        });

        // Dismiss tooltip on tap outside the stack
        document.addEventListener('touchstart', e => {
            if (!e.target.closest('.stacked-pic')) {
                stackedPics.forEach(p => p.classList.remove('is-active'));
                tooltip.classList.remove('is-visible');
            }
        });
    }

}); // end DOMContentLoaded
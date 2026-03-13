document.addEventListener('DOMContentLoaded', () => {
    const hourElement = document.getElementById('local-hour');
    const minuteTrack = document.getElementById('minute-track');
    const minuteCurrent = document.getElementById('minute-current');
    const minuteNext = document.getElementById('minute-next');
    const timeDot = document.getElementById('time-dot');
    
    // 1. Safety Check: Will tell you instantly if your HTML is missing an ID
    if (!hourElement || !minuteTrack || !minuteCurrent || !minuteNext) {
        console.error("Clock Error: Missing an HTML ID. Ensure local-hour, minute-track, minute-current, and minute-next exist.");
        return; 
    }

    let currentMinuteValue = null;

    function updateGatesheadTimeAndColor() {
        const now = new Date();
        const options = { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        
        const timeParts = formatter.formatToParts(now);
        let ukHour = '';
        let ukMinute = '';
        
        timeParts.forEach(part => {
            if (part.type === 'hour') ukHour = part.value;
            if (part.type === 'minute') ukMinute = part.value;
        });

        hourElement.textContent = ukHour;

        // The Elegant Fade Rollover
        if (currentMinuteValue !== ukMinute) {
            if (currentMinuteValue === null) {
                // Initial page load: set immediately
                minuteCurrent.textContent = ukMinute;
                currentMinuteValue = ukMinute;
            } else {
                // 1. Prep the next number silently
                minuteNext.textContent = ukMinute;
                
                // 2. Force browser to register the text change before animating
                void minuteTrack.offsetWidth;

                // 3. Add the class to trigger the CSS slide + fade
                minuteTrack.classList.add('is-rolling');

                // 4. Wait for the 0.6s CSS transition to finish, then clean up invisibly
                setTimeout(() => {
                    minuteCurrent.textContent = ukMinute; // Swap the top text
                    currentMinuteValue = ukMinute;
                    minuteTrack.classList.remove('is-rolling'); // Snaps everything back to 0 instantly
                }, 600); 
            }
        }

        // Living Dot Color
        let dotColor = '';
        let dotGlow = '';
        const numericHour = parseInt(ukHour, 10);

        if (numericHour >= 6 && numericHour < 12) {
            dotColor = '#f59e0b'; dotGlow = 'rgba(245, 158, 11, 0.4)'; 
        } else if (numericHour >= 12 && numericHour < 17) {
            dotColor = 'var(--blue-primary)'; dotGlow = 'rgba(59, 130, 246, 0.4)'; 
        } else if (numericHour >= 17 && numericHour < 21) {
            dotColor = '#8b5cf6'; dotGlow = 'rgba(139, 92, 246, 0.4)'; 
        } else {
            dotColor = '#312e81'; dotGlow = 'rgba(49, 46, 129, 0.4)'; 
        }

        if (timeDot) {
            timeDot.style.backgroundColor = dotColor;
            timeDot.style.boxShadow = `0 0 6px ${dotGlow}`;
        }
    }

    updateGatesheadTimeAndColor();
    setInterval(updateGatesheadTimeAndColor, 1000);
});
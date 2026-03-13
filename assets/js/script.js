        // --- Like Logic ---
        function toggleLike(btn, event) {
            if(event) { event.preventDefault(); event.stopPropagation(); }
            btn.classList.toggle('liked');
            const icon = btn.querySelector('.material-icons-round');
            const wrapper = btn.closest('.like-group') || btn; 
            const countSpan = wrapper.querySelector('.like-count');
            
            if (btn.classList.contains('liked')) {
                icon.innerText = 'favorite';
                if(countSpan) { countSpan.style.display = 'block'; countSpan.innerText = '1'; }
            } else {
                icon.innerText = 'favorite_border';
                if(countSpan) { countSpan.style.display = 'none'; }
            }
        }

        // --- Draggable Carousel Logic ---
        const carousels = document.querySelectorAll('.carousel-container');
        let isDown = false;
        let startX;
        let scrollLeft;
        let isDragging = false; 

        carousels.forEach(slider => {
            // 1. Prevent native image drag (Ghost Image)
            slider.addEventListener('dragstart', (e) => e.preventDefault());

            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                isDragging = false;
                slider.classList.add('active');
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });

            slider.addEventListener('mouseleave', () => {
                isDown = false;
                slider.classList.remove('active');
            });

            slider.addEventListener('mouseup', () => {
                isDown = false;
                slider.classList.remove('active');
                // Small timeout to ensure the click event has time to check isDragging
                setTimeout(() => { isDragging = false; }, 50); 
            });

            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault(); // Prevents text selection
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 1; // 1:1 Movement speed
                slider.scrollLeft = scrollLeft - walk;
                
                // If moved more than 5 pixels, mark as drag
                if(Math.abs(walk) > 5) {
                    isDragging = true;
                }
            });
        });

        // Wrapper to handle Click vs Drag conflict
        function handleImageClick(img, event) {
            // If we were dragging, kill the click
            if(isDragging) {
                if(event) { event.preventDefault(); event.stopPropagation(); }
                return; 
            }
            // Otherwise, open lightbox
            openLightbox(img, event);
        }

        // --- Multi-Image Lightbox Logic (With Captions) ---
        let currentGroup = []; 
        let currentIndex = 0;

        function openLightbox(img, event) {
            if(event) { event.preventDefault(); event.stopPropagation(); }
            
            const modal = document.getElementById('lightbox');
            const groupName = img.getAttribute('data-group');
            
            if (groupName) {
                const allImages = document.querySelectorAll(`img[data-group="${groupName}"]`);
                currentGroup = Array.from(allImages).map(el => ({
                    src: el.src,
                    caption: el.getAttribute('data-caption') || ''
                }));
                currentIndex = currentGroup.findIndex(item => item.src === img.src);
                modal.classList.remove('single-image');
            } else {
                currentGroup = [{
                    src: img.src,
                    caption: img.getAttribute('data-caption') || ''
                }];
                currentIndex = 0;
                modal.classList.add('single-image');
            }

            modal.style.display = 'flex';
            updateLightboxImage();
        }

        function changeSlide(direction, event) {
            if(event) event.stopPropagation(); 
            currentIndex += direction;
            if (currentIndex >= currentGroup.length) currentIndex = 0;
            if (currentIndex < 0) currentIndex = currentGroup.length - 1;
            updateLightboxImage();
        }

        function updateLightboxImage() {
            const modalImg = document.getElementById('lightbox-img');
            const captionText = document.getElementById('lightbox-caption');
            
            modalImg.src = currentGroup[currentIndex].src;
            captionText.innerText = currentGroup[currentIndex].caption;
        }

        function closeLightbox(event) {
            if (event && (event.target.tagName === 'IMG' || event.target.tagName === 'BUTTON' || event.target.parentNode.tagName === 'BUTTON')) {
                return;
            }
            document.getElementById('lightbox').style.display = 'none';
        }

// --- Toast Logic ---
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.className = "toast show";
    
    // Hide it after 3 seconds
    setTimeout(function(){ 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}
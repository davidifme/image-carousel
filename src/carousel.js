export const carouselManager = (function() {
    const carouselImages = document.querySelectorAll('img');
    let currentImage = carouselImages[0];

    function setupCarousel() {
        renderImages();
        renderDots();
        setupButtons();
    }

    function setupButtons() {
        setupDotImageSwitch();
        setupArrowSwitchButtons();
    }

    function renderDots() {
        const dotsContainer = document.getElementById('picture-dots');
        dotsContainer.innerHTML = '';

        carouselImages.forEach((image, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.dataset.index = index;

            if (image === currentImage) {
                dot.classList.add('dot-current');
            }

            dotsContainer.appendChild(dot);
        });
    }

    function renderImages() {
        carouselImages.forEach((image, index) => {
            image.dataset.index = index;
            if (image !== currentImage) {
                image.classList.add('hidden');
            } else {
                image.classList.remove('hidden');
            }
        });
    }

    function setupArrowSwitchButtons() {
        const previousImageButton = document.getElementById('previous');
        const nextImageButton = document.getElementById('next');

        previousImageButton.addEventListener('click', () => {
            if (carouselImages.length > 1) {
                if (currentImage === carouselImages[0]) {
                    currentImage = carouselImages[carouselImages.length - 1];
                } else {
                    currentImage = carouselImages[currentImage.dataset.index - 1];
                }
                setupCarousel();
            }
        });

        nextImageButton.addEventListener('click', () => {
            if (carouselImages.length > 1) {
                if (currentImage === carouselImages[carouselImages.length - 1]) {
                    currentImage = carouselImages[0];
                } else {
                    currentImage = carouselImages[currentImage.dataset.index + 1];
                }
                setupCarousel();
            }
        });
    }

    function setupDotImageSwitch() {
        const dots = document.querySelectorAll('.dot');
        
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentImage = carouselImages[dot.dataset.index];
                setupCarousel();
            });
        });
    }

    return {
        setupCarousel
    }
})();
export const carouselManager = (function() {
    const carouselImages = document.querySelectorAll('img');
    let currentImage = carouselImages[0];
    let arrowListenersAdded = false;
    let autoSwitchInterval;

    function setupCarousel() {
        renderImages();
        renderDots();
        setupDotImageSwitch();

        if (!arrowListenersAdded) {
            setupArrowSwitchButtons();
            arrowListenersAdded = true;
        }
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

    function handlePreviousClick() {
        if (carouselImages.length > 1) {
            if (currentImage === carouselImages[0]) {
                currentImage = carouselImages[carouselImages.length - 1];
            } else {
                currentImage = carouselImages[parseInt(currentImage.dataset.index) - 1];
            }
            setupCarousel();
        }
    }

    function handleNextClick() {
        if (carouselImages.length > 1) {
            if (currentImage === carouselImages[carouselImages.length - 1]) {
                currentImage = carouselImages[0];
            } else {
                currentImage = carouselImages[parseInt(currentImage.dataset.index) + 1];
            }
            setupCarousel();
        }
    }

    function setupArrowSwitchButtons() {
        const previousImageButton = document.getElementById('previous');
        const nextImageButton = document.getElementById('next');

        previousImageButton.addEventListener('click', handlePreviousClick);
        nextImageButton.addEventListener('click', handleNextClick);
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

    function startAutoSwitch() {
        autoSwitchInterval = setInterval(handleNextClick, 5000);
    }

    function stopAutoSwitch() {
        clearInterval(autoSwitchInterval);
    }

    function resetAutoSwitch() {
        stopAutoSwitch();
        startAutoSwitch();
    }

    function setupAutoSwitch() {
        document.addEventListener('click', (event) => {
            if (event.target.closest('#previous') || event.target.closest('#next') || event.target.closest('.dot')) {
                resetAutoSwitch();
            }
        });

        startAutoSwitch();
    }

    return {
        setupCarousel,
        setupAutoSwitch
    }
})();

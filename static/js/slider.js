document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    const slideInterval = 4000; // 4 sekundit
    let intervalId;

    // Loo täpid
    if (dotsContainer) {
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                stopSlider();
                showSlide(i);
                startSlider();
            });
            dotsContainer.appendChild(dot);
        });
    }
    
    const dots = document.querySelectorAll('.dot');

    function updateDots(index) {
        if (dots.length > 0) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }

    function showSlide(index) {
        currentSlide = index;
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        updateDots(index);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        intervalId = setInterval(nextSlide, slideInterval);
    }

    function stopSlider() {
        clearInterval(intervalId);
    }

    // Nuppude funktsionaalsus
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            stopSlider();
            nextSlide();
            startSlider();
        });

        prevBtn.addEventListener('click', () => {
            stopSlider();
            prevSlide();
            startSlider();
        });
    }

    // Käivita galerii
    if (slides.length > 0) {
        showSlide(currentSlide);
        startSlider();
    }
});
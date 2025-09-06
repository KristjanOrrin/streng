document.addEventListener('DOMContentLoaded', () => {
    const galleryCards = document.querySelectorAll('.gallery-card');
    const popup = document.getElementById('gallery-popup');
    const closeBtn = popup.querySelector('.close-btn');
    const slider = popup.querySelector('.popup-slider');
    const dotsContainer = popup.querySelector('.slider-dots');
    const prevBtn = popup.querySelector('.slider-btn.prev');
    const nextBtn = popup.querySelector('.slider-btn.next');

    // Piltide andmebaas kategooriate kaupa
    const images = {
        uhiskondlikud: ['static/images/uk1.jpg', 'static/images/uk2.jpg', 'static/images/uk3.jpeg', 'static/images/uk4.jpeg', 'static/images/uk5.jpeg', 'static/images/uk6.jpeg'],
        kaubandus: ['static/images/kb1.jpg', 'static/images/kb2.jpg', 'static/images/kb3.jpg', 'static/images/kb4.jpg'],
        toostus: ['static/images/t1.jpeg', 'static/images/t2.jpeg', 'static/images/t3.jpeg'],
        elamud: ['static/images/e1.jpg', 'static/images/e2.jpg', 'static/images/e3.jpg', 'static/images/e4.jpg', 'static/images/e5.jpg'],
        korterelamud: ['static/images/k1.jpg', 'static/images/k2.jpg', 'static/images/k3.jpeg', 'static/images/k4.jpg'],
        rodud: ['static/images/rv1.jpg', 'static/images/rv2.jpg', 'static/images/rv3.jpg', 'static/images/rv4.jpeg', 'static/images/rv5.jpeg', 'static/images/rv6.jpg', 'static/images/rv7.jpg', 'static/images/rv8.jpg', 'static/images/rv9.jpg'],
        rajatised: ['static/images/r1.jpg', 'static/images/r2.jpg', 'static/images/r3.jpg'],
        trepid: ['static/images/tp1.jpeg', 'static/images/tp2.jpg', 'static/images/tp3.jpeg', 'static/images/tp4.jpeg']
    };

    let currentSlide = 0;
    let slides = [];
    let dots = [];

    galleryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const category = card.dataset.category;
            const imagePaths = images[category] || [];
            if (imagePaths.length > 0) {
                openPopup(imagePaths);
            }
        });
    });

    function openPopup(imagePaths) {
        // Puhasta eelmine galerii
        slider.innerHTML = '';
        dotsContainer.innerHTML = '';
        slides = [];
        dots = [];

        // Loo uued slaidid ja täpid
        imagePaths.forEach((path, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            const img = document.createElement('img');
            img.src = path;
            slide.appendChild(img);
            slider.appendChild(slide);
            slides.push(slide);

            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });

        currentSlide = 0;
        updateSlider();
        popup.classList.add('show');
    }

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function showNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function showPrevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    nextBtn.addEventListener('click', showNextSlide);
    prevBtn.addEventListener('click', showPrevSlide);

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('show');
    });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('show');
        }
    });
});

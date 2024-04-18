document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    
    function updateSlidesPosition() {
        slides.forEach((slide, index) => {
            if (index < currentSlide) {
                slide.style.transform = 'translateX(-100%)';
            } else if (index > currentSlide) {
                slide.style.transform = 'translateX(100%)';
            } else {
                slide.style.transform = 'translateX(0)';
            }
        });
    }

    function showSlide(index) {
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 2;

        slides.forEach((slide) => slide.classList.remove('active'));
        dots.forEach((dot) => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
        updateSlidesPosition();
    }

    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');

    prevButton.addEventListener('click', function (e) {
        e.preventDefault();
        showSlide(currentSlide + 1);  // Invertir la dirección del movimiento aquí
    });

    nextButton.addEventListener('click', function (e) {
        e.preventDefault();
        showSlide(currentSlide - 1);  // Invertir la dirección del movimiento aquí
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showSlide(index);
        });
    });

    updateSlidesPosition(); // Ajustar la posición inicial de los slides
    showSlide(currentSlide); // Mostrar el slide inicial
});

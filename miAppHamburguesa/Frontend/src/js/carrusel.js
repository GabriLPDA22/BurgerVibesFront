document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    
    function updateSlidesPosition() {
        slides.forEach((slide, index) => {
            slide.style.transition = 'none';  // Desactivar la transición durante el cálculo de posición
            if (index < currentSlide) {
                slide.style.transform = 'translateX(-100%)';
            } else if (index > currentSlide) {
                slide.style.transform = 'translateX(100%)';
            } else {
                slide.style.transform = 'translateX(0)';
            }
            slide.offsetHeight; // Provoca un reflow para que la transición se desactive realmente
            slide.style.transition = 'transform 0.5s ease-out'; // Reactiva la transición para la animación
        });
    }
    

    function showSlide(index) {
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;

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
        showSlide(currentSlide - 1); // Mover al slide anterior
    });

    nextButton.addEventListener('click', function (e) {
        e.preventDefault();
        showSlide(currentSlide + 1); // Mover al slide siguiente
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showSlide(index);
        });
    });

    updateSlidesPosition(); // Ajustar la posición inicial de los slides
    showSlide(currentSlide); // Mostrar el slide inicial
});

document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    function showSlide(index) {
        // Si el índice está fuera de rango, 'reinicia' al primer slide
        if (index >= totalSlides) index = 0;
        // Si el índice es negativo, establece al último slide
        if (index < 0) index = totalSlides - 1;

        slides.forEach((slide) => slide.classList.remove('active'));
        dots.forEach((dot) => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Manejadores para los botones 'prev' y 'next'
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');

    prevButton.addEventListener('click', function (e) {
        e.preventDefault();
        showSlide(currentSlide - 1);
    });

    nextButton.addEventListener('click', function (e) {
        e.preventDefault();
        showSlide(currentSlide + 1);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showSlide(index);
        });
    });

    // Comentar o eliminar esta función si ya no deseas que el carrusel avance automáticamente
    // startSlideShow();
});

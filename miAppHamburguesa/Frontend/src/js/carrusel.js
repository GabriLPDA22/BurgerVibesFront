// Evento que se ejecuta cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Inicialización de variables
    let currentSlide = 0; // Índice del slide actual
    const slides = document.querySelectorAll('.carousel-item'); // Colección de todos los elementos de slide
    const dots = document.querySelectorAll('.dot'); // Colección de todos los elementos de puntos de navegación
    const totalSlides = slides.length; // Total de slides

    /**
     * Función para actualizar la posición de los slides.
     * Coloca cada slide en la posición correcta según el slide actual.
     */
    function updateSlidesPosition() {
        slides.forEach((slide, index) => {
            slide.style.transition = 'none'; // Desactivar la transición durante el cálculo de posición
            if (index < currentSlide) {
                slide.style.transform = 'translateX(-100%)'; // Colocar slides anteriores fuera de vista a la izquierda
            } else if (index > currentSlide) {
                slide.style.transform = 'translateX(100%)'; // Colocar slides siguientes fuera de vista a la derecha
            } else {
                slide.style.transform = 'translateX(0)'; // Colocar el slide actual en su posición
            }
            slide.offsetHeight; // Provoca un reflow para que la transición se desactive realmente
            slide.style.transition = 'transform 0.5s ease-out'; // Reactivar la transición para la animación
        });
    }

    /**
     * Función para mostrar un slide específico.
     * @param {number} index - Índice del slide a mostrar.
     */
    function showSlide(index) {
        if (index >= totalSlides) index = 0; // Volver al primer slide si el índice excede el total
        if (index < 0) index = totalSlides - 1; // Ir al último slide si el índice es negativo

        slides.forEach((slide) => slide.classList.remove('active')); // Remover la clase 'active' de todos los slides
        dots.forEach((dot) => dot.classList.remove('active')); // Remover la clase 'active' de todos los puntos

        slides[index].classList.add('active'); // Añadir la clase 'active' al slide actual
        dots[index].classList.add('active'); // Añadir la clase 'active' al punto actual
        currentSlide = index; // Actualizar el índice del slide actual
        updateSlidesPosition(); // Actualizar la posición de los slides
    }

    // Referencias a los botones de control de la galería
    const prevButton = document.querySelector('.carousel-control.prev');
    const nextButton = document.querySelector('.carousel-control.next');

    // Evento de clic para el botón de slide anterior
    prevButton.addEventListener('click', function (e) {
        e.preventDefault();
        showSlide(currentSlide - 1); // Mover al slide anterior
    });

    // Evento de clic para el botón de slide siguiente
    nextButton.addEventListener('click', function (e) {
        e.preventDefault();
        showSlide(currentSlide + 1); // Mover al slide siguiente
    });

    // Añadir eventos de clic a cada punto de navegación
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            showSlide(index); // Mostrar el slide correspondiente al punto clicado
        });
    });

    updateSlidesPosition(); // Ajustar la posición inicial de los slides
    showSlide(currentSlide); // Mostrar el slide inicial
});

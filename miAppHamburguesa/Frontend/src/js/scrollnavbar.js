document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    var navbarToggler = document.querySelector('.navbar-toggler');
    var navbarNav = document.querySelector('.navbar-nav');
    var navLinks = document.querySelectorAll('.nav-link'); // Selecciona todos los enlaces de navegación
    var customModalClose = document.getElementById('customModalClose');
    var btnReservaMesa = document.getElementById('reservaMesaButton');
    var bodyElement = document.body; // Referencia al elemento body

    /**
     * Función para abrir el navbar.
     * Añade la clase 'open' al navbar y deshabilita el scroll en el body.
     */
    function openNavbar() {
        navbarNav.classList.add('open');
        bodyElement.classList.add('body-no-scroll'); // Añade la clase para deshabilitar el scroll
    }

    /**
     * Función para cerrar el navbar.
     * Remueve la clase 'open' del navbar y habilita el scroll en el body.
     */
    function closeNavbar() {
        navbarNav.classList.remove('open');
        bodyElement.classList.remove('body-no-scroll'); // Quita la clase para permitir el scroll
    }

    /**
     * Función para abrir un modal y cerrar el navbar.
     * @param {string} modalId - El ID del modal a abrir.
     */
    function openModal(modalId) {
        var modal = document.getElementById(modalId);
        modal.style.display = 'block';
        closeNavbar();
    }

    // Evento para alternar el estado del menú al hacer clic en el toggler
    navbarToggler.addEventListener('click', function() {
        if (navbarNav.classList.contains('open')) {
            closeNavbar();
        } else {
            openNavbar();
        }
    });

    // Evento para cerrar el menú al hacer clic en el botón de cierre del modal
    customModalClose.addEventListener('click', function() {
        closeNavbar();
    });

    // Evento para cerrar el menú al hacer clic en un enlace de navegación
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeNavbar();
            // Si necesitas cerrar un modal potencialmente abierto, añade aquí el código para hacerlo
        });
    });

    // Evento para abrir el modal de reserva de mesa y cerrar el navbar
    btnReservaMesa.addEventListener('click', function() {
        openModal('reservaMesaModal'); // Asegúrate de que el ID del modal es correcto
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var navbarToggler = document.querySelector('.navbar-toggler');
    var navbarNav = document.querySelector('.navbar-nav');
    var navLinks = document.querySelectorAll('.nav-link'); // Selecciona todos los enlaces de navegación
    var customModalClose = document.getElementById('customModalClose');
    var btnReservaMesa = document.getElementById('reservaMesaButton');

    // Función para cerrar el navbar
    function closeNavbar() {
        navbarNav.classList.remove('open');
    }

    // Función para abrir un modal y cerrar el navbar
    function openModal(modalId) {
        var modal = document.getElementById(modalId);
        modal.style.display = 'block';
        document.body.classList.add('body-no-scroll');
        closeNavbar();
    }

    // Evento para abrir el menú
    navbarToggler.addEventListener('click', function() {
        navbarNav.classList.add('open');
    });

    // Evento para cerrar el menú al hacer clic en el botón de cierre
    customModalClose.addEventListener('click', closeNavbar);

    // Evento para cerrar el menú al hacer clic en un enlace
    navLinks.forEach(function(link) {
        link.addEventListener('click', closeNavbar);
    });



    // Evento para abrir el modal de reserva de mesa y cerrar el navbar
    btnReservaMesa.addEventListener('click', function() {
        openModal('reservaMesaModal'); // Asegúrate de que el ID del modal es correcto
    });
});

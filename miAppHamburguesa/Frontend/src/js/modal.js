/**
 * MODAL DE PIDE ONLINE
 */
document.addEventListener('DOMContentLoaded', function () {
    // Obtención de referencias a los elementos del DOM
    var modal = document.getElementById('customOrderModal');
    var btnNavbar = document.getElementById('navbarOrderButton');
    var btnNavbarIngles = document.getElementById('navbarOrderButtonIngles');
    var btnHero = document.getElementById('heroOrderButton');
    var btnClose = document.getElementById('customModalClose');

    // Función para mostrar el modal
    function showModal() {
        modal.style.display = 'block';
    }

    // Función para cerrar el modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Asignar eventos a los botones para abrir el modal
    btnNavbar.onclick = showModal;
    btnHero.onclick = showModal;
    btnNavbarIngles.onclick = showModal;
    btnClose.onclick = closeModal;

    // Cierra el modal al hacer clic fuera del contenido del modal
    window.onclick = function (event) {
        if (event.target === modal) {
            closeModal();
        }
    }
});

/**
 * MODAL DE RESERVA
 */
document.addEventListener('DOMContentLoaded', function () {
    // Obtención de referencias a los elementos del DOM
    var reservaMesaButtonInicio = document.getElementById('reservaMesaButtonInicio');
    var reservaMesaButtonIngles = document.getElementById('reservaMesaButtonIngles');
    var reservaMesaModal = document.getElementById('reservaMesaModal');
    var reservaMesaClose = document.getElementById('reservaMesaClose');

    // Función para mostrar el modal de reserva de mesa
    function showReservaMesaModal() {
        reservaMesaModal.style.display = 'block';
    }

    // Función para cerrar el modal de reserva de mesa
    function closeReservaMesaModal() {
        reservaMesaModal.style.display = 'none';
    }

    // Asignar eventos a los botones para abrir y cerrar el modal
    reservaMesaButtonIngles.onclick = showReservaMesaModal;
    reservaMesaClose.onclick = closeReservaMesaModal;

    // Cierra el modal si se hace clic fuera de él
    window.onclick = function (event) {
        if (event.target === reservaMesaModal) {
            closeReservaMesaModal();
        }
    }
});

/**
 * MODAL DEL CONCEPTO
 */
document.addEventListener('DOMContentLoaded', function () {
    // Obtención de referencias a los elementos del DOM
    var modalOrder = document.getElementById('customOrderModal');
    var modalReserva = document.getElementById('reservaMesaModal');
    var btnsOrder = document.querySelectorAll('.btn-order');
    var btnsReserva = document.querySelectorAll('.btn-reserva');
    var closeButtons = document.querySelectorAll('.custom-close');

    // Asignar eventos a los botones para abrir los modales
    btnsOrder.forEach(function (btn) {
        btn.addEventListener('click', function () {
            modalOrder.style.display = 'block';
        });
    });

    btnsReserva.forEach(function (btn) {
        btn.addEventListener('click', function () {
            modalReserva.style.display = 'block';
        });
    });

    // Asignar eventos a los botones de cierre para cerrar los modales
    closeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var modalToClose = this.closest('.custom-modal');
            if (modalToClose) {
                modalToClose.style.display = 'none';
            }
        });
    });

    // Cierra el modal al hacer clic fuera de él
    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('custom-modal')) {
            event.target.style.display = 'none';
        }
    });
});

/**
 * MODAL CARTA
 */
document.addEventListener('DOMContentLoaded', function () {
    // Obtención de referencias a los elementos del DOM
    var modal = document.getElementById('myModal');
    var btnClose = document.getElementById('customModalCloseCarta');

    // Función para mostrar el modal
    function showModal() {
        modal.style.display = 'block';
    }

    // Función para cerrar el modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Asignar evento de clic al botón de cierre del modal
    btnClose.addEventListener('click', function (event) {
        event.stopPropagation(); // Detiene la propagación para evitar que se dispare el evento del modal
        closeModal();
    });

    // Escuchar el enlace "Carta" en la barra de navegación
    var cartaLink = document.querySelector('.nav-link[href="#carta"]');
    cartaLink.addEventListener('click', function (event) {
        event.preventDefault(); // Previene el comportamiento por defecto del enlace
        showModal();
    });

    // Cierra el modal al hacer clic fuera del contenido del modal
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});

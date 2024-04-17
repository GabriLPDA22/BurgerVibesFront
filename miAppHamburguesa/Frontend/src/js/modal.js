
/**
 * MODAL DE PIDE ONLINE
*/

document.addEventListener('DOMContentLoaded', function () {
    // Obtén el modal y los botones para abrirlo
    var modal = document.getElementById('customOrderModal');
    var btnNavbar = document.getElementById('navbarOrderButton');
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

    // Asigna eventos a los botones
    btnNavbar.onclick = showModal;
    btnHero.onclick = showModal;
    btnClose.onclick = closeModal;

    // Cierra el modal al hacer clic fuera del contenido
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
    // Obtén el botón de Reserva mesa y el modal
    var reservaMesaButton = document.getElementById('reservaMesaButton');
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

    // Agrega evento de clic al botón de Reserva mesa para mostrar el modal
    reservaMesaButton.onclick = showReservaMesaModal;

    // Agrega evento de clic al botón de cierre del modal
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


document.addEventListener('DOMContentLoaded', function() {
    var modalOrder = document.getElementById('customOrderModal');
    var modalReserva = document.getElementById('reservaMesaModal');
    var btnsOrder = document.querySelectorAll('.btn-order');
    var btnsReserva = document.querySelectorAll('.btn-reserva');
    var closeButtons = document.querySelectorAll('.custom-close'); // Asegúrate de que todos los botones de cierre tengan esta clase

    // Abrir modal de pedido
    btnsOrder.forEach(function(btn) {
        btn.addEventListener('click', function() {
            modalOrder.style.display = 'block';
        });
    });

    // Abrir modal de reserva
    btnsReserva.forEach(function(btn) {
        btn.addEventListener('click', function() {
            modalReserva.style.display = 'block';
        });
    });

    // Cerrar modal con el botón de cierre
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Esto asume que el botón de cierre está dentro del modal que debe cerrar
            var modalToClose = this.closest('.custom-modal');
            if (modalToClose) {
                modalToClose.style.display = 'none';
            }
        });
    });

    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('custom-modal')) {
            event.target.style.display = 'none';
        }
    });
});

/**
 * MODAL DE LA CARTA
 */
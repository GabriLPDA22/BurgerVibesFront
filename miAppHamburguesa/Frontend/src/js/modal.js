
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
 * MODAL CONCEPTO
 */

document.addEventListener('DOMContentLoaded', function () {
    // Obtener los elementos de los botones y los modales
    var pedidoButton = document.getElementById('heroOrderButton');
    var reservaMesaButton = document.getElementById('reservaMesaButton');
    var pedidoModal = document.getElementById('customOrderModal');
    var reservaMesaModal = document.getElementById('reservaMesaModal');
    var pedidoClose = document.getElementById('customModalClose');
    var reservaMesaClose = document.getElementById('reservaMesaClose');

    // Función para mostrar el modal de pedido
    function showPedidoModal() {
        pedidoModal.style.display = 'block';
    }

    // Función para ocultar el modal de pedido
    function closePedidoModal() {
        pedidoModal.style.display = 'none';
    }

    // Función para mostrar el modal de reserva de mesa
    function showReservaMesaModal() {
        reservaMesaModal.style.display = 'block';
    }

    // Función para ocultar el modal de reserva de mesa
    function closeReservaMesaModal() {
        reservaMesaModal.style.display = 'none';
    }

    // Evento de clic para mostrar el modal de pedido al hacer clic en el botón "Haz tu Pedido"
    pedidoButton.addEventListener('click', showPedidoModal);

    // Evento de clic para mostrar el modal de reserva de mesa al hacer clic en el botón "Reserva una Mesa"
    reservaMesaButton.addEventListener('click', showReservaMesaModal);

    // Evento de clic para ocultar el modal de pedido al hacer clic en el botón de cierre del modal
    pedidoClose.addEventListener('click', closePedidoModal);

    // Evento de clic para ocultar el modal de reserva de mesa al hacer clic en el botón de cierre del modal
    reservaMesaClose.addEventListener('click', closeReservaMesaModal);

    // Evento de clic para ocultar el modal de pedido al hacer clic fuera del modal
    window.addEventListener('click', function (event) {
        if (event.target === pedidoModal) {
            closePedidoModal();
        }
    });

    // Evento de clic para ocultar el modal de reserva de mesa al hacer clic fuera del modal
    window.addEventListener('click', function (event) {
        if (event.target === reservaMesaModal) {
            closeReservaMesaModal();
        }
    });
});




/**
 * MODAL DE LA CARTA
 */
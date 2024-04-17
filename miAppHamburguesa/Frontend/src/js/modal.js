document.addEventListener('DOMContentLoaded', function() {
    console.log("Documento cargado y listo");

    // Obteniendo los elementos del modal y los botones
    var modal = document.getElementById('customOrderModal');
    var btnHero = document.getElementById('heroOrderButton');
    var btnClose = document.getElementById('customModalClose');
    var reservaMesaButton = document.getElementById('reservaMesaButton');
    var reservaMesaModal = document.getElementById('reservaMesaModal');
    var reservaMesaClose = document.getElementById('reservaMesaClose');

    // Verificaciones de consola
    console.log("Modal de Pedidos:", modal);
    console.log("Botón Hero:", btnHero);
    console.log("Modal de Reservas:", reservaMesaModal);
    console.log("Botón Reserva:", reservaMesaButton);

    if (btnHero && modal && btnClose) {
        btnHero.addEventListener('click', function() {
            console.log("Mostrando modal de pedidos");
            modal.style.display = 'block';
        });

        btnClose.addEventListener('click', function() {
            console.log("Cerrando modal de pedidos");
            modal.style.display = 'none';
        });
    } else {
        console.error("Error al inicializar los eventos de los botones de pedidos");
    }

    if (reservaMesaButton && reservaMesaModal && reservaMesaClose) {
        reservaMesaButton.addEventListener('click', function() {
            console.log("Mostrando modal de reservas");
            reservaMesaModal.style.display = 'block';
        });

        reservaMesaClose.addEventListener('click', function() {
            console.log("Cerrando modal de reservas");
            reservaMesaModal.style.display = 'none';
        });
    } else {
        console.error("Error al inicializar los eventos de los botones de reserva");
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

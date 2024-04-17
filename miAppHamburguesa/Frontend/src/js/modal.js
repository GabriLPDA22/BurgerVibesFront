// Asegúrate de que este código se ejecuta después de que se haya cargado el DOM
document.addEventListener('DOMContentLoaded', function() {
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
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
});

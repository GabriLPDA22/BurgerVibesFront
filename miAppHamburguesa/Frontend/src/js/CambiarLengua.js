document.addEventListener('DOMContentLoaded', function () {
    const languageButton = document.getElementById('language-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    languageButton.addEventListener('click', function() {
        // Mostrar u ocultar el menú desplegable
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const lang = this.getAttribute('data-lang');
            if (lang === 'en') {
                window.location.href = '/miAppHamburguesa/Frontend/public/en_index.html';
            } else if (lang === 'es') {
                window.location.href = '/miAppHamburguesa/Frontend/public/es_index.html';
            }
            // Ocultar el menú después de la selección
            dropdownMenu.style.display = 'none';
        });
    });

    // Cerrar el menú desplegable si se hace clic en cualquier lugar fuera de él
    window.addEventListener('click', function(event) {
        if (!event.target.matches('#language-button')) {
            dropdownMenu.style.display = 'none';
        }
    });
});

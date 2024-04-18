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
                window.location.href = '/miAppHamburguesa/Frontend/public/html_Ingles/en_index.html';
            } else if (lang === 'es') {
                window.location.href = '/miAppHamburguesa/Frontend/public/html_Español/es_index.html';
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


/**
 * Evitar el flasheo del slogan al cargar la web 
 */

document.addEventListener('DOMContentLoaded', function() {
    // Asegurarse de que el cuerpo de la página se desvanezca
    document.body.classList.add('fade-in');

    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            // Desvanecer el cuerpo de la página
            document.body.classList.remove('fade-in');
            document.body.classList.add('fade-out');

            // Establecer un breve retraso antes de cambiar la página
            setTimeout(() => {
                const lang = this.getAttribute('data-lang');
                window.location.href = this.getAttribute('href');
            }, 250); // 250ms para la mitad de la duración de la transición CSS
        });
    });
});

window.addEventListener('load', function() {
    // Asegurarse de que el cuerpo de la página se desvanezca
    if (document.body.classList.contains('fade-out')) {
        document.body.classList.remove('fade-out');
        document.body.classList.add('fade-in');
    }
});

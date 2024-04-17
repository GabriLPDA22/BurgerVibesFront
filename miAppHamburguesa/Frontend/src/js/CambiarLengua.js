document.addEventListener('DOMContentLoaded', function () {
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const lang = this.getAttribute('data-lang');
            if (lang === 'en') {
                translateToEnglish();
            } else if (lang === 'es') {
                translateToSpanish();
            }
        });
    });

    function translateToEnglish() {
        // Redireccionar a la versión en inglés de la página
        window.location.href = '../public/en_index.html';
        addEventListener
    }

    function translateToSpanish() {
        // Redireccionar a la versión en español de la página
        window.location.href = '../public/es_index.html';
    }
});




document.addEventListener('DOMContentLoaded', function() {
    const languageButton = document.getElementById('language-button');
    const languageSwitcher = document.getElementById('language-switcher');

    languageButton.addEventListener('click', function() {
        languageSwitcher.classList.toggle('show');
    });
});

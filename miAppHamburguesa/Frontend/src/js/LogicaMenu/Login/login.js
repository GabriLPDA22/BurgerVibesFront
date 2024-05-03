document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const modal = document.getElementById('modalLogin');
    const loginBtn = document.getElementById('loginBtn');
    const closeButton = document.querySelector('#modalLogin .close');
    const signOutLink = document.getElementById('signOutLink');
    const userMenu = document.getElementById('userMenu');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const paymentFormContainer = document.getElementById('paymentFormContainer');
    const loginMessageContainer = document.getElementById('loginMessageContainer');

    // Funciones de ayuda para mostrar/ocultar elementos
    function toggleDisplay(element, show) {
        if (element) {
            element.style.display = show ? 'block' : 'none';
        }
    }

    function toggleModal(show) {
        toggleDisplay(modal, show);
    }

    function updateUI(isAuthenticated) {
        if (isAuthenticated) {
            const username = localStorage.getItem('username');
            usernameDisplay.textContent = username;
            toggleDisplay(loginBtn, false);
            toggleDisplay(userMenu, true);
            toggleDisplay(paymentFormContainer, true);
            toggleDisplay(loginMessageContainer, false);
        } else {
            usernameDisplay.textContent = '';
            toggleDisplay(loginBtn, true);
            toggleDisplay(userMenu, false);
            toggleDisplay(paymentFormContainer, false);
            toggleDisplay(loginMessageContainer, true);
        }
    }

    // Eventos de la interfaz de usuario
    loginBtn && loginBtn.addEventListener('click', () => toggleModal(true));
    closeButton && closeButton.addEventListener('click', () => toggleModal(false));
    signOutLink && signOutLink.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('authenticated');
        localStorage.removeItem('username');
        updateUI(false);
    });

    document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        localStorage.setItem('username', username);
        localStorage.setItem('authenticated', 'true');
        updateUI(true);
        toggleModal(false);
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            toggleModal(false);
        }
    });

    // Inicializar la UI basada en el estado de autenticación
    updateUI(localStorage.getItem('authenticated') === 'true');

    document.addEventListener('DOMContentLoaded', () => {
        const closeButton = document.querySelector('.close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                console.log('Cerrando modal');
                document.getElementById('modalLogin').style.display = 'none';
            });
        } else {
            console.error('El botón de cerrar no se encontró en el DOM.');
        }
    });

});

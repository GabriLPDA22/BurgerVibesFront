document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const modal = document.getElementById('modalLogin');
    const userMenu = document.getElementById('userMenu');
    const loginBtn = document.getElementById('loginBtn');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const paymentFormContainer = document.getElementById('paymentFormContainer');
    const loginMessageContainer = document.getElementById('loginMessageContainer');
    const signOutLink = document.getElementById('signOutLink');
    const loginPromptButton = document.getElementById('loginPromptButton'); // Botón para acceder

    // Funciones de ayuda
    function showElement(element) {
        if (element) element.style.display = 'block';
    }

    function hideElement(element) {
        if (element) element.style.display = 'none';
    }

    function toggleModal(show) {
        if (show) showElement(modal);
        else hideElement(modal);
    }

    function updateUI(isAuthenticated) {
        if (isAuthenticated) {
            const username = localStorage.getItem('username');
            hideElement(loginBtn);
            showElement(userMenu);
            usernameDisplay.textContent = username;
            showElement(paymentFormContainer);
            hideElement(loginMessageContainer);
        } else {
            showElement(loginBtn);
            hideElement(userMenu);
            usernameDisplay.textContent = '';
            hideElement(paymentFormContainer);
            showElement(loginMessageContainer);
        }
    }

    // Eventos de UI
    if (loginBtn) {
        loginBtn.addEventListener('click', () => toggleModal(true));
    }

    if (loginPromptButton) {
        loginPromptButton.addEventListener('click', () => toggleModal(true)); // Muestra el modal cuando se hace clic en Acceder
    } else {
        console.error('El botón para acceder no se encontró en el DOM.');
    }

    if (signOutLink) {
        signOutLink.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('authenticated');
            localStorage.removeItem('username');
            updateUI(false);
        });
    }

    document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();
        // Aquí deberías validar las credenciales antes de establecer el estado de autenticación.
        const username = document.getElementById('username').value;
        localStorage.setItem('username', username);
        localStorage.setItem('authenticated', 'true');
        updateUI(true);
        toggleModal(false);
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) toggleModal(false);
    });

    // Cerrar modal con el botón X
    document.querySelector('.close').addEventListener('click', () => toggleModal(false));

    // Actualizar la UI al cargar
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    updateUI(isAuthenticated);
});

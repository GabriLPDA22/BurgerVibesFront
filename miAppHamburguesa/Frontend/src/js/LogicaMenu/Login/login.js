document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalLogin');
    console.log("Modal:", modal); // Verificar que el modal se captura correctamente

    const loginBtn = document.getElementById('loginBtn');
    const closeButton = document.querySelector('#modalLogin .close');
    console.log("Close button:", closeButton); // Verificar el botón de cierre

    const signOutLink = document.getElementById('signOutLink');
    const userMenu = document.getElementById('userMenu');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const paymentFormContainer = document.getElementById('paymentFormContainer');
    const loginMessageContainer = document.getElementById('loginMessageContainer');
    const loginPromptButton = document.getElementById('loginPromptButton');

    function toggleDisplay(element, show) {
        if (!element) {
            console.error("Attempted to toggle display on undefined element.");
            return; // Prevenir error si el elemento no existe
        }
        element.style.display = show ? 'block' : 'none';
    }

    function toggleModal(show) {
        console.log("Toggle modal called with show:", show); // Depuración para el control del modal
        toggleDisplay(modal, show);
    }

    function updateUI() {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        console.log("Is authenticated:", isAuthenticated); // Depuración del estado de autenticación
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

    loginBtn && loginBtn.addEventListener('click', () => toggleModal(true));
    closeButton && closeButton.addEventListener('click', () => toggleModal(false));
    signOutLink && signOutLink.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('authenticated');
        localStorage.removeItem('username');
        updateUI();
    });

    document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("Form submitted");  // Depuración al enviar el formulario
        const email = document.getElementById('email').value;
        const username = email.split('@')[0];
        localStorage.setItem('username', username);
        localStorage.setItem('authenticated', 'true');
        updateUI();
        console.log("Should close modal now");  // Depuración para el cierre del modal
        toggleModal(false);
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            console.log("Clicked outside the modal"); // Depuración de clics fuera del modal
            toggleModal(false);
        }
    });

    loginPromptButton.addEventListener('click', () => toggleModal(true));

    updateUI(); // Llamar a updateUI directamente al cargar la página
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalLogin');
    const loginBtn = document.getElementById('loginBtn');
    const closeButton = document.querySelector('#modalLogin .close');
    const signOutLink = document.getElementById('signOutLink');
    const userMenu = document.getElementById('userMenu');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const paymentFormContainer = document.getElementById('paymentFormContainer');
    const loginMessageContainer = document.getElementById('loginMessageContainer');
    const loginPromptButton = document.getElementById('loginPromptButton');

    function toggleDisplay(element, show) {
        if (!element) {
            console.error("Attempted to toggle display on undefined element:", element);
            return; // Prevenir error si el elemento no existe
        }
        element.style.display = show ? 'block' : 'none';
    }

    function toggleModal(show) {
        if (modal) {
            console.log("Toggle modal called with show:", show);
            toggleDisplay(modal, show);
        }
    }

    function updateUI() {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        if (isAuthenticated && usernameDisplay) {
            const username = localStorage.getItem('username');
            usernameDisplay.textContent = username;
            toggleDisplay(loginBtn, false);
            toggleDisplay(userMenu, true);
            toggleDisplay(paymentFormContainer, true);
            toggleDisplay(loginMessageContainer, false);
        } else if (usernameDisplay) {
            usernameDisplay.textContent = '';
            toggleDisplay(loginBtn, true);
            toggleDisplay(userMenu, false);
            toggleDisplay(paymentFormContainer, false);
            toggleDisplay(loginMessageContainer, true);
        }
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => toggleModal(true));
    }
    if (closeButton) {
        closeButton.addEventListener('click', () => toggleModal(false));
    }
    if (signOutLink) {
        signOutLink.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('authenticated');
            localStorage.removeItem('username');
            updateUI();
        });
    }

    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const username = email.split('@')[0];
            localStorage.setItem('username', username);
            localStorage.setItem('authenticated', 'true');
            updateUI();
            toggleModal(false);
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            toggleModal(false);
        }
    });

    if (loginPromptButton) {
        loginPromptButton.addEventListener('click', () => toggleModal(true));
    }

    updateUI(); // Llamar a updateUI directamente al cargar la página
});

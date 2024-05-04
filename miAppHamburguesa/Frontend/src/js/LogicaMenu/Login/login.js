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
        element.style.display = show ? 'block' : 'none';
    }

    function toggleModal(show) {
        toggleDisplay(modal, show);
    }

    function updateUI() {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        if (isAuthenticated) {
            const username = localStorage.getItem('username'); // Suponiendo que este valor se guarda durante el registro o inicio de sesión
            usernameDisplay.textContent = username; // Mostrar el nombre de usuario
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
        console.log("Form submitted");  // Agregar para depurar
        const email = document.getElementById('email').value;
        const username = email.split('@')[0];
        localStorage.setItem('username', username);
        localStorage.setItem('authenticated', 'true');
        updateUI();
        console.log("Should close modal now");  // Agregar para depurar
        toggleModal(false);
    });
    

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            toggleModal(false);
        }
    });

    loginPromptButton.addEventListener('click', () => toggleModal(true));

    updateUI(); // Llamar a updateUI directamente al cargar la página
});

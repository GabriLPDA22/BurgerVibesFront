document.addEventListener('DOMContentLoaded', () => {
    const modalLogin = document.getElementById('modalLogin');
    const modalRegister = document.getElementById('modalRegister');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const closeButtons = document.querySelectorAll('.close');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const logoutBtn = document.getElementById('signOutLink');
    const paymentFormContainer = document.getElementById('paymentFormContainer');
    const loginMessageContainer = document.getElementById('loginMessageContainer');
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');

    function toggleModal(modal, show) {
        modal.style.display = show ? 'block' : 'none';
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleModal(modalLogin, true);
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleModal(modalRegister, true);
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleModal(modalLogin, false);
            toggleModal(modalRegister, false);
        });
    });

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const usernameEmail = document.getElementById('loginUsernameEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ usernameEmail, password })
                });

                const responseText = await response.json();
                if (response.ok) {
                    alert('Inicio de sesión exitoso');
                    localStorage.setItem('authenticated', 'true');
                    localStorage.setItem('username', responseText.username);
                    localStorage.setItem('email', responseText.email);
                    toggleModal(modalLogin, false);
                    updateUI();
                } else {
                    alert('Credenciales incorrectas');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al conectar con el servidor');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('authenticated');
            localStorage.removeItem('username');
            updateUI();
        });
    }

    function updateUI() {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        if (isAuthenticated) {
            const username = localStorage.getItem('username');
            usernameDisplay.innerText = username;
            document.getElementById('userMenu').style.display = 'block';
            document.querySelector('.login').style.display = 'none';
            document.querySelector('.register').style.display = 'none';
        } else {
            usernameDisplay.innerText = '';
            document.getElementById('userMenu').style.display = 'none';
            document.querySelector('.login').style.display = 'inline-block';
            document.querySelector('.register').style.display = 'inline-block';
        }
    }

    // Actualizar la interfaz de usuario al cargar la página
    updateUI();
});
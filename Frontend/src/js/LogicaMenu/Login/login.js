/**
 * Este script gestiona la funcionalidad de inicio de sesión, registro y cierre de sesión
 * en una aplicación web. También actualiza la interfaz de usuario en función del estado
 * de autenticación del usuario.
 */

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

    function toggleModal(modal, show) {
        if (modal) {
            modal.style.display = show ? 'block' : 'none';
        }
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

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error('Error en la respuesta del servidor: ' + errorText);
                }

                const responseData = await response.json();
                console.log('Datos del usuario recibidos:', responseData);
                alert('Inicio de sesión exitoso');
                localStorage.setItem('authenticated', 'true');
                localStorage.setItem('username', responseData.username);
                localStorage.setItem('email', responseData.email);
                localStorage.setItem('ID_CLIENTE', responseData.idCliente); // Asegurarse de almacenar `ID_CLIENTE`
                console.log('ID Cliente almacenado en localStorage:', localStorage.getItem('ID_CLIENTE'));
                if (modalLogin) {
                    modalLogin.style.display = 'none';
                }
                updateUI();
            } catch (error) {
                console.error('Error:', error);
                alert('Error al conectar con el servidor: ' + error.message);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('http://localhost:8080/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error('Error en la respuesta del servidor: ' + errorText);
                }

                const responseData = await response.json();
                console.log('Datos del usuario registrados:', responseData);
                alert('Registro exitoso');
                // Almacenar los datos del usuario en localStorage después del registro
                localStorage.setItem('authenticated', 'true');
                localStorage.setItem('username', responseData.username);
                localStorage.setItem('email', responseData.email);
                localStorage.setItem('ID_CLIENTE', responseData.idCliente); // Asegurarse de almacenar `ID_CLIENTE`
                console.log('ID Cliente almacenado en localStorage después del registro:', localStorage.getItem('ID_CLIENTE'));

                if (modalRegister) {
                    modalRegister.style.display = 'none';
                }
                updateUI();
            } catch (error) {
                console.error('Error:', error);
                alert('Error al conectar con el servidor: ' + error.message);
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('authenticated');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('ID_CLIENTE'); // Asegurarse de remover `ID_CLIENTE`
            updateUI();
        });
    }

    function updateUI() {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        if (isAuthenticated) {
            const username = localStorage.getItem('username');
            if (usernameDisplay) {
                usernameDisplay.innerText = username;
            }
            const userMenu = document.getElementById('userMenu');
            if (userMenu) {
                userMenu.style.display = 'block';
            }
            const loginElement = document.querySelector('.login');
            if (loginElement) {
                loginElement.style.display = 'none';
            }
            const registerElement = document.querySelector('.register');
            if (registerElement) {
                registerElement.style.display = 'none';
            }
            if (paymentFormContainer) {
                paymentFormContainer.style.display = 'block';
            }
            if (loginMessageContainer) {
                loginMessageContainer.style.display = 'none';
            }
        } else {
            if (usernameDisplay) {
                usernameDisplay.innerText = '';
            }
            const userMenu = document.getElementById('userMenu');
            if (userMenu) {
                userMenu.style.display = 'none';
            }
            const loginElement = document.querySelector('.login');
            if (loginElement) {
                loginElement.style.display = 'inline-block';
            }
            const registerElement = document.querySelector('.register');
            if (registerElement) {
                registerElement.style.display = 'inline-block';
            }
            if (paymentFormContainer) {
                paymentFormContainer.style.display = 'none';
            }
        }
    }

    updateUI();
});


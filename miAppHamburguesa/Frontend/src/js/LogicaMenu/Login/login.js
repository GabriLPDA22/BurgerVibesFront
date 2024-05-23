/**
 * Este script gestiona la funcionalidad de inicio de sesión, registro y cierre de sesión
 * en una aplicación web. También actualiza la interfaz de usuario en función del estado
 * de autenticación del usuario.
 */

// Espera a que se cargue todo el contenido HTML antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // Selecciona elementos del DOM y los asigna a variables
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

    /**
     * Función para mostrar u ocultar un modal.
     * @param {HTMLElement} modal El elemento modal a mostrar u ocultar.
     * @param {boolean} show Indica si se debe mostrar el modal (true) o ocultarlo (false).
     */
    function toggleModal(modal, show) {
        modal.style.display = show ? 'block' : 'none';
    }

    // Event listener para el botón de inicio de sesión
    if (loginBtn) {
        loginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleModal(modalLogin, true);
        });
    }

    // Event listener para el botón de registro
    if (registerBtn) {
        registerBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleModal(modalRegister, true);
        });
    }

    // Event listeners para los botones de cierre de modal
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleModal(modalLogin, false);
            toggleModal(modalRegister, false);
        });
    });

    // Event listener para el formulario de inicio de sesión
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const usernameEmail = document.getElementById('loginUsernameEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                // Envía una solicitud POST al servidor para el inicio de sesión
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ usernameEmail, password })
                });

                // Si la solicitud no es exitosa, muestra un mensaje de error
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }

                // Si la solicitud es exitosa, obtiene los datos de usuario y actualiza la interfaz
                const responseData = await response.json();
                alert('Inicio de sesión exitoso');
                localStorage.setItem('authenticated', 'true');
                localStorage.setItem('username', responseData.username);
                localStorage.setItem('email', responseData.email);
                localStorage.setItem('idCliente', responseData.idCliente);
                modalLogin.style.display = 'none';
                updateUI();
            } catch (error) {
                console.error('Error:', error);
                alert('Error al conectar con el servidor');
            }
        });
    }

    // Event listener para el formulario de registro
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // Envía una solicitud POST al servidor para el registro
                const response = await fetch('http://localhost:8080/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                // Si la solicitud no es exitosa, muestra un mensaje de error
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }

                // Si la solicitud es exitosa, muestra un mensaje de registro exitoso y oculta el modal de registro
                alert('Registro exitoso');
                modalRegister.style.display = 'none';
            } catch (error) {
                console.error('Error:', error);
                alert('Error al conectar con el servidor');
            }
        });
    }

    // Event listener para el botón de cierre de sesión
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('authenticated');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('idCliente');
            updateUI();
        });
    }

    /**
     * Actualiza la interfaz de usuario según el estado de autenticación.
     */
    function updateUI() {
        // Verifica si el usuario está autenticado
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        if (isAuthenticated) {
            // Si está autenticado, muestra el nombre de usuario y oculta los botones de inicio de sesión y registro
            const username = localStorage.getItem('username');
            usernameDisplay.innerText = username;
            document.getElementById('userMenu').style.display = 'block';
            document.querySelector('.login').style.display = 'none';
            document.querySelector('.register').style.display = 'none';
            paymentFormContainer.style.display = 'block';
            loginMessageContainer.style.display = 'none';
        } else {
            // Si no está autenticado, muestra un mensaje de inicio de sesión y muestra los botones de inicio de sesión y registro
            usernameDisplay.innerText = '';
            document.getElementById('userMenu').style.display = 'none';
            document.querySelector('.login').style.display = 'inline-block';
            document.querySelector('.register').style.display = 'inline-block';
            paymentFormContainer.style.display = 'none';
        }
    }

    // Inicializa la interfaz de usuario
    updateUI();
});
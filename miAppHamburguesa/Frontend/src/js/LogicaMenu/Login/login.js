document.addEventListener('DOMContentLoaded', function () {
    // Selección de elementos del DOM
    var modal = document.getElementById("modalLogin");
    var loginBtn = document.getElementById("loginBtn");
    var closeBtn = document.querySelector(".close");
    var loginMessageContainer = document.getElementById('loginMessageContainer');
    var paymentFormContainer = document.getElementById('paymentFormContainer');

    // Añadir el evento de clic para el botón que muestra el modal de inicio de sesión
    var loginPromptButton = document.getElementById('loginPromptButton');
    if (loginPromptButton) {
        loginPromptButton.addEventListener('click', function () {
            toggleVisibility(true); // Muestra el loginModal
        });
    } else {
        console.error('El botón para acceder no se encontró en el DOM.');
    }

    // Eventos para iniciar sesión
    if (loginBtn) {
        loginBtn.addEventListener('click', function () {
            // Tu lógica para mostrar el modal...
            modal.style.display = 'block';
        });
    } else {
        console.error('El botón de inicio de sesión no se encontró en el DOM');
    }

    // Evento para cerrar el modal haciendo clic en el botón
    closeBtn.addEventListener('click', function () {
        toggleVisibility(false); // Ocultar el modal de inicio de sesión.
    });

    // Evento para cerrar el modal haciendo clic fuera de él
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            toggleVisibility(false); // Ocultar el modal si se hace clic fuera de él.
        }
    });

    // Manejar el envío del formulario de inicio de sesión
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();
        var username = document.getElementById('username').value;
        localStorage.setItem('username', username);
        localStorage.setItem('authenticated', 'true');
        checkAuthentication();
    });

    // Función para cambiar la visibilidad del modal
    function toggleVisibility(showModal) {
        modal.style.display = showModal ? "block" : "none";
    }

    function checkAuthentication() {
        var isAuthenticated = localStorage.getItem('authenticated');
        if (isAuthenticated === 'true') {
            var username = localStorage.getItem('username');
            showUserMenu(username);
        } else {
            hideUserMenu();
        }
    }

    // Función para mostrar el menú de usuario
    function showUserMenu(username) {
        loginBtn.style.display = 'none';
        document.getElementById('userMenu').style.display = 'block';
        document.getElementById('usernameDisplay').textContent = username;
        loginMessageContainer.style.display = 'none';
        paymentFormContainer.style.display = 'block';
    }

    // Función para ocultar el menú de usuario
    function hideUserMenu() {
        loginBtn.style.display = 'block';
        document.getElementById('userMenu').style.display = 'none';
        document.getElementById('usernameDisplay').textContent = '';
        loginMessageContainer.style.display = 'block';
        paymentFormContainer.style.display = 'none';
        modal.style.display = 'none';
    }

    function signOut() {
        localStorage.removeItem('username');
        localStorage.removeItem('authenticated');
        checkAuthentication();
    }

    // Asegúrate de llamar a checkAuthentication cuando el DOM esté cargado.
    document.addEventListener('DOMContentLoaded', function () {
        checkAuthentication();
    });

    // Manejar el envío del formulario de inicio de sesión.
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();
        var username = document.getElementById('username').value;

        // Aquí deberías validar las credenciales antes de establecer el estado de autenticación.
        // Si la validación es exitosa, configura los siguientes items en localStorage:
        localStorage.setItem('username', username);
        localStorage.setItem('authenticated', 'true');

        // Ahora actualiza la UI en consecuencia:
        checkAuthentication();

        // Finalmente, cierra el modal:
        toggleVisibility(false);
    });

    // Evento para cerrar sesión
    var signOutLink = document.getElementById('signOutLink');
    if (signOutLink) {
        signOutLink.addEventListener('click', function (event) {
            event.preventDefault();
            signOut();
        });
    } else {
        console.error('El enlace de cierre de sesión no fue encontrado en el DOM.');
    }
});
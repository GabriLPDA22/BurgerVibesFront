// Esperar a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', (event) => {
  
    // Referencias a elementos del DOM
    const loginBtn = document.getElementById('loginBtn'); // Botón de inicio de sesión
    const loginForm = document.getElementById('loginForm'); // Formulario de inicio de sesión
    const loginModal = document.getElementById('modalLogin'); // Modal de inicio de sesión
    const registerBtn = document.getElementById('registerBtn'); // Botón de registro
    const registerForm = document.getElementById('registerForm'); // Formulario de registro
    const registerModal = document.getElementById('modalRegister'); // Modal de registro
    const spanClose = document.getElementsByClassName('close'); // Elementos para cerrar los modales
    const usernameDisplay = document.getElementById('usernameDisplay'); // Elemento para mostrar el nombre de usuario
    const signOutLink = document.getElementById('signOutLink'); // Enlace para cerrar sesión
  
    // Mostrar el modal de inicio de sesión cuando se hace clic en el botón de login
    loginBtn.onclick = function () {
        loginModal.style.display = "block";
    }
  
    // Mostrar el modal de registro cuando se hace clic en el botón de registro
    registerBtn.onclick = function () {
        registerModal.style.display = "block";
    }
  
    // Cerrar los modales cuando se hace clic en los elementos de cierre
    Array.from(spanClose).forEach(function (span) {
        span.onclick = function () {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    });
  
    // Cerrar los modales si se hace clic fuera de ellos
    window.onclick = function (event) {
        if (event.target == loginModal || event.target == registerModal) {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    }
  
    // Manejar el envío del formulario de inicio de sesión
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        const usernameEmail = document.getElementById('loginUsernameEmail').value;
        const password = document.getElementById('loginPassword').value;
  
        try {
            // Enviar solicitud de inicio de sesión al servidor
            const response = await fetch('http://localhost:8080/BuergerVibes/Controller?ACTION=CLIENTE.LOGIN', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    usernameEmail: usernameEmail,
                    password: password
                })
            });
  
            // Verificar si la respuesta del servidor es exitosa
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
  
            const result = await response.json();
            
            // Mostrar mensaje basado en la respuesta del servidor
            if (result.message) {
                alert(result.message);
            } else {
                alert('Inicio de sesión exitoso');
                console.log('Datos del cliente:', result);
                localStorage.setItem('authenticated', 'true'); // Guardar estado de autenticación
                localStorage.setItem('username', result.NombreUsuario); // Guardar nombre de usuario
                loginModal.style.display = "none"; // Cerrar el modal de inicio de sesión
  
                // Actualizar la interfaz del usuario
                updateUI();
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Ocurrió un error al intentar iniciar sesión.');
        }
    });
  
    // Manejar el envío del formulario de registro
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        const idCliente = new Date().getTime().toString();
        const nombre = document.getElementById('registerNombre').value;
        const direccion = document.getElementById('registerDireccion').value;
        const email = document.getElementById('registerEmail').value;
        const telefono = document.getElementById('registerTelefono').value;
        const fechaRegistro = new Date().toISOString().split('T')[0];
        const nombreUsuario = document.getElementById('registerNombreUsuario').value;
        const contraseña = document.getElementById('registerContraseña').value;
  
        try {
            // Enviar solicitud de registro al servidor
            const response = await fetch('http://localhost:8080/BuergerVibes/Controller?ACTION=CLIENTE.REGISTER', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    idCliente: idCliente,
                    nombre: nombre,
                    direccion: direccion,
                    email: email,
                    telefono: telefono,
                    fechaRegistro: fechaRegistro,
                    contraseña: contraseña,
                    nombreUsuario: nombreUsuario
                })
            });
  
            // Verificar si la respuesta del servidor es exitosa
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
  
            const result = await response.json();
            
            // Mostrar mensaje basado en la respuesta del servidor
            if (result.message) {
                alert(result.message);
            } else {
                alert('Registro exitoso');
                console.log('Datos del nuevo cliente:', result);
                localStorage.setItem('authenticated', 'true'); // Guardar estado de autenticación
                localStorage.setItem('username', result.NombreUsuario); // Guardar nombre de usuario
                registerModal.style.display = "none"; // Cerrar el modal de registro
  
                // Actualizar la interfaz del usuario
                updateUI();
            }
        } catch (error) {
            console.error('Error al registrar el cliente:', error);
            alert('Ocurrió un error al intentar registrar.');
        }
    });
  
    // Manejar el evento de cerrar sesión
    signOutLink.onclick = function () {
        localStorage.removeItem('authenticated'); // Eliminar estado de autenticación
        localStorage.removeItem('username'); // Eliminar nombre de usuario
        updateUI(); // Actualizar la interfaz del usuario
    }
  
    // Función para actualizar la interfaz del usuario según el estado de autenticación
    function updateUI() {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        const usernameDisplay = document.getElementById('usernameDisplay');
        if (isAuthenticated) {
            const username = localStorage.getItem('username');
            if (usernameDisplay) {
                usernameDisplay.innerText = username; // Mostrar nombre de usuario
            }
            const userMenu = document.getElementById('userMenu');
            if (userMenu) {
                userMenu.style.display = 'block'; // Mostrar menú de usuario
            }
            const loginElement = document.getElementById('loginBtn');
            if (loginElement) {
                loginElement.style.display = 'none'; // Ocultar botón de login
            }
            const registerElement = document.getElementById('registerBtn');
            if (registerElement) {
                registerElement.style.display = 'none'; // Ocultar botón de registro
            }
        } else {
            if (usernameDisplay) {
                usernameDisplay.innerText = ''; // Limpiar nombre de usuario
            }
            const userMenu = document.getElementById('userMenu');
            if (userMenu) {
                userMenu.style.display = 'none'; // Ocultar menú de usuario
            }
            const loginElement = document.getElementById('loginBtn');
            if (loginElement) {
                loginElement.style.display = 'inline-block'; // Mostrar botón de login
            }
            const registerElement = document.getElementById('registerBtn');
            if (registerElement) {
                registerElement.style.display = 'inline-block'; // Mostrar botón de registro
            }
        }
    }
  
    // Función para parsear el texto del usuario
    function parseUsuario(texto) {
        const regex = /([\w]+)=([^,]+)/g;
        let match;
        const usuario = {};
        while ((match = regex.exec(texto)) !== null) {
            usuario[match[1]] = match[2].trim();
        }
        return usuario;
    }
  
    // Inicializar la interfaz del usuario
    updateUI();
  });
  
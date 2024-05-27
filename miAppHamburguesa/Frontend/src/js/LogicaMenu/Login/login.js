
    //FUNCINA LOGIN Y REGISTRO
    document.addEventListener('DOMContentLoaded', (event) => {
      const loginBtn = document.getElementById('loginBtn');
      const loginForm = document.getElementById('loginForm');
      const loginModal = document.getElementById('modalLogin');
      const registerBtn = document.getElementById('registerBtn');
      const registerForm = document.getElementById('registerForm');
      const registerModal = document.getElementById('modalRegister');
      const spanClose = document.getElementsByClassName('close');
      const usernameDisplay = document.getElementById('usernameDisplay');
      const signOutLink = document.getElementById('signOutLink');

      loginBtn.onclick = function () {
        loginModal.style.display = "block";
      }

      registerBtn.onclick = function () {
        registerModal.style.display = "block";
      }

      Array.from(spanClose).forEach(function (span) {
        span.onclick = function () {
          loginModal.style.display = 'none';
          registerModal.style.display = 'none';
        }
      });

      window.onclick = function (event) {
        if (event.target == loginModal || event.target == registerModal) {
          loginModal.style.display = 'none';
          registerModal.style.display = 'none';
        }
      }

      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const usernameEmail = document.getElementById('loginUsernameEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
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

          if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
          }

          const result = await response.text();

          if (result.includes('ERROR')) {
            alert('No se pudo iniciar sesión');
          } else {
            alert('Inicio de sesión exitoso');
            console.log('Datos del cliente:', result);
            const usuario = parseUsuario(result);
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('username', usuario.nombreUsuario);
            loginModal.style.display = "none";

            // Aquí actualizamos la interfaz del usuario
            updateUI();
          }
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          alert('Ocurrió un error al intentar iniciar sesión.');
        }
      });

      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const idCliente = new Date().getTime().toString();
        const nombre = document.getElementById('registerNombre').value;
        const direccion = document.getElementById('registerDireccion').value;
        const email = document.getElementById('registerEmail').value;
        const telefono = document.getElementById('registerTelefono').value;
        const fechaRegistro = new Date().toISOString().split('T')[0];
        const nombreUsuario = document.getElementById('registerNombreUsuario').value;
        const contraseña = document.getElementById('registerContraseña').value;

        try {
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
              nombreUsuario: nombreUsuario,
              contraseña: contraseña
            })
          });

          if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
          }

          const result = await response.text();

          if (result.includes('ERROR')) {
            alert('No se pudo registrar el cliente');
          } else {
            alert('Registro exitoso');
            console.log('Datos del nuevo cliente:', result);
            const usuario = parseUsuario(result);
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('username', usuario.nombreUsuario);
            registerModal.style.display = "none";

            // Aquí actualizamos la interfaz del usuario
            updateUI();
          }
        } catch (error) {
          console.error('Error al registrar el cliente:', error);
          alert('Ocurrió un error al intentar registrar.');
        }
      });

      signOutLink.onclick = function () {
        localStorage.removeItem('authenticated');
        localStorage.removeItem('username');
        updateUI();
      }

      function updateUI() {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        const usernameDisplay = document.getElementById('usernameDisplay');
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
        }
      }

      function parseUsuario(texto) {
        const regex = /([\w]+)=([^,]+)/g;
        let match;
        const usuario = {};
        while ((match = regex.exec(texto)) !== null) {
          usuario[match[1]] = match[2].trim();
        }
        return usuario;
      }

      updateUI();
    });







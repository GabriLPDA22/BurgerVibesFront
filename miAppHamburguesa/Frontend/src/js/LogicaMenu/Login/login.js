// Asegúrate de que estas selecciones corresponden correctamente a tu estructura HTML.
var modal2 = document.getElementById("modalLogin");
var loginBtn = document.getElementById("loginBtn");

// Asegúrate de que estás seleccionando el botón de cierre correcto dentro del modal de inicio de sesión.
var closeBtn = modal2.getElementsByClassName("close")[0]; // Cambiado para seleccionar dentro de modal2

loginBtn.onclick = function () {
    modal2.style.display = "block";
}

closeBtn.onclick = function () {
    modal2.style.display = "none";
}

// Este evento necesita asegurarse de que está seleccionando el fondo del modal, no cualquier otro elemento.
window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}

// Función para mostrar el menú del usuario y ocultar el botón de inicio de sesión
function showUserMenu(username) {
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('userMenu').style.display = 'block';
    document.getElementById('usernameDisplay').textContent = username;
    // Guarda el estado de autenticación
    localStorage.setItem('authenticated', 'true');
}

// Manejo del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    showUserMenu(username);
    modal2.style.display = "none";
    checkAuthentication();
});

// Función para manejar el cierre de sesión
function signOut() {
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('userMenu').style.display = 'none';
    // Limpia el estado de autenticación
    localStorage.removeItem('authenticated');
    checkAuthentication();
}

function checkAuthentication() {
    var isAuthenticated = localStorage.getItem('authenticated');
    var loginMessage = document.getElementById('loginMessage');
    var paymentFormContainer = document.getElementById('paymentFormContainer');
    console.log('Authenticated:', isAuthenticated); // Imprime el estado de autenticación
  
    if (isAuthenticated) {
      console.log('User is authenticated, showing payment form, hiding login message.');
      if (paymentFormContainer) paymentFormContainer.style.display = 'block';
      if (loginMessage) loginMessage.style.display = 'none';
    } else {
      console.log('User is not authenticated, hiding payment form, showing login message.');
      if (paymentFormContainer) paymentFormContainer.style.display = 'none';
      if (loginMessage) loginMessage.style.display = 'block';
    }
  }
  

// Asegúrate de llamar a checkAuthentication cuando la página se cargue para establecer el estado inicial correcto
document.addEventListener('DOMContentLoaded', checkAuthentication);





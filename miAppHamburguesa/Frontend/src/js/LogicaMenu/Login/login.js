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
}

// Manejo del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    showUserMenu(username);
    modal2.style.display = "none";
});

// Función para manejar el cierre de sesión
function signOut() {
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('userMenu').style.display = 'none';
}

document.getElementById('dropdownMenuButton').addEventListener('click', function (event) {
    var dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }

    // Previene que el clic se propague y cierre el menú inmediatamente
    event.stopPropagation();
});

// Cierra el menú desplegable si se hace clic fuera de él
window.addEventListener('click', function (event) {
    var dropdownMenu = document.querySelector('.dropdown-menu');
    if (event.target !== dropdownMenu && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});




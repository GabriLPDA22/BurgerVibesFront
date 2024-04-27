// Asegúrate de que estas selecciones correspondan correctamente a tu estructura HTML.
var modal2 = document.getElementById("modalLogin");
var loginBtn = document.getElementById("loginBtn");
var closeBtn = modal2.querySelector(".close");
var loginMessageContainer = document.getElementById('loginMessageContainer'); // ID del contenedor del mensaje
var paymentFormContainer = document.getElementById('paymentFormContainer');

loginBtn.onclick = function () {
    modal2.style.display = "block";
    loginMessageContainer.style.display = "none"; // Oculta el mensaje cuando se muestra el modal
};

closeBtn.onclick = function () {
    modal2.style.display = "none";
};

// Maneja el clic fuera del modal para cerrarlo
window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
};

// Añadimos un evento al botón que abre el modal de inicio de sesión
document.getElementById('loginPromptButton').addEventListener('click', function () {
    modal2.style.display = 'block';
    loginMessageContainer.style.display = "none"; // Oculta el mensaje cuando se muestra el modal
});

// También debes asegurarte de que el evento que cierra el modal funcione correctamente
closeBtn.addEventListener('click', function () {
    modal2.style.display = 'none';
});

// Y manejar clics fuera del modal para cerrarlo
window.addEventListener('click', function (event) {
    if (event.target == modal2) {
        modal2.style.display = 'none';
    }
});

// Funciones para manejar la visibilidad de los elementos de la UI
function showUserMenu(username) {
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('userMenu').style.display = 'block';
    document.getElementById('usernameDisplay').textContent = username;
    document.getElementById('loginMessageContainer').style.display = 'none';
    document.getElementById('paymentFormContainer').style.display = 'block';
}

function hideUserMenu() {
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('userMenu').style.display = 'none';
    document.getElementById('usernameDisplay').textContent = '';
    document.getElementById('loginMessageContainer').style.display = 'block';
    document.getElementById('paymentFormContainer').style.display = 'none';
}

function signOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('authenticated');
    hideUserMenu();
}

function checkAuthentication() {
    var isAuthenticated = localStorage.getItem('authenticated');
    if (isAuthenticated) {
        var username = localStorage.getItem('username');
        showUserMenu(username);
    } else {
        hideUserMenu();
    }
}

// Eventos para el manejo de la lógica de inicio de sesión
document.addEventListener('DOMContentLoaded', checkAuthentication);

// Asegúrate de que el botón en el mensaje de login tenga un ID 'loginPromptButton'
document.getElementById('loginPromptButton').addEventListener('click', function () {
    modal2.style.display = 'block';
    loginMessageContainer.style.display = "none";
});

// Asegúrate de que el botón de desconectar en tu menú desplegable llame a esta función
document.getElementById('dropdownMenuButton').addEventListener('click', signOut); // Modifica el ID según corresponda

// Obtener el elemento del mensaje de cookies del DOM
const msgCookies = document.getElementById('cookies-msg');

/**
 * Función para aceptar las cookies.
 * Oculta el mensaje de cookies y establece una cookie para recordar la elección del usuario.
 */
function aceptar() {
    // Remover la clase 'mostrar' y añadir la clase 'ocultar' para ocultar el mensaje
    msgCookies.classList.remove('mostrar');
    msgCookies.classList.add('ocultar');

    // Establecer una cookie para recordar la elección del usuario
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1); // Establecer la expiración para 1 mes en el futuro
    document.cookie = "cookiesAccepted=yes; expires=" + expiryDate.toUTCString() + "; path=/";
}

/**
 * Función para rechazar las cookies.
 * Oculta el mensaje de cookies.
 */
function rechazar() {
    // Remover la clase 'mostrar' y añadir la clase 'ocultar' para ocultar el mensaje
    msgCookies.classList.remove('mostrar');
    msgCookies.classList.add('ocultar');
}

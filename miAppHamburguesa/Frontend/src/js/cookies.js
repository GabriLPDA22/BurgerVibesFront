
const msgCookies = document.getElementById('cookies-msg');

function aceptar(){
    msgCookies.classList.remove('mostrar');
    msgCookies.classList.add('ocultar');

    /* Establecer una cookie para recordar la elección del usuario*/
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1); // Establecer la expiración para 1 mes en el futuro
    document.cookie = "cookiesAccepted=yes; expires=" + expiryDate.toUTCString() + "; path=/";
}


function rechazar() {
    msgCookies.classList.remove('mostrar');
    msgCookies.classList.add('ocultar');
}
  


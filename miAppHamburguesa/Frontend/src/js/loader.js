// Evento que se ejecuta cuando la ventana está completamente cargada
window.addEventListener('load', function() {
    // Obtener el elemento del loader del DOM
    const loaderWrapper = document.getElementById('burger-loader-wrapper');

    // Se asegura de que el loader se oculte de forma suave
    loaderWrapper.style.opacity = '0'; // Cambia la opacidad a 0 para iniciar la transición de desvanecimiento
    loaderWrapper.style.transition = 'opacity 0.5s ease-in-out'; // Establece la transición para la opacidad

    // Agrega un pequeño retraso para permitir la transición de desvanecimiento
    setTimeout(function() {
        loaderWrapper.style.display = 'none'; // Oculta el loader completamente después de la transición
    }, 500); // El retraso coincide con la duración de la transición de 0.5s
});

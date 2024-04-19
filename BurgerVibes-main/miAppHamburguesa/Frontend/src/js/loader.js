window.addEventListener('load', function() {
    var loaderWrapper = document.getElementById('burger-loader-wrapper');
    // Se asegura de que el loader se oculte de forma suave
    loaderWrapper.style.opacity = '0';
    loaderWrapper.style.transition = 'opacity 0.5s ease-in-out';
    // Agrega un pequeño retraso para permitir la transición de desvanecimiento
    setTimeout(function() {
        loaderWrapper.style.display = 'none';
    }, 500);
});




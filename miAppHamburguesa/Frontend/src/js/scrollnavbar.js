// Esperar a que el DOM esté cargado completamente
document.addEventListener('DOMContentLoaded', function() {
  var navbarToggler = document.querySelector('.navbar-toggler');
  var navbarNav = document.querySelector('.navbar-nav');
  var customModalClose = document.getElementById('customModalClose');

  // Evento para abrir el menú
  navbarToggler.addEventListener('click', function() {
      navbarNav.classList.add('open');
  });

  // Evento para cerrar el menú
  customModalClose.addEventListener('click', function() {
      navbarNav.classList.remove('open');
  });
});

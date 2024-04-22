document.addEventListener('DOMContentLoaded', function() {
  var navbarToggler = document.querySelector('.navbar-toggler');
  var navbarNav = document.querySelector('.navbar-nav');
  var navLinks = document.querySelectorAll('.nav-link'); // Selecciona todos los enlaces de navegación
  var customModalClose = document.getElementById('customModalClose');

  // Evento para abrir el menú
  navbarToggler.addEventListener('click', function() {
      navbarNav.classList.add('open');
  });

  // Evento para cerrar el menú al hacer clic en el botón de cierre
  customModalClose.addEventListener('click', function() {
      navbarNav.classList.remove('open');
  });

  // Evento para cerrar el menú al hacer clic en un enlace
  navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
          navbarNav.classList.remove('open');
      });
  });
});

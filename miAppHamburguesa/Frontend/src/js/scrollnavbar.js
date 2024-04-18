document.addEventListener('DOMContentLoaded', function () {
  var navbarToggler = document.querySelector('.navbar-toggler');
  var navbarNav = document.querySelector('.navbar-nav');
  var closeButton = document.querySelector('.close-btn');
  var body = document.body;

  navbarToggler.addEventListener('click', function () {
    navbarNav.classList.add('responsive');
    body.classList.add('body-fixed'); // Añade la clase al body para impedir el desplazamiento
  });

  closeButton.addEventListener('click', function() {
    navbarNav.classList.remove('responsive');
    body.classList.remove('body-fixed'); // Quita la clase del body para permitir el desplazamiento
  });
});

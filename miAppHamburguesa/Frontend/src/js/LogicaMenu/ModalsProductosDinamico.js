// Encuentra todos los elementos con la clase .menu-item y agrega un evento click a cada uno
document.querySelectorAll('.menu-item').forEach(function(item) {
  item.addEventListener('click', function() {
    // Recupera la información del producto desde los atributos data-
    const productName = this.getAttribute('data-product-name');
    const productPrice = this.getAttribute('data-product-price');
    const productDescription = this.getAttribute('data-product-description');
    const productAllergens = this.getAttribute('data-product-allergens');
    const productImages = []; // Array para almacenar las rutas de las imágenes del producto
    
    // Agrega todas las imágenes disponibles a la lista de imágenes del producto
    for (let i = 1; ; i++) {
      const productImage = this.getAttribute(`data-product-image${i}`);
      if (!productImage) break; // Si no hay más imágenes, sal del bucle
      productImages.push(productImage);
    }
    
    // Encuentra los elementos en el modal y actualiza su contenido
    const modal = document.getElementById('productModal');
    const modalImage = modal.querySelector('.modal-image');
    
    // Establece la fuente de la imagen principal del producto
    if (productImages.length > 0) {
      modalImage.src = productImages[0]; // Mostrar la primera imagen por defecto
    } else {
      // Si no hay imágenes disponibles, mostrar una imagen por defecto o dejarla vacía
      modalImage.src = '/ruta/a/imagen_por_defecto.jpg'; // Ruta de imagen por defecto
    }
    
    // Muestra el modal
    modal.querySelector('h2').textContent = productName;
    modal.querySelector('#descripcion').textContent = productDescription;
    modal.querySelector('#alegernos').textContent = productAllergens;
    modal.querySelector('.add-to-cart-btn').textContent = `Añadir a las notas - ${productPrice} €`;
    modal.style.display = 'block';
  });
});





// Cierra el modal cuando se haga click en el botón cerrar (X)
document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('productModal').style.display = 'none';
});


// Cierra el modal cuando se haga click fuera de él
window.addEventListener('click', function(event) {
  const modal = document.getElementById('productModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});



// Asegúrate de que el DOM está cargado antes de asignar los manejadores de eventos
document.addEventListener('DOMContentLoaded', function() {
  // Actualizar la cantidad
  document.querySelectorAll('.quantity-control button').forEach(function(button) {
    button.addEventListener('click', function() {
      var input = this.parentElement.querySelector('input');
      var currentValue = parseInt(input.value);
      var change = this.classList.contains('plus-btn') ? 1 : -1; // Si el botón tiene la clase 'plus-btn', suma 1, si no resta 1
      var newValue = currentValue + change;
      input.value = newValue > 0 ? newValue : 1; // Asegúrate de que no se vayan a valores negativos
    });
  });

  // Añadir al carrito
  document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
    var quantity = parseInt(document.querySelector('.quantity-control input').value);
    // ... lógica para añadir al carrito ...
  });
});
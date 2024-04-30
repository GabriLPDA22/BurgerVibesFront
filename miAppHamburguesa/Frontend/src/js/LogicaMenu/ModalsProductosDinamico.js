const modal = document.getElementById('productModal');
const orderToggleButton = document.querySelector('.order-toggle-button'); // Asegúrate de que el selector sea correcto
let carrito = [];
let currentProductPrice = 0; // Variable global para almacenar el precio del producto actual

function actualizarPrecioTotal(productPrice, cantidad) {
  const span = document.querySelector('.add-to-cart-btn > span');
  const precioTotal = (cantidad * productPrice).toFixed(2);
  span.textContent = `Añadir al carrito - ${precioTotal} €`;
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.menu-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const productAttributes = {
        name: this.getAttribute('data-product-name'),
        price: parseFloat(this.getAttribute('data-product-price')),
        description: this.getAttribute('data-product-description'),
        allergens: this.getAttribute('data-product-allergens'),
        images: []
      };

      for (let i = 1; i <= 10; i++) {
        let image = this.getAttribute(`data-product-image${i}`);
        if (image) {
          productAttributes.images.push(image);
        }
      }

      // Actualización del modal con los datos del producto
      modal.querySelector('.modal-image').src = productAttributes.images[0] || 'ruta predeterminada si no hay imagen';
      modal.querySelector('h2').textContent = productAttributes.name;
      modal.querySelector('#descripcion').textContent = productAttributes.description;
      modal.querySelector('#alegernos').textContent = productAttributes.allergens;
      document.getElementById('quantity').value = 1;

      currentProductPrice = productAttributes.price; // Establecer precio actual
      actualizarPrecioTotal(currentProductPrice, 1);

      // Actualizar imágenes de alérgenos
      ['allergenImage1', 'allergenImage2', 'allergenImage3', 'allergenImage4', 'allergenImage5', 'allergenImage6', 'allergenImage7', 'allergenImage8', 'allergenImage9'].forEach((id, index) => {
        const allergenImage = modal.querySelector(`#${id}`);
        allergenImage.style.display = productAttributes.images[index + 1] ? 'inline-block' : 'none';
        if (productAttributes.images[index + 1]) {
          allergenImage.src = productAttributes.images[index + 1];
        }
      });

      // Ocultar el botón de revisar pedido
      orderToggleButton.style.display = 'none';

      modal.style.display = 'block';
    });
  });

  modal.querySelector('.add-to-cart-btn').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('quantity').value);
    carrito.push({
      nombre: modal.querySelector('h2').textContent,
      cantidad: cantidad,
      precioUnitario: currentProductPrice,
      precioTotal: (cantidad * currentProductPrice).toFixed(2)
    });
    console.log(carrito);
    closeModal(); // Llamada a la función que cierra el modal y muestra el botón
  });

  function closeModal() {
    modal.style.display = 'none';
    
    // Verifica si el ancho de la pantalla es de 430px o menos
    if (window.matchMedia("(max-width: 430px)").matches) {
        orderToggleButton.style.display = 'flex';
        orderToggleButton.style.justifyContent = 'center'; // Asegura centrado horizontal
        orderToggleButton.style.alignItems = 'center'; // Asegura centrado vertical
    } else {
        // Para pantallas más grandes, ajusta según sea necesario
        orderToggleButton.style.display = 'none'; // O cualquier otro estilo necesario para pantallas grandes
    }
}



  // Event listener para el botón de cierre del modal
  modal.querySelector('.close').addEventListener('click', () => {
    closeModal();
  });
  // Event listener para cerrar el modal haciendo clic fuera de él
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      closeModal();
    }
  });

  modal.querySelector('.add-to-cart-btn').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('quantity').value);
    carrito.push({
      nombre: modal.querySelector('h2').textContent,
      cantidad: cantidad,
      precioUnitario: currentProductPrice,
      precioTotal: (cantidad * currentProductPrice).toFixed(2)
    });
    console.log(carrito);
    modal.style.display = 'none';
  });

  document.querySelectorAll('.quantity-control button').forEach(button => {
    button.addEventListener('click', () => {
      const quantityInput = document.getElementById('quantity');
      let cantidadActual = parseInt(quantityInput.value);
      cantidadActual = (button.classList.contains('minus-btn') && cantidadActual > 1) ? cantidadActual - 1 : cantidadActual + 1;
      quantityInput.value = cantidadActual;
      actualizarPrecioTotal(currentProductPrice, cantidadActual);
    });
  });
});
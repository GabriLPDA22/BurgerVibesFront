// Referencia al modal de producto
const modal = document.getElementById('productModal');
// Referencia al botón de alternar pedido
const orderToggleButton = document.querySelector('.order-toggle-button');
// Array para almacenar los productos añadidos al carrito
let carrito = [];
// Variable global para almacenar el precio del producto actual
let currentProductPrice = 0;

/**
 * Función para actualizar el precio total en el modal según la cantidad seleccionada.
 * @param {number} productPrice - El precio unitario del producto.
 * @param {number} cantidad - La cantidad del producto.
 */
function actualizarPrecioTotal(productPrice, cantidad) {
  const span = document.querySelector('.add-to-cart-btn > span');
  const precioTotal = (cantidad * productPrice).toFixed(2);
  span.textContent = `Añadir al carrito - ${precioTotal} €`;
}

// Esperar a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function () {
  
  // Añadir eventos de clic a cada elemento del menú
  document.querySelectorAll('.menu-item').forEach(function (item) {
    item.addEventListener('click', function () {
      // Recoger atributos del producto desde el elemento del menú
      const productAttributes = {
        name: this.getAttribute('data-product-name'),
        price: parseFloat(this.getAttribute('data-product-price')),
        description: this.getAttribute('data-product-description'),
        allergens: this.getAttribute('data-product-allergens'),
        images: []
      };

      // Recoger imágenes del producto
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

      // Establecer el precio actual del producto
      currentProductPrice = productAttributes.price;
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

      // Mostrar el modal
      modal.style.display = 'block';
    });
  });

  // Añadir producto al carrito cuando se hace clic en el botón de añadir al carrito
  modal.querySelector('.add-to-cart-btn').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('quantity').value);
    carrito.push({
      nombre: modal.querySelector('h2').textContent,
      cantidad: cantidad,
      precioUnitario: currentProductPrice,
      precioTotal: (cantidad * currentProductPrice).toFixed(2)
    });
    console.log(carrito);
    closeModal(); // Cerrar el modal y mostrar el botón de alternar pedido si es necesario
  });

  /**
   * Función para cerrar el modal de producto.
   * Muestra el botón de alternar pedido si el ancho de la pantalla es de 430px o menos.
   */
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

  // Añadir eventos a los botones de control de cantidad
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

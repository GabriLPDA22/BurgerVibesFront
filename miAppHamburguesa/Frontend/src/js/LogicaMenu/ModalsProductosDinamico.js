const modal = document.getElementById('productModal');
let carrito = [];

// Función para actualizar el precio total mostrado en el botón "Añadir al carrito"
function actualizarPrecioTotal(productPrice, cantidad) {
  const span = document.querySelector('.add-to-cart-btn span');
  if (!span) {
    console.error('El elemento span no se encontró en el DOM');
    return;
  }
  const precioTotal = (cantidad * productPrice).toFixed(2);
  span.textContent = `Añadir al carrito - ${precioTotal} €`;
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.menu-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const productName = this.getAttribute('data-product-name');
      const productPriceString = this.getAttribute('data-product-price');
      const productPrice = parseFloat(productPriceString);
      const productDescription = this.getAttribute('data-product-description');
      const productAllergens = this.getAttribute('data-product-allergens');
      const productImages = [];

      for (let i = 1; i <= 4; i++) {
        const productImage = this.getAttribute(`data-product-image${i}`);
        if (productImage) {
          productImages.push(productImage);
        }
      }

      modal.querySelector('.modal-image').src = productImages.length > 0 ? productImages[0] : '/ruta/a/imagen_por_defecto.jpg';
      modal.querySelector('h2').textContent = productName;
      modal.querySelector('#descripcion').textContent = productDescription;
      modal.querySelector('#alegernos').textContent = productAllergens;
      document.getElementById('quantity').value = 1;

      actualizarPrecioTotal(productPrice, 1); // Pasa la cantidad como argumento
      ['allergenImage1', 'allergenImage2', 'allergenImage3'].forEach((id, index) => {
        const allergenImage = modal.querySelector(`#${id}`);
        if (allergenImage) {
          if (productImages[index + 1]) {
            allergenImage.src = productImages[index + 1];
            allergenImage.style.display = 'inline-block';
          } else {
            allergenImage.style.display = 'none';
          }
        }
      });

      modal.style.display = 'block';
    });
  });

  // Agrega el event listener para cerrar el modal
  modal.querySelector('.close').addEventListener('click', function () {
    modal.style.display = 'none';
  });

  // Agregar el event listener para el botón "Añadir al carrito"
  modal.querySelector('.add-to-cart-btn').addEventListener('click', function () {
    const productName = modal.querySelector('h2').textContent;
    const cantidad = parseInt(document.getElementById('quantity').value);
    const productPrice = parseFloat(this.getAttribute('data-product-price'));
    const precioTotal = (cantidad * productPrice).toFixed(2);

    carrito.push({
      nombre: productName,
      cantidad: cantidad,
      precioUnitario: productPrice,
      precioTotal: precioTotal
    });

    console.log(carrito); // Para depuración
    modal.style.display = 'none';
  });
});

window.addEventListener('click', function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

let currentProductPrice = 0; // Variable global para almacenar el precio del producto actual

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.menu-item').forEach(function (item) {
    item.addEventListener('click', function () {
      // Obtener el precio del producto actual
      currentProductPrice = parseFloat(this.getAttribute('data-product-price'));
      // Resto del código para actualizar la información del modal y mostrarlo...
    });
  });
});

// Eventos para los botones de incrementar y decrementar la cantidad
document.querySelectorAll('.quantity-control button').forEach(button => {
  button.addEventListener('click', function () {
    const quantityInput = document.getElementById('quantity');
    let cantidadActual = parseInt(quantityInput.value);

    console.log('Antes del clic:', cantidadActual); // Para depuración

    if (this.classList.contains('minus-btn') && cantidadActual > 1) {
      cantidadActual -= 1;
    } else if (this.classList.contains('plus-btn')) {
      cantidadActual += 1;
    }

    console.log('Después del clic:', cantidadActual); // Para depuración

    quantityInput.value = cantidadActual;
    actualizarPrecioTotal(currentProductPrice, cantidadActual); // Pasar el precio del producto actual
  });
});

/**
 * CARRITO
 */

// Obtener el botón "Añadir al carrito"
document.addEventListener('DOMContentLoaded', function() {
  // Obtener los botones "Añadir al carrito"
  var addToCartButtons = document.querySelectorAll('.add-button');

  // Iterar sobre cada botón y agregar un controlador de eventos
  addToCartButtons.forEach(function(button) {
      button.addEventListener('click', function() {
          // Obtener la información del producto
          var product = this.closest('.menu-item');
          var productName = product.dataset.productName;
          var productPrice = parseFloat(product.dataset.productPrice);

          // Verificar si el precio es un número válido
          if (!isNaN(productPrice)) {
              // Crear un nuevo elemento de pedido
              var orderItem = document.createElement('div');
              orderItem.classList.add('order-item');
              orderItem.innerHTML = `
                  <span>${productName}</span>
                  <button class="remove-btn">Eliminar</button>
              `;

              // Agregar el elemento de pedido al contenedor de elementos del pedido
              var orderItemsContainer = document.querySelector('.order-items');
              orderItemsContainer.appendChild(orderItem);

              // Mostrar el contenedor de elementos del pedido y ocultar el mensaje de pedido vacío
              var orderEmptyMessage = document.querySelector('.order-empty');
              orderEmptyMessage.style.display = 'none';
              orderItemsContainer.style.display = 'block';

              // Calcular y mostrar el precio total del pedido
              var totalAmountElement = document.querySelector('.total-amount');
              var currentTotal = parseFloat(totalAmountElement.textContent.replace(' €', ''));
              var newTotal = currentTotal + productPrice;
              totalAmountElement.textContent = newTotal.toFixed(2) + ' €';
              document.querySelector('.order-total').style.display = 'block';
          } else {
              console.error('El precio del producto no es un número válido:', productPrice);
          }
      });
  });
});












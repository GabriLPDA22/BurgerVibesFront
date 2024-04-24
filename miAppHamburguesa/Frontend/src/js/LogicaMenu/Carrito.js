function addToCart(productName, productPrice, quantity) {
    // Crear y añadir el elemento del producto al carrito
    var orderItem = document.createElement('div');
    orderItem.classList.add('order-item');
    orderItem.innerHTML = `
      <span class="product-name">${productName}</span>
      <div class="product-quantity">
        <button class="minus-btn">-</button>
        <input type="number" value="${quantity}" readonly>
        <button class="plus-btn">+</button>
      </div>
      <span class="product-price">${(productPrice * quantity).toFixed(2)} €</span>
      <button class="remove-btn">Eliminar</button>
    `;
  
    var orderItemsContainer = document.querySelector('.order-items');
    orderItemsContainer.appendChild(orderItem);
    orderItemsContainer.style.display = 'block'; // Asegúrate de que el contenedor se muestra
  
    // Ocultar el mensaje de "pedido vacío" y mostrar el total
    document.querySelector('.order-empty').style.display = 'none';
    document.querySelector('.order-total').style.display = 'block'; // Asegúrate de que el total se muestra
  
    // Actualizar el total
    var totalAmountElement = document.querySelector('.total-amount');
    var currentTotal = parseFloat(totalAmountElement.textContent.replace('€', '').replace(',', '.') || '0');
    totalAmountElement.textContent = (currentTotal + (productPrice * quantity)).toFixed(2).replace('.', ',') + ' €';

    // Actualizar la interfaz del carrito
    updateCartInterface();
}

  






/*PARTE DE VISUALIZADO DEL TOTAL DE CARRITO*/

// Función para actualizar la interfaz del carrito
function updateCartInterface() {
    var totalAmountElement = document.querySelector('.total-amount');
    var orderTotalDiv = document.querySelector('.order-total');
    var orderFooterDiv = document.querySelector('.order-footer');
    var confirmOrderButton = document.querySelector('#confirm-order-btn');
  
    var currentTotal = parseFloat(totalAmountElement.textContent.replace('€', '').trim());
    if (currentTotal > 0) {
        orderTotalDiv.style.display = 'block'; // Muestra el total
        orderFooterDiv.style.display = 'block'; // Muestra el botón de confirmación
        if (currentTotal >= 16) {
            confirmOrderButton.disabled = false; // Habilita el botón si se alcanza el pedido mínimo
        } else {
            confirmOrderButton.disabled = true; // Mantiene el botón deshabilitado si no se alcanza
        }
    } else {
        orderTotalDiv.style.display = 'none'; // Oculta el total si el carrito está vacío
        orderFooterDiv.style.display = 'none'; // Oculta el botón de confirmación
    }
}

function addToCart(productName, productPrice, quantity) {
    // Depuración para verificar la cantidad y el precio recibidos
    console.log('Añadiendo al carrito:', productName, 'Precio unitario:', productPrice, 'Cantidad:', quantity);

    var existingItem = Array.from(document.querySelectorAll('.order-item'))
        .find(item => item.querySelector('.product-name').textContent === productName);

    if (existingItem) {
        // Producto ya existe, actualiza cantidad y precio
        var input = existingItem.querySelector('.product-quantity input[type=number]');
        var currentQuantity = parseInt(input.value);
        var newQuantity = currentQuantity + quantity;
        var priceDifference = productPrice * (newQuantity - currentQuantity);

        console.log('Producto ya en carrito. Cantidad actual:', currentQuantity, 'Nueva cantidad:', newQuantity, 'Diferencia de precio:', priceDifference);

        input.value = newQuantity;
        existingItem.querySelector('.product-price').textContent = (productPrice * newQuantity).toFixed(2) + ' €';
        updateTotal(priceDifference);
    } else {
        // Producto no existe, añade nuevo al carrito
        console.log('Producto nuevo en carrito. Total a añadir:', productPrice * quantity);

        var orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <span class="product-name">${productName}</span>
            <div class="product-quantity">
                <button class="minus-btn" onclick="updateQuantity(this, -1, ${productPrice})">-</button>
                <input type="number" value="${quantity}" readonly>
                <button class="plus-btn" onclick="updateQuantity(this, 1, ${productPrice})">+</button>
            </div>
            <span class="product-price">${(productPrice * quantity).toFixed(2)} €</span>
            <button class="remove-btn" onclick="removeItem(this)">Eliminar</button>
        `;
        document.querySelector('.order-items').appendChild(orderItem);
        updateTotal(productPrice * quantity);
    }

    // Almacena el estado del carrito en localStorage para que persista entre páginas
    updateLocalStorage();
}

function updateQuantity(button, change, productPrice) {
    // Obtener el input de cantidad asociado al botón
    var input = button.parentNode.querySelector('input[type="number"]');
    
    // Obtener el valor actual de la cantidad
    var currentQuantity = parseInt(input.value);
    
    // Actualizar la cantidad con el cambio especificado
    var newQuantity = currentQuantity + change;
    
    // Verificar si la nueva cantidad es válida (mayor que 0)
    if (newQuantity >= 0) {
        // Actualizar el valor del input de cantidad
        input.value = newQuantity;

        // Calcular el cambio en el precio total del producto
        var priceDifference = productPrice * change;

        // Obtener el elemento que muestra el precio total del producto
        var productPriceElement = button.parentNode.nextElementSibling;

        // Obtener el precio total actual del producto
        var currentProductPrice = parseFloat(productPriceElement.textContent);

        // Calcular el nuevo precio total del producto
        var newProductPrice = currentProductPrice + priceDifference;

        // Actualizar el precio total del producto mostrado
        productPriceElement.textContent = newProductPrice.toFixed(2) + ' €';

        // Actualizar el precio total del carrito
        updateTotal(priceDifference);
    } else {
        // Si la nueva cantidad es menor que 0, no hacer nada
        // o mostrar un mensaje de error si es necesario
        console.log('No se puede reducir la cantidad por debajo de 0.');
    }
}


function removeItem(button) {
    // Obtener el elemento del producto asociado al botón
    var productItem = button.parentNode;
    
    // Obtener el precio total del producto a eliminar
    var productPrice = parseFloat(productItem.querySelector('.product-price').textContent);
    
    // Eliminar el elemento del producto del DOM
    productItem.parentNode.removeChild(productItem);
    
    // Calcular el cambio en el precio total del carrito
    var priceDifference = -productPrice;

    // Actualizar el precio total del carrito
    updateTotal(priceDifference);

    // Actualizar el estado del carrito en localStorage para que persista entre páginas
    updateLocalStorage();
}


function updateTotal(change) {
    var totalAmountElement = document.querySelector('.total-amount');
    var currentTotal = parseFloat(totalAmountElement.textContent.replace('€', '').trim());
    var newTotal = currentTotal + change;
    totalAmountElement.textContent = newTotal.toFixed(2) + ' €';

    updateLocalStorage(); // Actualiza el localStorage al modificar el total del carrito

    updateCartInterface();
}

function updateLocalStorage() {
    // Recolectar todos los items del carrito desde el DOM
    var items = Array.from(document.querySelectorAll('.order-item')).map(item => ({
        name: item.querySelector('.product-name').textContent,
        quantity: parseInt(item.querySelector('.product-quantity input[type=number]').value),
        price: parseFloat(item.querySelector('.product-price').textContent.replace('€', '').trim())
    }));

    // Calcular el total del carrito basado en los precios y cantidades
    var total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Guardar en localStorage el estado actual del carrito
    localStorage.setItem('carrito', JSON.stringify({items: items, total: total.toFixed(2)}));
}


function updateCartInterface() {
    var totalAmountElement = document.querySelector('.total-amount');
    var currentTotal = parseFloat(totalAmountElement.textContent.replace('€', '').replace(',', '.'));
    var minimumNotice = document.querySelector('#minimum-order-notice');
    var confirmOrderButton = document.querySelector('#confirm-order-btn');

    if (currentTotal >= 16) {
        confirmOrderButton.disabled = false;
        minimumNotice.style.display = 'none';
    } else {
        confirmOrderButton.disabled = true;
        minimumNotice.style.display = 'block';
    }

    if (currentTotal > 0) {
        document.querySelector('.order-empty').style.display = 'none';
        document.querySelector('.order-total').style.display = 'block';
    } else {
        document.querySelector('.order-empty').style.display = 'block';
        document.querySelector('.order-total').style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Código para cargar la información en el modal y actualizar el precio en el botón
    var productCards = document.querySelectorAll('.menu-item');
    productCards.forEach(function(card) {
        card.addEventListener('click', function() {
            var productName = this.getAttribute('data-product-name');
            var productPrice = this.getAttribute('data-product-price');
            // Actualiza la información del modal aquí
            var modal = document.getElementById('productModal');
            modal.querySelector('#productModalTitle').textContent = productName;
            modal.querySelector('.price-span').textContent = productPrice + ' €';
            // Más actualizaciones al modal según sea necesario
        });
    });

    // Código para manejar el evento de añadir al carrito
    var addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var modal = this.closest('.modal-content');
            var productName = modal.querySelector('#productModalTitle').textContent;
            var productPriceText = modal.querySelector('.price-span').textContent;
            var priceMatches = productPriceText.match(/(\d+([.,]\d+)?)\s*€/);

            if (priceMatches && priceMatches.length > 1) {
                // Extraemos el precio y reemplazamos las comas por puntos en caso de que haya decimales.
                var productPrice = parseFloat(priceMatches[1].replace(',', '.'));
                var quantity = parseInt(modal.querySelector('#quantity').value);
                addToCart(productName, productPrice, quantity);
            } else {
                console.error('No se pudo extraer el precio del producto');
            }
        });
    });
});
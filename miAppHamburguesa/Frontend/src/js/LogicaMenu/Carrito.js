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
}

function removeItem(button) {
    var orderItem = button.parentNode;
    var priceElement = orderItem.querySelector('.product-price');
    var price = parseFloat(priceElement.textContent.replace('€', '').trim());
    document.querySelector('.order-items').removeChild(orderItem);
    updateTotal(-price);
}

function updateQuantity(button, change, pricePerUnit) {
    var input = button.parentNode.querySelector('input[type=number]');
    var currentQuantity = parseInt(input.value);
    var newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
        input.value = newQuantity;
        var totalPrice = (pricePerUnit * newQuantity).toFixed(2);
        button.parentNode.nextElementSibling.textContent = totalPrice + ' €';
        updateTotal(change * pricePerUnit);
    }
}

function updateTotal(change) {
    var totalAmountElement = document.querySelector('.total-amount');
    var currentTotal = parseFloat(totalAmountElement.textContent.replace('€', '').trim());
    console.log('Current Total:', currentTotal, 'Change:', change); // Añadido para depuración
    var newTotal = currentTotal + change;
    totalAmountElement.textContent = newTotal.toFixed(2) + ' €';

    updateCartInterface();
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




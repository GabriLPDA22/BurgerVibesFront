function addToCart(productName, productPrice, quantity) {
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
        <button class="remove-btn" onclick="removeItem(this, ${productPrice * quantity})">Eliminar</button>
    `;

    document.querySelector('.order-items').appendChild(orderItem);
    updateTotal(productPrice * quantity);
}

function removeItem(button, price) {
    var orderItem = button.parentNode;
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
    var currentTotal = parseFloat(totalAmountElement.textContent.replace('€', '').replace(',', '.'));
    var newTotal = (currentTotal + change).toFixed(2);

    totalAmountElement.textContent = newTotal.replace('.', ',') + ' €';
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
    var addToCartButtons = document.getElementsByClassName('add-to-cart-btn');
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener('click', function() {
            var product = this.closest('.modal-content');
            var productName = product.querySelector('#productModalTitle').textContent;
            var productPrice = parseFloat(product.querySelector('.add-to-cart-btn').textContent.split('-')[1].trim());
            var quantity = parseInt(product.querySelector('#quantity').value);
            addToCart(productName, productPrice, quantity);
        });
    }
});



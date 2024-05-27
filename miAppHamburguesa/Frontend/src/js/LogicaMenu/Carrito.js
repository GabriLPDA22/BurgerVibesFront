function addToCart(productName, productPrice, quantity) {
    console.log('Añadiendo al carrito:', productName, quantity, '@', productPrice);

    const customerName = localStorage.getItem('username');

    var existingItem = Array.from(document.querySelectorAll('.order-item'))
        .find(item => item.querySelector('.product-name').textContent === productName);

    if (existingItem) {
        var input = existingItem.querySelector('.product-quantity input[type=number]');
        var currentQuantity = parseInt(input.value);
        var newQuantity = currentQuantity + quantity;
        var priceDifference = productPrice * (newQuantity - currentQuantity);

        console.log('Producto ya en carrito. Cantidad actual:', currentQuantity, 'Nueva cantidad:', newQuantity, 'Diferencia de precio:', priceDifference);

        input.value = newQuantity;
        existingItem.querySelector('.product-price').textContent = (productPrice * newQuantity).toFixed(2) + ' €';
        updateTotal(priceDifference);
    } else {
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
            <span class="customer-name" style="display: none;">${customerName}</span>
            <button class="remove-btn" onclick="removeItem(this)">Delete</button>
        `;
        document.querySelector('.order-items').appendChild(orderItem);
        updateTotal(productPrice * quantity);
    }

    updateLocalStorage();

    console.log("Estado del carrito almacenado:", JSON.parse(localStorage.getItem('carrito')));
}

function updateQuantity(button, change, productPrice) {
    var input = button.parentNode.querySelector('input[type="number"]');
    var currentQuantity = parseInt(input.value);
    var newQuantity = currentQuantity + change;

    if (newQuantity >= 0) {
        input.value = newQuantity;

        var priceDifference = productPrice * change;
        var productPriceElement = button.parentNode.nextElementSibling;
        var currentProductPrice = parseFloat(productPriceElement.textContent);
        var newProductPrice = currentProductPrice + priceDifference;

        if (newQuantity === 0) {
            var productItem = button.parentNode.parentNode;
            productItem.parentNode.removeChild(productItem);
            priceDifference = -currentProductPrice;
            updateTotal(priceDifference);
            updateLocalStorage();
        } else {
            productPriceElement.textContent = newProductPrice.toFixed(2) + ' €';
            updateTotal(priceDifference);
        }
    } else {
        console.log('No se puede reducir la cantidad por debajo de 0.');
    }
}

function removeItem(button) {
    var productItem = button.parentNode;
    var productPrice = parseFloat(productItem.querySelector('.product-price').textContent);
    productItem.parentNode.removeChild(productItem);
    var priceDifference = -productPrice;
    updateTotal(priceDifference);
    updateLocalStorage();
}

function updateTotal(change) {
    var totalAmountElement = document.querySelector('.total-amount');
    var currentTotal = parseFloat(totalAmountElement.textContent.replace('€', '').trim());
    var newTotal = currentTotal + change;
    totalAmountElement.textContent = newTotal.toFixed(2) + ' €';

    updateLocalStorage();
    updateCartInterface();
}

function updateLocalStorage() {
    let cart = {
        items: []
    };

    document.querySelectorAll('.order-item').forEach(function (orderItem) {
        let productName = orderItem.querySelector('.product-name').textContent;
        let productQuantity = parseInt(orderItem.querySelector('.product-quantity input[type=number]').value);
        let productPrice = parseFloat(orderItem.querySelector('.product-price').textContent.replace(' €', ''));

        cart.items.push({
            name: productName,
            quantity: productQuantity,
            price: productPrice / productQuantity // Precio unitario
        });
    });

    console.log("Guardando carrito en localStorage:", cart);
    localStorage.setItem('carrito', JSON.stringify(cart));
    console.log("Carrito guardado:", JSON.parse(localStorage.getItem('carrito')));
}

function updateCartInterface() {
    var totalAmountElement = document.querySelector('.total-amount');
    var currentTotal = parseFloat(totalAmountElement.textContent.replace('€', '').replace(',', '.'));
    var reviewOrderButton = document.querySelector('.order-toggle-button .total-amount');
    if (reviewOrderButton) {
        reviewOrderButton.textContent = currentTotal.toFixed(2) + ' €';
    }

    var minimumNotice = document.getElementById('minimum-order-notice');
    var confirmOrderButton = document.querySelector('#confirm-order-btn');
    var orderButton = document.querySelector('.order-toggle-button a');

    if (currentTotal >= 16) {
        confirmOrderButton.disabled = false;
    } else {
        confirmOrderButton.disabled = true;
    }

    if (currentTotal >= 16) {
        minimumNotice.style.display = 'none';
        orderButton.classList.remove('disabled');
        orderButton.removeAttribute('disabled');
    } else {
        minimumNotice.style.display = 'block';
        orderButton.classList.add('disabled');
        orderButton.setAttribute('disabled', 'disabled');
        orderButton.href = "javascript:void(0);";
    }

    if (currentTotal > 0) {
        document.querySelector('.order-empty').style.display = 'none';
        document.querySelector('.order-total').style.display = 'block';
    } else {
        document.querySelector('.order-empty').style.display = 'block';
        document.querySelector('.order-total').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var storedCart = localStorage.getItem('carrito');
    if (storedCart) {
        var cart = JSON.parse(storedCart);

        if (cart.customerName) {
            var usernameDisplay = document.getElementById('usernameDisplay');
            if (usernameDisplay) {
                usernameDisplay.textContent = cart.customerName;
            }
        }

        if (cart.items && cart.items.length > 0) {
            cart.items.forEach(item => {
                addToCart(item.name, item.price / item.quantity, item.quantity);
            });
        }
    }

    var productCards = document.querySelectorAll('.menu-item');
    productCards.forEach(function (card) {
        card.addEventListener('click', function () {
            var productName = this.getAttribute('data-product-name');
            var productPrice = this.getAttribute('data-product-price');
            var modal = document.getElementById('productModal');
            modal.querySelector('#productModalTitle').textContent = productName;
            modal.querySelector('.price-span').textContent = productPrice + ' €';
        });
    });

    var addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var modal = this.closest('.modal-content');
            var productName = modal.querySelector('#productModalTitle').textContent;
            var productPriceText = modal.querySelector('.price-span').textContent;
            var priceMatches = productPriceText.match(/(\d+([.,]\d+)?)\s*€/);

            if (priceMatches && priceMatches.length > 1) {
                var productPrice = parseFloat(priceMatches[1].replace(',', '.'));
                var quantity = parseInt(modal.querySelector('#quantity').value);
                addToCart(productName, productPrice, quantity);
            } else {
                console.error('No se pudo extraer el precio del producto');
            }
        });
    });

    const confirmOrderButton = document.querySelector('#confirm-order-btn');
    if (confirmOrderButton) {
        confirmOrderButton.addEventListener('click', function () {
            saveOrder();
            alert('Pedido confirmado con éxito.');
        });
    }

    function determineLocation() {
        const location = document.body.dataset.location;
        if (!location || location.trim() === "") {
            console.error("Ubicación no definida o vacía en el atributo data-location.");
            return null;
        }
        return location;
    }

    function saveOrder() {
        const location = determineLocation();
        console.log("Intentando guardar el pedido en la ubicación:", location);

        if (!location) {
            console.error("No se puede guardar el pedido sin una ubicación válida.");
            return;
        }

        const username = localStorage.getItem('username') || 'Usuario Anónimo';
        const cartData = localStorage.getItem('carrito');
        const cart = cartData ? JSON.parse(cartData) : {
            items: []
        };

        if (cart.items.length === 0) {
            console.error("Intento de guardar un pedido vacío.");
            return;
        }

        // Asegúrate de que cada ítem tiene un ID de producto (idProductoDet)
        const orderItems = cart.items.map(item => ({
            idProductoDet: item.idProductoDet || "DEFAULT_ID", // Asegúrate de que este campo existe en el objeto item
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }));

        const order = {
            username: username,
            timestamp: new Date().getTime(),
            items: orderItems, // Aquí usamos los ítems asegurándonos de incluir el idProductoDet
            location: location
        };

        const ordersData = localStorage.getItem('orders');
        const orders = ordersData ? JSON.parse(ordersData) : [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        console.log("Pedido guardado:", order);

        localStorage.setItem('carrito', JSON.stringify({
            items: []
        }));
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cartItemsContainer = document.querySelector('.order-items');
        const totalAmountElement = document.querySelector('.total-amount');

        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
        } else {
            console.error("No se encontró el contenedor de artículos del carrito.");
        }

        if (totalAmountElement) {
            totalAmountElement.textContent = '0.00 €';
        } else {
            console.error("No se encontró el elemento para mostrar el total del carrito.");
        }
    }


});
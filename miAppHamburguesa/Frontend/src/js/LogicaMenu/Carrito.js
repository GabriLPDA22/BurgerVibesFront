// URL de la API para obtener productos
const urlProducts = 'http://localhost:8080/BuergerVibes/Controller?ACTION=PRODUCTO.FIND_ALL';

/**
 * Función para obtener productos de la API.
 * Realiza una solicitud HTTP GET a la URL de productos.
 * Si la solicitud tiene éxito, convierte la respuesta a JSON y llama a printProducts para mostrar los productos.
 * En caso de error, lo captura y muestra un mensaje de error en la consola.
 */
const fetchProducts = async () => {
    try {
        // Realizar solicitud a la API
        const result = await fetch(urlProducts);
        // Convertir la respuesta a JSON
        const data = await result.json();
        console.log('Productos obtenidos de la API:', data);
        // Imprimir los productos en la página
        printProducts(data);
    } catch (error) {
        // Manejar errores de la solicitud
        console.error('Error al obtener datos de la API:', error);
    }
};

/**
 * Función para imprimir los productos en la página.
 * Limpia el contenido anterior del contenedor de la lista de productos.
 * Itera sobre el array de productos y crea un elemento HTML para cada uno.
 * Añade cada elemento creado al contenedor de la lista de productos.
 * 
 * @products - Array de objetos de productos obtenidos de la API.
 */
const printProducts = (products) => {
    // Obtener el contenedor de la lista de productos
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar el contenido anterior

    // Iterar sobre cada producto y crear elementos HTML
    products.forEach(product => {
        const {
            ID_Producto,
            Precio,
            Nombre,
            Descripcion,
            DisponibleEnVlc,
            DisponibleEnZgz,
            ID_Categoria_pro,
            Producto_IMG
        } = product;

        // Crear un contenedor para cada producto
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Añadir el contenido HTML a la tarjeta del producto
        productCard.innerHTML = `
            <img src="${Producto_IMG}" alt="${Nombre}">
            <div class="product-details">
                <h2>${Nombre}</h2>
                <p>${Descripcion}</p>
                <p class="price">€${Precio.toFixed(2)}</p>
                <div class="actions">
                    <button onclick="addToCart('${Nombre}', ${Precio.toFixed(2)}, 1)">Añadir al carrito</button>
                </div>
            </div>
        `;

        // Añadir la tarjeta del producto a la lista de productos
        productList.appendChild(productCard);
    });
};

/**
 * Función para añadir un producto al carrito.
 * Verifica si el producto ya está en el carrito:
 * - Si está, actualiza la cantidad y el precio.
 * - Si no está, crea un nuevo elemento en el carrito.
 * Actualiza el almacenamiento local y la interfaz del carrito.
 * 
 * @productName - Nombre del producto a añadir.
 * @productPrice - Precio del producto a añadir.
 * @quantity - Cantidad del producto a añadir.
 */
const addToCart = (productName, productPrice, quantity) => {
    console.log(`Producto ${productName} añadido al carrito.`);
    // Obtener el nombre del usuario autenticado o 'Anonymous' si no está autenticado
    const customerName = localStorage.getItem('username') || 'Anonymous';

    // Verificar si el producto ya está en el carrito
    var existingItem = Array.from(document.querySelectorAll('.order-item'))
        .find(item => item.querySelector('.product-name').textContent === productName);

    if (existingItem) {
        // Si el producto ya está en el carrito, actualizar la cantidad y el precio
        var input = existingItem.querySelector('.product-quantity input[type=number]');
        var currentQuantity = parseInt(input.value);
        var newQuantity = currentQuantity + quantity;
        var priceDifference = productPrice * (newQuantity - currentQuantity);

        input.value = newQuantity;
        existingItem.querySelector('.product-price').textContent = (productPrice * newQuantity).toFixed(2) + ' €';
        updateTotal(priceDifference);
    } else {
        // Si el producto no está en el carrito, crear un nuevo elemento
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

    // Actualizar el almacenamiento local con el estado del carrito
    updateLocalStorage();
};

/**
 * Función para actualizar la cantidad de un producto en el carrito.
 * Verifica que la nueva cantidad no sea negativa:
 * - Si es 0, elimina el producto del carrito.
 * - Si es mayor que 0, actualiza la cantidad y el precio.
 * 
 * @button - Botón que desencadena el cambio de cantidad.
 * @change - Cambio en la cantidad (positivo o negativo).
 * @productPrice - Precio del producto.
 */
const updateQuantity = (button, change, productPrice) => {
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
        } else {
            productPriceElement.textContent = newProductPrice.toFixed(2) + ' €';
            updateTotal(priceDifference);
        }
    } else {
        console.log('No se puede reducir la cantidad por debajo de 0.');
    }
};

/**
 * Función para eliminar un producto del carrito.
 * Obtiene el elemento del producto y lo elimina del carrito.
 * Actualiza el total del carrito restando el precio del producto eliminado.
 * 
 * @button - Botón que desencadena la eliminación.
 */
const removeItem = (button) => {
    var productItem = button.parentNode;
    var productPrice = parseFloat(productItem.querySelector('.product-price').textContent);
    productItem.parentNode.removeChild(productItem);
    var priceDifference = -productPrice;
    updateTotal(priceDifference);
};

/**
 * Función para actualizar el total del carrito.
 * Obtiene el total actual del carrito, le suma o resta el cambio y actualiza el elemento del total.
 * 
 * @change - Cambio en el total del carrito.
 */
const updateTotal = (change) => {
    var totalAmountElement = document.querySelector('.total-amount');
    var currentTotal = parseFloat(totalAmountElement.textContent.replace('€', '').trim());
    var newTotal = currentTotal + change;
    totalAmountElement.textContent = newTotal.toFixed(2) + ' €';

    updateLocalStorage();
    updateCartInterface();
};

/**
 * Función para actualizar el almacenamiento local con el estado del carrito.
 * Recorre todos los elementos del carrito y guarda su estado en el almacenamiento local.
 */
const updateLocalStorage = () => {
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

    localStorage.setItem('carrito', JSON.stringify(cart));
};

/**
 * Función para actualizar la interfaz del carrito.
 * Actualiza el total del carrito y habilita o deshabilita botones según el total.
 */
const updateCartInterface = () => {
    var totalAmountElement = document.querySelector('.total-amount');
    var currentTotal = parseFloat(totalAmountElement.textContent.replace('€', '').replace(',', '.'));
    var reviewOrderButton = document.querySelector('.order-toggle-button .total-amount');
    if (reviewOrderButton) {
        reviewOrderButton.textContent = currentTotal.toFixed(2) + ' €';
    }

    var minimumNotice = document.getElementById('minimum-order-notice');
    var confirmOrderButton = document.querySelector('#confirm-order-btn');
    var orderButton = document.querySelector('.order-toggle-button a');

    // Habilitar o deshabilitar el botón de confirmar pedido según el total
    if (currentTotal >= 16) {
        confirmOrderButton.disabled = false;
    } else {
        confirmOrderButton.disabled = true;
    }

    // Mostrar o ocultar el aviso de pedido mínimo y habilitar o deshabilitar el botón de pedido
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

    // Mostrar u ocultar la interfaz del carrito según el total
    if (currentTotal > 0) {
        document.querySelector('.order-empty').style.display = 'none';
        document.querySelector('.order-total').style.display = 'block';
    } else {
        document.querySelector('.order-empty').style.display = 'block';
        document.querySelector('.order-total').style.display = 'none';
    }
};

// Esperar a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function () {
    // Recuperar el carrito almacenado en localStorage
    var storedCart = localStorage.getItem('carrito');
    if (storedCart) {
        var cart = JSON.parse(storedCart);

        if (cart.items && cart.items.length > 0) {
            cart.items.forEach(item => {
                addToCart(item.name, item.price / item.quantity, item.quantity);
            });
        }
    }

    // Añadir eventos a las tarjetas de productos para mostrar detalles
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

    // Añadir eventos a los botones de añadir al carrito
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

    // Añadir evento al botón de confirmar pedido
    const confirmOrderButton = document.querySelector('#confirm-order-btn');
    if (confirmOrderButton) {
        confirmOrderButton.addEventListener('click', function () {
            saveOrder();
            alert('Pedido confirmado con éxito.');
        });
    }

    /**
     * Función para determinar la ubicación actual del usuario.
     * Obtiene la ubicación del atributo data-location del cuerpo del documento.
     * Si la ubicación no está definida o está vacía, muestra un mensaje de error en la consola.
     * @returns {string|null} La ubicación o null si no está definida.
     */
    function determineLocation() {
        const location = document.body.dataset.location;
        if (!location || location.trim() === "") {
            console.error("Ubicación no definida o vacía en el atributo data-location.");
            return null;
        }
        return location;
    }

    /**
     * Función para guardar el pedido en localStorage.
     * Obtiene la ubicación y el nombre de usuario del almacenamiento local.
     * Si no hay productos en el carrito, muestra un mensaje de error en la consola.
     * Crea un objeto de pedido con los detalles del pedido y lo guarda en localStorage.
     */
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

        const orderItems = cart.items.map(item => ({
            idProductoDet: item.idProductoDet || "DEFAULT_ID",
            name: item.name,
            quantity: item.quantity,
            price: item.price
        }));

        const order = {
            username: username,
            timestamp: new Date().getTime(),
            items: orderItems,
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

    /**
     * Función para actualizar la visualización del carrito.
     * Vacía el contenedor de artículos del carrito y resetea el total del carrito.
     */
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

// Obtener productos cuando se carga la página
fetchProducts();

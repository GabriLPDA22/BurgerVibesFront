document.addEventListener('DOMContentLoaded', function() {
    let storedCart = localStorage.getItem('carrito');
    if (storedCart) {
        let cart;
        try {
            cart = JSON.parse(storedCart);
            console.log("Carrito después de parsear:", cart);
        } catch (error) {
            console.error("Error al parsear el carrito:", error);
            cart = null;
        }

        if (cart && cart.items && Array.isArray(cart.items)) {
            renderCartItems(cart.items);
        } else {
            console.error("El carrito no tiene una estructura de 'items' válida:", cart);
        }
    } else {
        console.error("No se encontraron datos del carrito en localStorage.");
    }
});

function renderCartItems(items) {
    let itemsContainer = document.querySelector('.my-3');
    if (!itemsContainer) {
        console.error("El contenedor de artículos del carrito no se encontró.");
        return;
    }

    let totalPrice = 0;
    itemsContainer.innerHTML = '';

    items.forEach(function(item) {
        let orderItem = document.createElement('div');
        orderItem.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'border', 'rounded-3', 'p-3', 'my-3');
        totalPrice += item.price * item.quantity;

        orderItem.innerHTML = `
            <div class="d-flex align-items-center">
                <strong>${item.quantity}</strong> x <span class="ms-2">${item.name}</span>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)} €</span>
        `;

        itemsContainer.appendChild(orderItem);
    });

    let totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice.toFixed(2) + ' €';
    } else {
        console.error("El elemento para mostrar el precio total no se encontró.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    function getRandomEmpleado() {
        const empleados = [
            'EMP001', 'EMP004', 'EMP007', 'EMP010', 'EMP013', 'EMP016', 'EMP019',
            'EMP022', 'EMP025', 'EMP028', 'EMP031', 'EMP034', 'EMP037', 'EMP040',
            'EMP043', 'EMP046', 'EMP049'
        ];
        const randomIndex = Math.floor(Math.random() * empleados.length);
        return empleados[randomIndex];
    }

    function handlePayment(buttonId) {
        const payButton = document.getElementById(buttonId);
        if (payButton) {
            payButton.addEventListener('click', async (event) => {
                event.preventDefault();

                if (localStorage.getItem('authenticated') === 'true') {
                    const storedCart = localStorage.getItem('carrito');
                    let cartItems = [];
                    if (storedCart) {
                        try {
                            cartItems = JSON.parse(storedCart).items || [];
                        } catch (error) {
                            console.error("Error al parsear el carrito:", error);
                        }
                    }

                    const idCliente = localStorage.getItem('ID_CLIENTE');
                    const idEmpleado = getRandomEmpleado();

                    if (!idCliente || !idEmpleado) {
                        alert('Error: idCliente o idEmpleado no están definidos.');
                        return;
                    }

                    const pickupTime = document.getElementById('pickup-time').value; // Obtener pickupTime

                    const paymentDetails = {
                        fullName: document.getElementById('full-name').value,
                        phoneNumber: document.getElementById('phone-number').value,
                        email: document.getElementById('email').value,
                        address: document.getElementById('address').value,
                        pickupTime: pickupTime, // Incluir pickupTime
                        restaurantNote: document.getElementById('restaurant-note').value,
                        promoCode: document.getElementById('promo-code').value,
                        items: cartItems,
                        totalPedido: parseFloat(document.getElementById('total-price').textContent.replace('€', '').trim()),
                        metodoPago: 'Tarjeta',
                        country: document.getElementById('country').value,
                        idCliente: idCliente,
                        idEmpleado: idEmpleado
                    };

                    console.log('Detalles del pago:', paymentDetails);

                    try {
                        const response = await fetch('http://localhost:8080/api/pedido', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(paymentDetails)
                        });

                        if (!response.ok) {
                            const errorText = await response.text();
                            throw new Error('Error en la respuesta del servidor: ' + errorText);
                        }

                        const responseText = await response.json();
                        alert('Pago exitoso');
                        localStorage.removeItem('carrito'); // Limpiar el carrito después del pago exitoso
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Error al conectar con el servidor: ' + error.message);
                    }
                } else {
                    document.getElementById('paymentFormContainer').style.display = 'none';
                    document.getElementById('loginMessageContainer').style.display = 'block';
                }
            });
        }
    }

    handlePayment('payButton_VAL');
    handlePayment('payButton_ZGZ');
});
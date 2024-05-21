// Espera a que el DOM esté completamente cargado para ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el carrito de compras almacenado en el almacenamiento local
    let storedCart = localStorage.getItem('carrito');
    if (storedCart) {
        let cart;
        try {
            // Intentar parsear el carrito de compras en formato JSON
            cart = JSON.parse(storedCart);
            console.log("Carrito después de parsear:", cart);
        } catch (error) {
            // Manejar errores de parsing
            console.error("Error al parsear el carrito:", error);
            cart = null;
        }

        // Verificar si el carrito y sus elementos son válidos
        if (cart && cart.items && Array.isArray(cart.items)) {
            // Renderizar los elementos del carrito en la página
            renderCartItems(cart.items);
        } else {
            console.error("El carrito no tiene una estructura de 'items' válida:", cart);
        }
    } else {
        console.error("No se encontraron datos del carrito en localStorage.");
    }
});

// Función para renderizar los elementos del carrito en la página
function renderCartItems(items) {
    // Buscar el contenedor de artículos del carrito en el DOM
    let itemsContainer = document.querySelector('.my-3');
    if (!itemsContainer) {
        console.error("El contenedor de artículos del carrito no se encontró.");
        return;
    }

    let totalPrice = 0;
    itemsContainer.innerHTML = ''; // Limpiar el contenido actual

    // Iterar sobre cada artículo del carrito
    items.forEach(function(item) {
        // Crear un elemento para el artículo y darle estilo
        let orderItem = document.createElement('div');
        orderItem.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'border', 'rounded-3', 'p-3', 'my-3');
        totalPrice += item.price * item.quantity; // Calcular el precio total

        // Agregar contenido al elemento del artículo
        orderItem.innerHTML = `
            <div class="d-flex align-items-center">
                <strong>${item.quantity}</strong> x <span class="ms-2">${item.name}</span>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)} €</span>
        `;

        // Agregar el elemento del artículo al contenedor de artículos
        itemsContainer.appendChild(orderItem);
    });

    // Mostrar el precio total en la página
    let totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice.toFixed(2) + ' €';
    } else {
        console.error("El elemento para mostrar el precio total no se encontró.");
    }
}

// Manejar el proceso de pago cuando se hace clic en un botón de pago
document.addEventListener('DOMContentLoaded', () => {
    // Función para obtener un empleado aleatorio (cocineros) SELECT ID_EMPLEADO, CARGO FROM EMPLEADO WHERE CARGO = 'Cocinero'
    function getRandomEmpleado() {
        const empleados = ['EMP001', 'EMP004', 'EMP007', 'EMP010', 'EMP013', 'EMP016', 'EMP019', 'EMP022', 'EMP025', 'EMP028', 'EMP031', 'EMP034', 'EMP037', 'EMP040', 'EMP043', 'EMP046', 'EMP049'];
        const randomIndex = Math.floor(Math.random() * empleados.length);
        return empleados[randomIndex];
    }

    // Función para manejar el evento de clic en un botón de pago
    function handlePayment(buttonId) {
        const payButton = document.getElementById(buttonId);
        if (payButton) {
            payButton.addEventListener('click', async (event) => {
                event.preventDefault(); // Evitar que el formulario se envíe automáticamente

                // Verificar si el usuario está autenticado
                if (localStorage.getItem('authenticated') === 'true') {
                    const storedCart = localStorage.getItem('carrito');
                    let cartItems = [];
                    if (storedCart) {
                        try {
                            // Parsear los elementos del carrito de compras
                            cartItems = JSON.parse(storedCart).items || [];
                        } catch (error) {
                            console.error("Error al parsear el carrito:", error);
                        }
                    }

                    // Obtener el ID del cliente y un ID de empleado aleatorio
                    const idCliente = localStorage.getItem('idCliente');
                    const idEmpleado = getRandomEmpleado();

                    // Verificar la existencia de los IDs requeridos
                    if (!idCliente || !idEmpleado) {
                        alert('Error: idCliente o idEmpleado no están definidos.');
                        return;
                    }

                    // Construir los detalles del pago
                    const paymentDetails = {
                        nombre: document.getElementById('full-name').value,
                        telefono: document.getElementById('phone-number').value,
                        email: document.getElementById('email').value,
                        direccion: document.getElementById('address').value,
                        horaEntrega: document.getElementById('pickup-time').value,
                        nota: document.getElementById('restaurant-note').value ? "Sí" : "No",
                        codPromocional: document.getElementById('promo-code').value ? "Sí" : "No",
                        items: cartItems,
                        totalPedido: parseFloat(document.getElementById('total-price').textContent), // Total calculado localmente
                        metodoPago: 'Tarjeta',
                        numTarjeta: document.getElementById('card-number').value,
                        expiracion: document.getElementById('card-expiry').value,
                        pais: document.getElementById('country').value,
                        idCliente: idCliente, // Obtener idCliente de localStorage
                        idEmpleado: idEmpleado // Obtener un idEmpleado aleatorio
                    };

                    console.log('Detalles del pago:', paymentDetails);

                    try {
                        // Enviar los detalles del pago al servidor
                        const response = await fetch('http://localhost:8080/procesar-pedido', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(paymentDetails)
                        });

                        // Verificar la respuesta del servidor
                        if (!response.ok) {
                            const errorText = await response.text();
                            throw new Error('Error en la respuesta del servidor: ' + errorText);
                        }

                        // Mostrar mensaje de pago exitoso si la respuesta es exitosa
                        const responseText = await response.json();
                        if (response.ok) {
                            alert('Pago exitoso');
                            localStorage.removeItem('carrito'); // Limpiar el carrito después del pago exitoso
                        } else {
                            alert('Error en el pago: ' + responseText.message);
                        }
                    } catch (error) {
                        // Manejar errores de conexión con el servidor
                        console.error('Error:', error);
                        alert('Error al conectar con el servidor: ' + error.message);
                    }
                } else {
                    // Mostrar mensaje de inicio de sesión si el usuario no está autenticado
                    paymentFormContainer.style.display = 'none';
                    loginMessageContainer.style.display = 'block';
                }
            });
        }
    }

    // Inicializar el manejo de pago para ambos botones de pago
    handlePayment('payButton_VAL');
    handlePayment('payButton_ZGZ');
});

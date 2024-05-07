document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalLogin');
    const loginBtn = document.getElementById('loginBtn');
    const closeButton = document.querySelector('#modalLogin .close');
    const signOutLink = document.getElementById('signOutLink');
    const userMenu = document.getElementById('userMenu');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const paymentFormContainer = document.getElementById('paymentFormContainer');
    const loginMessageContainer = document.getElementById('loginMessageContainer');
    const loginPromptButton = document.getElementById('loginPromptButton');

    function toggleDisplay(element, show) {
        if (!element) {
            console.error("Attempted to toggle display on undefined element:", element);
            return; // Prevenir error si el elemento no existe
        }
        element.style.display = show ? 'block' : 'none';
    }

    function toggleModal(show) {
        if (modal) {
            console.log("Toggle modal called with show:", show);
            toggleDisplay(modal, show);
        }
    }

    function clearCart() {
        const username = localStorage.getItem('username');
        if (username) {
            localStorage.removeItem('carrito_' + username); // Asegura que el carrito se limpie por usuario
        }
        updateCartInterface(); // Limpia la interfaz del carrito después de limpiar el carrito
    }

    function updateCartInterface() {
        // Encuentra el contenedor del carrito y vacíalo
        const cartItemsContainer = document.querySelector('.order-items');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
        }
        // Actualiza el total a 0
        const totalAmountElement = document.querySelector('.total-amount');
        if (totalAmountElement) {
            totalAmountElement.textContent = '0.00 €';
        }
    }

    function loadCart() {
        const username = localStorage.getItem('username');
        console.log('Cargando carrito para:', username); // Depuración para ver qué usuario carga el carrito
        if (username) {
            const storedCart = localStorage.getItem('carrito_' + username);
            console.log('Datos del carrito encontrados:', storedCart); // Verificar qué se encuentra
            if (storedCart) {
                const cartItems = JSON.parse(storedCart);
                cartItems.forEach(item => {
                    addToCart(item.name, item.price, item.quantity);
                });
            } else {
                console.log('No se encontraron datos del carrito para:', username); // Indicar si no se encontró nada
            }
        }
    }

    function updateUI() {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        if (isAuthenticated && usernameDisplay) {
            const username = localStorage.getItem('username');
            usernameDisplay.textContent = username;
            toggleDisplay(loginBtn, false);
            toggleDisplay(userMenu, true);
            toggleDisplay(paymentFormContainer, true);
            toggleDisplay(loginMessageContainer, false);
            loadCart(); // Carga el carrito aquí para asegurarte de que el nombre de usuario ya está disponible
        } else {
            if (usernameDisplay) {
                usernameDisplay.textContent = '';
            }
            toggleDisplay(loginBtn, true);
            toggleDisplay(userMenu, false);
            toggleDisplay(paymentFormContainer, false);
            toggleDisplay(loginMessageContainer, true);
        }
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => toggleModal(true));
    }
    if (closeButton) {
        closeButton.addEventListener('click', () => toggleModal(false));
    }
    if (signOutLink) {
        signOutLink.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('authenticated');
            localStorage.removeItem('username');
            clearCart(); // Limpia el carrito al desconectar
            updateUI();
        });
    }

    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', (event) => {
            event.preventDefault();
            const usernameEmail = document.getElementById('usernameEmail').value;
            localStorage.setItem('username', usernameEmail);
            localStorage.setItem('authenticated', 'true');
            console.log('Usuario autenticado:', usernameEmail); // Confirmar usuario autenticado
            clearCart();
            updateUI();
            loadCart();
            toggleModal(false);
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            toggleModal(false);
        }
    });

    if (loginPromptButton) {
        loginPromptButton.addEventListener('click', () => toggleModal(true));
    }

    updateUI(); // Llamar a updateUI directamente al cargar la página
});

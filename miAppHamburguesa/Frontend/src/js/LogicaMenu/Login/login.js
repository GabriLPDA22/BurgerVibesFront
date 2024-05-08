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
            toggleDisplay(modal, show);
        }
    }

    function clearCart() {
        const username = localStorage.getItem('username');
        if (username) {
            localStorage.removeItem('carrito_' + username);
        }
        updateCartInterface();
    }

    function updateCartInterface() {
        const cartItemsContainer = document.querySelector('.order-items');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
        }
        const totalAmountElement = document.querySelector('.total-amount');
        if (totalAmountElement) {
            totalAmountElement.textContent = '0.00 €';
        }
    }

    function loadCart() {
        const username = localStorage.getItem('username');
        if (username) {
            const storedCart = localStorage.getItem('carrito_' + username);
            if (storedCart) {
                const cartItems = JSON.parse(storedCart);
                cartItems.forEach(item => {
                    addToCart(item.name, item.price, item.quantity);
                });
            } else {
                console.log('No se encontraron datos del carrito para:', username);
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
            loadCart(); // Cargar el carrito al iniciar sesión
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
            clearCart();
            updateUI();
        });
    }

    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', (event) => {
            event.preventDefault();
            const usernameEmail = document.getElementById('usernameEmail').value;
            localStorage.setItem('username', usernameEmail);
            localStorage.setItem('authenticated', 'true');
            clearCart();
            updateUI();
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

    updateUI();
});

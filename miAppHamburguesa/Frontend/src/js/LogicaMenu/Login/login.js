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
        if (element) {
            element.style.display = show ? 'block' : 'none';
        }
    }
    
    function toggleModal(show) {
        toggleDisplay(modal, show);
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
        } else {
            console.error('El contenedor de artículos del carrito no se encontró.');
        }
        const totalAmountElement = document.querySelector('.total-amount');
        if (totalAmountElement) {
            totalAmountElement.textContent = '0.00 €';
        } else {
            console.error('El elemento para mostrar el total del carrito no se encontró.');
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
            }
        }
    }

    function updateUI() {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        toggleDisplay(loginBtn, !isAuthenticated);
        toggleDisplay(userMenu, isAuthenticated);
        toggleDisplay(paymentFormContainer, isAuthenticated);
        toggleDisplay(loginMessageContainer, !isAuthenticated);
        if (isAuthenticated) {
            const username = localStorage.getItem('username');
            if (usernameDisplay) {
                usernameDisplay.textContent = username;
            }
            loadCart();
        } else {
            if (usernameDisplay) {
                usernameDisplay.textContent = '';
            }
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

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const usernameEmail = document.getElementById('usernameEmail');
            if (usernameEmail) {
                localStorage.setItem('username', usernameEmail.value);
                localStorage.setItem('authenticated', 'true');
                clearCart();
                updateUI();
                toggleModal(false);
            } else {
                console.error('El campo de email no se encontró.');
            }
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

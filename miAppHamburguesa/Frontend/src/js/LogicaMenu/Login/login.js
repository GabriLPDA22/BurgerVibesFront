document.addEventListener('DOMContentLoaded', () => {
    const modalLogin = document.getElementById('modalLogin');
    const modalRegister = document.getElementById('modalRegister');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const closeButtons = document.querySelectorAll('.close');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const logoutBtn = document.getElementById('signOutLink');
    const paymentFormContainer = document.getElementById('paymentFormContainer');
    const loginMessageContainer = document.getElementById('loginMessageContainer');
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');

    function toggleModal(modal, show) {
        modal.style.display = show ? 'block' : 'none';
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleModal(modalLogin, true);
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleModal(modalRegister, true);
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleModal(modalLogin, false);
            toggleModal(modalRegister, false);
        });
    });

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const usernameEmail = document.getElementById('loginUsernameEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch('http://localhost:8080/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ usernameEmail, password })
                });

                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }

                const responseText = await response.json();
                alert('Inicio de sesión exitoso');
                localStorage.setItem('authenticated', 'true');
                localStorage.setItem('username', responseText.username);
                localStorage.setItem('email', responseText.email);
                modalLogin.style.display = 'none';
                updateUI();
            } catch (error) {
                console.error('Error:', error);
                alert('Error al conectar con el servidor');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            console.log('Datos enviados al servidor:', data);

            try {
                const response = await fetch('http://localhost:8080/register', {  // Asegúrate de que el puerto es 8080
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }

                const responseData = await response.json();
                alert('Registro exitoso');
                modalRegister.style.display = 'none';
            } catch (error) {
                console.error('Error:', error);
                alert('Error al conectar con el servidor');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('authenticated');
            localStorage.removeItem('username');
            updateUI();
        });
    }

    function updateUI() {
        const isAuthenticated = localStorage.getItem('authenticated') === 'true';
        if (isAuthenticated) {
            const username = localStorage.getItem('username');
            usernameDisplay.innerText = username;
            document.getElementById('userMenu').style.display = 'block';
            document.querySelector('.login').style.display = 'none';
            document.querySelector('.register').style.display = 'none';
        } else {
            usernameDisplay.innerText = '';
            document.getElementById('userMenu').style.display = 'none';
            document.querySelector('.login').style.display = 'inline-block';
            document.querySelector('.register').style.display = 'inline-block';
        }
    }

    // Evento de clic en el botón de pago
    const payButton = document.getElementById('payButton_VAL');
    if (payButton) {
        payButton.addEventListener('click', async (event) => {
            event.preventDefault();
            if (localStorage.getItem('authenticated') === 'true') {
                const paymentDetails = {
                    fullName: fullNameInput.value,
                    phoneNumber: document.getElementById('phone-number').value,
                    email: emailInput.value,
                    pickupTime: document.getElementById('pickup-time').value,
                    restaurantNote: document.getElementById('restaurant-note').value,
                    promoCode: document.getElementById('promo-code').value,
                    cardNumber: document.getElementById('card-number').value,
                    cardExpiry: document.getElementById('card-expiry').value,
                    cardCvc: document.getElementById('card-cvc').value,
                    country: document.getElementById('country').value,
                };

                try {
                    const response = await fetch('http://localhost:8080/pay', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(paymentDetails)
                    });

                    const responseText = await response.json();
                    if (response.ok) {
                        alert('Pago exitoso');
                    } else {
                        alert('Error en el pago: ' + responseText.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error al conectar con el servidor');
                }
            } else {
                paymentFormContainer.style.display = 'none';
                loginMessageContainer.style.display = 'block';
            }
        });
    }

    // Actualizar la interfaz de usuario al cargar la página
    updateUI();
});

// En Pago.js
document.addEventListener('DOMContentLoaded', function() {
    let storedCart = localStorage.getItem('carrito');
    if (storedCart) {
        let cart = JSON.parse(storedCart);
        if (cart && Array.isArray(cart.items)) {
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
    itemsContainer.innerHTML = ''; // Limpiar el contenido actual
    
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

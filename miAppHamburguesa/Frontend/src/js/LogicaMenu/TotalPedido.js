function addToOrder(itemName, itemPrice) {
    // Encuentra el contenedor de los elementos del pedido y el total
    const orderItems = document.querySelector('.order-items');
    const orderTotal = document.querySelector('.order-total');
    const totalAmount = document.querySelector('.total-amount');

    // Crea el elemento del pedido
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    orderItem.innerHTML = `
        <span>${itemName}</span>
        <span>${itemPrice.toFixed(2)} €</span>
    `;

    // Añade el nuevo elemento del pedido al contenedor
    orderItems.appendChild(orderItem);
    orderItems.style.display = 'block'; // Asegura que el contenedor de los elementos del pedido sea visible

    // Actualiza el total
    const currentTotal = parseFloat(totalAmount.textContent) || 0;
    totalAmount.textContent = (currentTotal + itemPrice).toFixed(2) + ' €';
    orderTotal.style.display = 'block'; // Asegura que el total sea visible
}

// Ejemplo de uso:
// addToOrder('Alitas Thai', 8.00);

// En Pago.js
document.addEventListener('DOMContentLoaded', function() {
    let storedCart = localStorage.getItem('carrito');
    // Asegúrate de que storedCart no solo exista, sino que también sea un objeto con la forma esperada
    if (storedCart) {
        let cart = JSON.parse(storedCart);
        // Confirma que cart es un objeto y tiene la propiedad 'items' que es un array
        if (cart && Array.isArray(cart.items)) {
            renderCartItems(cart.items); // Función para renderizar los artículos del carrito
        }
    }
});
  
function renderCartItems(items) {
    let itemsContainer = document.querySelector('.my-3');
    let totalPrice = 0; // Variable para almacenar el precio total del carrito

    if (itemsContainer) {
        itemsContainer.innerHTML = ''; // Limpiar el contenido actual
        
        items.forEach(function(item) {
            let orderItem = document.createElement('div');
            orderItem.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'border', 'rounded-3', 'p-3', 'my-3');
            
            // Calcular el precio total del artículo (sin multiplicar por la cantidad)
            totalPrice += item.price; // Sumar el precio del artículo al precio total del carrito
            
            orderItem.innerHTML = `
                <div class="d-flex align-items-center">
                    <strong>${item.quantity}</strong> x <span class="ms-2">${item.name}</span>
                </div>
                <span>${item.price.toFixed(2)} €</span>
            `;
            
            itemsContainer.appendChild(orderItem); // Agregar el div del artículo al contenedor
        });

        // Actualizar el texto del elemento que muestra el precio total del carrito
        document.getElementById('total-price').textContent = totalPrice.toFixed(2) + ' €';
    } else {
        console.error("El contenedor de artículos del carrito no se encontró.");
    }
}
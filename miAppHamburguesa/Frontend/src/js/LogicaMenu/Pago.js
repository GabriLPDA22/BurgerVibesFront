// En Pago.js
document.addEventListener('DOMContentLoaded', function() {
    let storedCart = localStorage.getItem('carrito');
    // Asegúrate de que storedCart no solo exista, sino que también sea un objeto con la forma esperada
    if (storedCart) {
        let cart = JSON.parse(storedCart);
        // Confirma que cart es un objeto y tiene la propiedad 'items' que es un array
        if (cart && Array.isArray(cart.items)) {
            renderCartItems(cart.items); // Función para renderizar los artículos del carrito
            document.getElementById('total-price').textContent = cart.total + ' €'; // Actualiza el precio total
        }
    }
});
  
function renderCartItems(items) {
    let itemsContainer = document.querySelector('.my-3');
    if (itemsContainer) {
        itemsContainer.innerHTML = ''; // Limpiar el contenido actual
        
        items.forEach(function(item) {
            let orderItem = document.createElement('div');
            orderItem.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'border', 'rounded-3', 'p-3', 'my-3');
            
            orderItem.innerHTML = `
                <div class="d-flex align-items-center">
                    <strong>${item.quantity}</strong> x <span class="ms-2">${item.name}</span>
                </div>
                <span>${item.price.toFixed(2)} €</span>
            `;
            
            itemsContainer.appendChild(orderItem); // Agregar el div del artículo al contenedor
        });
    } else {
        console.error("El contenedor de artículos del carrito no se encontró.");
    }
}



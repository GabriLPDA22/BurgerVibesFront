

/*let productsJson = JSON.parse(localStorage.getItem('productsJson')) || {
    "productos": {
        "Entrantes": [
            { "id": 1, "nombre": "Nachos Rainforest", "precio": 12.5, "descripcion": "Inspired by Rainforest Cafe in Chicago. Corn chips, cheddar cream, guacamole, shredded meat, pico de gallo, and sour cream.", "disponible": true },
            { "id": 2, "nombre": "Pollo-Vibes", "precio": 9.5, "descripcion": "Boneless chicken thigh marinated and crispy fried, served with a jar of our homemade BBQ sauce.", "disponible": true },
            { "id": 3, "nombre": "Bacon Cheese Fries", "precio": 9.5, "descripcion": "Bacon cheese fries with our personal touch, with cheddar cream and chimichurri.", "disponible": true },
            { "id": 4, "nombre": "Alitas Thai", "precio": 8, "descripcion": "Chicken wings cooked at low temperature immersed in a spicy sauce capable of making your head fly.", "disponible": true },
            { "id": 5, "nombre": "Crunchy Taco 1 ud", "precio": 3, "descripcion": "Crispy tortilla filled with pulled pork, achiote, pico de gallo, guacamole, and pickled onions (1 ud).", "disponible": true }
        ],
        "Burgers": [
            { "id": 6, "nombre": "Old Mapache", "precio": 10.5, "descripcion": "Dry-aged ribeye beef, smoked gouda cheese, Argentine-style cheddar cream, bacon marmalade, BBQ-asia sauce, and Texan fries.", "disponible": true },
            { "id": 7, "nombre": "Divito", "precio": 12.5, "descripcion": "200g Dry Aged beef with 50 days of aging, slightly spicy secret cream at the base, smoked cheddar, and gouda cheese, smoked pancetta cooked at low temperature and marinated for 24 hours. All topped with a beer BBQ sauce.", "disponible": true },
            { "id": 8, "nombre": "Dotty Hawley", "precio": 14.5, "descripcion": "200g Dry Aged beef between 40 and 50 days of aging, Monterey Jack cheese, Dotty's Mac & Cheese recipe, Caesar BBQ sauce, and Doritos Bits.", "disponible": true },
            { "id": 9, "nombre": "Rufflera Hot", "precio": 16, "descripcion": "Serious bomb the burger of the month! Collaboration with Soul (love for real): 2 artisan donuts from Marisol bakery, aged ribeye beef, smoked cheese, smoked cheese sauce, bacon bits, and Ruffles flamin' hot! Limited units each day.", "disponible": true },
            { "id": 10, "nombre": "Chanante", "precio": 12.5, "descripcion": "200g Dry aged beef between 40 and 50 days of aging, crispy bacon, pickled red onion, double provolone cheese, pickle, and Vibes' gringo sauce.", "disponible": true },
            { "id": 11, "nombre": "Baile De Pollo", "precio": 11.5, "descripcion": "Crispy chicken marinated for 12 hours, cheddar cheese, pickle relish, pickled red onion, and Vibes' gringo sauce.", "disponible": true }
        ],
        "Postres": [
            { "id": 12, "nombre": "Lotus Cheesecake", "precio": 6, "descripcion": "Cheesecake with caramel and Lotus cookies.", "disponible": true },
            { "id": 13, "nombre": "Lion Cheesecake", "precio": 6, "descripcion": "Lion caramel cheesecake with an Oreo base.", "disponible": true },
            { "id": 14, "nombre": "Cheesecake", "precio": 6, "descripcion": "Smooth cheesecake with a cookie base.", "disponible": true }
        ],
        "Ensaladas": [
            { "id": 15, "nombre": "Ensalada Cesar", "precio": 8.5, "descripcion": "Grilled chicken sprinkled with grated cheese, garlic croutons, Caesar sauce on a base of romaine lettuce and croutons, accompanied by cherry tomatoes and anchovies.", "disponible": true },
            { "id": 16, "nombre": "Ensalada Vibes", "precio": 7, "descripcion": "Lettuce, tomato, onion, corn, tuna, boiled egg, carrot and beet.", "disponible": true },
            { "id": 17, "nombre": "Cob Salad", "precio": 7.5, "descripcion": "Mix of lettuces with juicy Cajun-style chicken, avocado, hard-boiled eggs, cherry tomatoes, and corn. Choice of blue cheese or Gingerey dressing.", "disponible": true }
        ],
        "Bebidas": [
            { "id": 18, "nombre": "Coca-cola Original", "precio": 2.5, "descripcion": "Classic cola soda.", "disponible": true },
            { "id": 19, "nombre": "Coca-cola Zero Zero", "precio": 2.5, "descripcion": "Sugar-free variant of Coca-cola.", "disponible": true },
            { "id": 20, "nombre": "Fanta Orange", "precio": 2.5, "descripcion": "Orange soda.", "disponible": true },
            { "id": 21, "nombre": "Fanta Lemon", "precio": 2.5, "descripcion": "Lemon soda.", "disponible": true },
            { "id": 22, "nombre": "Nestea", "precio": 2.5, "descripcion": "Iced tea.", "disponible": true },
            { "id": 23, "nombre": "Aquarius Orange", "precio": 2.5, "descripcion": "Isotonic drink with orange flavor.", "disponible": true },
            { "id": 24, "nombre": "Aquarius Lemon", "precio": 2.5, "descripcion": "Isotonic drink with lemon flavor.", "disponible": true },
            { "id": 25, "nombre": "Water", "precio": 1.9, "descripcion": "Mineral water bottle.", "disponible": true },
            { "id": 26, "nombre": "Ambar", "precio": 2.5, "descripcion": "Traditional beer.", "disponible": true }
        ]
    }
};

function loadProducts() {
    const categories = Object.keys(productsJson.productos);
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';

    categories.forEach(category => {
        productsJson.productos[category].forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.nombre}</td>
                <td>${product.descripcion}</td>
                <td>${product.precio}</td>
                <td>${product.disponible !== false ? 'Yes' : 'No'}</td>
                <td class="action-buttons">
                    <button onclick="confirmDelete(${product.id})">Delete</button>
                    <button onclick="confirmToggleAvailability(${product.id})">${product.disponible !== false ? 'Make Unavailable' : 'Make Available'}</button>
                    <button onclick="editProduct(${product.id})">Edit</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    });
}

function updateMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(menuItem => {
        const productId = parseInt(menuItem.id.replace('product', ''));
        const product = getProductById(productId);
        if (product) {
            const titleElement = menuItem.querySelector('.menu-item-title');
            const descriptionElement = menuItem.querySelector('.menu-item-description');
            const priceElement = menuItem.querySelector('.price');

            if (titleElement) titleElement.textContent = product.nombre;
            if (descriptionElement) descriptionElement.textContent = product.descripcion;
            if (priceElement) priceElement.textContent = `${product.precio.toFixed(2).replace('.', ',')} €`;

            menuItem.style.display = product.disponible ? 'block' : 'none';
        }
    });
}

function refreshProducts() {
    loadProducts();
    updateMenu();
    Swal.fire({
        title: 'Products Updated!',
        text: 'The products have been refreshed.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

function confirmDelete(productId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct(productId);
            Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
            )
        }
    })
}

function confirmToggleAvailability(productId) {
    const product = getProductById(productId);
    Swal.fire({
        title: `Are you sure you want to ${product.disponible ? 'make unavailable' : 'make available'} this product?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, ${product.disponible ? 'make unavailable' : 'make available'} it!`
    }).then((result) => {
        if (result.isConfirmed) {
            toggleAvailability(productId);
            Swal.fire(
                'Updated!',
                `Your product has been ${product.disponible ? 'made unavailable' : 'made available'}.`,
                'success'
            )
        }
    })
}

function deleteProduct(productId) {
    Object.keys(productsJson.productos).forEach(category => {
        productsJson.productos[category] = productsJson.productos[category].filter(product => product.id !== productId);
    });
    saveToLocalStorage();
    loadProducts();
}

function toggleAvailability(productId) {
    Object.keys(productsJson.productos).forEach(category => {
        const product = productsJson.productos[category].find(product => product.id === productId);
        if (product) {
            product.disponible = !product.disponible;
        }
    });
    saveToLocalStorage();
    loadProducts();
}

function editProduct(productId) {
    const product = getProductById(productId);
    if (product) {
        Swal.fire({
            title: 'Edit Product',
            html:
                `<input id="swal-input1" class="swal2-input" value="${product.nombre}">` +
                `<input id="swal-input2" class="swal2-input" value="${product.descripcion}">` +
                `<input id="swal-input3" class="swal2-input" type="number" value="${product.precio}">`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value
                ]
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const [name, description, price] = result.value;
                saveEdit(productId, name, description, parseFloat(price));
                Swal.fire(
                    'Updated!',
                    'Your product has been updated.',
                    'success'
                )
            }
        })
    }
}

function getProductById(productId) {
    let foundProduct = null;
    Object.keys(productsJson.productos).forEach(category => {
        const product = productsJson.productos[category].find(product => product.id === productId);
        if (product) {
            foundProduct = product;
        }
    });
    return foundProduct;
}

function saveEdit(id, name, description, price) {
    const product = getProductById(id);
    if (product) {
        product.nombre = name;
        product.descripcion = description;
        product.precio = price;
    }
    saveToLocalStorage();
    loadProducts();
}

function saveToLocalStorage() {
    localStorage.setItem('productsJson', JSON.stringify(productsJson));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('productsJson');
    if (data) {
        productsJson = JSON.parse(data);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    loadProducts();
    updateMenu(); // Actualiza el menú al cargar la página
});*/
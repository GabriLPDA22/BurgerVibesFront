// URL de la API para obtener productos
const urlProducts = 'http://localhost:8080/BuergerVibes/Controller?ACTION=PRODUCTO.FIND_ALL';

/**
 * Función para obtener productos de la API.
 * Realiza una solicitud HTTP GET a la URL de productos.
 * Si la solicitud tiene éxito, convierte la respuesta a JSON y llama a printProducts para mostrar los productos.
 * En caso de error, lo captura y muestra un mensaje de error en la consola.
 */
const fetchProducts = async () => {
    try {
        const result = await fetch(urlProducts);
        const data = await result.json();
        console.log('Productos obtenidos de la API:', data);
        printProducts(data);
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
};

/**
 * Función para imprimir los productos en una tabla.
 * @param {Array} products - Array de objetos de productos obtenidos de la API.
 */
const printProducts = (products) => {
    const table = document.getElementById('tablaProducto');
    const tbody = table.querySelector('tbody');
    table.style.display = 'table';
    tbody.innerHTML = ''; // Limpiar el contenido anterior

    products.forEach(product => {
        const {
            ID_Producto,
            Precio,
            Nombre,
            Descripcion,
            DisponibleEnVlc,
            DisponibleEnZgz,
            ID_Categoria_pro
        } = product;

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${ID_Producto}</td>
            <td>${Precio}</td>
            <td>${Nombre}</td>
            <td>${Descripcion}</td>
            <td>${DisponibleEnVlc}</td>
            <td>${DisponibleEnZgz}</td>
            <td>${ID_Categoria_pro}</td>
            <td class="action-buttons">
                <button onclick="openEditModal('${ID_Producto}', '${Precio}', '${Nombre}', '${Descripcion}', '${DisponibleEnVlc}', '${DisponibleEnZgz}', '${ID_Categoria_pro}')">Update</button>
                <button onclick="deleteProduct('${ID_Producto}')">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });
};

/**
 * Función para abrir el modal de edición con los datos del producto.
 * @param {string} ID_Producto - ID del producto.
 * @param {number} Precio - Precio del producto.
 * @param {string} Nombre - Nombre del producto.
 * @param {string} Descripcion - Descripción del producto.
 * @param {boolean} DisponibleEnVlc - Disponibilidad en VLC.
 * @param {boolean} DisponibleEnZgz - Disponibilidad en ZGZ.
 * @param {string} ID_Categoria_pro - ID de la categoría del producto.
 */
const openEditModal = (ID_Producto, Precio, Nombre, Descripcion, DisponibleEnVlc, DisponibleEnZgz, ID_Categoria_pro) => {
    Swal.fire({
        title: 'Editar Producto',
        html: `
            <input id="ID_Producto" type="hidden" value="${ID_Producto}">
            <input id="Precio" class="swal2-input" placeholder="Precio" value="${Precio}">
            <input id="Nombre" class="swal2-input" placeholder="Nombre" value="${Nombre}">
            <textarea id="Descripcion" class="swal2-textarea" placeholder="Descripcion">${Descripcion}</textarea>
            <input id="DisponibleEnVlc" class="swal2-input" placeholder="Disponible en VLC" value="${DisponibleEnVlc}">
            <input id="DisponibleEnZgz" class="swal2-input" placeholder="Disponible en ZGZ" value="${DisponibleEnZgz}">
            <input id="ID_Categoria_pro" class="swal2-input" placeholder="ID Categoria" value="${ID_Categoria_pro}">
        `,
        focusConfirm: false,
        preConfirm: () => {
            return {
                ID_Producto: document.getElementById('ID_Producto').value,
                Precio: document.getElementById('Precio').value,
                Nombre: document.getElementById('Nombre').value,
                Descripcion: document.getElementById('Descripcion').value,
                DisponibleEnVlc: document.getElementById('DisponibleEnVlc').value,
                DisponibleEnZgz: document.getElementById('DisponibleEnZgz').value,
                ID_Categoria_pro: document.getElementById('ID_Categoria_pro').value
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Datos actualizados:', result.value);
            updateProduct(result.value);
        }
    });
};

/**
 * Función para actualizar un producto en la base de datos.
 * @param {Object} product - Objeto con los datos del producto a actualizar.
 */
const updateProduct = async (product) => {
    const url = `http://localhost:8080/BuergerVibes/Controller?ACTION=PRODUCTO.UPDATE`;
    const params = new URLSearchParams({
        ID_PRODUCTO: product.ID_Producto,
        NOMBRE: product.Nombre,
        DESCRIPCION: product.Descripcion,
        PRECIO: product.Precio,
        ID_CATEGORIA_PRO: product.ID_Categoria_pro,
        DISPONIBLEENVLC: product.DisponibleEnVlc,
        DISPONIBLEENZGZ: product.DisponibleEnZgz
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });
        if (response.ok) {
            alert('Producto actualizado exitosamente.');
            fetchProducts(); // Actualizar la lista de productos después de la actualización
        } else {
            throw new Error('Error al actualizar producto.');
        }
    } catch (error) {
        console.error('Error al actualizar producto:', error);
    }
};

/**
 * Función para eliminar un producto de la base de datos.
 * @param {string} ID_Producto - ID del producto a eliminar.
 */
const deleteProduct = (ID_Producto) => {
    if (confirm(`¿Estás seguro de que quieres borrar el producto con ID: ${ID_Producto}?`)) {
        fetch(`http://localhost:8080/BuergerVibes/Controller?ACTION=PRODUCTO.DELETE&ID_PRODUCTO=${ID_Producto}`, {
            method: 'DELETE'
        })
            .then(response => {
                console.log('Respuesta del servidor:', response);
                if (response.ok) {
                    alert(`El producto con ID: ${ID_Producto} ha sido borrado.`);
                    fetchProducts(); // Actualiza la tabla después de borrar
                } else {
                    response.text().then(text => {
                        console.error('Error al borrar el producto:', text);
                        alert('No se pudo borrar el producto. Inténtelo de nuevo más tarde.');
                    });
                }
            })
            .catch(error => {
                console.error('Error en la solicitud DELETE:', error);
                alert('Ocurrió un error al intentar borrar el producto.');
            });
    }
};

/**
 * Función para inhabilitar un producto.
 * @param {string} ID_Producto - ID del producto a inhabilitar.
 */
const disableProduct = (ID_Producto) => {
    alert(`Inhabilitar el producto con ID: ${ID_Producto}`);
};

/**
 * Función para añadir un nuevo producto.
 * Abre un modal para ingresar los datos del nuevo producto.
 */
const addProduct = () => {
    Swal.fire({
        title: 'Añadir Producto',
        html: `
            <input id="ID_Producto" class="swal2-input" placeholder="ID del producto">
            <input id="Precio" class="swal2-input" placeholder="Precio">
            <input id="Nombre" class="swal2-input" placeholder="Nombre">
            <textarea id="Descripcion" class="swal2-textarea" placeholder="Descripcion"></textarea>
            <input id="DisponibleEnVlc" class="swal2-input" placeholder="Disponible en VLC">
            <input id="DisponibleEnZgz" class="swal2-input" placeholder="Disponible en ZGZ">
            <input id="ID_Categoria_pro" class="swal2-input" placeholder="ID Categoria">
        `,
        focusConfirm: false,
        preConfirm: () => {
            return {
                ID_Producto: document.getElementById('ID_Producto').value,
                Precio: document.getElementById('Precio').value,
                Nombre: document.getElementById('Nombre').value,
                Descripcion: document.getElementById('Descripcion').value,
                DisponibleEnVlc: document.getElementById('DisponibleEnVlc').value,
                DisponibleEnZgz: document.getElementById('DisponibleEnZgz').value,
                ID_Categoria_pro: document.getElementById('ID_Categoria_pro').value
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Nuevo producto:', result.value);
            createProduct(result.value);
        }
    });
};

/**
 * Función para crear un nuevo producto en la base de datos.
 * @param {Object} newProduct - Objeto con los datos del nuevo producto.
 */
const createProduct = async (newProduct) => {
    const {
        ID_Producto,
        Precio,
        Nombre,
        Descripcion,
        DisponibleEnVlc,
        DisponibleEnZgz,
        ID_Categoria_pro
    } = newProduct;

    const url = `http://localhost:8080/BuergerVibes/Controller?ACTION=PRODUCTO.ADD&ID_PRODUCTO=${ID_Producto}&PRECIO=${Precio}&NOMBRE=${Nombre}&DESCRIPCION=${Descripcion}&DISPONIBLEENVLC=${DisponibleEnVlc}&DISPONIBLEENZGZ=${DisponibleEnZgz}&ID_CATEGORIA_PRO=${ID_Categoria_pro}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(newProduct)
        });
        if (!response.ok) {
            throw new Error('Error al crear el producto.');
        }
        console.log('Producto creado exitosamente');
        Swal.fire('Producto creado', '', 'success');
        fetchProducts(); // Actualiza la tabla de productos después de la creación
    } catch (error) {
        console.error('Error al crear el producto:', error);
        Swal.fire('Error al crear el producto', error.message, 'error');
    }
};

// Asignar eventos a los botones de actualizar y añadir producto
document.getElementById('updateButton').addEventListener('click', fetchProducts);
document.getElementById('addButton').addEventListener('click', addProduct);

// Obtener y mostrar los productos cuando se carga la página
fetchProducts();

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

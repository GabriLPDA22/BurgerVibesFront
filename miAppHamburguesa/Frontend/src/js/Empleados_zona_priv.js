// URL de la API para obtener empleados
const urlEmployees = 'http://localhost:8080/BuergerVibes/Controller?ACTION=EMPLEADO.FIND_ALL';

/**
 * Función para obtener empleados de la API.
 * Realiza una solicitud HTTP GET a la URL de empleados.
 * Si la solicitud tiene éxito, convierte la respuesta a JSON y llama a printEmployees para mostrar los empleados.
 * En caso de error, lo captura y muestra un mensaje de error en la consola.
 */
const fetchEmployees = async () => {
    try {
        // Realizar solicitud a la API
        const result = await fetch(urlEmployees);
        if (!result.ok) {
            throw new Error('Network response was not ok');
        }
        // Convertir la respuesta a JSON
        const data = await result.json();
        console.log('Empleados obtenidos de la API:', data);
        // Imprimir los empleados en la tabla
        printEmployees(data);
    } catch (error) {
        // Manejar errores de la solicitud
        console.error('Error al obtener datos de la API:', error);
    }
};

/**
 * Función para imprimir los empleados en una tabla.
 * @param {Array} employees - Array de objetos de empleados obtenidos de la API.
 */
const printEmployees = (employees) => {
    // Obtener la tabla y su tbody
    const table = document.getElementById('tablaEmpleado');
    const tbody = table.querySelector('tbody');
    // Mostrar la tabla
    table.style.display = 'table';

    // Limpiar el tbody antes de agregar nuevas filas
    tbody.innerHTML = '';

    // Iterar sobre cada empleado y crear filas de la tabla
    employees.forEach(employee => {
        const {
            ID_Empleado,
            Nombre,
            Apellidos,
            Direccion,
            Cargo,
            Email,
            Telefono,
            ID_ZonaPrivada_EMP,
            Contrasena
        } = employee;

        const row = document.createElement('tr');

        // Añadir contenido HTML a la fila
        row.innerHTML = `
            <td>${ID_Empleado}</td>
            <td>${Nombre}</td>
            <td>${Apellidos}</td>
            <td>${Direccion}</td>
            <td>${Cargo}</td>
            <td>${Email}</td>
            <td>${Telefono}</td>
            <td>${ID_ZonaPrivada_EMP}</td>
            <td>${Contrasena}</td>
        `;

        // Añadir la fila al tbody
        tbody.appendChild(row);
    });
};

// Llamar a la función fetchEmployees para obtener y mostrar los empleados cuando se carga la página
fetchEmployees();

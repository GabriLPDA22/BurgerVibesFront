const urlEmployees = 'http://localhost:8080/BuergerVibes/Controller?ACTION=EMPLEADO.FIND_ALL';

const fetchEmployees = async () => {
    try {
        const result = await fetch(urlEmployees);
        if (!result.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await result.json();
        console.log('Empleados obtenidos de la API:', data);
        printEmployees(data);
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
};

const printEmployees = (employees) => {
    const table = document.getElementById('tablaEmpleado');
    const tbody = table.querySelector('tbody');
    table.style.display = 'table';

    // Limpiar el tbody antes de agregar nuevas filas
    tbody.innerHTML = '';

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
            Contrasena,
            
        } = employee;

        const row = document.createElement('tr');

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

        tbody.appendChild(row);
    });
};

fetchEmployees();
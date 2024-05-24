const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const cors = require('cors');


oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
  user: 'admin',
  password: '123456789',
  connectString: 'burgervibesbbdd.ceotvomboedr.us-east-1.rds.amazonaws.com:1521/orcl'
};

let pool;

async function init() {
  try {
    pool = await oracledb.createPool(dbConfig);
    console.log('Pool created');

    app.listen(8080, () => {
      console.log('Server is running on port 8080');
    });
  } catch (err) {
    console.error('Error creating pool', err);
  }
}

init();

// Ruta principal que verifica si el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Server is running');
});

/* LOGIN Y REGISTRO CLIENTE */

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
  // Extrae los datos del cuerpo de la solicitud
  const {
    username,
    email,
    password,
    name,
    address,
    phone
  } = req.body;
  // Genera un ID único para el cliente basado en la marca de tiempo actual
  const idCliente = new Date().getTime().toString();
  // Obtiene la fecha actual en formato YYYY-MM-DD
  const fechaRegistro = new Date().toISOString().split('T')[0];
  let connection;

  console.log('Datos recibidos del formulario:', req.body); // Depuración

  try {
    // Conéctate a la base de datos
    connection = await oracledb.getConnection(dbConfig);

    // Verifica si el usuario o el email ya existen
    const result = await connection.execute(
      `SELECT COUNT(*) AS COUNT FROM CLIENTE WHERE EMAIL = :email OR NOMBRE_USUARIO = :username`, {
        email,
        username
      }
    );

    const userExists = result.rows[0][0] > 0;

    if (userExists) {
      // Si el usuario ya existe, envía un mensaje de error
      res.status(400).send({
        message: 'El usuario ya existe. Inicia sesión.'
      });
    } else {
      // Si el usuario no existe, inserta los datos del nuevo usuario en la base de datos
      const insertSQL = `
        INSERT INTO CLIENTE (ID_CLIENTE, NOMBRE_USUARIO, EMAIL, CONTRASEÑA, NOMBRE, DIRECCION, TELEFONO, FECHAREGISTRO)
        VALUES (:idCliente, :username, :email, :password, :name, :address, :phone, TO_DATE(:fechaRegistro, 'YYYY-MM-DD'))
      `;

      const bindParams = {
        idCliente,
        username,
        email,
        password,
        name,
        address,
        phone,
        fechaRegistro
      };

      console.log('Ejecutando SQL:', insertSQL);
      console.log('Con parámetros:', bindParams);

      const resultInsert = await connection.execute(insertSQL, bindParams, {
        autoCommit: true
      });

      console.log('Resultado de la inserción:', resultInsert); // Depuración

      // Envía una respuesta de éxito
      res.send({
        message: 'Registro exitoso',
        username,
        email
      });
    }
  } catch (err) {
    // Manejo de errores
    console.error("Error al registrar el usuario:", err);
    res.status(500).send(`Error al registrar el usuario: ${err.message}`);
  } finally {
    // Cierra la conexión a la base de datos
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error al cerrar la conexión:", err);
      }
    }
  }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
  const {
    usernameEmail,
    password
  } = req.body;
  let connection;

  try {
    // Conéctate a la base de datos
    connection = await oracledb.getConnection(dbConfig);

    // Verifica las credenciales del usuario
    const result = await connection.execute(
      `SELECT ID_CLIENTE, NOMBRE_USUARIO, EMAIL FROM CLIENTE WHERE (EMAIL = :usernameEmail OR NOMBRE_USUARIO = :usernameEmail) AND CONTRASEÑA = :password`, {
        usernameEmail,
        password
      }
    );

    if (result.rows.length > 0) {
      // Si las credenciales son correctas, envía los datos del usuario
      const user = result.rows[0];
      console.log('Datos del usuario:', user); // Depuración
      res.send({
        message: 'Inicio de sesión exitoso',
        idCliente: user[0],
        username: user[1],
        email: user[2]
      });
    } else {
      // Si las credenciales son incorrectas, envía un mensaje de error
      res.status(401).send({
        message: 'Credenciales incorrectas'
      });
    }
  } catch (err) {
    // Manejo de errores
    res.status(500).send(`Error al iniciar sesión: ${err.message}`);
  } finally {
    // Cierra la conexión a la base de datos
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error al cerrar la conexión:", err);
      }
    }
  }
});



/**LOGIN EMPLEADOS Y ADMINISTRADORES */

app.post('/loginAdminEmpleado', async (req, res) => {
  const {
    email,
    password
  } = req.body;

  console.log(`Verificando credenciales para ${email}`);

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('Conexión a la base de datos exitosa');

    const result = await connection.execute(
      'SELECT EMAIL, ID_ZONAPRIVADA_EMP, CARGO FROM EMPLEADO WHERE EMAIL = :email AND CONTRASENA = :password',
      [email, password], {
        outFormat: oracledb.OUT_FORMAT_OBJECT
      }
    );

    console.log('Resultado de la consulta:', result);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const zoneId = user.ID_ZONAPRIVADA_EMP;
      const cargo = user.CARGO;

      if (zoneId === 'A001') {
        res.json({
          message: 'Inicio de sesión exitoso',
          role: 'admin',
          email: user.EMAIL
        });
      } else if (zoneId === 'E001') {
        res.json({
          message: 'Inicio de sesión exitoso',
          role: 'employee',
          email: user.EMAIL,
          cargo
        });
      } else {
        res.status(401).json({
          message: 'Credenciales incorrectas'
        });
      }
    } else {
      res.status(401).json({
        message: 'Credenciales incorrectas'
      });
    }
  } catch (error) {
    console.error('Error al intentar iniciar sesión:', error);
    res.status(500).json({
      message: `Error al iniciar sesión: ${error.message}`
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Conexión a la base de datos cerrada');
      } catch (error) {
        console.error('Error al cerrar la conexión a la base de datos:', error);
      }
    }
  }
});

app.post('/employeeInfo', async (req, res) => {
  const {
    email
  } = req.body;

  console.log(`Obteniendo información para el email: ${email}`);

  if (!email) {
    console.error('Email no proporcionado en la solicitud');
    res.status(400).json({
      message: 'Email no proporcionado'
    });
    return;
  }

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('Conexión a la base de datos exitosa');

    const result = await connection.execute(
      'SELECT NOMBRE, APELLIDOS, CARGO, EMAIL, TELEFONO, DIRECCION FROM EMPLEADO WHERE EMAIL = :email',
      [email], {
        outFormat: oracledb.OUT_FORMAT_OBJECT
      }
    );

    console.log('Resultado de la consulta:', result);

    if (result.rows.length > 0) {
      console.log('Información del empleado encontrada:', result.rows[0]);
      res.json(result.rows[0]);
    } else {
      console.log('Empleado no encontrado');
      res.status(404).json({
        message: 'Empleado no encontrado'
      });
    }
  } catch (error) {
    console.error('Error al obtener la información del empleado:', error);
    res.status(500).json({
      message: `Error al obtener la información del empleado: ${error.message}`
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Conexión a la base de datos cerrada');
      } catch (error) {
        console.error('Error al cerrar la conexión a la base de datos:', error);
      }
    }
  }
});


/* PAGO DEL CLIENTE */


app.post('/api/pedido', async (req, res) => {
  const { fullName, phoneNumber, email, address, pickupTime, restaurantNote, promoCode, cardNumber, cardExpiry, country, items, totalPedido, idCliente, idEmpleado } = req.body;

  let connection;

  try {
    connection = await pool.getConnection();
    console.log('Conexión a la base de datos exitosa');
    console.log('Datos recibidos para el pedido:', {
      idCliente,
      idEmpleado,
      fullName,
      phoneNumber,
      email,
      address,
      pickupTime,
      restaurantNote,
      promoCode,
      cardNumber,
      cardExpiry,
      country,
      totalPedido,
      items
    });

    const resultPedido = await connection.execute(
      `INSERT INTO PEDIDO (FECHA, TIPOENTREGA, ID_CLIENTE_PED, ID_EMPLEADO_PED, CANTIDAD)
       VALUES (SYSDATE, 'PICKUP', :idCliente, :idEmpleado, :cantidad) RETURNING ID_PEDIDO INTO :idPedido`,
      { idCliente, idEmpleado, cantidad: items.length, idPedido: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT } }
    );

    const idPedido = resultPedido.outBinds.idPedido[0];
    console.log('ID Pedido insertado:', idPedido);

    const resultDetalle = await connection.execute(
      `INSERT INTO DETALLESPEDIDO (ID_DETALLES, ID_PEDIDO_DET, NOMBRE, TELEFONO, EMAIL, DIRECCION, HORA_ENTREGA, NOTA, COD_PROMOCIONAL, TOTALPEDIDO)
       VALUES (DETALLESPEDIDO_SEQ.NEXTVAL, :idPedido, :fullName, :phoneNumber, :email, :address, :pickupTime, :restaurantNote, :promoCode, :totalPedido)`,
      { idPedido, fullName, phoneNumber, email, address, pickupTime, restaurantNote, promoCode, totalPedido }
    );

    console.log('ID Detalle insertado:', resultDetalle.outBinds);

    await connection.execute(
      `INSERT INTO PAGO (METODOPAGO, ID_PEDIDO_PAG, NUM_TARJETA, EXPIRACION, PAIS)
       VALUES ('CARD', :idPedido, :cardNumber, :cardExpiry, :country)`,
      { idPedido, cardNumber, cardExpiry, country }
    );

    await connection.commit();
    res.json({ message: 'Pedido realizado con éxito' });
  } catch (error) {
    console.error('Error al realizar el pedido:', error);
    res.status(500).json({ message: 'Error al realizar el pedido' });
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Conexión a la base de datos cerrada');
      } catch (error) {
        console.error('Error al cerrar la conexión a la base de datos:', error);
      }
    }
  }
});

app.get('/api/pedido', async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();
    console.log('Conexión a la base de datos exitosa');

    const result = await connection.execute(
      `SELECT NOMBRE, TO_CHAR(PEDIDO.FECHA, 'DD-MM-YYYY HH24:MI:SS') AS FECHA, DETALLESPEDIDO.HORA_ENTREGA, DETALLESPEDIDO.NOTA 
       FROM PEDIDO 
       JOIN DETALLESPEDIDO ON PEDIDO.ID_PEDIDO = DETALLESPEDIDO.ID_PEDIDO_DET
       ORDER BY PEDIDO.FECHA DESC`,
      [], {
        outFormat: oracledb.OUT_FORMAT_OBJECT
      }
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener el pedido:', error);
    res.status(500).json({
      message: 'Error al obtener el pedido'
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Conexión a la base de datos cerrada');
      } catch (error) {
        console.error('Error al cerrar la conexión a la base de datos:', error);
      }
    }
  }
});


/**PEDIDOS DE LA PERSONA PARA QUE LOS VEA */

/*app.get('/api/pedidos', async (req, res) => {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('Conexión a la base de datos exitosa');

    const result = await connection.execute(
      'SELECT * FROM PEDIDO',
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({
        message: 'No se encontraron pedidos'
      });
    }
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ message: 'Error al obtener los pedidos' });
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Conexión a la base de datos cerrada');
      } catch (error) {
        console.error('Error al cerrar la conexión a la base de datos:', error);
      }
    }
  }
});*/



// Ruta para procesar el pedido del cliente
/*app.post('/procesar-pedido', async (req, res) => {
  console.log("Solicitud recibida en /procesar-pedido con datos:", req.body);

  const {
    nombre,
    telefono,
    email,
    direccion,
    horaEntrega,
    nota,
    codPromocional,
    items,
    totalPedido,
    metodoPago,
    numTarjeta,
    expiracion,
    pais,
    idCliente,
    idEmpleado
  } = req.body;

  if (!idCliente || !idEmpleado) {
    return res.status(400).json({ message: 'idCliente y idEmpleado son requeridos' });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'El carrito está vacío.' });
  }

  const notaCompleta = nota ? "Sí" : "No";
  const codPromocionalCompleto = codPromocional ? "Sí" : "No";
  const formattedExpiracion = convertExpirationDate(expiracion);
  const formattedHoraEntrega = formatPickupTime(horaEntrega);

  let connection;

  try {
    // Conéctate a la base de datos
    connection = await oracledb.getConnection(dbConfig);
    console.log("Conexión a la base de datos exitosa");

    // Insertar pago en la base de datos
    const pagoResult = await connection.execute(
      `INSERT INTO PAGO (ID_PAGO, METODOPAGO, NUM_TARJETA, EXPIRACION, PAIS)
       VALUES (PAGO_SEQ.NEXTVAL, metodoPago, numTarjeta, TO_DATE(expiracion, 'DD/MM/YYYY'), :pais) 
       RETURNING ID_PAGO INTO id_pago_out`,
      {
        metodoPago,
        numTarjeta,
        expiracion: formattedExpiracion,
        pais,
        id_pago_out: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: false }
    );

    const pagoId = pagoResult.outBinds.id_pago_out[0];
    console.log("ID del pago insertado:", pagoId);

    // Insertar pedido en la base de datos
    const pedidoResult = await connection.execute(
      `INSERT INTO PEDIDO (ID_PEDIDO, FECHA, TIPOENTREGA, ID_CLIENTE_PED, ID_EMPLEADO_PED, CANTIDAD) 
       VALUES (id_pedido, SYSDATE, 'Domicilio', idCliente, idEmpleado, cantidad) 
       RETURNING ID_PEDIDO INTO id_pedido_out`,
      {
        id_pedido: pagoId, // Usa el ID de pago como ID del pedido
        idCliente,
        idEmpleado,
        cantidad: totalPedido,
        id_pedido_out: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: false }
    );

    const pedidoId = pedidoResult.outBinds.id_pedido_out[0];
    console.log("ID del pedido insertado:", pedidoId);

    // Insertar detalles del pedido en la base de datos
    for (const item of items) {
      await connection.execute(
        `INSERT INTO DETALLESPEDIDO (ID_DETALLES, TOTALPEDIDO, ID_PEDIDO_DET, ID_PRODUCTO_DET, NOMBRE, TELEFONO, EMAIL, DIRECCION, HORA_ENTREGA, NOTA, COD_PROMOCIONAL)
         VALUES (id_detalles, totalPedido, pedidoId, productoId, nombre, telefono, email, direccion, TO_DATE(horaEntrega, 'HH24:MI'), notaCompleta, codPromocionalCompleto)`,
        {
          id_detalles: `${pedidoId}-${item.name}`, // Usando `item.name` para construir el id_detalles
          totalPedido,
          pedidoId,
          productoId: item.name, // Asegúrate de que item.name es el identificador correcto
          nombre,
          telefono,
          email,
          direccion,
          horaEntrega: formattedHoraEntrega,
          notaCompleta,
          codPromocionalCompleto
        },
        { autoCommit: false }
      );
      console.log(`Detalle del pedido insertado para el item ${item.name}`);
    }

    // Actualizar la tabla PAGO con el ID del pedido
    await connection.execute(
      `UPDATE PAGO SET ID_PEDIDO_PAG = :pedidoId WHERE ID_PAGO = :pagoId`,
      { pedidoId, pagoId },
      { autoCommit: false }
    );

    await connection.commit();
    console.log("Transacción completada exitosamente");

    res.json({ message: 'Pedido y pago procesados exitosamente', pedidoId });
  } catch (err) {
    console.error("Error al procesar el pedido y pago:", err);
    if (connection) {
      try {
        console.log("Realizando rollback de la transacción");
        await connection.rollback();
      } catch (rollbackErr) {
        console.error("Error al hacer rollback:", rollbackErr);
      }
    }
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("Conexión a la base de datos cerrada");
      } catch (err) {
        console.error("Error al cerrar la conexión:", err);
      }
    }
  }
});*/


// Función para convertir la fecha de vencimiento del formato 'MM/YY' a 'DD/MM/YYYY'
/*function convertExpirationDate(expiration) {
  const [month, year] = expiration.split('/');
  const fullYear = parseInt(year, 10) < 50 ? `20${year}` : `19${year}`;
  return `01/${month}/${fullYear}`;
}

// Función para formatear la hora de recogida en formato 'HH:MM:SS'
function formatPickupTime(time) {
  return `${time}:00`;
}*/
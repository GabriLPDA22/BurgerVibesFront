const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
  user: 'admin',
  password: '123456789',
  connectString: 'burgervibesbbdd.ceotvomboedr.us-east-1.rds.amazonaws.com:1521/orcl'
};

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
  const { username, email, password, name, address, phone } = req.body;
  const idCliente = new Date().getTime().toString();
  const fechaRegistro = new Date().toISOString().split('T')[0];
  let connection;

  console.log('Datos recibidos del formulario:', req.body);  // Añadir depuración aquí

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT COUNT(*) AS COUNT FROM CLIENTE WHERE EMAIL = :email OR NOMBRE_USUARIO = :username`,
      { email, username }
    );

    const userExists = result.rows[0][0] > 0;

    if (userExists) {
      res.status(400).send({ message: 'El usuario ya existe. Inicia sesión.' });
    } else {
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

      const resultInsert = await connection.execute(insertSQL, bindParams, { autoCommit: true });

      console.log('Resultado de la inserción:', resultInsert);  // Añadir depuración aquí

      res.send({ message: 'Registro exitoso', username, email });
    }
  } catch (err) {
    console.error("Error al registrar el usuario:", err);
    res.status(500).send(`Error al registrar el usuario: ${err.message}`);
  } finally {
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
  const { usernameEmail, password } = req.body;
  let connection;

  console.log('Datos de inicio de sesión recibidos:', req.body);  // Añadir depuración aquí

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT NOMBRE_USUARIO, EMAIL FROM CLIENTE WHERE (EMAIL = :usernameEmail OR NOMBRE_USUARIO = :usernameEmail) AND CONTRASEÑA = :password`,
      { usernameEmail, password }
    );

    console.log('Resultado de la consulta:', result);  // Añadir depuración aquí

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.send({ message: 'Inicio de sesión exitoso', username: user[0], email: user[1] });
    } else {
      res.status(401).send({ message: 'Credenciales incorrectas' });
    }
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    res.status(500).send(`Error al iniciar sesión: ${err.message}`);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error al cerrar la conexión:", err);
      }
    }
  }
});

// Iniciar el servidor
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

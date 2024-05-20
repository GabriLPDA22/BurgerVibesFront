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

// Ruta para probar la conexión a la base de datos
app.get('/test-connection', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    res.send('Conexión exitosa a la base de datos Oracle');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al conectar a la base de datos Oracle');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

// Ruta para autocompletado
app.get('/autocomplete', async (req, res) => {
  const query = req.query.q;
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT NOMBRE, EMAIL, NOMBRE_USUARIO 
       FROM CLIENTE 
       WHERE LOWER(NOMBRE) LIKE :query OR LOWER(EMAIL) LIKE :query OR LOWER(NOMBRE_USUARIO) LIKE :query`,
      { query: `%${query.toLowerCase()}%` }
    );

    const users = result.rows.map(row => ({
      NOMBRE: row[0],
      EMAIL: row[1],
      NOMBRE_USUARIO: row[2]
    }));

    res.json(users);
  } catch (err) {
    console.error("Error en la consulta de autocompletado:", err);
    res.status(500).send('Error al consultar la base de datos');
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

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body; // Cambiamos para recibir username y email por separado
  const idCliente = new Date().getTime().toString(); // Generar un ID único basado en el timestamp
  const fechaRegistro = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Verificar si el usuario ya existe
    const result = await connection.execute(
      `SELECT COUNT(*) AS COUNT FROM CLIENTE WHERE EMAIL = :email OR NOMBRE_USUARIO = :username`,
      { email, username }
    );

    const userExists = result.rows[0][0] > 0;

    if (userExists) {
      res.status(400).send({ message: 'El usuario ya existe. Inicia sesión.' });
    } else {
      // Insertar nuevo usuario
      await connection.execute(
        `INSERT INTO CLIENTE (ID_CLIENTE, NOMBRE_USUARIO, EMAIL, CONTRASEÑA, FECHAREGISTRO)
         VALUES (:idCliente, :username, :email, :password, TO_DATE(:fechaRegistro, 'YYYY-MM-DD'))`,
        { idCliente, username, email, password, fechaRegistro },
        { autoCommit: true }
      );
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

  try {
    connection = await oracledb.getConnection(dbConfig);

    // Verificar las credenciales del usuario
    const result = await connection.execute(
      `SELECT NOMBRE_USUARIO, EMAIL FROM CLIENTE WHERE (EMAIL = :usernameEmail OR NOMBRE_USUARIO = :usernameEmail) AND CONTRASEÑA = :password`,
      { usernameEmail, password }
    );

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

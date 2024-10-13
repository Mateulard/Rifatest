const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'rifas_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Ruta principal
app.get("/", (req, res) => {
  return res.json("Esta porquería anda");
});

// Ruta para crear una nueva rifa
app.post('/crearRifa', (req, res) => {
  const { nombre, organizacion, numeros, crearBonos, cantidadBonos, cuotas, valorCuota } = req.body;
  const sql = `INSERT INTO rifas (nombre, organizacion, numeros, crearBonos, cantidadBonos, cuotas, valorCuota) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
  db.query(sql, [nombre, organizacion, numeros, crearBonos, cantidadBonos, cuotas, valorCuota], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).send('Rifa creada con éxito');
  });
});

// Ruta para obtener todas las rifas
app.get('/rifas', (req, res) => {
  const sql = 'SELECT * FROM rifas';
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Obtener vendedores
app.get('/vendedores', (req, res) => {
  const sql = 'SELECT * FROM vendedores';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    return res.json(results);
  });
});

// Obtener cobradores
app.get('/cobradores', (req, res) => {
  const sql = 'SELECT * FROM cobradores';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    return res.json(results);
  });
});

// Obtener instituciones
app.get('/organizaciones', (req, res) => {
  const sql = 'SELECT * FROM organizaciones';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    return res.json(results);
  });
});

// Crear cobrador
app.post('/cobradores', (req, res) => {
  const { nombre, dni } = req.body;
  const sql = 'INSERT INTO cobradores (nombre, dni) VALUES (?, ?)';
  
  db.query(sql, [nombre, dni], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).send('Cobrador creado con éxito');
  });
});

// Crear vendedor
app.post('/vendedores', (req, res) => {
  const { nombre, dni } = req.body;
  const sql = 'INSERT INTO vendedores (nombre, dni) VALUES (?, ?)';
  
  db.query(sql, [nombre, dni], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).send('Vendedor creado con éxito');
  });
});

app.post('/cobradores', (req, res) => {
  const { nombre, dni, direccion, localidad, telefono, cargo, comisiones, email } = req.body;
  const sql = 'INSERT INTO cobradores (nombre, dni, direccion, localidad, telefono, cargo, comisiones, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [nombre, dni, direccion, localidad, telefono, cargo, comisiones, email], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).send('Cobrador creado con éxito');
  });
});


app.post('/vendedores', (req, res) => {
  const { nombre, dni, direccion, localidad, telefono, cargo, comisiones, email } = req.body;
  const sql = 'INSERT INTO vendedores (nombre, dni, direccion, localidad, telefono, cargo, comisiones, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [nombre, dni, direccion, localidad, telefono, cargo, comisiones, email], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al crear vendedor' });
    return res.status(200).json({ message: 'Vendedor creado con éxito' });
  });
});


app.post('/organizaciones', (req, res) => {
  const { nombre, Cuit, direccion, localidad, telefono, comisiones, email } = req.body;
  const sql = 'INSERT INTO organizaciones (nombre, Cuit, direccion, localidad, telefono, comisiones, email) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [nombre, Cuit, direccion, localidad, telefono, comisiones, email], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al crear organización' });
    return res.status(200).json({ message: 'Organización creada con éxito' });
  });
});



// Iniciar el servidor
app.listen(4000, () => {
  console.log("Servidor corriendo en el puerto 4000");
});

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Conectar a la base de datos SQLite
let db = new sqlite3.Database('./db/usuarios.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conectado a la base de datos SQLite.');
});

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  username TEXT UNIQUE,
  password TEXT
)`, (err) => {
  if (err) {
    console.error(err.message);
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/login', (req, res) => {
  const { email, username, password } = req.body;
  db.get(`SELECT * FROM usuarios WHERE email = ? AND username = ? AND password = ?`, [email, username, password], (err, row) => {
    if (err) {
      res.status(500).send('Error del servidor');
    } else if (row) {
      res.redirect('/sesion.html');
    } else {
      res.send('<p>Usuario no válido. Intente nuevamente.</p><a href="/">Volver</a>');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Conectar a la base de datos SQLite
let db = new sqlite3.Database('./db/usuarios.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a la base de datos SQLite.');
});

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta para manejar el registro de usuarios
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    
    db.get(`SELECT * FROM usuarios WHERE username = ? OR email = ?`, [username, email], (err, row) => {
        if (err) {
            res.status(500).send('Error del servidor');
        } else if (row) {
            res.send('Usuario o correo electrónico ya existente.');
        } else {
            db.run(`INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)`, [username, email, password], (err) => {
                if (err) {
                    res.status(500).send('Error al registrar el usuario');
                } else {
                    res.redirect('/login.html');
                }
            });
        }
    });
});

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM usuarios WHERE username = ? AND password = ?`, [username, password], (err, row) => {
        if (err) {
            res.status(500).send('Error del servidor');
        } else if (!row) {
            res.send('Nombre de usuario o contraseña incorrectos.');
        } else {
            res.send('Inicio de sesión exitoso.');  // Aquí podrías redirigir a otra página o manejar la sesión del usuario
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Conectar a la base de datos SQLite
let db = new sqlite3.Database('./db/usuarios.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a la base de datos SQLite.');
});

// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta para manejar el registro de usuarios
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    
    db.get(`SELECT * FROM usuarios WHERE username = ? OR email = ?`, [username, email], (err, row) => {
        if (err) {
            res.status(500).send('Error del servidor');
        } else if (row) {
            res.send('Usuario o correo electrónico ya existente.');
        } else {
            db.run(`INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)`, [username, email, password], (err) => {
                if (err) {
                    res.status(500).send('Error al registrar el usuario');
                } else {
                    res.redirect('/registrado.html');
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

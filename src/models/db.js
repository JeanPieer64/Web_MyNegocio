const mysql = require('mysql');

// 1. PRIMERO definimos la constante 'db' usando la configuración
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// 2. AHORA SÍ podemos usar 'db' porque ya existe
db.connect((err) => {
    if (err) {
        console.error('Error al conectar: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = db;
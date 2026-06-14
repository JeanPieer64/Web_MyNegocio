const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '', // Tu clave local aquí (si tienes)
    database: process.env.DB_NAME || 'mynegocio', // Tu base de datos local
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

module.exports = db;

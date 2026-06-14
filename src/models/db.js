const mysql = require('mysql2');

// Configuración de la conexión a tu base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jeanpieer', // <-- Si tienes contraseña en tu MySQL (XAMPP/Workbench), ponla aquí
    database: 'BDMynegocio'
});

// Probar la conexión
conexion.connect((err) => {
    if (err) {
        console.error('Error crítico al conectar a bdmynegocio:', err);
        return;
    }
    console.log('¡Conectado exitosamente a la base de datos bdmynegocio! 🛢️');
});

module.exports = conexion;
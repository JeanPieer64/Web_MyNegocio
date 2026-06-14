const express = require('express');
const path = require('path');
const db = require('./src/models/db');

const app = express();
const port = 3000;

// ==========================================
// 1. CONFIGURACIONES
// ==========================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar la carpeta pública (para tu CSS e imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Habilitar la lectura de datos de formularios (POST)
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 2. IMPORTAR Y USAR RUTAS 
// ==========================================
const indexRoutes = require('./src/routes/indexRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes');
const productoRoutes = require('./src/routes/productoRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes');
const reporteRoutes = require('./src/routes/reporteRoutes');
const empleadoRoutes = require('./src/routes/empleadoRoutes'); // <-- Importar empleados

// Le decimos a la app que conecte todas las rutas
app.use(indexRoutes);
app.use(clienteRoutes);
app.use('/productos', productoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use(reporteRoutes);
app.use('/empleados', empleadoRoutes); // <-- ¡ESTA ES LA LÍNEA QUE FALTABA!

// ==========================================
// 3. ENCENDER EL SERVIDOR
// ==========================================
app.listen(port, () => {
    console.log(`¡Servidor web encendido y listo en http://localhost:${port}`);
});
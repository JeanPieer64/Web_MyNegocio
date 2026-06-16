const express = require('express');
const path = require('path');
const db = require('./src/models/db');

const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));


const indexRoutes = require('./src/routes/indexRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes');
const productoRoutes = require('./src/routes/productoRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes');
const reporteRoutes = require('./src/routes/reporteRoutes');
const empleadoRoutes = require('./src/routes/empleadoRoutes');

app.use(indexRoutes);
app.use(clienteRoutes);
app.use('/productos', productoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use(reporteRoutes);
app.use('/empleados', empleadoRoutes); 


app.listen(port, () => {
    console.log(`¡Servidor web encendido y listo en http://localhost:${port}`);
});
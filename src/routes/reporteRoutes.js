const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

// Definir la URL /reportes
router.get('/reportes', reporteController.mostrarPantallaReportes);

// Rutas para el Catálogo filtrado
router.get('/reportes/catalogo', reporteController.mostrarCatalogo);
router.post('/reportes/catalogo', reporteController.filtrarCatalogo);

// Ruta para el Reporte de Pedidos
router.get('/reportes/pedidos', reporteController.reportePedidos);

module.exports = router;
// Ruta para ver la tabla de categorías
router.get('/reportes/categorias', reporteController.listarCategorias);

router.get('/pedidos', reporteController.reportePedidos);
module.exports = router;
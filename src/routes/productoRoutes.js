const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Leer
router.get('/', productoController.listarProductos);

// Crear
router.get('/nuevo', productoController.mostrarNuevo);
router.post('/guardar', productoController.guardarNuevo);

// Editar
router.get('/editar/:id', productoController.mostrarEditar);
router.post('/actualizar', productoController.actualizar);

// Eliminar
router.get('/eliminar/:id', productoController.eliminar);

module.exports = router;    
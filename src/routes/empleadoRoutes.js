const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

// Leer
router.get('/', empleadoController.listarEmpleados);

// Crear
router.get('/nuevo', empleadoController.mostrarNuevo);
router.post('/guardar', empleadoController.guardarNuevo);

// Editar
router.get('/editar/:id', empleadoController.mostrarEditar);
router.post('/actualizar', empleadoController.actualizar);

// Eliminar
router.get('/eliminar/:id', empleadoController.eliminar);

module.exports = router;
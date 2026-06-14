const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Definir la URL que cargará la nueva página
router.get('/clientes', clienteController.listarClientes);

// Rutas para Crear Cliente
router.get('/clientes/nuevo', clienteController.mostrarFormularioCliente);
router.post('/clientes/guardar', clienteController.guardarCliente);
// Rutas para Eliminar y Editar
router.get('/clientes/eliminar/:id', clienteController.eliminarCliente);
router.get('/clientes/editar/:id', clienteController.mostrarEditarCliente);
router.post('/clientes/actualizar/:id', clienteController.actualizarCliente);

module.exports = router;
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/buscar', pedidoController.buscarPedido);
router.get('/nuevo', pedidoController.mostrarNuevaBoleta);
router.post('/guardar', pedidoController.guardarPedido);

module.exports = router;
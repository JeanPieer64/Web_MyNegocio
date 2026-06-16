const express = require('express');
const router = express.Router();
const examenController = require('../controllers/examenController');

router.get('/reportes/pedidos-pais-cliente', examenController.cargarExamen);
router.get('/api/clientes/:pais', examenController.obtenerClientesPorPais);
router.get('/api/pedidos/:idCliente', examenController.obtenerPedidosPorCliente);

module.exports = router;
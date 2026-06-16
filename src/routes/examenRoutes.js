const express = require('express');
const router = express.Router();
const examenController = require('../controllers/examenController');

router.get('/reportes/pedidos-pais-cliente', examenController.cargarExamen);
router.get('/api/clientes/:pais', examenController.obtenerClientesPorPais);
router.get('/api/pedidos/:idCliente', examenController.obtenerPedidosPorCliente);
router.get('/pedidos/detalle/:id', examenController.verDetallePedido);

module.exports = router;
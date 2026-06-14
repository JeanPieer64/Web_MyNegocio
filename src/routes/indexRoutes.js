const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// La ruta raíz ("/") carga el dashboard
router.get('/', indexController.mostrarHome);

// NUEVO: La ruta para el contacto
router.get('/contacto', indexController.mostrarContacto);

module.exports = router;
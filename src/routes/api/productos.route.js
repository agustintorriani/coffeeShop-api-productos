const express = require('express');
const router = express.Router();
const ProductosController = require('../../controllers/productos.controller');

router.get('/ping', function(req, res, next) {
    res.send('Llegaste a la ruta de api/productos');
  });
  
  router.get('/status', function(req, res, next) {
    res.send('success');
  });

router.get('/obtener', ProductosController.obtenerProductos);
router.post('/agregar', ProductosController.agregarProducto);
router.put('/modificar', ProductosController.modificarProducto);
router.delete('/eliminar/:codigo', ProductosController.eliminarProducto);

module.exports = router;

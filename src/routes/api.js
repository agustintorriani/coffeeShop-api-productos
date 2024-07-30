/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var productos = require('./api/productos.route')

router.use('/productos', productos);

module.exports = router;

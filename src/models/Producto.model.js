var mongoose = require('mongoose')

var ProductoSchema = new mongoose.Schema({
    nombre: String,
    codigo: String,
    descripcion: String,
    stock: Number,
    precio: Number,
    activo: Boolean,
    fechaAlta: { type: Date, default: Date.now },
    fechaModificacion: { type: Date, default: null },
    fechaBaja: { type: Date, default: null }
})

const Producto = mongoose.model('productos', ProductoSchema)

module.exports = Producto;
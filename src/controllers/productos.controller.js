var ProductoService = require('../services/productos.service');

_this = this;

exports.obtenerProductos = async function(req, res, next){
    // var page = req.query.page ? req.query.page : 1;
    // var limit = req.query.limit ? req.query.limit : 10;
    try{
        var productos = await ProductoService.obtenerProductos();
        return res.status(200).json({status: 200, data: productos, success: true});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.agregarProducto = async function(req, res, next){ 
    var producto = {
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
        precio: req.body.precio,
        activo: req.body.activo,
    }

    try{
        var producto = await ProductoService.agregarProducto(producto);

        if(producto != null){
            return res.status(201).json({status: 201, data: producto, message: "Producto agregado exitosamente", success: true});
        } else {
            return res.status(201).json({status: 201, data: producto, message: "Ya existe un producto con ese código", success: false});
        }

    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.eliminarProducto = async function(req, res, next){
    var codigo = req.params.codigo;
    
    try{
        await ProductoService.eliminarProducto(codigo);
        return res.status(204).json({status:204, message: "Producto eliminado exitosamente"});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
} 

exports.modificarProducto = async function(req, res, next){
    var producto = {
        _id: req.body._id,
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
        precio: req.body.precio,
        activo: req.body.activo,
    }

    try{
        var prod = await ProductoService.modificarProducto(producto);
        
        if(prod != null){
            return res.status(200).json({status: 200, data: prod, message: "Producto modificado exitosamente", success: true});
        } else {
            return res.status(200).json({status: 200, data: prod, message: "No se encontró el producto", success: false});
        }

    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}
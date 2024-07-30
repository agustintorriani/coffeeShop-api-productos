const Producto = require('../models/Producto.model');
_this = this;

exports.obtenerProductos = async function(){ 
    try{
        var productosActivos = await Producto.find({ fechaBaja: null, activo: true });
        return productosActivos;
    }catch(e){
        throw Error('Error al obtener productos activos');
    }
}

exports.agregarProducto = async function(producto){ 


    let productoExistente = await Producto.findOne({ codigo: producto.codigo, fechaBaja: null,}).exec();

    if(!productoExistente){
        var nuevoProducto = new Producto({
            nombre: producto.nombre,
            codigo: producto.codigo,
            descripcion: producto.descripcion,
            stock: producto.stock,
            precio: producto.precio,
            activo: producto.activo,
        });
        try{
            var savedProducto = await nuevoProducto.save();
            return savedProducto;
        }catch(e){
            throw Error('Error al agregar producto');
        }
    } else
    {
        return null;
    }
}

exports.eliminarProducto = async function(codigo){
    try{

        console.log("code",codigo);
        let producto = await Producto.findOne({codigo: codigo}).exec();

        console.log("producto",producto);
        if(producto){
            producto.fechaBaja = new Date();
            producto.activo = false;
            producto.save();
        } else {
            throw Error('Producto no encontrado');
        }

        return producto;
    }catch(e){
        console.log("e",e);
        throw Error('Error al borrar producto');
    }
}

exports.modificarProducto = async function(producto){
    var id = producto._id;
    try{
        var oldProducto = await Producto.findById(id);
    }catch(e){
        throw Error("Error al buscar producto");
    }
    console.log("oldProducto",oldProducto);

    if(!oldProducto){
        return false;
    }

    oldProducto.nombre = producto.nombre;
    oldProducto.codigo = producto.codigo;
    oldProducto.descripcion = producto.descripcion;
    oldProducto.stock = producto.stock;
    oldProducto.precio = producto.precio;
    oldProducto.activo = producto.activo;
    oldProducto.fechaModificacion = new Date();
    

    try{
        var savedProducto = await oldProducto.save();
        return savedProducto;
    }catch(e){
        throw Error('Error al modificar producto');
    }
}
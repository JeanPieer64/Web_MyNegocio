const db = require('../models/db');

// ==========================================
// 1. LISTAR Productos
// ==========================================
exports.listarProductos = (req, res) => {
    const query = `
        SELECT p.IdProducto, p.NombreProducto, p.PrecioUnidad, p.UnidadesEnExistencia, p.Descuento, c.NombreCategoria 
        FROM producto p
        INNER JOIN categoria c ON p.IdCategoria = c.IdCategoria
    `;
    
    db.query(query, (err, productos) => {
        if (err) return res.send('Error al listar productos: ' + err.message);
        // AQUÍ ESTABA EL ERROR: Faltaba enviar el titulo
        res.render('productos', { titulo: 'Gestión de Productos', productos: productos });
    });
};

// ==========================================
// 2. MOSTRAR Formulario de Nuevo Producto
// ==========================================
exports.mostrarNuevo = (req, res) => {
    const queryCategorias = 'SELECT IdCategoria, NombreCategoria FROM categoria';
    
    db.query(queryCategorias, (err, categorias) => {
        if (err) return res.send('Error al cargar categorías');
        // También lo agregamos aquí
        res.render('nuevoProducto', { titulo: 'Nuevo Producto', categorias: categorias });
    });
};

// ==========================================
// 3. GUARDAR Nuevo Producto
// ==========================================
exports.guardarNuevo = (req, res) => {
    const { nombre, precio, stock, idCategoria, descuentoPorcentaje } = req.body;
    const descuentoDecimal = parseFloat(descuentoPorcentaje) / 100 || 0;

    const query = 'INSERT INTO producto (NombreProducto, PrecioUnidad, UnidadesEnExistencia, IdCategoria, Descuento) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [nombre, precio, stock, idCategoria, descuentoDecimal], (err) => {
        if (err) return res.send('Error al guardar producto: ' + err.message);
        res.redirect('/productos');
    });
};

// ==========================================
// 4. MOSTRAR Formulario de Editar
// ==========================================
exports.mostrarEditar = (req, res) => {
    const id = req.params.id;
    const queryProducto = 'SELECT * FROM producto WHERE IdProducto = ?';
    const queryCategorias = 'SELECT IdCategoria, NombreCategoria FROM categoria';

    db.query(queryProducto, [id], (err, result) => {
        if (err) return res.send('Error al buscar producto: ' + err.message);
        if (result.length === 0) return res.send('Producto no encontrado');
        
        db.query(queryCategorias, (errCat, categorias) => {
            if (errCat) return res.send('Error al cargar categorías: ' + errCat.message);
            res.render('editarProducto', { 
                titulo: 'Editar Producto', 
                producto: result[0], 
                categorias: categorias 
            });
        });
    });
};

// ==========================================
// 5. ACTUALIZAR Producto
// ==========================================
exports.actualizar = (req, res) => {
    const { idProducto, nombre, precio, stock, idCategoria, descuentoPorcentaje } = req.body;
    const descuentoDecimal = parseFloat(descuentoPorcentaje) / 100 || 0;

    const query = 'UPDATE producto SET NombreProducto = ?, PrecioUnidad = ?, UnidadesEnExistencia = ?, IdCategoria = ?, Descuento = ? WHERE IdProducto = ?';
    
    db.query(query, [nombre, precio, stock, idCategoria, descuentoDecimal, idProducto], (err) => {
        if (err) return res.send('Error al actualizar producto: ' + err.message);
        res.redirect('/productos');
    });
};

// ==========================================
// 6. ELIMINAR Producto
// ==========================================
exports.eliminar = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM producto WHERE IdProducto = ?';
    
    db.query(query, [id], (err) => {
        if (err) return res.send('No se puede eliminar este producto porque ya tiene ventas registradas.');
        res.redirect('/productos');
    });
};
const db = require('../models/db');

// Función para listar los clientes
exports.listarClientes = (req, res) => {
    const query = 'SELECT IdCliente, NombreEmpresa, NombreContacto, Ciudad, Telefono FROM cliente';
    db.query(query, (err, results) => {
        if (err) return res.send('Error en la BD');
        res.render('clientes', { titulo: 'CRUD de Clientes', clientes: results });
    });
};

// Función para mostrar el formulario vacío
exports.mostrarFormularioCliente = (req, res) => {
    res.render('nuevoCliente', { titulo: 'Agregar Cliente' });
};

// Función para guardar los datos en MySQL
exports.guardarCliente = (req, res) => {
    const { idCliente, empresa, contacto, ciudad, telefono } = req.body;
    const query = 'INSERT INTO cliente (IdCliente, NombreEmpresa, NombreContacto, Ciudad, Telefono) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [idCliente, empresa, contacto, ciudad, telefono], (err, results) => {
        if (err) return res.send('Error al guardar');
        res.redirect('/clientes');
    });
};
// ==========================================
// Función para ELIMINAR un cliente
// ==========================================
exports.eliminarCliente = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM cliente WHERE IdCliente = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar:', err);
            return res.send('Error al eliminar cliente');
        }
        res.redirect('/clientes');
    });
};

// ==========================================
// Función para MOSTRAR la pantalla de Editar
// ==========================================
exports.mostrarEditarCliente = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM cliente WHERE IdCliente = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al buscar cliente:', err);
            return res.send('Error al buscar cliente');
        }
        res.render('editarCliente', { titulo: 'Editar Cliente', cliente: results[0] });
    });
};

// ==========================================
// Función para GUARDAR LOS CAMBIOS del cliente
// ==========================================
exports.actualizarCliente = (req, res) => {
    const id = req.params.id;
    const { empresa, contacto, ciudad, telefono } = req.body;
    const query = 'UPDATE cliente SET NombreEmpresa = ?, NombreContacto = ?, Ciudad = ?, Telefono = ? WHERE IdCliente = ?';
    
    db.query(query, [empresa, contacto, ciudad, telefono, id], (err, results) => {
        if (err) return res.send('Error al actualizar');
        res.redirect('/clientes');
    });
};
const db = require('../models/db');

exports.mostrarHome = (req, res) => {
    db.query('SELECT COUNT(*) AS totalProductos FROM producto', (err, resProd) => {
        if (err) return res.send('Error contando productos');
        
        db.query('SELECT COUNT(*) AS totalClientes FROM cliente', (err, resCli) => {
            if (err) return res.send('Error contando clientes');
            
            db.query('SELECT COUNT(*) AS totalPedidos FROM pedido', (err, resPed) => {
                if (err) return res.send('Error contando pedidos');
                
                db.query('SELECT NombreProducto, UnidadesEnExistencia FROM producto WHERE UnidadesEnExistencia = 0', (err, resAgotados) => {
                    if (err) return res.send('Error buscando agotados');
                    
                    db.query('SELECT NombreProducto, UnidadesEnExistencia FROM producto WHERE UnidadesEnExistencia > 0 AND UnidadesEnExistencia <= 10', (err, resPorAgotarse) => {
                        if (err) return res.send('Error buscando productos por agotarse');
                        
                        res.render('index', { 
                            titulo: 'Mi Negocio - Dashboard',
                            totalProductos: resProd[0].totalProductos,
                            totalClientes: resCli[0].totalClientes,
                            totalPedidos: resPed[0].totalPedidos,
                            agotados: resAgotados,
                            porAgotarse: resPorAgotarse
                        });
                    });
                });
            });
        });
    });
};
exports.mostrarContacto = (req, res) => {
    res.render('contacto', { titulo: 'Contacto - Minimarket El Rápidos' });
};
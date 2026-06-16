const db = require('../models/db'); 

const cargarExamen = (req, res) => {
    const sqlPaises = "SELECT DISTINCT Pais FROM cliente WHERE Pais IS NOT NULL ORDER BY Pais ASC";
    
    db.query(sqlPaises, (err, paises) => {
        if (err) {
            console.log("Error al obtener países:", err);
            return res.status(500).send("Error interno del servidor");
        }
        
        res.render('examen', {
            titulo: 'Pedidos x Pais x Cliente', 
            paises: paises
        });
    });
};

const obtenerClientesPorPais = (req, res) => {
    const pais = req.params.pais;
    const sqlClientes = "SELECT IdCliente, NombreEmpresa FROM cliente WHERE Pais = ? ORDER BY NombreEmpresa ASC";
    
    db.query(sqlClientes, [pais], (err, clientes) => {
        if (err) {
            console.log("Error al obtener clientes:", err);
            return res.status(500).send("Error interno del servidor");
        }
        res.json(clientes);
    });
};

const obtenerPedidosPorCliente = (req, res) => {
    const idCliente = req.params.idCliente;
    
    const sqlPedidos = `
        SELECT p.IdPedido, p.FechaPedido, e.Nombre AS Empleado, p.FechaEntrega 
        FROM pedido p 
        JOIN empleado e ON p.IdEmpleado = e.IdEmpleado 
        WHERE p.IdCliente = ? 
        ORDER BY p.FechaPedido DESC
    `;
    
    db.query(sqlPedidos, [idCliente], (err, pedidos) => {
        if (err) {
            console.log("Error al obtener pedidos:", err);
            return res.status(500).send("Error interno del servidor");
        }
        res.json(pedidos);
    });
};

module.exports = {
    cargarExamen,
    obtenerClientesPorPais,
    obtenerPedidosPorCliente
};
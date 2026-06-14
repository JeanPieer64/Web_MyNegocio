const db = require('../models/db');

exports.reportePedidos = (req, res) => {
    // Consulta "a prueba de balas" contra valores nulos en datos antiguos
    const query = `
        SELECT 
            p.IdPedido, 
            COALESCE(DATE_FORMAT(p.FechaPedido, '%d/%m/%Y'), 'Sin fecha') AS Fecha,
            c.NombreEmpresa AS Cliente,
            CONCAT(e.Nombre, ' ', e.Apellidos) AS Vendedor,
            COALESCE((
                SELECT SUM(Cantidad * PrecioUnidad * (1 - COALESCE(Descuento, 0))) 
                FROM detalles_de_pedido 
                WHERE IdPedido = p.IdPedido
            ), 0) AS Total
        FROM pedido p
        INNER JOIN cliente c ON p.IdCliente = c.IdCliente
        INNER JOIN empleado e ON p.IdEmpleado = e.IdEmpleado
        ORDER BY p.IdPedido DESC
    `;s
    
    db.query(query, (err, pedidos) => {
        if (err) return res.send('Error al cargar el reporte: ' + err.message);
        
        res.render('reportePedidos', { 
            titulo: 'Reporte de Pedidos', 
            pedidos: pedidos 
        });
    });
};
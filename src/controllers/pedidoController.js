const db = require('../models/db');

// ==========================================
// 1. BUSCAR Pedido (El detalle de la boleta)
// ==========================================
exports.buscarPedido = (req, res) => {
    const idPedido = req.query.idPedido; 
    
    if (!idPedido) {
        return res.render('buscarPedido', { titulo: 'Buscar Pedido', pedidoInfo: null, detalles: [] });
    }
    
    const queryPedido = `SELECT IdPedido, DATE_FORMAT(FechaPedido, '%d/%m/%Y %H:%i:%s') AS FechaBonita FROM pedido WHERE IdPedido = ?`;
    
    db.query(queryPedido, [idPedido], (err, resultPedido) => {
        if (err) return res.send('Error buscando el pedido');
        
        if (resultPedido.length === 0) {
            return res.render('buscarPedido', { titulo: 'Buscar Pedido', pedidoInfo: null, detalles: [], error: 'El pedido no existe' });
        }
        
        // Mejoramos esta consulta para que traiga el Descuento y calcule el Total real de esa fila
        const queryDetalles = `
            SELECT 
                pr.NombreProducto, 
                dp.Cantidad, 
                dp.PrecioUnidad, 
                COALESCE(dp.Descuento, 0) AS Descuento,
                (dp.Cantidad * dp.PrecioUnidad * (1 - COALESCE(dp.Descuento, 0))) AS Total 
            FROM detalles_de_pedido dp
            JOIN producto pr ON dp.IdProducto = pr.IdProducto
            WHERE dp.IdPedido = ?
        `;
        
        db.query(queryDetalles, [idPedido], (err, detalles) => {
            if (err) return res.send('Error buscando los detalles');
            res.render('buscarPedido', { titulo: 'Detalle de Boleta', pedidoInfo: resultPedido[0], detalles: detalles, error: null });
        });
    });
};

// ==========================================
// 2. MOSTRAR la Nueva Boleta
// ==========================================
exports.mostrarNuevaBoleta = (req, res) => {
    const queryClientes = 'SELECT IdCliente, NombreEmpresa FROM cliente';
    const queryEmpleados = 'SELECT IdEmpleado, Apellidos, Nombre FROM empleado';
    const queryProductos = `
        SELECT p.IdProducto, p.NombreProducto, p.PrecioUnidad, p.UnidadesEnExistencia, p.Descuento, c.NombreCategoria 
        FROM producto p
        INNER JOIN categoria c ON p.IdCategoria = c.IdCategoria
    `;

    db.query(queryClientes, (err, clientes) => {
        if (err) return res.send('Error cargando clientes');
        db.query(queryEmpleados, (err, empleados) => {
            if (err) return res.send('Error cargando empleados');
            db.query(queryProductos, (err, productos) => {
                if (err) return res.send('Error cargando productos');
                res.render('nuevaBoleta', { 
                    titulo: 'Generar Nueva Boleta', 
                    clientes: clientes, 
                    empleados: empleados, 
                    productos: productos 
                });
            });
        });
    });
};

// ==========================================
// 3. GUARDAR el Nuevo Pedido
// ==========================================
exports.guardarPedido = (req, res) => {
    const { idCliente, idEmpleado, carrito } = req.body;
    const productos = JSON.parse(carrito);
    
    if (!idEmpleado) return res.send('Error: Selecciona un empleado.');
    
    db.query('SELECT MAX(IdPedido) as maxId FROM pedido', (err, result) => {
        if (err) return res.send('Error al calcular ID');
        const nuevoId = (result[0].maxId || 0) + 1;
        const queryCabecera = 'INSERT INTO pedido (IdPedido, IdCliente, IdEmpleado, FechaPedido) VALUES (?, ?, ?, CURDATE())';
        
        db.query(queryCabecera, [nuevoId, idCliente, idEmpleado], (errInsert) => {
            if (errInsert) return res.send('Error al guardar pedido');
            let operacionesCompletadas = 0;
            const totalOperaciones = productos.length * 2;

            productos.forEach(prod => {
                const queryDetalle = 'INSERT INTO detalles_de_pedido (IdPedido, IdProducto, PrecioUnidad, Cantidad, Descuento) VALUES (?, ?, ?, ?, ?)';
                db.query(queryDetalle, [nuevoId, prod.id, prod.precio, prod.cantidad, prod.descuentoBD || 0], (errDetalle) => {
                    operacionesCompletadas++;
                    if (operacionesCompletadas === totalOperaciones) res.redirect('/pedidos/buscar?idPedido=' + nuevoId + '&nuevo=si');
                });
                const queryStock = 'UPDATE producto SET UnidadesEnExistencia = UnidadesEnExistencia - ? WHERE IdProducto = ?';
                db.query(queryStock, [prod.cantidad, prod.id], (errStock) => {
                    operacionesCompletadas++;
                    if (operacionesCompletadas === totalOperaciones) res.redirect('/pedidos/buscar?idPedido=' + nuevoId + '&nuevo=si');
                });
            });
        });
    });
};
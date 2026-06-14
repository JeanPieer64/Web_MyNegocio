const db = require('../models/db');

// Función para mostrar la página principal de reportes
exports.mostrarPantallaReportes = (req, res) => {
    res.render('reportes', { titulo: 'Panel de Reportes - MyNegocio' });
};

// Función para listar las categorías desde MySQL
exports.listarCategorias = (req, res) => {
    const query = 'SELECT IdCategoria, NombreCategoria, Descripcion FROM categoria';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al consultar categorías:', err);
            return res.send('Error interno en la base de datos');
        }
        // Enviamos los resultados a una nueva pantalla llamada "categorias.ejs"
        res.render('categorias', { titulo: 'Catálogo de Categorías', categorias: results });
    });
};

// 1. Muestra la pantalla inicial con la lista de categorías
exports.mostrarCatalogo = (req, res) => {
    const queryCategorias = 'SELECT IdCategoria, NombreCategoria FROM categoria';
    
    db.query(queryCategorias, (err, categorias) => {
        if (err) return res.send('Error al cargar categorías');
        // Mandamos "productos" como null porque aún no han buscado nada
        res.render('catalogo', { titulo: 'Catálogo', categorias: categorias, productos: null });
    });
};

// 2. Recibe la categoría elegida y filtra los productos
exports.filtrarCatalogo = (req, res) => {
    const idCat = req.body.idCategoria; // Atrapamos lo que el usuario eligió
    
    const queryCategorias = 'SELECT IdCategoria, NombreCategoria FROM categoria';
    // Usamos WHERE para traer solo los productos de esa categoría
    const queryProductos = 'SELECT IdProducto, NombreProducto, PrecioUnidad, UnidadesEnExistencia FROM producto WHERE IdCategoria = ?';

    // Primero traemos las categorías de nuevo para el desplegable
    db.query(queryCategorias, (err, categorias) => {
        if (err) return res.send('Error al cargar categorías');
        
        // Luego traemos los productos filtrados
        db.query(queryProductos, [idCat], (err, productos) => {
            if (err) return res.send('Error al filtrar productos');
            
            res.render('catalogo', { titulo: 'Catálogo', categorias: categorias, productos: productos });
        });
    });
};

// 3. Función para listar el Reporte General de Pedidos
exports.reportePedidos = (req, res) => {
    // Consulta blindada matemáticamente contra datos antiguos o nulos
    const query = `
        SELECT 
            p.IdPedido, 
            COALESCE(DATE_FORMAT(p.FechaPedido, '%d/%m/%Y'), 'Sin fecha') AS Fecha,
            c.NombreEmpresa AS Cliente,
            CONCAT(e.Nombre, ' ', e.Apellidos) AS Vendedor,
            COALESCE((
                SELECT SUM(IFNULL(Cantidad, 0) * IFNULL(PrecioUnidad, 0) * (1 - IFNULL(Descuento, 0))) 
                FROM detalles_de_pedido 
                WHERE IdPedido = p.IdPedido
            ), 0) AS Total
        FROM pedido p
        INNER JOIN cliente c ON p.IdCliente = c.IdCliente
        INNER JOIN empleado e ON p.IdEmpleado = e.IdEmpleado
        ORDER BY p.IdPedido DESC
    `;
    
    db.query(query, (err, pedidos) => {
        if (err) return res.send('Error al cargar el reporte: ' + err.message);
        
        res.render('reportePedidos', { 
            titulo: 'Reporte de Pedidos', 
            pedidos: pedidos 
        });
    });
};
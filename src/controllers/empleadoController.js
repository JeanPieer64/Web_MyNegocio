const db = require('../models/db');

// Función para listar todos los empleados
exports.listarEmpleados = (req, res) => {
    const query = 'SELECT * FROM empleado';
    
    db.query(query, (err, empleados) => {
        if (err) {
            return res.send('Error al obtener la lista de empleados: ' + err.message);
        }
        
        res.render('empleados', {
            titulo: 'Gestión de Empleados',
            empleados: empleados
        });
    });
};
// ==========================================
// 1. Mostrar formulario para NUEVO empleado
// ==========================================
exports.mostrarNuevo = (req, res) => {
    res.render('nuevoEmpleado', { titulo: 'Nuevo Empleado' });
};

// ==========================================
// 2. Guardar el NUEVO empleado en la BD
// ==========================================
exports.guardarNuevo = (req, res) => {
    const { nombre, apellidos } = req.body;
    const query = 'INSERT INTO empleado (Nombre, Apellidos) VALUES (?, ?)';
    
    db.query(query, [nombre, apellidos], (err) => {
        if (err) return res.send('Error al guardar empleado: ' + err.message);
        res.redirect('/empleados'); // Regresa a la lista después de guardar
    });
};

// ==========================================
// 3. Mostrar formulario para EDITAR empleado
// ==========================================
exports.mostrarEditar = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM empleado WHERE IdEmpleado = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) return res.send('Error al buscar empleado: ' + err.message);
        if (result.length === 0) return res.send('Empleado no encontrado');
        
        res.render('editarEmpleado', { 
            titulo: 'Editar Empleado', 
            empleado: result[0] 
        });
    });
};

// ==========================================
// 4. Actualizar los datos del empleado
// ==========================================
exports.actualizar = (req, res) => {
    const { idEmpleado, nombre, apellidos } = req.body;
    const query = 'UPDATE empleado SET Nombre = ?, Apellidos = ? WHERE IdEmpleado = ?';
    
    db.query(query, [nombre, apellidos, idEmpleado], (err) => {
        if (err) return res.send('Error al actualizar empleado: ' + err.message);
        res.redirect('/empleados'); // Regresa a la lista
    });
};

// ==========================================
// 5. Eliminar un empleado
// ==========================================
exports.eliminar = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM empleado WHERE IdEmpleado = ?';
    
    db.query(query, [id], (err) => {
        if (err) return res.send('Error al eliminar. (Nota: Si el empleado tiene ventas registradas, la base de datos bloqueará la eliminación por seguridad): ' + err.message);
        res.redirect('/empleados');
    });
};
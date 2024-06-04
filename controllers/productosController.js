const db = require('../db');

exports.obtenerProductos = (req, res) => {
  db.query('SELECT * FROM productos', (error, resultados) => {
    if (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json({estado:201, productos: resultados});
  });
};


exports.crearProducto = (req, res) => {
  console.log(req)
  const { nombre, precio, descripcion } = req.body;
  const imagen = req.file.path;
  db.query('INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)', [nombre, descripcion, precio, imagen], (err, result) => {
    if (err) {
      console.error('Error al insertar producto:', err);
      res.status(500).json({ error: 'Error al insertar producto en la base de datos' });
      return;
    }
    res.json({ estado: 201, mensaje: "Guardado exitosamente" });
  });
};

exports.obtenerProductoId = (req, res) => {
  const { id } = req.params;
    // Realiza la consulta SQL para obtener el producto por su ID
    const sql = 'SELECT * FROM productos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error al obtener el producto:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
  
      // Verifica si se encontró un producto con el ID especificado
      if (result.length === 0) {
        res.json({ estado:404, mensaje: 'Producto no encontrado' });
        return;
      }
      // const imagenConPrefijo = `data:image/jpeg;base64,${result[0].imagen}`;

     

      // Si se encontró el producto, devuélvelo como respuesta
      res.json({estado:201, producto: result[0]});
    })
};

exports.updateProduct =  (req, res) => {
  const { id } = req.params;
  const { nombre, precio, descripcion } = req.body;
  const imagen = req.file.path;

// Verificar si el ID del producto existe
const sqlVerificar = 'SELECT * FROM productos WHERE id = ?';
db.query(sqlVerificar, [id], (err, result) => {
  if (err) {
    console.error('Error al verificar el producto:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
    return;
  }

  // Si no se encontró un producto con el ID especificado, devolver un error
  if (result.length === 0) {
    res.status(404).json({ estado: 404, mensaje: 'El producto no existe' });
    return;
  }

  db.query('UPDATE productos SET nombre = ?, precio = ?, descripcion = ?, imagen = ? WHERE id = ?', [nombre, precio, descripcion, imagen,id], (err, result) => {
    console.log(result)
    if (err) {
      console.error('Error al actualizar producto:', err);
      res.status(500).json({ error: 'Error al actualizar producto en la base de datos' });
      return;
    }

     // Verifica si se encontró un producto con el ID especificado
     if (result.length === 0) {
      res.json({ estado:404, mensaje: 'Producto no encontrado' });
      return;
    }
    res.json({ estado: 201, mensaje: "Producto actualizado exitosamente"});
  });
})
};




exports.eliminarProducto =  (req, res) => {
  const { id } = req.params;

  // Verificar si el ID del producto existe
const sqlVerificar = 'SELECT * FROM productos WHERE id = ?';
db.query(sqlVerificar, [id], (err, result) => {
  if (err) {
    console.error('Error al verificar el producto:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
    return;
  }

  // Si no se encontró un producto con el ID especificado, devolver un error
  if (result.length === 0) {
    res.status(404).json({ estado: 404, mensaje: 'El producto no existe' });
    return;
  }

  db.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar producto:', err);
      res.status(500).json({ error: 'Error al eliminar producto de la base de datos' });
      return;
    }
    res.json({estado:201, mensaje:'Producto eliminado'});
  });

})
  
};






// module.exports = { obtenerProductos };


// Agregar el resto de las funciones CRUD (crearProducto, obtenerProducto, actualizarProducto, eliminarProducto)

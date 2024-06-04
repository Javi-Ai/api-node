//se importa el módulo de express
const express = require('express');
const cors = require('cors');
const productosRoutes = require('./routes/productosRoutes');

//crea una nueva instancia de una aplicación Express
//Puedes usar métodos y funciones proporcionados por Express en esta instancia para configurar rutas, middleware, y manejar solicitudes HTTP entrantes.
const app = express()
//es un middleware incorporado en Express que analiza el cuerpo de las solicitudes entrantes con el tipo de contenido application/json. Toma los datos JSON entrantes y los convierte en un objeto JavaScript accesible a través de req.body
app.use(cors())
app.use(express.json())


//Si las imágenes se están almacenando en una carpeta dentro del proyecto de Node.js y quieres servirlas estáticamente para que puedan ser accesibles desde tu aplicación Angular, puedes configurar Express para servir archivos estáticos desde esa carpeta.
app.use('/uploads', express.static('uploads'));


app.use('/api',productosRoutes)





// establece el puerto en el que se ejecutará el servidor Express
app.listen(3000, () => {
    console.log(`Servidor escuchando en el puerto ${3000}`);
});


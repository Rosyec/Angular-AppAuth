const { status } = require('cli');
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

//Crear el servidor de express
const app = express();

//Conexion a la base de datos en Mongo
dbConnection();

// console.log(process.env);

//Directorio publico
app.use( express.static('public') );

//CORS
app.use( cors({ origin: 'http://localhost:4200', methods: [ 'GET', 'POST' ]}) );

//Lectura y Parseo del BODY
app.use( express.json() );

//Rutas
app.use( '/api/auth' , require('./routes/auth'));

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT } `);
} );




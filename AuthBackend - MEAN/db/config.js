const mongoose = require("mongoose");

const dbConnection = async() => {

    mongoose.set('strictQuery', true);

    try {
        await mongoose.connect( process.env.MONGO_CONNECTION );
        

        console.log('Base de datos en linea!')
        
    } catch (error) {
        console.log('Error: ', error);
        throw new Error('Error al inicializar la base de datos en Mongo!');
    }
}

module.exports = {
    dbConnection,
}
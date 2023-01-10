const { response, request } = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const generarJWT = require('../helpers/jwt');

const crearUsuario = async (req = request, resp = response) => {

    const { name, email, password } = req.body;

    try {

        //Verificar el email
        const usuario = await Usuario.findOne({ email: email });

        if ( usuario ) {
            return resp.status(400).json({
                error: true,
                msg: 'El email ya existe!'
            });
        }

        //Crear usuario con el modelo
        const dbUsuario = new Usuario( req.body );
    
        //Encriptar el password
        const salt = bcrypt.genSaltSync();

        dbUsuario.password = bcrypt.hashSync( password, salt );
    
        //Generar un JWT
        const miToken = await generarJWT( dbUsuario.id, dbUsuario.name );

        //Insertar usuario en Mongo
        await dbUsuario.save();
    
        //Generar respuesta exitosa
        return resp.status(200).json({
            error: false,
            id: dbUsuario.id,
            name: dbUsuario.name,
            email: dbUsuario.email,
            token: miToken,
            msg: 'Usuario registrado con exito!'
        });

        
    } catch (error) {
        console.log('Error: ',error)
        return resp.status(500).json({
            error: true,
            msg: 'Por favor hable con el administrador!'
        });
    }

}

const loginUsuario = async (req = request, resp = response) => {

    const { email, password } = req.body;

    try {

        //Verificar el email
        const usuario = await Usuario.findOne({ email: email });

        if ( !usuario ) {
            return resp.status(400).json({
                error: true,
                msg: 'El email o password son incorrectos!'
            });
        }

        //Verificar si el password hace match
        const validarPassword = bcrypt.compareSync( password, usuario.password );

        if( !validarPassword ){
            return resp.status(400).json({
                error: true,
                msg: 'El email o password son incorrectos!'
            });
        }

        //Generar un JWT
        const miToken = await generarJWT( usuario.id, usuario.name, usuario.email );


        //Respues al servicio
        return resp.status(200).json({
            error: false,
            id: usuario.id,
            name: usuario.name,
            email: usuario.email,
            token: miToken,
            msg: 'Te has logeado con exito!'
        });


        
    } catch (error) {
        console.log('Error: ',error)
        return resp.status(500).json({
            error: true,
            msg: 'Por favor hable con el administrador!'
        });
    }

}

const validarToken = async (req = request, resp = response) => {

    const { id, name } = req;
    const jwt = await generarJWT( id, name );
    const usuario = await Usuario.findById(id);

    return resp.json({
        error: false,
        id,
        name,
        email: usuario.email,
        token: jwt,
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    validarToken
};
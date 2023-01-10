const { response, request } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = ( req = request, resp = response, next ) => {

    // const { 'x-token': token } = req.headers;
    const token = req.header('x-token');

    if ( !token ) {
        return resp.status(401).json({
            error: true,
            msg: 'No se recibió el token!'
        });
    }

    try {

        //Validamos el token recibido
        const { id, name } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        
        req.id = id;
        req.name = name;
        
    } catch (error) {
        return resp.status(401).json({
            error: true,
            msg: 'El token no es valido!'
        });
    }

    //TODO BIEN
    next();
}

module.exports = {
    validarJWT,
}
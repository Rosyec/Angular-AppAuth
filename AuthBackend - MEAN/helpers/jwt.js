const jwt = require('jsonwebtoken');

const generarJWT = (id, name) => {

    const payload = { id, name };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '12h'
        }, (error, token) => {
            if (error) {
                //TODO MAL
                console.log(error);
                reject( error );
            } else {
                //TODO BIEN
                resolve( token );
            }
        });
    });


}

module.exports = generarJWT;
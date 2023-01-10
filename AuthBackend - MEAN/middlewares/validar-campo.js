const { response, request } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req = request, resp = response, next) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        console.log(errors);
        return resp.json({
            error: true,
            msg: errors.mapped()
        });
    }

    next();
    
}

module.exports = {
    validarCampos,

}
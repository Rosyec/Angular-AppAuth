const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, validarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validarJWT');

const router = Router();

//Crear un nuevo usuario
router.post('/register', [ 
    check('name', 'El campo name es obligatorio!').not().isEmpty(),
    check('email', 'El campo email es obligatorio!').isEmail(),
    check('password', 'El campo password es obligatorio!').isLength({min: 6}),
    validarCampos 
], crearUsuario);

//Login de usuario
router.post('/login', [ 
    check('email', 'El campo email es obligatorio!').isEmail(), 
    check('password', 'El campo password es obligatorio!').isLength({min: 6}),
    validarCampos
], loginUsuario);

//Validar token
router.get('/validate', validarJWT, validarToken);


module.exports = router;
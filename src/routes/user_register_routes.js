const {Router} = require('express');
const { check } = require('express-validator');
const { userRegister } = require('../controllers');
const { validRol } = require('../helpers');
const { checkField } = require('../middlewares');

const router = Router();

router.post('/', [
    check('name', 'the name is required').not().isEmpty(),
    check('email', 'the email is required').not().isEmpty(),
    check('password', 'Weak password').isLength({min: 8}),
    check('rol').custom(validRol)], checkField , userRegister);





module.exports = router;
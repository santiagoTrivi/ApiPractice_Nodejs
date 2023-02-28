const {Router} = require('express');
const { check } = require('express-validator');
const { userRegister, getAllUser, updateUser, deleteUser } = require('../controllers');
const { validRol, checkEmail } = require('../helpers');
const { checkField, jwtValidation } = require('../middlewares');

const router = Router();

router.post('/register', [
    check('name', 'the name is required').not().isEmpty(),
    check('email', 'the email is required').not().isEmpty(),
    check('password', 'Weak password').isLength({min: 8}),
    check('email', 'invalid email').isEmail(),
    check('email').custom(checkEmail),
    check('rol').custom(validRol)], checkField , userRegister);

router.get('/user', getAllUser);

router.put('/user/:id', jwtValidation , updateUser);

router.delete('/user/:id', jwtValidation , deleteUser);





module.exports = router;
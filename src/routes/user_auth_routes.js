
const { Router }= require('express');
const { check } = require('express-validator');
const { userLogin } = require('../controllers');
const { checkField, emailValidation } = require('../middlewares');

const router = Router();

router.post('/', [
    check('email', 'the email is required').not().isEmpty(),
    check('password', 'the password is required').not().isEmpty(), emailValidation], checkField , userLogin);

module.exports = router;
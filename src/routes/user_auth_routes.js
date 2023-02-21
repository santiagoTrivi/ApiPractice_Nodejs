
const { Router }= require('express');
const { check } = require('express-validator');
const { userLogin } = require('../controllers');
const { checkField } = require('../middlewares');

const router = Router();

router.post('/', [
    check('email', 'the email is required').not().isEmpty(),
    check('password', 'the password is required').not().isEmpty()], checkField , userLogin);

module.exports = router;
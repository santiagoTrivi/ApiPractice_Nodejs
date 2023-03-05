
const { Router }= require('express');
const { check } = require('express-validator');
const { userLogin } = require('../controllers');
const { checkField, emailValidation } = require('../middlewares');

const router = Router();


/**
 * @swagger
 * tags:
 *  name: login
 *  description: user login
 * /auth/login:
 *  post:
 *      tags: [login]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              default: test1@gmail.com
 *                          password:
 *                              type: string
 *                              default: test1@gmail.com
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.post('/', [
    check('email', 'the email is required').not().isEmpty(),
    check('password', 'the password is required').not().isEmpty(), emailValidation], checkField , userLogin);

module.exports = router;
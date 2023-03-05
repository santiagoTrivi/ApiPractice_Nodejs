const {Router} = require('express');
const { check } = require('express-validator');
const { userRegister, getAllUser, updateUser, deleteUser } = require('../controllers');
const { validRol, checkEmail } = require('../helpers');
const { checkField, jwtValidation } = require('../middlewares');

const router = Router();

/**
 * @swagger
 * tags:
 *  name: user
 *  description: User endpoints
 * /auth/register:
 *  post:
 *      summary: this is to register a new user
 *      tags: [user]      
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              default: 
 *                          email:
 *                              type: string
 *                              default:
 *                              description: not registered email 
 *                          password:
 *                              type: integer
 *                              default:
 *                              description: only strong password 
 *                          rol:
 *                              type: string
 *                              default:
 *                              description: either user ir admin choices 
 *      responses:
 *          400:
 *              description: Bad request
 *          500:
 *              description: Server error
 */
router.post('/register', [
    check('name', 'the name is required').not().isEmpty(),
    check('email', 'the email is required').not().isEmpty(),
    check('password', 'Weak password').isLength({min: 8}),
    check('email', 'invalid email').isEmail(),
    check('email').custom(checkEmail),
    check('rol').custom(validRol)], checkField , userRegister);

/**
  * @swagger
  * tags:
  *  name: user
  *  description: 
  * /user:
  *  get:
  *      summary: this is to get the users' data registered
  *      tags: [user]
  *      parameters:
  *          - name: limit
  *            description: set a result limit
  *            default: 5
  *            in: query
  *            required: false
  *            schema:
  *              type: integer
  *      responses:
  *          400:
  *              description: Bad request
  *          500:
  *              description: Server error
  */
router.get('/user', getAllUser);

/**
  * @swagger
  * tags:
  *  name: user
  * /user/{id}:
  *  put:
  *      summary: this is to update the user's data
  *      tags: [user]
  *      parameters:
  *          - name: id
  *            default: 
  *            in: path
  *            required: true
  *            schema:
  *              type: string
  *              description: user id
  *          - name: Authorization
  *            in: header
  *            descripcion: admin token to be passed as a header
  *            require: true
  *            schema:
  *               type: string
  *      requestBody:
  *          required: true
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      properties:
  *                          name:
  *                              type: string
  *                              default: 
  *                          email:
  *                              type: string
  *                              default:
  *                              description: not registered email 
  *                          password:
  *                              type: integer
  *                              default:
  *                              description: only strong password 
  *   
  *      responses:
  *          400:
  *              description: Bad request
  *          500:
  *              description: Server error
  */
router.put('/user/:id', jwtValidation , updateUser);

/**
  * @swagger
  * tags:
  *  name: user
  * /user/{id}:
  *  delete:
  *      summary: this is to inactive the user without deleting their data
  *      tags: [user]
  *      parameters:
  *          - name: id
  *            default: 
  *            in: path
  *            required: true
  *            schema:
  *              type: string
  *              description: user id
  *          - name: Authorization
  *            in: header
  *            descripcion: admin token to be passed as a header
  *            require: true
  *            schema:
  *               type: string
  *      
  *      responses:
  *          400:
  *              description: Bad request
  *          500:
  *              description: Server error
  */
router.delete('/user/:id', jwtValidation , deleteUser);





module.exports = router;
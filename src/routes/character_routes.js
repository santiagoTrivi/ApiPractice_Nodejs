const { Router } = require("express");
const { check } = require("express-validator");
const { postCharacter, getAllCharacters, updateCharacter, deleteCharacter, getCharacterPicture } = require("../controllers");
const { checkCharacter } = require("../helpers");
const { checkField, jwtValidation, RolJwtValidation } = require("../middlewares");


const router = Router();

/**
 * @swagger
 * tags:
 *  name: characters
 *  description: Characters endpoints
 * /characters:
 *  post:
 *      summary: this is to register a new character
 *      tags: [characters]
 *      parameters:
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
 *                          age:
 *                              type: integer
 *                              default:
 *                          weight:
 *                              type: float
 *                              default: 
 *                          history:
 *                              type: string
 *                              default: 
 *                          movie:
 *                              type: string
 *                              default:
 *                              description: Movie tittle 
 *      responses:
 *          400:
 *              description: Bad request
 *          500:
 *              description: Server error
 */
router.post('/',[
    check('name', 'The name is required').not().isEmpty(), 
    check('name').custom(checkCharacter), jwtValidation, RolJwtValidation], checkField, postCharacter);
    
 /**
  * @swagger
  * tags:
  *  name: characters
  *  description: 
  * /characters:
  *  get:
  *      summary: this is to get the characters' data
  *      tags: [characters]
  *      parameters:
  *          - name: limit
  *            description: set a result limit
  *            default: 5
  *            in: query
  *            required: false
  *            schema:
  *              type: integer
  *          - name: name
  *            description: search by characters' name
  *            default: 
  *            in: query
  *            required: false
  *            schema:
  *              type: string
  *          - name: age
  *            description: search by characters' age
  *            default: 
  *            in: query
  *            required: false
  *            schema:
  *              type: interger
  *          - name: movies
  *            description: the movie id
  *            default: 
  *            in: query
  *            required: false
  *            schema:
  *              type: string
  *      responses:
  *          400:
  *              description: Bad request
  *          500:
  *              description: Server error
  */
router.get('/', getAllCharacters);
/**
  * @swagger
  * tags:
  *  name: characters
  * /characters/{id}:
  *  get:
  *      summary: this is to get the characters picture
  *      tags: [characters]
  *      parameters:
  *          - name: id
  *            default: 
  *            in: path
  *            required: true
  *            schema:
  *              type: string
  *              description: character id
  *      responses:
  *          400:
  *              description: Bad request
  *          500:
  *              description: Server error
  */
router.get('/:id', getCharacterPicture);

/**
  * @swagger
  * tags:
  *  name: characters
  * /characters/{id}:
  *  put:
  *      summary: this is to update character's data
  *      tags: [characters]
  *      parameters:
  *          - name: id
  *            default: 
  *            in: path
  *            required: true
  *            schema:
  *              type: string
  *              description: character id
  *          - name: Authorization
  *            in: header
  *            descripcion: admin token to be passed as a header
  *            require: true
  *            schema:
  *               type: string
  *      securitySchemes:
  *           api_key:
  *              type: apiKey
  *              name: Authorization
  *              in: header
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
  *                          age:
  *                              type: integer
  *                              default:
  *                          weight:
  *                              type: float
  *                              default: 
  *                          history:
  *                              type: string
  *                              default: 
  *                          movie:
  *                              type: string
  *                              default:
  *                              description: Movie tittle
  *   
  *      responses:
  *          400:
  *              description: Bad request
  *          500:
  *              description: Server error
  */
router.put('/:id', jwtValidation, RolJwtValidation, updateCharacter);

/**
  * @swagger
  * tags:
  *  name: characters
  * /characters/{id}:
  *  delete:
  *      summary: this is to delete character's data
  *      tags: [characters]
  *      parameters:
  *          - name: id
  *            default: 
  *            in: path
  *            required: true
  *            schema:
  *              type: string
  *              description: character id
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
router.delete('/:id', jwtValidation, RolJwtValidation, deleteCharacter);

module.exports = router;
const { Router } = require("express");
const { postMovie, getAllmovies, updateMovie, deleteMovie, getMoviePicture } = require("../controllers");
const { jwtValidation, RolJwtValidation } = require("../middlewares");




const router = Router();



/**
 * @swagger
 * tags:
 *  name: movies
 *  description: Movies endpoints
 * /movies:
 *  post:
 *      summary: this is to register a new movie
 *      tags: [movies]
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
 *                          tittle:
 *                              type: string
 *                              default: 
 *                          creationDate:
 *                              type: string
 *                              default:
 *                          rating:
 *                              type: integer
 *                              default: 
 *                          character:
 *                              type: string
 *                              default:
 *                              description: Character´s name 
 *                          genre:
 *                              type: string
 *                              default:
 *                              description: Genre 
 *      responses:
 *          400:
 *              description: Bad request
 *          500:
 *              description: Server error
 */
router.post('/', jwtValidation, RolJwtValidation, postMovie);

 /**
  * @swagger
  * tags:
  *  name: movies
  *  description: 
  * /movies:
  *  get:
  *      summary: this is to get the data of the movie
  *      tags: [movies]
  *      parameters:
  *          - name: limit
  *            description: set a result limit
  *            default: 5
  *            in: query
  *            required: false
  *            schema:
  *              type: integer
  *          - name: tittle
  *            description: search by movie tittle
  *            default: 
  *            in: query
  *            required: false
  *            schema:
  *              type: string
  *          - name: genre
  *            description: search by movie genre
  *            default: 
  *            in: query
  *            required: false
  *            schema:
  *              type: string
  *          - name: order
  *            description: only ASC or DESC choices
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
router.get('/', getAllmovies);
/**
  * @swagger
  * tags:
  *  name: movies
  * /movies/{id}:
  *  get:
  *      summary: this is to get the movies picture
  *      tags: [movies]
  *      parameters:
  *          - name: id
  *            default: 
  *            in: path
  *            required: true
  *            schema:
  *              type: string
  *              description: movie id
  *      responses:
  *          400:
  *              description: Bad request
  *          500:
  *              description: Server error
  */
router.get('/:id', getMoviePicture);

/**
  * @swagger
  * tags:
  *  name: movies
  * /movies/{id}:
  *  put:
  *      summary: this is to update the data of the movie
  *      tags: [movies]
  *      parameters:
  *          - name: id
  *            default: 
  *            in: path
  *            required: true
  *            schema:
  *              type: string
  *              description: the movie id
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
  *                          tittle:
  *                              type: string
  *                              default: 
  *                          creationDate:
  *                              type: string
  *                              default:
  *                          rating:
  *                              type: integer
  *                              default: 
  *                          character:
  *                              type: string
  *                              default:
  *                              description: Character´s name 
  *                          genre:
  *                              type: string
  *                              default:
  *                              description: Genre 
  *   
  *      responses:
  *          400:
  *              description: Bad request
  *          500:
  *              description: Server error
  */
router.put('/:id', jwtValidation, RolJwtValidation, updateMovie);


/**
  * @swagger
  * tags:
  *  name: movies
  * /movies/{id}:
  *  delete:
  *      summary: this is to delete the data of the movie
  *      tags: [movies]
  *      parameters:
  *          - name: id
  *            default: 
  *            in: path
  *            required: true
  *            schema:
  *              type: string
  *              description: movie id
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
router.delete('/:id', jwtValidation, RolJwtValidation, deleteMovie);



module.exports = router;
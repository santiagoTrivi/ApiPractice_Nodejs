const { Router } = require("express");
const { postMovie, getAllmovies, updateMovie, deleteMovie } = require("../controllers");
const { jwtValidation, RolJwtValidation } = require("../middlewares");




const router = Router();

router.post('/', jwtValidation, RolJwtValidation, postMovie);

router.get('/', jwtValidation, getAllmovies);

router.put('/:id', jwtValidation, RolJwtValidation, updateMovie);

router.delete('/:id', jwtValidation, RolJwtValidation, deleteMovie);



module.exports = router;
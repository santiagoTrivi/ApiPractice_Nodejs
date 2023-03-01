const { Router } = require("express");
const { postMovie, getAllmovies, updateMovie, deleteMovie, getMoviePicture } = require("../controllers");
const { jwtValidation, RolJwtValidation } = require("../middlewares");




const router = Router();

router.post('/', jwtValidation, RolJwtValidation, postMovie);

router.get('/', getAllmovies);
router.get('/:id', getMoviePicture);

router.put('/:id', jwtValidation, RolJwtValidation, updateMovie);

router.delete('/:id', jwtValidation, RolJwtValidation, deleteMovie);



module.exports = router;
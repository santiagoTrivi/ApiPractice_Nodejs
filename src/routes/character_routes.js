const { Router } = require("express");
const { check } = require("express-validator");
const { postCharacter } = require("../controllers");
const { checkCharacter } = require("../helpers");
const { checkField, jwtValidation, RolJwtValidation } = require("../middlewares");


const router = Router();

router.post('/',[
    check('name', 'The name is required').not().isEmpty(), 
    check('name').custom(checkCharacter), jwtValidation, RolJwtValidation], checkField, postCharacter);



module.exports = router;
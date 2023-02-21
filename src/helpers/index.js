const {validRol} = require('./check_rol');
const {checkEmail} = require('./check_email');
const {generatorjwt} = require('./jwt_generator');


module.exports = {

    validRol,
    checkEmail,
    generatorjwt

};
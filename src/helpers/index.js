const {validRol} = require('./check_rol');
const {checkEmail} = require('./check_email');
const {generatorjwt} = require('./jwt_generator');
const {uploadFiles} = require('./file_upload.js');
const {checkCharacter} = require('./check_character');

module.exports = {

    validRol,
    checkEmail,
    generatorjwt,
    uploadFiles,
    checkCharacter

};
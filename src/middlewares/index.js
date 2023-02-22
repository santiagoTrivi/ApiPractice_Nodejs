const {checkField} = require('./check_route_field');
const {emailValidation} = require('./email_validation');
const {checkFile} = require('./check_file');
const {jwtValidation} = require('./jwt_validation');
const {RolJwtValidation} = require('./rol_jwt_validation');



module.exports = {

    checkField,
    emailValidation,
    checkFile,
    jwtValidation,
    RolJwtValidation

};
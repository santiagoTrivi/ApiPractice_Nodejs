
const { userRegister, getAllUser, updateUser, deleteUser } = require('./user_controller');
const { userLogin } = require('./user_auth_controller');
const { postCharacter } = require('./character_controllers');


module.exports = {

    userRegister,
    userLogin,
    postCharacter,
    getAllUser,
    updateUser,
    deleteUser

};
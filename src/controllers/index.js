
const { userRegister, getAllUser, updateUser, deleteUser } = require('./user_controller');
const { userLogin } = require('./user_auth_controller');
const { postCharacter, getAllCharacters, updateCharacter, deleteCharacter } = require('./character_controllers');


module.exports = {

    userRegister,
    userLogin,
    getAllUser,
    updateUser,
    deleteUser,
    postCharacter,
    getAllCharacters,
    updateCharacter,
    deleteCharacter

};
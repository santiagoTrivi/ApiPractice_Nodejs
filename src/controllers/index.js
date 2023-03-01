
const { userRegister, getAllUser, updateUser, deleteUser } = require('./user_controller');
const { userLogin } = require('./user_auth_controller');
const { postCharacter, getAllCharacters, getCharacterPicture, updateCharacter, deleteCharacter } = require('./character_controllers');
const { postMovie, getAllmovies, getMoviePicture, updateMovie, deleteMovie } = require('./movie_controllers');

module.exports = {

    userRegister,
    userLogin,
    getAllUser,
    updateUser,
    deleteUser,
    postCharacter,
    getAllCharacters,
    getCharacterPicture,
    updateCharacter,
    deleteCharacter,
    postMovie,
    getAllmovies,
    getMoviePicture,
    updateMovie,
    deleteMovie

};
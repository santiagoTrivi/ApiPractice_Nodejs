const Server = require('./server');
const {Rol} = require('./rol_model');
const {User}= require('./user_model');
const {Character, Movie} = require('./character_movie_model');
const {Genre} = require('./genre');

module.exports = {
    Server,
    Rol,
    User,
    Character,
    Movie,
    Genre

};
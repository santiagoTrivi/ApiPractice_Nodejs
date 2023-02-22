const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database_connection");
const {Movie} = require('./character_movie_model');


const Genre = sequelize.define('Genre', {

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    gender:{
        type: DataTypes.STRING(200)
    },
    img:{
        type: DataTypes.STRING(300)
    }

});

Movie.hasOne(Genre);
Genre.belongsTo(Movie);



module.exports = {

    Genre

};


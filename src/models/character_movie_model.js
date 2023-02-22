const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../database/database_connection");




const Character = sequelize.define('Character', {

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING(200)
    },
    age:{
        type: DataTypes.INTEGER
    },
    weight:{
        type: DataTypes.FLOAT
    },
    story:{
        type: DataTypes.STRING(500)
    },
    img:{
        type: DataTypes.STRING(300)
    }

});


const Movie = sequelize.define('Movie', {

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    tittle:{
        type: DataTypes.STRING(200)
    },
    CreationDate:{
        type: DataTypes.DATE
    },
    calification:{
        type: DataTypes.TINYINT(1)
    },
    img:{
        type: DataTypes.STRING(300)
    }

});

Character.belongsToMany(Movie, {through: 'CharacterMovie'});
Movie.belongsToMany(Character, {through: 'CharacterMovie'});


module.exports = {

    Character,
    Movie

};
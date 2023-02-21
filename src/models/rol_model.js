const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database_connection");


const Rol = sequelize.define('Rol', {
    
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol:{
        type: DataTypes.STRING(50)
    }

});

module.exports = {
    Rol
};
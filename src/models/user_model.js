const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/database_connection");
const { Rol } = require("./rol_model");



const User = sequelize.define('User', {

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING(200)
    },
    email:{
        type: DataTypes.STRING(300)
    }, 
    password:{
        type: DataTypes.STRING(300)
    }, 
    rolId:{
        type: DataTypes.INTEGER,
        references:{
            model: 'Rols',
            key: 'id'
        }
    },
    status:{
        type: DataTypes.TINYINT(1),
        defaultValue: 1
    }
});



module.exports = {

    User

};
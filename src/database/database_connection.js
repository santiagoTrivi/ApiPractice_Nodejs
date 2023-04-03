const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('disneyApi', 'root','12345/database', { host: 'localhost', dialect: 'mysql', logging:false });


module.exports = {
    sequelize
}
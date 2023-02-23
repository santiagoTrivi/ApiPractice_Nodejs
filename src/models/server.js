const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('../database/database_connection');
const fileUpload = require('express-fileupload');


class Server {

    constructor(){
        this.port = process.env.PORT;
        this.app = express();


        this.appPath = {
            login: '/disneyApi/auth/login',
            user: '/disneyApi/auth',
            character: '/disneyApi/auth/character'
        };

        this.databaseConnection();

        this.middelawares();

        this.routes();
    };


    async databaseConnection(){
        
        try {
            await sequelize.sync();
            await sequelize.authenticate();

        } catch (error) {
            throw new Error(error);
        }

    };




    middelawares(){

        this.app.use(cors());

        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(express.json());

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    };



    routes(){

        this.app.use(this.appPath.user, require('../routes/user_routes'));
        this.app.use(this.appPath.login, require('../routes/user_auth_routes'));
        this.app.use(this.appPath.character, require('../routes/character_routes'));
    }




    listen(){
        this.app.listen(this.port, () =>{
            console.log(`DisnesyApi running on localhost:${this.port} || press ctrl + c to exit`)
        });
    }

};


module.exports = Server;
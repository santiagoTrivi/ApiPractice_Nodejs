const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('../database/database_connection');
const fileUpload = require('express-fileupload'); 
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('../documentation/documentation_model');
const swaggerJSDoc = require('swagger-jsdoc');


class Server {

    constructor(){
        this.port = process.env.PORT;
        this.app = express();


        this.appPath = {
            login: '/disneyApi/auth/login',
            user: '/disneyApi/auth',
            character: '/disneyApi/characters',
            movie: '/disneyApi/movies'
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

        this.app.use('/disneyApi/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerSpec)));
    };



    routes(){

        this.app.use(this.appPath.user, require('../routes/user_routes'));
        this.app.use(this.appPath.login, require('../routes/user_auth_routes'));
        this.app.use(this.appPath.character, require('../routes/character_routes'));
        this.app.use(this.appPath.movie, require('../routes/movie_routes'));
    }




    listen(){
        this.app.listen(this.port, () =>{
            console.log(`DisnesyApi running on localhost:${this.port} || press ctrl + c to exit`)
        });
    }

};


module.exports = Server;
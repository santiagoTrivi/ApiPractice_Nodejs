const express = require('express');
const cors = require('cors');


class Server {

    constructor(){
        this.port = process.env.PORT;
        this.app = express();


        this.appPath = {
            auth: 'disneyApi/auth/login',
            register: 'disneyApi/auth/register'
        };
    };

    middelawares(){

        this.app.use(cors());

        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(express.json());
    };


    listen(){
        this.app.listen(this.port, () =>{
            console.log(`DisnesyApi running on localhost:${this.port} || press ctrl + c to exit`)
        });
    }

};


module.exports = Server;
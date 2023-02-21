const { Server } = require('./src/models');

require('dotenv').config();


const server = new Server();

server.listen();
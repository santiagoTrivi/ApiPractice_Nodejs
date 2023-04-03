const Server = require("../src/models/server");

const server = new Server();

const chai = require("chai");
const chaiHttp = require("chai-http");

const should = chai.should();

let user = {
    email: 'test1@gmail.com',
    password: 'test1@gmail.com'
};

chai.use(chaiHttp);

describe('get endpoints', () =>{
    
    it('get all the characters registered in the database / status 200', async () => {
        let res = await chai.request(server.app)
        .get('/disneyApi/characters')
        
        await chai.expect(res).to.have.status(200)
    })

    it('get all the characters in a full object', async() => {
        let res = await chai.request(server.app)
        .get('/disneyApi/characters')
        await chai.expect(res).to.be.an('object')
        .to.not.be.empty
    })

    it('get all the movies registered in the database / status 200', async () => {
        let res = await chai.request(server.app)
        .get('/disneyApi/movies')
        await chai.expect(res).to.have.status(200)
    })
    it('get all the movies in a full object', async() => {
        let res = await chai.request(server.app)
        .get('/disneyApi/movies')
        await chai.expect(res).to.be.an('object')
        .to.not.be.empty
    })
});

describe('post endpoints', () =>{
    
   
    it('expect user login to be status 200', async () => {
        let res = await chai.request(server.app)
        .post('/disneyApi/auth/login')
        

        await chai.expect(res).to.have.status(200)
    })
});
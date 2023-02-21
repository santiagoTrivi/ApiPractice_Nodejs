const { request, response } = require("express");


const userLogin = (req = request, res = response) =>{

    const {email, password} = req.body;

    try {
        res.json({
            message: 'correct response',
            email,
            password
        });
        
    } catch (error) {
        res.status(500).send('somthing went wrong');
    }


};

module.exports = {
    userLogin
};
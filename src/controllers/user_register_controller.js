const { request, response } = require("express");
const bcryptjs = require('bcryptjs');



const userRegister = (req = request, res = response) => {
    const {name, email, password, rol} = req.body;

    // check if the rol exist in the database

    const salt = bcryptjs.genSaltSync(10);
    const securitypassword = bcryptjs.hashSync(password, salt);

    try {
        res.json({
            message: 'correct response',
            name,
            email,
            securitypassword,
            rol
        });
        
    } catch (error) {
        res.status(500).send('Sonthing went wrong')
        
    }

};



module.exports = {
    userRegister
}
const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const { Rol } = require('../models');


const userRegister = async (req = request, res = response) => {
    const {name, email, password, rol} = req.body;

    // check if the rol exist in the database
    try {
    const checkRol = await Rol.findOne({where: {rol}});
    const rolId = checkRol.id;

    const salt = bcryptjs.genSaltSync(10);
    const securitypassword = bcryptjs.hashSync(password, salt);

        res.json({
            message: 'correct response',
            name,
            email,
            securitypassword,
            rolId
        });
        
    } catch (error) {
        res.status(500).send('Sonthing went wrong')
        
    }

};



module.exports = {
    userRegister
}
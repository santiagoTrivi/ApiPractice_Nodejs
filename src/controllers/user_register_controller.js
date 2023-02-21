const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const { Rol, User } = require('../models');


const userRegister = async (req = request, res = response) => {
    let {name, email, password, rol} = req.body;


    try {

    const checkRol = await Rol.findOne({where: {rol}});
    const rolId = checkRol.id;

    const salt = bcryptjs.genSaltSync(10);
    password = bcryptjs.hashSync(password, salt);

    const user = await new User({name, email, password, rolId});
    user.save();

        res.json({
            message: 'User registered successfuly',
            user
        });

        
    } catch (error) {
        res.status(500).send('Sonthing went wrong')
        
    }

};



module.exports = {
    userRegister
}
const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const { generatorjwt } = require("../helpers");
const { User } = require("../models");

const userLogin = async (req = request, res = response) =>{

    const {email, password} = req.body;
    let user = req.user;

    if(user.status == 0) return res.status(401).json({status: 'error', message: 'User not registered'});

    const checkPassword = await bcryptjs.compare(password, user.password);
    if(!checkPassword) return res.status(401).json({status: 'error', message: 'Incorrect password'});

    const token = await generatorjwt(user.id);
   
    user = await User.findOne({
        where: {id: user.id},
        attributes: {exclude: ['password', 'status', 'createdAt', 'updatedAt']}
    });

    return res.json({
        status: 'login successfully',
        user,
        token
    });

};

module.exports = {
    userLogin
};
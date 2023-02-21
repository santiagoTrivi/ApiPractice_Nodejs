const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const { generatorjwt } = require("../helpers");

const userLogin = async (req = request, res = response) =>{

    const {email, password} = req.body;
    const user = req.user;

    if(user.status == 0) return res.status(203).json({status: 'error', message: 'User not registered'});

    const checkPassword = await bcryptjs.compare(password, user.password);
    if(!checkPassword) return res.status(203).json({status: 'error', message: 'Incorrect password'});

    const token = await generatorjwt(user.id);

    return res.json({
        status: 'login successfully',
        user,
        token
    });

};

module.exports = {
    userLogin
};
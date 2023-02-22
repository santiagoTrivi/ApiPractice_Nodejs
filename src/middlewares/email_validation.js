const { request, response } = require("express");
const { User } = require("../models");



const emailValidation = async(req = request, res = response, next) => {
    const {email} = req.body;
    const user = await User.findOne({where: {email}});

    if(!user) return res.status(401).json({status: 'error', message: 'email not found'});

    req.user = user;
    next();
    
};

module.exports = {

    emailValidation

};
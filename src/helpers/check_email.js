const { User } = require("../models");



const checkEmail = async(email) =>{

    const checkedEmail = await User.findOne({where: {email}});

    if(checkedEmail) throw new Error('email already registered');

};

module.exports = {

    checkEmail

};
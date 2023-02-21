const { Rol } = require("../models");



const validRol = async (rol) => {

    const valid = await Rol.findOne({where: {rol}});
    
    if(!valid) throw new Error('Wrong rol');

};

module.exports = {

    validRol

};
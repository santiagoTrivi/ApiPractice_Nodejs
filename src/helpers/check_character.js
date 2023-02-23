const { Character } = require("../models");




const checkCharacter = async(character) =>{

    const checkedcharacter = await Character.findOne({where: {name: character}});

    if(checkedcharacter) throw new Error('Character already registered');

};

module.exports = {

    checkCharacter

};
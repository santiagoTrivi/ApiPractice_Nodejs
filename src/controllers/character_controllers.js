const { request, response } = require("express");
const { uploadFiles } = require("../helpers");
const { Character, Movie } = require("../models");


const postCharacter = async(req = request, res = response) => {
    let {name, age, weight, history, img, movie} = req.body;
    // remmenber to add img

    try {

      
        const character = await  Character.create({name, age, weight, history});
        
        if(movie) {

            const [foundMovie] =  await Movie.findOrCreate({where: {tittle: movie}}); 
            await character.addMovie(foundMovie);

        }

        const newCharacter = await Character.findOne({
            where:{name},
            attributes: {exclude: ['id', 'createdAt', 'updatedAt']},
            include: {
                model: Movie,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }
        });
        

        res.json({
            message: 'character registered successfully',
            newCharacter
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Sonthing went wrong');
    }
    

};



module.exports = {

    postCharacter

};
const { request, response } = require("express");
const { Op } = require("sequelize");
const { uploadFiles } = require("../helpers");
const { Character, Movie } = require("../models");


const postCharacter = async(req = request, res = response) => {
    let {name, age, weight, history, movie} = req.body;

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

const getAllCharacters = async( req = request, res = response ) => {
    
    const {limit = 5, name, age, movies} = req.query;
    
    try {

        if(name) {
            let characters = await Character.findAndCountAll({
                where: {
                    name: { [Op.substring]: name }
                }, 
                limit: Number(limit), 
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: {
                    model: Movie, 
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                } 
            });
            return res.json({
                result: (characters) ? [characters] : []
            });
        } ;
        
        if(age) {
            let characters = await Character.findAndCountAll({
                where: {
                    age: { [Op.substring]: age }
                }, 
                limit: Number(limit), 
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: {
                    model: Movie, 
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                } 
            });
            return res.json({
                result: (characters) ? [characters] : []
            });
        };

        if(movies) {
            const movie = await Movie.findByPk(movies);
            
            const characters = await movie.getCharacters({attributes: { exclude: ['createdAt', 'updatedAt'] }});

            return res.json({
                result: (movie.tittle, characters) ? [{movie: movie.tittle, characters}] : []
            });
        };


        let characters = await Character.findAndCountAll({ 
            limit: Number(limit), 
            attributes: { exclude: ['createdAt', 'updatedAt'] }, 
            include: {
                model: Movie, 
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }  
        });
        return res.json({
            result: (characters) ? [characters] : []
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Sonthing went wrong');
    }

};


const updateCharacter = async( req = request, res = response ) => {

    // deectroture the characterId
    const { id } = req.params;
    let {name, age, weight, history, movie} = req.body;

    try {

        const character = await Character.findByPk(id);
        if(!character) return res.json({status: 'error', message: 'Character not found'});

        if(name) await character.update({name});

        if(age) await character.update({age});

        if(weight) await character.update({weight});

        if(history) await character.update({history});

        if(movie){
            const [foundMovie] =  await Movie.findOrCreate({where: {tittle: movie}}); 
            await character.addMovie(foundMovie);
        };

        const updatedCharacter = await Character.findOne({
            where:{id},
            attributes: {exclude: ['id', 'createdAt', 'updatedAt']},
            include: {
                model: Movie,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }
        });

        return res.json({status: 'Updated successfully', updatedCharacter});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Sonthing went wrong');
    }

};

const deleteCharacter = async( req = request, res = response ) => {

    let { id } = req.params;

    try {
        const targetCharacter = await Character.findByPk(id);
        await targetCharacter.destroy();

        
       
        res.json({
            status: 'Character deleted successfully',
            targetCharacter
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Sonthing went wrong')
    }


};



module.exports = {

    postCharacter,
    getAllCharacters,
    updateCharacter,
    deleteCharacter

};
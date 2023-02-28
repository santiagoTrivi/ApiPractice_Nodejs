const { request, response } = require("express");
const { Op } = require("sequelize");
const { Movie, Character, Genre } = require("../models");



const postMovie = async( req = request, res = response ) => {

    let {tittle, creationDate, rating, character, genre} = req.body;

    try {
        
        const movie = await Movie.create({tittle, creationDate, rating});

        if(character){

            const [foundCharacter] = await Character.findOrCreate({where:{name: character}});
            await movie.addCharacter(foundCharacter);

        };

        if(genre){
            const [foundGenre] = await Genre.findOrCreate({where:{genre}});
            await movie.update({GenreId: foundGenre.id});
        };

        const newMovie = await Movie.findOne({
            where: {tittle},
            attributes: {exclude: ['id', 'createdAt', 'updatedAt']},
            include: {
                model: Character,
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }
        });

        res.json({
            message: 'Movie registered successfully',
            newMovie
        });


    } catch (error) {
        console.log(error);
        res.status(500).send('Sonthing went wrong');
    }

};

const getAllmovies = async(req = request, res = response) => {

    const {limit = 5, tittle, genre, order = 'ASC'} = req.query;

    try {

        if(tittle){

            const movies = await Movie.findAndCountAll({
                where: {
                    tittle: { [Op.substring]: tittle }
                },
                limit: Number(limit),
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: Character,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                    {
                        model: Genre,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }
                ],
                order: [['tittle', order]]

            });

            return res.json({
                result: (movies) ? [movies] : []
            });

        };

        if(genre){

            const movies = await Movie.findAndCountAll({
                where: { GenreId: genre },
                limit: Number(limit),
                include: [
                    {
                        model: Character,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                    {
                        model: Genre,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }
                ],
                order: [['tittle', order]]
            });

            return res.json({
                result: (movies) ? [movies] : []
            });

        };

        const movies = await Movie.findAndCountAll({
            limit: Number(limit),
            include: [
                {
                    model: Character,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: Genre,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
            order: [['tittle', order]]
        });

        return res.json({
            result: (movies) ? [movies] : []
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Sonthing went wrong'); 
    }

};

const updateMovie = async(req = request, res = response) => {

    const { id } = req.params;
    const {tittle, creationDate, rating, character, genre} = req.body;

    try {

        const movie = await Movie.findByPk(id);

        if(tittle) await movie.update({tittle});

        if(creationDate) await movie.update({creationDate});        

        if(rating) await movie.update({rating});    

        if(character){

            const [foundCharacter] = await Character.findOrCreate({where:{name: character}});
            await movie.addCharacter(foundCharacter);

        };

        if(genre){
            const [foundGenre] = await Genre.findOrCreate({where:{genre}});
            await movie.update({GenreId: foundGenre.id});
        };

        const updatedMovie = await Movie.findOne({
            where:{id},
            attributes: {exclude: ['id', 'createdAt', 'updatedAt']},
            include: [
                {
                    model: Character,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: Genre,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ]
        });

        return res.json({status: 'Updated successfully', updatedMovie});

    } catch (error) {
        console.log(error);
        res.status(500).send('Sonthing went wrong');
    }

};

const deleteMovie = async(req = request, res = response) =>{

    const { id } = req.params;

    try {
        
        const targetMovie = await Movie.findByPk(id);
        await targetMovie.destroy();

        return res.json({
            status: 'Movie deleted successfully',
            targetMovie
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Sonthing went wrong');
    }

};



module.exports = {

    postMovie,
    getAllmovies,
    updateMovie

};
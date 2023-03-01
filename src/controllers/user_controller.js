const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const { Rol, User } = require('../models');
const { Op } = require("sequelize");
const { sender } = require("../helpers");


const userRegister = async (req = request, res = response) => {
    let {name, email, password, rol} = req.body;


    try {

    const checkRol = await Rol.findOne({where: {rol}});
    const rolId = checkRol.id;

    const salt = bcryptjs.genSaltSync(10);
    password = bcryptjs.hashSync(password, salt);

    let user = await new User({name, email, password, rolId});
    user.save();
    
    let newUser = {
        name: user.name,
        email: user.email,
        rolId: user.rolId

    }

    const compose = {
        from: 'santiagocarvajal103@gmail.com',
        to: user.email,
        subject: 'DisneyApi sign up',
        text: `Dear ${user.name}, thanks for joing to Disney Api pratice. Made by Santiago`
    }

    await sender.sendMail(compose, (err, info) => {

        if(err){
            console.log(err);
        }
        
        console.log(info);

    });
    

    res.json({
        message: 'User registered successfuly',
        newUser
    });

        
    } catch (error) {
        console.log(error);
        res.status(500).send('Sonthing went wrong')
        
    }

};


const getAllUser = async( req = request, res = response) => {
    const {limit = 5} = req.query;
    try {

        const users = await User.findAll({
            where: { status: 1 }, 
            limit: Number(limit), 
            attributes: {exclude: ['password', 'status', 'createdAt', 'updatedAt']}
        });

        const total = await User.count({ where: { status: 1 } });

        res.json( {total, users});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Sonthing went wrong')
    }
};

const updateUser = async( req = request, res = response ) => {
    const { id } = req.params;
    let {name, password, email} = req.body;

    try {
        const user = await User.findByPk(id);

        if(!user) return res.json({status: 'error', message: 'User not found'});

        if(name) await user.update({name});

        if(password){
            const salt = bcryptjs.genSaltSync(10);
            const securitypassword = bcryptjs.hashSync(password, salt);
            await user.update({password: securitypassword});
        }

        if(email){
            const checkedEmail = await User.findOne({where: {email}});
            if(checkedEmail) return res.json({status: 'error', message: 'Email already registeres. try another one'});

            await user.update({email});
        }

        const updates = await User.findByPk(id);

        let UpdatedUser = {
            name: updates.name,
            email: updates.email,
            rolId: updates.rolId
        }

        return res.json({status: 'Updated successfully', UpdatedUser});



    } catch (error) {
        console.log(error);
        res.status(500).send('Sonthing went wrong')
    }

};

const deleteUser = async( req = request, res = response ) => {

    let { id } = req.params;

    try {
        const targetUser = await User.findByPk(id);
        await targetUser.update({status: 0});

        let deletedUser = {
            name: targetUser.name,
            email: targetUser.email,
            rolId: targetUser.rolId
        }
       
        res.json({
            status: 'User deleted successfully',
            deletedUser
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Sonthing went wrong')
    }


};



module.exports = {
    userRegister,
    getAllUser,
    updateUser,
    deleteUser
}
const nodemailer = require('nodemailer');

const sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'santiagocarvajal103@gmail.com',
        pass: 'zkikzzqeosfryhkz'
    }
});


module.exports = {

    sender

};
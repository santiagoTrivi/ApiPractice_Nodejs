const jwt = require('jsonwebtoken');


const generatorjwt = (uid) =>{

    return new Promise( (resolve, reject)=>{
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETKEY, {expiresIn: '5h'}, (err, token)=>{
            if(err){
                console.log(err);
                reject('the token could not be generaterd');
            }else{
                resolve(token);
            }
        });
    });

}

module.exports ={
    generatorjwt
}
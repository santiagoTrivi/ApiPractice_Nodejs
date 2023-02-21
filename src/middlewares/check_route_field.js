const { request, response } = require("express");
const { validationResult } = require("express-validator");


const checkField = (req = request, res = response, next) => {

    const output = validationResult(req);

    if(!output.isEmpty()) return res.status(400).json(output);

    next();

};


module.exports = {

    checkField

};
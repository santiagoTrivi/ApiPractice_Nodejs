
const { Router }= require('express');
const { userLogin } = require('../controllers');

const router = Router();

router.post('/', userLogin);

module.exports = router;
const {Router} = require('express');
const { userRegister } = require('../controllers');

const router = Router();

router.post('/', userRegister);





module.exports = router;
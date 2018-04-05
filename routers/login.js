const router = require('express').Router();
const { login } = require('../controllers/login_controller') 

router.post('/', login)

module.exports = router;
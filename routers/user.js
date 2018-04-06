const router = require('express').Router();
const { addMovie } = require('../controllers/userController');

router.post('/add-movie', addMovie);

module.exports = router;
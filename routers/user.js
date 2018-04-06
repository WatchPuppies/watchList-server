const router = require('express').Router();
const { addMovie, addAnime } = require('../controllers/userController');

router.post('/add-movie', addMovie);
router.post('/add-anime', addAnime);

module.exports = router;
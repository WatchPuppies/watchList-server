const router = require('express').Router();

const { addMovie, deleteShow ,addAnime} = require('../controllers/userController');

router.post('/add-movie', addMovie);
router.post('/delete-show', deleteShow);
router.post('/add-anime', addAnime);


module.exports = router;
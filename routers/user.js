const router = require('express').Router();
const { addMovie, deleteShow } = require('../controllers/userController');

router.post('/add-movie', addMovie);
router.post('/delete-show', deleteShow);

module.exports = router;
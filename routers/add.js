const router = require('express').Router();
const movies = require('../controllers/series');
const anime = require('../controllers/anime');

router.get('/search/movies/', movies.search_movies);
router.get('/search/animes/', anime.search_anime);

module.exports = router;
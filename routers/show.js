const router = require('express').Router()
const { searchMovies, searchAnime, searchSeries } = require('../controllers/shows_controller')

router.get('/search/movies/:query', searchMovies)
router.get('/search/anime', searchAnime)
router.get('/search/series', searchSeries)

module.exports = router
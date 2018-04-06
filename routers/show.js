const router = require('express').Router()
const { searchMovies, searchAnime, searchSeries } = require('../controllers/shows_controller')

router.get('/search/movies/:query', searchMovies)
<<<<<<< HEAD
router.get('/search/anime/:query', searchAnime)
=======
router.get('/search/anime', searchAnime)
>>>>>>> d1f654913215e408fb7f46a1ea80ecfb67196dd4
router.get('/search/series', searchSeries)

module.exports = router
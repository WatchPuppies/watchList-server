const router = require('express').Router();
const { showWatchlist } = require('../controllers/home_controller')

router.get('/', showWatchlist)

module.exports = router;
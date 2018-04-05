const router = require('express').Router();
const { userData, addWatchlist, deleteWatchlist } = require('../controllers/home_controller')

router.get('/', userData)

module.exports = router;
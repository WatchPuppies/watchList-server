const router = require('express').Router()
const { showData } = require('../controllers/shows_controller')

router.get('/', showData)

module.exports = router
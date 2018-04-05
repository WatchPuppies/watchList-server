const router = require('express').Router();
const {signInFb} = require('../controllers/userController')

router.get('/', (req,res) =>{
  res.status(200).json({
    message: "success"
  })
})
router.post('/signinfb', signInFb)

module.exports = router;
const Show = require('../models/Show')

module.exports = {
  showWatchlist: function(req,res) {
    Show.find()
    .then(data => {
      
      // console.log('here', data);
      res.status(200).send({
        data
      })
    })
    .catch(err => {
      res.status(500).send({
        err
      })
    })
  },

  deleteWatchlist: function(req, res) {
    
  }
}
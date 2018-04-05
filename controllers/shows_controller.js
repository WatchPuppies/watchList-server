const axios = require('axios')
const tmdb_key = process.env.TMDB_KEY

console.log(tmdb_key);


module.exports = {
  showData: function (req, res) {
    let query = req.body.search

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb_key}&query=${query}&include_adult=false`)
    .then(function (response) {
      let result = response.data.results
      res.status(200).send(result)
    })
    .catch(function (error) {
      res.status(400).send(error.message)
    });
  }
}
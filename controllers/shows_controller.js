const axios = require('axios')
const tmdb_key = process.env.TMDB_KEY

module.exports = {
  searchMovies: function (req, res) {
    let query = req.params.query

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb_key}&query=${query}&include_adult=false`)
    .then(function (response) {
      let result = response.data.results
      res.status(200).send(result)
    })
    .catch(function (error) {
      res.status(400).send(error.message)
    });
  },

  searchSeries: function(req, res){
    let query = req.params.query

    axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
    .then(function(seriesData){
      res.status(200).send(seriesData.data)
    })
    .catch(function(err){
      res.status(401).send(err);
      console.log(err);   
    })
  },

  searchAnime: function(req, res){
    let search = req.params.query

    axios.create({
        baseURL: "https://anilist.co/api",
        headers: {'Authorization': `Bearer ${process.env.ANILIST_KEY}`}
    })
    .get(`https://anilist.co/api/anime/search/${search}`)
    .then(function(animeData){
        res.status(200).send(animeData.data)
    })
    .catch(function(err){
        console.log(err);
    })
  }
}
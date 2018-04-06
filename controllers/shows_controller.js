const axios = require('axios')
const tmdb_key = process.env.TMDB_KEY
const anilist_key = process.env.ANILIST_KEY

module.exports = {
  searchMovies: function (req, res) {
    let query = req.params.query

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdb_key}&query=${query}&include_adult=false`)
    .then(function (responseMovie) {
      let movie = responseMovie.data.results
      
      axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=b22c760fa08932d04fe280373432a8c3`)
      .then(function (responseGenre) {
        let genre = responseGenre.data.genres

        res.status(200).send({
          movie,
          genre
        })
      })
      .catch(function (error) {
        console.log(error.message);
      })
    })
    .catch(function (error) {
      res.status(400).send(error.message)
    });
  },

  searchSeries: function(req, res){
    let query = req.body.search

    axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
    .then(function(seriesData){
      console.log(seriesData);
      
      res.status(200).send(seriesData.data)
    })
    .catch(function(err){
      res.status(401).send(err.message);
      console.log(err);   
    })
  },

  searchAnime: function(req, res){
    let id = req.params.id
    let search = req.body.search

    axios.create({
      baseURL: "https://anilist.co/api",
      headers: {'Authorization': `Bearer ${process.env.ANILIST_KEY}`}
    })
    .get(`https://anilist.co/api/anime/search/${search}`)
    .then(function(animeData){
      res.status(200).send(animeData.data)
    })
    .catch(function(err){
      res.status(400).send(err.message)
      console.log(err);
    })
  }
}
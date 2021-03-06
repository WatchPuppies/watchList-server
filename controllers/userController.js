const axios = require('axios')
const User = require('../models/User')
const Show = require('../models/Show')
const Watchlist = require('../models/Watchlist')
const jwt = require('jsonwebtoken')
const FB = require('fb')
const secret = process.env.SECRET

module.exports = {
  addMovie : function(req, res) {
    let movieId = req.body.movieId
    let userData = req.body.userData

    axios.get(` https://api.themoviedb.org/3/movie/${movieId}?api_key=b22c760fa08932d04fe280373432a8c3`)
    .then(function(response) {
      let movie = response.data
      let genrelist = []

      
      movie.genres.forEach(genre => {
        genrelist.push(genre.name)
      })

      movie.genre = genrelist.join(', ')
      
      let newShow = new Show({
        movieId: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        category: 'Movies',
        genre: movie.genre,
        rating: movie.vote_average,
        description: movie.overview,
        duration: '-'
      })

      let newWatchlist = new Watchlist({
        users: userData,
        movies: newShow,
        status: 'Belum ditonton'
      })
      
      newShow.save()
      .then(success => {
        console.log(success);
        
        res.status(201).send({
          message: 'Add data success',
          data: success
        })
      })
      .catch(error => {
        res.status(500).send({
          message: 'Add data failed',
          detail: error.message
        })
      })
    })
    .catch(function(error) {
      res.status(400).send(error.message)
    })
  },
  addAnime: function(req, res){
      let animeId = req.body.animeId
  
      axios.create({
        baseURL: "https://anilist.co/api",
        headers: {'Authorization': `Bearer ${process.env.ANILIST_KEY}`}
      }).get(`https://anilist.co/api/anime/${animeId}`)
      .then(function(response) {
        let anime = response.data
        console.log(anime);
        anime.genre = anime.genre.join(', ')
        
        let newShow = new Show({
          animeId: anime.id,
          title: anime.title_english,
          poster: anime.image_url_lge,
          category: 'Anime',
          genre: anime.genre,
          rating: anime.average_score,
          description: anime.description,
          duration: anime.duration
        }) 
        newShow.save()
        .then(success => {
          console.log(success);
          
          res.status(201).send({
            message: 'Add data success',
            data: success
          })
        })
        .catch(error => {
          res.status(500).send({
            message: 'Add data failed',
            detail: error.message
          })
        })
      })
      .catch(function(error) {
        res.status(400).send(error.message)
      })
  },

  deleteShow : function(req, res) {
    let showId = req.body.showId
    console.log('HEREEEEE', showId);
    

    Show.deleteOne({
      _id: showId
    })
    .then(success => {
      res.status(200).send(success)
    })
    .catch(error => {
      res.status(400).send(error.message)
    })
  },

  signInFb : (req, res) => {
    FB.api('me', {fields:['id', 'name', 'email', 'picture'], access_token:req.headers.fbtoken},(response)=>{
      console.log("response==", response)
      if(response){
        User.findOne({
          email: response.email
        })
        .exec()
        .then(dataUser =>{
          console.log("datauser", dataUser)
          if(dataUser === null){
            console.log("masuk")
            User.create({
              name: response.name,
              email: response.email,
              fbId: response.id,
              picture: response.picture.data.url
            }, (error, newUser)=>{
              console.log("new user==", newUser)
              if(!error){
                let token = jwt.sign({id:newUser._id},secret)
                res.status(201).json({
                  message: "login success, new user created!",
                  user: ({
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    fbId: newUser.fbId,
                    picture: newUser.picture,
                    token
                  })
                })
              }else{
                res.status(400).json({
                  message: "login failed",
                  error
                })
              }
            })
          }else{
            let token = jwt.sign({id:dataUser._id},secret)
            res.status(201).json({
              message: "login success, new user created!",
              user: ({
                _id: dataUser._id,
                name: dataUser.name,
                email: dataUser.email,
                fbId: dataUser.fbId,
                picture: dataUser.picture,
                token
              })
            })
          }
        }).catch(error=>{
          res.status(400).json({
            message: "error connection",
            error
          })
        })
      }else{
        res.status(200).json({
          message: "error connect with fb api"
        })
      }
    })
  }
}
const axios = require('axios');

module.exports = {
    search_movies: function(req, res){
        let query = req.body.search

        axios.get(`http://api.tvmaze.com/search/shows?q=${query}`)
        .then(function(seriesData){

            res.status(200).send(seriesData.data)
            .catch(function(err){
                res.status(401).send(err);
            })

        })
        .catch(function(err){
            console.log(err);   
        })
    }
}
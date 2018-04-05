const axios = require('axios');

module.exports = {
    search_anime : function(req, res){
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
            console.log(err);
        })
    }
}

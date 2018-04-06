const mongoose = require('mongoose')
const Schema = mongoose.Schema

const watchlistSchema = new Schema({
  users: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  shows: [{
    type: Schema.Types.ObjectId, ref: 'Show'
  }],
  status: String
},{
  timestamps: true
})

const Watchlist = mongoose.model('Watchlist', watchlistSchema)

module.exports = Watchlist
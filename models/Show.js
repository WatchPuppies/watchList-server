const mongoose = require('mongoose')
const Schema = mongoose.Schema

let showSchema = new Schema({
  title: String,
  poster: String,
  category: String,
  genre: String,
  rating: String,
  description: String,
  duration: String
},{
  timestamps: true
})

let Show = mongoose.model('Show', showSchema)

module.exports = Show
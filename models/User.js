const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  email: String,
  fbId: String,
  picture: String,
  movieList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Movies'
    }
  ]
},{
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
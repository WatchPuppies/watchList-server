const User = require('../models/users')
const jwt = require('jsonwebtoken')
const FB = require('fb')

module.exports = {
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
                let token = jwt.sign({id:newUser._id},'kitten')
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
            let token = jwt.sign({id:dataUser._id},'kitten')
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
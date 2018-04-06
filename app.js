const express = require('express');
const app = express();
const morgan = require('morgan')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
const cors = require('cors')

const loginRoute = require('./routers/login.js');
const homeRoute = require('./routers/home.js');
const showsRoute = require('./routers/show.js');
const userRoute = require('./routers/user.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
mongoose.connect('mongodb://localhost:27017/watchlist');

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connected to db success...')
})

app.use('/', loginRoute);
app.use('/home', homeRoute);
app.use('/show', showsRoute);
app.use('/user', userRoute);

app.listen(port, () => {
    console.log('Listening on port', port);
})
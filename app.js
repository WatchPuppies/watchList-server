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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
mongoose.connect('mongodb://localhost/watchlist');

let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connected to db success...')
})

app.use('/', loginRoute);
app.use('/home', homeRoute);
app.use('/show', showsRoute);

app.listen(port, () => {
    console.log('Listening on port', port);
})
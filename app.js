const express = require('express');
const app = express();
const morgan = require('morgan')
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
const cors = require('cors')
const loginRoute = require('./routers/login.js');
const addRoute = require('./routers/add.js');
require('dotenv').config()

app.use(morgan('dev'));
mongoose.connect('mongodb://localhost:27017/watchlist');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('=====Connect to db=====')
});

const loginRoute = require('./routers/login');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', loginRoute);
app.use('/add', addRoute);

app.listen(port, () =>{
    console.log('listening on port '+port);
})
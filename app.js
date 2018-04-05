const express = require('express');
const morgan = require('morgan')
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
const loginRoute = require('./routers/login.js');
const addRoute = require('./routers/add.js');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
// mongoose.connect('mongodb://localhost/watchlist');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/', loginRoute);
app.use('/add', addRoute);

app.listen(3000, () =>{
    console.log('listening on port 3000');
})
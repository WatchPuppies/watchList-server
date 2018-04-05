const express = require('express');
const app = express();
const morgan = require('morgan')
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
const loginRoute = require('./routers/login.js');

app.use(morgan('dev'));
mongoose.connect('mongodb://localhost/watchlist');
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/', loginRoute);

app.listen(3000, () =>{
    console.log('listening on port 3000');
})
'use strict'
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const Controller = require('./controllers/controller');
const app = express();

const dbConnect = mongoose.connect('mongodb://trof:585465077m@ds137230.mlab.com:37230/budgetwebapp');

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || 'localhost';

//set up template engine
app.set('view engine', 'jade');
//static files
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: false }));
Controller(app, dbConnect);

app.listen(PORT, IP, () => {
    console.log('server is running at port ' + PORT);
});

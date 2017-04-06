var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var Controller = require('./controllers/controller');
var app = express();

var dbConnect = mongoose.connect('mongodb://trof:585465077m@ds137230.mlab.com:37230/budgetwebapp');

//set up template engine
app.set('view engine', 'jade');
//static files
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: false }));
Controller(app, dbConnect);

app.listen(3000, function() {
    console.log('server is running at port 3000')
});


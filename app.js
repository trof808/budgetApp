var express = require('express');
var Controller = require('./controllers/controller')
var app = express();

//set up template engine
app.set('view engine', 'jade');
//static files
app.use('/assets', express.static('assets'));

Controller(app);

app.listen(3000, function() {
    console.log('server is running at port 3000')
});


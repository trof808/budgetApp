'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
// const cookieParser = require('cookie-parser');
// const cookieSession = require('cookie-session');
// const session = require('express-session');
const mainController = require('./controllers/controller');
const config = require('./config');
// const connect = require('connect');
const MongoStore = require('connect-mongo')(express);

const dbConnect = require('./db/db');

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || 'localhost';

//set up template engine
app.set('view engine', 'jade');
//static files
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.cookieParser());

// app.use(cookieParser(config.cookieSecret));
// app.use(cookieSession({
//     name: 'session',
//     keys: config.cookieSecret
// }));
// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     secret: config.cookieSecret
// }));

app.use('/', mainController);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

app.listen(PORT, IP, () => {
    console.log('server is running at port ' + PORT);
});

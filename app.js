'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mainController = require('./controllers/controller');
const userController = require('./controllers/user');
const config = require('./config');
const MongoStore = require('connect-mongo')(session);
const path = require('path');

const app = express();

const dbConnect = require('./db/db');

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || 'localhost';

//set up template engine
app.set('view engine', 'jade');

//static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: false }));

//set up sessions
app.use(cookieParser());
app.use(cookieParser(config.cookieSecret));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.cookieSecret
    // store: new MongoStore({
    //     mongoose_connection: dbConnect
    // })
}));

app.use('/', mainController);
app.use('/user', userController);

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

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
app.use(cookieParser(config.cookieSecret));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.cookieSecret
}));

//logger
if (app.get('env') === 'development') {
    app.use(require('morgan')('dev'));
} else if ((app.get('env') === 'production')) {
    app.use(require('express-logger')({
        path: __dirname + '/log/request.log'
    }));
}

//shows which worker handle requests
// app.use((req, res, next) => {
//     const cluster = require('cluster');
//     if(cluster.isWorker) {
//         console.log('Исполнитель ' + cluster.worker.id + ' получил запрос');
//         next();
//     }
//     next();
// });

//routing
app.use('/', mainController);
app.use('/user', userController);

//error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

//listening server
const startServer = () => {
    app.listen(PORT, IP, () => {
        console.log('server is running at port ' + PORT + ' в среде ' + app.get('env'));
    });
};
if(require.main === module) {
    startServer();
} else {
    module.exports = startServer;
}


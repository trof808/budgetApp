'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const config = require('./config');
const path = require('path');
const pg = require('pg');
const mainController = require('./controllers/controller');

const app = express();

const dbConnect = require('./db/db');

var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname,'assets','img','favicon.ico')));

const PORT = process.env.PORT || 3001;
const IP = process.env.IP || 'localhost';

//set up template engine
app.set('view engine', 'jade');

//static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: false }));

//set up sessions
// app.use(cookieParser(config.cookieSecret));
// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     secret: config.cookieSecret,
//     store: new pgSession({
//       pg: pg,
//       conString: config.connectionString,
//       tableName: 'sessions_table'
//     })
// }));

//logger
if (app.get('env') === 'development') {
    app.use(require('morgan')('dev'));
} else if ((app.get('env') === 'production')) {
    app.use(require('express-logger')({
        path: __dirname + '/log/request.log'
    }));
}

//routing
app.use('/', mainController);
// app.use('/user', userController);

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

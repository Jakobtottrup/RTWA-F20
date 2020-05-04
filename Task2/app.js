const createError = require('http-errors');
const express = require('express');
const expressValidator = require('express-validator');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');
const errorRouter = require('./routes/errors');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser');
const connectDB = require('./DB/connection');



const app = express();
connectDB();
// view engine setup

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`));

app.use(session({
    secret: 'superSecretStuff',
    resave: false,
    saveUninitialized: false
}));

app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        let namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));
app.use(logger('dev'));
//app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', mainRouter);
app.use('/', errorRouter);
app.use('/users', usersRouter);



/*** ************ ***/
/** FLASH MESSAGES **/
/*** ************ ***/

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.warning = req.flash('warning');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    res.locals.admin = req.admin || null;
    next();
});

app.use((req, res, next) => {
    for (let key in req.query) {
        req.query[key.toLowerCase()] = req.query[key];
    }
    next();
});

/*** ****** ***/
/** PASSPORT **/
/*** ****** ***/

require('./passport')(passport);

app.use(passport.initialize());
app.use(passport.session());



module.exports = app;

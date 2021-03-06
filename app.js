
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var settings = require('./settings');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'b.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('Bookshelf'));
app.use(session({
    secret: settings.cookieSecret,
    resave: true, 
    saveUninitialized: true, 
    cookie: {maxAge: 1000 * 60 * 60}}));

app.use(flash(app));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.locals.pretty = true;

module.exports = app;

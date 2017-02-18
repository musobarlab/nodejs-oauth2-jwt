let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

//let auth = require('./lib/config/auth');
let middleware = require('./lib/config/middleware');

let authHandler = require('./lib/handlers/auth_handler');
let userHandler = require('./lib/handlers/user_handler');

let app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use(auth.init());

app.get('/', (req, res, next) => {
  res.status(200).json({message: 'your app is already to use...'});
});

//registering client
app.post('/register_client', userHandler.registeringClient);

// request token
app.post('/token', authHandler);

//protected resource

app.get('/profile_test', middleware.verifyToken, userHandler.getProfileTest);

app.get('/client_test', middleware.verifyToken, userHandler.getClientTest)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
    });
});

module.exports = app;

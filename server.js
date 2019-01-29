require('dotenv').config();

var express = require("express");
var methodOverride = require('method-override');
var bodyParser = require("body-parser");
var index = require("./controllers/index_controllers");
var users = require("./controllers/users_controllers");
var events = require("./controllers/events_controllers");
var volunteers = require("./controllers/volunteers_controllers");
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passportConfig = require('./config/passportConfig');
var middleware = require('./middleware/index');
var db = require("./models");
var flash = require('connect-flash');
var app = express();
 

//SETUP APP TO USE PACKAGES
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

//flash messages config
app.use(flash());
//PASSPORT CONFIG
app.use(cookieParser());
app.use(session({
  secret: 'super-secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Track the current user
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.info = req.flash('info');
  next();
});

//SET UP APP TO USE CONTROLLERS/ROUTES
app.use(index);
app.use(users);
app.use(events);
app.use(volunteers);

// App PORT setting
var PORT = process.env.PORT || 8088;
// Application server.
db.sequelize.sync({}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
}).catch(function (err) {
  console.log(err);
});
var methodOverride = require('method-override');
var express = require("express");
var bodyParser = require("body-parser");
var index = require("./controllers/index_controllers");
var users = require("./controllers/users_controllers");
var events = require("./controllers/events_controllers");
var volunteers = require("./controllers/volunteers_controllers");
var db = require("./models");

var app = express();

// App PORT setting
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8088;

app.use(index);
app.use(users);
app.use(events);
app.use(volunteers);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

// Application server.
db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

var express = require('express');
var bodyParser = require('body-parser');
var router = require('./controllers/via_controllers');
var db = require("./models");

var app = express();

// App PORT setting
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8088;

app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.set("view engine", "ejs");

// Application server.
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
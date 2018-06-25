var methodOverride = require('method-override');
var express = require('express');
var db = require('../models');
var router = express.Router();
var bodyParser = require('body-parser');
var sequelize = require('sequelize');

//config
router.use(methodOverride("_method"));
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

//==============================================
//Catch all routes and redirect to home page
//==============================================
router.get('/', function (req, res) {
    res.redirect('/index');
});

//home page route
router.get('/index', function (req, res) {
    res.render('index');
});

//login route
router.get('/login', function (req, res) {
    res.render("users/login");
});


//Post route to login
router.post('/login', function (req, res) {
    res.redirect("/events");
});


module.exports = router;
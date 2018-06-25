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


//signup route
router.get('/signup', function (req, res) {
    res.render("users/signup");
});

//Post route to create users
router.post('/signup', function (req, res) {
    res.redirect("/login");
});













module.exports = router;
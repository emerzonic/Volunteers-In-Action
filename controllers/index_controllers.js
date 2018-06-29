var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var middleware = require("../middleware");
var passport = require("passport");

//config
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
router.post("/login", passport.authenticate("local", {
    // successRedirect: "/events",
    // failureRedirect: "/login"
}), function(req, res) {
    console.log('This is req.body+++++++++++++++++    '+JSON.stringify(req.user));
});


//Log out route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/index");
});

module.exports = router;
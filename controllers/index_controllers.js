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

//==============================================
//Route to home page
//==============================================
router.get('/index', function (req, res) {
    res.render('index');
});


//==============================================
//Route to login to page
//==============================================
router.get('/login', function (req, res) {
    res.render("users/login");
});


//==============================================
//Route to login user
//==============================================
router.post('/login',
    passport.authenticate('local-login', {
        successRedirect: '/index',
        failureRedirect: '/login',
        failureFlash: true
    })
);

//==============================================
//Logout route
//==============================================
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You are logged out!");
    res.redirect("/index");
});

module.exports = router;
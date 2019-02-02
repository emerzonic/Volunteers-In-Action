var methodOverride = require('method-override');
var express = require('express');
var db = require('../models');
var router = express.Router();
var bodyParser = require('body-parser');
var middleware = require("../middleware");

//config
router.use(methodOverride("_method"));
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());


//==============================================
//Add new volunteer routes
//==============================================
// Show volunteer form
router.get('/events/:id/volunteers/new', middleware.isLoggedIn, function (req, res) {
    db.Event.findById(req.params.id).then(function (event) {
        res.render("volunteers/new", {
            event: event
        });
    });
});


//post route to sign up volunteers
router.post('/events/:id/volunteers', function (req, res) {
    var info = req.body;
    if(info.first_name && info.last_name && info.age && info.contact){
    db.Volunteer.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age:req.body.age,
            contact: req.body.contact,
            EventId: req.params.id,
            UserId: req.user.dataValues.id
        }).then(function (data) {
            req.flash("success","Congratulations! You are successfully signed up.");
            res.redirect('/events/');
        });
    }else{
    req.flash("error","You did not provide all info.");
    res.redirect('/events/');
    }
});


router.get('/users/:id/volunteers/new', function (req, res) {
    db.Event.findById(req.params.id).then(function (event) {
        res.render("volunteers/new", {
            event: event
        });
    });
});


module.exports = router;
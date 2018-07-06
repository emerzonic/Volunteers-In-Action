var express = require('express');
var router = express.Router();
var passport = require("passport");
var db = require('../models');
var sequelize = require('sequelize');
var op = sequelize.Op;


//==============================================
//Route to signup page
//==============================================
router.get('/signup', function (req, res) {
    res.render("users/signup");
});

//==============================================
//Route to signup user
//==============================================
router.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (error, user, info) {
        if (user) {
            req.logIn(user, function (err) {
                if (err) {
                     req.flash("error", error.message);
                    return res.redirect('/signup');
                } else {
                    req.flash("success", "Welcome to Volunteers In Actions, " + user.first_name);
                    res.redirect('/events');
                }
            });
        }
        if (!user) {
            req.flash("error", "Missing info or a user with that email or username already exist.");
            res.redirect('/signup');
        }
        if (error) {
            req.flash("error", error.message);
            res.redirect('/signup');
        }
    })(req, res, next);
});



//==============================================
//Route to get user profile page
//==============================================
// router.get('/user', function (req, res) {
//     res.render('users/user');
// });


//==============================================
//Route to get user profile page
//==============================================
router.get('/user/:id', function (req, res) {
    db.Event.findAll({
        order: sequelize.col('date'), //ordering events by the closest date
        where: {
            UserId: req.params.id
        }
    }).then(events => {
        if(events && events.length > 0){
        // console.log(JSON.stringify(events));
        res.render("users/user", {
            events: events
        });
        }else{
        req.flash("info","You do not have any events.");
        // res.redirect('/user');
    }
});


module.exports = router;


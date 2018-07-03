var express = require('express');
var router = express.Router();
var passport = require("passport");


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
                console.log('This is the new user\n\n'+ req.user.username);
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
            req.flash("error", "A user with that email or username already exist.");
            res.redirect('/signup');
        }
        if (error) {
            req.flash("error", error.message);
            res.redirect('/signup');
        }
    })(req, res, next);
});


module.exports = router;


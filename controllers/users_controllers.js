var express = require('express');
var db = require('../models');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require("passport");

//config
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());


//signup route
router.get('/signup', function (req, res) {
    res.render("users/signup");
});



// Post route to signup new users
router.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
        if (user) {
            req.logIn(user, function (err) {
                console.log('This is the new user '+ req.user.dataValues.username);
                if (err) {
                    return next(err);
                } else {
                    res.redirect('/events');
                }
            });
        }
        if (!user) {
            res.redirect('/signup');
        }
        if (err) {
            res.send({
                success: false,
                response: 'Authentication failed'
            });
        }
    })(req, res, next);
});




module.exports = router;


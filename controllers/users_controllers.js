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
    passport.authenticate('local-signup', function (err, user, info) {
        if (user) {
            req.logIn(user, function (err) {
                console.log('This is the new user\n\n'+ req.user.username);
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


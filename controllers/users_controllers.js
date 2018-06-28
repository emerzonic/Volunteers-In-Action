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

//Post route to create users
router.post('/signup', function (req, res) {
    db.User.findOrCreate({
            where: {
                username: req.body.username
            }, defaults:{
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                email:req.body.email
            }
        }).spread((user, created) => {
        if (created) {
            res.redirect('/login');
        } else {
            res.redirect('/signup');
        }
    });
});


// router.post("/register", function (req, res) {
//     req.body.username;
//     req.body.password;
//     User.register(new User({
//         username: req.body.username
//     }), req.body.password, function (err, user) {
//         if (err) {
//             req.flash("error", err.message);
//             return res.render('register');
//         } else {
//             passport.authenticate("local")(req, res, function () {
//                 req.flash("success", "Welcome to YelpCamp, " + user.username);
//                 res.redirect("/campgrounds");
//             });
//         }
//     });
// });


//Post route to create users
// router.post('/signup', function (req, res) {
//     db.User.findOne({
//         where: {
//             username: req.body.username
//         }
//     }).then(function (user) {
//         console.log('This is found user: '+ user.dataValues.username);
//         if (!user) {
//             db.User.create(req.body, function (err, user) {
//                 // console.log('User is');
//                 console.log('This is the new user: '+ user.dataValues.username);
//                 res.redirect('/login');
//             });
//         } else {
//             res.redirect('/signup');
//         }
//     });
// });







module.exports = router;







// .findOrCreate({
//         where: {
//             username: 'sdepold'
//         },
//         defaults: {
//             job: 'Technical Lead JavaScript'
//         }
//     })
//     .spread((user, created) => {
//         console.log(user.get({
//             plain: true
//         }));
//         console.log(created)
//     });
var LocalStrategy = require("passport-local").Strategy;
var passport = require("passport");
var db = require("../models/");
// var passportLocalSequelize = require('passport-local-sequelize');


//serialize sessions
passport.serializeUser(function (user, done) {
    done(null, user);
});

//deserialize Sessions
passport.deserializeUser(function (user, done) {
    db.User.findOne({
        where: {
            id: user.id
        }
    }).then(user => {
        done(null, user);
    }).error(function (err) {
        done(err, null);
    });
});


//For authentication purposes
passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, password, done) {
        db.User.findOne({
            where: {
                username: username
            }
        }).then((user, err) => {
            console.log('I entered: ' + user);
            console.log('error: ' + err);
            if (err) {
                console.log(err);
                return done(null, false);
            }
            if (user) {
                return done(null, false);
            }
            if (!user) {
                db.User.create({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                }).then(function (user) {
                    return done(null, user.get());
                }).catch(function (err) {
                    console.log(err, req.body);
                    return done(null, err);
                });
            }
        });
    }));


passport.use('local-login', new LocalStrategy(
    function (username, password, done) {
        db.User.findOne({
            where: {
                username: username
            }
        }).then((user, err) => {
            if (err) {
                console.log(err);
                return done(null, false);
            }
            if (!user) {
                return done(null, false);
            }
            if (user) {
                var passwd = user.password;
                isMatch = db.User.validPassword(password, passwd, done, user);
            }
        });
    }));

module.exports = passport;
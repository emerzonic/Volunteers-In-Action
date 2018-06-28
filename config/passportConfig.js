var LocalStrategy    = require("passport-local").Strategy;
var passport         = require("passport");
var db = require("../models/");
// var passportLocalSequelize = require('passport-local-sequelize');


//serialize sessions
passport.serializeUser(function(user, done){
done(null, user);
});

//deserialize Sessions
passport.deserializeUser(function(user, done){
    db.User.find({where:{id:user.id}}).success(function(user){
        done(null, user);
    }).error(function(err){
        done(err, null);
    });
});


//For authentication purposes
passport.use(new LocalStrategy(
    function(username, password, done){
        db.User.findOne({where:{username:username}}, function(user){
            var passwd = user ? user.password: ''
            console.log(passwd);
            isMatch = db.User.validPassword(password, passwd, done, user);
        });
    }));

    // passport.use(new LocalStrategy(
    //     function(username, password, done) {
    //       User.findOne({ username: username }, function (err, user) {
    //         if (err) { return done(err); }
    //         if (!user) { return done(null, false); }
    //         if (!user.verifyPassword(password)) { return done(null, false); }
    //         return done(null, user);
    //       });
    //     }
    //   ));

module.exports = passport;



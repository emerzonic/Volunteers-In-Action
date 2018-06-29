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
    db.User.findOne({where:{id:user.id}}).then(user =>{
        done(null, user);
    }).error(function(err){
        done(err, null);
    });
});


//For authentication purposes
passport.use(new LocalStrategy(
    function(username, password, done){
        db.User.findOne({where:{username:username}}).then(user =>{
            var passwd = user ? user.password: ''
            console.log(passwd);
            isMatch = db.User.validPassword(password, passwd, done, user);
        });
    }));


module.exports = passport;



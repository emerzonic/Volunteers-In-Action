// var events =require("../controllers/events_controllers");
// var volunteers =require("../controllers/volunteers_controllers");
var db = require('../models');
//All middleware goes here
var middleware = {};


middleware.IsAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.render('users/login');
    }
};


middleware.destroySession = function(req,res, next){
    req.logOut();
    req.session.destroy();
    res.redirect('/index');
};


//check user own the event
middleware.checkEventOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
     db.Event.findById(req.params.id, function(err, event) {
         if (err) {
            //  req.flash("error","Campground not found.");
             res.redirect("back");
         } else {
             //does the user own the campground?
             if (event.userId.equals(req.user.id)) {
                 next();
             } else {
                //  req.flash("error","You do not have permission to this Campground.");
                 res.redirect("back");
             }
         }
     });
     
 } else {
    //  req.flash("error","You need to be logged in to that.");
     res.redirect("back"); 
 }
};



//middleware
middleware.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
    return next();

}
// req.flash("error","You need to be logged in to do that");
res.redirect("/login");
};


module.exports = middleware;
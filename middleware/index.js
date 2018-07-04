var db = require('../models');
//All middleware goes here
var middleware = {};


middleware.destroySession = function (req, res, next) {
    req.logOut();
    req.session.destroy();
    res.redirect('/index');
};

//check user own the event
middleware.checkEventOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        db.Event.findById(req.params.id).then((event) => {
            //does the user own the event?
            if (event.UserId === req.user.dataValues.id) {
                next();
            } else {
                 req.flash("error","You do not have permission to this event.");
                res.redirect("back");
            }
        });
    } else {
         req.flash("error","You need to be logged in to do that.");
        res.redirect("back");
    }
};


//middleware
middleware.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error","You need to be logged in to do that.");
    res.redirect("/login");
};


module.exports = middleware;
var express = require("express");
var router = express.Router();
var passport = require("passport");
var db = require("../models");
var sequelize = require("sequelize");
var op = sequelize.Op;
var middleware = require("../middleware");

//==============================================
//Route to signup page
//==============================================
router.get("/signup", function (req, res) {
  res.render("users/signup");
});

//==============================================
//Route to signup user
//==============================================
router.post("/signup", function (req, res, next) {
  passport.authenticate("local-signup", function (error, user, info) {
    if (user) {
      req.logIn(user, function (err) {
        if (err) {
          req.flash("error", error.message);
          return res.redirect("/signup");
        } else {
          req.flash(
            "success",
            "Welcome to Volunteers In Action, " + user.first_name
          );
          res.redirect("/events");
        }
      });
    }
    if (!user) {
      req.flash(
        "error",
        "Missing info or a user with that email or username already exist."
      );
      res.redirect("/signup");
    }
    if (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  })(req, res, next);
});




//==============================================
//Route to get user events
//==============================================
router.get("/user/:id", middleware.isLoggedIn, function (req, res) {
  db.Event.findAll({
    order: sequelize.col("date"), //ordering events by the closest date
    where: {
      UserId: req.params.id
    }
  }).then(createdEvents => {
    db.Volunteer.findAll({
      where: {
        UserId: req.params.id
      },
      include: [{
        model: db.Event,
        where: {
          date: {
            [op.gte]: new Date()
          },
        },
      }]
    }).then(vol => {
      var signupEvents = [];
      vol.forEach(ele => {
        signupEvents.push(ele.dataValues.Event.dataValues);
      });
      var data = {
        signupEvents: signupEvents,
        createdEvents: createdEvents
      };
      res.render("users/user", {
        data: data
      });
    });
  });
});


module.exports = router;
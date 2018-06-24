var express = require('express');
var db = require('../models');
var router = express.Router();
var bodyParser = require('body-parser');
var sequelize = require('sequelize');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

//Catch all routes and redirect to home page
router.get('/', function (req, res) {
    res.redirect('/index');
});

//home page route
router.get('/index', function (req, res) {
    res.render('index');
});


//login route
router.get('/login', function (req, res) {
    res.render("login");
});

//signup route
router.get('/signup', function (req, res) {
    res.render("signup");
});


//events page route
router.get('/events', function (req, res) {
    db.Event.findAll({
        order: sequelize.col('date') //ordering events by the closest date
    }).then(function (events) {
        res.render("events", {
            events: events
        });
    });
});


router.get('/events/new', function (req, res) {
    res.render("new");
});


router.get('/events/edit', function (req, res) {
    res.render("edit");
});


//post route to create new event
router.post('/events', function (req, res) {
    db.Event.create({
        event_name: req.body.eventName,
        location: req.body.location,
        date: req.body.date,
        star_time: req.body.start_time,
        end_time: req.body.ens_time,
        description: req.body.description,
        organizer: req.body.fname + ' ' + req.body.lname, //Adding the first name and last name together
        contact: req.body.email,
        volunteers_needed: req.body.volunteers
    }).then(function () {
        res.redirect('/events');
    });
});



//get route to event datails
router.get("/events/:id", function (req, res) {
    var eventId = req.params.id;
    db.Event.findById(eventId).then(function (event) {
        console.log(event);
        res.render("show", {
            event: event
        });
    });
});



//put route to update events
router.put('/index/events/:id', function (req, res) {
    res.render("edit", {
        events: events[0]
    });
});


//put route to delete events
router.delete('/index/events/:id', function (req, res) {

});



module.exports = router;
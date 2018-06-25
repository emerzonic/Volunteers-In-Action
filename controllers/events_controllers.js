var methodOverride = require('method-override');
var express = require('express');
var db = require('../models');
var router = express.Router();
var bodyParser = require('body-parser');
var sequelize = require('sequelize');

//config
router.use(methodOverride("_method"));
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());



//events page route
router.get('/events', function (req, res) {
    db.Event.findAll({
        order: sequelize.col('date') //ordering events by the closest date
    }).then(function (events) {
        res.render("events/events", {
            events: events
        });
    });
});

//==============================================
//Create new event routes
//==============================================
// create form route
router.get('/events/new', function (req, res) {
    res.render("events/new");
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

//==============================================
//Show event details routes
//==============================================
//Show an event detail
router.get("/events/:id", function (req, res) {
    var eventId = req.params.id;
    db.Event.findById(eventId).then(function (event) {
        res.render("events/show", {
            event: event
        });
    });
});

//event edit form route
router.get('/events/:id/edit', function (req, res) {
    var eventId = req.params.id;
    db.Event.findById(eventId).then(function (event) {
        res.render("events/edit", {
            event: event
        });
    });
});


//put route to update events
router.put('/events/:id', function (req, res) {
    db.Event.update({
        event_name: req.body.eventName,
        location: req.body.location,
        date: req.body.date,
        star_time: req.body.start_time,
        end_time: req.body.ens_time,
        description: req.body.description,
        contact: req.body.email,
        volunteers_needed: req.body.volunteers
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (updateEevent) {
        res.redirect("/events/" + req.params.id);
    });
});



//==============================================
//Passed events routes
//==============================================
//get route to passed events
router.get('/passed-events', function (req, res) {
    res.send('passed events will be displayed here');
});


//show detail for one passed event
router.get("/passed-events/:id", function (req, res) {
    var eventId = req.params.id;
    db.Event.findById(eventId).then(function (event) {
        res.render("passed-events/show", {
            event: event
        });
    });
});

//show edit form route for one passed event
router.get('/passed-events/:id/edit', function (req, res) {
    var eventId = req.params.id;
    db.Event.findById(eventId).then(function (event) {
        res.render("passed-events/edit", {
            event: event
        });
    });
});


//put route to add images to passed event
router.put('/events/:id', function (req, res) {
    db.Event.update({
        images
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (updateEevent) {
        res.redirect("/passed-events/" + req.params.id);
    });
});















module.exports = router;
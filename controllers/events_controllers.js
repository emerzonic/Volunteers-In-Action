var express = require('express');
var db = require('../models');
var router = express.Router();
var middleware = require("../middleware");


//==============================================
//Route to get all events
//==============================================
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
//Route to get a new event form
//==============================================
router.get('/events/new', middleware.isLoggedIn, function (req, res) {
    res.render("events/new");
});


//==============================================
//Route to create a new event
//==============================================
router.post('/events', function (req, res) {
    db.Event.create({
        event_name: req.body.eventName,
        location: req.body.location,
        date: req.body.date,
        start_time: req.body.start_time,
        end_time: req.body.ens_time,
        description: req.body.description,
        organizer: req.body.fname + ' ' + req.body.lname, //Adding the first name and last name together
        contact: req.body.email,
        volunteers_needed: req.body.volunteers,
        UserId: req.user.dataValues.id
    }).then(function () {
        res.redirect('/events');
    });
});

//==============================================
//Route to show an event details form
//==============================================
router.get("/events/:id", function (req, res) {
    var eventId = req.params.id;
    db.Event.findOne({
        where: {
            id: eventId
        },
        include: [db.Volunteer],
    }).then(function (event) {
        res.render("events/show", {
            event: event
        });
    });
});

//==============================================
//Route to show an event editable details form 
//==============================================
router.get('/events/:id/edit', middleware.checkEventOwnership, function (req, res) {
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
        start_time: req.body.start_time,
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

//===================================================================================
// PASSED EVENTS ROUTES WILL GO HERE
//===================================================================================
//==============================================
//Passed events routes
//==============================================
router.get('/events', function (req, res) {
    var todayDate = new Date();
    var same = d1.getTime() === d2.getTime();
    var notSame = d1.getTime() !== d2.getTime();
    db.Event.findAll({
        where: {
            date:{
            [Op.lte]: todayDate,
            order: sequelize.col('date') //ordering events by the closest date
            }
        }
    }).then(function (events) {
        res.render("events/passed-events", {
            events: events
        });
    });
});



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
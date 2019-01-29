var express = require('express');
var db = require('../models');
var router = express.Router();
var middleware = require("../middleware");
var sequelize = require('sequelize');
var Op = sequelize.Op;
var geocodeAddress = require('../util/geocoder');
var validateUserInput = require('../util/validator');


//==============================================
//Route to get all events
//==============================================
router.get('/events', function (req, res) {
    db.Event.findAll({
        order: sequelize.col('date'), //ordering events by the closest date
        where: {
            date: {
                [Op.gte]: new Date()
            },
        },
        include: [db.Volunteer]
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
    validateUserInput(req, res);
    geocodeAddress(req, res, function (data) {
        db.Event.create({
            event_name: req.body.event_name,
            fullAddress: data.address,
            address1: req.body.address1,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            date: req.body.date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            description: req.body.description,
            organizer: req.body.organizer,
            contact: req.body.email,
            volunteers_needed: req.body.volunteers_needed,
            lat: data.lat,
            lng: data.lng,
            status: false,
            UserId: req.user.dataValues.id
        }).then(function () {
            req.flash('success', 'Event was successfully created');
            res.redirect('/events');
        });
    });
});

// ==============================================
// Route to show an event details form
// ==============================================
router.get("/events/:id", function (req, res) {
    var eventId = req.params.id;
    db.Event.findOne({
        where: {
            id: eventId,
        },
        include: [db.Volunteer]
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


//==============================================
//Route to edit events
//==============================================
router.put('/events/:id', function (req, res) {
    geocodeAddress(req, res, function (data) {
        db.Event.update({
            event_name: req.body.event_name,
            fullAddress: data.address,
            address1: req.body.address1,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            date: req.body.date,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            description: req.body.description,
            organizer: req.body.organizer,
            contact: req.body.email,
            volunteers_needed: req.body.volunteers_needed,
            lat: data.lat,
            lng: data.lng,
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (updateEevent) {
            req.flash("success", "Event successfully updated");
            res.redirect("/events/" + req.params.id);
        });
    });
});

//==============================================
//Route to delete an event
//==============================================
router.delete('/events/:id', middleware.checkEventOwnership, function (req, res) {
    var eventId = req.params.id;
    db.Event.destroy({
        where: {
            id: eventId
        }
    }).then(function (event) {
        res.redirect("/events");
    });
});

//===================================================================================
//Route to get passed events
//===================================================================================
router.get('/events/passed/events', function (req, res) {
    db.Event.findAll({
        order: sequelize.col('date'), //ordering events by the closest date
        where: {
            date: {
                [Op.lt]: new Date()
            },
        }
    }).then(events => {
        if (events && events.length > 0) {
            res.render("events/passed-events", {
                events: events
            });
        } else {
            req.flash("info", "There are no past events");
            res.redirect('/index');
        }
    });
});


//===================================================================================
//Route to get detail for a passed event
//===================================================================================
router.get("/events/passed-events/:id", function (req, res) {
    var eventId = req.params.id;
    db.Event.findById(eventId).then(function (event) {
        res.render("events/show", {
            event: event
        });
    });
});


module.exports = router;
var express = require('express');
var db = require('../models');
var router = express.Router();
var middleware = require("../middleware");
var sequelize = require('sequelize');
var op = sequelize.Op;
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: "google",
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

var geocoder = NodeGeocoder(options);


//==============================================
//Route to get all events
//==============================================
router.get('/events', function (req, res) {
    db.Event.findAll({
        order: sequelize.col('date'), //ordering events by the closest date
        where: {
            date: {
                [op.gte]: new Date()
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
    var location = `${req.body.address1} ${req.body.city} ${req.body.state} ${req.body.zip}`;
    geocoder.geocode(location, function (err, data) {
        if (err || !data.length) {
            req.flash("error", "Something went wrong. Please try again");
            return res.redirect('back');
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var address = data[0].formattedAddress;
        db.Event.create({
            event_name: req.body.event_name,
            fullAddress: address,
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
            volunteers_needed: req.body.volunteers,
            lat: lat,
            lng: lng,
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
    db.Event.update({
        event_name: req.body.event_name,
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
        volunteers_needed: req.body.volunteers_needed
    }, {
        where: {
            id: req.params.id
        }
    }).then(function (updateEevent) {
        req.flash("success", "Event successfully updated");
        res.redirect("/events/" + req.params.id);
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
// PAST EVENTS ROUTES WILL GO HERE
//===================================================================================
router.get('/events/passed/events', function (req, res) {
    // res.send('passed');
    db.Event.findAll({
        order: sequelize.col('date'), //ordering events by the closest date
        where: {
            date: {
                [op.lt]: new Date()
            },
        }
    }).then(events => {
        if (events && events.length > 0) {
            res.render("events/events", {
                events: events
            });
        } else {
            req.flash("info", "There are no past events");
            res.redcirect('/index');
        }
    });
});


router.get("/events/passed-events/:id", function (req, res) {
    var eventId = req.params.id;
    db.Event.findById(eventId).then(function (event) {
        res.render("events/show", {
            event: event
        });
    });
});

//show edit form route for one passed event
// router.get('/passed-events/:id/edit', function (req, res) {
//     var eventId = req.params.id;
//     db.Event.findById(eventId).then(function (event) {
//         res.render("passed-events/edit", {
//             event: event
//         });
//     });
// });


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
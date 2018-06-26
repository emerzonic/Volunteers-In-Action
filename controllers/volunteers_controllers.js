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




//==============================================
//Add new volunteer routes
//==============================================
// Show volunteer form
router.get('/events/:id/volunteers/new', function (req, res) {
    db.Event.findById(req.params.id).then(function (event) {
        res.render("volunteers/new", {
            event: event
        });
    });
});


//post route to create new event
router.post('/events/:id/volunteers', function (req, res) {
    db.Volunteer.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age:req.body.age,
            contact: req.body.contact,
            EventId: req.params.id
        }).then(function (data) {
            res.redirect('/events/'+ req.params.id);
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
router.put('/events/:id/volunteers', function (req, res) {
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


















module.exports = router;
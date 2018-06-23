var express = require('express');
var db = require('../models');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());


var events = [{
    id:0,
    name: 'cleaning big lake',
    location:'Minneapolis',
    date: '6/28/2018',
    time: '9am',
    organizer: 'Joe Evans',
    volunteers: 9,
    description: 'This is a test event'
},
{
    id:1,
    name: 'Street clean up',
    location:'Minneapolis',
    date: '6/28/2018',
    time: '9am',
    organizer: 'Joe Evans',
    volunteers: 9,
    description: 'This is a test event'
},
{
    id:2,
    name: 'Feed the hungry children',
    location:'Minneapolis',
    date: '6/28/2018',
    time: '9am',
    organizer: 'Joe Evans',
    volunteers: 9,
    description: 'This is a test event'
},
{
    id:3,
    name: 'Trash pickup',
    location:'Minneapolis',
    date: '6/28/2018',
    time: '9am',
    organizer: 'Joe Evans',
    volunteers: 9,
    description: 'This is a test event'
},];



//Catch all routes and redirect to home page
router.get('/', function (req, res) {
    res.redirect('/index');
});

//home page route
router.get('/index', function (req, res) {
    res.render('index');
});


//events page route
router.get('/events', function (req, res) {
    res.render("events", {
        events: events
    });
});


router.get('/events/new', function (req, res) {
    res.render("new");
});


router.get('/events/edit', function (req, res) {
    res.render("new");
});


//post route to create new event
router.post('/create', function (req, res) {

});

//get route to event datails
router.get("/events/:id", function (req, res) {
    var id = req.params.id;
    res.render("show", {
        events: events[id]
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
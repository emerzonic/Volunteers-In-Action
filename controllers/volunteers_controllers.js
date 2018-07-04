var methodOverride = require('method-override');
var express = require('express');
var db = require('../models');
var router = express.Router();
var bodyParser = require('body-parser');
var mailer = require('../mailer/email');

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


//post route to sign up volunteers
router.post('/events/:id/volunteers', function (req, res) {
    db.Volunteer.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age:req.body.age,
            contact: req.body.contact,
            EventId: req.params.id
        }).then(function (data) {
            mailer.transporter,
            
            // var volunteer = JSON.stringify(data);
            // console.log(volunteer);
            req.flash("success","Congratulations! You are successfully signed up.");
            res.redirect('/events/');
        });
});


//event edit form route
// router.get('/events/:id/volunteer/edit', function (req, res) {
//     var eventId = req.params.id;
//     db.Event.findById(eventId).then(function (event) {
//         res.render("events/edit", {
//             event: event
//         });
//     });
// });


// //put route to update volunteer info
// router.put('/events/:id/volunteers', function (req, res) {
//     db.Volunteer.update({
        
//     }, {
//         where: {
//             id: req.params.id
//         }
//     }).then(function (updateVolunteer) {
//         res.redirect("/events/" + req.params.id);
//     });
// });





module.exports = router;
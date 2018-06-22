//Set up dependencies
var express = require('express');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8080;

var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// index page
// use res.render to load up an ejs view file
app.get('/', function(req, res) {
    res.render('views/index');
});

// events page
app.get('/events', function(req, res) {
    res.render('views/events');
});

// create new events page
app.get('/new', function(req, res) {
    res.render('views/new');
})

var routes = require('./controllers/via_controllers.js');
app.use('/', routes);

app.listen(PORT, function() {
	console.log("Server listening on: http://localhost:" + PORT);
});
var NodeGeocoder = require('node-geocoder');
// google map configuration dependency
var options = {
    provider: "google",
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

var geocoder = NodeGeocoder(options);

var geocodeAddress = function (req, res, cb) {
    var location = `${req.body.address1} ${req.body.city} ${req.body.state} ${req.body.zip}`;
    geocoder.geocode(location, function (err, data) {
        if (err || !data.length) {
            req.flash("error", "Something went wrong. Please try again");
            return res.redirect('back');
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var address = data[0].formattedAddress;
        return cb({
            lat: lat,
            lng: lng,
            address: address
        });
    });
};


module.exports = geocodeAddress;
var validateUserInput = function (req, res) {
    if (req.body.start_time >= req.body.end_time) {
        req.flash("error", "Event end time can not be less than the start time");
        return res.redirect('back');
    }
    if (new Date(req.body.date) < new Date()) {
        req.flash("error", "Event date can not be a past date");
        return res.redirect('back');
    }
    if (req.body.volunteers_needed < 1) {
        req.flash("error", "Volunteer needed can not be zero");
        return res.redirect('back');
    }
};


module.exports = validateUserInput;
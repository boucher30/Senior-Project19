var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../../db');

module.exports = type => {
    return (req, res) => {
        const carve_attendeesId = req.params.carve_attendeesId;
        const {carve, user, userType} = req.body;
        console.log("carve_attendees updated via patch with carve_attendeesId: " + carve_attendeesId);
        update_carve_attendees = "CALL update_carve_attendee(?,?,?,?)";

        con.query(update_carve_attendees, [carve_attendeesId, carve, user, userType[0]], (err, results) => {
            if (err) throw err;
            res.status(201).jsonp({results}).end;
        })
    };
};

module.exports = router;
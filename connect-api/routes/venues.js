var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');



// Grabs all venues from db
router.get('/', (req,res) => {
    // Find all venues from database
    venue_list = "CALL get_venues()";
    console.log(req.query);
    con.query(venue_list, (err, results) => {
        if (err) throw err;
        res.status(200).jsonp({venues: results}).end;
    })
});


// Creates a new venue
router.post('/', (req,res) => {
    const {vname,cityNear,st,snowSports,waterSports,landSports,airSports,description} = req.body;
    console.log(" new venue entered with venuename: " + vname);
    // The venuename wasn't found in the database
    // Create insert query for new venue
    // Added a comment
    new_venue = "CALL add_venue(?,?,?,?,?,?,?,?)";
    // Execute the query to insert into the database
    con.query(new_venue,[vname,cityNear,st,snowSports[0],waterSports[0],landSports[0],airSports[0],description], (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// updates all venues
router.put('/', (req,res) => {
    // The venuename wasn't found in the database
    // Create insert query for new venue
    // Added a comment
    new_venue = "CALL update_venues()";
    // Execute the query to insert into the database
    con.query(new_venue,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// updates all venues
router.patch('/', (req,res) => {
    // The venuename wasn't found in the database
    // Create insert query for new venue
    // Added a comment
    new_venue = "CALL update_venues()";
    // Execute the query to insert into the database
    con.query(new_venue,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// deletes all venues
router.delete('/', (req,res) => {
    delete_venues = "CALL delete_venues()";
    con.query(delete_venues, (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Grab specific venue by its id
router.get('/:venueId', (req,res) => {
    const venueId = req.params.venueId;
    get_venue  = "call get_venue(?)";
    con.query(get_venue, [venueId],(err, results) => {
        if (err) throw err;
        res.status(200).jsonp({venues:results}).end;
    })
});

// updates venue
router.put('/:venueId', (req,res) => {
    const venueId = req.params.venueId;
    const {vname,cityNear,st,snowSports,waterSports,landSports,airSports,description} = req.body;
    console.log(" venue updated via put with venuename: " + vname);
    update_venue = "CALL update_venue(?,?,?,?,?,?,?,?,?)";

    con.query(update_venue,[venueId,vname,cityNear,st,snowSports[0],waterSports[0],landSports[0],airSports[0],description],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// updates a venue
router.patch('/:venueId', (req,res) => {
    const venueId = req.params.venueId;
    const {vname,cityNear,st,snowSports,waterSports,landSports,airSports,description} = req.body;
    console.log(" venue updated via patch with venuename: " + vname);
    update_venue = "CALL update_venue(?,?,?,?,?,?,?,?,?)";

    con.query(update_venue,[venueId,vname,cityNear,st,snowSports[0],waterSports[0],landSports[0],airSports[0],description],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// deletes a venue
router.delete('/:venueId', (req,res) => {
    const venueId = req.params.venueId;
    console.log(" deleting venue with venue id: " + venueId);
    delete_venues = "CALL delete_venue(?)";
    con.query(delete_venues, [venueId],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'venue deleted'}).end;
    })
});


module.exports = router;
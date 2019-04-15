var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');


// Grabs all carve_attendees from the database
router.get('/', (req,res) => {
    // Find all carve_attendees from database
    carve_attendees_list = "CALL get_carve_attendees()";
    // Execute the query to pull from the database
    con.query(carve_attendees_list, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.status(200).jsonp({results}).end;
    })
});

// Creates a new carve_attendee
router.post('/', (req,res) => {
    const {carve,user,userType} = req.body;
    // The carve_attendeesname wasn't found in the database
    // Create insert query for new carve_attendees
    new_carve_attendees = "CALL add_carve_attendee(?,?,?)";
    // Execute the query to insert into the database
    con.query(new_carve_attendees,[carve,user,userType[0]], (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Updates all carve_attendees
router.put('/', (req,res) => {
    // The carve_attendeesname wasn't found in the database
    // Create insert query for new carve_attendees
    new_carve_attendees = "CALL update_carve_attendees()";
    // Execute the query to insert into the database
    con.query(new_carve_attendees,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Updates all carve_attendees
router.patch('/', (req,res) => {
    // The carve_attendeesname wasn't found in the database
    // Create insert query for new carve_attendees
    // Added a carve_attendees
    new_carve_attendees = "CALL update_carve_attendees()";
    // Execute the query to insert into the database
    con.query(new_carve_attendees,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Deletes all carve_attendees
router.delete('/', (req,res) => {
    // Create query to delete all carves from the database
    delete_carve_attendeess = "CALL delete_carve_attendees()";
    // Execute the query to delete from the database
    con.query(delete_carve_attendeess, (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Grab specific carve_attendees by their id
router.get('/:carve_attendeesId', (req,res) => {
    const carve_attendeesId = req.params.carve_attendeesId;
    // Create query to get the specified carve from the database
    get_carve_attendees  = "call get_carve_attendee(?)";
    // Execute query to pull from the database
    con.query(get_carve_attendees, [carve_attendeesId],(err, results) => {
        if (err) throw err;
        res.status(200).jsonp({results}).end;
    })
});

// Updates a specific carve_attendee
router.put('/:carve_attendeesId', (req,res) => {
    const carve_attendeesId = req.params.carve_attendeesId;
    const {carve,user,userType} = req.body;
    // Create query to update the specified carve_attendee in the database
    update_carve_attendees = "CALL update_carve_attendee(?,?,?,?)";
    // Execute query to update the specific resource in the database
    con.query(update_carve_attendees,[carve_attendeesId,carve,user,userType[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Updates a specific carve_attendee
router.patch('/:carve_attendeesId', (req,res) => {
    const carve_attendeesId = req.params.carve_attendeesId;
    const {carve,user,userType} = req.body;
    console.log("carve_attendees updated via patch with carve_attendeesId: " + carve_attendeesId);
    // Create query to update the specified carve_attendee in the database
    update_carve_attendees = "CALL update_carve_attendee(?,?,?,?)";
    // Execute query to update the specific resource in the database
    con.query(update_carve_attendees,[carve_attendeesId,carve,user,userType[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Deletes a specific carve_attendee
router.delete('/:carve_attendeesId', (req,res) => {
    const carve_attendeesId = req.params.carve_attendeesId;
    // Create query to delete the specified carve_attendee from the database
    delete_carve_attendeess = "CALL delete_carve_attendee(?)";
    // Execute query to delete from the database
    con.query(delete_carve_attendeess, [carve_attendeesId],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'carve_attendees deleted'}).end;
    })
});


module.exports = router;
var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../../db');



// Grabs all carve_attendees from db
router.get('/', (req,res) => {
    // Find all carve_attendees from database
    console.log(req.params);
    userId = req.params.userId;
    carve_attendees_list = "CALL get_user_attended(?)";


    console.log(req.query);

    con.query(carve_attendees_list, [userId], (err, results) => {
        if (err) throw err;

        res.status(200).jsonp({results}).end;

    })
});


// Creates a new carve_attendees
router.post('/', (req,res) => {
    const {carve,user,userType} = req.body;

    console.log(" new carve_attendees from: " + user);
    if(false)
    {

    }else{
        // The carve_attendeesname wasn't found in the database
        // Create insert query for new carve_attendees
        // Added a carve_attendees
        new_carve_attendees = "CALL add_carve_attendee(?,?,?)";
        // Execute the query to insert into the database
        con.query(new_carve_attendees,[carve,user,userType[0]], (err, results) => {
            if (err) throw err;
            res.status(201).jsonp({results}).end;
        })

    }
});

// updates all carve_attendeess
router.put('/', (req,res) => {

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

// updates all carve_attendeess
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

// deletes all carve_attendees
router.delete('/', (req,res) => {
    delete_carve_attendeess = "CALL delete_carve_attendees()";
    con.query(delete_carve_attendeess, (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })


});

// Grab specific carve_attendees by their id
router.get('/:carve_attendeesId', (req,res) => {
    const carve_attendeesId = req.params.carve_attendeesId;

    get_carve_attendees  = "call get_carve_attendee(?)";
    con.query(get_carve_attendees, [carve_attendeesId],(err, results) => {
        if (err) throw err;
        res.status(200).jsonp({results}).end;
    })
});

// updates carve_attendees
router.put('/:carve_attendeesId', (req,res) => {
    const carve_attendeesId = req.params.carve_attendeesId;
    const {carve,user,userType} = req.body;
    console.log("carve_attendees updated via put with carve_attendeesId: " + carve_attendeesId);
    update_carve_attendees = "CALL update_carve_attendee(?,?,?,?)";

    con.query(update_carve_attendees,[carve_attendeesId,carve,user,userType[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// updates all carve_attendeess
router.patch('/:carve_attendeesId', (req,res) => {
    const carve_attendeesId = req.params.carve_attendeesId;
    const {carve,user,userType} = req.body;
    console.log("carve_attendees updated via patch with carve_attendeesId: " + carve_attendeesId);
    update_carve_attendees = "CALL update_carve_attendee(?,?,?,?)";

    con.query(update_carve_attendees,[carve_attendeesId,carve,user,userType[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// deletes carve_attendees
router.delete('/:carve_attendeesId', (req,res) => {
    const carve_attendeesId = req.params.carve_attendeesId;
    console.log(" deleting carve_attendees with carve_attendees id: " + carve_attendeesId);
    delete_carve_attendeess = "CALL delete_carve_attendee(?)";
    con.query(delete_carve_attendeess, [carve_attendeesId],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'carve_attendees deleted'}).end;
    })


});


module.exports = router;
var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../../db');



// Grabs all carves from the database
router.get('/', (req,res) => {
    venueId = req.params.venueId;
    // Create a query to get all carves from the database
    carve_list = "CALL get_venue_carve(?)";
    // "CALL get_venue_carves(?)"   [venueId]
    // Execute the query
    con.query(carve_list,[venueId], (err, results) => {
        if (err) throw err;
        res.status(200).jsonp({results}).end;
    })
});


// Creates a new carve
router.post('/', (req,res) => {
    const {carveName,creatorId,carveType,athlete,photo,date, sports} = req.body;
    venueId = req.params.venueId;
    // Create insert query for new carve
    new_carve = "CALL add_carve(?,?,?,?,?,?,?,?,?,?,?,?)";
    // Execute the query to insert into the database
    con.query(new_carve,[carveName,creatorId,venueId,carveType[0],athlete,photo,date, sports[0]], (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Delete all carves from the database
router.delete('/', (req,res) => {
    // Create query to delete all carves from the database
    delete_carves = "CALL delete_carves()";
    //Execute the delete query
    con.query(delete_carves, (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Grab specific carve by its id
router.get('/:carveId', (req,res) => {
    const carveId = req.params.carveId;
    // Create query to get the specified carve from the database
    get_carve  = "call get_carve(?)";
    // Execute the query
    con.query(get_carve, [carveId],(err, results) => {
        if (err) throw err;
        res.status(200).jsonp({results}).end;
    })
});

// Updates a single carve specified by the given carve ID
router.put('/:carveId', (req,res) => {
    const carveId = req.params.carveId;
    venueId = req.params.venueId;
    const {carveName,creatorId,carveType,athlete,photo,date,completed, sports} = req.body;
    // Create query to update the specified carve
    update_carve = "CALL update_carve(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    // Execute the update query
    con.query(update_carve,[carveId,carveName,creatorId,venueId,carveType[0],athlete,photo,date,completed, sports[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Updates a single carve specified by the given carve ID
router.patch('/:carveId', (req,res) => {
    const carveId = req.params.carveId;
    venueId = req.params.venueId;
    const {carveName,creatorId,carveType,athlete,photo,date,completed, sports} = req.body;
    // Create query to update the specified carve
    update_carve = "CALL update_carve(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    // Execute the update query
    con.query(update_carve,[carveId,carveName,creatorId,venueId,carveType[0],athlete,photo,date,completed,sports[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Deletes a single carve specified by the given carve ID
router.delete('/:carveId', (req,res) => {
    const carveId = req.params.carveId;
    console.log(" deleting carve with carve id: " + carveId);
    // Create a query to delete the specified carve from the database
    delete_carves = "CALL delete_carve(?)";
    // Execute the delete query
    con.query(delete_carves, [carveId],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'carve deleted'}).end;
    })
});


module.exports = router;
var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

/*
 * Endpoint for all carve related requests
 */

// Grabs all carves from the database
router.get('/', (req,res) => {
    // Create query to get all carves from the database
    carve_list = "CALL get_carves()";
    // Execute the query to pull from the database
    con.query(carve_list, (err, results) => {
        if (err) throw err;
        res.status(200).jsonp({results}).end;
    })
});

// Grabs all open carves from db
router.get('/open', (req,res) => {
    // Create query to get all open carves from the database
    carve_list = "CALL get_open_carves()";
    // Execute the query to pull from the database
    con.query(carve_list, (err, results) => {
        if (err) throw err;
        res.status(200).jsonp({results}).end;
    })
});

// Creates a new carve
router.post('/', (req,res) => {
    const {carveName,creatorId,venueId,carveType,athlete,photo,date, sports} = req.body;
    // The carvename wasn't found in the database
    // Create insert query for new carve
    new_carve = "CALL add_carve(?,?,?,?,?,?,?,?)";
    // Execute the query to insert into the database
    con.query(new_carve,[carveName,creatorId,venueId,carveType[0],athlete,photo,date, sports[0]], (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// updates all carves
router.put('/', (req,res) => {
    // The carvename wasn't found in the database
    // Create query to update all carves in the database
    new_carve = "CALL update_carves()";
    // Execute the query to insert into the database
    con.query(new_carve,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// updates all carves
router.patch('/', (req,res) => {
    // The carvename wasn't found in the database
    // Create query to update all carves in the database
    new_carve = "CALL update_carves()";
    // Execute the query to insert into the database
    con.query(new_carve,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Deletes all carves from the database
router.delete('/', (req,res) => {
    // Create query to delete all carves from the database
    delete_carves = "CALL delete_carves()";
    // Execute the query to delete from the database
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
    // Execute the query to pull from the database
    con.query(get_carve, [carveId],(err, results) => {
        if (err) throw err;
        res.status(200).jsonp({results}).end;
    })
});

// Updates a specific carve
router.put('/:carveId', (req,res) => {
    const carveId = req.params.carveId;
    const {carveName,creatorId,venueId,carveType,athlete,photo,date,completed, sports} = req.body;
    console.log(" new carve updated with carvename: " + carveName);
    // Create query to update the specified carve from the database
    update_carve = "CALL update_carve(?,?,?,?,?,?,?,?,?,?)";
    // Execute the query to update the specified resource in the database
    con.query(update_carve,[carveId,carveName,creatorId,venueId,carveType[0],athlete,photo,date,completed, sports[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Updates a specific carve
router.patch('/:carveId', (req,res) => {
    const carveId = req.params.carveId;
    const {carveName,creatorId,venueId,carveType,athlete,photo,date,completed, sports} = req.body;
    console.log(" new carve updated with carvename: " + carveName);
    // Create query to update the specified carve from the database
    update_carve = "CALL update_carve(?,?,?,?,?,?,?,?,?,?)";
    // Execute the query to update the specified resource in the database
    con.query(update_carve,[carveId,carveName,creatorId,venueId,carveType[0],athlete,photo,date,completed,sports[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Deletes a specific carve
router.delete('/:carveId', (req,res) => {
    const carveId = req.params.carveId;
    console.log(" deleting carve with carve id: " + carveId);
    // Create query to delete the specified carve from the database
    delete_carves = "CALL delete_carve(?)";
    // Execute the query to delete from the database
    con.query(delete_carves, [carveId],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'carve deleted'}).end;
    })
});


module.exports = router;

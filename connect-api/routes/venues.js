// Sean updated on 3/5. changed to be buddylist: results, and formatting.
// had running on his machine. *note database running on your machine needs a buddy list table with 2 user id entries

var express = require('express');
var router = express.Router();
const con = require('../db');

//grab all the buddies from DB
router.get('/', (req, res) => {
    var sql = "SELECT * FROM venue";
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.status(200).json({
            venues: results
        })
    })
});

//add buddy to BD
router.post('/', (req, res) => {
    const {venue_name, venue_state, venue_sport} = req.body;

    // Create insert query for new user


    // Execute the query to insert into the database
    con.query(sql, (err) => {
        if (err) throw err;
        res.status(201).json({
            msg: '1 record inserted into the venue table'
        })
    })

    // Grab specific user by their id
router.get('/:venueId', (req,res) => {
    const venueId = req.params.venueId;
 
    var sql  = `SELECT * FROM venue WHERE venue_id = ${venueId}`;
    con.query(sql, (err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            venue: results
        })
    })
 });

});


module.exports = router;
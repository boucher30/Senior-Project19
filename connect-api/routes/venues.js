// Sean updated on 3/5. changed to be buddylist: results, and formatting.
// had running on his machine. *note database running on your machine needs a buddy list table with 2 user id entries

var express = require('express');
var router = express.Router();
const con = require('../db');

//grab all the buddies from DB
router.get('/', (req, res) => {
    var sql = "call get_venues()";
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.status(200).json({
            venue: results
        })
    })
});

//add buddy to BD
router.post('/', (req, res) => {
    const {venue_name, venue_state, venue_sport} = req.body;

    // Create insert query for new user

    router.post('/', (req,res) => {
        const {name,state,city,snowboard,ski,skateboard,surf,mbike} = req.body;


        let sqlQuery = "venuename_check(?)";
        con.query(sqlQuery, [name], function(err, results){
            // There was an issue with the query
            if(err){
                throw err;

            }

            if(results.length){

                // Execute the query to insert into the database
                con.query(sqlQuery, ( result) => {

                    res.status(409).json({
                        msg: 'cannot add, duplicate venue name'
                    })
                })



            }else{
                // The username wasn't found in the database
                // Create insert query for new user
                // Added a comment
                new_venue = "CALL new_venue(?,?,?,?,?,?,?,?)";
                // Execute the query to insert into the database
                con.query(new_venue,[name,state,city,snowboard,ski,skateboard,surf,mbike], (err, result) => {
                    if (err) throw err;
                    res.status(201).json({
                        msg: '1 record inserted into the user table'
                    })
                })

            }
        });



    });
    // Execute the query to insert into the database
    con.query(sql, (err) => {
        if (err) throw err;
        res.status(201).json({
            msg: '1 record inserted into the venue table'
        })
    })

});


// Grab specific user by their id
router.get('/:venueId', (req,res) => {
    const userId = req.params.userId;

    get_user  = "call get_user(?)";
    con.query(get_user, [userId],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            venue: results
        })
    })
});


// Grab specific user by their id
router.get('/search/venuename/:venuename', (req,res) => {

    const venuename = req.params.venuename;

    get_venue_name  = "call get_venue_venuename(?)";
    con.query(get_venue_name, [venuename],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            venue: results
        })
    })
});

// Grab specific user by their id
router.get('/search/venuest/:venuestate', (req,res) => {
    venuestate= req.params.venuestate;
    get_venue_state = "call get_venue_state(?)";
    con.query(get_venue_state, [venuestate],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            venue: results
        })
    })
});


// Grab specific user by their id
router.get('/search/venuecity/:venuecity', (req,res) => {
    venuecity = req.params.venuecity;
    get_venue_city  = "call get_venue_city(?)";
    con.query(get_venue_city, [venuecity],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            venue: results
        })
    })
});

// Grab specific user by their id
router.get('/search/venuecity/:venuecity/venuestate/:venuestate', (req,res) => {
    venuecity = req.params.venuecity;
    venuestate= req.params.venuestate;
    get_venue_location  = "call get_venue_location(?,?)";
    con.query(get_venue_location, [venuecity,venuestate],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            venue: results
        })
    })
});


module.exports = router;
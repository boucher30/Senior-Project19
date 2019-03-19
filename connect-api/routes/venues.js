// Sean updated on 3/5. changed to be buddylist: results, and formatting.
// had running on his machine. *note database running on your machine needs a buddy list table with 2 user id entries

var express = require('express');
var router = express.Router({mergeParams: true});
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
    const venueId = req.params.venueId;

    get_venue  = "call get_venue(?)";
    con.query(get_venue, [venueId],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            venue: results
        })
    })
});


// Grab specific user by their id
router.get('/?venuename=:venuename', (req,res) => {

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
router.get('/?venuest=:venuestate', (req,res) => {
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
router.get('/?venuecity=:venuecity', (req,res) => {
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
router.get('/?venuecity=:venuecity&venuestate=:venuestate', (req,res) => {
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

// Grab specific user by their id
router.get('/?sport=snowboard', (req,res) => {

    get_snowboard  = "call get_venue_snowboard()";
    con.query(get_athletes,(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            users: results
        })
    })
});

// Grab specific user by their id
router.get('/?sport=skateboard', (req,res) => {

    get_skateboard  = "call get_venue_skateboard()";
    con.query(get_skateboard,(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            users: results
        })
    })
});
// Grab specific user by their id
router.get('/?sport=ski', (req,res) => {

    get_ski = "call get_venue_ski()";
    con.query(get_ski,(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            users: results
        })
    })
});
// Grab specific user by their id
router.get('/?sport=surf', (req,res) => {

    get_surf  = "call get_venue_surf()";
    con.query(get_surf,(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            users: results
        })
    })
});
// Grab specific user by their id
router.get('/?sport=mountain_bike', (req,res) => {

    get_mountain_bike  = "call get_venue_mountain_bike()";
    con.query(get_mountain_bike,(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            users: results
        })
    })
});


module.exports = router;
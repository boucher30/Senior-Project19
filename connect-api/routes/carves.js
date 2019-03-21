var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

// Grabs all carves created by or attended/attending by user
router.get('/', (req,res) => {
    // Find all users from database
    console.log(req.params);
    userId = req.params.userId;
    get_user_carves = "CALL get_all_carves(?)";
    con.query(get_user_carves,[userId], (err, results, fields) => {

        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});


// Grabs all carves created by user
router.get('/created', (req,res) => {
    // Find all users from database

    userId = req.params.userId;
    get_user_carves = "CALL get_user_created_carves(?)";
    con.query(get_user_carves,[userId], (err, results, fields) => {

        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

// Grabs all carves created by user
router.get('/createdPast', (req,res) => {
    // Find all users from database

    userId = req.params.userId;
    get_user_carves = "CALL get_user_created_past_carves(?)";
    con.query(get_user_carves,[userId], (err, results, fields) => {

        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

// Grabs all carves created by user
router.get('/createdUpcoming', (req,res) => {
    // Find all users from database

    userId = req.params.userId;
    get_user_carves = "CALL get_user_created_upcoming_carves(?)";
    con.query(get_user_carves,[userId], (err, results, fields) => {

        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});


// Grabs all users from db
router.get('/attending', (req,res) => {
    // Find all users from database

    userId = req.params.userId;
    get_user_carves = "CALL get_user_attending_carves(?)";
    con.query(get_user_carves,[userId], (err, results, fields) => {

        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});

/*
//add buddy to BD
router.post('/buddy', (req, res) => {
    const {ser_id1, venue_id, event_date, sport, user_id2} = req.body;


    userId = req.params.userId;
    get_user_carves = "CALL get_carves(?)";
    con.query(get_user_carves,[userId], (err, results, fields) => {
    if (err) throw err;
        res.status(201).json({
            msg: '1 record inserted into the carveid table'
        })
    })

});*/

module.exports = router;
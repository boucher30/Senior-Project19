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



// Grabs all carves the user is attending
router.get('/attend', (req,res) => {
    // Find all users from database

    userId = req.params.userId;
    get_user_carves = "CALL get_user_all_attend_carves(?)";
    con.query(get_user_carves,[userId], (err, results, fields) => {

        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});



module.exports = router;
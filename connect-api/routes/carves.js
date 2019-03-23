var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

// Grabs all carves created by or attended/attending by user
router.get('/', (req,res) => {
    // Find all users from database
    console.log(req.params);
    userId = req.params.userId;
    get_user_carves = "CALL get_carves()";
    con.query(get_user_carves,[userId], (err, results, fields) => {

        if (err) throw err;
        res.status(200).json({
            messages: results
        })
    })
});


module.exports = router;
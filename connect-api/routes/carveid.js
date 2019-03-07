
var express = require('express');
var router = express.Router();
const con = require('../db');

//grab all the buddies from DB
router.get('/', (req, res) => {
    var sql = "SELECT * FROM carveid";
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.status(200).json({
            carveid: results
        })
    })
});

//add buddy to BD
router.post('/', (req, res) => {
    const {ser_id1, venue_id, event_date, sport, user_id2} = req.body;

    // Create insert query for new user
    // Added a comment
    var sql = "INSERT INTO connectid (user_id1, venue_id, event_date, sport, user_id2) VALUES "
        + "('" + user_id1 +"', '" + venue_id + "', '"+ event_date + "', '" + sport + "', '" + user_id2 + "');";


    // Execute the query to insert into the database
    con.query(sql, (err) => {
        if (err) throw err;
        res.status(201).json({
            msg: '1 record inserted into the carveid table'
        })
    })

});

module.exports = router;
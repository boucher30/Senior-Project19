// Sean updated on 3/5. changed to be buddylist: results, and formatting.
// had running on his machine. *note database running on your machine needs a buddy list table with 2 user id entries

var express = require('express');
var router = express.Router();
const con = require('../db');

//grab all the buddies from DB
router.get('/', (req, res) => {
    var sql = "SELECT * FROM connectid";
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.status(200).json({
            connectid: results
        })
    })
});

//add buddy to BD
router.post('/', (req, res) => {
    const {user_id1, venue_id, event_date, sport, user_id2} = req.body;

    // Create insert query for new user
    // Added a comment
    var sql = "INSERT INTO connectid (user_id1, venue_id, event_date, sport, user_id2) VALUES "
        + "('" + user_id1 +"', '" + venue_id + "', '"+ event_date + "', '" + sport + "', '" + user_id2 + "');";

    // Execute the query to insert into the database
    con.query(sql, (err) => {
        if (err) throw err;
        res.status(201).json({
            msg: '1 record inserted into the connectid table'
        })
    })

});

module.exports = router;
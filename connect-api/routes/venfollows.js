// Sean updated on 3/5. changed to be buddylist: results, and formatting.
// had running on his machine. *note database running on your machine needs a buddy list table with 2 user id entries

var express = require('express');
var router = express.Router();
const con = require('../db');

//grab all the buddies from DB
router.get('/', (req,res) => {
	var sql = 'run';
	con.query(sql, (err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			follow_venue: results
		})
	})
});

//add buddy to BD
router.post('/', (req,res) => {
	const {init_user_id1, venue_id} = req.body;

	// Create insert query for new user



	// Execute the query to insert into the database
	con.query(sql, (err, result) => {
		if (err) throw err;
		res.status(201).json({
			msg: '1 record inserted into the venuelist table'
		})
	})

});

module.exports = router;
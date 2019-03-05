const express = require('express');
const router = express.Router();
const con = require('../db');

//grab all the buddies from DB
router.get('/', (req,res) => {
    var sql = "SELECT * FROM buddyList";
    con.query(sql, (err, results, fields) => {
    		if (err) throw err;
    		res.status(200).json({
    			users: results
    		})
});

//add buddy to BD
router.post('/', (req,res) => {
	const { user_id, user_id2 } = req.body;

	// Create insert query for new user
	// Added a comment
	var sql = "INSERT INTO buddyList (user_id, user_id2) VALUES "
		+ "('" + user_id + "', '" + user_id2 + "');";


	// Execute the query to insert into the database
	con.query(sql, (err, result) => {
		if (err) throw err;
		res.status(201).json({
			msg: '1 record inserted into the buddyList table'
		})
	})

});

module.exports = router;
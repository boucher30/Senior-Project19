const express = require('express');
const router = express.Router();
const con = require('../db');

// Grabs all users from db
router.get('/', (req,res) => {
	// Find all users from database
	var sql = "SELECT * FROM user";
	con.query(sql, (err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			users: results
		})
	})
});

// Creates a new user
router.post('/', (req,res) => {
	const { username, first_name, last_name } = req.body;

	// Create insert query for new user
	var sql = "INSERT INTO user (username, first_name, last_name) VALUES "
		+ "('" + username + "', '" + first_name + "', '" + last_name + "');";


	// Execute the query to insert into the database
	con.query(sql, (err, result) => {
		if (err) throw err;
		res.status(201).json({
			msg: '1 record inserted into the user table'
		})
	})

})

// Grab specific user by their id
router.get('/:userId', (req,res) => {
	const userId = req.params.userId;
	var sql = `SELECT * FROM user WHERE user_id=${userId}`;
	con.query(sql, (err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			user: results
		})
	})
})

module.exports = router;

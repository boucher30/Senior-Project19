const express = require('express');
const router = express.Router();
const con = require('../db');

// Grabs all users from db
router.get('/', (req, res) => {
	// Find all users from database
	var sql = "SELECT * FROM user";
	con.query(sql, (err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			users: results
		})
	})
});

// Grab specific user by their id
router.get('/:userId', (req, res) => {
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

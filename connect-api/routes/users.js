var express = require('express');
var router = express.Router();
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
	const {us, em,pwd,fn,ln,ath,pho,snow,ska,su,mb,sk,fa} = req.body;


	let chosenUsername = us;

	let sqlQuery = "SELECT * FROM user WHERE username = ? LIMIT 1";
	con.query(sqlQuery, [chosenUsername], function(err, results){
		// There was an issue with the query
		if(err){
			throw err;

		}

		if(results.length){

			// Execute the query to insert into the database
			con.query(sqlQuery, ( result) => {

				res.status(409).json({
					msg: 'cannot add, duplicate username'
				})
			})



		}else{
			// The username wasn't found in the database
			// Create insert query for new user
			// Added a comment
			new_user = "CALL new_user(?,?,?,?,?,?,?,?,?,?,?,?,?)";
			// Execute the query to insert into the database
			con.query(new_user,[us,em,pwd,fn,ln,ath,pho,snow,ska,su,mb,sk,fa], (err, result) => {
				if (err) throw err;
				res.status(201).json({
					msg: '1 record inserted into the user table'
				})
			})

		}
	});



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

// Sean updated on 3/5. changed to be buddylist: results, and formatting.
// had running on his machine. *note database running on your machine needs a buddy list table with 2 user id entries

var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

router.get('/', (req,res) => {
	console.log(req.params);
	userId = req.params.userId;
	get_user_buddies = "CALL get_buddies(?)";
	con.query(get_user_buddies,[userId], (err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			buddylist: results
		})
	})
});

//BUDDY REQUEST WIP
//CALL THIS NOW TO ADD BUDDY WITHOUT REQUEST

router.post('/:userId1', (req,res) => {
	// Find all users from database
	const userId = req.params.userId;
	const userId1 = req.params.userId1;

	add_buddy = "CALL add_buddy(?,?)";
	con.query(add_buddy, [userId,userId1],(err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			userfollows: results,
			msg: 'buddy added'
		})
	})
});



module.exports = router;
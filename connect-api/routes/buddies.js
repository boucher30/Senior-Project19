// Sean updated on 3/5. changed to be buddylist: results, and formatting.
// had running on his machine. *note database running on your machine needs a buddy list table with 2 user id entries

var express = require('express');
var router = express.Router();
const con = require('../db');

//grab all the buddies from DB
router.get('/', (req,res) => {
    all_buddies = "CALL get_all_buddies()";
    con.query(all_buddies, (err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			buddylist: results
		})
	})
});

router.get('/:userId', (req,res) => {
	const userId = req.params.userId;
	get_user_buddies = "CALL get_all_buddies(?)";
	con.query(get_user_buddies, (err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			buddylist: results
		})
	})
});



module.exports = router;
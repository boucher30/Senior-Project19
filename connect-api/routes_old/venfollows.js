// Sean updated on 3/5. changed to be buddylist: results, and formatting.
// had running on his machine. *note database running on your machine needs a buddy list table with 2 user id entries

var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

router.get('/', (req,res) => {

	venueId = req.params.venueId;
	get_venue_followers = "CALL get_venue_followers(?)";
	con.query(get_venue_followers,[venueId], (err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			userfollows: results
		})
	})
});



module.exports = router;
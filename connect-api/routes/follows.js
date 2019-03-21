// Sean updated on 3/5. changed to be buddylist: results, and formatting.
// had running on his machine. *note database running on your machine needs a buddy list table with 2 user id entries
// users route based info
// follow user, follow venue found here


var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

router.get('/', (req,res) => {

	userId = req.params.userId;
	get_user_buddies = "CALL get_followed(?)";
	con.query(get_user_buddies,[userId], (err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			userfollows: results
		})
	})
});

router.get('/followers', (req,res) => {

	userId = req.params.userId;
	get_user_followers = "CALL get_followers(?)";
	con.query(get_user_followers,[userId], (err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			userfollows: results
		})
	})
});


router.get('/venues', (req,res) => {

	userId = req.params.userId;
	get_venues_followed = "CALL venues_followed(?)";
	con.query(get_venues_followed,[userId], (err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			userfollows: results
		})
	})
});

router.post('/', (req,res) => {
	// Find all users from database
	const senderId = req.params.userId;

	const {recipeientId,subject,message} =req.body;
	user_send = "CALL send_message(?,?,?,?)";
	con.query(user_send, [senderId,recipeientId,subject,message],(err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			messages: results
		})
	})
});

router.post('/venue/:venueId', (req,res) => {
	// Find all users from database
	const userId = req.params.userId;
	const venueId = req.params.venueId;

	follow_venue = "CALL follow_venue(?,?)";
	con.query(follow_venue, [userId,venueId],(err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			userfollows: results
		})
	})
});

router.post('/:userId1', (req,res) => {
	// Find all users from database
	const userId = req.params.userId;
	const userId1 = req.params.userId1;

	follow_user = "CALL follow_user(?,?)";
	con.query(follow_user, [userId,userId1],(err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			userfollows: results
		})
	})
});

module.exports = router;
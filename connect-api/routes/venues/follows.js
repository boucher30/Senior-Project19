var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../../db');

/*
 * Endpoint for all follow requests related to a venue
 */

// Grabs all follows from db
router.get('/', (req,res) => {
	// Create the query to get all follows from the database
	follow_list = "CALL get_follows()";
	// Execute the query
	con.query(follow_list, (err, results) => {
		if (err) throw err;
		res.status(200).jsonp({results}).end;
	})
});

// Creates a new follow
// For venue pass in the venue_id instead of the user2 ID
router.post('/', (req,res) => {
	const {usr, ven, ty} = req.body;
	// The follow name wasn't found in the database
	// Create insert query for new follow
	new_follow = "CALL follow_venue(?,?)";
	// Execute the query to insert into the database
	con.query(new_follow,[usr, ven, ty[0]], (err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// Delete all follows from the database
router.delete('/', (req,res) => {
	// Create the query to delete all follows from the database
	delete_follows = "CALL delete_follows()";
	// Execute the delete query
	con.query(delete_follows, (err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// Grab a specific follow by its ID
router.get('/:followId', (req,res) => {
	const followId = req.params.followId;
	// Create the query to get the specified follow from the database
	get_follow  = "call get_follow(?)";
	// Execute the get query
	con.query(get_follow, [followId],(err, results) => {
		if (err) throw err;
		res.status(200).jsonp({results}).end;
	})
});

// Update a specific follow by the given follow ID
router.put('/:followId', (req,res) => {
    const followId = req.params.followId; //followId is the ID of the user
    ven = req.params.venueId;
    const {usr} = req.body;
	// Create the query to update the specified follow
    update_follow = "CALL update_follow_venue(?,?,?)";
	// Execute the update query
    con.query(update_follow_venue,[followId, ven, usr],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Update a specific follow by the given follow ID
router.patch('/:followId', (req,res) => {
	const followId = req.params.followId;
	ven = req.params.venueId;
	const {usr} = req.body;
	// Create the query to update the specified follow
	update_follow = "CALL update_follow_venue(?,?,?)";
	// Execute the update query
	con.query(update_follow_venue,[followId, usr, ven],(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// Deletes a specific follow by the given follow ID
router.delete('/:followId', (req,res) => {
	const followId = req.params.followId;
	// Create the query to delete the specified follow from the database
	delete_follows = "CALL delete_follow(?)";
	// Execute the delete query
	con.query(delete_follows, [followId],(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({msg:'follow deleted'}).end;
	})
});


module.exports = router;
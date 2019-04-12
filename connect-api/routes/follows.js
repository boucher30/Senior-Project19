var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');



// Grabs all follows from the database
router.get('/', (req,res) => {
	// Find all follows from the database
	follow_list = "CALL get_follows()";
	// Execute the query
	con.query(follow_list, (err, results) => {
		if (err) throw err;
		res.status(200).jsonp({results}).end;
	})
});


// Creates a new follow
router.post('/', (req,res) => {
	const {user1, user2,v} = req.body;
	// The followname wasn't found in the database
	// Create insert query for new follow
	new_follow = "CALL add_follow(?,?,?,?)";
	// Execute the query to insert into the database
	con.query(new_follow,[user1, user2,v , 'follow'], (err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// updates all follows
router.put('/', (req,res) => {
	// Create insert query for new follow
	new_follow = "CALL update_follows()";
	// Execute the query to insert into the database
	con.query(new_follow,(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// updates all follows
router.patch('/', (req,res) => {
	// Create insert query for new follow
	new_follow = "CALL update_follows()";
	// Execute the query to insert into the database
	con.query(new_follow,(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// Deletes all follows from the database
router.delete('/', (req,res) => {
	// Create query to delete all follows from the database
	delete_follows = "CALL delete_follows()";
	// Execute the delete query
	con.query(delete_follows, (err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});


// Creates a new buddy
router.post('/buddies', (req,res) => {
	const {user1, user2} = req.body;
	// The followname wasn't found in the database
	// Create insert query for new buddy
	new_buddy = "CALL add_buddy(?,?)";
	// Execute the query to insert into the database
	con.query(new_buddy,[user1, user2], (err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// Grab specific follow by its ID
router.get('/:followId', (req,res) => {
	const followId = req.params.followId;
	// Create query to get a specific follow from the database
	get_follow  = "call get_follow(?)";
	// Execute the query
	con.query(get_follow, [followId],(err, results) => {
		if (err) throw err;
		res.status(200).jsonp({results}).end;
	})
});

// Updates the specific follow by its ID
router.put('/:followId', (req,res) => {
	const followId = req.params.followId;
	const {user1, user2, ven, ty} = req.body;
	// Create query to update a specific follow in the database
	update_follow = "CALL update_follow(?,?,?,?,?)";
	// Execute the update query
	con.query(update_follow,[followId,user1, user2, ven, ty[0]],(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// Updates the specific follow by its ID
router.patch('/:followId', (req,res) => {
	const followId = req.params.followId;
	const {user1, user2, ven, ty} = req.body;
	// Create query to update a specific follow in the database
	update_follow = "CALL update_follow(?,?,?,?,?)";
	// Execute the update query
	con.query(update_follow,[followId,user1, user2, ven, ty[0]],(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// Deletes the specific follow by its ID
router.delete('/:followId', (req,res) => {
	const followId = req.params.followId;
	// Create query to delete the specified follow from the database
	delete_follows = "CALL delete_follow(?)";
	// Execute the delete query
	con.query(delete_follows, [followId],(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({msg:'follow deleted'}).end;
	})
});


module.exports = router;
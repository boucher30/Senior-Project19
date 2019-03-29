var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../../db');



// Grabs all follows from db; needs get_all_user_follows procedure
router.get('/', (req,res) => {
	// Find all follows from database
	console.log(req.params);
	userId = req.params.userId;
	follow_list = "CALL get_user_followed(?)";


	console.log(req.query);

	con.query(follow_list, [userId], (err, results) => {
		if (err) throw err;

		res.status(200).jsonp({msg:'follows list',results}).end;

	})
});


// Creates a new follow
router.post('/', (req,res) => {
	const {user1, user2, ven, ty} = req.body;

	console.log("user " + user1 + " now following user:" + user2 + "or venue :" + ven);
	if(false)
	{

	}else{
		// The followname wasn't found in the database
		// Create insert query for new follow
		// Added a comment
		new_follow = "CALL add_follow(?,?,?,?)";
		// Execute the query to insert into the database
		con.query(new_follow,[user1, user2, ven, ty[0]], (err, results) => {
			if (err) throw err;
			res.status(201).jsonp({msg:'follow added',results}).end;
		})

	}
});

// updates all follows
router.put('/', (req,res) => {

	// The followname wasn't found in the database
	// Create insert query for new follow
	// Added a comment
	new_follow = "CALL update_follows()";
	// Execute the query to insert into the database
	con.query(new_follow,(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({msg:'follows updated',results}).end;
	})
});

// updates all follows
router.patch('/', (req,res) => {

	// The followname wasn't found in the database
	// Create insert query for new follow
	// Added a comment
	new_follow = "CALL update_follows()";
	// Execute the query to insert into the database
	con.query(new_follow,(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({msg:'follows updated',results}).end;
	})


});

// deletes all follows
router.delete('/', (req,res) => {
	delete_follows = "CALL delete_follows()";
	con.query(delete_follows, (err, results) => {
		if (err) throw err;
		res.status(201).jsonp({msg:'all follows deleted',results}).end;
	})


});


//get /followed
router.get('/buddies', (req,res) => {
	// Find all follows from database
	console.log(req.params);
	userId = req.params.userId;
	follow_list = "CALL get_user_followed(?)";


	console.log(req.query);

	con.query(follow_list, [userId], (err, results) => {
		if (err) throw err;

		res.status(200).jsonp({msg:'follows list',results}).end;

	})
});

//get /followed
router.get('/venues', (req,res) => {
	// Find all follows from database
	console.log(req.params);
	userId = req.params.userId;
	follow_list = "CALL get_venues_followed(?)";


	console.log(req.query);

	con.query(follow_list, [userId], (err, results) => {
		if (err) throw err;

		res.status(200).jsonp({msg:'follows list',results}).end;

	})
});

// Grabs all follows from db; needs get_all_user_follows procedure
router.get('/followers', (req,res) => {
	// Find all follows from database
	console.log(req.params);
	userId = req.params.userId;
	follow_list = "CALL get_user_followers(?)";


	console.log(req.query);

	con.query(follow_list, [userId], (err, results) => {
		if (err) throw err;

		res.status(200).jsonp({msg:'follows list',results}).end;

	})
});

// Grab specific follow by their id
router.get('/:followId', (req,res) => {
	const followId = req.params.followId;

	get_follow  = "call get_follow(?)";
	con.query(get_follow, [followId],(err, results) => {
		if (err) throw err;
		res.status(200).jsonp({results}).end;
	})
});

// updates follow
router.put('/:followId', (req,res) => {
	const followId = req.params.followId;
	const {user1, user2, ven, ty} = req.body;
	console.log("via put follow updated with id: " + followId);
	update_follow = "CALL update_follow(?,?,?,?,?)";

	con.query(update_follow,[followId,user1, user2, ven, ty[0]],(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({results}).end;
	})
});

// updates all follows
router.patch('/:followId', (req,res) => {
	const followId = req.params.followId;
	const {user1, user2, ven, ty} = req.body;
	console.log(" via patch follow updated with id: " + followId);
	update_follow = "CALL update_follow(?,?,?,?,?)";

	con.query(update_follow,[followId,user1, user2, ven, ty[0]],(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({msg:'follow updated via patch',results}).end;
	})
});

// deletes follow
router.delete('/:followId', (req,res) => {
	const followId = req.params.followId;
	console.log(" deleting follow with follow id: " + followId);
	delete_follows = "CALL delete_follow(?)";
	con.query(delete_follows, [followId],(err, results) => {
		if (err) throw err;
		res.status(201).jsonp({msg:'follow deleted'}).end;
	})


});
// get /buddies/  returns buddy list for user procedure call => buddy_list(?) [userId]

//get /followers
router.get('/?', (req,res) => {
	// Find all follows from database
	console.log(req.params);
	userId = req.params.userId;
	follow_list = "CALL get_user_followers(?)";


	console.log(req.query);

	con.query(follow_list, [userId], (err, results) => {
		if (err) throw err;

		res.status(200).jsonp({msg:'follows list',results}).end;

	})
});


//put /follow ?venueId & userId

router.post('/buddies/:userId1', (req,res) => {
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
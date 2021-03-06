var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

/*
 * Endpoint for all user related requests
 */

// Gets users based on the query parameters, if no parameters are given, it gets all users from db
router.get('/', (req,res) => {
	// Find all users from database
	user_list = "CALL get_users()";
	username = req.query.username;
	first_name = req.query.first_name;
	last_name = req.query.last_name;

	con.query(user_list, (err, results) => {
		if (err) throw err;

		res.status(200).jsonp({users: results}).end;

	})
});

// Logs out all users
router.get('/logout', (req,res) => {

    get_user  = "call logout_all()";
    con.query(get_user,(err, results) => {
        if (err) throw err;
        res.status(200).jsonp({users: results}).end;
    })
});

// Creates a new user
router.post('/', (req,res) => {
	const {username, email, password, first_name, last_name, description, type, snow_sports, water_sports, land_sports, air_sports} = req.body;
	usrCheck = "Call username_check(?)";

    con.query(usrCheck,[username], (err,results)=> {
        if (results[0][0][0] != 0)
        {
            check = 0;
            res.status(202).jsonp({check}).end;
            console.log('duplicate username cant add ');
        }
        else {

            // The username wasn't found in the database
            // Create insert query for new user
            // Added a comment
            new_user = "CALL add_user(?,?,?,?,?,?,?,?,?,?,?)";
            // Execute the query to insert into the database
            con.query(new_user,[username, email, password, first_name, last_name, description, type[0], snow_sports[0], water_sports[0], land_sports[0], air_sports[0]], (err, results1) => {
                if (err) throw err;
                con.query(usrCheck,[username], (err,results3)=> {
                    if (err) throw err;
                    check = results3[0][0].user_Id;
                    res.status(201).jsonp({check}).end;
                    console.log(check);
                })
            })
        }
    })
});

// updates all users
router.put('/', (req,res) => {

    // The username wasn't found in the database
    // Create insert query for new user
    // Added a comment
    new_user = "CALL update_users()";
    // Execute the query to insert into the database
    con.query(new_user,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// updates all users
router.patch('/', (req,res) => {

    // The username wasn't found in the database
    // Create insert query for new user
    // Added a comment
    new_user = "CALL update_users()";
    // Execute the query to insert into the database
    con.query(new_user,(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// deletes all users
router.delete('/', (req,res) => {

    delete_users = "CALL delete_users()";

    con.query(delete_users, (err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// Grab specific user by their id
router.get('/:userId', (req,res) => {
	const userId = req.params.userId;

	get_user  = "call get_user(?)";

	con.query(get_user, [userId],(err, results) => {
		if (err) throw err;
		console.log(results[0][0]);
        res.status(200).jsonp({users: results}).end;
	})
});

// Log out the current user
router.get('/:userId/logout', (req,res) => {
    const userId = req.params.userId;

    get_user  = "call logout(?)";

    con.query(get_user, [userId],(err, results) => {
        if (err) throw err;
        res.status(200).jsonp({users: results}).end;
    })
});

// updates a specific user
router.put('/:userId', (req,res) => {
    const userId = req.params.userId;
    const {username, email, password, first_name, last_name, description, type, snow_sports, water_sports, land_sports, air_sports} = req.body;

    update_user = "CALL update_user(?,?,?,?,?,?,?,?,?,?,?,?)";

    con.query(update_user,[userId,username, email, password, first_name, last_name, description, type[0], snow_sports[0], water_sports[0], land_sports[0], air_sports[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// updates a specific user
router.patch('/:userId', (req,res) => {
    const userId = req.params.userId;
    const {username, email, password, first_name, last_name, description, type, snow_sports, water_sports, land_sports, air_sports} = req.body;

    update_user = "CALL update_user(?,?,?,?,?,?,?,?,?,?,?,?)";

    con.query(update_user,[userId,username, email, password, first_name, last_name, description, type[0], snow_sports[0], water_sports[0], land_sports[0], air_sports[0]],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({results}).end;
    })
});

// deletes user
router.delete('/:userId', (req,res) => {
    const userId = req.params.userId;

    delete_users = "CALL delete_user(?)";

    con.query(delete_users, [userId],(err, results) => {
        if (err) throw err;
        res.status(201).jsonp({msg:'user deleted'}).end;
    })
});


module.exports = router;
var express = require('express');
var router = express.Router({mergeParams: true});
const con = require('../db');

// Grabs all users from db
router.get('/', (req,res) => {
	// Find all users from database
	user_list = "CALL get_users()";
	con.query(user_list, (err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			users: results
		})
	})
});


router.get('/login', (req,res) => {
    // login
    // supposed to return userid token not working atm, neither is verification message
    const {username,password} = req.body;

//for whatever stupid reason it updates the user id to the one before it instead of current...
    //logging in twice does it because the second time gets the correct instance.
    con.query( " CALL login(?,?,@userid); ",[username,password] ,(err, results, fields) => {
        if (err) throw err;
        userid = fields;
        if( userid > 0) {
            res.status(200).json({
                users: results,
                msg: 'login successful'
            })
        }

        else {
            res.status(200).json({
                users: results,
                msg: 'login failed'

            })
        }

    })


});


// Creates a new user
router.post('/', (req,res) => {
	const {username, email,password,first,last,athlete,photo,snowboard,skateboard,surf,mountainbike,ski,fan} = req.body;


	let sqlQuery = "username_check(?)";
	con.query(sqlQuery, [username], function(err, results){
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
			con.query(new_user,[username,email,password,first,last,athlete,photo,snowboard,skateboard,surf,mountainbike,ski,fan], (err, result) => {
				if (err) throw err;
				res.status(201).json({
					msg: '1 record inserted into the user table'
				})
			})

		}
	});



});

// Grab specific user by their id
router.get('/?userid = userId', (req,res) => {
	const userId = req.params.userId;

	get_user  = "call get_user(?)";
	con.query(get_user, [userId],(err, results, fields) => {
		if (err) throw err;
		res.status(200).json({
			users: results
		})
	})
});


// Grab specific user by their id
router.get('/?username=usern', (req,res) => {

    const usern = req.params.usern;

    get_user_username  = "call get_user_username(?)";
    con.query(get_user_username, [usern],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            users: results
        })
    })
});

// Grab specific user by their id
router.get('/?firstname=firstname', (req,res) => {
    firstname = req.params.firstname;
    get_user_firstname  = "call get_user_first(?)";
    con.query(get_user_firstname, [firstname],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            users: results
        })
    })
});


// Grab specific user by their id
router.get('/?lastname=lastname', (req,res) => {
    lastname = req.params.lastname;
    get_user_firstname  = "call get_user_first(?)";
    con.query(get_user_firstname, [lastname],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            users: results
        })
    })
});

// Grab specific user by their id
router.get('/?first=firstname&last=lastname', (req,res) => {
    firstname = req.params.firstname;
    lastname = req.params.lastname;
    get_user_full  = "call get_user_full(?,?)";
    con.query(get_user_full, [firstname,lastname],(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            users: results
        })
    })
});

// Grab specific user by their id
router.get('/?type=athletes', (req,res) => {

    get_athletes  = "call get_user_athletes()";
    con.query(get_athletes,(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            users: results
        })
    })
});

// Grab specific user by their id
router.get('/?type=photographers', (req,res) => {

    get_photographers  = "call get_user_photographers()";
    con.query(get_photographers,(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            users: results
        })
    })
});

// Grab specific user by their id
router.get('/?type=fans', (req,res) => {

    get_fans  = "call get_user_fans()";
    con.query(get_fans,(err, results, fields) => {
        if (err) throw err;
        res.status(200).json({
            users: results
        })
    })
});

module.exports = router;
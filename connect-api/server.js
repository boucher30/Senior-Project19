const express = require('express');
const app = express();
const mysql = require('mysql');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000;

// Check connection for success
const con = require('./db');
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Define routes ahead of time
const userRoutes = require('./routes/users');


// Set up app to handle requests and json etc...
app.use(morgan('dev'));																// Logger for api
app.use(bodyParser.urlencoded({extended: true}));			// Allows us to parse body of post request
app.use(bodyParser.json());


// Allows our RESTful API to be accessed by any server and not only the port that the serve is running on
app.use((req, res, next) => {
	// If we deploy to production, we change the star to our url to whitelist it
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers','*');

	if(req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});


// Tells the App specific routes to use using router in each file
app.use('/users', userRoutes);

// App listens on specific port or 8000 by default
app.listen(PORT, () => {
	console.log("Home Repair server started on port "+ PORT + "!");
});
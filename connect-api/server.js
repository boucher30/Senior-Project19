// to back end team. line 24, need to define an alias for a new route
// roughly line 50+ needs to use that alias, for the endpoint to access the route
// Sean 3/5

require('dotenv').config();
const express = require('express');


const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000;

// Check connection for success
const con = require('./db');

con.connect( function(err) {
  if (err) throw err;
  console.log("Connected to MySQL database...");
});

// Define routes ahead of time
// any file/route being used needs to be defined here
// so it can be called below
const userRoutes = require('./routes/users');
const buddyRoutes = require('./routes/buddies');
const venueRoutes = require('./routes/venues');
const carRoutes = require('./routes/carves');
const vfRoutes = require('./routes/venfollows');
const ufRoutes = require('./routes/follows');
const msgRoutes = require('./routes/messages');
const listRoutes = require('./routes/listings');

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
// any new file needs to be added in order for it to function.
app.use('/users', userRoutes);
app.use('/users/:userId/buddies', buddyRoutes);
app.use('/venues', venueRoutes);
app.use('/users/:userId/carves', carRoutes);
app.use('/venues/:venueId/follows', vfRoutes);
app.use('/users/:userId/follows', ufRoutes);
app.use('/users/:userId/messages', msgRoutes);
app.use('/listings', listRoutes);


// App listens on specific port or 8000 by default
app.listen(PORT, () => {
	console.log("Connect API started on port "+ PORT + "!");
});


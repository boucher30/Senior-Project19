// Sean 3/23

require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pass = require('passport');
const socket = require('socket.io');
const PORT = process.env.PORT || 8000;
const LocalStrategy = require('passport-local');





// Check connection for success
const con = require('./db');

con.connect( function(err) {
  if (err) throw err;
  console.log("Connected to Carve Connect database version 4");
});

// Define routes ahead of time
// any file/route being used needs to be defined here
// so it can be called below
const userRoutes = require('./routes/users');
const venueRoutes = require('./routes/venues');
const carRoutes = require('./routes/carves');
const ufRoutes = require('./routes/follows');
const msgRoutes = require('./routes/messages');
const comRoutes = require('./routes/comments');
const likRoutes = require('./routes/likes');
const medRoutes = require('./routes/media');
const usrCarRoutes = require('./routes/users/carves');
const usrUfRoutes = require('./routes/users/follows');
const carAtRoutes = require('./routes/carveAttendees');
const usrMsgRoutes = require('./routes/users/messages');
const usrComRoutes = require('./routes/users/comments');
const usrLikRoutes = require('./routes/users/likes');
const usrMedRoutes = require('./routes/users/media');
const usrCarAtRoutes = require('./routes/users/carveAttendees');

var domain = require('domain');
var d = domain.create();
// Set up app to handle requests and json etc...
app.use(morgan('dev'));																// Logger for api
app.use(bodyParser.urlencoded({extended: true}));			// Allows us to parse body of post request
app.use(bodyParser.json());


// Allows our RESTful API to be accessed by any server and not only the port that the serve is running on
// gutted for excess calls that were not needed.
// still needs to be cleaned up
app.use((req, res, next) => {
	// If we deploy to production, we change the star to our url to whitelist it
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers','*');

	if(req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
	}
	next();
});

//ignore for now
/*
d.on('error',function(err){
	console.error(err);
});

d.run(function(err,data)
	{
		console.log(data);
	}
);*/

// Tells the App specific routes to use using router in each file
// any new file needs to be added in order for it to function.
app.use('/users', userRoutes);
app.use('/venues', venueRoutes);
app.use('/carves', carRoutes);
app.use('/follows', ufRoutes);
app.use('/messages', msgRoutes);
app.use('/comments', comRoutes);
app.use('/media', medRoutes);
app.use('/likes', likRoutes);
app.use('/carveAt', carAtRoutes);
app.use('/users/:userId/carves', usrCarRoutes);
app.use('/users/:userId/follows', usrUfRoutes);
app.use('/users/:userId/messages', usrMsgRoutes);
app.use('/users/:userId/comments', usrComRoutes);
app.use('/users/:userId/media', usrMedRoutes);
app.use('/users/:userId/likes', usrLikRoutes);
app.use('/users/:userId/carveAt',usrCarAtRoutes);

// App listens on specific port or 8000 by default
app.listen(PORT, () => {
	console.log("Connect API started on port "+ PORT + "!");
});


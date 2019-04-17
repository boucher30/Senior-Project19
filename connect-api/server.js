// Sean 3/23

require('dotenv').config();
const express = require('express');
const app = express({mergeParams: true});
const server = require('http').createServer(app);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8000;
const PORT2 = 8001;
//const LocalStrategy = require('passport-local');
const axios = require("axios");
const io = require('socket.io')();
//const getApiAndEmit = "todo";
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const Sequelize = require('sequelize');

const jwt = require('jsonwebtoken');



const passport = require('passport');

const passportJWT = require('passport-jwt');



const ExtractJwt = passportJWT.ExtractJwt;

const JwtStrategy = passportJWT.Strategy;



const jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

jwtOptions.secretOrKey = 'wowwow';



// lets create our strategy for web token

const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {

	console.log('payload received', jwt_payload);

	var user = getUser({ id: jwt_payload.id });



	if (user) {

		next(null, user);

	} else {

		next(null, false);

	}

});

// use the strategy

passport.use(strategy);


//const server = http.createServer(app);

// Check connection for success
const con = require('./db');

con.connect( function(err) {
  if (err) throw err;
  console.log("Connected to Carve Connect database version 5");
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
const logRoutes = require('./routes/login');
const medRoutes = require('./routes/media');
const cCRoutes = require('./routes/carves/comments');
const cMdRoutes = require('./routes/carves/media');
const cLkRoutes = require('./routes/carves/likes');
const usrCarRoutes = require('./routes/users/carves');
const carUsrRoutes = require('./routes/carves/users');
const cAtRoutes = require('./routes/carves/carveAttendees');
const usrUfRoutes = require('./routes/users/follows');
const carAtRoutes = require('./routes/carveAttendees');
const usrMsgRoutes = require('./routes/users/messages');
const usrComRoutes = require('./routes/users/comments');
const usrLikRoutes = require('./routes/users/likes');
const usrMedRoutes = require('./routes/users/media');
const usrCarAtRoutes = require('./routes/users/carveAttendees');
const venCarRoutes = require('./routes/venues/carves');
const venUfRoutes = require('./routes/venues/follows');
const venComRoutes = require('./routes/venues/comments');
const venMedRoutes = require('./routes/venues/media');
//const handshake = require('socket.io-handshake');


var domain = require('domain');
var d = domain.create();
// Set up app to handle requests and json etc...
app.use(morgan('dev'));																// Logger for api
app.use(bodyParser.urlencoded({extended: true}));			// Allows us to parse body of post request
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'shhsecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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


io.on("connection", socket => {
	console.log("New client connected"), setInterval(
		() => getApiAndEmit(socket),
		10000
	);
	socket.on("disconnect", () => console.log("Client disconnected"));
});

const getApiAndEmit = async socket => {
	try {

		const res = await axios.get(
			`https://api.darksky.net/forecast/${process.env.DS_API}/43.7695,11.2558`
		);
		socket.emit("FromAPI", res.data.currently.temperature);
	} catch (error) {
		//console.error(`Error: ${error.code}`);
	}
};

const messageNot = async socket => {

    socket.emit("testing1")

};


const sequelize = new Sequelize(
	{
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	dialect: 'mysql',
}
);

// check the databse connection
sequelize
	.authenticate()
	.then(() => console.log('Connection has been established successfully.'))
.catch(err => console.error('Unable to connect to the database:', err));




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
app.use('/login', logRoutes);
app.use('/carveAt', carAtRoutes);
app.use('/carves/:carveId/users', carUsrRoutes);
app.use('/carves/:carveId/carveAttendees', cAtRoutes);
app.use('/carves/:carveId/comments', cCRoutes);
app.use('/carves/:carveId/media', cMdRoutes);
app.use('/carves/:carveId/likes', cLkRoutes);
app.use('/users/:userId/carves', usrCarRoutes);
app.use('/users/:userId/follows', usrUfRoutes);
app.use('/users/:userId/messages', usrMsgRoutes);
app.use('/users/:userId/comments', usrComRoutes);
app.use('/users/:userId/media', usrMedRoutes);
app.use('/users/:userId/likes', usrLikRoutes);
app.use('/users/:userId/carveAttendees',usrCarAtRoutes);
app.use('/venues/:venueId/media', venMedRoutes);
app.use('/venues/:venueId/comments', venComRoutes);
app.use('/venues/:venueId/carves', venCarRoutes);
app.use('/venues/:venueId/follows', venUfRoutes);

// App listens on specific port or 8000 by default
app.listen(PORT, () => {
	console.log("Connect API started on port "+ PORT + "!");
});



console.log('socket io listening on port ', PORT2);
io.listen( 8001,() => console.log(`listening on port ${PORT2}`));

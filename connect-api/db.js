const mysql = require('mysql');

// Connect to MySQL
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
	database: "ccv3"
});

// Export connection so we dont open more connections
module.exports = con;
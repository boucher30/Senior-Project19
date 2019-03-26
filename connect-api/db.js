const mysql = require('mysql');

// Connect to MySQL
var con = mysql.createConnection({
  host: process.env.host,
  user: process.env.host,
  password: process.env.password,
	database: "CCv4",
    multipleStatements: true
});

// Export connection so we dont open more connections
module.exports = con;
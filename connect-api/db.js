const mysql = require('mysql');

// Connect to MySQL
var con = mysql.createConnection({
  host: "localhost",
  user: "nodeuser",
  password: "nodeuser@1234",
	database: "CCv3",
    multipleStatements: true
});

// Export connection so we dont open more connections
module.exports = con;
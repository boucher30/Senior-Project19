const mysql = require('mysql');

// Connect to MySQL
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_user,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});

// Export connection so we dont open more connections
module.exports = con;
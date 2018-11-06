// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: "root",
    password: "password23P^",
  database: "burgers_db"
});

// Create connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection to ORM 
module.exports = connection;
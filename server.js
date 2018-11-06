//Import Express and Handlebars
var express = require("express");

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the public directory 
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import to let the server access to them.
var router = require("./controllers/burgers_controller.js");

app.use(router);

//Start the server
app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});

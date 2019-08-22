// Require dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require models
var db = require("./models");

// Set up PORT || server connection
var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

//Configure middleware -------
// log requests
app.use(logger("dev"));
// parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// make static folder public
app.use(express.static("public"));

// Connect mongo database to mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// ROUTING -----------------------




// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
var express = require("express");
var router = express.Router();

var Article = require("../models/Article.js");
var Note = require("../models/Note");

// Create route for main page
router.get("/", function(req, res) {
    Article.find(function(data) {
        console.log("This is the index page.")
        res.render("index", data)
    })
})

// Logic to display info


// POST or PUT for taking notes info to db


// DELETE note


module.exports = router;

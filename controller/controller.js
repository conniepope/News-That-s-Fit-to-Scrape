var express = require("express");
var router = express.Router();

// var Article = require("../models/Article.js");
// var Note = require("../models/Note");


// Create route for main page
router.get("/", function(req, res) {
    console.log("This is the index page.")
    res.render("index")
    
})

router.get("/notes", function(req, res) {
    console.log("This is the notes page.")
    res.render("notes")
    
})

// Logic to display info


// POST or PUT for taking notes info to db


// DELETE note


module.exports = router;

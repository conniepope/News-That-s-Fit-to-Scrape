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

// Handlebars set up
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import page routing
var router = express.Router();
require("./controller/controller");
app.use(router);

// Connect mongo database to mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Mongoose connection is successful.");
    }
});

// ROUTING -----------------------
// A GET route for main page
app.get("/", function(req, res) {
    db.Article.find(function(data) {
        console.log("This is the index page.")
        res.render("index", data)
    })
})
// A GET route for the scraped website
app.get("/scrape", function(req, res) {
    // Axios get the body of the html
    axios.get("https://www.goodnewsnetwork.org/category/news/laughs/")
        .then(function(response) {

            // Load to Cheerio and save as a variable
            var $ = cheerio.load(response.data);

            $("div[class=td-module-thumb] a").each(function(i, element) {
                // Save an empty result object
                var result = {};
                // Save features as properties of the result object
                result.title = $(this)
                    .attr("title")
                result.link = $(this)
                    .attr("href")
                result.image = $(this)
                    .children("img")
                    .attr("src");

        // Create new Articles in db using the result object from the scraping
        db.Article.create(result)
            .then(function(dbArticle) {
                // Added result
                res.json(result)
                console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err);
            });

        });
        console.log("Scrape Complete")
    });
});

// A GET route for getting all Articles from the db
app.get("/articles", function(req, res) {
    db.Article.find({})
    .then(function(data) {
        res.json(data)
        // res.render("index", data);
    })
    .catch(function(err) {
        res.json(err);
    });
});

// A GET route for getting a specific Article by ID, then populate it with it's note
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id : req.params.id })
    .populate("note")
    .then(function(dbArticle) {
       res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

// A POST route for creating & updating a note for an Article
app.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
    .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, {    
            note: dbNote._id }, { new: true });
        })
        // Send Article back to client
        .then(function(dbArticle) {
            console.log(dbArticle)
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// { new: true } tells the query that we want it to return the updated article -- it returns the original by default


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
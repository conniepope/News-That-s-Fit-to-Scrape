//Logic and functionality -------------------

//Get articles as a JSON -----
$.getJSON("/articles", function(data) {
    $("#articles").empty();
    //Run loop
    for (var i = 0; i < data.length; i++) {
        //Display on page
        $("#articles").append(
            "<h4 data-id='" + data[i]._id + "'>" + data[i].title + "</h4>",
            "<img src='" + data[i].image + "' class='photos'</img>",
            // "<a href='" + data[i].link + "' class='links'>Show Me the Story</a>",
            "<a role='button' class='links' id='button' href='" + data[i].link + "'>Link to the Story</a>",
            "<p>", "<p>"
        );
    };
});

//Listener for scrape button ---------------
$(document).on("click", "#scraper", function() {
    //run app.get("/scrape")
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .then(function(data){
        $.ajax({
            method: "GET",
            url: "/articles"
        })
    })
})

//Listener for when client clicks an <h3> tag --------------
$(document).on("click", "h4", function(){
    console.log("h4 clicked");
    //Empty notes from note section?
    // $("#notes").empty();
    //Save id from <p> tag to a variable
    var articleID = $(this).attr("data-id");
    //Make ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + articleID
    })
    //.then, add note data to the page
    .then(function(data) {
        console.log(data)
        //open note modal form
        $("#notes").modal("show");
        
        //title
        // $("#notes").append("<h3>" + data.title + "</h3>"),
        // //an input to enter a new title
        // ("<input id='titleInput' name='title'>"),
        // //a textarea to add a new note body
        // ("<textarea id='bodyInput' name='body'></textarea>"),
        // //a button to submit a new note (with the id of the article)
        // ("<button data-id='" + data._id + "' id='submitNote'>Save My Note</button>");

        
        // //IF there is a new note,
        // if (data.note) {
        //     //Place title of note in title input,
        //     $("#titleInput").val(data.note.title);
        //     //Place body of note in the body textarea
        //     $("#bodyInput").val(data.note.body);
        //     //post note to that article (in db)
        //     $.ajax({
        //         method: "POST",
        //         url: "/articles/" + data._id
        //     })
        //     console.log("note posted")
    })
});     


//Listener for when the submitNote button is clicked -------------
$(document).on("click", "#submitNote", function(){

    //Get id of article from submit button
    var articleID = $(this).attr("data-id");
    //Run POST request to change the note to the new input data values
    $.ajax({
        method: "POST",
        url: "/articles/" + articleID,
        data: {
            title: $("#titleInput").val(),
            body: $("#bodyInput").val()
        }
    })
    //.then 
    .then(function(data) {
        //log the response
        console.log(data);
        //empty the notes section
        $("#notes").empty();
        window.location.replace("/articles")
    })
    //Remove values from input & textarea for note entry
    $("#titleInput").val("");
    $("#bodyInput").val("");
});
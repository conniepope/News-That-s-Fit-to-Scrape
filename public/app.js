//Logic and functionality -------------------

//Get articles as a JSON -----
$.getJSON("/articles", function(data) {
    // OPTION 1:
    //Run loop
    for (var i = 0; i < data.length; i++) {
        //Display on page
        $("#articles").append(
            "<h3 data-id='" + data[i]._id + "'>" + data[i].title + "</h3>",
            "<a href='" + data[i].link + "'>Show Me the Story</a>",
            "<img src='" + data[i].image + "'</img>"
        );
    };

    // OPTION 2:
    // $("#articles").empty();
    //     var p = $("<p>").append(
    //         $("<p data-id'>").text(data[i]._id),
    //         $("<p>").text(data[i].title),
    //         $("<p>").text(data[i].link),
    //         $("<p>").text(data[i].image)
    //     );
    //     $("#articles").append(p);
});

//Listener for when client clicks  a <p> tag --------------
$(document).on("click", "p", function(){
    //Empty notes from note section?
    $("#notes").empty();
    //Save id from <p> tag to a variable
    var articleID = $(this).attr("data-id");
    //Make ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles" + articleID
    })
    //.then, add note data to the page
    .then(function(data) {
        console.log(data)
        //title
        $("#notes").append("<h2>" + data.title + "<h2>"),
        //an input to enter a new title
        ("<input id='titleInput' name='title' >"),
        //a textarea to add a new note body
        ("<textarea id='bodyInput' name='body'></textarea>"),
        //a button to submit a new note (with the id of the article)
        ("<button data-id='" + data._id + "' id='submitNote'>Save My Note</button>");
        
        //IF there is a new note,
        if (data.note) {
            //Place title of note in title input,
            $("#titleInput").val(data.note.title);
            //Place body of note in the body textarea
            $("#bodyInput").val(data.note.body);
        }
    })
});      

//Listener for when the submitNote button is clicked -------------
$(document).on("click", "#submitNote", function(){

    //Get id of article from submit button
    var articleID = $(this).attr("data-id");
    //Run POST request to change the note to the new input data values
    $.ajax({
        method: "POST",
        url: "/articles" + articleID,
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
    })
    //Remove values from input & textarea for note entry
    $("#titleInput").val("");
    $("#bodyInput").val("");
});
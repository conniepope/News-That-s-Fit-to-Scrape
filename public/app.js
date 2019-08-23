//Logic and functionality -------------------

//Get articles as a JSON -----
$.getJSON("/articles", function(data) {
    //Run loop
    for (var i = 0; i < data.length; i++) {
        //Display on page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br  />" + data[i].link + "<br />" + data[i].image + "</p>")
    }
});


//Listener for when client clicks  a <p> tag -----

    //Empty notes from note section?

    //Save id from <p> tag to a variable

    //Make ajax call for the Article

        //.then, add note data to the page

            //title

            //an input to enter a new title

            //a textarea to add a new note body

            //a button to submit a the new note (with the id of the article)

            //IF there is a new note,

                //Place title of note in title input,

                //Place body of note in the body textarea


//Listener for when the savenote button is clicked

    //Get id of article from submit button

    //Run POST request to change the note to the new input data values

    //.then 

        //log the response

        //empty the notes section

    //Remove values from input & textarea for note entry

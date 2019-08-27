var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    // _titleId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Article"
    // },
    title: String,
    body: String
});



var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
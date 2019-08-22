// Variable for mongoose Schema contructor
var Schema = mongoose.Schema;

//Using the Schema constructor, create a new Schema object
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
})

// Create model from Schema using mongoose method
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
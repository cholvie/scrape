var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var noteSchema = new Schema({
    headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline",
    },
    date: String,
    noteText: string
});

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;

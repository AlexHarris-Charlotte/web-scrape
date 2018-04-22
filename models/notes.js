const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
  noteTitle: String,
  noteContent: String
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
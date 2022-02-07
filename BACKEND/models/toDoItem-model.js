const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const toDoItemSchema = new Schema({
  name: { type: String },
  //ID
  recurring: {
    value: { type: Boolean },
    time: { type: Number },
    category: { type: String },
  },
  status: { type: String },
  due: {
    date: { type: Number },
    time: { type: Number },
  },
  priority: { type: Number },
  address: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  notes: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, ref: "User" },
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("ToDoItem", toDoItemSchema);

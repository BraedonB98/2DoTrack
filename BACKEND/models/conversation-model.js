const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  date: { type: Date, index: { unique: true, expires: "1m" } },
  name: { type: String },
  status: { type: String },
  uid: { type: String },
  conversationSID: { type: String },
});

module.exports = mongoose.model("ConversationItem", conversationSchema);

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Comment", commentSchema);

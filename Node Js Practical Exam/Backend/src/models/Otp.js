const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);

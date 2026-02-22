const mongoose = require("mongoose");

//  Create Schema
const postSchema = mongoose.Schema({
  title: String,
  content: String
});

// Create Model
module.exports = mongoose.model("Post", postSchema);
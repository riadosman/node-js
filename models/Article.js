const mongoose = require("mongoose");
// table = schema
const Schema = mongoose.Schema;
// create the database table structur from the (Schema) class
const articleSchema = new Schema({
  // which data table contain
  title: String,
  body: String,
  numberOfLikes: Number,
});
// for create the Article table with (articleSchema) structor in db
const Article = mongoose.model("Article", articleSchema);
// for export the const
module.exports = Article;

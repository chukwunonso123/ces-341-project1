const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  year: Number,
  rating: Number,
  summary: String,
  isbn: String
});

module.exports = mongoose.model('Book', bookSchema);

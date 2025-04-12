const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'], // Adjust as needed (optional or required)
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: /.+\@.+\..+/,
  },
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
require('dotenv').config(); // Load .env file

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("🚨 MONGODB_URI is not defined in .env file!");
    process.exit(1); // Stop the app if no URI is provided
}

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("🚨 MongoDB connection error:", err));

module.exports = mongoose;

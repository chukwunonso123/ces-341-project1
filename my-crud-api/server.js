// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use CORS for cross-origin requests
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected...'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Passport.js setup
require('./config/passport');

// Use session middleware for OAuth
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ========== ROUTES ========== //

// Auth Routes (e.g., /auth/github)
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// Callback Route for GitHub OAuth
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // On success
    res.redirect('/profile');
  }
);

// Route to get user profile if authenticated
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      message: '🔐 Authenticated User Profile',
      user: req.user
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.logout((err) => { 
    if (err) {
      return next(err); // Handle error if any
    }
    res.redirect('/'); // Redirect to home after logout
  });
});

// Import and use user-related routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// ========== SWAGGER SETUP ========== //

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'This is the API documentation for my CRUD API.',
    },
    servers: [
      {
        url: 'http://localhost:5000',  // or your deployed URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files for auto-generation of documentation
};

// Generate Swagger docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Default Route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to the GitHub OAuth API!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🟢 Server running on http://localhost:${PORT}`);
});

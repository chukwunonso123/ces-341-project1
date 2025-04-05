const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');  // Importing user routes

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API to manage users',
    },
    servers: [
      {
        url: 'http://localhost:5000',  // Adjust for your deployment if necessary
      },
    ],
  },
  apis: ['./routes/*.js'],  // Path to your API route files where you define Swagger comments
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI at '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/users', userRoutes);  // Mounting the user routes at '/api/users'

// Hardcoding Mongo URI and PORT
const MONGO_URI = 'mongodb+srv://chukwunonso:godspower123@cluster0.gbj1m.mongodb.net/project2?retryWrites=true&w=majority';  // Corrected Mongo URI
const PORT = 5000;  // Hardcoded port

// Test if Mongo URI is available
console.log('Mongo URI:', MONGO_URI);

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

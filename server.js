const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Ensure this file exists
const contactRoutes = require('./routes/contacts'); // Ensure this path is correct

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // Enables parsing of JSON requests
app.use('/contacts', contactRoutes); // Ensure your routes are correctly mounted

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Welcome to the Contacts API!');
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

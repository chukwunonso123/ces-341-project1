import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import errorHandler from './middleware/errorHandler.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// Define a root route to handle requests to the root URL
app.get('/', (req, res) => {
  res.send('Hello, World! Your server is running.');
});

// Connect to MongoDB using URI from .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Swagger docs
const swaggerDocument = YAML.load('./swagger/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

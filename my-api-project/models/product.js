import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }  // Store category as a string instead of ObjectId
});

// Prevent model from being redefined if it already exists
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;

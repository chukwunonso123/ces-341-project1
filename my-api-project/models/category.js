import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});

// Prevent model from being redefined if already exists
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;

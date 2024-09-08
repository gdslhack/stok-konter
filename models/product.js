const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  safeStock: { type: Number, required: true },
  dangerousStock: { type: Number, required: true },
  type: { type: String, enum: ['voucher', 'accessory'], required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

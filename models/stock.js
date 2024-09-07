const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  type: { type: String, enum: ['in', 'out'], required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stock', stockSchema);

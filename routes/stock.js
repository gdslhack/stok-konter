const express = require('express');
const router = express.Router();
const Stock = require('../models/stock');
const Product = require('../models/product');

// Route untuk menambahkan stok baru
router.post('/stock-in', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const stock = new Stock({ productId, quantity, type: 'in' });
    await stock.save();
    res.redirect('/inventory');
  } catch (error) {
    res.status(500).send('Error saving stock');
  }
});

// Route untuk mengurangi stok
router.post('/stock-out', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const stock = new Stock({ productId, quantity, type: 'out' });
    await stock.save();
    res.redirect('/inventory');
  } catch (error) {
    res.status(500).send('Error saving stock');
  }
});

module.exports = router;

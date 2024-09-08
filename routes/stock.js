const express = require('express');
const router = express.Router();
const Stock = require('../models/stock');
const Product = require('../models/product');

// Route untuk menampilkan formulir input produk
router.get('/add-product', (req, res) => {
  res.render('add-product', { title: 'Add Product', header: 'Add New Product' });
});

// Route untuk menangani pengiriman formulir input produk
router.post('/add-product', async (req, res) => {
  try {
    const { name, purchasePrice, sellingPrice, safeStock, dangerousStock, type } = req.body;
    const product = new Product({
      name,
      purchasePrice,
      sellingPrice,
      safeStock,
      dangerousStock,
      type
    });
    await product.save();
    res.redirect('/inventory'); // Redirect ke halaman lain setelah berhasil menambah produk
  } catch (error) {
    res.status(500).send('Error adding product');
  }
});

// Existing routes

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

// Route untuk menampilkan data stock
router.get('/', async (req, res) => {
  try {
    // Mengambil data stok dari database
    const stocks = await Stock.find().populate('productId');
    res.render('stock', { title: 'Stock Page', header: 'Stock', stocks });
  } catch (error) {
    res.status(500).send('Error retrieving stock data');
  }
});

module.exports = router;

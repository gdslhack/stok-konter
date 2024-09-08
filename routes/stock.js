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

// Route untuk menambahkan stok baru
router.post('/stock-in', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const stock = new Stock({ productId, quantity, type: 'in' });
    await stock.save();
    res.redirect('/stock'); // Redirect ke halaman stok setelah berhasil menambah stok
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
    res.redirect('/stock'); // Redirect ke halaman stok setelah berhasil mengurangi stok
  } catch (error) {
    res.status(500).send('Error saving stock');
  }
});

// Route untuk menampilkan data stock
router.get('/', async (req, res) => {
  try {
    // Mengambil data stok dan produk dari database
    const stocks = await Stock.find().populate('productId');
    const products = await Product.find();

    // Calculate remaining stock for each product
    const remainingStock = products.map(product => {
      const stockIn = stocks
        .filter(stock => stock.productId.equals(product._id) && stock.type === 'in')
        .reduce((total, stock) => total + stock.quantity, 0);

      const stockOut = stocks
        .filter(stock => stock.productId.equals(product._id) && stock.type === 'out')
        .reduce((total, stock) => total + stock.quantity, 0);

      const netStock = stockIn - stockOut;

      return {
        product,
        stockIn,
        stockOut,
        netStock
      };
    });

    res.render('stock', {
      title: 'Stock Page',
      header: 'Stock',
      remainingStock
    });
  } catch (error) {
    res.status(500).send('Error retrieving stock data');
  }
});

module.exports = router;

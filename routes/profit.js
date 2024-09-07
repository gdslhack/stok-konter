const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    let totalProfit = 0;
    products.forEach(product => {
      totalProfit += product.price * product.stock;
    });
    res.render('profit', { totalProfit });
  } catch (error) {
    res.status(500).send('Error calculating profit');
  }
});

module.exports = router;

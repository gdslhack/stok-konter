const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Stock = require('../models/stock');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    const stocks = await Stock.find();
    res.render('inventory', { products, stocks });
  } catch (error) {
    res.status(500).send('Error retrieving inventory');
  }
});

module.exports = router;

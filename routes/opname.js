const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Stock = require('../models/stock');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    const stocks = await Stock.find();
    res.render('opname', { products, stocks });
  } catch (error) {
    res.status(500).send('Error retrieving stock opname');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Temporary stock data
const products = [
  { name: 'Kabel USB', stock: 10 },
  { name: 'Kepala Charger', stock: 10 },
  { name: 'Voucher Axis', stock: 10 }
];

// GET request to /warnings
router.get('/', (req, res) => {
  res.render('warning', { products });
});

module.exports = router;

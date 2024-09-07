const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;

// Database connection
mongoose.connect('mongodb://localhost/inventory-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
const stockRoutes = require('./routes/stock');
const inventoryRoutes = require('./routes/inventory');
const warningsRoutes = require('./routes/warnings');
const opnameRoutes = require('./routes/opname');
const profitRoutes = require('./routes/profit');

app.use('/stock', stockRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/warnings', warningsRoutes);
app.use('/opname', opnameRoutes);
app.use('/profit', profitRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

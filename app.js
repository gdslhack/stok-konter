const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Port from environment variables or default to 3000
const port = process.env.PORT || 3000;

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set views directory

// Import routes
const stockRoutes = require('./routes/stock');
const inventoryRoutes = require('./routes/inventory');
const warningsRoutes = require('./routes/warnings');
const opnameRoutes = require('./routes/opname');
const profitRoutes = require('./routes/profit');

// Use routes
app.use('/stock', stockRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/warnings', warningsRoutes);
app.use('/opname', opnameRoutes);
app.use('/profit', profitRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Dashboard', header: 'Dashboard' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

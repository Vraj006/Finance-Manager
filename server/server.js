const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://finance-manager-xl3h.onrender.com' : 'http://localhost:3000',
    credentials: true
  }));
app.use(express.json());
app.use(morgan('dev'));
const portfolioRoutes = require('./routes/portfolio');

// Routes
app.use('/api/auth', require('./routes/auth'));
// Add this line with your other routes
app.use('/api/expenses', require('./routes/expenses'));
// Add this line with your other routes
app.use('/api/users', require('./routes/users'));
app.use('/api/portfolio', portfolioRoutes);

// Basic route
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '../client/dist')));
  
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
    });
  } else {
    // Basic route for development
    app.get('/', (req, res) => {
      res.json({ message: 'Finance Manager API is running' });
    });
  }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
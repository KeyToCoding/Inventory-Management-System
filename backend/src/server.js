const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }
    // Attempt MongoDB connection with a 2.5s timeout
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log('Connected to MongoDB');

    // Mount database-backed routes
    const authRoutes = require('./routes/auth');
    const billingRoutes = require('./routes/billing');
    const productRoutes = require('./routes/products');

    app.use('/api/auth', authRoutes);
    app.use('/api/billing', billingRoutes);
    app.use('/api/products', productRoutes);
  } catch (error) {
    console.warn(`MongoDB connection unavailable (${error.message}).`);
    console.log('Starting Local Offline Database mode (data stored in backend/data/db.json)...');
    
    // Mount local fallback routes
    const localFallback = require('./localFallback');
    app.use('/api', localFallback);
  }

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
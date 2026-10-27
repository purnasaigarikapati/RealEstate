const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'EstateHub Real Estate Management API',
    currency: 'INR (₹)',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/purchases', require('./routes/purchaseRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(` EstateHub API Server running on http://localhost:${PORT}`);
    console.log(` Health check: http://localhost:${PORT}/api/health`);
    console.log(` Currency: Indian Rupee (INR ₹)`);
    console.log(`=======================================================`);
  });
}

startServer();

module.exports = app;

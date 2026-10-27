const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/estatehub';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500 // Don't hang for 30 seconds if mongo is absent
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Notice] Could not connect to MongoDB at ${uri}.`);
    console.warn(`[MongoDB Notice] EstateHub will operate in in-memory sample data fallback mode so that all endpoints and UI remain 100% functional.`);
    console.warn(`[MongoDB Notice] To enable MongoDB persistence, ensure MongoDB is running (e.g., mongod or MongoDB Atlas) and update MONGODB_URI in backend/.env.`);
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };


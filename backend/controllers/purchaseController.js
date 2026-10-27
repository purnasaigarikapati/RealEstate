const Purchase = require('../models/Purchase');
const { getIsConnected } = require('../config/db');
const memoryStore = require('./memoryStore');

if (!memoryStore.purchases) {
  memoryStore.purchases = [];
}

// @desc    Create / Confirm a property purchase or token booking
// @route   POST /api/purchases
const createPurchase = async (req, res) => {
  try {
    const {
      propertyId,
      propertyTitle,
      propertyPrice,
      propertyLocation,
      propertyImage,
      userName,
      userEmail,
      userPhone,
      paymentMethod,
      tokenAmount,
      notes
    } = req.body;

    if (!propertyId || !propertyTitle || !propertyPrice) {
      return res.status(400).json({ success: false, message: 'Property details are required to complete purchase' });
    }

    const orderId = 'ORD-EH-' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
    const advanceAmount = tokenAmount || Math.round(Number(propertyPrice) * 0.02); // 2% token advance by default

    const purchaseData = {
      propertyId,
      propertyTitle,
      propertyPrice: Number(propertyPrice),
      propertyLocation: propertyLocation || '',
      propertyImage: propertyImage || '',
      user: req.user ? req.user.id : null,
      userName: userName || (req.user ? req.user.name : 'Verified Buyer'),
      userEmail: userEmail || (req.user ? req.user.email : 'buyer@example.in'),
      userPhone: userPhone || '+91 98765 43210',
      tokenAmount: advanceAmount,
      paymentMethod: paymentMethod || 'UPI',
      orderId,
      status: 'confirmed',
      notes: notes || 'Standard registration and token booking agreement executed.',
      createdAt: new Date().toISOString()
    };

    if (getIsConnected()) {
      try {
        const purchase = await Purchase.create(purchaseData);
        return res.status(201).json({
          success: true,
          message: 'Property purchase & booking confirmed successfully!',
          purchase
        });
      } catch (err) {
        console.warn('MongoDB purchase creation fallback to in-memory:', err.message);
      }
    }

    // In-memory fallback
    memoryStore.purchases.unshift(purchaseData);

    return res.status(201).json({
      success: true,
      message: 'Property purchase & booking confirmed successfully!',
      purchase: purchaseData
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get purchases made by the current user
// @route   GET /api/purchases/my
const getMyPurchases = async (req, res) => {
  try {
    const userEmail = req.user ? req.user.email : req.query.email;

    if (getIsConnected()) {
      try {
        const query = req.user
          ? { $or: [{ user: req.user.id }, { userEmail: req.user.email }] }
          : (userEmail ? { userEmail } : {});
        const purchases = await Purchase.find(query).sort({ createdAt: -1 });
        return res.json({ success: true, purchases });
      } catch (err) {
        console.warn('MongoDB fetch fallback');
      }
    }

    const purchases = memoryStore.purchases.filter(p => 
      !userEmail || p.userEmail.toLowerCase() === userEmail.toLowerCase()
    );
    return res.json({ success: true, purchases });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all purchases (Admin)
// @route   GET /api/purchases/all
const getAllPurchases = async (req, res) => {
  try {
    if (getIsConnected()) {
      try {
        const purchases = await Purchase.find().sort({ createdAt: -1 });
        return res.json({ success: true, purchases });
      } catch (err) {
        // fallback
      }
    }
    return res.json({ success: true, purchases: memoryStore.purchases });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPurchase,
  getMyPurchases,
  getAllPurchases
};


const Enquiry = require('../models/Enquiry');
const { getIsConnected } = require('../config/db');
const memoryStore = require('./memoryStore');

// @desc    Submit an enquiry for a property or general contact
// @route   POST /api/enquiries
const createEnquiry = async (req, res) => {
  try {
    const { propertyId, propertyTitle, propertyPrice, name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and message' });
    }

    if (getIsConnected()) {
      const enquiry = await Enquiry.create({
        property: propertyId || null,
        propertyTitle: propertyTitle || '',
        propertyPrice: propertyPrice || 0,
        user: req.user ? req.user.id : null,
        name,
        email,
        phone: phone || '',
        message
      });

      return res.status(201).json({
        success: true,
        message: 'Enquiry received successfully',
        enquiry
      });
    }

    // In-Memory Fallback
    const newEnquiry = {
      _id: 'enq-' + Date.now(),
      propertyId: propertyId || null,
      propertyTitle: propertyTitle || '',
      propertyPrice: propertyPrice || 0,
      user: req.user ? req.user.id : null,
      name,
      email,
      phone: phone || '',
      message,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    memoryStore.enquiries.unshift(newEnquiry);

    return res.status(201).json({
      success: true,
      message: 'Enquiry received successfully',
      enquiry: newEnquiry
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get enquiries for current user
// @route   GET /api/enquiries/my
const getMyEnquiries = async (req, res) => {
  try {
    if (getIsConnected()) {
      const enquiries = await Enquiry.find(req.user ? { user: req.user.id } : {}).sort({ createdAt: -1 });
      return res.json({ success: true, enquiries });
    }

    const enquiries = memoryStore.enquiries;
    return res.json({ success: true, enquiries });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createEnquiry, getMyEnquiries };


const User = require('../models/User');
const Property = require('../models/Property');
const Enquiry = require('../models/Enquiry');
const { getIsConnected } = require('../config/db');
const memoryStore = require('./memoryStore');

// @desc    Get Admin Metrics
// @route   GET /api/admin/stats
const getStats = async (req, res) => {
  try {
    if (getIsConnected()) {
      const [totalProperties, approvedProperties, pendingProperties, totalUsers, totalEnquiries] = await Promise.all([
        Property.countDocuments(),
        Property.countDocuments({ status: 'approved' }),
        Property.countDocuments({ status: 'pending' }),
        User.countDocuments(),
        Enquiry.countDocuments()
      ]);

      const valuationAgg = await Property.aggregate([
        { $group: { _id: null, totalVal: { $sum: '$price' } } }
      ]);
      const totalPortfolioValue = valuationAgg[0]?.totalVal || 0;

      return res.json({
        success: true,
        stats: {
          totalProperties,
          approvedProperties,
          pendingProperties,
          totalUsers,
          totalEnquiries,
          totalPortfolioValue
        }
      });
    }

    // In-Memory Fallback
    const totalProperties = memoryStore.properties.length;
    const approvedProperties = memoryStore.properties.filter(p => p.status === 'approved').length;
    const pendingProperties = memoryStore.properties.filter(p => p.status === 'pending').length;
    const totalUsers = memoryStore.users.length;
    const totalEnquiries = memoryStore.enquiries.length;
    const totalPortfolioValue = memoryStore.properties.reduce((sum, p) => sum + (p.price || 0), 0);

    return res.json({
      success: true,
      stats: {
        totalProperties,
        approvedProperties,
        pendingProperties,
        totalUsers,
        totalEnquiries,
        totalPortfolioValue
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users (admin)
// @route   GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    if (getIsConnected()) {
      const users = await User.find().select('-password').sort({ createdAt: -1 });
      return res.json({ success: true, users });
    }
    return res.json({ success: true, users: memoryStore.users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user role (admin)
// @route   PUT /api/admin/users/:id/role
const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'agent', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    if (getIsConnected()) {
      const user = await User.findByIdAndUpdate(id, { role }, { new: true });
      return res.json({ success: true, user });
    }

    const user = memoryStore.users.find(u => u._id === id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    user.role = role;
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getStats,
  getAllUsers,
  updateUserRole
};


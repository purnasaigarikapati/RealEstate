const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
  propertyId: {
    type: String,
    required: true
  },
  propertyTitle: {
    type: String,
    required: true
  },
  propertyPrice: {
    type: Number,
    required: true
  },
  propertyLocation: {
    type: String,
    default: ''
  },
  propertyImage: {
    type: String,
    default: ''
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userPhone: {
    type: String,
    default: ''
  },
  tokenAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['UPI', 'NetBanking', 'BankTransfer', 'Cheque'],
    default: 'UPI'
  },
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'under_escrow', 'completed', 'cancelled'],
    default: 'confirmed'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Purchase', purchaseSchema);


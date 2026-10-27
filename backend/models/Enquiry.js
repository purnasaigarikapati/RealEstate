const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
  propertyTitle: {
    type: String,
    default: ''
  },
  propertyPrice: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please provide your full name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    required: [true, 'Please provide an enquiry message']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'closed'],
    default: 'new'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);


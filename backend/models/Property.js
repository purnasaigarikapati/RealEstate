const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a property title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a property description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  purpose: {
    type: String,
    enum: ['sale', 'rent'],
    default: 'sale'
  },
  propertyType: {
    type: String,
    enum: ['House', 'Apartment', 'Villa', 'Penthouse', 'Commercial'],
    default: 'House'
  },
  status: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: 'approved'
  },
  featured: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    required: [true, 'Please provide a street address']
  },
  city: {
    type: String,
    required: [true, 'Please provide a city']
  },
  state: {
    type: String,
    default: 'CA'
  },
  zipCode: {
    type: String,
    default: ''
  },
  bedrooms: {
    type: Number,
    default: 1
  },
  bathrooms: {
    type: Number,
    default: 1
  },
  area: {
    type: Number,
    required: [true, 'Please provide the square footage area']
  },
  parking: {
    type: Number,
    default: 1
  },
  yearBuilt: {
    type: Number,
    default: new Date().getFullYear()
  },
  amenities: [{
    type: String
  }],
  images: [{
    type: String
  }],
  owner: {
    type: mongoose.Schema.Types.Mixed, // Can reference User object or User ObjectId
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);


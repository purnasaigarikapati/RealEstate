const Property = require('../models/Property');
const { getIsConnected } = require('../config/db');
const memoryStore = require('./memoryStore');

// @desc    Get all properties with filtering and sorting
// @route   GET /api/properties
const getProperties = async (req, res) => {
  try {
    const { keyword, purpose, propertyType, city, minPrice, maxPrice, bedrooms, sort } = req.query;

    if (getIsConnected()) {
      let query = {};

      if (purpose && purpose !== 'all') {
        query.purpose = purpose;
      }
      if (propertyType && propertyType !== 'all') {
        query.propertyType = new RegExp(`^${propertyType}$`, 'i');
      }
      if (city && city !== 'all') {
        query.city = new RegExp(city, 'i');
      }
      if (bedrooms && bedrooms !== 'any') {
        query.bedrooms = { $gte: Number(bedrooms) };
      }
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
      if (keyword) {
        query.$or = [
          { title: { $regex: keyword, $options: 'i' } },
          { address: { $regex: keyword, $options: 'i' } },
          { city: { $regex: keyword, $options: 'i' } },
          { propertyType: { $regex: keyword, $options: 'i' } }
        ];
      }

      let sortOption = { createdAt: -1 };
      if (sort === 'price-asc') sortOption = { price: 1 };
      if (sort === 'price-desc') sortOption = { price: -1 };
      if (sort === 'area-desc') sortOption = { area: -1 };

      const properties = await Property.find(query).sort(sortOption);
      return res.json({ success: true, count: properties.length, properties });
    }

    // In-Memory Fallback
    let list = [...memoryStore.properties];

    if (purpose && purpose !== 'all') {
      list = list.filter(p => p.purpose === purpose);
    }
    if (propertyType && propertyType !== 'all') {
      list = list.filter(p => p.propertyType.toLowerCase() === propertyType.toLowerCase());
    }
    if (city && city !== 'all') {
      list = list.filter(p => p.city.toLowerCase().includes(city.toLowerCase()));
    }
    if (bedrooms && bedrooms !== 'any') {
      list = list.filter(p => p.bedrooms >= Number(bedrooms));
    }
    if (minPrice) {
      list = list.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      list = list.filter(p => p.price <= Number(maxPrice));
    }
    if (keyword) {
      const k = keyword.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(k) ||
        p.city.toLowerCase().includes(k) ||
        p.address.toLowerCase().includes(k) ||
        p.propertyType.toLowerCase().includes(k)
      );
    }

    if (sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'area-desc') {
      list.sort((a, b) => b.area - a.area);
    } else {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return res.json({ success: true, count: list.length, properties: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const property = await Property.findById(id);
      if (!property) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }
      return res.json({ success: true, property });
    }

    const property = memoryStore.properties.find(p => p._id === id || p.id === id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    return res.json({ success: true, property });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new property listing
// @route   POST /api/properties
const createProperty = async (req, res) => {
  try {
    const {
      title, description, price, purpose, propertyType,
      address, city, state, zipCode, bedrooms, bathrooms,
      area, parking, yearBuilt, amenities, images, featured
    } = req.body;

    if (!title || !price || !address || !city || !area) {
      return res.status(400).json({ success: false, message: 'Please provide all mandatory property details' });
    }

    const ownerInfo = req.user ? {
      _id: req.user.id,
      name: req.user.name,
      email: req.user.email
    } : req.body.owner;

    if (getIsConnected()) {
      const property = await Property.create({
        title,
        description,
        price: Number(price),
        purpose: purpose || 'sale',
        propertyType: propertyType || 'House',
        status: 'approved',
        featured: !!featured,
        address,
        city,
        state: state || 'CA',
        zipCode: zipCode || '',
        bedrooms: Number(bedrooms) || 1,
        bathrooms: Number(bathrooms) || 1,
        area: Number(area),
        parking: Number(parking) || 1,
        yearBuilt: Number(yearBuilt) || new Date().getFullYear(),
        amenities: amenities || [],
        images: images || [],
        owner: ownerInfo
      });

      return res.status(201).json({ success: true, property });
    }

    const newProperty = {
      _id: 'prop-' + Date.now(),
      title,
      description,
      price: Number(price),
      purpose: purpose || 'sale',
      propertyType: propertyType || 'House',
      status: 'approved',
      featured: !!featured,
      address,
      city,
      state: state || 'CA',
      zipCode: zipCode || '',
      bedrooms: Number(bedrooms) || 1,
      bathrooms: Number(bathrooms) || 1,
      area: Number(area),
      parking: Number(parking) || 1,
      yearBuilt: Number(yearBuilt) || new Date().getFullYear(),
      amenities: amenities || [],
      images: images || [],
      owner: ownerInfo,
      createdAt: new Date().toISOString()
    };
    memoryStore.properties.unshift(newProperty);

    return res.status(201).json({ success: true, property: newProperty });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update property listing
// @route   PUT /api/properties/:id
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const property = await Property.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!property) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }
      return res.json({ success: true, property });
    }

    const index = memoryStore.properties.findIndex(p => p._id === id || p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    memoryStore.properties[index] = {
      ...memoryStore.properties[index],
      ...req.body
    };

    return res.json({ success: true, property: memoryStore.properties[index] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const property = await Property.findByIdAndDelete(id);
      if (!property) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }
      return res.json({ success: true, message: 'Property deleted successfully' });
    }

    const before = memoryStore.properties.length;
    memoryStore.properties = memoryStore.properties.filter(p => p._id !== id && p.id !== id);
    if (memoryStore.properties.length === before) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    return res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
};


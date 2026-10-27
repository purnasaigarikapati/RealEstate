import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Upload, 
  Check, 
  Plus, 
  Trash2, 
  DollarSign, 
  Home, 
  MapPin, 
  FileText 
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import { PROPERTY_TYPES } from '../data/mockData';

const AVAILABLE_AMENITIES = [
  'Swimming Pool',
  'Smart Home Automation',
  'Private Home Theater',
  'Wine Cellar',
  'EV Charging Station',
  'Outdoor Kitchen & BBQ',
  '24/7 Security System',
  'Central Air Conditioning',
  'Fitness Center & Gym',
  'Rooftop Terrace',
  'Private Garden',
  'High Speed Fiber Internet'
];

const PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
];

export default function SellPropertyPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast, fetchProperties } = useProperties();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    purpose: 'sale',
    propertyType: 'House',
    address: '',
    city: '',
    state: 'Maharashtra',
    zipCode: '',
    bedrooms: 3,
    bathrooms: 2,
    area: 2500,
    parking: 2,
    yearBuilt: 2023,
    featured: false
  });

  const [selectedAmenities, setSelectedAmenities] = useState([
    'Swimming Pool', 
    'Central Air Conditioning', 
    'High Speed Fiber Internet'
  ]);

  const [imageUrls, setImageUrls] = useState([
    PRESET_IMAGES[0],
    PRESET_IMAGES[1]
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleAddImageUrl = () => {
    if (newImageUrl.trim()) {
      setImageUrls(prev => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.address || !formData.city) {
      showToast('Please fill in all required property information', 'error');
      return;
    }

    if (imageUrls.length === 0) {
      showToast('Please add at least one property image', 'error');
      return;
    }

    setLoading(true);
    try {
      const propertyPayload = {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        parking: Number(formData.parking),
        yearBuilt: Number(formData.yearBuilt),
        amenities: selectedAmenities,
        images: imageUrls,
        owner: {
          _id: user?._id || 'user-1',
          name: user?.name || 'Authorized Seller',
          email: user?.email || 'seller@estatehub.com',
          phone: user?.phone || '+1 (555) 234-5678',
          role: user?.role || 'user',
          avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        }
      };

      const res = await api.createProperty(propertyPayload);
      showToast('Property created successfully!', 'success');
      fetchProperties();
      navigate('/dashboard');
    } catch (err) {
      showToast(err.message || 'Failed to create property listing', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-badge">List With EstateHub</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Publish Your Property Listing
          </h1>
          <p style={{ color: 'var(--navy-500)', fontSize: '1.05rem' }}>
            Reach millions of qualified buyers and tenants with our premium commercial listing engine.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          {/* Section 1: Basic Information */}
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={20} color="var(--primary)" /> 1. Property Overview
          </h3>

          <div className="form-group">
            <label className="form-label">Property Title *</label>
            <input 
              type="text" 
              name="title" 
              className="form-input" 
              placeholder="e.g. Modern Sunset View Villa in Bandra West"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Purpose *</label>
              <select name="purpose" className="form-select" value={formData.purpose} onChange={handleChange}>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Property Category *</label>
              <select name="propertyType" className="form-select" value={formData.propertyType} onChange={handleChange}>
                {PROPERTY_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Price (INR ₹) *</label>
              <div className="input-with-icon">
                <span className="input-icon" style={{ fontWeight: 800 }}>₹</span>
                <input 
                  type="number" 
                  name="price" 
                  className="form-input" 
                  placeholder="e.g. 15000000 (₹1.5 Cr)"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Description</label>
            <textarea 
              name="description" 
              className="form-textarea" 
              placeholder="Describe the architectural highlights, floor plan, finishes, and neighborhood attractions..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          {/* Section 2: Location Information */}
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={20} color="var(--primary)" /> 2. Location & Address
          </h3>

          <div className="form-group">
            <label className="form-label">Street Address *</label>
            <input 
              type="text" 
              name="address" 
              className="form-input" 
              placeholder="e.g. 12th Main Road, Indiranagar"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">City *</label>
              <input 
                type="text" 
                name="city" 
                className="form-input" 
                placeholder="e.g. Mumbai, Bengaluru"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <input 
                type="text" 
                name="state" 
                className="form-input" 
                placeholder="e.g. Maharashtra, Karnataka"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">PIN Code</label>
              <input 
                type="text" 
                name="zipCode" 
                className="form-input" 
                placeholder="e.g. 400050"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {formData.city && (
            <div style={{ marginTop: '0.25rem', marginBottom: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${formData.address || ''} ${formData.city} ${formData.state} India`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.825rem' }}
              >
                <MapPin size={14} color="var(--primary)" />
                <span>Verify on Google Maps</span>
              </a>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${formData.address || ''} ${formData.city} ${formData.state} India`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.825rem' }}
              >
                <span>🧭 Test Directions</span>
              </a>
            </div>
          )}

          {/* Section 3: Specifications */}
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Home size={20} color="var(--primary)" /> 3. Specifications
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Bedrooms</label>
              <input 
                type="number" 
                name="bedrooms" 
                min="0"
                className="form-input" 
                value={formData.bedrooms}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bathrooms</label>
              <input 
                type="number" 
                name="bathrooms" 
                min="0"
                step="0.5"
                className="form-input" 
                value={formData.bathrooms}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Area (Sq Ft)</label>
              <input 
                type="number" 
                name="area" 
                min="100"
                className="form-input" 
                value={formData.area}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Garages</label>
              <input 
                type="number" 
                name="parking" 
                min="0"
                className="form-input" 
                value={formData.parking}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Year Built</label>
              <input 
                type="number" 
                name="yearBuilt" 
                min="1900"
                max="2030"
                className="form-input" 
                value={formData.yearBuilt}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Section 4: Amenities */}
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            4. Features & Amenities
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
            {AVAILABLE_AMENITIES.map(amenity => {
              const checked = selectedAmenities.includes(amenity);
              return (
                <div 
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.65rem 0.9rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${checked ? 'var(--primary)' : 'var(--border-color)'}`,
                    background: checked ? 'var(--primary-light)' : 'var(--bg-main)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: `2px solid ${checked ? 'var(--primary)' : 'var(--navy-500)'}`,
                    background: checked ? 'var(--primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    {checked && <Check size={14} />}
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--navy-800)' }}>
                    {amenity}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Section 5: Property Images */}
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Upload size={20} color="var(--primary)" /> 5. High-Resolution Photographs
          </h3>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--navy-600)', marginBottom: '0.75rem' }}>
              Add photo URLs or click quick presets below:
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input 
                type="url" 
                className="form-input" 
                placeholder="https://images.unsplash.com/photo-..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleAddImageUrl}
              >
                <Plus size={16} /> Add Image
              </button>
            </div>

            {/* Quick Presets */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--navy-500)', alignSelf: 'center' }}>Quick Presets:</span>
              {PRESET_IMAGES.map((img, i) => (
                <button
                  type="button"
                  key={i}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                  onClick={() => {
                    if (!imageUrls.includes(img)) {
                      setImageUrls(prev => [...prev, img]);
                    }
                  }}
                >
                  + Sample Photo {i + 1}
                </button>
              ))}
            </div>

            {/* Image Preview Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
              {imageUrls.map((url, index) => (
                <div key={index} style={{ position: 'relative', height: '90px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img src={url} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    type="button" 
                    onClick={() => handleRemoveImage(index)}
                    style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(239, 68, 68, 0.9)', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Actions */}
          <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              disabled={loading}
            >
              <Building2 size={18} />
              <span>{loading ? 'Submitting Property...' : 'Publish Property Listing'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


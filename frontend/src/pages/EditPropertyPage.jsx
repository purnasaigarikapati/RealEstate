import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Upload, Plus, Trash2, MapPin } from 'lucide-react';
import { api } from '../services/api';
import { useProperties } from '../context/PropertyContext';
import { PROPERTY_TYPES } from '../data/mockData';

export default function EditPropertyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast, fetchProperties } = useProperties();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    purpose: 'sale',
    propertyType: 'House',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    parking: 2,
    yearBuilt: 2022
  });
  const [imageUrls, setImageUrls] = useState([]);
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    async function fetchProp() {
      try {
        const res = await api.getPropertyById(id);
        const p = res.property;
        setFormData({
          title: p.title || '',
          description: p.description || '',
          price: p.price || '',
          purpose: p.purpose || 'sale',
          propertyType: p.propertyType || 'House',
          address: p.address || '',
          city: p.city || '',
          state: p.state || '',
          zipCode: p.zipCode || '',
          bedrooms: p.bedrooms || 0,
          bathrooms: p.bathrooms || 0,
          area: p.area || 0,
          parking: p.parking || 0,
          yearBuilt: p.yearBuilt || 2020
        });
        setImageUrls(p.images || []);
      } catch (err) {
        showToast('Property not found', 'error');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    }
    fetchProp();
  }, [id, navigate, showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateProperty(id, {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        images: imageUrls
      });
      showToast('Property updated successfully!', 'success');
      fetchProperties();
      navigate('/dashboard');
    } catch (err) {
      showToast(err.message || 'Failed to update property', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <p>Loading property details...</p>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container" style={{ maxWidth: '850px' }}>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="btn btn-outline btn-sm"
          style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '2rem' }}>
          Edit Property Listing
        </h1>

        <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <div className="form-group">
            <label className="form-label">Property Title</label>
            <input 
              type="text" 
              name="title" 
              className="form-input" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Purpose</label>
              <select name="purpose" className="form-select" value={formData.purpose} onChange={handleChange}>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select name="propertyType" className="form-select" value={formData.propertyType} onChange={handleChange}>
                {PROPERTY_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Price (INR ₹)</label>
              <input 
                type="number" 
                name="price" 
                className="form-input" 
                value={formData.price} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              name="description" 
              className="form-textarea" 
              value={formData.description} 
              onChange={handleChange} 
              rows={4} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input 
                type="text" 
                name="address" 
                className="form-input" 
                value={formData.address} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input 
                type="text" 
                name="city" 
                className="form-input" 
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
                value={formData.state} 
                onChange={handleChange} 
              />
            </div>
          </div>

          {formData.city && (
            <div style={{ marginTop: '-0.5rem', marginBottom: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
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
                <span>🧭 Get Directions</span>
              </a>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Bedrooms</label>
              <input 
                type="number" 
                name="bedrooms" 
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
                className="form-input" 
                value={formData.area} 
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* Images Section */}
          <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
            <label className="form-label">Property Photos</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input 
                type="url" 
                placeholder="Image URL" 
                className="form-input" 
                value={newImage} 
                onChange={(e) => setNewImage(e.target.value)} 
              />
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => {
                  if (newImage.trim()) {
                    setImageUrls(prev => [...prev, newImage.trim()]);
                    setNewImage('');
                  }
                }}
              >
                <Plus size={16} /> Add
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.75rem' }}>
              {imageUrls.map((url, i) => (
                <div key={i} style={{ position: 'relative', height: '80px', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <img src={url} alt={`Photo ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    type="button" 
                    onClick={() => setImageUrls(prev => prev.filter((_, idx) => idx !== i))}
                    style={{ position: 'absolute', top: 2, right: 2, background: 'red', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              <Save size={16} />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


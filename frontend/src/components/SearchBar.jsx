import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, DollarSign, Bed } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { PROPERTY_TYPES } from '../data/mockData';

export default function SearchBar({ initialValues = {}, onSearch = null }) {
  const navigate = useNavigate();
  const { updateFilters } = useProperties();

  const [purpose, setPurpose] = useState(initialValues.purpose || 'all');
  const [keyword, setKeyword] = useState(initialValues.keyword || '');
  const [propertyType, setPropertyType] = useState(initialValues.propertyType || 'all');
  const [priceRange, setPriceRange] = useState(initialValues.priceRange || 'all');
  const [bedrooms, setBedrooms] = useState(initialValues.bedrooms || 'any');

  const handleSubmit = (e) => {
    e.preventDefault();

    let minPrice = '';
    let maxPrice = '';
    if (priceRange === 'under-1cr') {
      maxPrice = '10000000';
    } else if (priceRange === '1cr-5cr') {
      minPrice = '10000000';
      maxPrice = '50000000';
    } else if (priceRange === 'above-5cr') {
      minPrice = '50000000';
    } else if (priceRange === 'under-50k') {
      maxPrice = '50000';
    } else if (priceRange === '50k-150k') {
      minPrice = '50000';
      maxPrice = '150000';
    } else if (priceRange === 'above-150k') {
      minPrice = '150000';
    }

    const queryParams = {
      purpose,
      keyword,
      propertyType,
      bedrooms,
      minPrice,
      maxPrice
    };

    if (onSearch) {
      onSearch(queryParams);
    } else {
      updateFilters(queryParams);
      const params = new URLSearchParams();
      if (purpose && purpose !== 'all') params.append('purpose', purpose);
      if (keyword) params.append('keyword', keyword);
      if (propertyType && propertyType !== 'all') params.append('propertyType', propertyType);
      if (bedrooms && bedrooms !== 'any') params.append('bedrooms', bedrooms);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);

      navigate(`/properties?${params.toString()}`);
    }
  };

  return (
    <div className="search-bar-container">
      {/* Purpose Tabs */}
      <div className="search-tabs">
        <button 
          type="button"
          className={`search-tab-btn ${purpose === 'all' ? 'active' : ''}`}
          onClick={() => setPurpose('all')}
        >
          All Listings
        </button>
        <button 
          type="button"
          className={`search-tab-btn ${purpose === 'sale' ? 'active' : ''}`}
          onClick={() => setPurpose('sale')}
        >
          Buy Property
        </button>
        <button 
          type="button"
          className={`search-tab-btn ${purpose === 'rent' ? 'active' : ''}`}
          onClick={() => setPurpose('rent')}
        >
          Rent Property
        </button>
      </div>

      <form onSubmit={handleSubmit} className="search-form-grid">
        {/* Location / Keyword */}
        <div className="search-field">
          <label>
            <MapPin size={14} /> Location / Keyword
          </label>
          <div className="search-input-box">
            <input 
              type="text" 
              placeholder="e.g. Mumbai, Bengaluru, Bandra, Villa" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="search-field">
          <label>
            <Home size={14} /> Property Type
          </label>
          <div className="search-input-box">
            <select 
              value={propertyType} 
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="all">All Categories</option>
              {PROPERTY_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="search-field">
          <label>
            <span style={{ fontWeight: 800 }}>₹</span> Price Range
          </label>
          <div className="search-input-box">
            <select 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="all">Any Price</option>
              {purpose === 'rent' ? (
                <>
                  <option value="under-50k">Under ₹50,000 / mo</option>
                  <option value="50k-150k">₹50,000 - ₹1.5 Lakh / mo</option>
                  <option value="above-150k">Above ₹1.5 Lakh / mo</option>
                </>
              ) : (
                <>
                  <option value="under-1cr">Under ₹1 Crore</option>
                  <option value="1cr-5cr">₹1 Crore - ₹5 Crore</option>
                  <option value="above-5cr">Above ₹5 Crore</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="btn btn-primary" style={{ height: '48px', width: '100%' }}>
            <Search size={18} />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
}


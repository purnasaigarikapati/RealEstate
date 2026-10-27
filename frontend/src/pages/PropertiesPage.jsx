import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Home, 
  Bed, 
  DollarSign, 
  Building 
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { useProperties } from '../context/PropertyContext';
import { PROPERTY_TYPES } from '../data/mockData';

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties, loading, fetchProperties } = useProperties();

  // Local filter states initialized from URL params
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [purpose, setPurpose] = useState(searchParams.get('purpose') || 'all');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || 'all');
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || 'any');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

  // Trigger search on filter changes
  useEffect(() => {
    const activeFilters = {
      keyword,
      purpose,
      propertyType,
      bedrooms,
      minPrice,
      maxPrice,
      sort
    };
    fetchProperties(activeFilters);
  }, [keyword, purpose, propertyType, bedrooms, minPrice, maxPrice, sort, fetchProperties]);

  // Sync state if URL query params change (e.g. clicking 'Buy' or 'Rent' in navbar)
  useEffect(() => {
    const urlPurpose = searchParams.get('purpose');
    if (urlPurpose && urlPurpose !== purpose) {
      setPurpose(urlPurpose);
    }
    const urlKeyword = searchParams.get('keyword');
    if (urlKeyword !== null && urlKeyword !== keyword) {
      setKeyword(urlKeyword);
    }
    const urlType = searchParams.get('propertyType');
    if (urlType !== null && urlType !== propertyType) {
      setPropertyType(urlType);
    }
  }, [searchParams]);

  const handleResetFilters = () => {
    setKeyword('');
    setPurpose('all');
    setPropertyType('all');
    setBedrooms('any');
    setMinPrice('');
    setMaxPrice('');
    setSort('newest');
    setSearchParams({});
  };

  return (
    <div className="section-padding">
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-badge">Real Estate Directory</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            {purpose === 'sale' ? 'Properties for Sale' : purpose === 'rent' ? 'Properties for Rent' : 'All Available Properties'}
          </h1>
          <p style={{ color: 'var(--navy-500)', fontSize: '1.05rem' }}>
            Browse through our verified portfolio of luxury estates, penthouses, and apartments.
          </p>
        </div>

        {/* Filter Toolbar Container */}
        <div className="filter-card" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
            {/* Keyword Search */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Search size={14} /> Keyword / City
              </label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search city, title, address..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            {/* Purpose */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Purpose</label>
              <select 
                className="form-select"
                value={purpose}
                onChange={(e) => {
                  setPurpose(e.target.value);
                  setSearchParams(prev => {
                    const p = new URLSearchParams(prev);
                    if (e.target.value === 'all') p.delete('purpose');
                    else p.set('purpose', e.target.value);
                    return p;
                  });
                }}
              >
                <option value="all">All (Buy & Rent)</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Property Type</label>
              <select 
                className="form-select"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="all">All Types</option>
                {PROPERTY_TYPES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Bedrooms</label>
              <select 
                className="form-select"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              >
                <option value="any">Any Bedrooms</option>
                <option value="1">1+ Bedrooms</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>

            {/* Min Price */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Min Price (₹)</label>
              <input 
                type="number" 
                className="form-input" 
                placeholder="Min INR"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            {/* Max Price */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Max Price (₹)</label>
              <input 
                type="number" 
                className="form-input" 
                placeholder="Max INR"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Sub Toolbar: Sort & Reset */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--navy-600)', fontWeight: 600 }}>Sort By:</span>
              <select 
                className="form-select" 
                style={{ width: 'auto', padding: '0.45rem 1rem', fontSize: '0.875rem' }}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest Listed</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Size: Largest Area</option>
              </select>
            </div>

            <button 
              onClick={handleResetFilters}
              className="btn btn-outline btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <RotateCcw size={14} />
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>

        {/* Results Count Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <p style={{ fontWeight: 600, color: 'var(--navy-700)', fontSize: '0.95rem' }}>
            Showing <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{properties.length}</span> matching {properties.length === 1 ? 'property' : 'properties'}
          </p>
        </div>

        {/* Property Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--navy-500)' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Updating search results...</p>
          </div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <Home size={48} color="var(--navy-500)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No properties found</h3>
            <p style={{ color: 'var(--navy-500)', maxWidth: '450px', margin: '0 auto 1.5rem auto' }}>
              No active listings match your current search filters. Try adjusting your price parameters or clearing filters.
            </p>
            <button onClick={handleResetFilters} className="btn btn-primary">
              <RotateCcw size={16} /> Clear All Filters
            </button>
          </div>
        ) : (
          <div className="property-grid">
            {properties.map(property => (
              <PropertyCard key={property._id || property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


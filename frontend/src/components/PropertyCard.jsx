import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Heart, ArrowUpRight, Navigation } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import { formatINR } from '../utils/formatters';

export default function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite, isAuthenticated } = useAuth();
  const { showToast } = useProperties();

  if (!property) return null;

  const propId = property._id || property.id;
  const isFav = isFavorite(propId);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(propId);
    showToast(
      isFav ? 'Removed property from saved favorites' : 'Saved property to your favorites!',
      'success'
    );
  };

  const formattedPrice = formatINR(property.price, true);

  const mainImage = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="property-card">
      {/* Top Image & Overlays */}
      <div className="property-image-wrap">
        <Link to={`/properties/${propId}`}>
          <img 
            src={mainImage} 
            alt={property.title} 
            className="property-image"
            loading="lazy"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="property-badges-overlay">
          <span className={`badge ${property.purpose === 'rent' ? 'badge-rent' : 'badge-sale'}`}>
            {property.purpose === 'rent' ? 'For Rent' : 'For Sale'}
          </span>
          {property.featured && (
            <span className="badge badge-featured">
              ★ Featured
            </span>
          )}
          {property.status && property.status !== 'approved' && (
            <span className={`badge badge-${property.status}`}>
              {property.status.toUpperCase()}
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button 
          className={`property-fav-btn ${isFav ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          title={isFav ? "Remove from favorites" : "Save to favorites"}
          aria-label="Save property"
        >
          <Heart size={18} fill={isFav ? "currentColor" : "none"} />
        </button>

        {/* Price Tag */}
        <div className="property-price-tag">
          {formattedPrice}
          {property.purpose === 'rent' && <span>/mo</span>}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="property-body">
        <div className="property-location">
          <MapPin size={14} color="var(--primary)" />
          <span>{property.address}, {property.city}, {property.state}</span>
        </div>

        <Link to={`/properties/${propId}`}>
          <h3 className="property-title" title={property.title}>
            {property.title}
          </h3>
        </Link>

        {/* Key Features Specs */}
        <div className="property-features">
          <div className="feature-item" title="Bedrooms">
            <Bed size={16} />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="feature-item" title="Bathrooms">
            <Bath size={16} />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="feature-item" title="Living Area">
            <Square size={16} />
            <span>{property.area?.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Card Footer */}
        <div className="property-footer">
          <div className="property-agent">
            <img 
              src={property.owner?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"} 
              alt={property.owner?.name || "Agent"} 
            />
            <span>{property.owner?.name || "Verified Agent"}</span>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${property.address}, ${property.city}, ${property.state || ''}, India`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
              style={{ width: '32px', height: '32px' }}
              title="Get Directions on Google Maps"
              onClick={(e) => e.stopPropagation()}
            >
              <Navigation size={14} color="var(--primary)" />
            </a>
            <Link to={`/properties/${propId}`} className="btn btn-outline btn-sm">
              <span>Details</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


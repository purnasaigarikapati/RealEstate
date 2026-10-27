import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Car, 
  Heart, 
  Share2, 
  Check, 
  Phone, 
  Mail, 
  Send, 
  ShieldCheck, 
  ArrowLeft,
  ChevronRight,
  Navigation,
  ExternalLink,
  Compass,
  ShoppingBag,
  X,
  CheckCircle2,
  CreditCard,
  Lock,
  Building2
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import { formatINR } from '../utils/formatters';
import PropertyCard from '../components/PropertyCard';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isFavorite, toggleFavorite, isAuthenticated } = useAuth();
  const { showToast, properties } = useProperties();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Buy / Booking Modal States
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyerPhone, setBuyerPhone] = useState(user?.phone || '+91 98765 43210');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [buyerNotes, setBuyerNotes] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [submittingPurchase, setSubmittingPurchase] = useState(false);
  const [confirmedPurchase, setConfirmedPurchase] = useState(null);

  // Enquiry Form State
  const [enquiryName, setEnquiryName] = useState(user?.name || '');
  const [enquiryEmail, setEnquiryEmail] = useState(user?.email || '');
  const [enquiryPhone, setEnquiryPhone] = useState(user?.phone || '');
  const [enquiryMessage, setEnquiryMessage] = useState('Hello, I am interested in learning more about this property. Please contact me with tour availability and full disclosure documentation.');
  const [submittingEnquiry, setSubmittingEnquiry] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  useEffect(() => {
    async function loadProperty() {
      setLoading(true);
      try {
        const res = await api.getPropertyById(id);
        setProperty(res.property);
        setActiveImageIndex(0);
      } catch (err) {
        showToast('Property not found', 'error');
        navigate('/properties');
      } finally {
        setLoading(false);
      }
    }
    loadProperty();
  }, [id, navigate, showToast]);

  // Update enquiry form if user logs in while on page
  useEffect(() => {
    if (user) {
      if (!enquiryName) setEnquiryName(user.name);
      if (!enquiryEmail) setEnquiryEmail(user.email);
      if (!enquiryPhone && user.phone) setEnquiryPhone(user.phone);
    }
  }, [user]);

  if (loading || !property) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--navy-600)' }}>Loading property information...</p>
      </div>
    );
  }

  const propId = property._id || property.id;
  const isFav = isFavorite(propId);

  const formattedPrice = formatINR(property.price);

  const mapAddress = `${property.address}, ${property.city}, ${property.state || ''}, India`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapAddress)}`;
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddress)}`;
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const images = property.images && property.images.length > 0 ? property.images : [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  ];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link copied to clipboard!', 'success');
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!enquiryName || !enquiryEmail || !enquiryMessage) {
      showToast('Please fill in required enquiry fields', 'error');
      return;
    }
    setSubmittingEnquiry(true);
    try {
      await api.sendEnquiry({
        propertyId: propId,
        propertyTitle: property.title,
        propertyPrice: property.price,
        name: enquiryName,
        email: enquiryEmail,
        phone: enquiryPhone,
        message: enquiryMessage
      });
      setEnquirySuccess(true);
      showToast('Your enquiry was sent successfully to the listing agent!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to submit enquiry', 'error');
    } finally {
      setSubmittingEnquiry(false);
    }
  };

  const handleBuyClick = () => {
    if (!isAuthenticated) {
      showToast('Please sign in to buy or book this property.', 'error');
      navigate('/login', {
        state: {
          from: location,
          alertMessage: `Please sign in or create an account to proceed with purchasing "${property.title}".`
        }
      });
      return;
    }
    setConfirmedPurchase(null);
    setShowBuyModal(true);
  };

  const handleConfirmPurchase = async (e) => {
    e.preventDefault();
    if (!agreedTerms) {
      showToast('Please agree to the purchase & escrow verification terms.', 'error');
      return;
    }

    setSubmittingPurchase(true);
    try {
      const tokenAdvance = property.purpose === 'rent'
        ? Number(property.price) // 1 month security deposit for rent
        : Math.round(Number(property.price) * 0.02); // 2% token advance for purchase

      const res = await api.createPurchase({
        propertyId: propId,
        propertyTitle: property.title,
        propertyPrice: property.price,
        propertyLocation: `${property.address}, ${property.city}, ${property.state}`,
        propertyImage: images[0],
        userName: user?.name,
        userEmail: user?.email,
        userPhone: buyerPhone,
        paymentMethod,
        tokenAmount: tokenAdvance,
        notes: buyerNotes || 'Direct buy order confirmed via EstateHub Platform.'
      });

      setConfirmedPurchase(res.purchase);
      showToast('Congratulations! Your property purchase has been confirmed.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to complete purchase', 'error');
    } finally {
      setSubmittingPurchase(false);
    }
  };

  // Similar properties (same property type or purpose)
  const similarProperties = properties
    .filter(p => (p._id || p.id) !== propId && (p.propertyType === property.propertyType || p.purpose === property.purpose))
    .slice(0, 3);

  return (
    <div className="section-padding">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--navy-500)', marginBottom: '1.5rem' }}>
          <Link to="/" style={{ color: 'var(--navy-600)' }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/properties" style={{ color: 'var(--navy-600)' }}>Properties</Link>
          <ChevronRight size={14} />
          <span style={{ color: 'var(--navy-900)', fontWeight: 600 }}>{property.title}</span>
        </div>

        {/* Title & Action Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className={`badge ${property.purpose === 'rent' ? 'badge-rent' : 'badge-sale'}`}>
                {property.purpose === 'rent' ? 'For Rent' : 'For Sale'}
              </span>
              <span className="badge badge-featured">
                {property.propertyType}
              </span>
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--navy-900)' }}>
              {property.title}
            </h1>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--navy-500)', fontSize: '1rem' }}>
              <MapPin size={18} color="var(--primary)" />
              <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--navy-900)', fontFamily: 'var(--font-heading)' }}>
              {formattedPrice}
              {property.purpose === 'rent' && <span style={{ fontSize: '1rem', color: 'var(--navy-500)', fontWeight: 500 }}> / month</span>}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={handleBuyClick}
                className="btn btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 14px rgba(5, 150, 105, 0.35)',
                  padding: '0.55rem 1.25rem'
                }}
              >
                <ShoppingBag size={17} />
                <span>{property.purpose === 'rent' ? 'Rent Now' : 'Buy Property'}</span>
              </button>
              <button 
                onClick={() => {
                  toggleFavorite(propId);
                  showToast(isFav ? 'Removed from favorites' : 'Saved to favorites!', 'success');
                }}
                className={`btn btn-outline btn-sm ${isFav ? 'btn-danger' : ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Heart size={16} fill={isFav ? "currentColor" : "none"} />
                <span>{isFav ? 'Saved' : 'Save'}</span>
              </button>
              <button 
                onClick={handleShare}
                className="btn btn-outline btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="gallery-main">
            <img 
              src={images[activeImageIndex]} 
              alt={`${property.title} - View ${activeImageIndex + 1}`} 
            />
          </div>

          {images.length > 1 && (
            <div className="gallery-thumbs">
              {images.map((img, idx) => (
                <div 
                  key={idx}
                  className={`gallery-thumb-item ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Content Layout: Left Details, Right Enquiry Box */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'flex-start' }}>
          {/* LEFT COLUMN */}
          <div>
            {/* Quick Specs Grid */}
            <div style={{ 
              background: 'white', 
              borderRadius: 'var(--radius-lg)', 
              padding: '1.75rem', 
              border: '1px solid var(--border-color)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <Bed size={24} color="var(--primary)" style={{ margin: '0 auto 0.4rem auto' }} />
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{property.bedrooms}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--navy-500)', textTransform: 'uppercase' }}>Bedrooms</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Bath size={24} color="var(--primary)" style={{ margin: '0 auto 0.4rem auto' }} />
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{property.bathrooms}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--navy-500)', textTransform: 'uppercase' }}>Bathrooms</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Square size={24} color="var(--primary)" style={{ margin: '0 auto 0.4rem auto' }} />
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{property.area?.toLocaleString()}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--navy-500)', textTransform: 'uppercase' }}>Sq Ft</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Car size={24} color="var(--primary)" style={{ margin: '0 auto 0.4rem auto' }} />
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{property.parking || 2}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--navy-500)', textTransform: 'uppercase' }}>Garages</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Calendar size={24} color="var(--primary)" style={{ margin: '0 auto 0.4rem auto' }} />
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{property.yearBuilt || 2022}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--navy-500)', textTransform: 'uppercase' }}>Year Built</div>
              </div>
            </div>

            {/* Description Section */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border-color)', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 700 }}>About This Property</h3>
              <p style={{ color: 'var(--navy-700)', lineHeight: '1.8', fontSize: '1.025rem', whiteSpace: 'pre-line' }}>
                {property.description}
              </p>
            </div>

            {/* Amenities Section */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border-color)', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontWeight: 700 }}>Premium Amenities & Features</h3>
              <div className="amenities-grid">
                {(property.amenities || [
                  'Swimming Pool', 'Smart Home Integration', 'High Speed Internet', 
                  'Central Air Conditioning', 'Security Surveillance', 'Balcony Deck'
                ]).map((amenity, idx) => (
                  <div key={idx} className="amenity-pill">
                    <Check size={18} />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Interactive Google Map Section */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--border-color)', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '0.35rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={22} color="var(--primary)" /> Location & Live Google Map
                  </h3>
                  <p style={{ color: 'var(--navy-600)', fontSize: '0.975rem' }}>
                    {property.address}, {property.city}, {property.state} {property.zipCode ? `- ${property.zipCode}` : ''}, India
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a 
                    href={googleMapsDirectionsUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
                  >
                    <Navigation size={16} />
                    <span>Get Directions</span>
                  </a>

                  <a 
                    href={googleMapsSearchUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}
                  >
                    <ExternalLink size={16} />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Embedded Live Google Map */}
              <div style={{
                width: '100%',
                height: '380px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '1.5rem',
                background: '#f1f5f9'
              }}>
                <iframe
                  title={`Google Map - ${property.title}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={googleMapsEmbedUrl}
                />
              </div>

              {/* Nearby Locality & Transit Connectivity */}
              <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--navy-900)' }}>
                  📍 Strategic Connectivity & Landmarks:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--navy-700)' }}>
                  <div>🚇 <strong>Metro / Railway:</strong> 5-10 mins connectivity</div>
                  <div>✈️ <strong>International Airport:</strong> 25-35 mins drive</div>
                  <div>🏥 <strong>Top Healthcare:</strong> Within 3 km radius</div>
                  <div>🏫 <strong>CBSE / IB Schools:</strong> Within 2 km radius</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: INSTANT BUY / BOOKING CARD & AGENT ENQUIRY */}
          <div style={{ position: 'sticky', top: '100px' }}>
            {/* Instant Buy / Booking Card */}
            <div style={{
              background: 'linear-gradient(135deg, #0f172a, #1e293b)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              color: 'white',
              marginBottom: '1.5rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  ⚡ Direct Online Purchase
                </span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600 }}>
                  RERA Escrow
                </span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '0.35rem' }}>
                {formattedPrice}
                {property.purpose === 'rent' && <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}> / mo</span>}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                {property.purpose === 'rent'
                  ? 'Reserve this rental property today with a 1-month refundable security deposit token.'
                  : 'Lock this property today with a 2% refundable token advance under EstateHub Escrow Protection.'}
              </p>

              <button
                onClick={handleBuyClick}
                className="btn btn-primary btn-lg"
                style={{
                  width: '100%',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 6px 18px rgba(5, 150, 105, 0.4)'
                }}
              >
                <ShoppingBag size={20} />
                <span>{property.purpose === 'rent' ? 'Rent This Property' : 'Buy This Property'}</span>
              </button>

              {!isAuthenticated && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', marginTop: '0.75rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <Lock size={12} />
                  <span>Login required to purchase or book</span>
                </div>
              )}
            </div>

            {/* Agent Profile Card */}
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.75rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <img 
                  src={property.owner?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"} 
                  alt={property.owner?.name || "Agent"} 
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{property.owner?.name || "Priya Sharma"}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--navy-500)' }}>Senior Certified Real Estate Advisor</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.35rem', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                    <ShieldCheck size={16} /> Verified EstateHub Broker
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--navy-700)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} color="var(--primary)" />
                  <span>{property.owner?.phone || "+91 98200 45678"}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} color="var(--primary)" />
                  <span>{property.owner?.email || "concierge@estatehub.in"}</span>
                </div>
              </div>

              {/* Enquiry Form */}
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--navy-900)' }}>
                Direct Property Enquiry
              </h4>

              {enquirySuccess ? (
                <div style={{ background: 'var(--primary-light)', padding: '1.25rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>Enquiry Submitted!</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--navy-700)' }}>
                    The listing agent has received your request and will follow up shortly via email or phone.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Your Name"
                      value={enquiryName}
                      onChange={(e) => setEnquiryName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="your.email@example.com"
                      value={enquiryEmail}
                      onChange={(e) => setEnquiryEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      placeholder="+1 (555) 000-0000"
                      value={enquiryPhone}
                      onChange={(e) => setEnquiryPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea 
                      className="form-textarea" 
                      style={{ minHeight: '90px' }}
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%' }}
                    disabled={submittingEnquiry}
                  >
                    <Send size={16} />
                    <span>{submittingEnquiry ? 'Sending Enquiry...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div style={{ marginTop: '5rem', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span className="section-badge">Recommended</span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Similar Properties You May Like</h3>
            </div>
            <div className="property-grid">
              {similarProperties.map(prop => (
                <PropertyCard key={prop._id || prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}

        {/* PURCHASE / BOOKING CONFIRMATION MODAL */}
        {showBuyModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            overflowY: 'auto'
          }}>
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              width: '100%',
              maxWidth: '580px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)',
              padding: '2rem',
              position: 'relative'
            }}>
              {/* Modal Close Button */}
              <button 
                type="button"
                onClick={() => { setShowBuyModal(false); setConfirmedPurchase(null); }}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  color: 'var(--navy-500)',
                  background: 'var(--bg-main)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>

              {confirmedPurchase ? (
                /* SUCCESS CONFIRMATION RECEIPT */
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem auto'
                  }}>
                    <CheckCircle2 size={36} />
                  </div>

                  <span className="badge badge-approved" style={{ marginBottom: '0.5rem' }}>
                    Official Booking Confirmed
                  </span>

                  <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
                    Congratulations, {confirmedPurchase.userName}!
                  </h2>
                  <p style={{ color: 'var(--navy-600)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    Your property acquisition request has been secured under EstateHub Escrow.
                  </p>

                  <div style={{
                    background: 'var(--bg-main)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    textAlign: 'left',
                    marginBottom: '1.5rem',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.9rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                      <span style={{ color: 'var(--navy-500)' }}>Order ID:</span>
                      <strong style={{ color: 'var(--navy-900)', fontFamily: 'monospace' }}>{confirmedPurchase.orderId}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                      <span style={{ color: 'var(--navy-500)' }}>Property:</span>
                      <strong style={{ color: 'var(--navy-900)', maxWidth: '240px', textAlign: 'right' }}>{confirmedPurchase.propertyTitle}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                      <span style={{ color: 'var(--navy-500)' }}>Total Price:</span>
                      <strong style={{ color: 'var(--primary)' }}>{formatINR(confirmedPurchase.propertyPrice)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                      <span style={{ color: 'var(--navy-500)' }}>Token Advance:</span>
                      <strong style={{ color: 'var(--primary)' }}>{formatINR(confirmedPurchase.tokenAmount)}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                      <span style={{ color: 'var(--navy-500)' }}>Payment Mode:</span>
                      <span style={{ fontWeight: 600 }}>{confirmedPurchase.paymentMethod}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--navy-500)' }}>Buyer Contact:</span>
                      <span>{confirmedPurchase.userEmail}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.825rem', color: 'var(--navy-500)', marginBottom: '1.5rem' }}>
                    📄 Our certified conveyancing lawyer will call you at <strong>{confirmedPurchase.userPhone}</strong> within 24 hours to coordinate registry documentation.
                  </p>

                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => { setShowBuyModal(false); navigate('/dashboard'); }}
                      className="btn btn-primary"
                    >
                      <span>View in My Purchases</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowBuyModal(false); setConfirmedPurchase(null); }}
                      className="btn btn-outline"
                    >
                      <span>Close</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* PURCHASE CONFIRMATION FORM */
                <form onSubmit={handleConfirmPurchase}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    <ShoppingBag size={22} color="var(--primary)" />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                      Confirm Property Purchase
                    </h2>
                  </div>
                  <p style={{ color: 'var(--navy-500)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                    Lock this property with a standard 2% token booking advance under RERA escrow terms.
                  </p>

                  {/* Property Summary Pill */}
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    background: 'var(--bg-main)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    marginBottom: '1.5rem'
                  }}>
                    <img 
                      src={images[0]} 
                      alt={property.title} 
                      style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy-900)' }}>{property.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--navy-500)' }}>{property.address}, {property.city}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '0.25rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--navy-600)' }}>Total Price:</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>{formattedPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Token Booking Calculation */}
                  <div style={{
                    background: 'var(--primary-light)',
                    border: '1px solid #a7f3d0',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                        Token Advance Payable Now
                      </span>
                      <p style={{ fontSize: '0.75rem', color: 'var(--navy-600)' }}>100% Refundable within 7-day due diligence</p>
                    </div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                      {formatINR(property.purpose === 'rent' ? property.price : Math.round(property.price * 0.02))}
                    </div>
                  </div>

                  {/* Buyer Details */}
                  <div className="form-group">
                    <label className="form-label">Buyer Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={user?.name || ''} 
                      disabled 
                      style={{ background: '#f8fafc' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Registered Email</label>
                      <input 
                        type="email" 
                        className="form-input" 
                        value={user?.email || ''} 
                        disabled 
                        style={{ background: '#f8fafc' }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Contact Phone *</label>
                      <input 
                        type="tel" 
                        className="form-input" 
                        value={buyerPhone} 
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        required 
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="form-group">
                    <label className="form-label">Select Token Payment Method</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      {[
                        { id: 'UPI', label: '⚡ Instant UPI', desc: 'GPay, PhonePe, Paytm' },
                        { id: 'NetBanking', label: '🏦 Net Banking', desc: 'All Major Indian Banks' },
                        { id: 'BankTransfer', label: '📄 RTGS / NEFT', desc: 'Direct Bank Wire' },
                        { id: 'Cheque', label: '📜 Escrow Cheque', desc: 'Banker Demand Draft' }
                      ].map(m => (
                        <div 
                          key={m.id}
                          onClick={() => setPaymentMethod(m.id)}
                          style={{
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            border: `1.5px solid ${paymentMethod === m.id ? 'var(--primary)' : 'var(--border-color)'}`,
                            background: paymentMethod === m.id ? 'var(--primary-light)' : 'white',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--navy-900)' }}>{m.label}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--navy-500)' }}>{m.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terms checkbox */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--navy-600)' }}>
                    <input 
                      type="checkbox" 
                      id="agreeTerms" 
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      style={{ marginTop: '3px' }}
                    />
                    <label htmlFor="agreeTerms" style={{ cursor: 'pointer' }}>
                      I agree to the property purchase reservation terms and acknowledge that this advance will be held securely in EstateHub Client Escrow.
                    </label>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                    <button 
                      type="button" 
                      className="btn btn-outline" 
                      onClick={() => setShowBuyModal(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={submittingPurchase}
                      style={{ minWidth: '180px' }}
                    >
                      <Check size={18} />
                      <span>{submittingPurchase ? 'Confirming...' : 'Confirm Purchase'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


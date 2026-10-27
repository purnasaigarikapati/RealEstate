import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  HeartHandshake 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="brand-icon">
                <Building2 size={24} />
              </div>
              <div>Estate<span style={{ color: '#10b981' }}>Hub</span></div>
            </Link>
            <p style={{ fontSize: '0.925rem', lineHeight: '1.6', marginBottom: '1.5rem', color: '#94a3b8' }}>
              EstateHub connects high-intent buyers, tenants, and property sellers with premium verified residential and commercial real estate assets globally.
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem' }}>
                <ShieldCheck size={18} color="#10b981" /> Verified Listings
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem' }}>
                <Award size={18} color="#10b981" /> Premium Quality
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home Marketplace</Link></li>
              <li><Link to="/properties?purpose=sale">Homes for Sale</Link></li>
              <li><Link to="/properties?purpose=rent">Homes for Rent</Link></li>
              <li><Link to="/sell">Sell Your Property</Link></li>
              <li><Link to="/about">About Our Company</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
            </ul>
          </div>

          {/* Property Categories */}
          <div>
            <h4 className="footer-title">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/properties?propertyType=Villa">Luxury Villas</Link></li>
              <li><Link to="/properties?propertyType=Penthouse">Skyline Penthouses</Link></li>
              <li><Link to="/properties?propertyType=Apartment">Modern Apartments</Link></li>
              <li><Link to="/properties?propertyType=House">Family Residences</Link></li>
              <li><Link to="/properties?propertyType=Commercial">Commercial Lofts</Link></li>
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div>
            <h4 className="footer-title">Corporate Headquarters</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>EstateHub Towers, Lakshmipuram Main Road, Guntur, Andhra Pradesh 522007</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={18} color="#10b981" style={{ flexShrink: 0 }} />
                <span>+91 1800-572-REALTY / +91 (863) 223-4567</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={18} color="#10b981" style={{ flexShrink: 0 }} />
                <span>concierge@estatehub.in</span>
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <p style={{ color: '#e2e8f0', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                Stay Informed
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    color: 'white',
                    fontSize: '0.85rem',
                    width: '100%'
                  }}
                />
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => alert('Thank you for subscribing to EstateHub Newsletter!')}
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EstateHub Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy policy is standard GDPR compliant.'); }}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of service available upon request.'); }}>Terms of Service</a>
            <a href="#cookies" onClick={(e) => { e.preventDefault(); alert('Cookies are used to maintain session.'); }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


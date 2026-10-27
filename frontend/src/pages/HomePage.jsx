import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Users, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Star, 
  CheckCircle2, 
  Compass 
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { useProperties } from '../context/PropertyContext';
import { POPULAR_LOCATIONS, PROPERTY_TYPES, TESTIMONIALS } from '../data/mockData';

export default function HomePage() {
  const { properties, loading } = useProperties();

  // Featured properties
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);
  // Recently added properties
  const recentProperties = properties.slice(0, 6);

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} color="#34d399" />
              <span>The Premier Global Real Estate Network</span>
            </div>
            <h1 className="hero-title">
              Discover Exceptional <span>Properties</span> Tailored To Your Lifestyle
            </h1>
            <p className="hero-subtitle">
              Browse thousands of verified luxury homes, skyline penthouses, beachfront villas, and investment opportunities with zero hidden fees.
            </p>

            {/* Quick Hero Search */}
            <SearchBar />
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <div className="container">
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">1,250<span>+</span></div>
            <div className="stat-label">Verified Active Listings</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">980<span>+</span></div>
            <div className="stat-label">Successful Transactions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">45<span>+</span></div>
            <div className="stat-label">Global Metropolitan Cities</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.4<span>%</span></div>
            <div className="stat-label">Client Satisfaction Score</div>
          </div>
        </div>
      </div>

      {/* 3. FEATURED PROPERTIES */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Curated Selection</span>
            <h2 className="section-title">Featured Properties</h2>
            <p className="section-subtitle">
              Hand-selected premier residential and waterfront properties chosen for architectural excellence and prestigious locations.
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--navy-500)' }}>
              Loading featured properties...
            </div>
          ) : (
            <div className="property-grid">
              {featuredProperties.map(property => (
                <PropertyCard key={property._id || property.id} property={property} />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/properties" className="btn btn-secondary btn-lg">
              <span>Explore All Listings</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. POPULAR LOCATIONS */}
      <section className="section-padding" style={{ background: '#ffffff', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Explore By Destination</span>
            <h2 className="section-title">Popular Metropolitan Markets</h2>
            <p className="section-subtitle">
              Search exclusive homes in the world's most sought-after coastal and cultural destinations.
            </p>
          </div>

          <div className="location-grid">
            {POPULAR_LOCATIONS.map(loc => (
              <Link 
                key={loc.name} 
                to={`/properties?keyword=${encodeURIComponent(loc.name)}`}
                className="location-card"
              >
                <img src={loc.image} alt={loc.name} />
                <div className="location-overlay">
                  <h3 className="location-name">{loc.name}</h3>
                  <p className="location-count">{loc.count}+ Prime Properties • {loc.state}</p>
                  <div style={{ marginTop: '0.4rem', display: 'flex', gap: '0.5rem' }}>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${loc.name}, ${loc.state}, India`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.25)',
                        backdropFilter: 'blur(4px)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '9999px',
                        color: 'white',
                        fontWeight: 600,
                        border: '1px solid rgba(255, 255, 255, 0.4)'
                      }}
                      onClick={(e) => e.stopPropagation()}
                      title="Get Directions on Google Maps"
                    >
                      📍 Get Directions
                    </a>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROPERTY CATEGORIES */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Property Categories</span>
            <h2 className="section-title">Diverse Architecture for Every Vision</h2>
            <p className="section-subtitle">
              From modern urban lofts to waterfront architectural marvels, explore our tailored categories.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {PROPERTY_TYPES.map(type => (
              <Link 
                key={type} 
                to={`/properties?propertyType=${type}`}
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem 1.25rem',
                  textAlign: 'center',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-normal)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                }}
              >
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}>
                  <Building2 size={26} />
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem' }}>{type}</h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--navy-500)' }}>View available listings</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RECENTLY ADDED PROPERTIES */}
      <section className="section-padding" style={{ background: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-badge">Fresh Market Arrivals</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Latest Property Listings</h2>
            </div>
            <Link to="/properties" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>View All Properties</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="property-grid">
            {recentProperties.map(property => (
              <PropertyCard key={property._id || property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE ESTATEHUB */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">The EstateHub Advantage</span>
            <h2 className="section-title">Why Discerning Clients Trust Us</h2>
            <p className="section-subtitle">
              We merge architectural rigor, verified licensing, and digital efficiency for an effortless real estate journey.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <ShieldCheck size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>100% Verified Listings</h3>
              <p style={{ color: 'var(--navy-600)', fontSize: '0.925rem' }}>
                Every single property, deed documentation, and agent credential is authenticated by our moderation team before publication.
              </p>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Award size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Transparent Escrow & Pricing</h3>
              <p style={{ color: 'var(--navy-600)', fontSize: '0.925rem' }}>
                No surprise markups or undisclosed agency fees. What you see on our listing cards reflects real appraised values.
              </p>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Users size={26} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>Elite Agent Network</h3>
              <p style={{ color: 'var(--navy-600)', fontSize: '0.925rem' }}>
                Connect directly with certified property advisors who possess deep neighborhood-level intelligence and negotiation leverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="section-padding" style={{ background: '#ffffff', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Client Stories</span>
            <h2 className="section-title">Endorsed By Industry Leaders</h2>
            <p className="section-subtitle">
              Read how homeowners, investors, and tenants navigated their property searches with EstateHub.
            </p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="testimonial-quote">"{t.comment}"</p>
                <div className="testimonial-user">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{t.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--navy-500)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CALL TO ACTION BANNER */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy-900), #1e293b)', color: 'white', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '750px' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem', fontWeight: 800 }}>
            Ready to List or Find Your Dream Property?
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '2.5rem' }}>
            Join thousands of satisfied homeowners and investors. Create a free account today to list properties or save your favorites.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/sell" className="btn btn-primary btn-lg">
              <Building2 size={18} />
              <span>List Your Property</span>
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg" style={{ background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
              <span>Speak with an Advisor</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


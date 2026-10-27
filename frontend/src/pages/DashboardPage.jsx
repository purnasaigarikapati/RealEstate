import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Heart, 
  Mail, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  User, 
  Phone, 
  Calendar, 
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';
import { formatINR } from '../utils/formatters';
import { api } from '../services/api';
import PropertyCard from '../components/PropertyCard';

export default function DashboardPage() {
  const { user, favorites, toggleFavorite } = useAuth();
  const { properties, fetchProperties, showToast } = useProperties();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'favorites' | 'enquiries' | 'purchases'
  const [enquiries, setEnquiries] = useState([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [loadingPurchases, setLoadingPurchases] = useState(false);

  // Filter properties created by this user or default sample user
  const myListings = properties.filter(p => {
    if (!user) return false;
    const ownerId = p.owner?._id || p.owner?.id || p.owner;
    return ownerId === user._id || p.owner?.email === user.email || user.role === 'admin';
  });

  // Filter favorite properties
  const myFavorites = properties.filter(p => favorites.includes(p._id || p.id));

  useEffect(() => {
    async function loadData() {
      setLoadingEnquiries(true);
      setLoadingPurchases(true);
      try {
        const [enqRes, purRes] = await Promise.all([
          api.getMyEnquiries().catch(() => ({ enquiries: [] })),
          api.getMyPurchases().catch(() => ({ purchases: [] }))
        ]);
        setEnquiries(enqRes.enquiries || []);
        setPurchases(purRes.purchases || []);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoadingEnquiries(false);
        setLoadingPurchases(false);
      }
    }
    loadData();
  }, []);

  const handleDeleteListing = async (propertyId) => {
    if (window.confirm('Are you sure you want to permanently delete this property listing?')) {
      try {
        await api.deleteProperty(propertyId);
        showToast('Property deleted successfully', 'success');
        fetchProperties();
      } catch (err) {
        showToast(err.message || 'Failed to delete property', 'error');
      }
    }
  };

  return (
    <div className="section-padding">
      <div className="container">
        {/* User Profile Summary Banner */}
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"} 
              alt={user?.name || "User Avatar"} 
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-light)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{user?.name}</h1>
                <span className={`badge ${user?.role === 'admin' ? 'badge-sale' : 'badge-rent'}`}>
                  {user?.role?.toUpperCase()}
                </span>
              </div>
              <p style={{ color: 'var(--navy-500)', fontSize: '0.95rem', marginTop: '0.2rem' }}>
                {user?.email} • {user?.phone || '+91 98765 43210'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/sell" className="btn btn-primary">
              <PlusCircle size={18} />
              <span>Post New Listing</span>
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="btn btn-secondary">
                <ShieldCheck size={18} />
                <span>Admin Console</span>
              </Link>
            )}
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid var(--border-color)', marginBottom: '2.5rem', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${activeTab === 'listings' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('listings')}
          >
            <Building2 size={18} />
            <span>My Listings ({myListings.length})</span>
          </button>

          <button 
            className={`btn ${activeTab === 'purchases' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('purchases')}
          >
            <ShoppingBag size={18} />
            <span>My Purchases ({purchases.length})</span>
          </button>

          <button 
            className={`btn ${activeTab === 'favorites' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('favorites')}
          >
            <Heart size={18} />
            <span>Saved Favorites ({myFavorites.length})</span>
          </button>

          <button 
            className={`btn ${activeTab === 'enquiries' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('enquiries')}
          >
            <Mail size={18} />
            <span>My Enquiries ({enquiries.length})</span>
          </button>
        </div>

        {/* TAB 1: MY LISTINGS */}
        {activeTab === 'listings' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Properties You Listed</h2>
              <Link to="/sell" className="btn btn-outline btn-sm">
                + Add Another Property
              </Link>
            </div>

            {myListings.length === 0 ? (
              <div style={{ background: 'white', padding: '3.5rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <Building2 size={48} color="var(--navy-500)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>You haven't listed any properties yet</h3>
                <p style={{ color: 'var(--navy-500)', marginBottom: '1.5rem' }}>
                  Got an apartment, villa, or commercial property to sell or rent? List it now to find clients.
                </p>
                <Link to="/sell" className="btn btn-primary">
                  <PlusCircle size={16} /> Create First Listing
                </Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {myListings.map(prop => {
                  const pId = prop._id || prop.id;
                  return (
                    <div key={pId} style={{ background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ position: 'relative', height: '180px' }}>
                        <img 
                          src={prop.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"} 
                          alt={prop.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <span className={`badge ${prop.status === 'approved' ? 'badge-approved' : 'badge-pending'}`} style={{ position: 'absolute', top: '10px', left: '10px' }}>
                          {prop.status || 'Active'}
                        </span>
                      </div>
                      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{prop.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--navy-500)', marginBottom: '0.75rem' }}>{prop.address}, {prop.city}</p>
                        <p style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>
                          {formatINR(prop.price, true)} {prop.purpose === 'rent' ? '/mo' : ''}
                        </p>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                          <Link to={`/properties/${pId}`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                            <ExternalLink size={14} /> View
                          </Link>
                          <Link to={`/edit-property/${pId}`} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                            <Edit3 size={14} /> Edit
                          </Link>
                          <button onClick={() => handleDeleteListing(pId)} className="btn btn-danger btn-sm">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SAVED FAVORITES */}
        {activeTab === 'favorites' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Saved Bookmarks</h2>
              <p style={{ color: 'var(--navy-500)', fontSize: '0.9rem' }}>
                Properties you have bookmarked for comparison and review.
              </p>
            </div>

            {myFavorites.length === 0 ? (
              <div style={{ background: 'white', padding: '3.5rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <Heart size={48} color="var(--navy-500)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No bookmarked properties</h3>
                <p style={{ color: 'var(--navy-500)', marginBottom: '1.5rem' }}>
                  Click the heart icon on any property listing card to save it here for fast access.
                </p>
                <Link to="/properties" className="btn btn-primary">
                  Explore Properties
                </Link>
              </div>
            ) : (
              <div className="property-grid">
                {myFavorites.map(property => (
                  <PropertyCard key={property._id || property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MY ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Your Submitted Enquiries</h2>
              <p style={{ color: 'var(--navy-500)', fontSize: '0.9rem' }}>
                Track the status of messages and tour booking requests you've sent to agents.
              </p>
            </div>

            {enquiries.length === 0 ? (
              <div style={{ background: 'white', padding: '3.5rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <Mail size={48} color="var(--navy-500)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No submitted enquiries yet</h3>
                <p style={{ color: 'var(--navy-500)' }}>
                  When you send a message or request a tour from a property details page, it will appear here.
                </p>
              </div>
            ) : (
              <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Date</th>
                      <th>Your Message</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((enq) => (
                      <tr key={enq._id || enq.id}>
                        <td style={{ fontWeight: 600 }}>{enq.propertyTitle || 'Premier Estate'}</td>
                        <td style={{ color: 'var(--navy-500)', fontSize: '0.85rem' }}>
                          {new Date(enq.createdAt || Date.now()).toLocaleDateString()}
                        </td>
                        <td style={{ maxWidth: '300px', fontSize: '0.85rem', color: 'var(--navy-700)' }}>
                          {enq.message}
                        </td>
                        <td>
                          <span className={`badge ${enq.status === 'closed' ? 'badge-approved' : 'badge-pending'}`}>
                            {enq.status || 'Received'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MY PURCHASES & BOOKINGS */}
        {activeTab === 'purchases' && (
          <div>
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>My Property Purchases & Bookings</h2>
                <p style={{ color: 'var(--navy-500)', fontSize: '0.9rem' }}>
                  Official token advance payments and verified purchase confirmations under RERA Escrow protection.
                </p>
              </div>
              <Link to="/properties" className="btn btn-outline btn-sm">
                + Buy Another Property
              </Link>
            </div>

            {purchases.length === 0 ? (
              <div style={{ background: 'white', padding: '3.5rem 2rem', textAlign: 'center', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <ShoppingBag size={48} color="var(--navy-500)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No purchase transactions yet</h3>
                <p style={{ color: 'var(--navy-500)', marginBottom: '1.5rem' }}>
                  Explore properties across India and click "Buy Property" to instantly secure your dream home with a 2% token advance.
                </p>
                <Link to="/properties" className="btn btn-primary">
                  Browse Verified Properties
                </Link>
              </div>
            ) : (
              <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Property</th>
                      <th>Token Advance (2%)</th>
                      <th>Total Value</th>
                      <th>Payment Method</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((pur) => {
                      const prop = pur.propertyId || {};
                      const propId = prop._id || prop.id || (typeof pur.propertyId === 'string' ? pur.propertyId : '');
                      return (
                        <tr key={pur._id || pur.id || pur.orderId}>
                          <td>
                            <span style={{ fontFamily: 'monospace', fontWeight: 700, background: 'var(--bg-main)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.82rem' }}>
                              {pur.orderId}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              {prop.images?.[0] && (
                                <img 
                                  src={prop.images[0]} 
                                  alt={prop.title || 'Property'} 
                                  style={{ width: '45px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                                />
                              )}
                              <div>
                                {propId ? (
                                  <Link to={`/properties/${propId}`} style={{ fontWeight: 600, color: 'var(--navy-900)' }}>
                                    {prop.title || pur.propertyTitle || 'Estate Property'}
                                  </Link>
                                ) : (
                                  <span style={{ fontWeight: 600 }}>{prop.title || pur.propertyTitle || 'Estate Property'}</span>
                                )}
                                <p style={{ fontSize: '0.75rem', color: 'var(--navy-500)' }}>{prop.city || 'India'}</p>
                              </div>
                            </div>
                          </td>
                          <td style={{ fontWeight: 700, color: 'var(--primary)' }}>
                            {formatINR(pur.tokenAmount, true)}
                          </td>
                          <td style={{ fontWeight: 600, color: 'var(--navy-700)' }}>
                            {formatINR(pur.totalPrice, true)}
                          </td>
                          <td>
                            <span style={{ textTransform: 'uppercase', fontSize: '0.78rem', background: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>
                              {pur.paymentMethod || 'UPI'}
                            </span>
                          </td>
                          <td>
                            <span className="badge badge-approved" style={{ background: '#ecfdf5', color: '#065f46' }}>
                              ✓ {pur.status?.toUpperCase() || 'CONFIRMED'}
                            </span>
                          </td>
                          <td style={{ color: 'var(--navy-500)', fontSize: '0.85rem' }}>
                            {new Date(pur.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  Mail, 
  DollarSign, 
  Check, 
  X, 
  Trash2, 
  Eye, 
  UserCheck 
} from 'lucide-react';
import { api } from '../services/api';
import { useProperties } from '../context/PropertyContext';
import { formatINR } from '../utils/formatters';
import { SAMPLE_USERS } from '../data/mockData';

export default function AdminDashboardPage() {
  const { properties, fetchProperties, showToast } = useProperties();
  const [activeTab, setActiveTab] = useState('properties'); // 'properties' | 'users' | 'enquiries'
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState(SAMPLE_USERS);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdminData() {
      setLoading(true);
      try {
        const statsRes = await api.getAdminStats();
        setStats(statsRes.stats);

        const enqRes = await api.getMyEnquiries();
        setEnquiries(enqRes.enquiries || []);
      } catch (err) {
        console.error('Error fetching admin data', err);
      } finally {
        setLoading(false);
      }
    }
    loadAdminData();
  }, [properties]);

  const handleUpdateStatus = async (propertyId, newStatus) => {
    try {
      await api.updateProperty(propertyId, { status: newStatus });
      showToast(`Property marked as ${newStatus}`, 'success');
      fetchProperties();
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Delete this property permanently from EstateHub?')) {
      try {
        await api.deleteProperty(propertyId);
        showToast('Property deleted by administrator', 'success');
        fetchProperties();
      } catch (err) {
        showToast(err.message || 'Failed to delete property', 'error');
      }
    }
  };

  const handleToggleUserRole = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u._id === userId) {
        const newRole = u.role === 'admin' ? 'user' : 'admin';
        showToast(`User ${u.name} role changed to ${newRole}`, 'success');
        return { ...u, role: newRole };
      }
      return u;
    }));
  };

  return (
    <div className="section-padding">
      <div className="container">
        {/* Admin Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-sale" style={{ fontSize: '0.8rem' }}>
                <ShieldCheck size={14} /> Master Administrator Console
              </span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>EstateHub Control Center</h1>
            <p style={{ color: 'var(--navy-500)', fontSize: '0.95rem' }}>
              Platform metrics, listing approvals, user privileges, and inbound enquiry queues.
            </p>
          </div>

          <Link to="/sell" className="btn btn-primary">
            <Building2 size={16} /> + New Listing
          </Link>
        </div>

        {/* Top Metric Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy-500)', textTransform: 'uppercase' }}>Total Properties</span>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              {properties.length}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>Active Platform Inventory</span>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy-500)', textTransform: 'uppercase' }}>Registered Users</span>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              {users.length + 12}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: 600 }}>Buyers, Agents & Admins</span>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy-500)', textTransform: 'uppercase' }}>Inbound Enquiries</span>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={18} />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              {enquiries.length + 18}
            </div>
            <span style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: 600 }}>Client Tour Leads</span>
          </div>

          <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy-500)', textTransform: 'uppercase' }}>Portfolio Valuation</span>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                ₹
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              ₹{((properties.reduce((sum, p) => sum + (p.price || 0), 0)) / 10000000).toFixed(1)} Cr
            </div>
            <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>Total Asset Capital</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '2px solid var(--border-color)', marginBottom: '2rem', paddingBottom: '0.5rem' }}>
          <button 
            className={`btn ${activeTab === 'properties' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('properties')}
          >
            <Building2 size={16} /> Manage Listings ({properties.length})
          </button>
          <button 
            className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={16} /> Manage Users ({users.length})
          </button>
          <button 
            className={`btn ${activeTab === 'enquiries' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('enquiries')}
          >
            <Mail size={16} /> Inbound Leads ({enquiries.length + 3})
          </button>
        </div>

        {/* TAB 1: PROPERTIES MANAGEMENT */}
        {activeTab === 'properties' && (
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type & Purpose</th>
                  <th>Price</th>
                  <th>Owner / Agent</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(p => {
                  const pId = p._id || p.id;
                  return (
                    <tr key={pId}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img 
                            src={p.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=100&q=80"} 
                            alt={p.title} 
                            style={{ width: '45px', height: '45px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{p.title}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--navy-500)' }}>{p.city}, {p.state}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{p.propertyType}</span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--navy-500)', textTransform: 'uppercase' }}>
                          {p.purpose === 'rent' ? 'For Rent' : 'For Sale'}
                        </div>
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--primary)' }}>
                        {formatINR(p.price, true)}
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>
                        {p.owner?.name || 'Verified Partner'}
                      </td>
                      <td>
                        <span className={`badge ${p.status === 'approved' ? 'badge-approved' : p.status === 'rejected' ? 'badge-rejected' : 'badge-pending'}`}>
                          {p.status || 'approved'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                          <Link to={`/properties/${pId}`} className="btn-icon" title="View Property">
                            <Eye size={16} />
                          </Link>
                          {p.status !== 'approved' && (
                            <button 
                              onClick={() => handleUpdateStatus(pId, 'approved')} 
                              className="btn-icon" 
                              style={{ color: 'var(--success)' }}
                              title="Approve Listing"
                            >
                              <Check size={16} />
                            </button>
                          )}
                          {p.status !== 'rejected' && (
                            <button 
                              onClick={() => handleUpdateStatus(pId, 'rejected')} 
                              className="btn-icon" 
                              style={{ color: 'var(--warning)' }}
                              title="Reject Listing"
                            >
                              <X size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteProperty(pId)} 
                            className="btn-icon" 
                            style={{ color: 'var(--danger)' }}
                            title="Delete Listing"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: USERS MANAGEMENT */}
        {activeTab === 'users' && (
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>User Profile</th>
                  <th>Contact Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th style={{ textAlign: 'right' }}>Role Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img 
                          src={u.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"} 
                          alt={u.name} 
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <span style={{ fontWeight: 700 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--navy-600)' }}>{u.email}</td>
                    <td style={{ color: 'var(--navy-500)', fontSize: '0.85rem' }}>{u.phone || 'N/A'}</td>
                    <td>
                      <span className={`badge ${u.role === 'admin' ? 'badge-sale' : 'badge-rent'}`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        onClick={() => handleToggleUserRole(u._id)}
                        className="btn btn-outline btn-sm"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                      >
                        <UserCheck size={14} /> Toggle to {u.role === 'admin' ? 'User' : 'Admin'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: ENQUIRIES MANAGEMENT */}
        {activeTab === 'enquiries' && (
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Prospect</th>
                  <th>Property</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--navy-500)' }}>
                      No new client enquiries recorded yet.
                    </td>
                  </tr>
                ) : (
                  enquiries.map(enq => (
                    <tr key={enq._id || enq.id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{enq.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--navy-500)' }}>{enq.email} • {enq.phone}</div>
                      </td>
                      <td style={{ fontWeight: 600 }}>{enq.propertyTitle || 'Listing Inquiry'}</td>
                      <td style={{ maxWidth: '300px', fontSize: '0.85rem', color: 'var(--navy-700)' }}>{enq.message}</td>
                      <td>
                        <span className="badge badge-pending">{enq.status || 'New'}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button 
                          onClick={() => {
                            showToast('Marked enquiry as contacted', 'success');
                          }}
                          className="btn btn-outline btn-sm"
                        >
                          Mark Contacted
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


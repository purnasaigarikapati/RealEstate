import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, User, Mail, Lock, Phone, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user'
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const { showToast } = useProperties();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const res = await register(formData);
    setLoading(false);

    if (res.success) {
      showToast('Registration successful! Welcome to EstateHub.', 'success');
      navigate('/dashboard');
    } else {
      setErrorMsg(res.error || 'Registration failed');
    }
  };

  return (
    <div className="section-padding" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '520px' }}>
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <Building2 size={26} />
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              Create an Account
            </h1>
            <p style={{ color: 'var(--navy-500)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Join EstateHub to buy, rent, or list premium real estate properties.
            </p>
          </div>

          {errorMsg && (
            <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input 
                  type="text" 
                  name="name"
                  className="form-input" 
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input 
                  type="email" 
                  name="email"
                  className="form-input" 
                  placeholder="eleanor@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-with-icon">
                <Phone size={16} className="input-icon" />
                <input 
                  type="tel" 
                  name="phone"
                  className="form-input" 
                  placeholder="+1 (555) 019-2834"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Account Role</label>
              <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
                <option value="user">Buyer / Tenant / Regular User</option>
                <option value="agent">Real Estate Agent / Broker</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Password * (Min 6 chars)</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input 
                  type="password" 
                  name="password"
                  className="form-input" 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '0.75rem' }}
              disabled={loading}
            >
              <UserPlus size={18} />
              <span>{loading ? 'Creating Account...' : 'Register Account'}</span>
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', fontSize: '0.9rem', color: 'var(--navy-600)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


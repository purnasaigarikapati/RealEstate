import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Building2, Mail, Lock, LogIn, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProperties } from '../context/PropertyContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useProperties();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      showToast('Welcome back to EstateHub!', 'success');
      navigate(from, { replace: true });
    } else {
      setErrorMsg(res.error || 'Invalid credentials');
    }
  };

  const handleQuickLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="section-padding" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
          {/* Form Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <Building2 size={26} />
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              Sign In to EstateHub
            </h1>
            <p style={{ color: 'var(--navy-500)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Manage your properties, saved favorites, and enquiries.
            </p>
          </div>

          {location.state?.alertMessage && (
            <div style={{ background: '#ecfdf5', border: '1px solid #10b981', color: '#065f46', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              <span>🔒</span>
              <span>{location.state.alertMessage}</span>
            </div>
          )}

          {errorMsg && (
            <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              {errorMsg}
            </div>
          )}

          {/* Quick Demo Fill Pill Buttons */}
          <div style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.85rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--navy-500)', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
              ⚡ Instant One-Click Demo Credentials:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button 
                type="button" 
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                onClick={() => handleQuickLogin('admin@estatehub.in', 'admin123')}
              >
                <ShieldCheck size={14} color="var(--primary)" />
                <span>Demo Admin</span>
              </button>
              <button 
                type="button" 
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                onClick={() => handleQuickLogin('rahul@example.in', 'user123')}
              >
                <UserCheck size={14} color="var(--primary)" />
                <span>Demo User</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="admin@estatehub.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '0.75rem' }}
              disabled={loading}
            >
              <LogIn size={18} />
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', fontSize: '0.9rem', color: 'var(--navy-600)' }}>
            Don't have an account yet?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


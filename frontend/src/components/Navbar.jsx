import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Menu, 
  X, 
  User, 
  Heart, 
  PlusCircle, 
  LogOut, 
  ShieldCheck, 
  LayoutDashboard 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <div className="container">
        <nav className="navbar">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand" onClick={closeMenu}>
            <div className="brand-icon">
              <Building2 size={24} />
            </div>
            <div className="brand-text">
              Estate<span>Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/properties?purpose=sale" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Buy
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/properties?purpose=rent" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Rent
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/sell" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Sell
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>

            {/* If Mobile Menu is open, show auth links inline */}
            {mobileMenuOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="btn btn-outline btn-sm" onClick={closeMenu}>
                      <LayoutDashboard size={16} /> User Dashboard
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="btn btn-secondary btn-sm" onClick={closeMenu}>
                        <ShieldCheck size={16} /> Admin Panel
                      </Link>
                    )}
                    <button onClick={handleLogout} className="btn btn-danger btn-sm">
                      <LogOut size={16} /> Logout ({user?.name})
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-outline btn-sm" onClick={closeMenu}>
                      Log In
                    </Link>
                    <Link to="/register" className="btn btn-primary btn-sm" onClick={closeMenu}>
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </ul>

          {/* Right Action Buttons */}
          <div className="nav-actions">
            <Link to="/sell" className="btn btn-primary btn-sm" style={{ display: 'inline-flex' }}>
              <PlusCircle size={16} />
              <span>List Property</span>
            </Link>

            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <div 
                  className="user-badge-menu"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  role="button"
                  tabIndex={0}
                >
                  <img 
                    src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"} 
                    alt={user?.name || "User Avatar"} 
                    className="user-avatar"
                  />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy-800)' }}>
                    {user?.name?.split(' ')[0]}
                  </span>
                  {isAdmin && (
                    <span className="badge badge-sale" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}>
                      Admin
                    </span>
                  )}
                </div>

                {userDropdownOpen && (
                  <div 
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '120%',
                      width: '220px',
                      background: 'white',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-xl)',
                      border: '1px solid var(--border-color)',
                      padding: '0.75rem',
                      zIndex: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem'
                    }}
                  >
                    <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.25rem' }}>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy-900)' }}>{user?.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--navy-500)' }}>{user?.email}</p>
                    </div>

                    <Link 
                      to="/dashboard" 
                      className="nav-link" 
                      style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <LayoutDashboard size={16} color="var(--primary)" /> Dashboard & Saved
                    </Link>

                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="nav-link" 
                        style={{ padding: '0.5rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <ShieldCheck size={16} color="var(--primary)" /> Admin Console
                      </Link>
                    )}

                    <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '0.25rem', paddingTop: '0.25rem' }}>
                      <button 
                        onClick={handleLogout}
                        style={{ 
                          width: '100%', 
                          textAlign: 'left', 
                          padding: '0.5rem 0.75rem', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.5rem',
                          color: 'var(--danger)',
                          fontSize: '0.9rem',
                          fontWeight: 600
                        }}
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link to="/login" className="btn btn-outline btn-sm">
                  Log In
                </Link>
                <Link to="/register" className="btn btn-secondary btn-sm">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button 
              className="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}


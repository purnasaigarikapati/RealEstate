import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--navy-600)', fontWeight: 600 }}>Verifying session authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h2 style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Access Restricted</h2>
        <p style={{ color: 'var(--navy-600)', marginBottom: '1.5rem' }}>
          This page requires administrative privileges. Please log in with an administrator account.
        </p>
        <Navigate to="/dashboard" replace />
      </div>
    );
  }

  return children;
}


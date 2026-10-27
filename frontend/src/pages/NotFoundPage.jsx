import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="section-padding" style={{ textAlign: 'center', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '550px' }}>
        <h1 style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', marginBottom: '1rem' }}>
          Page Not Found
        </h2>
        <p style={{ color: 'var(--navy-600)', marginBottom: '2rem', fontSize: '1.05rem' }}>
          The property listing or page you are attempting to access may have moved, expired, or been unlisted.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          <Home size={18} /> Return to Homepage
        </Link>
      </div>
    </div>
  );
}


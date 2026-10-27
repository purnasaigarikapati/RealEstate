import React from 'react';
import { Building2, ShieldCheck, Award, Users, Target, CheckCircle2, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const leadership = [
    {
      name: "Rajeshwar Singhania",
      role: "Managing Director & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "22+ years of institutional Indian real estate development across Mumbai, NCR, and Bengaluru."
    },
    {
      name: "Priya Sharma",
      role: "Head of Luxury Residential",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      bio: "Supervised over ₹1,800 Cr in premier residential transactions across Bandra, South Mumbai, and Goa."
    },
    {
      name: "Vikram Malhotra",
      role: "VP of Engineering & Architecture",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
      bio: "Pioneering proptech solutions, verified RERA documentation, and secure property management systems."
    }
  ];

  return (
    <div>
      {/* Hero Header */}
      <section style={{ background: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80") center/cover', color: 'white', padding: '6rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#34d399', border: '1px solid rgba(255,255,255,0.2)' }}>
            About EstateHub
          </span>
          <h1 style={{ fontSize: '3.2rem', fontWeight: 800, color: 'white', marginBottom: '1.25rem' }}>
            Elevating How The World Discovers Luxury Real Estate
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: '1.7' }}>
            Headquartered in Guntur, Andhra Pradesh, EstateHub connects discerning property seekers, investors, and developers across India's premier metropolitan corridors and capital regions.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="section-badge">Our Mission</span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                Connecting People with Spaces That Inspire
              </h2>
              <p style={{ color: 'var(--navy-600)', lineHeight: '1.8', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                At EstateHub, we believe a home is more than square footage—it is the foundation for lifestyle, security, and generational wealth. We eliminate archaic paper-bound processes and replace them with verified digital tools, verified agent credentials, and authentic photography.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600, color: 'var(--navy-800)' }}>
                  <CheckCircle2 size={20} color="var(--primary)" /> 100% Verified Titles & Architectural Disclosures
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600, color: 'var(--navy-800)' }}>
                  <CheckCircle2 size={20} color="var(--primary)" /> Direct Negotiation Without Middleman Surcharges
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600, color: 'var(--navy-800)' }}>
                  <CheckCircle2 size={20} color="var(--primary)" /> Rapid Digital Contracting and Verified Escrow Support
                </div>
              </div>
            </div>

            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
              <img 
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80" 
                alt="EstateHub Architecture"
                style={{ width: '100%', height: '420px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding" style={{ background: 'white', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Executive Team</span>
            <h2 className="section-title">Guided by Industry Pioneers</h2>
            <p className="section-subtitle">
              Meet the licensed real estate innovators and technologists powering EstateHub.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {leadership.map((member, i) => (
              <div key={i} style={{ background: 'var(--bg-main)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <img src={member.image} alt={member.name} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
                <div style={{ padding: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>{member.name}</h4>
                  <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem' }}>{member.role}</p>
                  <p style={{ color: 'var(--navy-600)', fontSize: '0.875rem', lineHeight: '1.6' }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


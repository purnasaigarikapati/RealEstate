import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Navigation } from 'lucide-react';
import { api } from '../services/api';
import { useProperties } from '../context/PropertyContext';

export default function ContactPage() {
  const { showToast } = useProperties();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Property Inquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await api.sendEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `[Subject: ${formData.subject}] ${formData.message}`
      });
      setSubmitted(true);
      showToast('Thank you! Your message has been received.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Property Inquiry',
        message: ''
      });
    } catch (err) {
      showToast(err.message || 'Failed to submit contact message', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Get in Touch</span>
          <h1 className="section-title">We're Here to Help You</h1>
          <p className="section-subtitle">
            Have questions regarding buying, selling, or property advisory? Reach out to our concierge advisory team.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
          {/* Contact Details Card */}
          <div>
            <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--navy-900)' }}>
                EstateHub Global Concierge
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>Corporate Headquarters</h5>
                    <p style={{ color: 'var(--navy-600)', fontSize: '0.925rem' }}>
                      EstateHub Towers, Lakshmipuram Main Road<br />Guntur, Andhra Pradesh 522007
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>Advisory Desk</h5>
                    <p style={{ color: 'var(--navy-600)', fontSize: '0.925rem' }}>
                      Toll-Free: +91 1800-572-REALTY<br />
                      Direct: +91 (863) 223-4567
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>Electronic Mail</h5>
                    <p style={{ color: 'var(--navy-600)', fontSize: '0.925rem' }}>
                      concierge@estatehub.in<br />
                      advisory@estatehub.in
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h5 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.2rem' }}>Operating Hours</h5>
                    <p style={{ color: 'var(--navy-600)', fontSize: '0.925rem' }}>
                      Monday – Saturday: 9:00 AM – 7:30 PM IST<br />
                      Sunday: 10:00 AM – 5:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map of Guntur Headquarters */}
              <div style={{ marginTop: '2rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <iframe
                  title="EstateHub Guntur Headquarters"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  src="https://maps.google.com/maps?q=Lakshmipuram,%20Guntur,%20Andhra%20Pradesh%20522007&t=&z=15&ie=UTF8&iwloc=&output=embed"
                />
                <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-main)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--navy-600)', fontWeight: 600 }}>Lakshmipuram, Guntur, AP</span>
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=Lakshmipuram,%20Guntur,%20Andhra%20Pradesh%20522007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', padding: '0.35rem 0.75rem', textDecoration: 'none' }}
                  >
                    <Navigation size={13} />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--navy-900)' }}>
              Send Us a Message
            </h3>
            <p style={{ color: 'var(--navy-500)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
              Fill in the form below and an EstateHub property consultant will respond within 24 business hours.
            </p>

            {submitted ? (
              <div style={{ background: 'var(--primary-light)', padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <CheckCircle2 size={44} color="var(--primary)" style={{ margin: '0 auto 0.75rem auto' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.5rem' }}>
                  Message Received!
                </h4>
                <p style={{ color: 'var(--navy-700)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  A member of our advisory desk has been notified and will reach out promptly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="btn btn-outline btn-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    className="form-input" 
                    placeholder="e.g. Robert Langdon"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      className="form-input" 
                      placeholder="robert@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      className="form-input" 
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Topic / Subject</label>
                  <select name="subject" className="form-select" value={formData.subject} onChange={handleChange}>
                    <option value="General Property Inquiry">General Property Inquiry</option>
                    <option value="Selling or Listing Advisory">Selling or Listing Advisory</option>
                    <option value="Commercial Leasing Consultation">Commercial Leasing Consultation</option>
                    <option value="Broker Partnership">Broker Partnership Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea 
                    name="message" 
                    className="form-textarea" 
                    rows={5}
                    placeholder="Tell us about the property criteria or transaction inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg" 
                  style={{ width: '100%' }}
                  disabled={submitting}
                >
                  <Send size={18} />
                  <span>{submitting ? 'Sending Message...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


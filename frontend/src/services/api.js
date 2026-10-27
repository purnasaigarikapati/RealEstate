import { SAMPLE_PROPERTIES, SAMPLE_USERS } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Helper to get auth header
const getAuthHeaders = () => {
  const token = localStorage.getItem('estatehub_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

// Check if localStorage has cached properties or initialize with SAMPLE_PROPERTIES
const getLocalProperties = () => {
  try {
    const stored = localStorage.getItem('estatehub_properties');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading local properties:', e);
  }
  localStorage.setItem('estatehub_properties', JSON.stringify(SAMPLE_PROPERTIES));
  return SAMPLE_PROPERTIES;
};

const saveLocalProperties = (properties) => {
  try {
    localStorage.setItem('estatehub_properties', JSON.stringify(properties));
  } catch (e) {
    console.error('Error saving local properties:', e);
  }
};

export const api = {
  // ================= AUTH =================
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || 'Login failed');
    } catch (error) {
      // Offline / Fallback login simulation for quick testing
      console.warn('Backend unavailable, falling back to local auth simulation:', error.message);
      if ((email === 'admin@estatehub.in' || email === 'admin@estatehub.com') && password === 'admin123') {
        const mockAdmin = SAMPLE_USERS[0];
        return {
          user: mockAdmin,
          token: 'mock-jwt-admin-token-12345'
        };
      }
      if ((email === 'rahul@example.in' || email === 'john@example.com') && (password === 'user123' || password === 'rahul123')) {
        const mockUser = SAMPLE_USERS[1];
        return {
          user: mockUser,
          token: 'mock-jwt-user-token-67890'
        };
      }
      // If user registered locally
      const storedUsers = JSON.parse(localStorage.getItem('estatehub_local_users') || '[]');
      const match = storedUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (match && match.password === password) {
        return {
          user: match,
          token: 'mock-jwt-local-token-' + match._id
        };
      }
      throw new Error(error.message || 'Invalid email or password');
    }
  },

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        return await response.json();
      }
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || 'Registration failed');
    } catch (error) {
      console.warn('Backend unavailable, falling back to local registration:', error.message);
      const newUser = {
        _id: 'user-' + Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        role: userData.role || 'user',
        password: userData.password,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        favorites: []
      };
      const storedUsers = JSON.parse(localStorage.getItem('estatehub_local_users') || '[]');
      if (storedUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
        throw new Error('An account with this email already exists.');
      }
      storedUsers.push(newUser);
      localStorage.setItem('estatehub_local_users', JSON.stringify(storedUsers));
      return {
        user: newUser,
        token: 'mock-jwt-local-token-' + newUser._id
      };
    }
  },

  async getMe() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      // Local check
    }
    return null;
  },

  // ================= PROPERTIES =================
  async getProperties(params = {}) {
    const query = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '' && params[key] !== null) {
        query.append(key, params[key]);
      }
    });

    try {
      const response = await fetch(`${API_BASE_URL}/properties?${query.toString()}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn('Backend unavailable, using client-side mock data:', e.message);
    }

    // Client-side fallback filtering
    let list = [...getLocalProperties()];

    if (params.purpose && params.purpose !== 'all') {
      list = list.filter(p => p.purpose === params.purpose);
    }
    if (params.propertyType && params.propertyType !== 'all') {
      list = list.filter(p => p.propertyType.toLowerCase() === params.propertyType.toLowerCase());
    }
    if (params.city && params.city !== 'all') {
      list = list.filter(p => p.city.toLowerCase().includes(params.city.toLowerCase()));
    }
    if (params.keyword) {
      const k = params.keyword.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(k) ||
        p.city.toLowerCase().includes(k) ||
        p.address.toLowerCase().includes(k) ||
        p.propertyType.toLowerCase().includes(k)
      );
    }
    if (params.bedrooms && params.bedrooms !== 'any') {
      const minBeds = parseInt(params.bedrooms);
      list = list.filter(p => p.bedrooms >= minBeds);
    }
    if (params.minPrice) {
      list = list.filter(p => p.price >= Number(params.minPrice));
    }
    if (params.maxPrice) {
      list = list.filter(p => p.price <= Number(params.maxPrice));
    }

    // Sorting
    if (params.sort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'area-desc') {
      list.sort((a, b) => b.area - a.area);
    } else {
      // newest
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return {
      success: true,
      count: list.length,
      properties: list
    };
  },

  async getPropertyById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn('Backend unavailable, reading property from mock data:', e.message);
    }
    const list = getLocalProperties();
    const found = list.find(p => p._id === id || p.id === id);
    if (!found) {
      throw new Error('Property not found');
    }
    return { success: true, property: found };
  },

  async createProperty(propertyData) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(propertyData)
      });
      if (response.ok) {
        return await response.json();
      }
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to create property');
    } catch (error) {
      console.warn('Backend unavailable, creating property locally:', error.message);
      const list = getLocalProperties();
      const newProp = {
        ...propertyData,
        _id: 'prop-' + Date.now(),
        id: 'prop-' + Date.now(),
        status: 'approved',
        createdAt: new Date().toISOString()
      };
      list.unshift(newProp);
      saveLocalProperties(list);
      return { success: true, property: newProp };
    }
  },

  async updateProperty(id, propertyData) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(propertyData)
      });
      if (response.ok) {
        return await response.json();
      }
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to update property');
    } catch (error) {
      console.warn('Backend unavailable, updating property locally:', error.message);
      let list = getLocalProperties();
      list = list.map(p => ((p._id === id || p.id === id) ? { ...p, ...propertyData } : p));
      saveLocalProperties(list);
      return { success: true, property: { _id: id, ...propertyData } };
    }
  },

  async deleteProperty(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.warn('Backend unavailable, deleting property locally:', error.message);
      let list = getLocalProperties();
      list = list.filter(p => p._id !== id && p.id !== id);
      saveLocalProperties(list);
      return { success: true, message: 'Property deleted successfully' };
    }
  },

  // ================= ENQUIRIES =================
  async sendEnquiry(enquiryData) {
    try {
      const response = await fetch(`${API_BASE_URL}/enquiries`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(enquiryData)
      });
      if (response.ok) {
        return await response.json();
      }
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to send enquiry');
    } catch (error) {
      console.warn('Backend unavailable, saving enquiry locally:', error.message);
      const enquiries = JSON.parse(localStorage.getItem('estatehub_enquiries') || '[]');
      const newEnquiry = {
        _id: 'enq-' + Date.now(),
        ...enquiryData,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      enquiries.unshift(newEnquiry);
      localStorage.setItem('estatehub_enquiries', JSON.stringify(enquiries));
      return { success: true, enquiry: newEnquiry, message: 'Enquiry submitted successfully!' };
    }
  },

  async getMyEnquiries() {
    try {
      const response = await fetch(`${API_BASE_URL}/enquiries/my`, {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn('Reading enquiries locally');
    }
    const enquiries = JSON.parse(localStorage.getItem('estatehub_enquiries') || '[]');
    return { success: true, enquiries };
  },

  // ================= PURCHASES / BOOKINGS =================
  async createPurchase(purchaseData) {
    try {
      const response = await fetch(`${API_BASE_URL}/purchases`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(purchaseData)
      });
      if (response.ok) {
        return await response.json();
      }
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to complete purchase');
    } catch (error) {
      console.warn('Backend unavailable, recording purchase locally:', error.message);
      const purchases = JSON.parse(localStorage.getItem('estatehub_purchases') || '[]');
      const orderId = 'ORD-EH-' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
      const newPurchase = {
        _id: 'purch-' + Date.now(),
        orderId,
        ...purchaseData,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      purchases.unshift(newPurchase);
      localStorage.setItem('estatehub_purchases', JSON.stringify(purchases));
      return {
        success: true,
        message: 'Property purchase & booking confirmed successfully!',
        purchase: newPurchase
      };
    }
  },

  async getMyPurchases() {
    try {
      const response = await fetch(`${API_BASE_URL}/purchases/my`, {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn('Reading purchases locally');
    }
    const purchases = JSON.parse(localStorage.getItem('estatehub_purchases') || '[]');
    return { success: true, purchases };
  },

  // ================= ADMIN =================
  async getAdminStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      console.warn('Admin stats fallback');
    }
    const props = getLocalProperties();
    const enquiries = JSON.parse(localStorage.getItem('estatehub_enquiries') || '[]');
    return {
      success: true,
      stats: {
        totalProperties: props.length,
        approvedProperties: props.filter(p => p.status === 'approved').length,
        pendingProperties: props.filter(p => p.status === 'pending').length,
        totalUsers: 8,
        totalEnquiries: enquiries.length + 5,
        totalPortfolioValue: props.reduce((sum, p) => sum + (p.price || 0), 0)
      }
    };
  }
};


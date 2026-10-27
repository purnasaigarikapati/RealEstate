import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('estatehub_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('estatehub_token') || '');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('estatehub_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Keep localStorage updated when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('estatehub_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('estatehub_user');
    }
  }, [user]);

  // Keep favorites synced with localStorage
  useEffect(() => {
    localStorage.setItem('estatehub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.login(email, password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('estatehub_token', data.token);
      if (data.user.favorites && Array.isArray(data.user.favorites)) {
        setFavorites(data.user.favorites);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await api.register(userData);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('estatehub_token', data.token);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('estatehub_token');
    localStorage.removeItem('estatehub_user');
  };

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const exists = prev.includes(propertyId);
      if (exists) {
        return prev.filter(id => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  };

  const isFavorite = (propertyId) => {
    return favorites.includes(propertyId);
  };

  const updateProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        favorites,
        login,
        register,
        logout,
        toggleFavorite,
        isFavorite,
        updateProfile,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


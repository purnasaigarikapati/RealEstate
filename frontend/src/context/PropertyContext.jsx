import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // Search and filter state
  const [filters, setFilters] = useState({
    keyword: '',
    purpose: 'all', // 'all' | 'sale' | 'rent'
    propertyType: 'all',
    city: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'any',
    sort: 'newest'
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const fetchProperties = useCallback(async (customFilters = null) => {
    setLoading(true);
    setError(null);
    try {
      const activeFilters = customFilters || filters;
      const res = await api.getProperties(activeFilters);
      setProperties(res.properties || []);
    } catch (err) {
      setError(err.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      keyword: '',
      purpose: 'all',
      propertyType: 'all',
      city: 'all',
      minPrice: '',
      maxPrice: '',
      bedrooms: 'any',
      sort: 'newest'
    });
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        error,
        filters,
        toast,
        showToast,
        setFilters,
        updateFilters,
        resetFilters,
        fetchProperties
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => useContext(PropertyContext);


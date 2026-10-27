import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import SellPropertyPage from './pages/SellPropertyPage';
import EditPropertyPage from './pages/EditPropertyPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PropertyProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/properties/:id" element={<PropertyDetailsPage />} />
                <Route 
                  path="/sell" 
                  element={
                    <ProtectedRoute>
                      <SellPropertyPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/edit-property/:id" 
                  element={
                    <ProtectedRoute>
                      <EditPropertyPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </div>
        </PropertyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}


import { useState, useEffect, createContext, useContext } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Ticket from '../components/Ticket';
import Navbar from '../components/homepage/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../components/homepage/Home';
import Login from '../components/Login';
import UserPortal from '../components/UserPortal';
import AdminPortal from '../components/AdminPortal';
import { FAQ } from '../components/FAQ';
import { About } from '../components/About';
import TicketDatabase from '../components/ticketdatabase';
import ManageUsers from '../components/ManageUsers';
import React from 'react';
import { AuthProvider, useAuth } from '../src/AuthContext';

function AdminRoute({ children }) {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated || (userRole !== 2 && userRole !== 3)) {
    return <Navigate to="/login" />;
  }
  return children;
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        
        {/* Protected routes for authenticated users */}
        <Route path="/userportal" element={
          <ProtectedRoute>
            <UserPortal />
          </ProtectedRoute>
        } />
        
        <Route path="/ticket" element={
          <ProtectedRoute>
            <Ticket />
          </ProtectedRoute>
        } />
        
        {/* Admin-only routes */}
        <Route path="/adminportal" element={
          <AdminRoute>
            <AdminPortal />
          </AdminRoute>
        } />
        
        <Route path="/ticket-database" element={
          <AdminRoute>
            <TicketDatabase />
          </AdminRoute>
        } />
        
        <Route path="/manage-users" element={
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        } />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Auth Context
const AuthContext = createContext(undefined);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Verify token and fetch user details
  const verifyToken = async (token) => {
    try {
      const response = await axios.get('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      
      // Store userRole in localStorage
      if (response.data.role) {
        localStorage.setItem('userRole', response.data.role);
      }
      return response.data;
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Login function (stores token & verifies user)
  const login = async (token) => {
    localStorage.setItem('token', token);
    const userData = await verifyToken(token);
    
    if (userData && userData.role) {
      localStorage.setItem('userRole', userData.role);
    }
  };

  // Logout function (removes token & clears user)
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole'); // Remove userRole on logout
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

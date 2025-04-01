import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Auth Context
const AuthContext = createContext(undefined);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Added loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false); // If no token, stop loading
    }
  }, [user]);

  // Verify token and fetch user details
  const verifyToken = async (token) => {
    try {
      const response = await axios.get('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Token verification failed:', error);
      logout(); 
    } finally {
      setLoading(false); // Stop loading after checking
    }
  };

  // Login function (stores token & verifies user)
  const login = async (token) => {
    localStorage.setItem('token', token);
    await verifyToken(token);
  };

  // Logout function (removes token & clears user)
  const logout = () => {
    localStorage.removeItem('token');
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

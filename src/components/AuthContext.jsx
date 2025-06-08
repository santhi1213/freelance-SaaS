import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from local storage or API on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }
        
        // Set authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Get current user data
        const res = await axios.get('/api/auth/me', {
          withCredentials: true
        });
        
        if (res.data.success) {
          setCurrentUser(res.data.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Load user error:', error);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await axios.get('/api/auth/logout', {
        withCredentials: true
      });
      
      // Clear user data
      setCurrentUser(null);
      setIsAuthenticated(false);
      
      // Remove token from localStorage
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        isAuthenticated,
        setIsAuthenticated,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
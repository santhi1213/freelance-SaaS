import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with auth header
const authApi = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests if available
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem('token')) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login?session=expired';
    }
    return Promise.reject(error);
  }
);

// Register a new user
export const register = async (userData) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

// Log in a user
export const login = async (credentials) => {
  return await axios.post(`${API_URL}/auth/login`, credentials);
};

// Get current user information
export const getCurrentUser = async () => {
  const response = await authApi.get(`${API_URL}/auth/me`);
  return response.data;
};

// Request password reset
export const requestPasswordReset = async (email) => {
  return await axios.post(`${API_URL}/auth/forgot-password`, { email });
};

// Reset password with token
export const resetPassword = async (token, newPassword) => {
  return await axios.post(`${API_URL}/auth/reset-password`, { 
    token, 
    password: newPassword 
  });
};

// Change password (authenticated)
export const changePassword = async (currentPassword, newPassword) => {
  return await authApi.post(`${API_URL}/auth/change-password`, {
    currentPassword,
    newPassword
  });
};

// Verify email address
export const verifyEmail = async (token) => {
  return await axios.get(`${API_URL}/auth/verify-email/${token}`);
};

// Resend verification email
export const resendVerificationEmail = async (email) => {
  return await axios.post(`${API_URL}/auth/resend-verification`, { email });
};

export default authApi;
import authApi from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get user profile
export const getProfile = async () => {
  return await authApi.get(`${API_URL}/users/profile`);
};

// Update user profile
export const updateProfile = async (userData) => {
  return await authApi.put(`${API_URL}/users/profile`, userData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update profile picture
export const updateProfilePicture = async (imageFile) => {
  const formData = new FormData();
  formData.append('profilePicture', imageFile);
  
  return await authApi.post(`${API_URL}/users/profile-picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Delete profile picture
export const deleteProfilePicture = async () => {
  return await authApi.delete(`${API_URL}/users/profile-picture`);
};

// Get user's event history
export const getEventHistory = async (page = 1, limit = 10) => {
  return await authApi.get(`${API_URL}/users/event-history?page=${page}&limit=${limit}`);
};

// Get user's upcoming events
export const getUpcomingEvents = async (page = 1, limit = 10) => {
  return await authApi.get(`${API_URL}/users/upcoming-events?page=${page}&limit=${limit}`);
};

// Get user notifications
export const getNotifications = async (page = 1, limit = 10, unreadOnly = false) => {
  return await authApi.get(`${API_URL}/users/notifications?page=${page}&limit=${limit}&unreadOnly=${unreadOnly}`);
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  return await authApi.put(`${API_URL}/users/notifications/${notificationId}/read`);
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
  return await authApi.put(`${API_URL}/users/notifications/read-all`);
};

// Update notification preferences
export const updateNotificationPreferences = async (preferences) => {
  return await authApi.put(`${API_URL}/users/notification-preferences`, preferences);
};

// Get notification preferences
export const getNotificationPreferences = async () => {
  return await authApi.get(`${API_URL}/users/notification-preferences`);
};

// Get user's saved events (bookmarks)
export const getSavedEvents = async (page = 1, limit = 10) => {
  return await authApi.get(`${API_URL}/users/saved-events?page=${page}&limit=${limit}`);
};

// Save an event (bookmark)
export const saveEvent = async (eventId) => {
  return await authApi.post(`${API_URL}/users/saved-events/${eventId}`);
};

// Remove a saved event (bookmark)
export const unsaveEvent = async (eventId) => {
  return await authApi.delete(`${API_URL}/users/saved-events/${eventId}`);
};

// Check if user has saved an event
export const isEventSaved = async (eventId) => {
  return await authApi.get(`${API_URL}/users/saved-events/${eventId}/check`);
};

// Get user certificates/badges
export const getCertificates = async () => {
  return await authApi.get(`${API_URL}/users/certificates`);
};

// Download certificate
export const downloadCertificate = async (certificateId) => {
  return await authApi.get(`${API_URL}/users/certificates/${certificateId}/download`, {
    responseType: 'blob'
  });
};

// Admin only: Get all users (paginated)
export const getAllUsers = async (page = 1, limit = 10, filters = {}) => {
  const queryParams = new URLSearchParams({
    page,
    limit,
    ...filters
  });
  
  return await authApi.get(`${API_URL}/admin/users?${queryParams}`);
};

// Admin only: Get user details
export const getUserDetails = async (userId) => {
  return await authApi.get(`${API_URL}/admin/users/${userId}`);
};

// Admin only: Update user
export const updateUser = async (userId, userData) => {
  return await authApi.put(`${API_URL}/admin/users/${userId}`, userData);
};

// Admin only: Delete user
export const deleteUser = async (userId) => {
  return await authApi.delete(`${API_URL}/admin/users/${userId}`);
};

// Admin only: Change user role
export const changeUserRole = async (userId, role) => {
  return await authApi.put(`${API_URL}/admin/users/${userId}/role`, { role });
};
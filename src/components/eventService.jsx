import authApi from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get all events (paginated)
export const getEvents = async (page = 1, limit = 10, filters = {}) => {
  const queryParams = new URLSearchParams({
    page,
    limit,
    ...filters
  });
  
  return await authApi.get(`${API_URL}/events?${queryParams}`);
};

// Get featured events for homepage
export const getFeaturedEvents = async (limit = 6) => {
  return await authApi.get(`${API_URL}/events/featured?limit=${limit}`);
};

// Get upcoming events
export const getUpcomingEvents = async (limit = 10) => {
  return await authApi.get(`${API_URL}/events/upcoming?limit=${limit}`);
};

// Get events by category
export const getEventsByCategory = async (categoryId, page = 1, limit = 10) => {
  return await authApi.get(`${API_URL}/events/category/${categoryId}?page=${page}&limit=${limit}`);
};

// Get events by location
export const getEventsByLocation = async (locationId, page = 1, limit = 10) => {
  return await authApi.get(`${API_URL}/events/location/${locationId}?page=${page}&limit=${limit}`);
};

// Search events
export const searchEvents = async (query, page = 1, limit = 10) => {
  return await authApi.get(`${API_URL}/events/search?q=${query}&page=${page}&limit=${limit}`);
};

// Get a single event by ID
export const getEventById = async (id) => {
  return await authApi.get(`${API_URL}/events/${id}`);
};

// Create a new event (requires auth)
export const createEvent = async (eventData) => {
  return await authApi.post(`${API_URL}/events`, eventData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Update an event (requires auth + ownership)
export const updateEvent = async (id, eventData) => {
  return await authApi.put(`${API_URL}/events/${id}`, eventData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Delete an event (requires auth + ownership)
export const deleteEvent = async (id) => {
  return await authApi.delete(`${API_URL}/events/${id}`);
};

// Register for an event (requires auth)
export const registerForEvent = async (eventId) => {
  return await authApi.post(`${API_URL}/events/${eventId}/register`);
};

// Cancel registration for an event (requires auth)
export const cancelEventRegistration = async (eventId) => {
  return await authApi.delete(`${API_URL}/events/${eventId}/register`);
};

// Get all registrations for an event (organizer only)
export const getEventRegistrations = async (eventId, page = 1, limit = 10) => {
  return await authApi.get(`${API_URL}/events/${eventId}/registrations?page=${page}&limit=${limit}`);
};

// Export registrations to CSV (organizer only)
export const exportRegistrationsToCSV = async (eventId) => {
  return await authApi.get(`${API_URL}/events/${eventId}/export-registrations`, {
    responseType: 'blob'
  });
};

// Add a review/rating to an event (requires auth)
export const addEventReview = async (eventId, reviewData) => {
  return await authApi.post(`${API_URL}/events/${eventId}/reviews`, reviewData);
};

// Get all reviews for an event
export const getEventReviews = async (eventId, page = 1, limit = 10) => {
  return await authApi.get(`${API_URL}/events/${eventId}/reviews?page=${page}&limit=${limit}`);
};

// Get events created by the current user (requires auth)
export const getMyEvents = async (page = 1, limit = 10, status = 'all') => {
  return await authApi.get(`${API_URL}/events/my-events?page=${page}&limit=${limit}&status=${status}`);
};

// Get events the current user is registered for (requires auth)
export const getMyRegisteredEvents = async (page = 1, limit = 10, status = 'all') => {
  return await authApi.get(`${API_URL}/events/my-registrations?page=${page}&limit=${limit}&status=${status}`);
};

// Upload document for an event (requires auth + ownership)
export const uploadEventDocument = async (eventId, document) => {
  const formData = new FormData();
  formData.append('document', document);
  
  return await authApi.post(`${API_URL}/events/${eventId}/documents`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Delete document from an event (requires auth + ownership)
export const deleteEventDocument = async (eventId, documentId) => {
  return await authApi.delete(`${API_URL}/events/${eventId}/documents/${documentId}`);
};

// Get all categories
export const getCategories = async () => {
  return await authApi.get(`${API_URL}/categories`);
};

// Get all locations
export const getLocations = async () => {
  return await authApi.get(`${API_URL}/locations`);
};
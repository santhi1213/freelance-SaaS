// FeaturedEvents.jsx
import React, { useState, useEffect } from 'react';
import { 
  getFeaturedEvents, 
  setEventFeatured 
} from '../services/adminService';

const FeaturedEvents = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchFeaturedEvents();
  }, [currentPage]);

  const fetchFeaturedEvents = async () => {
    try {
      setLoading(true);
      const response = await getFeaturedEvents(currentPage, 10);
      setFeaturedEvents(response.data.events);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching featured events:', error);
      setError('Failed to load featured events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (eventId, currentStatus) => {
    try {
      setLoading(true);
      await setEventFeatured(eventId, !currentStatus);
      setSuccess(`Event ${currentStatus ? 'removed from' : 'added to'} featured list successfully`);
      fetchFeaturedEvents();
    } catch (error) {
      console.error('Error updating featured status:', error);
      setError('Failed to update featured status. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
    }
  };

  return (
    <div className="featured-events">
      <h1>Featured Events</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="featured-events-description">
        <p>
          Featured events appear on the homepage and receive increased visibility throughout the platform.
          You can add or remove events from the featured list.
        </p>
      </div>
      
      {loading && <div className="loading">Loading featured events...</div>}
      
      {!loading && featuredEvents.length === 0 && (
        <p>No featured events found.</p>
      )}
      
      {!loading && featuredEvents.length > 0 && (
        <div className="featured-events-list">
          {featuredEvents.map((event) => (
            <div key={event._id} className="event-card">
              <div className="event-header">
                <h3>{event.title}</h3>
                <span className="event-date">
                  {new Date(event.startDate).toLocaleDateString()} - 
                  {new Date(event.endDate).toLocaleDateString()}
                </span>
              </div>
              
              <div className="event-details">
                <p><strong>Organizer:</strong> {event.organizer.name}</p>
                <p><strong>Category:</strong> {event.category?.name || 'Uncategorized'}</p>
                <p><strong>Location:</strong> {event.location?.name || 'Online'}</p>
                <p className="event-description">{event.description.substring(0, 150)}...</p>
              </div>
              
              <div className="event-pricing">
                <p><strong>Price:</strong> {event.price > 0 ? `$${event.price.toFixed(2)}` : 'Free'}</p>
                <p><strong>Capacity:</strong> {event.capacity} attendees</p>
              </div>
              
              <div className="event-actions">
                <button 
                  onClick={() => handleToggleFeatured(event._id, event.featured)}
                  className={event.featured ? "unfeatured-btn" : "featured-btn"}
                  disabled={loading}
                >
                  {event.featured ? "Remove from Featured" : "Add to Featured"}
                </button>
                <button className="view-details-btn">View Full Details</button>
              </div>
            </div>
          ))}
          
          <div className="pagination">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedEvents;
// EventsManager.jsx
import React, { useState, useEffect } from 'react';
import { 
  getPendingEvents, 
  approveEvent, 
  rejectEvent 
} from '../services/adminService';

const EventsManager = () => {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPendingEvents();
  }, [currentPage]);

  const fetchPendingEvents = async () => {
    try {
      setLoading(true);
      const response = await getPendingEvents(currentPage, 10);
      setPendingEvents(response.data.events);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching pending events:', error);
      setError('Failed to load pending events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveEvent = async (eventId) => {
    try {
      setLoading(true);
      await approveEvent(eventId);
      setSuccess('Event approved successfully');
      fetchPendingEvents();
    } catch (error) {
      console.error('Error approving event:', error);
      setError('Failed to approve event. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
    }
  };

  const showRejectModal = (event) => {
    setSelectedEvent(event);
    setRejectReason('');
  };

  const handleRejectEvent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await rejectEvent(selectedEvent._id, rejectReason);
      setSuccess('Event rejected successfully');
      setSelectedEvent(null);
      fetchPendingEvents();
    } catch (error) {
      console.error('Error rejecting event:', error);
      setError('Failed to reject event. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
    }
  };

  return (
    <div className="events-manager">
      <h1>Pending Events</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      {loading && <div className="loading">Loading pending events...</div>}
      
      {!loading && pendingEvents.length === 0 && (
        <p>No pending events found.</p>
      )}
      
      {!loading && pendingEvents.length > 0 && (
        <div className="pending-events-list">
          {pendingEvents.map((event) => (
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
                  onClick={() => handleApproveEvent(event._id)}
                  className="approve-btn"
                  disabled={loading}
                >
                  Approve
                </button>
                <button 
                  onClick={() => showRejectModal(event)}
                  className="reject-btn"
                  disabled={loading}
                >
                  Reject
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
      
      {selectedEvent && (
        <div className="reject-modal">
          <div className="reject-modal-content">
            <h2>Reject Event</h2>
            <h3>{selectedEvent.title}</h3>
            
            <form onSubmit={handleRejectEvent}>
              <div className="form-group">
                <label htmlFor="reject-reason">Reason for Rejection</label>
                <textarea
                  id="reject-reason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  required
                  placeholder="Please provide a reason for rejection..."
                  rows="4"
                />
              </div>
              
              <div className="modal-actions">
                <button type="submit" disabled={loading} className="reject-confirm-btn">
                  {loading ? 'Rejecting...' : 'Confirm Rejection'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setSelectedEvent(null)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsManager;
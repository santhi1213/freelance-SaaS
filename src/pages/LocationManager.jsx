// LocationsManager.jsx
import React, { useState, useEffect } from 'react';
import { 
  getLocations, 
  createLocation, 
  updateLocation, 
  deleteLocation 
} from '../services/adminService';

const LocationsManager = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingLocation, setEditingLocation] = useState(null);
  const [newLocation, setNewLocation] = useState({ 
    name: '', 
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    capacity: 0
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchLocations();
  }, [currentPage]);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await getLocations(currentPage, 10);
      setLocations(response.data.locations);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setError('Failed to load locations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLocation = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createLocation(newLocation);
      setNewLocation({ 
        name: '', 
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        capacity: 0
      });
      setSuccess('Location created successfully');
      fetchLocations();
    } catch (error) {
      console.error('Error creating location:', error);
      setError('Failed to create location. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
    }
  };

  const handleUpdateLocation = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateLocation(editingLocation._id, editingLocation);
      setSuccess('Location updated successfully');
      setEditingLocation(null);
      fetchLocations();
    } catch (error) {
      console.error('Error updating location:', error);
      setError('Failed to update location. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess('');
        setError('');
      }, 3000);
    }
  };

  const handleDeleteLocation = async (locationId) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      try {
        setLoading(true);
        await deleteLocation(locationId);
        setSuccess('Location deleted successfully');
        fetchLocations();
      } catch (error) {
        console.error('Error deleting location:', error);
        setError('Failed to delete location. Please try again.');
      } finally {
        setLoading(false);
        setTimeout(() => {
          setSuccess('');
          setError('');
        }, 3000);
      }
    }
  };

  const handleInputChange = (e, isEditMode = false) => {
    const { name, value } = e.target;
    const processedValue = name === 'capacity' ? parseInt(value, 10) || 0 : value;
    
    if (isEditMode) {
      setEditingLocation({
        ...editingLocation,
        [name]: processedValue
      });
    } else {
      setNewLocation({
        ...newLocation,
        [name]: processedValue
      });
    }
  };

  return (
    <div className="locations-manager">
      <h1>Manage Locations</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="locations-form-container">
        <h2>Add New Location</h2>
        <form onSubmit={handleCreateLocation}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newLocation.name}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={newLocation.address}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={newLocation.city}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            
            <div className="form-group half">
              <label htmlFor="state">State/Province</label>
              <input
                type="text"
                id="state"
                name="state"
                value={newLocation.state}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={newLocation.country}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            
            <div className="form-group half">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={newLocation.postalCode}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={newLocation.capacity}
              onChange={(e) => handleInputChange(e)}
              min="0"
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Location'}
          </button>
        </form>
      </div>
      
      <div className="locations-list">
        <h2>Existing Locations</h2>
        
        {loading && <div className="loading">Loading locations...</div>}
        
        {!loading && locations.length === 0 && (
          <p>No locations found.</p>
        )}
        
        {!loading && locations.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Country</th>
                <th>Capacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location._id}>
                  <td>{location.name}</td>
                  <td>{location.address}</td>
                  <td>{location.city}</td>
                  <td>{location.country}</td>
                  <td>{location.capacity}</td>
                  <td>
                    <button 
                      onClick={() => setEditingLocation(location)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteLocation(location._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
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
      
      {editingLocation && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Location</h2>
            <form onSubmit={handleUpdateLocation}>
              <div className="form-group">
                <label htmlFor="edit-name">Name</label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={editingLocation.name}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-address">Address</label>
                <input
                  type="text"
                  id="edit-address"
                  name="address"
                  value={editingLocation.address}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="edit-city">City</label>
                  <input
                    type="text"
                    id="edit-city"
                    name="city"
                    value={editingLocation.city}
                    onChange={(e) => handleInputChange(e, true)}
                    required
                  />
                </div>
                
                <div className="form-group half">
                  <label htmlFor="edit-state">State/Province</label>
                  <input
                    type="text"
                    id="edit-state"
                    name="state"
                    value={editingLocation.state}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="edit-country">Country</label>
                  <input
                    type="text"
                    id="edit-country"
                    name="country"
                    value={editingLocation.country}
                    onChange={(e) => handleInputChange(e, true)}
                    required
                  />
                </div>
                
                <div className="form-group half">
                  <label htmlFor="edit-postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="edit-postalCode"
                    name="postalCode"
                    value={editingLocation.postalCode}
                    onChange={(e) => handleInputChange(e, true)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="edit-capacity">Capacity</label>
                <input
                  type="number"
                  id="edit-capacity"
                  name="capacity"
                  value={editingLocation.capacity}
                  onChange={(e) => handleInputChange(e, true)}
                  min="0"
                />
              </div>
              
              <div className="modal-actions">
                <button type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Update'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setEditingLocation(null)}
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

export default LocationsManager;
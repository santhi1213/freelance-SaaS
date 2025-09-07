import React, { useState, useEffect } from 'react';
import {
  FaTimes,
  FaPlus,
  FaCalendarAlt,
  FaUser,
  FaExclamationTriangle,
  FaInfoCircle,
  FaPaperclip,
  FaTrash,
  FaSpinner
} from 'react-icons/fa';
import PopupMessage from './PopupMessage';

const AddTaskModal = ({
  isOpen,
  onClose,
  project,
  darkMode,
  onTaskCreated
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignedTo: '',
    bidId: ''
  });
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  // Get accepted bids from project data
  const getAcceptedBids = () => {
    if (!project?.bids) return [];
    return project.bids.filter(bid => bid.status === 'accepted');
  };

  const acceptedBids = getAcceptedBids();

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        assignedTo: '',
        bidId: ''
      });
      setAttachments([]);
      setError('');
    }
  }, [isOpen]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-select assignedTo when bid is selected
    if (name === 'bidId') {
      const selectedBid = acceptedBids.find(bid => bid.id === value);
      if (selectedBid) {
        setFormData(prev => ({
          ...prev,
          assignedTo: selectedBid.freelancer?.id || ''
        }));
      }
    }
  };

  // Handle file attachments
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif',
      'application/pdf', 'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setPopup({ show: true, type: 'error', message: `File ${file.name} is too large. Maximum size is 10MB.` });
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        setPopup({ show: true, type: 'error', message: `File type ${file.type} is not allowed.` });
        return false;
      }
      return true;
    });

    setAttachments(prev => [...prev, ...validFiles]);
  };

  // Remove attachment
  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Task title is required');
      return;
    }

    if (!formData.bidId) {
      setError('Please select a bid/freelancer');
      return;
    }

    if (!formData.assignedTo) {
      setError('Assigned user is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('projectId', project.id);
      formDataToSend.append('bidId', formData.bidId);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('priority', formData.priority);
      formDataToSend.append('assignedTo', formData.assignedTo);

      if (formData.dueDate) {
        formDataToSend.append('dueDate', formData.dueDate);
      }

      // Add attachments
      attachments.forEach(file => {
        formDataToSend.append('attachments', file);
      });

      const response = await fetch('https://freelance-backend-0tw4.onrender.com/api/tasks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Call the callback to refresh tasks list
        if (onTaskCreated) {
          onTaskCreated(result.data);
        }

        // Reset form and close modal
        setFormData({
          title: '',
          description: '',
          priority: 'medium',
          dueDate: '',
          assignedTo: '',
          bidId: ''
        });
        setAttachments([]);
        onClose();
        setPopup({ show: true, type: 'success', message: 'Task created successfully!' });
      } else {
        setError(result.message || 'Failed to create task');
      }
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:bg-opacity-20';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20';
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:bg-opacity-20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className={`w-full max-w-2xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto`}>
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Add New Task</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Project: {project?.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            >
              <FaTimes />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
              <FaExclamationTriangle className="mr-2" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Task Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Task Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter task title..."
                className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                required
              />
            </div>

            {/* Bid/Freelancer Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Assign to Freelancer *
              </label>
              {acceptedBids.length > 0 ? (
                <select
                  name="bidId"
                  value={formData.bidId}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                    }`}
                  required
                >
                  <option value="">Select a freelancer...</option>
                  {acceptedBids.map(bid => (
                    <option key={bid.id} value={bid.id}>
                      {bid.freelancer?.fullName || 'Unknown'} - ${bid.amount} ({bid.deliveryTime})
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20 border border-yellow-400 text-yellow-700 dark:text-yellow-300 rounded-lg flex items-center">
                  <FaInfoCircle className="mr-2" />
                  No accepted bids found for this project. You need to accept a bid first to create tasks.
                </div>
              )}
            </div>

            {/* Show selected freelancer info */}
            {formData.bidId && (
              <div className={`p-3 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} border border-blue-200 dark:border-gray-600 rounded-lg`}>
                {(() => {
                  const selectedBid = acceptedBids.find(bid => bid.id === formData.bidId);
                  return selectedBid ? (
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-blue-500" />
                      <span className="font-medium">
                        Assigned to: {selectedBid.freelancer?.fullName}
                      </span>
                      <span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        ({selectedBid.freelancer?.email})
                      </span>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the task details..."
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
              />
            </div>

            {/* Priority and Due Date Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                    }`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="mt-1">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${getPriorityColor(formData.priority)}`}>
                    {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)} Priority
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <FaCalendarAlt className="inline mr-1" />
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                    }`}
                />
              </div>
            </div>

            {/* File Attachments */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <FaPaperclip className="inline mr-1" />
                Attachments
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                accept=".pdf,application/pdf"
              />
              <p className="text-xs text-gray-500 mt-1">
                Max 5 files, 10MB each. Supported: Images, PDF, Word documents, Text files
              </p>

              {/* Attachment List */}
              {attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className={`flex items-center justify-between p-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
                      <div className="flex items-center">
                        <FaPaperclip className="text-gray-500 mr-2" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({Math.round(file.size / 1024)}KB)</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Project and Bid Statistics */}
            <div className={`p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
              <h4 className="font-medium mb-2">Project Information</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Total Bids:</span> {project?.bidStatistics?.total || 0}
                </div>
                <div>
                  <span className="font-medium">Accepted Bids:</span> {acceptedBids.length}
                </div>
                <div>
                  <span className="font-medium">Budget:</span> {project?.budget}
                </div>
                <div>
                  <span className="font-medium">Deadline:</span> {project?.deadline}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button
                type="submit"
                disabled={loading || acceptedBids.length === 0}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Creating Task...
                  </>
                ) : (
                  <>
                    <FaPlus className="mr-2" />
                    Create Task
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
          {popup.show && (
            <PopupMessage
              type={popup.type}
              message={popup.message}
              onClose={() => setPopup({ show: false, type: '', message: '' })}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostProjectModal from '../Modals/PostProject';
import { 
  FaPlus, 
  FaFilter, 
  FaSearch, 
  FaChevronDown, 
  FaChevronUp, 
  FaEllipsisV,
  FaRegCalendarAlt,
  FaRegClock,
  FaMoneyBillWave,
  FaTasks,
  FaComment,
  FaRegFile,
  FaCheck,
  FaUser,
  FaTimes,
  FaEye,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';

const UploadedProjects = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('active');
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    sortBy: 'createdAt'
  });
  const [showProjectDetails, setShowProjectDetails] = useState(null);
  const [myProjects, setMyProjects] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [postProject, setPostProject] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProjects: 0
  });
  
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  // API call headers
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  // Fetch user's projects from API
  const fetchMyProjects = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/projects/my-projects/${userId}?page=${page}&limit=10&status=${filters.status || 'all'}`, {
        method: 'GET',
        headers: getHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      console.log(data)
      if (data.success) {
        // Transform API response to match the component's expected format
        const transformedProjects = data.data.map(project => ({
          id: project._id,
          title: project.title,
          description: project.description,
          status: project.status || 'Active',
          budget: `${project.budget_from || 0} - ${project.budget_to || 0}`,
          deadline: new Date(project.deadline).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }),
          startDate: new Date(project.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }),
          progress: Math.floor(Math.random() * 100), // Since progress isn't in API, using random for demo
          client: {
            name: project.clientName || 'Client',
            profile: '/default-avatar.png',
            rating: 4.5
          },
          milestones: [
            { name: 'Project Setup', completed: true },
            { name: 'Development Phase', completed: false },
            { name: 'Testing & Review', completed: false },
            { name: 'Final Delivery', completed: false }
          ],
          bids: project.bids || [],
          bidStatistics: project.bidStatistics || {
            total: 0,
            pending: 0,
            accepted: 0,
            rejected: 0
          },
          createdAt: project.createdAt
        }));

        setMyProjects(transformedProjects);
        setPagination(data.pagination);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's bids from API
  const fetchMyBids = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/projects/myBids', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          userId: userId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bids');
      }

      const data = await response.json();
      
      if (data.success && data.bids) {
        // Transform API response to match the component's expected format
        const transformedBids = data.bids.map(bid => ({
          id: bid._id,
          projectTitle: bid.project.title,
          projectDescription: bid.project.description,
          projectId: bid.project._id,
          client: bid.project.clientName,
          submittedDate: new Date(bid.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }),
          status: bid.status === 'pending' ? 'Under Review' : 
                  bid.status === 'accepted' ? 'Shortlisted' : 
                  bid.status === 'rejected' ? 'Rejected' : 'Under Review',
          bidAmount: `${bid.amount.toLocaleString()}`,
          proposedDuration: bid.deliveryTime,
          coverLetter: bid.coverLetter,
          createdAt: bid.createdAt
        }));

        setMyBids(transformedBids);
      } else {
        setMyBids([]);
      }
    } catch (err) {
      setError(err.message);
      setMyBids([]);
      console.error('Error fetching bids:', err);
    } finally {
      setLoading(false);
    }
  };
// const updateBidStatus = async (bidId, status, message = '') => {
//   try {
//     console.log('Updating bid status:', { bidId, status, message });
    
//     const response = await fetch(`http://localhost:5000/api/bids/${bidId}/status`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify({ 
//         status, 
//         message: message || '' 
//       })
//     });

//     console.log('Response status:', response.status);
//     console.log('Response headers:', response.headers);

//     // Check if response is ok
//     if (!response.ok) {
//       const errorData = await response.text();
//       console.error('Error response:', errorData);
//       throw new Error(`HTTP ${response.status}: ${errorData}`);
//     }

//     // Check if response has content
//     const contentType = response.headers.get('content-type');
//     let data;
    
//     if (contentType && contentType.includes('application/json')) {
//       data = await response.json();
//     } else {
//       // If no JSON content, create a success response
//       data = { success: true, message: `Bid ${status} successfully` };
//     }

//     console.log('API Response:', data);
    
//     if (data.success) {
//       // Refresh projects to get updated bid information
//       await fetchMyProjects();
//       alert(data.message || `Bid ${status} successfully!`);
//     } else {
//       throw new Error(data.message || `Failed to ${status} bid`);
//     }
    
//   } catch (err) {
//     console.error('Error updating bid status:', err);
//     alert(`Failed to ${status} bid: ${err.message}`);
//   }
// };

// Updated startConversation function with better error handling


const updateBidStatus = async (bidId, status, message = '') => {
  try {
    console.log('Updating bid status:', { bidId, status, message });
    
    // Ensure we have a default message
    const defaultMessage = message || (status === 'accepted' ? 'Your bid has been accepted!' : 'Thank you for your proposal.');
    
    const requestBody = { 
      status, 
      message: defaultMessage
    };
    
    console.log('Request body:', requestBody);
    
    const response = await fetch(`http://localhost:5000/api/bids/${bidId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    // Check if response is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      
      // Handle specific CORS error
      if (response.status === 0 || errorText.includes('CORS')) {
        throw new Error('CORS error - please check backend configuration');
      }
      
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    // Check if response has content
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      const responseText = await response.text();
      if (responseText.trim()) {
        data = JSON.parse(responseText);
      } else {
        data = { success: true, message: `Bid ${status} successfully` };
      }
    } else {
      data = { success: true, message: `Bid ${status} successfully` };
    }

    console.log('API Response:', data);
    
    if (data.success) {
      // Refresh projects to get updated bid information
      await fetchMyProjects();
      alert(data.message || `Bid ${status} successfully!`);
    } else {
      throw new Error(data.message || `Failed to ${status} bid`);
    }
    
  } catch (err) {
    console.error('Error updating bid status:', err);
    
    // Better error messages
    if (err.message.includes('CORS')) {
      alert('Connection error: Please ensure the backend server is running and CORS is configured properly.');
    } else if (err.message.includes('fetch')) {
      alert('Network error: Unable to connect to the server. Please check if the backend is running.');
    } else {
      alert(`Failed to ${status} bid: ${err.message}`);
    }
  }
};

const startConversation = async (participantId, projectId, initialMessage = '') => {
  try {
    console.log('Starting conversation:', { participantId, projectId, initialMessage });
    
    const response = await fetch('http://localhost:5000/api/conversations/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        participantId,
        projectId,
        initialMessage: initialMessage || 'Hello! I would like to discuss the project details.'
      })
    });

    console.log('Conversation response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Conversation error response:', errorData);
      throw new Error(`HTTP ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    console.log('Conversation created:', data);
    
    if (data.success) {
      alert('Conversation started successfully!');
      // You can redirect to chat page or open chat modal here
      // window.location.href = `/chat/${data.data._id}`;
    } else {
      throw new Error(data.message || 'Failed to create conversation');
    }
    
  } catch (err) {
    console.error('Error creating conversation:', err);
    alert(`Failed to start conversation: ${err.message}`);
  }
};

  // Fetch data when component mounts or when switching tabs
  useEffect(() => {
    if (activeTab === 'active') {
      fetchMyProjects();
    } else {
      fetchMyBids();
    }
  }, [activeTab, filters.status]);

  // Toggle filter expansion
  const toggleFilterExpansion = () => setIsFilterExpanded(prev => !prev);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: '',
      sortBy: 'createdAt'
    });
    setSearchQuery('');
  };

  // Filter and sort projects/bids locally (API handles most filtering, this is for search)
  const filteredProjects = (activeTab === 'active' ? myProjects : myBids)
    .filter(item => {
      const matchesSearch = !searchQuery || 
        (activeTab === 'active' 
          ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
          : item.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.projectDescription.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesSearch;
    })
    .sort((a, b) => {
      if (activeTab === 'active') {
        switch (filters.sortBy) {
          case 'deadline':
            return new Date(a.deadline) - new Date(b.deadline);
          case 'budget':
            const abudget = parseInt(a.budget.replace(/[^0-9]/g, ''));
            const bbudget = parseInt(b.budget.replace(/[^0-9]/g, ''));
            return bbudget - abudget;
          case 'progress':
            return b.progress - a.progress;
          case 'createdAt':
          default:
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      } else {
        switch (filters.sortBy) {
          case 'date':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'budget':
            const abid = parseInt(b.bidAmount.replace(/[^0-9]/g, ''));
            const bbid = parseInt(a.bidAmount.replace(/[^0-9]/g, ''));
            return abid - bbid;
          default:
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
      }
    });
    console.log(filteredProjects)

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
      case 'Active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-300';
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-20 dark:text-yellow-300';
      case 'Under Review':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-20 dark:text-purple-300';
      case 'Shortlisted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const closePostProject = () => {
    setPostProject(false);
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Page Header */}
      <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Projects</h1>
              <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Manage your active projects and proposals
              </p>
            </div>
            <button 
              onClick={() => setPostProject(true)}
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FaPlus className="mr-2" />
              Post a New Project
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`py-2 px-4 text-center ${
              activeTab === 'active' 
                ? 'border-b-2 border-blue-600 font-medium text-blue-600' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('active')}
          >
            My Projects ({myProjects.length})
          </button>
          <button
            className={`py-2 px-4 text-center ${
              activeTab === 'proposals' 
                ? 'border-b-2 border-blue-600 font-medium text-blue-600' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('proposals')}
          >
            My Bids ({myBids.length})
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4">
            <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-xl overflow-hidden sticky top-24`}>
              <div 
                className="py-4 px-6 flex justify-between items-center cursor-pointer border-b border-gray-200 dark:border-gray-700"
                onClick={toggleFilterExpansion}
              >
                <div className="flex items-center gap-2 font-semibold">
                  <FaFilter className="text-blue-600 dark:text-blue-400" />
                  <span>Filter {activeTab === 'active' ? 'Projects' : 'Bids'}</span>
                </div>
                <div>
                  {isFilterExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              
              {isFilterExpanded && (
                <div className="p-6 space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="search">
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="search"
                        placeholder={`Search ${activeTab === 'active' ? 'projects' : 'bids'}...`}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                        }`}
                      />
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="status">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                      className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    >
                      <option value="">All Statuses</option>
                      {activeTab === 'active' ? (
                        <>
                          <option value="active">Active</option>
                          <option value="completed">Completed</option>
                          <option value="on-hold">On Hold</option>
                        </>
                      ) : (
                        <>
                          <option value="pending">Under Review</option>
                          <option value="accepted">Shortlisted</option>
                          <option value="rejected">Rejected</option>
                        </>
                      )}
                    </select>
                  </div>
                  
                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="sortBy">
                      Sort By
                    </label>
                    <select
                      id="sortBy"
                      name="sortBy"
                      value={filters.sortBy}
                      onChange={handleFilterChange}
                      className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    >
                      {activeTab === 'active' ? (
                        <>
                          <option value="createdAt">Date Created (Newest)</option>
                          <option value="deadline">Deadline (Upcoming)</option>
                          <option value="budget">Budget (Highest)</option>
                          <option value="progress">Progress (Highest)</option>
                        </>
                      ) : (
                        <>
                          <option value="date">Date (Newest)</option>
                          <option value="budget">Bid Amount (Highest)</option>
                        </>
                      )}
                    </select>
                  </div>
                  
                  {/* Clear Filters Button */}
                  <button 
                    onClick={clearFilters}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                  >
                    Clear All Filters
                  </button>

                  {/* Refresh Button */}
                  <button 
                    onClick={activeTab === 'active' ? fetchMyProjects : fetchMyBids}
                    disabled={loading}
                    className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium"
                  >
                    {loading ? 'Refreshing...' : `Refresh ${activeTab === 'active' ? 'Projects' : 'Bids'}`}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {postProject && (
            <PostProjectModal onClose={closePostProject}/>
          )}
          
          {/* Projects Grid */}
          <div className="lg:w-3/4">
            {/* Loading State */}
            {loading && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Loading {activeTab === 'active' ? 'projects' : 'bids'}...
                </p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold mb-2 text-red-600">Error</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{error}</p>
                <button 
                  onClick={activeTab === 'active' ? fetchMyProjects : fetchMyBids}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Active Projects Tab */}
            {activeTab === 'active' && !loading && !error && (
              <>
                {filteredProjects.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {filteredProjects.map(project => (
                      <div 
                        key={project.id} 
                        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold">{project.title}</h3>
                            <div className="relative">
                              <button 
                                onClick={() => {}}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                              >
                                <FaEllipsisV />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center mt-2">
                            <img 
  src={project.client.profile} 
  alt={project.client.name} 
  className="w-8 h-8 rounded-full mr-2"
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTggMEE4IDAgMCAwIDAgOEE4IDggMCAwIDAgOCAxNkE4IDggMCAwIDAgMTYgOEE4IDggMCAwIDAgOCAwWk04IDNBMiAyIDAgMCAxIDEwIDVBMiAyIDAgMCAxIDggN0EyIDIgMCAwIDEgNiA1QTIgMiAwIDAgMSA4IDNaTTggMTMuN0M2LjUgMTMuNyA1LjIgMTIuOSA0LjQgMTEuN0M0LjUgMTAuNSA2LjggOS44IDggOS44QzkuMiA5LjggMTEuNSAxMC41IDExLjYgMTEuN0MxMC44IDEyLjkgOS41IDEzLjcgOCAxMy43WiIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4KPC9zdmc+'; // Base64 encoded default avatar SVG
  }}
/>
                            <div>
                              <p className="text-sm font-medium">{project.client.name}</p>
                              <div className="flex items-center text-xs text-yellow-500">
                                {[...Array(Math.floor(project.client.rating))].map((_, i) => (
                                  <span key={i}>★</span>
                                ))}
                                <span className="text-gray-500 dark:text-gray-400 ml-1">({project.client.rating})</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                          
                          <p className={`mt-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
                            {project.description}
                          </p>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                <FaRegCalendarAlt className="text-blue-500 mr-2" />
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Deadline:</span>
                              </div>
                              <span className="font-medium">{project.deadline}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                <FaMoneyBillWave className="text-green-500 mr-2" />
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Budget:</span>
                              </div>
                              <span className="font-medium">{project.budget}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                <FaEye className="text-purple-500 mr-2" />
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Bids:</span>
                              </div>
                              <span className="font-medium">{project.bidStatistics.total}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-600 rounded-full" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex gap-2">
                            <button 
                              onClick={() => setShowProjectDetails(project.id)}
                              className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                            >
                              View Details
                            </button>
                            <Link 
                              to="/tasklist"
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm"
                            >
                              <FaTasks />
                            </Link>
                            <Link 
                              to="/inbox"
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm"
                            >
                              <FaComment />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                    <FaRegFile className="mx-auto text-gray-400 text-5xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                    <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {searchQuery || filters.status
                        ? 'Try adjusting your filters or search query' 
                        : 'You have no active projects yet.'}
                    </p>
                    {(searchQuery || filters.status) && (
                      <button 
                        onClick={clearFilters}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
            
            {/* Bids Tab */}
            {activeTab === 'proposals' && !loading && !error && (
              <>
                {filteredProjects.length > 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 w-[1200px]">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className={`text-left ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b border-gray-200 dark:border-gray-700`}>
                          <tr>
                            <th className="py-3 px-4 font-semibold text-sm">Project</th>
                            <th className="py-3 px-4 font-semibold text-sm">Client</th>
                            <th className="py-3 px-4 font-semibold text-sm">Submitted</th>
                            <th className="py-3 px-4 font-semibold text-sm">Status</th>
                            <th className="py-3 px-4 font-semibold text-sm">Bid Amount</th>
                            <th className="py-3 px-4 font-semibold text-sm">Duration</th>
                            <th className="py-3 px-4 font-semibold text-sm"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProjects.map(bid => (
                            <tr key={bid.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                              <td className="py-4 px-4">
                                <div>
                                  <div className="font-medium uppercase">{bid.projectTitle}</div>
                                  <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'} line-clamp-2`}>
                                    {bid.projectDescription}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 uppercase">{bid.client}</td>
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <FaRegCalendarAlt className="text-blue-500 mr-2" />
                                  <span>{bid.submittedDate}</span>
                                  </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(bid.status)}`}>
                                  {bid.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <FaMoneyBillWave className="text-green-500 mr-2" />
                                  <span className="font-medium">${bid.bidAmount}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <FaRegClock className="text-orange-500 mr-2" />
                                  <span>{bid.proposedDuration}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <Link 
                                    to={`/project/${bid.projectId}`}
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                                  >
                                    View Project
                                  </Link>
                                  <button 
                                    onClick={() => setShowProjectDetails(bid.id)}
                                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-xs"
                                  >
                                    Details
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                    <FaRegFile className="mx-auto text-gray-400 text-5xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No bids found</h3>
                    <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {searchQuery || filters.status
                        ? 'Try adjusting your filters or search query' 
                        : 'You have not submitted any bids yet.'}
                    </p>
                    {(searchQuery || filters.status) && (
                      <button 
                        onClick={clearFilters}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Pagination */}
            {activeTab === 'active' && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fetchMyProjects(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {[...Array(pagination.totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => fetchMyProjects(index + 1)}
                      className={`px-3 py-2 rounded-lg ${
                        pagination.currentPage === index + 1
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => fetchMyProjects(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {showProjectDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Project Details</h2>
                <button 
                  onClick={() => setShowProjectDetails(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-2xl"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            
            {(() => {
              const project = activeTab === 'active' 
                ? myProjects.find(p => p.id === showProjectDetails)
                : myBids.find(b => b.id === showProjectDetails);
              
              if (!project) return null;
              
              if (activeTab === 'active') {
                return (
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                        {project.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <FaRegCalendarAlt className="text-blue-500 mr-3" />
                            <div>
                              <span className="text-sm text-gray-500">Start Date</span>
                              <p className="font-medium">{project.startDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaRegCalendarAlt className="text-red-500 mr-3" />
                            <div>
                              <span className="text-sm text-gray-500">Deadline</span>
                              <p className="font-medium">{project.deadline}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaMoneyBillWave className="text-green-500 mr-3" />
                            <div>
                              <span className="text-sm text-gray-500">Budget</span>
                              <p className="font-medium">${project.budget}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <FaUser className="text-purple-500 mr-3" />
                            <div>
                              <span className="text-sm text-gray-500">Client</span>
                              <p className="font-medium">{project.client.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaEye className="text-orange-500 mr-3" />
                            <div>
                              <span className="text-sm text-gray-500">Total Bids</span>
                              <p className="font-medium">{project.bidStatistics.total}</p>
                            </div>
                          </div>
                          <div>
                            <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">Project Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full transition-all duration-300" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Milestones */}
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Project Milestones</h4>
                        <div className="space-y-3">
                          {project.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-center">
                              {milestone.completed ? (
                                <FaCheckCircle className="text-green-500 mr-3" />
                              ) : (
                                <FaTimesCircle className="text-gray-400 mr-3" />
                              )}
                              <span className={milestone.completed ? 'font-medium' : 'text-gray-500'}>
                                {milestone.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Bids Section */}
                      {project.bids && project.bids.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-3">Received Bids ({project.bids.length})</h4>
                          <div className="space-y-3 max-h-60 overflow-y-auto">
                            {project.bids.map((bid, index) => (
                              <div key={index} className={`p-4 border rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <p className="font-medium">{bid.freelancerName || 'Freelancer'}</p>
                                    <p className="text-sm text-gray-500">Bid Amount: ${bid.amount}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => updateBidStatus(bid.id, 'accepted')}
                                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                                    >
                                      Accept
                                    </button>
                                    <button
                                      onClick={() => updateBidStatus(bid._id, 'rejected')}
                                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                                    >
                                      Reject
                                    </button>
                                    <button
                                      onClick={() => startConversation(bid.freelancerId, project.id)}
                                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                                    >
                                      Message
                                    </button>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {bid.coverLetter || 'No cover letter provided'}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              } else {
                // Bid details modal
                return (
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">{project.projectTitle}</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                        {project.projectDescription}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <FaUser className="text-purple-500 mr-3" />
                            <div>
                              <span className="text-sm text-gray-500">Client</span>
                              <p className="font-medium">{project.client}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaRegCalendarAlt className="text-blue-500 mr-3" />
                            <div>
                              <span className="text-sm text-gray-500">Submitted Date</span>
                              <p className="font-medium">{project.submittedDate}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <FaMoneyBillWave className="text-green-500 mr-3" />
                            <div>
                              <span className="text-sm text-gray-500">Bid Amount</span>
                              <p className="font-medium">${project.bidAmount}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaRegClock className="text-orange-500 mr-3" />
                            <div>
                              <span className="text-sm text-gray-500">Proposed Duration</span>
                              <p className="font-medium">{project.proposedDuration}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      
                      {/* Cover Letter */}
                      {project.coverLetter && (
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">Cover Letter</h4>
                          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <p className="text-sm whitespace-pre-wrap">{project.coverLetter}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-3">
                        <Link 
                          to={`/project/${project.projectId}`}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          View Full Project
                        </Link>
                        <button
                          onClick={() => startConversation(project.clientId, project.projectId)}
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          Message Client
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadedProjects;
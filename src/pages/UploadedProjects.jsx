import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddTaskModal from '../components/AddTaskModal';
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
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle
} from 'react-icons/fa';

const UploadedProjects = ({ darkMode }) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    sortBy: 'createdAt'
  });
  const [showProjectDetails, setShowProjectDetails] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  console.log(selectedProject)
  const [myProjects, setMyProjects] = useState([]);
  const [postProject, setPostProject] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProjects: 0
  });
  
  // New states for bid management in modal
  const [projectBids, setProjectBids] = useState([]);
  const [bidsLoading, setBidsLoading] = useState(false);
  const [processingBid, setProcessingBid] = useState(null);
  const [showMessageInput, setShowMessageInput] = useState(null);
  const [acceptMessage, setAcceptMessage] = useState('');
  const [rejectMessage, setRejectMessage] = useState('');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
const [selectedProjectForTask, setSelectedProjectForTask] = useState(null);
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  // API call headers
  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
// Add this function to handle opening the task modal
const handleAddTask = (project) => {
  setSelectedProjectForTask(project);
  setShowAddTaskModal(true);
};

// Add this function to handle task creation success
const handleTaskCreated = (newTask) => {
  // You can add any additional logic here like showing a success message
  console.log('New task created:', newTask);
  // Optionally refresh the projects list to show updated task counts
  fetchMyProjects();
};

// Add this function to close the task modal
const closeAddTaskModal = () => {
  setShowAddTaskModal(false);
  setSelectedProjectForTask(null);
};
const hasAcceptedBid = () => {
  return projectBids.some(bid => bid.status === 'accepted');
};
  // Helper function to map API project status to display status
  const mapProjectStatus = (apiStatus) => {
    switch (apiStatus?.toLowerCase()) {
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'on-hold':
      case 'onhold':
        return 'On Hold';
      case 'in-progress':
      case 'inprogress':
        return 'In Progress';
      default:
        return 'Active';
    }
  };

const mapBidStatus = (apiStatus) => {
  switch (apiStatus?.toLowerCase()) {
    case 'pending':
      return 'pending';
    case 'accepted':
      return 'accepted';
    case 'rejected':
      return 'rejected';
    default:
      return 'pending';
  }
};
  
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
    console.log('API Response:', data);
    
    if (data.success) {
      // Transform API response to match the component's expected format
      const transformedProjects = data.data.map(project => ({
        id: project._id,
        title: project.title,
        description: project.description,
        status: mapProjectStatus(project.status),
        budget: `${project.budget_from || 0} - ${project.budget_to || 0}`,
        deadline: project.deadline ? new Date(project.deadline).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }) : 'No deadline set',
        startDate: new Date(project.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }),
        progress: Math.floor(Math.random() * 100),
        duration: project.project_duration || 'Not specified',
        category: project.project_type || 'General',
        skills: project.req_skills || [],
        client: {
          name: project.clientName || 'Client',
          profile: '/default-avatar.png',
          rating: 4.5
        },
        bids: project.bids,
        bidStatistics: project.bidStatistics || {
          total: 0,
          pending: 0,
          accepted: 0,
          rejected: 0
        },
        createdAt: project.createdAt,
        canStartChat: project.canStartChat || false,
        // Store the raw bids data for later use
        _rawBids: project.bids || []
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

  // Handle bid status update (accept/reject)
  const handleBidStatusUpdate = async (bidId, status, message = '') => {
    setProcessingBid(bidId);
    try {
      console.log('Updating bid status:', { bidId, status, message });
      
      const defaultMessage = message || (status === 'accepted' ? 'Your bid has been accepted!' : 'Thank you for your proposal.');
      
      const response = await fetch(`http://localhost:5000/api/bids/${bidId}/status`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({
          status,
          message: defaultMessage
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${status} bid`);
      }

      const result = await response.json();
      
      // Update local state
      setProjectBids(prev => prev.map(bid => 
        bid._id === bidId 
          ? { ...bid, status: mapBidStatus(status) }
          : bid.status === 'pending' && status === 'accepted'
            ? { ...bid, status: mapBidStatus('rejected') }
            : bid
      ));

      // Reset message inputs and states
      setAcceptMessage('');
      setRejectMessage('');
      setShowMessageInput(null);

      alert(`Bid ${status} successfully!`);
      
      // Refresh projects to get updated bid statistics
      await fetchMyProjects();
    } catch (err) {
      console.error('Error updating bid status:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setProcessingBid(null);
    }
  };

  // Create chat room
 // Create chat room
const handleCreateChat = async (bid) => {
  try {
    // Get the freelancer ID from the bid
    const freelancerId = bid.freelancer?._id || bid.freelancer?.id;
    
    if (!freelancerId) {
      throw new Error('Freelancer information not available');
    }

    const response = await fetch('http://localhost:5000/api/conversations/create', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        participantId: freelancerId,
        projectId: selectedProject.id,
        initialMessage: 'Hello! I would like to discuss the project details.'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create conversation');
    }

    const data = await response.json();
    if (data.success) {
      alert('Conversation started successfully!');
      // Redirect to chat or inbox
      window.location.href = `/inbox`;
    }
  } catch (err) {
    alert('Error creating chat: ' + err.message);
    console.error('Error creating conversation:', err);
  }
};

  // Fetch data when component mounts
  useEffect(() => {
    fetchMyProjects();
  }, [filters.status]);

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

  // Filter and sort projects locally
  const filteredProjects = myProjects
    .filter(item => {
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    })
    .sort((a, b) => {
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
    });

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
      case 'pending':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-20 dark:text-purple-300';
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  // When opening the project details modal
const handleOpenProjectDetails = (projectId) => {
  const project = myProjects.find(p => p.id === projectId);
  setSelectedProject(project);
  setShowProjectDetails(projectId);
  
  // Set the bids for this project
  if (project && project._rawBids) {
    // Transform the API bid format to match component expectations
    const transformedBids = project._rawBids.map(bid => ({
      _id: bid.id || bid._id,
      amount: bid.amount,
      deliveryTime: bid.deliveryTime,
      proposal: bid.coverLetter,
      status: mapBidStatus(bid.status),
      createdAt: bid.createdAt,
      freelancer: {
        _id: bid.freelancer?.id,
        name: bid.freelancer?.fullName,
        profile: bid.freelancer?.profilePhoto || '/default-avatar.png',
        rating: bid.freelancer?.rating?.average || 0
      }
    }));
    
    setProjectBids(transformedBids);
  } else {
    setProjectBids([]);
  }
};

  const closePostProject = () => {
    setPostProject(false);
  };

  const closeProjectDetails = () => {
    setShowProjectDetails(null);
    setSelectedProject(null);
    setProjectBids([]);
    setShowMessageInput(null);
    setAcceptMessage('');
    setRejectMessage('');
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
                Manage your active projects
              </p>
            </div>
            {role === 'client' && (
              <button 
                onClick={() => setPostProject(true)}
                className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <FaPlus className="mr-2" />
                Post a New Project
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
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
                  <span>Filter Projects</span>
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
                        placeholder="Search projects..."
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
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="on-hold">On Hold</option>
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
                      <option value="createdAt">Date Created (Newest)</option>
                      <option value="deadline">Deadline (Upcoming)</option>
                      <option value="budget">Budget (Highest)</option>
                      <option value="progress">Progress (Highest)</option>
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
                    onClick={() => fetchMyProjects()}
                    disabled={loading}
                    className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium"
                  >
                    {loading ? 'Refreshing...' : 'Refresh Projects'}
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
                  Loading projects...
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
                  onClick={() => fetchMyProjects()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Projects Grid */}
            {!loading && !error && (
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
                                e.target.onerror = null;
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTggMEE4IDAgMCAwIDAgOEE4IDggMCAwIDAgOCAxNkE4IDggMCAwIDAgMTYgOEE4IDggMCAwIDAgOCAwWk04IDNBMiAyIDAgMCAxIDEwIDVBMiAyIDAgMCAxIDggN0EyIDIgMCAwIDEgNiA1QTIgMiAwIDAgMSA4IDNaTTggMTMuN0M2LjUgMTMuNyA1LjIgMTIuOSA0LjQgMTEuN0M0LjUgMTAuNSA2LjggOS44IDggOS44QzkuMiA5LjggMTEuNSAxMC41IDExLjYgMTEuN0MxMC44IDEyLjkgOS41IDEzLjcgOCAxMy43WiIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4KPC9zdmc+';
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
                              <span className="font-medium">${project.budget}</span>
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
    onClick={() => {
      handleOpenProjectDetails(project.id);
    }}
    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
  >
    View Details
  </button>
  {role === 'client' && (
    <button
      onClick={() => handleAddTask(project)}
      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm flex items-center justify-center"
      title="Add Task"
    >
      <FaPlus />
    </button>
  )}
  <Link 
    to="/tasklist"
    className="px-3 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm flex items-center justify-center"
  >
    <FaTasks />
  </Link>
  <Link 
    to="/inbox"
    className="px-3 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm flex items-center justify-center"
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

            {/* Pagination */}
            {pagination.totalPages > 1 && (
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
      {showProjectDetails && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
          <div className={`w-full max-w-6xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto`}>
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-3 py-1 rounded-full ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status}
                    </span>
                    <div className="flex items-center">
                      <FaRegCalendarAlt className="mr-1" />
                      <span>Created: {selectedProject.startDate}</span>
                    </div>
                    <div className="flex items-center">
                      <FaMoneyBillWave className="mr-1" />
                      <span>Budget: ${selectedProject.budget}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeProjectDetails}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Project Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Project Description</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  {selectedProject.description}
                </p>
              </div>

              {/* Project Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Project Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Category:</span>
                      <span className="font-medium">{selectedProject.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Duration:</span>
                      <span className="font-medium">{selectedProject.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Deadline:</span>
                      <span className="font-medium">{selectedProject.deadline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Progress:</span>
                      <span className="font-medium">{selectedProject.progress}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Bid Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Total Bids:</span>
                      <span className="font-medium">{selectedProject.bidStatistics.total}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Pending:</span>
                      <span className="font-medium text-yellow-600">{selectedProject.bidStatistics.pending}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Accepted:</span>
                      <span className="font-medium text-green-600">{selectedProject.bidStatistics.accepted}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Rejected:</span>
                      <span className="font-medium text-red-600">{selectedProject.bidStatistics.rejected}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {selectedProject.skills && selectedProject.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Project Progress</span>
                  <span>{selectedProject.progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-300" 
                    style={{ width: `${selectedProject.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Bids Section - Only for Clients */}
              {role === 'client' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <FaEye className="mr-2" />
                    Project Bids ({projectBids.length})
                  </h3>
                  
                  {bidsLoading ? (
                    <div className="text-center py-8">
                      <FaSpinner className="animate-spin text-2xl mx-auto mb-2" />
                      <p>Loading bids...</p>
                    </div>
                  ) : projectBids.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {projectBids.map((bid) => (
                        <div
  key={bid._id}
  className={`
    ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} 
    p-4 rounded-lg border 
    ${bid.status !== 'accepted' ? 'bg-gray-100 opacity-50 cursor-not-allowed' : ''}
  `}
>

                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center">
                              <img
                                src={bid.freelancer?.profile || '/default-avatar.png'}
                                alt={bid.freelancer?.name || 'Freelancer'}
                                className="w-10 h-10 rounded-full mr-3"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTggMEE4IDAgMCAwIDAgOEE4IDggMCAwIDAgOCAxNkE4IDggMCAwIDAgMTYgOEE4IDggMCAwIDAgOCAwWk04IDNBMiAyIDAgMCAxIDEwIDVBMiAyIDAgMCAxIDggN0EyIDIgMCAwIDEgNiA1QTIgMiAwIDAgMSA4IDNaTTggMTMuN0M2LjUgMTMuNyA1LjIgMTIuOSA0LjQgMTEuN0M0LjUgMTAuNSA2LjggOS44IDggOS44QzkuMiA5LjggMTEuNSAxMC41IDExLjYgMTEuN0MxMC44IDEyLjkgOS41IDEzLjcgOCAxMy43WiIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4KPC9zdmc+';
                                }}
                              />
                              <div>
                                <h4 className="font-medium">{bid.freelancer?.name || 'Unknown Freelancer'}</h4>
                                <div className="flex items-center text-sm text-yellow-500">
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < (bid.freelancer?.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}>
                                      ★
                                    </span>
                                  ))}
                                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                                    ({bid.freelancer?.rating || 'N/A'})
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">
                                ${bid.amount}
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(bid.status)}`}>
                                {bid.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <strong>Proposal:</strong> {bid.proposal}
                            </p>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <FaRegClock className="mr-1" />
                              <span>Delivery: {bid.deliveryTime} days</span>
                              <span className="mx-2">•</span>
                              <span>Submitted: {new Date(bid.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          {/* Bid Actions */}
                          {bid.status === 'pending' && !hasAcceptedBid() && (
  <div className="flex gap-2 mt-3">
    <button
      onClick={() => setShowMessageInput(`accept-${bid._id}`)}
      disabled={processingBid === bid._id}
      className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg text-sm flex items-center justify-center"
    >
      {processingBid === bid._id ? (
        <FaSpinner className="animate-spin mr-1" />
      ) : (
        <FaCheckCircle className="mr-1" />
      )}
      Accept
    </button>
    <button
      onClick={() => setShowMessageInput(`reject-${bid._id}`)}
      disabled={processingBid === bid._id}
      className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg text-sm flex items-center justify-center"
    >
      {processingBid === bid._id ? (
        <FaSpinner className="animate-spin mr-1" />
      ) : (
        <FaTimesCircle className="mr-1" />
      )}
      Reject
    </button>
    <button
      onClick={() => handleCreateChat(bid)}
      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center justify-center"
    >
      <FaComment className="mr-1" />
      Chat
    </button>
  </div>
)}
{bid.status === 'pending' && hasAcceptedBid() && (
  <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
      <FaInfoCircle className="mr-2" />
      Another bid has been accepted for this project
    </p>
  </div>
)}  

                          {/* Message Input for Accept */}
                          {showMessageInput === `accept-${bid._id}` && (
                            <div className="mt-3 p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
                              <label className="block text-sm font-medium mb-2">
                                <FaInfoCircle className="inline mr-1" />
                                Add a message for the freelancer (optional):
                              </label>
                              <textarea
                                value={acceptMessage}
                                onChange={(e) => setAcceptMessage(e.target.value)}
                                placeholder="Congratulations! Your bid has been accepted. Looking forward to working with you..."
                                className={`w-full p-2 border rounded-lg text-sm ${
                                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                                }`}
                                rows="3"
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => handleBidStatusUpdate(bid._id, 'accepted', acceptMessage)}
                                  disabled={processingBid === bid._id}
                                  className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded text-sm"
                                >
                                  Confirm Accept
                                </button>
                                <button
                                  onClick={() => {
                                    setShowMessageInput(null);
                                    setAcceptMessage('');
                                  }}
                                  className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Message Input for Reject */}
                          {showMessageInput === `reject-${bid._id}` && (
                            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-lg">
                              <label className="block text-sm font-medium mb-2">
                                <FaInfoCircle className="inline mr-1" />
                                Add a message for the freelancer (optional):
                              </label>
                              <textarea
                                value={rejectMessage}
                                onChange={(e) => setRejectMessage(e.target.value)}
                                placeholder="Thank you for your proposal. Unfortunately, we have decided to go with another candidate..."
                                className={`w-full p-2 border rounded-lg text-sm ${
                                  darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                                }`}
                                rows="3"
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => handleBidStatusUpdate(bid._id, 'rejected', rejectMessage)}
                                  disabled={processingBid === bid._id}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded text-sm"
                                >
                                  Confirm Reject
                                </button>
                                <button
                                  onClick={() => {
                                    setShowMessageInput(null);
                                    setRejectMessage('');
                                  }}
                                  className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Show chat button for accepted bids */}
                          {bid.status === 'accepted' && (
                            <div className="mt-3">
                              <button
                                onClick={() => handleCreateChat(bid)}
                                className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm flex items-center justify-center"
                              >
                                <FaComment className="mr-2" />
                                Start Conversation
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FaUser className="text-gray-400 text-3xl mx-auto mb-2" />
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                        No bids received yet
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                <Link
                  to="/tasklist"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center flex items-center justify-center"
                >
                  <FaTasks className="mr-2" />
                  Manage Tasks
                </Link>
                <Link
                  to="/inbox"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-center flex items-center justify-center"
                >
                  <FaComment className="mr-2" />
                  View Messages
                </Link>
                <button
                  onClick={closeProjectDetails}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showAddTaskModal && selectedProjectForTask && (
  <AddTaskModal
    isOpen={showAddTaskModal}
    onClose={closeAddTaskModal}
    project={selectedProjectForTask}
    darkMode={darkMode}
    onTaskCreated={handleTaskCreated}
  />
)}
    </div>
  );
};

export default UploadedProjects;




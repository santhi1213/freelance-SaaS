import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaCode, FaClock, FaFilter, FaStar, FaSearch, FaChevronDown, FaChevronUp, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import ProjectModal from '../Modals/ProjectBidModal';
import PopupMessage from '../components/PopupMessage';

const BrowsePage = ({ darkMode }) => {
  const navigate = useNavigate();
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarks, setBookmarks] = useState({});
  const [bookmarkLoading, setBookmarkLoading] = useState({});
  const [bidDetails, setBidDetails] = useState({
    bidPrice: '',
    timeToComplete: '',
    backgroundDescription: ''
  });
  const [filters, setFilters] = useState({
    budget: '',
    type: '',
    duration: '',
    skill: '',
    searchQuery: '',
    sortBy: 'newest'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  // Get current user ID from localStorage or context
  const getCurrentUserId = () => {
    return localStorage.getItem('id');
  };

  const getCurrentUserEmail = () => {
    return localStorage.getItem('email');
  };

  // Helper function to check if project has accepted bid
  const hasAcceptedBid = (project) => {
    return project.bids && project.bids.some(bid => bid.status === 'accepted');
  };

  // Helper function to check if project is available for bidding
  const isProjectAvailable = (project) => {
    // Project is available if:
    // 1. Status is 'pending' AND no accepted bids exist
    // 2. OR status is explicitly 'open' or 'available'
    return (project.status === 'pending' && !hasAcceptedBid(project)) ||
      (project.status === 'open') ||
      (project.status === 'available');
  };

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://freelance-backend-0tw4.onrender.com/api/projects/with-profiles');
        const result = await response.json();

        if (result.success) {
          // Filter out projects that already have accepted bids
          const availableProjects = result.data.filter(project => isProjectAvailable(project));
          setProjects(availableProjects);

          // Log filtered projects for debugging
          console.log('Total projects:', result.data.length);
          console.log('Available projects:', availableProjects.length);
          console.log('Filtered out projects:', result.data.length - availableProjects.length);

          // After filtering, check bookmark status
          await checkBookmarkStatus(availableProjects);
        } else {
          setError('Failed to fetch projects');
        }
      } catch (err) {
        setError('Error fetching projects: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Check bookmark status for all projects
  const checkBookmarkStatus = async (projectList) => {
    const userId = getCurrentUserId();
    const bookmarkStatus = {};

    try {
      const bookmarkChecks = projectList.map(async (project) => {
        try {
          const response = await fetch(`https://freelance-backend-0tw4.onrender.com/api/bookmarks/check/${userId}/${project._id}`);
          const result = await response.json();
          if (result.success) {
            bookmarkStatus[project._id] = result.isBookmarked;
          }
        } catch (err) {
          console.error(`Error checking bookmark for project ${project._id}:`, err);
          bookmarkStatus[project._id] = false;
        }
      });

      await Promise.all(bookmarkChecks);
      setBookmarks(bookmarkStatus);
    } catch (err) {
      console.error('Error checking bookmark status:', err);
    }
  };

  // Handle bookmark toggle
  const handleBookmarkToggle = async (e, projectId) => {
    e.stopPropagation();

    const userId = getCurrentUserId();
    const userEmail = getCurrentUserEmail();

    setBookmarkLoading(prev => ({
      ...prev,
      [projectId]: true
    }));

    try {
      const response = await fetch('https://freelance-backend-0tw4.onrender.com/api/bookmarks/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          userId,
          userEmail
        }),
      });

      const result = await response.json();

      if (result.success) {
        setBookmarks(prev => ({
          ...prev,
          [projectId]: result.bookmarked
        }));
        console.log(result.message);
      } else {
        console.error('Bookmark operation failed:', result.message);
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    } finally {
      setBookmarkLoading(prev => ({
        ...prev,
        [projectId]: false
      }));
    }
  };

  // Handle bid submission with enhanced validation
  const handleBidSubmit = async () => {
    const userId = getCurrentUserId();

    // Additional validation: Check if project is still available
    const currentProject = projects.find(p => p._id === selectedProject.id);
    if (!currentProject || !isProjectAvailable(currentProject)) {
      setPopup({ show: true, type: 'error', message: 'This project is no longer available for bidding.' })
      setSelectedProject(null);
      return;
    }

    try {
      const response = await fetch('https://freelance-backend-0tw4.onrender.com/api/projects/place_bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: selectedProject.id,
          freelancerId: userId,
          price: bidDetails.bidPrice,
          estimatedTime: bidDetails.timeToComplete,
          description: bidDetails.backgroundDescription,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Bid submitted successfully:', result);

        if (result.bookmarkRemoved) {
          setBookmarks(prev => ({
            ...prev,
            [selectedProject.id]: false,
          }));
        }

        setBidDetails({
          bidPrice: '',
          timeToComplete: '',
          backgroundDescription: '',
        });
        setSelectedProject(null);
        setPopup({ show: true, type: 'success', message: 'Bid submitted successfully! Bookmark automatically removed.' })
        // Refresh projects to ensure UI stays current
        window.location.reload();
      }
      else if (response.status === 409) {
        console.warn('Duplicate bid error:', result.message);
        setPopup({ show: true, type: 'error', message: 'You have already placed a bid on this project.' })
      }
      else if (response.status === 400 && result.message.includes('no longer available')) {
        setPopup({ show: true, type: 'error', message: 'This project is no longer available for bidding.' })
        setSelectedProject(null);
        // Refresh projects
        window.location.reload();
      }
      else {
        console.error('Bid submission failed:', result.message);
        setPopup({ show: true, type: 'error', message: 'Failed to submit bid: ' + result.message })
      }
    } catch (err) {
      console.error('Error submitting bid:', err);
      setPopup({ show: true, type: 'error', message: 'Error submitting bid. Please try again.' })
    }
  };

  // Transform API data to match component expectations
  const transformProject = (project) => ({
    id: project._id,
    title: project.title,
    description: project.description,
    budget: `$${project.budget_from} - $${project.budget_to}`,
    type: project.project_type,
    duration: project.project_duration,
    skills: project.req_skills,
    status: project.status,
    bids: project.bids || [],
    client: {
      name: project.userProfile?.fullName || 'Unknown Client',
      email: project.email,
      profile: project.userProfile?.profilePhoto
        ? `https://freelance-backend-0tw4.onrender.com/${project.userProfile.profilePhoto}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(project.userProfile?.fullName || 'Unknown')}&background=3b82f6&color=ffffff&size=40`,
      rating: project.userProfile?.rating?.average || 0,
      totalReviews: project.userProfile?.rating?.totalReviews || 0,
      location: project.userProfile?.location || '',
      title: project.userProfile?.title || ''
    },
    createdAt: project.createdAt,
    updatedAt: project.updatedAt
  });

  // Toggle filter expansion
  const toggleFilterExpansion = () => setIsFilterExpanded(prev => !prev);

  // Handle project selection for viewing details
  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  // Handle opening bid modal separately
  const handleOpenBidModal = (e, project) => {
    e.stopPropagation();

    // Double-check project availability before opening modal
    if (!isProjectAvailable(projects.find(p => p._id === project.id))) {
      setPopup({ show: true, type: 'error', message: 'This project is no longer available for bidding.' })
      return;
    }

    setSelectedProject(project);
  };

  // Handle bid form changes
  const handleBidChange = (e) => {
    const { name, value } = e.target;
    setBidDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
    setCurrentPage(1);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      budget: '',
      type: '',
      duration: '',
      skill: '',
      searchQuery: '',
      sortBy: 'newest'
    });
    setCurrentPage(1);
  };

  // Get unique values for filters from API data
  const getUniqueValues = (key) => {
    if (key === 'skills') {
      const allSkills = projects.flatMap(project => project.req_skills || []);
      return [...new Set(allSkills)];
    }
    if (key === 'budget') {
      return [...new Set(projects.map(project => `$${project.budget_from} - $${project.budget_to}`))];
    }
    if (key === 'type') {
      return [...new Set(projects.map(project => project.project_type))];
    }
    if (key === 'duration') {
      return [...new Set(projects.map(project => project.project_duration))];
    }
    return [];
  };

  // Filter and sort projects
  const filteredAndSortedProjects = projects
    .map(transformProject)
    .filter(project => {
      const matchesSearch = !filters.searchQuery ||
        project.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        project.skills.some(skill => skill.toLowerCase().includes(filters.searchQuery.toLowerCase()));

      return (
        matchesSearch &&
        (!filters.budget || project.budget === filters.budget) &&
        (!filters.type || project.type === filters.type) &&
        (!filters.duration || project.duration === filters.duration) &&
        (!filters.skill || project.skills.includes(filters.skill))
      );
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'budget-high':
          const aBudgetHigh = parseInt(a.budget.split(' - ')[1].replace('$', ''));
          const bBudgetHigh = parseInt(b.budget.split(' - ')[1].replace('$', ''));
          return bBudgetHigh - aBudgetHigh;
        case 'budget-low':
          const aBudgetLow = parseInt(a.budget.split(' - ')[0].replace('$', ''));
          const bBudgetLow = parseInt(b.budget.split(' - ')[0].replace('$', ''));
          return aBudgetLow - bBudgetLow;
        case 'rating':
          return b.client.rating - a.client.rating;
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  // Pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredAndSortedProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredAndSortedProjects.length / projectsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const role = localStorage.getItem('role');

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading available projects...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Projects</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Page Header */}
      <section className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Browse Available Projects</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Showing only projects available for bidding
          </p>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className={`flex items-center bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow ${darkMode ? 'border-gray-700' : 'border-gray-200'} border`}>
                <input
                  type="text"
                  placeholder="Search projects..."
                  className={`w-full px-5 py-3 outline-none ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
                  value={filters.searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-3">
                  <FaSearch />
                </button>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className={`w-full md:w-auto px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
              >
                <option value="newest">Newest First</option>
                <option value="budget-high">Highest Budget</option>
                <option value="budget-low">Lowest Budget</option>
                <option value="rating">Client Rating</option>
              </select>
            </div>
          </div>
        </div>
      </section>

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
                  {/* Budget Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="budget">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={filters.budget}
                      onChange={handleFilterChange}
                      className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    >
                      <option value="">All Budgets</option>
                      {getUniqueValues('budget').map(budget => (
                        <option key={budget} value={budget}>{budget}</option>
                      ))}
                    </select>
                  </div>

                  {/* Project Type Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="type">
                      Project Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={filters.type}
                      onChange={handleFilterChange}
                      className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    >
                      <option value="">All Types</option>
                      {getUniqueValues('type').map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Duration Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="duration">
                      Project Duration
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={filters.duration}
                      onChange={handleFilterChange}
                      className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    >
                      <option value="">Any Duration</option>
                      {getUniqueValues('duration').map(duration => (
                        <option key={duration} value={duration}>{duration}</option>
                      ))}
                    </select>
                  </div>

                  {/* Skills Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="skill">
                      Required Skills
                    </label>
                    <select
                      id="skill"
                      name="skill"
                      value={filters.skill}
                      onChange={handleFilterChange}
                      className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    >
                      <option value="">Any Skill</option>
                      {getUniqueValues('skills').map(skill => (
                        <option key={skill} value={skill}>{skill}</option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Filters Button */}
                  <button
                    onClick={clearFilters}
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{filteredAndSortedProjects.length} Available Projects</h3>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Showing {Math.min(indexOfFirstProject + 1, filteredAndSortedProjects.length)} - {Math.min(indexOfLastProject, filteredAndSortedProjects.length)} of {filteredAndSortedProjects.length} projects
              </div>
            </div>

            {currentProjects.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentProjects.map(project => (
                  <div
                    key={project.id}
                    className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow transition-all duration-300
                    border-l-4 border-green-500 dark:border-green-400 relative
                    hover:shadow-xl cursor-pointer hover:-translate-y-1`}
                    onClick={() => handleProjectClick(project)}
                  >
                    {/* Available Badge */}
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Available
                    </div>

                    {/* Bookmark Icon */}
                    <button
                      onClick={(e) => handleBookmarkToggle(e, project.id)}
                      disabled={bookmarkLoading[project.id]}
                      className={`absolute top-4 right-16 p-2 rounded-full transition-all duration-200 hover:scale-110 ${bookmarks[project.id]
                        ? 'text-yellow-500 hover:text-yellow-600'
                        : 'text-gray-400 hover:text-yellow-500'
                        } ${bookmarkLoading[project.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title={bookmarks[project.id] ? 'Remove from bookmarks' : 'Add to bookmarks'}
                    >
                      {bookmarkLoading[project.id] ? (
                        <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>
                      ) : bookmarks[project.id] ? (
                        <FaBookmark size={16} />
                      ) : (
                        <FaRegBookmark size={16} />
                      )}
                    </button>

                    <div className="flex items-center mb-4 pr-12">
                      <img
                        src={project.client.profile}
                        alt={project.client.name}
                        className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-gray-200 dark:border-gray-600"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.client.name)}&background=3b82f6&color=ffffff&size=40`;
                        }}
                      />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{project.client.name}</p>
                        <div className="flex items-center">
                          <div className="flex text-yellow-400">
                            {[...Array(Math.floor(project.client.rating || 0))].map((_, i) => (
                              <FaStar key={i} size={12} />
                            ))}
                            {[...Array(5 - Math.floor(project.client.rating || 0))].map((_, i) => (
                              <FaStar key={i} size={12} className="text-gray-300" />
                            ))}
                          </div>
                          <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">
                            ({project.client.rating || 0}) • {project.client.totalReviews || 0} reviews
                          </span>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2 pr-12">{project.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className={`${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-1 rounded-full`}>
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 3 && (
                        <span className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} text-xs px-2 py-1 rounded-full`}>
                          +{project.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-sm mt-auto">
                      <span className="flex items-center gap-1 font-medium">
                        <FaMoneyBillWave className="text-green-500" />
                        {project.budget}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCode className="text-purple-500" />
                        {project.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-yellow-500" />
                        {project.duration}
                      </span>
                    </div>

                    {role === 'freelancer' && (
                      <button
                        onClick={(e) => handleOpenBidModal(e, project)}
                        className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                        title="Submit Proposal"
                      >
                        Submit Proposal
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl`}>
                <FaSearch className="mx-auto text-gray-400" size={48} />
                <h3 className="text-xl font-semibold mt-4 mb-2">No available projects found</h3>
                <p className="text-gray-500 dark:text-gray-400">All projects may have been assigned or try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-lg ${currentPage === 1
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`w-8 h-8 rounded-lg ${currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-lg ${currentPage === totalPages
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {popup.show && (
        <PopupMessage
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup({ show: false, type: '', message: '' })}
        />
      )}
      {/* Project Bid Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          bidDetails={bidDetails}
          handleBidChange={handleBidChange}
          handleBidSubmit={handleBidSubmit}
          onClose={() => setSelectedProject(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default BrowsePage;
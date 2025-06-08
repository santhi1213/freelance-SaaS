// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaMoneyBillWave, FaCode, FaClock, FaFilter, FaStar, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import ProjectModal from '../Modals/ProjectBidModal';

// const BrowsePage = ({ darkMode }) => {
//   const navigate = useNavigate();
//   const [isFilterExpanded, setIsFilterExpanded] = useState(true);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [bidDetails, setBidDetails] = useState({
//     bidPrice: '',
//     timeToComplete: '',
//     backgroundDescription: ''
//   });
//   const [filters, setFilters] = useState({ 
//     budget: '', 
//     type: '', 
//     duration: '', 
//     skill: '',
//     searchQuery: '',
//     sortBy: 'newest'
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const projectsPerPage = 9;

//   // Fetch projects from API
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:5000/api/projects/with-profiles');
//         const result = await response.json();
        
//         if (result.success) {
//           setProjects(result.data);
//         } else {
//           setError('Failed to fetch projects');
//         }
//       } catch (err) {
//         setError('Error fetching projects: ' + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   // Transform API data to match component expectations
//   const transformProject = (project) => ({
//     id: project._id,
//     title: project.title,
//     description: project.description,
//     budget: `$${project.budget_from} - $${project.budget_to}`,
//     type: project.project_type,
//     duration: project.project_duration,
//     skills: project.req_skills,
//     client: {
//       name: project.userProfile?.fullName || 'Unknown Client',
//       email: project.email,
//       profile: project.userProfile?.profilePhoto 
//         ? `http://localhost:5000${project.userProfile.profilePhoto}` 
//         : `https://ui-avatars.com/api/?name=${encodeURIComponent(project.userProfile?.fullName || 'Unknown')}&background=3b82f6&color=ffffff&size=40`,
//       rating: project.userProfile?.rating?.average || 0,
//       totalReviews: project.userProfile?.rating?.totalReviews || 0,
//       location: project.userProfile?.location || '',
//       title: project.userProfile?.title || ''
//     },
//     createdAt: project.createdAt,
//     updatedAt: project.updatedAt
//   });

//   // Toggle filter expansion
//   const toggleFilterExpansion = () => setIsFilterExpanded(prev => !prev);

//   // Handle project selection for viewing details - REMOVED NAVIGATION
//   const handleProjectClick = (project) => {
//     // Just open the bid modal instead of navigating
//     setSelectedProject(project);
//   };

//   // Handle opening bid modal separately - THIS IS NOW REDUNDANT BUT KEEPING FOR COMPATIBILITY
//   const handleOpenBidModal = (e, project) => {
//     e.stopPropagation();
//     setSelectedProject(project);
//   };

//   // Handle bid form changes
//   const handleBidChange = (e) => {
//     const { name, value } = e.target;
//     setBidDetails(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle bid submission
//   const handleBidSubmit = () => {
//     console.log('Bid submitted:', bidDetails, 'for project:', selectedProject);
//     // Reset bid details
//     setBidDetails({
//       bidPrice: '',
//       timeToComplete: '',
//       backgroundDescription: ''
//     });
//     // Close modal
//     setSelectedProject(null);
//   };

//   // Handle filter changes
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//     setCurrentPage(1);
//   };

//   // Handle search input
//   const handleSearchChange = (e) => {
//     setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
//     setCurrentPage(1);
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setFilters({
//       budget: '',
//       type: '',
//       duration: '',
//       skill: '',
//       searchQuery: '',
//       sortBy: 'newest'
//     });
//     setCurrentPage(1);
//   };

//   // Get unique values for filters from API data
//   const getUniqueValues = (key) => {
//     if (key === 'skills') {
//       const allSkills = projects.flatMap(project => project.req_skills || []);
//       return [...new Set(allSkills)];
//     }
//     if (key === 'budget') {
//       return [...new Set(projects.map(project => `$${project.budget_from} - $${project.budget_to}`))];
//     }
//     if (key === 'type') {
//       return [...new Set(projects.map(project => project.project_type))];
//     }
//     if (key === 'duration') {
//       return [...new Set(projects.map(project => project.project_duration))];
//     }
//     return [];
//   };

//   // Filter and sort projects
//   const filteredAndSortedProjects = projects
//     .map(transformProject)
//     .filter(project => {
//       const matchesSearch = !filters.searchQuery || 
//         project.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
//         project.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
//         project.skills.some(skill => skill.toLowerCase().includes(filters.searchQuery.toLowerCase()));
      
//       return (
//         matchesSearch &&
//         (!filters.budget || project.budget === filters.budget) &&
//         (!filters.type || project.type === filters.type) &&
//         (!filters.duration || project.duration === filters.duration) &&
//         (!filters.skill || project.skills.includes(filters.skill))
//       );
//     })
//     .sort((a, b) => {
//       switch (filters.sortBy) {
//         case 'budget-high':
//           const aBudgetHigh = parseInt(a.budget.split(' - ')[1].replace('$', ''));
//           const bBudgetHigh = parseInt(b.budget.split(' - ')[1].replace('$', ''));
//           return bBudgetHigh - aBudgetHigh;
//         case 'budget-low':
//           const aBudgetLow = parseInt(a.budget.split(' - ')[0].replace('$', ''));
//           const bBudgetLow = parseInt(b.budget.split(' - ')[0].replace('$', ''));
//           return aBudgetLow - bBudgetLow;
//         case 'rating':
//           return b.client.rating - a.client.rating;
//         case 'newest':
//         default:
//           return new Date(b.createdAt) - new Date(a.createdAt);
//       }
//     });

//   // Pagination
//   const indexOfLastProject = currentPage * projectsPerPage;
//   const indexOfFirstProject = indexOfLastProject - projectsPerPage;
//   const currentProjects = filteredAndSortedProjects.slice(indexOfFirstProject, indexOfLastProject);
//   const totalPages = Math.ceil(filteredAndSortedProjects.length / projectsPerPage);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Go to next page
//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // Go to previous page
//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-lg">Loading projects...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-red-500 text-6xl mb-4">⚠️</div>
//           <h2 className="text-2xl font-bold mb-2">Error Loading Projects</h2>
//           <p className="text-gray-600 dark:text-gray-400">{error}</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pb-16">
//       {/* Page Header */}
//       <section className={`py-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
//         <div className="container mx-auto px-4">
//           <h1 className="text-3xl font-bold mb-4">Browse Projects</h1>
//           <div className="flex flex-col md:flex-row md:items-center gap-4">
//             <div className="flex-1">
//               <div className={`flex items-center bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow ${darkMode ? 'border-gray-700' : 'border-gray-200'} border`}>
//                 <input
//                   type="text"
//                   placeholder="Search projects..."
//                   className={`w-full px-5 py-3 outline-none ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
//                   value={filters.searchQuery}
//                   onChange={handleSearchChange}
//                 />
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white p-3">
//                   <FaSearch />
//                 </button>
//               </div>
//             </div>
//             <div className="w-full md:w-auto">
//               <select
//                 name="sortBy"
//                 value={filters.sortBy}
//                 onChange={handleFilterChange}
//                 className={`w-full md:w-auto px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
//               >
//                 <option value="newest">Newest First</option>
//                 <option value="budget-high">Highest Budget</option>
//                 <option value="budget-low">Lowest Budget</option>
//                 <option value="rating">Client Rating</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Filter Sidebar */}
//           <div className="lg:w-1/4">
//             <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-xl overflow-hidden sticky top-24`}>
//               <div 
//                 className="py-4 px-6 flex justify-between items-center cursor-pointer border-b border-gray-200 dark:border-gray-700"
//                 onClick={toggleFilterExpansion}
//               >
//                 <div className="flex items-center gap-2 font-semibold">
//                   <FaFilter className="text-blue-600 dark:text-blue-400" />
//                   <span>Filter Projects</span>
//                 </div>
//                 <div>
//                   {isFilterExpanded ? <FaChevronUp /> : <FaChevronDown />}
//                 </div>
//               </div>
              
//               {isFilterExpanded && (
//                 <div className="p-6 space-y-6">
//                   {/* Budget Filter */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2" htmlFor="budget">
//                       Budget Range
//                     </label>
//                     <select
//                       id="budget"
//                       name="budget"
//                       value={filters.budget}
//                       onChange={handleFilterChange}
//                       className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                     >
//                       <option value="">All Budgets</option>
//                       {getUniqueValues('budget').map(budget => (
//                         <option key={budget} value={budget}>{budget}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   {/* Project Type Filter */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2" htmlFor="type">
//                       Project Type
//                     </label>
//                     <select
//                       id="type"
//                       name="type"
//                       value={filters.type}
//                       onChange={handleFilterChange}
//                       className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                     >
//                       <option value="">All Types</option>
//                       {getUniqueValues('type').map(type => (
//                         <option key={type} value={type}>{type}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   {/* Duration Filter */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2" htmlFor="duration">
//                       Project Duration
//                     </label>
//                     <select
//                       id="duration"
//                       name="duration"
//                       value={filters.duration}
//                       onChange={handleFilterChange}
//                       className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                     >
//                       <option value="">Any Duration</option>
//                       {getUniqueValues('duration').map(duration => (
//                         <option key={duration} value={duration}>{duration}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   {/* Skills Filter */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2" htmlFor="skill">
//                       Required Skills
//                     </label>
//                     <select
//                       id="skill"
//                       name="skill"
//                       value={filters.skill}
//                       onChange={handleFilterChange}
//                       className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                     >
//                       <option value="">Any Skill</option>
//                       {getUniqueValues('skills').map(skill => (
//                         <option key={skill} value={skill}>{skill}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   {/* Clear Filters Button */}
//                   <button 
//                     onClick={clearFilters}
//                     className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
//                   >
//                     Clear All Filters
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           {/* Projects Grid */}
//           <div className="lg:w-3/4">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-bold">{filteredAndSortedProjects.length} Available Projects</h3>
//               <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
//                 Showing {Math.min(indexOfFirstProject + 1, filteredAndSortedProjects.length)} - {Math.min(indexOfLastProject, filteredAndSortedProjects.length)} of {filteredAndSortedProjects.length} projects
//               </div>
//             </div>
            
//             {currentProjects.length > 0 ? (
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {currentProjects.map(project => (
//                   <div 
//                     key={project.id} 
//                     className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300 
//                       border-l-4 border-blue-500 dark:border-blue-400 cursor-pointer transform hover:-translate-y-1`} 
//                     onClick={() => handleProjectClick(project)}
//                   >
//                     <div className="flex items-center mb-4">
//                       <img 
//                         src={project.client.profile} 
//                         alt={project.client.name} 
//                         className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-gray-200 dark:border-gray-600"
//                         onLoad={(e) => {
//                           console.log('Image loaded successfully:', e.target.src);
//                         }}
//                         onError={(e) => {
//                           console.error('Image failed to load:', e.target.src);
//                           e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.client.name)}&background=3b82f6&color=ffffff&size=40`;
//                         }}
//                       />
//                       <div>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">{project.client.name}</p>
//                         <div className="flex items-center">
//                           <div className="flex text-yellow-400">
//                             {[...Array(Math.floor(project.client.rating || 0))].map((_, i) => (
//                               <FaStar key={i} size={12} />
//                             ))}
//                             {[...Array(5 - Math.floor(project.client.rating || 0))].map((_, i) => (
//                               <FaStar key={i} size={12} className="text-gray-300" />
//                             ))}
//                           </div>
//                           <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">
//                             ({project.client.rating || 0}) • {project.client.totalReviews || 0} reviews
//                           </span>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <h4 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">{project.title}</h4>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                    
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {project.skills.slice(0, 3).map((skill, idx) => (
//                         <span key={idx} className={`${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-1 rounded-full`}>
//                           {skill}
//                         </span>
//                       ))}
//                       {project.skills.length > 3 && (
//                         <span className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} text-xs px-2 py-1 rounded-full`}>
//                           +{project.skills.length - 3} more
//                         </span>
//                       )}
//                     </div>
                    
//                     <div className="flex justify-between items-center text-sm mt-auto">
//                       <span className="flex items-center gap-1 font-medium">
//                         <FaMoneyBillWave className="text-green-500" />
//                         {project.budget}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <FaCode className="text-purple-500" />
//                         {project.type}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <FaClock className="text-yellow-500" />
//                         {project.duration}
//                       </span>
//                     </div>
                    
//                     <button
//                       onClick={(e) => handleOpenBidModal(e, project)}
//                       className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
//                     >
//                       Submit Proposal
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className={`text-center py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl`}>
//                 <FaSearch className="mx-auto text-gray-400" size={48} />
//                 <h3 className="text-xl font-semibold mt-4 mb-2">No projects found</h3>
//                 <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search query</p>
//                 <button 
//                   onClick={clearFilters}
//                   className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             )}
            
//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="mt-8 flex justify-center">
//                 <div className="flex items-center space-x-2">
//                   <button 
//                     onClick={prevPage}
//                     disabled={currentPage === 1}
//                     className={`px-3 py-1 rounded-lg ${
//                       currentPage === 1 
//                         ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
//                         : 'bg-blue-600 hover:bg-blue-700 text-white'
//                     }`}
//                   >
//                     Previous
//                   </button>
                  
//                   {[...Array(totalPages)].map((_, i) => (
//                     <button 
//                       key={i}
//                       onClick={() => paginate(i + 1)}
//                       className={`w-8 h-8 rounded-lg ${
//                         currentPage === i + 1 
//                           ? 'bg-blue-600 text-white' 
//                           : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
//                       }`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
                  
//                   <button 
//                     onClick={nextPage}
//                     disabled={currentPage === totalPages}
//                     className={`px-3 py-1 rounded-lg ${
//                       currentPage === totalPages 
//                         ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
//                         : 'bg-blue-600 hover:bg-blue-700 text-white'
//                     }`}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Project Bid Modal */}
//       {selectedProject && (
//         <ProjectModal 
//           project={selectedProject}
//           bidDetails={bidDetails}
//           handleBidChange={handleBidChange}
//           handleBidSubmit={handleBidSubmit}
//           onClose={() => setSelectedProject(null)}
//           darkMode={darkMode}
//         />
//       )}
//     </div>
//   );
// };

// export default BrowsePage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaCode, FaClock, FaFilter, FaStar, FaSearch, FaChevronDown, FaChevronUp, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import ProjectModal from '../Modals/ProjectBidModal';

const BrowsePage = ({ darkMode }) => {
  const navigate = useNavigate();
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarks, setBookmarks] = useState({}); // Track bookmark status for each project
  const [bookmarkLoading, setBookmarkLoading] = useState({}); // Track loading state for bookmark operations
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
    // Replace this with your actual authentication logic
    return localStorage.getItem('id'); // Fallback for demo
  };

  const getCurrentUserEmail = () => {
    // Replace this with your actual authentication logic
    return localStorage.getItem('email'); // Fallback for demo
  };

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/projects/with-profiles');
        const result = await response.json();
        
        if (result.success) {
          setProjects(result.data);
          // After fetching projects, check bookmark status for each
          await checkBookmarkStatus(result.data);
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
      // Check bookmark status for each project
      const bookmarkChecks = projectList.map(async (project) => {
        try {
          const response = await fetch(`http://localhost:5000/api/bookmarks/check/${userId}/${project._id}`);
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

    // Set loading state for this specific bookmark
    setBookmarkLoading(prev => ({
      ...prev,
      [projectId]: true
    }));

    try {
      const response = await fetch('http://localhost:5000/api/bookmarks/toggle', {
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
        // Update bookmark status in local state
        setBookmarks(prev => ({
          ...prev,
          [projectId]: result.bookmarked
        }));

        // Show success message (you can replace this with a toast notification)
        console.log(result.message);
      } else {
        console.error('Bookmark operation failed:', result.message);
        // You could show an error toast here
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
      // You could show an error toast here
    } finally {
      // Remove loading state
      setBookmarkLoading(prev => ({
        ...prev,
        [projectId]: false
      }));
    }
  };

  // Handle bid submission with bookmark removal
  const handleBidSubmit = async () => {
    const userId = getCurrentUserId();
    
    try {
      const response = await fetch('http://localhost:5000/api/projects/place_bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: selectedProject.id,
          freelancerId: userId,
          price: bidDetails.bidPrice,
          estimatedTime: bidDetails.timeToComplete,
          description: bidDetails.backgroundDescription
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Bid submitted successfully:', result);
        
        // If bookmark was automatically removed, update local state
        if (result.bookmarkRemoved) {
          setBookmarks(prev => ({
            ...prev,
            [selectedProject.id]: false
          }));
        }

        // Reset bid details and close modal
        setBidDetails({
          bidPrice: '',
          timeToComplete: '',
          backgroundDescription: ''
        });
        setSelectedProject(null);
        
        // Show success message
        alert('Bid submitted successfully! Bookmark automatically removed.');
      } else {
        console.error('Bid submission failed:', result.message);
        alert('Failed to submit bid: ' + result.message);
      }
    } catch (err) {
      console.error('Error submitting bid:', err);
      alert('Error submitting bid. Please try again.');
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
    client: {
      name: project.userProfile?.fullName || 'Unknown Client',
      email: project.email,
      profile: project.userProfile?.profilePhoto 
        ? `http://localhost:5000${project.userProfile.profilePhoto}` 
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
          <p className="mt-4 text-lg">Loading projects...</p>
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
          <h1 className="text-3xl font-bold mb-4">Browse Projects</h1>
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
                    className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300 
                      border-l-4 border-blue-500 dark:border-blue-400 cursor-pointer transform hover:-translate-y-1 relative`} 
                    onClick={() => handleProjectClick(project)}
                  >
                    {/* Bookmark Icon */}
                    <button
                      onClick={(e) => handleBookmarkToggle(e, project.id)}
                      disabled={bookmarkLoading[project.id]}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                        bookmarks[project.id] 
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

                    <div className="flex items-center mb-4 pr-8">
                      <img 
                        src={project.client.profile} 
                        alt={project.client.name} 
                        className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-gray-200 dark:border-gray-600"
                        onLoad={(e) => {
                          console.log('Image loaded successfully:', e.target.src);
                        }}
                        onError={(e) => {
                          console.error('Image failed to load:', e.target.src);
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
                    
                    <h4 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2 pr-8">{project.title}</h4>
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
                    
                    <button
                      onClick={(e) => handleOpenBidModal(e, project)}
                      className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                    >
                      Submit Proposal
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl`}>
                <FaSearch className="mx-auto text-gray-400" size={48} />
                <h3 className="text-xl font-semibold mt-4 mb-2">No projects found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search query</p>
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
                    className={`px-3 py-1 rounded-lg ${
                      currentPage === 1 
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
                      className={`w-8 h-8 rounded-lg ${
                        currentPage === i + 1 
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
                    className={`px-3 py-1 rounded-lg ${
                      currentPage === totalPages 
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
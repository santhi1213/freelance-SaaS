// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { 
//   FaSearch, 
//   FaFilter, 
//   FaChevronDown, 
//   FaChevronUp, 
//   FaMoneyBillWave, 
//   FaCode, 
//   FaClock,
//   FaStar,
//   FaBookmark,
//   FaRegBookmark,
//   FaEllipsisH,
//   FaRegCalendarAlt,
//   FaTrashAlt,
//   FaExternalLinkAlt,
//   FaSpinner
// } from 'react-icons/fa';
// import ProjectModal from '../Modals/ProjectBidModal';

// const BookmarksPage = ({ darkMode }) => {
//   const navigate = useNavigate();
//   const [isFilterExpanded, setIsFilterExpanded] = useState(true);
//   const [filters, setFilters] = useState({ 
//     budget: '', 
//     type: '', 
//     duration: '', 
//     skill: '',
//     searchQuery: ''
//   });
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [bidDetails, setBidDetails] = useState({
//     bidPrice: '',
//     timeToComplete: '',
//     backgroundDescription: ''
//   });
  
//   // API-related state
//   const [bookmarks, setBookmarks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 0,
//     totalBookmarks: 0,
//     hasNext: false,
//     hasPrev: false
//   });
//   const [loadingMore, setLoadingMore] = useState(false);

//   // Get userId from localStorage, context, or wherever you store it
//   const userId = localStorage.getItem('id'); // Adjust based on your auth implementation

//   // Fetch bookmarks from API
//   const fetchBookmarks = async (page = 1, append = false) => {
//     try {
//       if (!append) setLoading(true);
//       else setLoadingMore(true);

//       const response = await fetch(`http://localhost:5000/api/bookmarks/${userId}?page=${page}&limit=10`);
//       const data = await response.json();

//       if (data.success) {
//         const formattedBookmarks = data.data.map(bookmark => ({
//           id: bookmark.project._id,
//           bookmarkId: bookmark.id,
//           title: bookmark.project.title,
//           description: bookmark.project.description,
//           budget: `$${bookmark.project.budget_from} - $${bookmark.project.budget_to}`,
//           type: bookmark.project.project_type,
//           duration: bookmark.project.project_duration,
//           skills: bookmark.project.req_skills || [],
//           client: {
//             name: bookmark.project.client.name,
//             email: bookmark.project.client.email,
//             profile: bookmark.project.client.profilePhoto || '/default-avatar.png',
//             rating: 4.5, // You might want to fetch actual ratings
//             title: bookmark.project.client.title,
//             location: bookmark.project.client.location
//           },
//           bookmarkedOn: new Date(bookmark.bookmarkedAt).toLocaleDateString(),
//           createdAt: bookmark.project.createdAt
//         }));

//         if (append) {
//           setBookmarks(prev => [...prev, ...formattedBookmarks]);
//         } else {
//           setBookmarks(formattedBookmarks);
//         }
        
//         setPagination(data.pagination);
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError('Failed to fetch bookmarks');
//       console.error('Error fetching bookmarks:', err);
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   // Remove bookmark from API
//   const removeBookmark = async (bookmarkId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/bookmarks/${bookmarkId}`, {
//         method: 'DELETE'
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         // Remove from local state
//         setBookmarks(prev => prev.filter(bookmark => bookmark.bookmarkId !== bookmarkId));
//         // Update pagination count
//         setPagination(prev => ({
//           ...prev,
//           totalBookmarks: prev.totalBookmarks - 1
//         }));
//       } else {
//         alert(data.message || 'Failed to remove bookmark');
//       }
//     } catch (err) {
//       console.error('Error removing bookmark:', err);
//       alert('Failed to remove bookmark');
//     }
//   };

//   // Load initial bookmarks
//   useEffect(() => {
//     if (userId) {
//       fetchBookmarks();
//     } else {
//       setError('User not authenticated');
//       setLoading(false);
//     }
//   }, [userId]);

//   // Toggle filter expansion
//   const toggleFilterExpansion = () => setIsFilterExpanded(prev => !prev);

//   // Handle project selection for viewing details
//   const handleProjectClick = (project) => {
//     navigate(`/project/${project.id}`);
//   };

//   // Handle opening bid modal separately
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
//     setSelectedProject(null);
//     setBidDetails({
//       bidPrice: '',
//       timeToComplete: '',
//       backgroundDescription: ''
//     });
//     alert('Your bid has been successfully submitted!');
//   };

//   // Handle filter changes
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle search input
//   const handleSearchChange = (e) => {
//     setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setFilters({
//       budget: '',
//       type: '',
//       duration: '',
//       skill: '',
//       searchQuery: ''
//     });
//   };

//   // Get unique values for filters from current bookmarks
//   const getUniqueValues = (key) => {
//     if (key === 'skills') {
//       const allSkills = bookmarks.flatMap(project => project.skills);
//       return [...new Set(allSkills)];
//     }
//     return [...new Set(bookmarks.map(project => project[key]))];
//   };

//   // Filter projects based on selected filters and search query
//   const filteredProjects = bookmarks.filter(project => {
//     const matchesSearch = !filters.searchQuery || 
//       project.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
//       project.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
//       project.skills.some(skill => skill.toLowerCase().includes(filters.searchQuery.toLowerCase()));
    
//     return (
//       matchesSearch &&
//       (!filters.budget || project.budget === filters.budget) &&
//       (!filters.type || project.type === filters.type) &&
//       (!filters.duration || project.duration === filters.duration) &&
//       (!filters.skill || project.skills.includes(filters.skill))
//     );
//   });

//   // Remove project from bookmarks
//   const handleRemoveBookmark = (bookmarkId, e) => {
//     e.stopPropagation();
//     if (window.confirm('Are you sure you want to remove this project from your bookmarks?')) {
//       removeBookmark(bookmarkId);
//     }
//   };

//   // Load more bookmarks
//   const handleLoadMore = () => {
//     if (pagination.hasNext && !loadingMore) {
//       fetchBookmarks(pagination.currentPage + 1, true);
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
//           <p className="text-lg">Loading your bookmarks...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-lg text-red-600 mb-4">{error}</p>
//           <button 
//             onClick={() => fetchBookmarks()}
//             className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
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
//       <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
//         <div className="container mx-auto px-4">
//           <h1 className="text-3xl font-bold">Bookmarked Projects</h1>
//           <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//             Browse and manage your saved projects ({pagination.totalBookmarks} total)
//           </p>
//         </div>
//       </div>
      
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
//                   {/* Search */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2" htmlFor="search">
//                       Search
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="search"
//                         placeholder="Search bookmarks..."
//                         value={filters.searchQuery}
//                         onChange={handleSearchChange}
//                         className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
//                           darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
//                         }`}
//                       />
//                       <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     </div>
//                   </div>
                  
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
          
//           {/* Bookmarked Projects */}
//           <div className="lg:w-3/4">
//             {filteredProjects.length > 0 ? (
//               <div>
//                 <div className="mb-6 flex justify-between items-center">
//                   <h2 className="text-xl font-bold">{filteredProjects.length} Bookmarked Projects</h2>
//                   <div className="text-sm">
//                     {filteredProjects.length !== bookmarks.length && (
//                       <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
//                         Showing {filteredProjects.length} of {bookmarks.length} bookmarks
//                       </span>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
//                   {filteredProjects.map(project => (
//                     <div 
//                       key={project.id} 
//                       className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300 
//                         border-l-4 border-blue-500 dark:border-blue-400 cursor-pointer transform hover:-translate-y-1`} 
//                       onClick={() => handleProjectClick(project)}
//                     >
//                       <div className="flex justify-between">
//                         <div className="flex items-center mb-4">
//                           <img 
//                             src={project.client.profile} 
//                             alt={project.client.name} 
//                             className="w-10 h-10 rounded-full mr-3"
//                             onError={(e) => {
//                               e.target.src = '/default-avatar.png';
//                             }}
//                           />
//                           <div>
//                             <p className="text-sm text-gray-600 dark:text-gray-400">{project.client.name}</p>
//                             <div className="flex items-center">
//                               <div className="flex text-yellow-400">
//                                 {[...Array(Math.floor(project.client.rating))].map((_, i) => (
//                                   <FaStar key={i} size={12} />
//                                 ))}
//                               </div>
//                               <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">({project.client.rating})</span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={(e) => handleRemoveBookmark(project.bookmarkId, e)} 
//                             className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
//                             title="Remove from bookmarks"
//                           >
//                             <FaTrashAlt />
//                           </button>
//                         </div>
//                       </div>
                      
//                       <h4 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">{project.title}</h4>
//                       <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                      
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {project.skills.slice(0, 3).map((skill, idx) => (
//                           <span key={idx} className={`${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-1 rounded-full`}>
//                             {skill}
//                           </span>
//                         ))}
//                         {project.skills.length > 3 && (
//                           <span className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} text-xs px-2 py-1 rounded-full`}>
//                             +{project.skills.length - 3} more
//                           </span>
//                         )}
//                       </div>
                      
//                       <div className="flex justify-between items-center text-sm mt-auto">
//                         <span className="flex items-center gap-1 font-medium">
//                           <FaMoneyBillWave className="text-green-500" />
//                           {project.budget}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <FaCode className="text-purple-500" />
//                           {project.type}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <FaClock className="text-yellow-500" />
//                           {project.duration}
//                         </span>
//                       </div>
                      
//                       <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
//                         <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
//                           <FaRegCalendarAlt className="mr-1" />
//                           Bookmarked on {project.bookmarkedOn}
//                         </div>
                        
//                         <button
//                           onClick={(e) => handleOpenBidModal(e, project)}
//                           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
//                         >
//                           Submit Proposal
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Load More Button */}
//                 {pagination.hasNext && (
//                   <div className="text-center mt-8">
//                     <button
//                       onClick={handleLoadMore}
//                       disabled={loadingMore}
//                       className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium flex items-center gap-2 mx-auto"
//                     >
//                       {loadingMore ? (
//                         <>
//                           <FaSpinner className="animate-spin" />
//                           Loading...
//                         </>
//                       ) : (
//                         'Load More Bookmarks'
//                       )}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className={`text-center py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl`}>
//                 <FaRegBookmark className="mx-auto text-gray-400" size={48} />
//                 <h3 className="text-xl font-semibold mt-4 mb-2">No bookmarked projects found</h3>
//                 <p className="text-gray-500 dark:text-gray-400 mb-6">
//                   {filters.searchQuery || filters.budget || filters.type || filters.duration || filters.skill
//                     ? 'Try adjusting your filters or search query'
//                     : 'You haven\'t bookmarked any projects yet'}
//                 </p>
//                 {(filters.searchQuery || filters.budget || filters.type || filters.duration || filters.skill) ? (
//                   <button 
//                     onClick={clearFilters}
//                     className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//                   >
//                     Clear Filters
//                   </button>
//                 ) : (
//                   <Link to="/browse" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block">
//                     Browse Projects
//                   </Link>
//                 )}
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

// export default BookmarksPage;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter, 
  FaChevronDown, 
  FaChevronUp, 
  FaMoneyBillWave, 
  FaCode, 
  FaClock,
  FaStar,
  FaBookmark,
  FaRegBookmark,
  FaEllipsisH,
  FaRegCalendarAlt,
  FaTrashAlt,
  FaExternalLinkAlt,
  FaSpinner
} from 'react-icons/fa';
import ProjectModal from '../Modals/ProjectBidModal';

const BookmarksPage = ({ darkMode }) => {
  const navigate = useNavigate();
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [filters, setFilters] = useState({ 
    budget: '', 
    type: '', 
    duration: '', 
    skill: '',
    searchQuery: ''
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [bidDetails, setBidDetails] = useState({
    bidPrice: '',
    timeToComplete: '',
    backgroundDescription: ''
  });
  
  // API-related state
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalBookmarks: 0,
    hasNext: false,
    hasPrev: false
  });
  const [loadingMore, setLoadingMore] = useState(false);
  
  // Track failed image loads to prevent infinite loops
  const [failedImages, setFailedImages] = useState(new Set());

  // Get userId from localStorage, context, or wherever you store it
  const userId = localStorage.getItem('id'); // Adjust based on your auth implementation

  // Fetch bookmarks from API
  const fetchBookmarks = async (page = 1, append = false) => {
    try {
      if (!append) setLoading(true);
      else setLoadingMore(true);

      const response = await fetch(`http://localhost:5000/api/bookmarks/${userId}?page=${page}&limit=10`);
      const data = await response.json();

      if (data.success) {
        const formattedBookmarks = data.data.map(bookmark => ({
          id: bookmark.project._id,
          bookmarkId: bookmark.id,
          title: bookmark.project.title,
          description: bookmark.project.description,
          budget: `$${bookmark.project.budget_from} - $${bookmark.project.budget_to}`,
          type: bookmark.project.project_type,
          duration: bookmark.project.project_duration,
          skills: bookmark.project.req_skills || [],
          client: {
            name: bookmark.project.client.name,
            email: bookmark.project.client.email,
            profile: bookmark.project.client.profilePhoto || '/default-avatar.png',
            rating: 4.5, // You might want to fetch actual ratings
            title: bookmark.project.client.title,
            location: bookmark.project.client.location
          },
          bookmarkedOn: new Date(bookmark.bookmarkedAt).toLocaleDateString(),
          createdAt: bookmark.project.createdAt
        }));

        if (append) {
          setBookmarks(prev => [...prev, ...formattedBookmarks]);
        } else {
          setBookmarks(formattedBookmarks);
        }
        
        setPagination(data.pagination);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch bookmarks');
      console.error('Error fetching bookmarks:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Remove bookmark from API
  const removeBookmark = async (bookmarkId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookmarks/${bookmarkId}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Remove from local state
        setBookmarks(prev => prev.filter(bookmark => bookmark.bookmarkId !== bookmarkId));
        // Update pagination count
        setPagination(prev => ({
          ...prev,
          totalBookmarks: prev.totalBookmarks - 1
        }));
      } else {
        alert(data.message || 'Failed to remove bookmark');
      }
    } catch (err) {
      console.error('Error removing bookmark:', err);
      alert('Failed to remove bookmark');
    }
  };

  // Load initial bookmarks
  useEffect(() => {
    if (userId) {
      fetchBookmarks();
    } else {
      setError('User not authenticated');
      setLoading(false);
    }
  }, [userId]);

  // Toggle filter expansion
  const toggleFilterExpansion = () => setIsFilterExpanded(prev => !prev);

  // Handle project selection for viewing details
  const handleProjectClick = (project) => {
    navigate(`/project/${project.id}`);
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

  // Handle bid submission
  const handleBidSubmit = () => {
    console.log('Bid submitted:', bidDetails, 'for project:', selectedProject);
    setSelectedProject(null);
    setBidDetails({
      bidPrice: '',
      timeToComplete: '',
      backgroundDescription: ''
    });
    alert('Your bid has been successfully submitted!');
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      budget: '',
      type: '',
      duration: '',
      skill: '',
      searchQuery: ''
    });
  };

  // Get unique values for filters from current bookmarks
  const getUniqueValues = (key) => {
    if (key === 'skills') {
      const allSkills = bookmarks.flatMap(project => project.skills);
      return [...new Set(allSkills)];
    }
    return [...new Set(bookmarks.map(project => project[key]))];
  };

  // Filter projects based on selected filters and search query
  const filteredProjects = bookmarks.filter(project => {
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
  });

  // Remove project from bookmarks
  const handleRemoveBookmark = (bookmarkId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this project from your bookmarks?')) {
      removeBookmark(bookmarkId);
    }
  };

  // Load more bookmarks
  const handleLoadMore = () => {
    if (pagination.hasNext && !loadingMore) {
      fetchBookmarks(pagination.currentPage + 1, true);
    }
  };

  // Handle image error with fallback prevention
  const handleImageError = (e, imageId) => {
    // Prevent infinite loop by checking if we've already failed this image
    if (!failedImages.has(imageId)) {
      setFailedImages(prev => new Set(prev).add(imageId));
      // Use a data URL for a simple avatar instead of another file
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNEM0Q5REYiLz4KPHBhdGggZD0iTTIwIDIwQzIyLjc2MTQgMjAgMjUgMTcuNzYxNCAyNSAxNUMyNSAxMi4yMzg2IDIyLjc2MTQgMTAgMjAgMTBDMTcuMjM4NiAxMCAxNSAxMi4yMzg2IDE1IDE1QzE1IDE3Ljc2MTQgMTcuMjM4NiAyMCAyMCAyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEwIDMwQzEwIDI1LjU4MTcgMTMuNTgxNyAyMiAxOCAyMkgyMkMyNi40MTgzIDIyIDMwIDI1LjU4MTcgMzAgMzBWMzJDMzAgMzMuMTA0NiAyOS4xMDQ2IDM0IDI4IDM0SDEyQzEwLjg5NTQgMzQgMTAgMzMuMTA0NiAxMCAzMlYzMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-lg">Loading your bookmarks...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => fetchBookmarks()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
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
      <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Bookmarked Projects</h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Browse and manage your saved projects ({pagination.totalBookmarks} total)
          </p>
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
                        placeholder="Search bookmarks..."
                        value={filters.searchQuery}
                        onChange={handleSearchChange}
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                        }`}
                      />
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  
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
          
          {/* Bookmarked Projects */}
          <div className="lg:w-3/4">
            {filteredProjects.length > 0 ? (
              <div>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-xl font-bold">{filteredProjects.length} Bookmarked Projects</h2>
                  <div className="text-sm">
                    {filteredProjects.length !== bookmarks.length && (
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Showing {filteredProjects.length} of {bookmarks.length} bookmarks
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                  {filteredProjects.map(project => (
                    <div 
                      key={project.id} 
                      className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300 
                        border-l-4 border-blue-500 dark:border-blue-400 cursor-pointer transform hover:-translate-y-1`} 
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center mb-4">
                          <img 
                            src={project.client.profile} 
                            alt={project.client.name} 
                            className="w-10 h-10 rounded-full mr-3"
                            onError={(e) => handleImageError(e, project.client.email)}
                          />
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{project.client.name}</p>
                            <div className="flex items-center">
                              <div className="flex text-yellow-400">
                                {[...Array(Math.floor(project.client.rating))].map((_, i) => (
                                  <FaStar key={i} size={12} />
                                ))}
                              </div>
                              <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">({project.client.rating})</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => handleRemoveBookmark(project.bookmarkId, e)} 
                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                            title="Remove from bookmarks"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">{project.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className={`${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-1 rounded-full`}>
                            {skill}
                          </span>
                        ))}
                        {project.skills.length > 3 && (
                          <span className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} text-xs px-2 py-1 rounded-full`}>
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
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <FaRegCalendarAlt className="mr-1" />
                          Bookmarked on {project.bookmarkedOn}
                        </div>
                        
                        <button
                          onClick={(e) => handleOpenBidModal(e, project)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                        >
                          Submit Proposal
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {pagination.hasNext && (
                  <div className="text-center mt-8">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium flex items-center gap-2 mx-auto"
                    >
                      {loadingMore ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Loading...
                        </>
                      ) : (
                        'Load More Bookmarks'
                      )}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={`text-center py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl`}>
                <FaRegBookmark className="mx-auto text-gray-400" size={48} />
                <h3 className="text-xl font-semibold mt-4 mb-2">No bookmarked projects found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {filters.searchQuery || filters.budget || filters.type || filters.duration || filters.skill
                    ? 'Try adjusting your filters or search query'
                    : 'You haven\'t bookmarked any projects yet'}
                </p>
                {(filters.searchQuery || filters.budget || filters.type || filters.duration || filters.skill) ? (
                  <button 
                    onClick={clearFilters}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Clear Filters
                  </button>
                ) : (
                  <Link to="/browse" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-block">
                    Browse Projects
                  </Link>
                )}
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

export default BookmarksPage;
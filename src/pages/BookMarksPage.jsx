// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
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
//   FaExternalLinkAlt
// } from 'react-icons/fa';
// import ProjectModal from '../Modals/ProjectBidModal';

// import { bookmarkedProjects } from '../components/AllProject';

// const BookmarksPage = ({ darkMode }) => {
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
//   const [projects, setProjects] = useState(bookmarkedProjects);

//   // Toggle filter expansion
//   const toggleFilterExpansion = () => setIsFilterExpanded(prev => !prev);

//   // Handle project selection for bidding
//   const handleProjectClick = (project) => {
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
//     // Here you would typically send this data to your API
//     setSelectedProject(null);
//     setBidDetails({
//       bidPrice: '',
//       timeToComplete: '',
//       backgroundDescription: ''
//     });
//     // Show success notification
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

//   // Get unique values for filters
//   const getUniqueValues = (key) => {
//     if (key === 'skills') {
//       // Flatten the skills arrays and get unique values
//       const allSkills = bookmarkedProjects.flatMap(project => project.skills);
//       return [...new Set(allSkills)];
//     }
//     return [...new Set(bookmarkedProjects.map(project => project[key]))];
//   };

//   // Filter projects based on selected filters and search query
//   const filteredProjects = projects.filter(project => {
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
//   const handleRemoveBookmark = (projectId, e) => {
//     e.stopPropagation();
//     if (window.confirm('Are you sure you want to remove this project from your bookmarks?')) {
//       setProjects(prev => prev.filter(project => project.id !== projectId));
//     }
//   };

//   return (
//     <div className="min-h-screen pb-16">
//       {/* Page Header */}
//       <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
//         <div className="container mx-auto px-4">
//           <h1 className="text-3xl font-bold">Bookmarked Projects</h1>
//           <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//             Browse and manage your saved projects
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
//                     {filteredProjects.length !== projects.length && (
//                       <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
//                         Showing {filteredProjects.length} of {projects.length} bookmarks
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
//                             onClick={(e) => handleRemoveBookmark(project.id, e)} 
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
//                         <Link to="/browse" className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 flex items-center text-sm">
//                           View Details <FaExternalLinkAlt size={12} className="ml-1" />
//                         </Link>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className={`text-center py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl`}>
//                 <FaRegBookmark className="mx-auto text-gray-400" size={48} />
//                 <h3 className="text-xl font-semibold mt-4 mb-2">No bookmarked projects found</h3>
//                 <p className="text-gray-500 dark:text-gray-400 mb-6">
//                   {searchQuery || filters.budget || filters.type || filters.duration || filters.skill
//                     ? 'Try adjusting your filters or search query'
//                     : 'You haven\'t bookmarked any projects yet'}
//                 </p>
//                 {(searchQuery || filters.budget || filters.type || filters.duration || filters.skill) ? (
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

import React, { useState } from 'react';
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
  FaExternalLinkAlt
} from 'react-icons/fa';
import ProjectModal from '../Modals/ProjectBidModal';

import { bookmarkedProjects } from '../components/AllProject';

const BookmarksPage = ({ darkMode }) => {
  const navigate = useNavigate(); // Add this for navigation
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
  const [projects, setProjects] = useState(bookmarkedProjects);

  // Toggle filter expansion
  const toggleFilterExpansion = () => setIsFilterExpanded(prev => !prev);

  // Handle project selection for viewing details
  const handleProjectClick = (project) => {
    // Navigate to project details page
    navigate(`/project/${project.id}`);
  };

  // Handle opening bid modal separately
  const handleOpenBidModal = (e, project) => {
    e.stopPropagation(); // Prevent the card click event from firing
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
    // Here you would typically send this data to your API
    setSelectedProject(null);
    setBidDetails({
      bidPrice: '',
      timeToComplete: '',
      backgroundDescription: ''
    });
    // Show success notification
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

  // Get unique values for filters
  const getUniqueValues = (key) => {
    if (key === 'skills') {
      // Flatten the skills arrays and get unique values
      const allSkills = bookmarkedProjects.flatMap(project => project.skills);
      return [...new Set(allSkills)];
    }
    return [...new Set(bookmarkedProjects.map(project => project[key]))];
  };

  // Filter projects based on selected filters and search query
  const filteredProjects = projects.filter(project => {
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
  const handleRemoveBookmark = (projectId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to remove this project from your bookmarks?')) {
      setProjects(prev => prev.filter(project => project.id !== projectId));
    }
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Page Header */}
      <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Bookmarked Projects</h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Browse and manage your saved projects
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
                    {filteredProjects.length !== projects.length && (
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Showing {filteredProjects.length} of {projects.length} bookmarks
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
                            onClick={(e) => handleRemoveBookmark(project.id, e)} 
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
                        
                        {/* Add a separate bid button */}
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
// import React, { useState } from 'react';
// import { FaMoneyBillWave, FaCode, FaClock, FaFilter, FaStar, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import ProjectModal from '../Modals/ProjectBidModal';
// import { allProjects } from '../components/AllProject';

// const BrowsePage = ({ darkMode }) => {
//   const [isFilterExpanded, setIsFilterExpanded] = useState(true);
//   const [selectedProject, setSelectedProject] = useState(null);
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
//     sortBy: 'newest' // Default sort
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const projectsPerPage = 9;

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
//     setCurrentPage(1); // Reset to first page on filter change
//   };

//   // Handle search input
//   const handleSearchChange = (e) => {
//     setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
//     setCurrentPage(1); // Reset to first page on search
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

//   // Get unique values for filters
//   const getUniqueValues = (key) => {
//     if (key === 'skills') {
//       // Flatten the skills arrays and get unique values
//       const allSkills = allProjects.flatMap(project => project.skills);
//       return [...new Set(allSkills)];
//     }
//     return [...new Set(allProjects.map(project => project[key]))];
//   };

//   // Filter and sort projects based on selected filters, search query, and sort option
//   const filteredAndSortedProjects = allProjects
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
//           return parseInt(b.budget.split(' - ')[0].replace('$', '')) - 
//                  parseInt(a.budget.split(' - ')[0].replace('$', ''));
//         case 'budget-low':
//           return parseInt(a.budget.split(' - ')[0].replace('$', '')) - 
//                  parseInt(b.budget.split(' - ')[0].replace('$', ''));
//         case 'rating':
//           return b.client.rating - a.client.rating;
//         case 'newest':
//         default:
//           return b.id - a.id; // Assuming higher ID means newer project
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
//                         className="w-10 h-10 rounded-full mr-3"
//                       />
//                       <div>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">{project.client.name}</p>
//                         <div className="flex items-center">
//                           <div className="flex text-yellow-400">
//                             {[...Array(Math.floor(project.client.rating))].map((_, i) => (
//                               <FaStar key={i} size={12} />
//                             ))}
//                           </div>
//                           <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">({project.client.rating})</span>
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaCode, FaClock, FaFilter, FaStar, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ProjectModal from '../Modals/ProjectBidModal';
import { allProjects } from '../components/AllProject';

const BrowsePage = ({ darkMode }) => {
  const navigate = useNavigate(); // Add this for navigation
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
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
    sortBy: 'newest' // Default sort
  });
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  // Toggle filter expansion
  const toggleFilterExpansion = () => setIsFilterExpanded(prev => !prev);

  // Handle project selection for viewing details
  const handleProjectClick = (project) => {
    // Navigate to project details page instead of opening modal
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
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
    setCurrentPage(1); // Reset to first page on search
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

  // Get unique values for filters
  const getUniqueValues = (key) => {
    if (key === 'skills') {
      // Flatten the skills arrays and get unique values
      const allSkills = allProjects.flatMap(project => project.skills);
      return [...new Set(allSkills)];
    }
    return [...new Set(allProjects.map(project => project[key]))];
  };

  // Filter and sort projects based on selected filters, search query, and sort option
  const filteredAndSortedProjects = allProjects
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
          return parseInt(b.budget.split(' - ')[0].replace('$', '')) - 
                 parseInt(a.budget.split(' - ')[0].replace('$', ''));
        case 'budget-low':
          return parseInt(a.budget.split(' - ')[0].replace('$', '')) - 
                 parseInt(b.budget.split(' - ')[0].replace('$', ''));
        case 'rating':
          return b.client.rating - a.client.rating;
        case 'newest':
        default:
          return b.id - a.id; // Assuming higher ID means newer project
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
                      border-l-4 border-blue-500 dark:border-blue-400 cursor-pointer transform hover:-translate-y-1`} 
                    onClick={() => handleProjectClick(project)}
                  >
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
                    
                    <h4 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">{project.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className={`${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-1 rounded-full`}>
                          {skill}
                        </span>
                      ))}
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
                    
                    {/* Add a separate bid button on each card */}
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
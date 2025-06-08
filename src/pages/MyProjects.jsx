// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FaPlus, 
//   FaFilter, 
//   FaSearch, 
//   FaChevronDown, 
//   FaChevronUp, 
//   FaEllipsisV,
//   FaRegCalendarAlt,
//   FaRegClock,
//   FaMoneyBillWave,
//   FaTasks,
//   FaComment,
//   FaRegFile,
//   FaCheck,
//   FaUser,
//   FaTimes
// } from 'react-icons/fa';

// import { myProjects, myProposals } from '../components/AllProject';

// const MyProjectsPage = ({ darkMode }) => {
//   const [activeTab, setActiveTab] = useState('active');
//   const [isFilterExpanded, setIsFilterExpanded] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filters, setFilters] = useState({
//     status: '',
//     sortBy: 'deadline'
//   });
//   const [showProjectDetails, setShowProjectDetails] = useState(null);

//   // Toggle filter expansion
//   const toggleFilterExpansion = () => setIsFilterExpanded(prev => !prev);

//   // Handle filter changes
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   // Handle search input
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setFilters({
//       status: '',
//       sortBy: 'deadline'
//     });
//     setSearchQuery('');
//   };

//   // Filter and sort projects
//   const filteredProjects = (activeTab === 'active' ? myProjects : myProposals)
//     .filter(project => {
//       const matchesSearch = !searchQuery || 
//         (activeTab === 'active' 
//           ? project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             project.description.toLowerCase().includes(searchQuery.toLowerCase())
//           : project.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             project.client.toLowerCase().includes(searchQuery.toLowerCase()));
      
//       return (
//         matchesSearch &&
//         (!filters.status || (activeTab === 'active' ? project.status === filters.status : project.status === filters.status))
//       );
//     })
//     .sort((a, b) => {
//       if (activeTab === 'active') {
//         switch (filters.sortBy) {
//           case 'deadline':
//             // Sort by deadline (assuming format "Month Day, Year")
//             const getDate = (date) => {
//               const [month, day, year] = date.split(' ');
//               return new Date(`${month} ${day.replace(',', '')} ${year}`);
//             };
//             return getDate(a.deadline) - getDate(b.deadline);
//           case 'budget':
//             // Sort by budget (assuming format "$X,XXX")
//             return parseInt(a.budget.replace(/[^0-9]/g, '')) - parseInt(b.budget.replace(/[^0-9]/g, ''));
//           case 'progress':
//             // Sort by progress
//             return b.progress - a.progress;
//           default:
//             return 0;
//         }
//       } else {
//         // Sort proposals
//         switch (filters.sortBy) {
//           case 'date':
//             // Sort by submission date
//             const getDate = (date) => {
//               const [month, day, year] = date.split(' ');
//               return new Date(`${month} ${day.replace(',', '')} ${year}`);
//             };
//             return getDate(b.submittedDate) - getDate(a.submittedDate); // Newest first
//           case 'budget':
//             // Sort by bid amount
//             return parseInt(b.bidAmount.replace(/[^0-9]/g, '')) - parseInt(a.bidAmount.replace(/[^0-9]/g, ''));
//           default:
//             return 0;
//         }
//       }
//     });

//   // Get status color
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'In Progress':
//         return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-300';
//       case 'Completed':
//         return 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300';
//       case 'On Hold':
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-20 dark:text-yellow-300';
//       case 'Under Review':
//         return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-20 dark:text-purple-300';
//       case 'Shortlisted':
//         return 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300';
//       case 'Rejected':
//         return 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-300';
//       default:
//         return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
//     }
//   };

//   return (
//     <div className="min-h-screen pb-16">
//       {/* Page Header */}
//       <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold">My Projects</h1>
//               <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                 Manage your active projects and proposals
//               </p>
//             </div>
//             <button 
//               onClick={() => {}}
//               className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//             >
//               <FaPlus className="mr-2" />
//               Post a New Project
//             </button>
//           </div>
//         </div>
//       </div>
      
//       <div className="container mx-auto px-4 py-8">
//         {/* Tabs */}
//         <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
//           <button
//             className={`py-2 px-4 text-center ${
//               activeTab === 'active' 
//                 ? 'border-b-2 border-blue-600 font-medium text-blue-600' 
//                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('active')}
//           >
//             Active Projects
//           </button>
//           <button
//             className={`py-2 px-4 text-center ${
//               activeTab === 'proposals' 
//                 ? 'border-b-2 border-blue-600 font-medium text-blue-600' 
//                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('proposals')}
//           >
//             My Proposals
//           </button>
//         </div>
        
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
//                         placeholder={`Search ${activeTab === 'active' ? 'projects' : 'proposals'}...`}
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                         className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
//                           darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
//                         }`}
//                       />
//                       <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                     </div>
//                   </div>
                  
//                   {/* Status Filter */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2" htmlFor="status">
//                       Status
//                     </label>
//                     <select
//                       id="status"
//                       name="status"
//                       value={filters.status}
//                       onChange={handleFilterChange}
//                       className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                     >
//                       <option value="">All Statuses</option>
//                       {activeTab === 'active' ? (
//                         <>
//                           <option value="In Progress">In Progress</option>
//                           <option value="Completed">Completed</option>
//                           <option value="On Hold">On Hold</option>
//                         </>
//                       ) : (
//                         <>
//                           <option value="Under Review">Under Review</option>
//                           <option value="Shortlisted">Shortlisted</option>
//                           <option value="Rejected">Rejected</option>
//                         </>
//                       )}
//                     </select>
//                   </div>
                  
//                   {/* Sort By */}
//                   <div>
//                     <label className="block text-sm font-medium mb-2" htmlFor="sortBy">
//                       Sort By
//                     </label>
//                     <select
//                       id="sortBy"
//                       name="sortBy"
//                       value={filters.sortBy}
//                       onChange={handleFilterChange}
//                       className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
//                     >
//                       {activeTab === 'active' ? (
//                         <>
//                           <option value="deadline">Deadline (Upcoming)</option>
//                           <option value="budget">Budget (Highest)</option>
//                           <option value="progress">Progress (Highest)</option>
//                         </>
//                       ) : (
//                         <>
//                           <option value="date">Date (Newest)</option>
//                           <option value="budget">Bid Amount (Highest)</option>
//                         </>
//                       )}
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
//             {/* Active Projects Tab */}
//             {activeTab === 'active' && (
//               <>
//                 {filteredProjects.length > 0 ? (
//                   <div className="grid gap-6 md:grid-cols-2">
//                     {filteredProjects.map(project => (
//                       <div 
//                         key={project.id} 
//                         className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}
//                       >
//                         <div className="p-6">
//                           <div className="flex justify-between items-start">
//                             <h3 className="text-lg font-bold">{project.title}</h3>
//                             <div className="relative">
//                               <button 
//                                 onClick={() => {}}
//                                 className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//                               >
//                                 <FaEllipsisV />
//                               </button>
//                             </div>
//                           </div>
                          
//                           <div className="flex items-center mt-2">
//                             <img 
//                               src={project.client.profile} 
//                               alt={project.client.name} 
//                               className="w-8 h-8 rounded-full mr-2"
//                             />
//                             <div>
//                               <p className="text-sm font-medium">{project.client.name}</p>
//                               <div className="flex items-center text-xs text-yellow-500">
//                                 {[...Array(Math.floor(project.client.rating))].map((_, i) => (
//                                   <span key={i}>★</span>
//                                 ))}
//                                 <span className="text-gray-500 dark:text-gray-400 ml-1">({project.client.rating})</span>
//                               </div>
//                             </div>
//                           </div>
                          
//                           <div className="mt-4">
//                             <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(project.status)}`}>
//                               {project.status}
//                             </span>
//                           </div>
                          
//                           <p className={`mt-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
//                             {project.description}
//                           </p>
                          
//                           <div className="mt-4 space-y-2">
//                             <div className="flex items-center justify-between text-sm">
//                               <div className="flex items-center">
//                                 <FaRegCalendarAlt className="text-blue-500 mr-2" />
//                                 <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Deadline:</span>
//                               </div>
//                               <span className="font-medium">{project.deadline}</span>
//                             </div>
//                             <div className="flex items-center justify-between text-sm">
//                               <div className="flex items-center">
//                                 <FaMoneyBillWave className="text-green-500 mr-2" />
//                                 <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Budget:</span>
//                               </div>
//                               <span className="font-medium">{project.budget}</span>
//                             </div>
//                           </div>
                          
//                           <div className="mt-4">
//                             <div className="flex justify-between text-sm mb-1">
//                               <span>Progress</span>
//                               <span>{project.progress}%</span>
//                             </div>
//                             <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
//                               <div 
//                                 className="h-full bg-blue-600 rounded-full" 
//                                 style={{ width: `${project.progress}%` }}
//                               ></div>
//                             </div>
//                           </div>
                          
//                           <div className="mt-6 flex gap-2">
//                             <button 
//                               onClick={() => setShowProjectDetails(project.id)}
//                               className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
//                             >
//                               View Details
//                             </button>
//                             <Link 
//                               to="/tasklist"
//                               className="px-3 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm"
//                             >
//                               <FaTasks />
//                             </Link>
//                             <Link 
//                               to="/inbox"
//                               className="px-3 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm"
//                             >
//                               <FaComment />
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
//                     <FaRegFile className="mx-auto text-gray-400 text-5xl mb-4" />
//                     <h3 className="text-xl font-semibold mb-2">No projects found</h3>
//                     <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                       {searchQuery || filters.status
//                         ? 'Try adjusting your filters or search query' 
//                         : 'You have no active projects yet.'}
//                     </p>
//                     {(searchQuery || filters.status) && (
//                       <button 
//                         onClick={clearFilters}
//                         className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//                       >
//                         Clear Filters
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </>
//             )}
            
//             {/* Proposals Tab */}
//             {activeTab === 'proposals' && (
//               <>
//                 {filteredProjects.length > 0 ? (
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//                     <div className="overflow-x-auto">
//                       <table className="w-full">
//                         <thead className={`text-left ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b border-gray-200 dark:border-gray-700`}>
//                           <tr>
//                             <th className="py-3 px-4 font-semibold text-sm">Project</th>
//                             <th className="py-3 px-4 font-semibold text-sm">Client</th>
//                             <th className="py-3 px-4 font-semibold text-sm">Submitted</th>
//                             <th className="py-3 px-4 font-semibold text-sm">Status</th>
//                             <th className="py-3 px-4 font-semibold text-sm">Bid Amount</th>
//                             <th className="py-3 px-4 font-semibold text-sm">Duration</th>
//                             <th className="py-3 px-4 font-semibold text-sm"></th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {filteredProjects.map(proposal => (
//                             <tr key={proposal.id} className="border-b border-gray-200 dark:border-gray-700">
//                               <td className="py-4 px-4">
//                                 <div className="font-medium">{proposal.projectTitle}</div>
//                               </td>
//                               <td className="py-4 px-4">{proposal.client}</td>
//                               <td className="py-4 px-4">
//                                 <div className="flex items-center">
//                                   <FaRegCalendarAlt className="text-blue-500 mr-2" />
//                                   <span>{proposal.submittedDate}</span>
//                                 </div>
//                               </td>
//                               <td className="py-4 px-4">
//                                 <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
//                                   {proposal.status}
//                                 </span>
//                               </td>
//                               <td className="py-4 px-4">
//                                 <div className="flex items-center font-medium">
//                                   <FaMoneyBillWave className="text-green-500 mr-2" />
//                                   {proposal.bidAmount}
//                                 </div>
//                               </td>
//                               <td className="py-4 px-4">
//                                 <div className="flex items-center">
//                                   <FaRegClock className="text-purple-500 mr-2" />
//                                   {proposal.proposedDuration}
//                                 </div>
//                               </td>
//                               <td className="py-4 px-4">
//                                 <button 
//                                   className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400"
//                                   onClick={() => {}}
//                                 >
//                                   View
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
//                     <FaRegFile className="mx-auto text-gray-400 text-5xl mb-4" />
//                     <h3 className="text-xl font-semibold mb-2">No proposals found</h3>
//                     <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                       {searchQuery || filters.status
//                         ? 'Try adjusting your filters or search query' 
//                         : 'You have not submitted any proposals yet.'}
//                     </p>
//                     {(searchQuery || filters.status) && (
//                       <button 
//                         onClick={clearFilters}
//                         className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//                       >
//                         Clear Filters
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Project Details Modal */}
//       {showProjectDetails && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
//           <div className={`w-full max-w-4xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl shadow-2xl`}>
//             {myProjects.filter(p => p.id === showProjectDetails).map(project => (
//               <div key={project.id}>
//                 <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
//                   <h3 className="text-xl font-bold">{project.title}</h3>
//                   <button 
//                     onClick={() => setShowProjectDetails(null)}
//                     className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//                   >
//                     <FaTimes />
//                   </button>
//                 </div>
                
//                 <div className="p-6">
//                   <div className="flex flex-col md:flex-row gap-8">
//                     <div className="md:w-2/3">
//                       <div className="mb-6">
//                         <h4 className="text-lg font-semibold mb-2">Project Description</h4>
//                         <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
//                           {project.description}
//                         </p>
//                       </div>
                      
//                       <div className="mb-6">
//                         <h4 className="text-lg font-semibold mb-2">Milestones</h4>
//                         <div className="space-y-3">
//                           {project.milestones.map((milestone, index) => (
//                             <div 
//                               key={index} 
//                               className={`flex items-center p-3 rounded-lg ${
//                                 milestone.completed 
//                                   ? darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-50' 
//                                   : darkMode ? 'bg-gray-700' : 'bg-gray-50'
//                               }`}
//                             >
//                               <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
//                                 milestone.completed 
//                                   ? 'bg-green-500 text-white' 
//                                   : 'bg-gray-300 dark:bg-gray-600'
//                               }`}>
//                                 {milestone.completed ? <FaCheck size={12} /> : index + 1}
//                               </div>
//                               <span className={`${
//                                 milestone.completed && 'font-medium'
//                               }`}>
//                                 {milestone.name}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="md:w-1/3">
//                       <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-6`}>
//                         <h4 className="font-semibold mb-4">Project Details</h4>
                        
//                         <div className="space-y-3">
//                           <div className="flex justify-between text-sm">
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Status:</span>
//                             <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
//                               {project.status}
//                             </span>
//                           </div>
                          
//                           <div className="flex justify-between text-sm">
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Client:</span>
//                             <div className="flex items-center">
//                               <FaUser className="mr-1 text-blue-500" />
//                               <span>{project.client.name}</span>
//                             </div>
//                           </div>
                          
//                           <div className="flex justify-between text-sm">
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Start Date:</span>
//                             <div className="flex items-center">
//                               <FaRegCalendarAlt className="mr-1 text-green-500" />
//                               <span>{project.startDate}</span>
//                             </div>
//                           </div>
                          
//                           <div className="flex justify-between text-sm">
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Deadline:</span>
//                             <div className="flex items-center">
//                               <FaRegCalendarAlt className="mr-1 text-red-500" />
//                               <span>{project.deadline}</span>
//                             </div>
//                           </div>
                          
//                           <div className="flex justify-between text-sm">
//                             <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Budget:</span>
//                             <div className="flex items-center font-medium">
//                               <FaMoneyBillWave className="mr-1 text-green-500" />
//                               <span>{project.budget}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-6`}>
//                         <h4 className="font-semibold mb-4">Progress</h4>
//                         <div className="flex justify-between text-sm mb-2">
//                           <span>Overall Completion</span>
//                           <span className="font-medium">{project.progress}%</span>
//                         </div>
//                         <div className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden mb-4">
//                           <div 
//                             className="h-full bg-blue-600 rounded-full" 
//                             style={{ width: `${project.progress}%` }}
//                           ></div>
//                         </div>
                        
//                         <div className="flex justify-between text-sm">
//                           <span>Milestones Completed</span>
//                           <span className="font-medium">
//                             {project.milestones.filter(m => m.completed).length} of {project.milestones.length}
//                           </span>
//                         </div>
//                       </div>
                      
//                       <div className="flex gap-2">
//                         <Link 
//                           to="/tasklist"
//                           className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center"
//                         >
//                           View Tasks
//                         </Link>
//                         <Link 
//                           to="/inbox"
//                           className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-center"
//                         >
//                           Message Client
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyProjectsPage;

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
  FaTimes
} from 'react-icons/fa';

import { myProjects } from '../components/AllProject';

const MyProjectsPage = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('active');
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    sortBy: 'deadline'
  });
  const [showProjectDetails, setShowProjectDetails] = useState(null);
  const [myBids, setMyBids] = useState([]);
  const [postProject, setPostProject] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const useid = localStorage.getItem('id')
  // Fetch user's bids from API
  const fetchMyBids = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/projects/myBids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: useid // Replace with actual user ID from auth context
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bids');
      }

      const data = await response.json();
      
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
        bidAmount: `$${bid.amount.toLocaleString()}`,
        proposedDuration: bid.deliveryTime,
        coverLetter: bid.coverLetter,
        createdAt: bid.createdAt
      }));

      setMyBids(transformedBids);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching bids:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch bids when component mounts or when switching to proposals tab
  useEffect(() => {
      fetchMyBids();
  }, [activeTab]);

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
      sortBy: activeTab === 'active' ? 'deadline' : 'date'
    });
    setSearchQuery('');
  };

  // Filter and sort projects/bids
  const filteredProjects = (activeTab === 'active' ? myProjects : myBids)
    .filter(item => {
      const matchesSearch = !searchQuery || 
        (activeTab === 'active' 
          ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
          : item.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.projectDescription.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return (
        matchesSearch &&
        (!filters.status || item.status === filters.status)
      );
    })
    .sort((a, b) => {
      if (activeTab === 'active') {
        switch (filters.sortBy) {
          case 'deadline':
            const getDate = (date) => {
              const [month, day, year] = date.split(' ');
              return new Date(`${month} ${day.replace(',', '')} ${year}`);
            };
            return getDate(a.deadline) - getDate(b.deadline);
          case 'budget':
            return parseInt(a.budget.replace(/[^0-9]/g, '')) - parseInt(b.budget.replace(/[^0-9]/g, ''));
          case 'progress':
            return b.progress - a.progress;
          default:
            return 0;
        }
      } else {
        // Sort proposals/bids
        switch (filters.sortBy) {
          case 'date':
            return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
          case 'budget':
            return parseInt(b.bidAmount.replace(/[^0-9]/g, '')) - parseInt(a.bidAmount.replace(/[^0-9]/g, ''));
          default:
            return 0;
        }
      }
    });

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
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
  const closePostProject = ()=>{
    setPostProject(false)
  }

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
            Active Projects
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
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="On Hold">On Hold</option>
                        </>
                      ) : (
                        <>
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Rejected">Rejected</option>
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

                  {/* Refresh Bids Button (only show in bids tab) */}
                  {activeTab === 'proposals' && (
                    <button 
                      onClick={fetchMyBids}
                      disabled={loading}
                      className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium"
                    >
                      {loading ? 'Refreshing...' : 'Refresh Bids'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {postProject && (
            <PostProjectModal onClose={closePostProject}/>
          )}
          
          {/* Projects Grid */}
          <div className="lg:w-3/4">
            {/* Active Projects Tab */}
            {activeTab === 'active' && (
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
            {activeTab === 'proposals' && (
              <>
                {loading ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Loading your bids...</p>
                  </div>
                ) : error ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
                    {/* <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h3 className="text-xl font-semibold mb-2 text-red-600">Error Loading Bids</h3>
                    <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{error}</p>
                    <button 
                      onClick={fetchMyBids}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Try Again
                    </button> */}
                    You haven't placed any Bids
                  </div>
                ) : filteredProjects.length > 0 ? (
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
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bid.status)}`}>
                                  {bid.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center font-medium">
                                  <FaMoneyBillWave className="text-green-500 mr-2" />
                                  {bid.bidAmount}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <FaRegClock className="text-purple-500 mr-2" />
                                  {bid.proposedDuration}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <button 
                                  className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm font-medium"
                                  onClick={() => {
                                    // You can implement a bid details modal here
                                    alert(`Cover Letter: ${bid.coverLetter}`);
                                  }}
                                >
                                  View Details
                                </button>
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
          </div>
        </div>
      </div>
      
      {/* Project Details Modal */}
      {showProjectDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
          <div className={`w-full max-w-4xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl shadow-2xl`}>
            {myProjects.filter(p => p.id === showProjectDetails).map(project => (
              <div key={project.id}>
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <button 
                    onClick={() => setShowProjectDetails(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3">
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2">Project Description</h4>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {project.description}
                        </p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2">Milestones</h4>
                        <div className="space-y-3">
                          {project.milestones.map((milestone, index) => (
                            <div 
                              key={index} 
                              className={`flex items-center p-3 rounded-lg ${
                                milestone.completed 
                                  ? darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-50' 
                                  : darkMode ? 'bg-gray-700' : 'bg-gray-50'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                                milestone.completed 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-gray-300 dark:bg-gray-600'
                              }`}>
                                {milestone.completed ? <FaCheck size={12} /> : index + 1}
                              </div>
                              <span className={`${
                                milestone.completed && 'font-medium'
                              }`}>
                                {milestone.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                     
                    <div className="md:w-1/3">
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-6`}>
                        <h4 className="font-semibold mb-4">Project Details</h4>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Status:</span>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Client:</span>
                            <div className="flex items-center">
                              <FaUser className="mr-1 text-blue-500" />
                              <span>{project.client.name}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Start Date:</span>
                            <div className="flex items-center">
                              <FaRegCalendarAlt className="mr-1 text-green-500" />
                              <span>{project.startDate}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Deadline:</span>
                            <div className="flex items-center">
                              <FaRegCalendarAlt className="mr-1 text-red-500" />
                              <span>{project.deadline}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Budget:</span>
                            <div className="flex items-center font-medium">
                              <FaMoneyBillWave className="mr-1 text-green-500" />
                              <span>{project.budget}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-6`}>
                        <h4 className="font-semibold mb-4">Progress</h4>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Overall Completion</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden mb-4">
                          <div 
                            className="h-full bg-blue-600 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>Milestones Completed</span>
                          <span className="font-medium">
                            {project.milestones.filter(m => m.completed).length} of {project.milestones.length}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link 
                          to="/tasklist"
                          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center"
                        >
                          View Tasks
                        </Link>
                        <Link 
                          to="/inbox"
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-center"
                        >
                          Message Client
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProjectsPage
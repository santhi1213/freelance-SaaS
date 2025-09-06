// import { useState, useEffect } from "react";
// import { 
//   FaUser, FaFilter, FaChevronUp, FaSearch, FaTasks, FaCircle, 
//   FaEye, FaPlay, FaPlus, FaTimes, FaCheck, FaUpload, 
//   FaExclamationTriangle, FaChevronDown, FaHourglassHalf, FaSpinner,
//   FaPaperclip, FaImage
// } from "react-icons/fa";

// const TasklistPage = () => {
//   // Get user role from localStorage
//   const userRole = localStorage.getItem('role') || 'client';
//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('id') || '';
  
//   // State management
//   const [currentUser, setCurrentUser] = useState({
//     id: '',
//     role: userRole,
//     email: '',
//     fullName: ''
//   });
  
//   const [tasks, setTasks] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [selectedProject, setSelectedProject] = useState(null);
  
//   // Filter and search state
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isFilterExpanded, setIsFilterExpanded] = useState(true);
//   const [filters, setFilters] = useState({
//     project: '',
//     priority: '',
//     status: '',
//     assignedTo: ''
//   });
//   const [sortBy, setSortBy] = useState('createdAt');
//   const [sortOrder, setSortOrder] = useState('desc');
  
//   // Modal states
//   const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
//   const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
//   const [showCompletionProofModal, setShowCompletionProofModal] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
  
//   // Form states
//   const [newTask, setNewTask] = useState({
//     title: '',
//     description: '',
//     priority: 'Medium',
//     dueDate: '',
//     projectId: '',
//     bidId: '',
//     assignedTo: ''
//   });
  
//   const [completionProof, setCompletionProof] = useState({
//     description: '',
//     attachments: []
//   });

//   // Status update state
//   const [statusUpdateData, setStatusUpdateData] = useState({
//     status: 'completed',
//     description: '',
//     attachments: []
//   });

//   // API base URL
//   const API_BASE_URL = 'http://localhost:5000';

//   // Load projects for clients
//   const loadProjects = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/freelancer/projects`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           'userId': userId
//         })
//       });
      
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to load projects');
//       }
      
//       setProjects(data.data || []);
      
//       // Automatically select the first project if available
//       if (data.data && data.data.length > 0) {
//         setSelectedProject(data.data[0]);
//         loadProjectTasks(data.data[0]._id);
//         setFilters(prev => ({ ...prev, project: data.data[0]._id }));
//       }
//     } catch (error) {
//       setError('Failed to load projects');
//       console.error('Error loading projects:', error);
//     }
//   };

//   useEffect(() => {
//     loadProjects();
//   }, []);

//   const loadProjectTasks = async (projectId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/tasks`);
//       const data = await response.json();
//       setTasks(data.data || []);
//     } catch (error) {
//       console.error('Error loading project tasks:', error);
//     }
//   };

//   const loadTaskDetails = async (taskId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`);
//       const data = await response.json();
//       setSelectedTask(data.data);
//       setShowTaskDetailsModal(true);
//     } catch (error) {
//       console.error('Error loading task details:', error);
//     }
//   };

//   const handleStatusUpdate = async (taskId, status, description = '', attachments = []) => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('status', status);
      
//       if (description) {
//         formData.append('description', description);
//       }
      
//       // Append attachments if any
//       attachments.forEach((file, index) => {
//         formData.append('attachments', file);
//       });
      
//       const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}/status`, {
//   method: 'PUT',
//   headers: {
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json',   
//   },
//   body: JSON.stringify({
//     status: status,
//     rejectedReason: 'Not enough details'
//   })
// });

      
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to update task status');
//       }
      
//       // Refresh tasks list
//       if (selectedProject) {
//         loadProjectTasks(selectedProject._id);
//       }
      
//       // Close modals
//       setShowCompletionProofModal(false);
//       setShowTaskDetailsModal(false);
      
//       // Reset status update data
//       setStatusUpdateData({
//         status: 'completed',
//         description: '',
//         attachments: []
//       });
      
//       alert('Task status updated successfully!');
//     } catch (error) {
//       setError(error.message || 'Failed to update task status');
//       console.error('Error updating task status:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setStatusUpdateData(prev => ({
//       ...prev,
//       attachments: [...prev.attachments, ...files]
//     }));
//   };

//   const removeAttachment = (index) => {
//     setStatusUpdateData(prev => ({
//       ...prev,
//       attachments: prev.attachments.filter((_, i) => i !== index)
//     }));
//   };

//   // Utility functions
//   const getStatusInfo = (status) => {
//     switch (status) {
//       case 'completed':
//         return { 
//           color: 'text-green-600', 
//           bgColor: 'bg-green-100',
//           icon: <FaCheck className="mr-2" /> 
//         };
//       case 'in_progress':
//         return { 
//           color: 'text-blue-600', 
//           bgColor: 'bg-blue-100',
//           icon: <FaHourglassHalf className="mr-2" /> 
//         };
//       case 'rejected':
//         return { 
//           color: 'text-red-600', 
//           bgColor: 'bg-red-100',
//           icon: <FaTimes className="mr-2" /> 
//         };
//       default:
//         return { 
//           color: 'text-gray-600', 
//           bgColor: 'bg-gray-100',
//           icon: <FaCircle className="mr-2" size={8} /> 
//         };
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'High': return 'text-red-500 bg-red-100';
//       case 'Medium': return 'text-yellow-500 bg-yellow-100';
//       case 'Low': return 'text-green-500 bg-green-100';
//       default: return 'text-gray-500 bg-gray-100';
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'No date set';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const isOverdue = (dueDate, status) => {
//     return dueDate && status !== 'completed' && new Date(dueDate) < new Date();
//   };

//   if (!token) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
//           <p className="text-gray-600">Please log in to access the task management system.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
//               <p className="text-gray-600 mt-1">
//                 {currentUser.role === 'client' 
//                   ? 'Create and manage tasks for your projects' 
//                   : 'View and complete assigned tasks from your accepted projects'}
//               </p>
//             </div>
//           </div>
          
//           {/* Role indicator */}
//           <div className="mt-4">
//             <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//               currentUser.role === 'client' 
//                 ? 'bg-blue-100 text-blue-800' 
//                 : 'bg-green-100 text-green-800'
//             }`}>
//               <FaUser className="mr-1" />
//               {currentUser.role === 'client' ? 'Client' : 'Freelancer'}
//             </span>
//             {currentUser.role === 'freelancer' && projects.length > 0 && (
//               <span className="ml-2 text-sm text-gray-600">
//                 {projects.length} accepted project{projects.length !== 1 ? 's' : ''}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="container mx-auto px-4 py-4">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//             {error}
//             <button 
//               onClick={() => setError('')}
//               className="float-right font-bold text-red-700 hover:text-red-900"
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Projects List */}
//           <div className="lg:w-1/4">
//             <div className="bg-white p-4 rounded-lg shadow">
//               <h2 className="text-lg font-medium text-gray-900 mb-4">Projects</h2>
//               {projects.length > 0 ? (
//                 <div className="space-y-2">
//                   {projects.map(project => (
//                     <div 
//                       key={project._id} 
//                       className={`p-3 rounded-lg cursor-pointer border ${
//                         selectedProject && selectedProject._id === project._id 
//                           ? 'bg-blue-100 border-blue-400' 
//                           : 'bg-white border-gray-200 hover:bg-gray-50'
//                       }`}
//                       onClick={() => {
//                         setSelectedProject(project);
//                         loadProjectTasks(project._id);
//                         setFilters(prev => ({ ...prev, project: project._id }));
//                       }}
//                     >
//                       <h3 className="font-semibold text-gray-800">{project.title}</h3>
//                       <p className="text-sm text-gray-600">
//                         {project.description ? project.description.substring(0, 60) + (project.description.length > 60 ? '...' : '') : 'No description'}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-gray-500 text-center py-4">No Projects Available For you Currently</div>
//               )}
//             </div>
//           </div>

//           {/* Tasks List */}
//           <div className="lg:w-3/4">
//             <div className="bg-white shadow-lg rounded-xl overflow-hidden">
//               {loading ? (
//                 <div className="p-12 text-center">
//                   <FaSpinner className="animate-spin mx-auto text-blue-600 text-4xl mb-4" />
//                   <p className="text-gray-500">Loading tasks...</p>
//                 </div>
//               ) : tasks.length > 0 ? (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50 border-b border-gray-200">
//                       <tr>
//                         <th 
//                           className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                           onClick={() => {
//                             if (sortBy === 'title') {
//                               setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//                             } else {
//                               setSortBy('title');
//                               setSortOrder('asc');
//                             }
//                           }}
//                         >
//                           <div className="flex items-center gap-2">
//                             Task
//                             {sortBy === 'title' && (
//                               sortOrder === 'asc' ? <FaChevronUp className="text-blue-600" /> : <FaChevronDown className="text-blue-600" />
//                             )}
//                           </div>
//                         </th>
//                         <th 
//                           className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                           onClick={() => {
//                             if (sortBy === 'priority') {
//                               setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//                             } else {
//                               setSortBy('priority');
//                               setSortOrder('asc');
//                             }
//                           }}
//                         >
//                           <div className="flex items-center gap-2">
//                             Priority
//                             {sortBy === 'priority' && (
//                               sortOrder === 'asc' ? <FaChevronUp className="text-blue-600" /> : <FaChevronDown className="text-blue-600" />
//                             )}
//                           </div>
//                         </th>
//                         <th 
//                           className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                           onClick={() => {
//                             if (sortBy === 'status') {
//                               setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//                             } else {
//                               setSortBy('status');
//                               setSortOrder('asc');
//                             }
//                           }}
//                         >
//                           <div className="flex items-center gap-2">
//                             Status
//                             {sortBy === 'status' && (
//                               sortOrder === 'asc' ? <FaChevronUp className="text-blue-600" /> : <FaChevronDown className="text-blue-600" />
//                             )}
//                           </div>
//                         </th>
//                         <th 
//                           className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
//                           onClick={() => {
//                             if (sortBy === 'dueDate') {
//                               setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//                             } else {
//                               setSortBy('dueDate');
//                               setSortOrder('asc');
//                             }
//                           }}
//                         >
//                           <div className="flex items-center gap-2">
//                             Due Date
//                             {sortBy === 'dueDate' && (
//                               sortOrder === 'asc' ? <FaChevronUp className="text-blue-600" /> : <FaChevronDown className="text-blue-600" />
//                             )}
//                           </div>
//                         </th>
//                         {currentUser.role === 'client' && (
//                           <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             Assigned To
//                           </th>
//                         )}
//                         <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {tasks.map((task) => {
//                         const statusInfo = getStatusInfo(task.status);
//                         const priorityColor = getPriorityColor(task.priority);
//                         const overdue = isOverdue(task.dueDate, task.status);
                        
//                         return (
//                           <tr 
//                             key={task._id} 
//                             className={`hover:bg-gray-50 transition-colors ${overdue ? 'bg-red-50' : ''}`}
//                           >
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex flex-col">
//                                 <div className="text-sm font-medium text-gray-900 mb-1">
//                                   {task.title}
//                                 </div>
//                                 {task.description && (
//                                   <div className="text-sm text-gray-500 truncate max-w-xs">
//                                     {task.description}
//                                   </div>
//                                 )}
//                                 {overdue && (
//                                   <div className="flex items-center mt-1">
//                                     <FaExclamationTriangle className="text-red-500 mr-1 text-xs" />
//                                     <span className="text-xs text-red-600 font-medium">Overdue</span>
//                                   </div>
//                                 )}
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColor}`}>
//                                 {task.priority}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${statusInfo.bgColor} ${statusInfo.color}`}>
//                                 {statusInfo.icon}
//                                 {task.status.replace('_', ' ').toUpperCase()}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                               <div className={overdue ? 'text-red-600 font-medium' : ''}>
//                                 {formatDate(task.dueDate)}
//                               </div>
//                             </td>
//                             {currentUser.role === 'client' && (
//                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                 {task.assignedTo ? task.assignedTo.fullName : 'Unassigned'}
//                               </td>
//                             )}

//                             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                               <div className="flex items-center justify-end gap-2">
//                                 <button
//                                   onClick={() => loadTaskDetails(task._id)}
//                                   className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
//                                   title="View Details"
//                                 >
//                                   <FaEye />
//                                 </button>
                                
//                                 {/* Freelancer actions */}
//                                 {currentUser.role === 'freelancer' && task.status === 'pending' && (
//                                   <button
//                                     onClick={() => handleStatusUpdate(task._id, 'in_progress')}
//                                     className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
//                                     title="Start Task"
//                                     disabled={loading}
//                                   >
//                                     <FaPlay />
//                                   </button>
//                                 )}
                                
//                                 {/* {currentUser.role === 'freelancer' && task.status === 'in_progress' && (
//                                   <button
//                                     onClick={() => {
//                                       setSelectedTask(task);
//                                       setShowCompletionProofModal(true);
//                                     }}
//                                     className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
//                                     title="Submit Completion Proof"
//                                   >
//                                     <FaUpload />
//                                   </button>
//                                 )} */}
                                
//                                 {/* Client actions */}
//                                 {currentUser.role === 'client' && task.status === 'completed' && (
//                                   <div className="flex gap-1">
//                                     <button
//                                       onClick={() => handleStatusUpdate(task._id, 'approved')}
//                                       className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
//                                       title="Approve Task"
//                                       disabled={loading}
//                                     >
//                                       <FaCheck />
//                                     </button>
//                                     <button
//                                       onClick={() => {
//                                         const reason = prompt('Please provide a reason for rejection:');
//                                         if (reason) {
//                                           handleStatusUpdate(task._id, 'rejected', reason);
//                                         }
//                                       }}
//                                       className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
//                                       title="Reject Task"
//                                       disabled={loading}
//                                     >
//                                       <FaTimes />
//                                     </button>
//                                   </div>
//                                 )}
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : (
//                 <div className="p-12 text-center">
//                   <div className="text-gray-400 mb-4">
//                     <FaTasks className="mx-auto text-6xl mb-4" />
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
//                   <p className="text-gray-500 mb-4">
//                     {searchQuery || Object.values(filters).some(f => f) 
//                       ? 'Try adjusting your filters or search query'
//                       : currentUser.role === 'client' 
//                         ? 'Create your first task to get started'
//                         : 'No tasks have been assigned to you yet'
//                     }
//                   </p>
//                   {currentUser.role === 'client' && !searchQuery && !Object.values(filters).some(f => f) && (
//                     <button 
//                       onClick={() => setShowCreateTaskModal(true)}
//                       className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
//                     >
//                       <FaPlus className="mr-2" />
//                       Create Your First Task
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Task Details Modal */}
//       {showTaskDetailsModal && selectedTask && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//           <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-bold text-gray-900">Task Details</h3>
//               <button
//                 onClick={() => setShowTaskDetailsModal(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Left Column */}
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">Title</h4>
//                   <p className="text-lg font-semibold text-gray-900">{selectedTask.title}</p>
//                 </div>
                
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
//                   <p className="text-gray-700">{selectedTask.description || 'No description provided'}</p>
//                 </div>
                
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">Project</h4>
//                   <p className="text-gray-700">{selectedTask.project?.title || 'N/A'}</p>
//                 </div>
                
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">Bid Details</h4>
//                   <div className="bg-gray-50 p-3 rounded-md">
//                     <p className="text-gray-700"><span className="font-medium">Amount:</span> ${selectedTask.bid?.amount || 'N/A'}</p>
//                     <p className="text-gray-700"><span className="font-medium">Delivery Time:</span> {selectedTask.bid?.deliveryTime || 'N/A'}</p>
//                     <p className="text-gray-700"><span className="font-medium">Cover Letter:</span> {selectedTask.bid?.coverLetter || 'N/A'}</p>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Right Column */}
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
//                     <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusInfo(selectedTask.status).bgColor} ${getStatusInfo(selectedTask.status).color}`}>
//                       {getStatusInfo(selectedTask.status).icon}
//                       {selectedTask.status.replace('_', ' ').toUpperCase()}
//                     </span>
//                   </div>
                  
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500 mb-1">Priority</h4>
//                     <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedTask.priority)}`}>
//                       {selectedTask.priority}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">Due Date</h4>
//                   <p className={`text-gray-700 ${isOverdue(selectedTask.dueDate, selectedTask.status) ? 'text-red-600 font-medium' : ''}`}>
//                     {formatDate(selectedTask.dueDate)}
//                     {isOverdue(selectedTask.dueDate, selectedTask.status) && (
//                       <span className="ml-2 text-xs text-red-600">(Overdue)</span>
//                     )}
//                   </p>
//                 </div>
                
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">Assigned To</h4>
//                   <p className="text-gray-700">
//                     {selectedTask.assignedTo ? (
//                       <span>{selectedTask.assignedTo.fullName} ({selectedTask.assignedTo.email})</span>
//                     ) : (
//                       'Unassigned'
//                     )}
//                   </p>
//                 </div>
                
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">Assigned By</h4>
//                   <p className="text-gray-700">
//                     {selectedTask.assignedBy ? (
//                       <span>{selectedTask.assignedBy.fullName} ({selectedTask.assignedBy.email})</span>
//                     ) : (
//                       'N/A'
//                     )}
//                   </p>
//                 </div>
                
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">Created Date</h4>
//                   <p className="text-gray-700">{formatDate(selectedTask.createdAt)}</p>
//                 </div>
                
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h4>
//                   <p className="text-gray-700">{formatDate(selectedTask.updatedAt)}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-6 pt-4 border-t border-gray-200">
//               <h4 className="text-sm font-medium text-gray-500 mb-2">Completion Proof</h4>
//               {selectedTask.completionProof && selectedTask.completionProof.attachments && selectedTask.completionProof.attachments.length > 0 ? (
//                 <div className="bg-gray-50 p-3 rounded-md">
//                   <p className="text-gray-700 mb-2">Attachments:</p>
//                   <ul className="list-disc list-inside text-sm text-gray-600">
//                     {selectedTask.completionProof.attachments.map((attachment, index) => (
//                       <li key={index}>{attachment.name || `Attachment ${index + 1}`}</li>
//                     ))}
//                   </ul>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 italic">No completion proof submitted yet.</p>
//               )}
//             </div>
            
//             {/* Status Update Section for Freelancers */}
//             {currentUser.role === 'freelancer' && selectedTask.status === 'in_progress' && (
//               <div className="mt-6 pt-4 border-t border-gray-200">
//                 <h4 className="text-sm font-medium text-gray-500 mb-3">Mark Task as Complete</h4>
//                 <div className="bg-blue-50 p-4 rounded-md">
//                   <div className="mb-3">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Description (Optional)
//                     </label>
//                     <textarea
//                       value={statusUpdateData.description}
//                       onChange={(e) => setStatusUpdateData(prev => ({ ...prev, description: e.target.value }))}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                       rows="3"
//                       placeholder="Add any details about the completed work..."
//                     />
//                   </div>
                  
//                   <div className="mb-3">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Attach Screenshots or Files
//                     </label>
//                     <div className="flex items-center justify-center w-full">
//                       <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                           <FaPaperclip className="w-8 h-8 mb-3 text-gray-400" />
//                           <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
//                           <p className="text-xs text-gray-500">PNG, JPG, PDF (Max 10MB)</p>
//                         </div>
//                         <input 
//                           type="file" 
//                           className="hidden" 
//                           multiple
//                           onChange={handleFileUpload}
//                           accept="image/*,.pdf"
//                         />
//                       </label>
//                     </div>
//                   </div>
                  
//                   {statusUpdateData.attachments.length > 0 && (
//                     <div className="mb-4">
//                       <p className="text-sm font-medium text-gray-700 mb-2">Selected files:</p>
//                       <ul className="space-y-2">
//                         {statusUpdateData.attachments.map((file, index) => (
//                           <li key={index} className="flex items-center justify-between bg-white p-2 rounded border">
//                             <div className="flex items-center">
//                               <FaImage className="text-gray-400 mr-2" />
//                               <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
//                             </div>
//                             <button
//                               onClick={() => removeAttachment(index)}
//                               className="text-red-500 hover:text-red-700 ml-2"
//                             >
//                               <FaTimes />
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
                  
//                   <button
//                     onClick={() => handleStatusUpdate(
//                       selectedTask._id, 
//                       'completed', 
//                       statusUpdateData.description,
//                       statusUpdateData.attachments
//                     )}
//                     disabled={loading}
//                     className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium disabled:bg-gray-400"
//                   >
//                     {loading ? 'Submitting...' : 'Mark as Complete'}
//                   </button>
//                 </div>
//               </div>
//             )}
            
//             <div className="flex justify-end mt-6">
//               <button
//                 onClick={() => setShowTaskDetailsModal(false)}
//                 className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Completion Proof Modal */}
//       {showCompletionProofModal && selectedTask && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//           <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-medium text-gray-900">Submit Completion Proof</h3>
//               <button
//                 onClick={() => setShowCompletionProofModal(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <FaTimes />
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   value={completionProof.description}
//                   onChange={(e) => setCompletionProof(prev => ({ ...prev, description: e.target.value }))}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                   rows="4"
//                   placeholder="Describe the work you've completed..."
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Attach Files
//                 </label>
//                 <div className="flex items-center justify-center w-full">
//                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <FaPaperclip className="w-8 h-8 mb-3 text-gray-400" />
//                       <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
//                       <p className="text-xs text-gray-500">PNG, JPG, PDF (Max 10MB)</p>
//                     </div>
//                     <input 
//                       type="file" 
//                       className="hidden" 
//                       multiple
//                       onChange={(e) => {
//                         const files = Array.from(e.target.files);
//                         setCompletionProof(prev => ({
//                           ...prev,
//                           attachments: [...prev.attachments, ...files]
//                         }));
//                       }}
//                       accept="image/*,.pdf"
//                     />
//                   </label>
//                 </div>
//               </div>
              
//               {completionProof.attachments.length > 0 && (
//                 <div>
//                   <p className="text-sm text-gray-600 mb-1">Selected files:</p>
//                   <ul className="space-y-2">
//                     {completionProof.attachments.map((file, index) => (
//                       <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
//                         <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
//                         <button
//                           onClick={() => setCompletionProof(prev => ({
//                             ...prev,
//                             attachments: prev.attachments.filter((_, i) => i !== index)
//                           }))}
//                           className="text-red-500 hover:text-red-700 ml-2"
//                         >
//                           <FaTimes />
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
            
//             <div className="flex justify-end space-x-2 mt-6">
//               <button
//                 onClick={() => setShowCompletionProofModal(false)}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleStatusUpdate(
//                   selectedTask._id, 
//                   'completed', 
//                   completionProof.description,
//                   completionProof.attachments
//                 )}
//                 disabled={loading || !completionProof.description.trim()}
//                 className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 rounded-md"
//               >
//                 {loading ? 'Submitting...' : 'Submit Completion Proof'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TasklistPage;

import { useState, useEffect } from "react";
import { 
  FaUser, FaFilter, FaChevronUp, FaSearch, FaTasks, FaCircle, 
  FaEye, FaPlay, FaPlus, FaTimes, FaCheck, FaUpload, 
  FaExclamationTriangle, FaChevronDown, FaHourglassHalf, FaSpinner,
  FaPaperclip, FaImage
} from "react-icons/fa";

const TasklistPage = () => {
  // Get user details from localStorage
  const userRole = localStorage.getItem('role') || 'client';
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id') || '';
  const userEmail = localStorage.getItem('email') || '';
  
  // State management
  const [currentUser, setCurrentUser] = useState({
    id: userId,
    role: userRole,
    email: userEmail,
    fullName: ''
  });
  
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]); // Store all tasks for filtering
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [filters, setFilters] = useState({
    project: '',
    priority: '',
    status: '',
    assignedTo: ''
  });
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Modal states
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
  const [showCompletionProofModal, setShowCompletionProofModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  
  // Form states
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    projectId: '',
    bidId: '',
    assignedTo: ''
  });
  
  const [completionProof, setCompletionProof] = useState({
    description: '',
    attachments: []
  });

  // Status update state
  const [statusUpdateData, setStatusUpdateData] = useState({
    status: 'completed',
    description: '',
    attachments: []
  });

  // API base URL
  const API_BASE_URL = 'http://localhost:5000';

  // Load projects and tasks based on user role
  const loadData = async () => {
    setLoading(true);
    try {
      if (currentUser.role === 'client') {
        // For clients - load tasks they created using the new API
        await loadClientTasks();
      } else {
        // For freelancers - load projects they're assigned to
        await loadFreelancerProjects();
      }
    } catch (error) {
      setError(`Failed to load ${currentUser.role === 'client' ? 'tasks' : 'projects'}`);
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load tasks created by client
  const loadClientTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to load tasks');
      }
      
      const tasksData = data.data?.tasks || [];
      setAllTasks(tasksData);
      setTasks(tasksData);
      
      // Extract unique projects from tasks
      const uniqueProjects = [];
      const projectIds = new Set();
      
      tasksData.forEach(task => {
        if (task.project && !projectIds.has(task.project._id)) {
          uniqueProjects.push(task.project);
          projectIds.add(task.project._id);
        }
      });
      
      setProjects(uniqueProjects);
      
      // Auto-select first project if available
      if (uniqueProjects.length > 0) {
        setSelectedProject(uniqueProjects[0]);
        filterTasksByProject(uniqueProjects[0]._id, tasksData);
      }
    } catch (error) {
      console.error('Error loading client tasks:', error);
      throw error;
    }
  };

  // Load projects for freelancer
  const loadFreelancerProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/freelancer/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'userId': userId
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to load projects');
      }
      
      setProjects(data.data || []);
      
      // Automatically select the first project if available
      if (data.data && data.data.length > 0) {
        setSelectedProject(data.data[0]);
        loadProjectTasks(data.data[0]._id);
        setFilters(prev => ({ ...prev, project: data.data[0]._id }));
      }
    } catch (error) {
      console.error('Error loading freelancer projects:', error);
      throw error;
    }
  };

  // Filter tasks by selected project (for clients)
  const filterTasksByProject = (projectId, tasksToFilter = allTasks) => {
    const filteredTasks = tasksToFilter.filter(task => task.project && task.project._id === projectId);
    setTasks(filteredTasks);
  };

  // Load tasks for a specific project (for freelancers)
  const loadProjectTasks = async (projectId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/tasks`);
      const data = await response.json();
      setTasks(data.data || []);
    } catch (error) {
      console.error('Error loading project tasks:', error);
    }
  };

  useEffect(() => {
    if (userEmail && token) {
      loadData();
    }
  }, [userEmail, token]);

  const loadTaskDetails = async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`);
      const data = await response.json();
      setSelectedTask(data.data);
      setShowTaskDetailsModal(true);
    } catch (error) {
      console.error('Error loading task details:', error);
    }
  };

  const handleStatusUpdate = async (taskId, status, description = '', attachments = []) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',   
        },
        body: JSON.stringify({
          status: status,
          rejectedReason: description || 'Status updated'
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update task status');
      }
      
      // Refresh tasks list
      if (currentUser.role === 'client') {
        loadClientTasks();
      } else if (selectedProject) {
        loadProjectTasks(selectedProject._id);
      }
      
      // Close modals
      setShowCompletionProofModal(false);
      setShowTaskDetailsModal(false);
      
      // Reset status update data
      setStatusUpdateData({
        status: 'completed',
        description: '',
        attachments: []
      });
      
      alert('Task status updated successfully!');
    } catch (error) {
      setError(error.message || 'Failed to update task status');
      console.error('Error updating task status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setStatusUpdateData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setStatusUpdateData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  // Handle project selection
  const handleProjectSelection = (project) => {
    setSelectedProject(project);
    if (currentUser.role === 'client') {
      filterTasksByProject(project._id);
    } else {
      loadProjectTasks(project._id);
      setFilters(prev => ({ ...prev, project: project._id }));
    }
  };

  // Utility functions
  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return { 
          color: 'text-green-600', 
          bgColor: 'bg-green-100',
          icon: <FaCheck className="mr-2" /> 
        };
      case 'in_progress':
        return { 
          color: 'text-blue-600', 
          bgColor: 'bg-blue-100',
          icon: <FaHourglassHalf className="mr-2" /> 
        };
      case 'rejected':
        return { 
          color: 'text-red-600', 
          bgColor: 'bg-red-100',
          icon: <FaTimes className="mr-2" /> 
        };
      default:
        return { 
          color: 'text-gray-600', 
          bgColor: 'bg-gray-100',
          icon: <FaCircle className="mr-2" size={8} /> 
        };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-100';
      case 'medium': return 'text-yellow-500 bg-yellow-100';
      case 'low': return 'text-green-500 bg-green-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate, status) => {
    return dueDate && status !== 'completed' && new Date(dueDate) < new Date();
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600">Please log in to access the task management system.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
              <p className="text-gray-600 mt-1">
                {currentUser.role === 'client' 
                  ? 'Manage tasks you have created for your projects' 
                  : 'View and complete assigned tasks from your accepted projects'}
              </p>
            </div>
          </div>
          
          {/* Role indicator */}
          <div className="mt-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              currentUser.role === 'client' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              <FaUser className="mr-1" />
              {currentUser.role === 'client' ? 'Client' : 'Freelancer'}
            </span>
            {projects.length > 0 && (
              <span className="ml-2 text-sm text-gray-600">
                {projects.length} {currentUser.role === 'client' ? 'project' : 'accepted project'}{projects.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            <button 
              onClick={() => setError('')}
              className="float-right font-bold text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Projects List */}
          <div className="lg:w-1/4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Projects</h2>
              {projects.length > 0 ? (
                <div className="space-y-2">
                  {projects.map(project => (
                    <div 
                      key={project._id} 
                      className={`p-3 rounded-lg cursor-pointer border ${
                        selectedProject && selectedProject._id === project._id 
                          ? 'bg-blue-100 border-blue-400' 
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => handleProjectSelection(project)}
                    >
                      <h3 className="font-semibold text-gray-800">{project.title}</h3>
                      <p className="text-sm text-gray-600">
                        {project.description ? project.description.substring(0, 60) + (project.description.length > 60 ? '...' : '') : 'No description'}
                      </p>
                      {currentUser.role === 'client' && (
                        <p className="text-xs text-blue-600 mt-1">
                          {tasks.filter(task => task.project && task.project._id === project._id).length} tasks
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-4">
                  No Projects Available {currentUser.role === 'freelancer' ? 'For You Currently' : ''}
                </div>
              )}
            </div>
          </div>

          {/* Tasks List */}
          <div className="lg:w-3/4">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              {loading ? (
                <div className="p-12 text-center">
                  <FaSpinner className="animate-spin mx-auto text-blue-600 text-4xl mb-4" />
                  <p className="text-gray-500">Loading tasks...</p>
                </div>
              ) : tasks.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Task
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Due Date
                        </th>
                        {currentUser.role === 'client' && (
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Assigned To
                          </th>
                        )}
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tasks.map((task) => {
                        const statusInfo = getStatusInfo(task.status);
                        const priorityColor = getPriorityColor(task.priority);
                        const overdue = isOverdue(task.dueDate, task.status);
                        
                        return (
                          <tr 
                            key={task._id} 
                            className={`hover:bg-gray-50 transition-colors ${overdue ? 'bg-red-50' : ''}`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <div className="text-sm font-medium text-gray-900 mb-1">
                                  {task.title}
                                </div>
                                {task.description && (
                                  <div className="text-sm text-gray-500 truncate max-w-xs">
                                    {task.description}
                                  </div>
                                )}
                                {overdue && (
                                  <div className="flex items-center mt-1">
                                    <FaExclamationTriangle className="text-red-500 mr-1 text-xs" />
                                    <span className="text-xs text-red-600 font-medium">Overdue</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColor}`}>
                                {task.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${statusInfo.bgColor} ${statusInfo.color}`}>
                                {statusInfo.icon}
                                {task.status.replace('_', ' ').toUpperCase()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className={overdue ? 'text-red-600 font-medium' : ''}>
                                {formatDate(task.dueDate)}
                              </div>
                            </td>
                            {currentUser.role === 'client' && (
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {task.assignedTo && task.assignedTo ? task.assignedTo.fullName : 'Unassigned'}
                              </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => loadTaskDetails(task._id)}
                                  className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                  title="View Details"
                                >
                                  <FaEye />
                                </button>
                                
                                {/* Freelancer actions */}
                                {currentUser.role === 'freelancer' && task.status === 'pending' && (
                                  <button
                                    onClick={() => handleStatusUpdate(task._id, 'in_progress')}
                                    className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                    title="Start Task"
                                    disabled={loading}
                                  >
                                    <FaPlay />
                                  </button>
                                )}
                                
                                {/* Client actions */}
                                {/* {currentUser.role === 'client' && task.status === 'completed' && (
                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => handleStatusUpdate(task._id, 'approved')}
                                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                      title="Approve Task"
                                      disabled={loading}
                                    >
                                      <FaCheck />
                                    </button>
                                    <button
                                      onClick={() => {
                                        const reason = prompt('Please provide a reason for rejection:');
                                        if (reason) {
                                          handleStatusUpdate(task._id, 'rejected', reason);
                                        }
                                      }}
                                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                      title="Reject Task"
                                      disabled={loading}
                                    >
                                      <FaTimes />
                                    </button>
                                  </div>
                                )} */}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <FaTasks className="mx-auto text-6xl mb-4" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                  <p className="text-gray-500 mb-4">
                    {selectedProject 
                      ? `No tasks found for "${selectedProject.title}"`
                      : currentUser.role === 'client' 
                        ? 'Select a project to view its tasks'
                        : 'No tasks have been assigned to you yet'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Task Details Modal */}
      {showTaskDetailsModal && selectedTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Task Details</h3>
              <button
                onClick={() => setShowTaskDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Title</h4>
                  <p className="text-lg font-semibold text-gray-900">{selectedTask.title}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                  <p className="text-gray-700">{selectedTask.description || 'No description provided'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Project</h4>
                  <p className="text-gray-700">{selectedTask.project?.title || 'N/A'}</p>
                </div>
                
                {selectedTask.bid && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Bid Details</h4>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-gray-700"><span className="font-medium">Amount:</span> ${selectedTask.bid?.amount || 'N/A'}</p>
                      <p className="text-gray-700"><span className="font-medium">Status:</span> {selectedTask.bid?.status || 'N/A'}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusInfo(selectedTask.status).bgColor} ${getStatusInfo(selectedTask.status).color}`}>
                      {getStatusInfo(selectedTask.status).icon}
                      {selectedTask.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Priority</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedTask.priority)}`}>
                      {selectedTask.priority}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Due Date</h4>
                  <p className={`text-gray-700 ${isOverdue(selectedTask.dueDate, selectedTask.status) ? 'text-red-600 font-medium' : ''}`}>
                    {formatDate(selectedTask.dueDate)}
                    {isOverdue(selectedTask.dueDate, selectedTask.status) && (
                      <span className="ml-2 text-xs text-red-600">(Overdue)</span>
                    )}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Created Date</h4>
                  <p className="text-gray-700">{formatDate(selectedTask.createdAt)}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h4>
                  <p className="text-gray-700">{formatDate(selectedTask.updatedAt)}</p>
                </div>
              </div>
            </div>
            
            {/* Status Update Section for Freelancers */}
            {currentUser.role === 'freelancer' && selectedTask.status === 'in_progress' && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-500 mb-3">Mark Task as Complete</h4>
                <div className="bg-blue-50 p-4 rounded-md">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Optional)
                    </label>
                    <textarea
                      value={statusUpdateData.description}
                      onChange={(e) => setStatusUpdateData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      rows="3"
                      placeholder="Add any details about the completed work..."
                    />
                  </div>
                  
                  <button
                    onClick={() => handleStatusUpdate(
                      selectedTask._id, 
                      'completed', 
                      statusUpdateData.description
                    )}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium disabled:bg-gray-400"
                  >
                    {loading ? 'Submitting...' : 'Mark as Complete'}
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowTaskDetailsModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasklistPage;
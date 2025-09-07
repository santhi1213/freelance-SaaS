// import { useState, useEffect } from "react";
// import {
//   FaUser, FaFilter, FaChevronUp, FaSearch, FaTasks, FaCircle,
//   FaEye, FaPlay, FaPlus, FaTimes, FaCheck, FaUpload,
//   FaExclamationTriangle, FaChevronDown, FaHourglassHalf, FaSpinner,
//   FaPaperclip, FaImage, FaCheckCircle, FaExclamationCircle, FaInfoCircle
// } from "react-icons/fa";

// const TasklistPage = () => {
//   // Get user details from localStorage
//   const userRole = localStorage.getItem('role') || 'client';
//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('id') || '';
//   const userEmail = localStorage.getItem('email') || '';

//   // State management
//   const [currentUser, setCurrentUser] = useState({
//     id: userId,
//     role: userRole,
//     email: userEmail,
//     fullName: ''
//   });

//   const [tasks, setTasks] = useState([]);
//   const [allTasks, setAllTasks] = useState([]); // Store all tasks for filtering
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showAttachmentModal, setShowAttachmentModal] = useState(false);
//   const [selectedAttachment, setSelectedAttachment] = useState(null);
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

//   // Notification state
//   const [notifications, setNotifications] = useState([]);

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
//   const handleViewAttachment = (attachment) => {
//     setSelectedAttachment(attachment);
//     setShowAttachmentModal(true);
//   };

//   // API base URL
//   const API_BASE_URL = 'https://freelance-backend-0tw4.onrender.com';

//   // Notification Component
//   const NotificationPopup = ({ notification, onClose }) => {
//     const getNotificationIcon = (type) => {
//       switch (type) {
//         case 'success':
//           return <FaCheckCircle className="text-green-600" size={20} />;
//         case 'error':
//           return <FaExclamationCircle className="text-red-600" size={20} />;
//         case 'warning':
//           return <FaExclamationTriangle className="text-yellow-600" size={20} />;
//         case 'info':
//         default:
//           return <FaInfoCircle className="text-blue-600" size={20} />;
//       }
//     };

//     const getNotificationStyles = (type) => {
//       switch (type) {
//         case 'success':
//           return 'bg-green-50 border-green-200 text-green-800';
//         case 'error':
//           return 'bg-red-50 border-red-200 text-red-800';
//         case 'warning':
//           return 'bg-yellow-50 border-yellow-200 text-yellow-800';
//         case 'info':
//         default:
//           return 'bg-blue-50 border-blue-200 text-blue-800';
//       }
//     };

//     return (
//       <div className={`fixed top-4 right-4 max-w-md w-full bg-white rounded-lg shadow-lg border-l-4 ${getNotificationStyles(notification.type)} z-50 transform transition-all duration-300 ease-in-out`}>
//         <div className="p-4">
//           <div className="flex items-start">
//             <div className="flex-shrink-0">
//               {getNotificationIcon(notification.type)}
//             </div>
//             <div className="ml-3 w-0 flex-1">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h4 className="text-sm font-medium">{notification.title}</h4>
//                   <p className="text-sm mt-1 opacity-90">{notification.message}</p>
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <FaTimes size={14} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Add notification function
//   const addNotification = (type, title, message, duration = 5000) => {
//     const id = Date.now() + Math.random();
//     const newNotification = { id, type, title, message };

//     setNotifications(prev => [...prev, newNotification]);

//     // Auto remove notification after duration
//     setTimeout(() => {
//       setNotifications(prev => prev.filter(notif => notif.id !== id));
//     }, duration);
//   };

//   // Remove notification function
//   const removeNotification = (id) => {
//     setNotifications(prev => prev.filter(notif => notif.id !== id));
//   };

//   // Load projects and tasks based on user role
//   const loadData = async () => {
//     setLoading(true);
//     try {
//       if (currentUser.role === 'client') {
//         // For clients - load tasks they created using the new API
//         await loadClientTasks();
//       } else {
//         // For freelancers - load projects they're assigned to
//         await loadFreelancerProjects();
//       }
//     } catch (error) {
//       setError(`Failed to load ${currentUser.role === 'client' ? 'tasks' : 'projects'}`);
//       addNotification('error', 'Load Error', `Failed to load ${currentUser.role === 'client' ? 'tasks' : 'projects'}. Please try again.`);
//       console.error('Error loading data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load tasks created by client
//   const loadClientTasks = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/user/${userEmail}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to load tasks');
//       }

//       const tasksData = data.data?.tasks || [];
//       setAllTasks(tasksData);
//       setTasks(tasksData);

//       // Extract unique projects from tasks
//       const uniqueProjects = [];
//       const projectIds = new Set();

//       tasksData.forEach(task => {
//         if (task.project && !projectIds.has(task.project._id)) {
//           uniqueProjects.push(task.project);
//           projectIds.add(task.project._id);
//         }
//       });

//       setProjects(uniqueProjects);

//       // Auto-select first project if available
//       if (uniqueProjects.length > 0) {
//         setSelectedProject(uniqueProjects[0]);
//         filterTasksByProject(uniqueProjects[0]._id, tasksData);
//       }
//     } catch (error) {
//       console.error('Error loading client tasks:', error);
//       throw error;
//     }
//   };

//   // Load projects for freelancer
//   const loadFreelancerProjects = async () => {
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
//       console.error('Error loading freelancer projects:', error);
//       throw error;
//     }
//   };

//   // Filter tasks by selected project (for clients)
//   const filterTasksByProject = (projectId, tasksToFilter = allTasks) => {
//     const filteredTasks = tasksToFilter.filter(task => task.project && task.project._id === projectId);
//     setTasks(filteredTasks);
//   };

//   // Load tasks for a specific project (for freelancers)
//   const loadProjectTasks = async (projectId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/tasks`);
//       const data = await response.json();
//       setTasks(data.data || []);
//     } catch (error) {
//       console.error('Error loading project tasks:', error);
//       addNotification('error', 'Error', 'Failed to load project tasks. Please try again.');
//     }
//   };

//   useEffect(() => {
//     if (userEmail && token) {
//       loadData();
//     }
//   }, [userEmail, token]);

//   const loadTaskDetails = async (taskId) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`);
//       const data = await response.json();
//       setSelectedTask(data.data);
//       setShowTaskDetailsModal(true);
//     } catch (error) {
//       console.error('Error loading task details:', error);
//       addNotification('error', 'Error', 'Failed to load task details. Please try again.');
//     }
//   };

//   const handleStatusUpdate = async (taskId, status, description = '', attachments = []) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}/status`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           status: status,
//           rejectedReason: description || 'Status updated'
//         })
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to update task status');
//       }

//       // Refresh tasks list
//       if (currentUser.role === 'client') {
//         loadClientTasks();
//       } else if (selectedProject) {
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

//       // Show success notification
//       const statusText = status.replace('_', ' ').toLowerCase();
//       addNotification('success', 'Task Updated', `Task status has been successfully updated to ${statusText}.`);

//     } catch (error) {
//       setError(error.message || 'Failed to update task status');
//       addNotification('error', 'Update Failed', error.message || 'Failed to update task status. Please try again.');
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

//   // Handle project selection
//   const handleProjectSelection = (project) => {
//     setSelectedProject(project);
//     if (currentUser.role === 'client') {
//       filterTasksByProject(project._id);
//     } else {
//       loadProjectTasks(project._id);
//       setFilters(prev => ({ ...prev, project: project._id }));
//     }
//     addNotification('info', 'Project Selected', `Now viewing tasks for "${project.title}"`);
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
//       case 'high': return 'text-red-500 bg-red-100';
//       case 'medium': return 'text-yellow-500 bg-yellow-100';
//       case 'low': return 'text-green-500 bg-green-100';
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
//       {/* Notifications */}
//       {notifications.map((notification) => (
//         <NotificationPopup
//           key={notification.id}
//           notification={notification}
//           onClose={() => removeNotification(notification.id)}
//         />
//       ))}

//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
//               <p className="text-gray-600 mt-1">
//                 {currentUser.role === 'client'
//                   ? 'Manage tasks you have created for your projects'
//                   : 'View and complete assigned tasks from your accepted projects'}
//               </p>
//             </div>
//           </div>

//           {/* Role indicator */}
//           <div className="mt-4">
//             <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentUser.role === 'client'
//               ? 'bg-blue-100 text-blue-800'
//               : 'bg-green-100 text-green-800'
//               }`}>
//               <FaUser className="mr-1" />
//               {currentUser.role === 'client' ? 'Client' : 'Freelancer'}
//             </span>
//             {projects.length > 0 && (
//               <span className="ml-2 text-sm text-gray-600">
//                 {projects.length} {currentUser.role === 'client' ? 'project' : 'accepted project'}{projects.length !== 1 ? 's' : ''}
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
//                       className={`p-3 rounded-lg cursor-pointer border ${selectedProject && selectedProject._id === project._id
//                         ? 'bg-blue-100 border-blue-400'
//                         : 'bg-white border-gray-200 hover:bg-gray-50'
//                         }`}
//                       onClick={() => handleProjectSelection(project)}
//                     >
//                       <h3 className="font-semibold text-gray-800">{project.title}</h3>
//                       <p className="text-sm text-gray-600">
//                         {project.description ? project.description.substring(0, 60) + (project.description.length > 60 ? '...' : '') : 'No description'}
//                       </p>
//                       {currentUser.role === 'client' && (
//                         <p className="text-xs text-blue-600 mt-1">
//                           {tasks.filter(task => task.project && task.project._id === project._id).length} tasks
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-gray-500 text-center py-4">
//                   No Projects Available {currentUser.role === 'freelancer' ? 'For You Currently' : ''}
//                 </div>
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
//                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Task
//                         </th>
//                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Priority
//                         </th>
//                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Status
//                         </th>
//                         <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           Due Date
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
//                                 {task.assignedTo && task.assignedTo ? task.assignedTo.fullName : 'Unassigned'}
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
//                     {selectedProject
//                       ? `No tasks found for "${selectedProject.title}"`
//                       : currentUser.role === 'client'
//                         ? 'Select a project to view its tasks'
//                         : 'No tasks have been assigned to you yet'
//                     }
//                   </p>
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

//                 {selectedTask.bid && (
//                   <div>
//                     <h4 className="text-sm font-medium text-gray-500 mb-1">Bid Details</h4>
//                     <div className="bg-gray-50 p-3 rounded-md">
//                       <p className="text-gray-700"><span className="font-medium">Amount:</span> ${selectedTask.bid?.amount || 'N/A'}</p>
//                       <p className="text-gray-700"><span className="font-medium">Status:</span> {selectedTask.bid?.status || 'N/A'}</p>
//                     </div>
//                   </div>
//                 )}
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
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">Created Date</h4>
//                   <p className="text-gray-700">{formatDate(selectedTask.createdAt)}</p>
//                 </div>

//                 <div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h4>
//                   <p className="text-gray-700">{formatDate(selectedTask.updatedAt)}</p>
//                 </div>
//                 {/* Attachments Section */}
//                 {selectedTask.attachments && selectedTask.attachments.length > 0 && (
//                   <div className="col-span-2 mt-4 pt-4 border-t border-gray-200">
//                     <h4 className="text-sm font-medium text-gray-500 mb-3">Attachments</h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                       {selectedTask.attachments.map((attachment, index) => (
//                         <div
//                           key={attachment._id || index}
//                           className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
//                           onClick={() => handleViewAttachment(attachment)}
//                         >
//                           <div className="flex items-center">
//                             <FaPaperclip className="text-gray-400 mr-2" />
//                             <div className="flex-1 min-w-0">
//                               <p className="text-sm font-medium text-gray-900 truncate">
//                                 {attachment.originalName || attachment.filename}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 Uploaded: {formatDate(attachment.uploadedAt)}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="mt-2">
//                             <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
//                               View PDF
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
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

//                   <button
//                     onClick={() => handleStatusUpdate(
//                       selectedTask._id,
//                       'completed',
//                       statusUpdateData.description
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
//       {showAttachmentModal && selectedAttachment && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full z-50">
//           <div className="relative top-4 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white min-h-[90vh]">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900">
//                   {selectedAttachment.originalName || selectedAttachment.filename}
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   Uploaded: {formatDate(selectedAttachment.uploadedAt)}
//                 </p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <a
//                   href={selectedAttachment.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md"
//                 >
//                   Open in New Tab
//                 </a>
//                 <button
//                   onClick={() => setShowAttachmentModal(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <FaTimes size={20} />
//                 </button>
//               </div>
//             </div>

//             {/* PDF Viewer */}
//             <div className="bg-gray-100 rounded-lg" style={{ height: 'calc(90vh - 120px)' }}>
//               <iframe
//                 src={selectedAttachment.url}
//                 className="w-full h-full rounded-lg"
//                 title={selectedAttachment.originalName || selectedAttachment.filename}
//               >
//                 <div className="flex items-center justify-center h-full">
//                   <div className="text-center">
//                     <FaExclamationTriangle className="mx-auto text-yellow-500 text-4xl mb-4" />
//                     <p className="text-gray-600 mb-4">
//                       Unable to display PDF in browser.
//                     </p>
//                     <a
//                       href={selectedAttachment.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
//                     >
//                       Download PDF
//                     </a>
//                   </div>
//                 </div>
//               </iframe>
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
  FaPaperclip, FaImage, FaCheckCircle, FaExclamationCircle, FaInfoCircle
} from "react-icons/fa";

const TasklistPage = ({ darkMode }) => {
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
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
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

  // Notification state
  const [notifications, setNotifications] = useState([]);

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
  const handleViewAttachment = (attachment) => {
    setSelectedAttachment(attachment);
    setShowAttachmentModal(true);
  };

  // API base URL
  const API_BASE_URL = 'https://freelance-backend-0tw4.onrender.com';

  // Notification Component
  const NotificationPopup = ({ notification, onClose }) => {
    const getNotificationIcon = (type) => {
      switch (type) {
        case 'success':
          return <FaCheckCircle className="text-green-600" size={20} />;
        case 'error':
          return <FaExclamationCircle className="text-red-600" size={20} />;
        case 'warning':
          return <FaExclamationTriangle className="text-yellow-600" size={20} />;
        case 'info':
        default:
          return <FaInfoCircle className="text-blue-600" size={20} />;
      }
    };

    const getNotificationStyles = (type) => {
      switch (type) {
        case 'success':
          return 'bg-green-50 border-green-200 text-green-800';
        case 'error':
          return 'bg-red-50 border-red-200 text-red-800';
        case 'warning':
          return 'bg-yellow-50 border-yellow-200 text-yellow-800';
        case 'info':
        default:
          return 'bg-blue-50 border-blue-200 text-blue-800';
      }
    };

    return (
      <div className={`fixed top-4 right-4 max-w-md w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-lg border-l-4 ${getNotificationStyles(notification.type)} z-50 transform transition-all duration-300 ease-in-out`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="ml-3 w-0 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium">{notification.title}</h4>
                  <p className="text-sm mt-1 opacity-90">{notification.message}</p>
                </div>
                <button
                  onClick={onClose}
                  className={`ml-4 flex-shrink-0 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                >
                  <FaTimes size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add notification function
  const addNotification = (type, title, message, duration = 5000) => {
    const id = Date.now() + Math.random();
    const newNotification = { id, type, title, message };

    setNotifications(prev => [...prev, newNotification]);

    // Auto remove notification after duration
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, duration);
  };

  // Remove notification function
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

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
      addNotification('error', 'Load Error', `Failed to load ${currentUser.role === 'client' ? 'tasks' : 'projects'}. Please try again.`);
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
      addNotification('error', 'Error', 'Failed to load project tasks. Please try again.');
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
      addNotification('error', 'Error', 'Failed to load task details. Please try again.');
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

      // Show success notification
      const statusText = status.replace('_', ' ').toLowerCase();
      addNotification('success', 'Task Updated', `Task status has been successfully updated to ${statusText}.`);

    } catch (error) {
      setError(error.message || 'Failed to update task status');
      addNotification('error', 'Update Failed', error.message || 'Failed to update task status. Please try again.');
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
    addNotification('info', 'Project Selected', `Now viewing tasks for "${project.title}"`);
  };

  // Utility functions
  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return {
          color: 'text-green-600',
          bgColor: darkMode ? 'bg-green-800 bg-opacity-30' : 'bg-green-100',
          icon: <FaCheck className="mr-2" />
        };
      case 'in_progress':
        return {
          color: 'text-blue-600',
          bgColor: darkMode ? 'bg-blue-800 bg-opacity-30' : 'bg-blue-100',
          icon: <FaHourglassHalf className="mr-2" />
        };
      case 'rejected':
        return {
          color: 'text-red-600',
          bgColor: darkMode ? 'bg-red-800 bg-opacity-30' : 'bg-red-100',
          icon: <FaTimes className="mr-2" />
        };
      default:
        return {
          color: darkMode ? 'text-gray-300' : 'text-gray-600',
          bgColor: darkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-100',
          icon: <FaCircle className="mr-2" size={8} />
        };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return darkMode ? 'text-red-400 bg-red-800 bg-opacity-30' : 'text-red-500 bg-red-100';
      case 'medium': return darkMode ? 'text-yellow-400 bg-yellow-800 bg-opacity-30' : 'text-yellow-500 bg-yellow-100';
      case 'low': return darkMode ? 'text-green-400 bg-green-800 bg-opacity-30' : 'text-green-500 bg-green-100';
      default: return darkMode ? 'text-gray-400 bg-gray-700 bg-opacity-50' : 'text-gray-500 bg-gray-100';
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
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Authentication Required</h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Please log in to access the task management system.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Notifications */}
      {notifications.map((notification) => (
        <NotificationPopup
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}

      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Task Management</h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                {currentUser.role === 'client'
                  ? 'Manage tasks you have created for your projects'
                  : 'View and complete assigned tasks from your accepted projects'}
              </p>
            </div>
          </div>

          {/* Role indicator */}
          <div className="mt-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentUser.role === 'client'
              ? darkMode ? 'bg-blue-800 bg-opacity-30 text-blue-400' : 'bg-blue-100 text-blue-800'
              : darkMode ? 'bg-green-800 bg-opacity-30 text-green-400' : 'bg-green-100 text-green-800'
              }`}>
              <FaUser className="mr-1" />
              {currentUser.role === 'client' ? 'Client' : 'Freelancer'}
            </span>
            {projects.length > 0 && (
              <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {projects.length} {currentUser.role === 'client' ? 'project' : 'accepted project'}{projects.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-4 py-4">
          <div className={`${darkMode ? 'bg-red-900 border-red-700 text-red-300' : 'bg-red-100 border-red-400 text-red-700'} border px-4 py-3 rounded`}>
            {error}
            <button
              onClick={() => setError('')}
              className={`float-right font-bold ${darkMode ? 'text-red-300 hover:text-red-100' : 'text-red-700 hover:text-red-900'}`}
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
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow ${darkMode ? 'border border-gray-700' : ''}`}>
              <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Projects</h2>
              {projects.length > 0 ? (
                <div className="space-y-2">
                  {projects.map(project => (
                    <div
                      key={project._id}
                      className={`p-3 rounded-lg cursor-pointer border transition-all duration-200 ${selectedProject && selectedProject._id === project._id
                        ? darkMode ? 'bg-blue-800 bg-opacity-30 border-blue-400' : 'bg-blue-100 border-blue-400'
                        : darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      onClick={() => handleProjectSelection(project)}
                    >
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{project.title}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {project.description ? project.description.substring(0, 60) + (project.description.length > 60 ? '...' : '') : 'No description'}
                      </p>
                      {currentUser.role === 'client' && (
                        <p className={`text-xs mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          {tasks.filter(task => task.project && task.project._id === project._id).length} tasks
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-4`}>
                  No Projects Available {currentUser.role === 'freelancer' ? 'For You Currently' : ''}
                </div>
              )}
            </div>
          </div>

          {/* Tasks List */}
          <div className="lg:w-3/4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-xl overflow-hidden ${darkMode ? 'border border-gray-700' : ''}`}>
              {loading ? (
                <div className="p-12 text-center">
                  <FaSpinner className={`animate-spin mx-auto ${darkMode ? 'text-blue-400' : 'text-blue-600'} text-4xl mb-4`} />
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Loading tasks...</p>
                </div>
              ) : tasks.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border-b`}>
                      <tr>
                        <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                          Task
                        </th>
                        <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                          Priority
                        </th>
                        <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                          Status
                        </th>
                        <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                          Due Date
                        </th>
                        {currentUser.role === 'client' && (
                          <th className={`px-6 py-4 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                            Assigned To
                          </th>
                        )}
                        <th className={`px-6 py-4 text-right text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
                      {tasks.map((task) => {
                        const statusInfo = getStatusInfo(task.status);
                        const priorityColor = getPriorityColor(task.priority);
                        const overdue = isOverdue(task.dueDate, task.status);

                        return (
                          <tr
                            key={task._id}
                            className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors ${overdue ? (darkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-50') : ''}`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                                  {task.title}
                                </div>
                                {task.description && (
                                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'} truncate max-w-xs`}>
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
                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                              <div className={overdue ? 'text-red-600 font-medium' : ''}>
                                {formatDate(task.dueDate)}
                              </div>
                            </td>
                            {currentUser.role === 'client' && (
                              <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                {task.assignedTo && task.assignedTo ? task.assignedTo.fullName : 'Unassigned'}
                              </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => loadTaskDetails(task._id)}
                                  className={`${darkMode ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-800 hover:bg-opacity-30' : 'text-blue-600 hover:text-blue-900 hover:bg-blue-50'} p-1 rounded transition-colors`}
                                  title="View Details"
                                >
                                  <FaEye />
                                </button>

                                {/* Freelancer actions */}
                                {currentUser.role === 'freelancer' && task.status === 'pending' && (
                                  <button
                                    onClick={() => handleStatusUpdate(task._id, 'in_progress')}
                                    className={`${darkMode ? 'text-green-400 hover:text-green-300 hover:bg-green-800 hover:bg-opacity-30' : 'text-green-600 hover:text-green-900 hover:bg-green-50'} p-1 rounded transition-colors`}
                                    title="Start Task"
                                    disabled={loading}
                                  >
                                    <FaPlay />
                                  </button>
                                )}
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
                  <div className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-4`}>
                    <FaTasks className="mx-auto text-6xl mb-4" />
                  </div>
                  <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>No tasks found</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} mb-4`}>
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
          <div className={`relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Task Details</h3>
              <button
                onClick={() => setShowTaskDetailsModal(false)}
                className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Title</h4>
                  <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedTask.title}</p>
                </div>

                <div>
                  <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Description</h4>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedTask.description || 'No description provided'}</p>
                </div>

                <div>
                  <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Project</h4>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{selectedTask.project?.title || 'N/A'}</p>
                </div>

                {selectedTask.bid && (
                  <div>
                    <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Bid Details</h4>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-3 rounded-md`}>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><span className="font-medium">Amount:</span> ${selectedTask.bid?.amount || 'N/A'}</p>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}><span className="font-medium">Status:</span> {selectedTask.bid?.status || 'N/A'}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Status</h4>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusInfo(selectedTask.status).bgColor} ${getStatusInfo(selectedTask.status).color}`}>
                      {getStatusInfo(selectedTask.status).icon}
                      {selectedTask.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Priority</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedTask.priority)}`}>
                      {selectedTask.priority}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Due Date</h4>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} ${isOverdue(selectedTask.dueDate, selectedTask.status) ? 'text-red-600 font-medium' : ''}`}>
                    {formatDate(selectedTask.dueDate)}
                    {isOverdue(selectedTask.dueDate, selectedTask.status) && (
                      <span className="ml-2 text-xs text-red-600">(Overdue)</span>
                    )}
                  </p>
                </div>

                <div>
                  <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Created Date</h4>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{formatDate(selectedTask.createdAt)}</p>
                </div>

                <div>
                  <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Last Updated</h4>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{formatDate(selectedTask.updatedAt)}</p>
                </div>
                {/* Attachments Section */}
                {selectedTask.attachments && selectedTask.attachments.length > 0 && (
                  <div className={`col-span-2 mt-4 pt-4 border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>Attachments</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {selectedTask.attachments.map((attachment, index) => (
                        <div
                          key={attachment._id || index}
                          className={`border ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} rounded-lg p-3 cursor-pointer transition-colors`}
                          onClick={() => handleViewAttachment(attachment)}
                        >
                          <div className="flex items-center">
                            <FaPaperclip className={`${darkMode ? 'text-gray-400' : 'text-gray-400'} mr-2`} />
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                                {attachment.originalName || attachment.filename}
                              </p>
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Uploaded: {formatDate(attachment.uploadedAt)}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <button className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} text-xs font-medium transition-colors`}>
                              View PDF
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Status Update Section for Freelancers */}
            {currentUser.role === 'freelancer' && selectedTask.status === 'in_progress' && (
              <div className={`mt-6 pt-4 border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>Mark Task as Complete</h4>
                <div className={`${darkMode ? 'bg-blue-900 bg-opacity-30' : 'bg-blue-50'} p-4 rounded-md`}>
                  <div className="mb-3">
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Description (Optional)
                    </label>
                    <textarea
                      value={statusUpdateData.description}
                      onChange={(e) => setStatusUpdateData(prev => ({ ...prev, description: e.target.value }))}
                      className={`w-full px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-500' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'} rounded-md focus:outline-none focus:ring-1`}
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
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium disabled:bg-gray-400 transition-colors"
                  >
                    {loading ? 'Submitting...' : 'Mark as Complete'}
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowTaskDetailsModal(false)}
                className={`px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} rounded-md font-medium transition-colors`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showAttachmentModal && selectedAttachment && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full z-50">
          <div className={`relative top-4 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} min-h-[90vh]`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedAttachment.originalName || selectedAttachment.filename}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Uploaded: {formatDate(selectedAttachment.uploadedAt)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedAttachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
                >
                  Open in New Tab
                </a>
                <button
                  onClick={() => setShowAttachmentModal(false)}
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`} style={{ height: 'calc(90vh - 120px)' }}>
              <iframe
                src={selectedAttachment.url}
                className="w-full h-full rounded-lg"
                title={selectedAttachment.originalName || selectedAttachment.filename}
              >
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <FaExclamationTriangle className="mx-auto text-yellow-500 text-4xl mb-4" />
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      Unable to display PDF in browser.
                    </p>
                    <a
                      href={selectedAttachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasklistPage;
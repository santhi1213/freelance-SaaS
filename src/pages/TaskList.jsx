import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFilter, 
  FaSearch, 
  FaChevronDown, 
  FaChevronUp, 
  FaPlus, 
  FaTasks, 
  FaCalendarAlt, 
  FaExclamationCircle, 
  FaCheck, 
  FaHourglassHalf,
  FaCircle,
  FaEdit,
  FaTrashAlt,
  FaSort
} from 'react-icons/fa';
import { myTasks } from '../components/AllProject';

const TasklistPage = ({ darkMode }) => {
  const [tasks, setTasks] = useState(myTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [filters, setFilters] = useState({
    project: '',
    priority: '',
    status: ''
  });
  const [sortBy, setSortBy] = useState('deadline');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    project: '',
    deadline: '',
    priority: 'Medium',
    status: 'Not Started',
    description: ''
  });
  const [editingTask, setEditingTask] = useState(null);

  // Get unique values for filters
  const getUniqueValues = (key) => {
    return [...new Set(myTasks.map(task => task[key]))];
  };

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
      project: '',
      priority: '',
      status: ''
    });
    setSearchQuery('');
  };

  // Toggle sort order
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Handle new task input changes
  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  // Add a new task
  const handleAddTask = () => {
    const taskToAdd = {
      ...newTask,
      id: Math.max(...tasks.map(task => task.id)) + 1
    };
    
    setTasks(prev => [...prev, taskToAdd]);
    setNewTask({
      title: '',
      project: '',
      deadline: '',
      priority: 'Medium',
      status: 'Not Started',
      description: ''
    });
    setShowAddTaskModal(false);
  };

  // Edit a task
  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      project: task.project,
      deadline: task.deadline,
      priority: task.priority,
      status: task.status,
      description: task.description
    });
    setShowAddTaskModal(true);
  };

  // Update a task
  const handleUpdateTask = () => {
    setTasks(prev => 
      prev.map(task => 
        task.id === editingTask.id ? { ...task, ...newTask } : task
      )
    );
    setEditingTask(null);
    setNewTask({
      title: '',
      project: '',
      deadline: '',
      priority: 'Medium',
      status: 'Not Started',
      description: ''
    });
    setShowAddTaskModal(false);
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  // Mark task as completed
  const handleMarkComplete = (taskId) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status: 'Completed' } : task
      )
    );
  };

  // Filter and sort tasks
  const filteredAndSortedTasks = tasks
    .filter(task => {
      const matchesSearch = !searchQuery || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return (
        matchesSearch &&
        (!filters.project || task.project === filters.project) &&
        (!filters.priority || task.priority === filters.priority) &&
        (!filters.status || task.status === filters.status)
      );
    })
    .sort((a, b) => {
      // Convert deadline strings to Date objects for comparison
      const getDateValue = (dateStr) => {
        const [month, day, year] = dateStr.split(' ');
        const monthMap = {
          'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
          'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
        };
        return new Date(parseInt(year), monthMap[month], parseInt(day));
      };
      
      let valueA, valueB;
      
      switch (sortBy) {
        case 'deadline':
          valueA = getDateValue(a.deadline);
          valueB = getDateValue(b.deadline);
          break;
        case 'priority':
          const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
          valueA = priorityOrder[a.priority];
          valueB = priorityOrder[b.priority];
          break;
        case 'status':
          const statusOrder = { 'Not Started': 0, 'In Progress': 1, 'Completed': 2 };
          valueA = statusOrder[a.status];
          valueB = statusOrder[b.status];
          break;
        default:
          valueA = a[sortBy];
          valueB = b[sortBy];
      }
      
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'Completed':
        return { 
          color: 'text-green-500', 
          bgColor: darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-100',
          icon: <FaCheck className="mr-2" /> 
        };
      case 'In Progress':
        return { 
          color: 'text-blue-500', 
          bgColor: darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-100',
          icon: <FaHourglassHalf className="mr-2" /> 
        };
      case 'Not Started':
        return { 
          color: 'text-gray-500', 
          bgColor: darkMode ? 'bg-gray-700' : 'bg-gray-200',
          icon: <FaCircle className="mr-2" size={8} /> 
        };
      default:
        return { 
          color: 'text-gray-500', 
          bgColor: darkMode ? 'bg-gray-700' : 'bg-gray-200',
          icon: <FaCircle className="mr-2" size={8} /> 
        };
    }
  };

  // Check if a task is past its deadline
  const isPastDeadline = (deadlineStr) => {
    const [month, day, year] = deadlineStr.split(' ');
    const monthMap = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    const deadline = new Date(parseInt(year), monthMap[month], parseInt(day));
    const today = new Date();
    return deadline < today && !(
      deadline.getDate() === today.getDate() && 
      deadline.getMonth() === today.getMonth() && 
      deadline.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Page Header */}
      <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Task List</h1>
              <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Manage your tasks across all projects
              </p>
            </div>
            <button 
              onClick={() => setShowAddTaskModal(true)}
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FaPlus className="mr-2" />
              Add New Task
            </button>
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
                  <span>Filter Tasks</span>
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
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                        }`}
                      />
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Project Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="project">
                      Project
                    </label>
                    <select
                      id="project"
                      name="project"
                      value={filters.project}
                      onChange={handleFilterChange}
                      className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    >
                      <option value="">All Projects</option>
                      {getUniqueValues('project').map((project, index) => (
                        <option key={index} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Priority Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="priority">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={filters.priority}
                      onChange={handleFilterChange}
                      className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    >
                      <option value="">All Priorities</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
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
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
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
          
          {/* Tasks Table */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
              {filteredAndSortedTasks.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b border-gray-200 dark:border-gray-700`}>
                      <tr>
                        <th className="py-3 px-4 text-left">
                          <button 
                            onClick={() => handleSort('title')}
                            className="flex items-center font-semibold text-sm"
                          >
                            Task
                            <FaSort className="ml-1 text-gray-400" />
                          </button>
                        </th>
                        <th className="py-3 px-4 text-left">
                          <button 
                            onClick={() => handleSort('project')}
                            className="flex items-center font-semibold text-sm"
                          >
                            Project
                            <FaSort className="ml-1 text-gray-400" />
                          </button>
                        </th>
                        <th className="py-3 px-4 text-left">
                          <button 
                            onClick={() => handleSort('deadline')}
                            className="flex items-center font-semibold text-sm"
                          >
                            Deadline
                            <FaSort className="ml-1 text-gray-400" />
                          </button>
                        </th>
                        <th className="py-3 px-4 text-left">
                          <button 
                            onClick={() => handleSort('priority')}
                            className="flex items-center font-semibold text-sm"
                          >
                            Priority
                            <FaSort className="ml-1 text-gray-400" />
                          </button>
                        </th>
                        <th className="py-3 px-4 text-left">
                          <button 
                            onClick={() => handleSort('status')}
                            className="flex items-center font-semibold text-sm"
                          >
                            Status
                            <FaSort className="ml-1 text-gray-400" />
                          </button>
                        </th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAndSortedTasks.map((task) => {
                        const statusInfo = getStatusInfo(task.status);
                        const isOverdue = isPastDeadline(task.deadline) && task.status !== 'Completed';
                        
                        return (
                          <tr key={task.id} className={`border-b border-gray-200 dark:border-gray-700 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                            <td className="py-4 px-4">
                              <div className="font-medium">{task.title}</div>
                              <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{task.description.length > 60 ? task.description.substring(0, 60) + '...' : task.description}</div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm">{task.project}</span>
                            </td>
                            <td className="py-4 px-4">
                              <div className={`flex items-center ${isOverdue ? 'text-red-500' : ''}`}>
                                {isOverdue && <FaExclamationCircle className="mr-1" />}
                                <FaCalendarAlt className="mr-2 text-blue-500" />
                                <span className="text-sm">{task.deadline}</span>
                              </div>
                              {isOverdue && <div className="text-xs text-red-500 mt-1">Overdue</div>}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color} ${statusInfo.bgColor}`}>
                                {statusInfo.icon}
                                {task.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <div className="flex items-center justify-center space-x-2">
                                {task.status !== 'Completed' && (
                                  <button 
                                    onClick={() => handleMarkComplete(task.id)}
                                    className="p-1 text-green-500 hover:text-green-700 dark:hover:text-green-400"
                                    title="Mark as Complete"
                                  >
                                    <FaCheck />
                                  </button>
                                )}
                                <button 
                                  onClick={() => handleEditTask(task)}
                                  className="p-1 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                                  title="Edit Task"
                                >
                                  <FaEdit />
                                </button>
                                <button 
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="p-1 text-red-500 hover:text-red-700 dark:hover:text-red-400"
                                  title="Delete Task"
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <FaTasks className="mx-auto text-gray-400 text-5xl mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
                  <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {searchQuery || filters.project || filters.priority || filters.status 
                      ? 'Try adjusting your filters or search query' 
                      : 'You have no tasks yet. Add a new task to get started.'}
                  </p>
                  {(searchQuery || filters.project || filters.priority || filters.status) && (
                    <button 
                      onClick={clearFilters}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl shadow-2xl`}>
            <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className="text-xl font-bold">{editingTask ? 'Edit Task' : 'Add New Task'}</h3>
            </div>
            <div className="p-6 space-y-4">
              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="task-title">Task Title</label>
                <input
                  type="text"
                  id="task-title"
                  name="title"
                  value={newTask.title}
                  onChange={handleNewTaskChange}
                  placeholder="Enter task title"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>
              
              {/* Project */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="task-project">Project</label>
                <input
                  type="text"
                  id="task-project"
                  name="project"
                  value={newTask.project}
                  onChange={handleNewTaskChange}
                  placeholder="Enter project name"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>
              
              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="task-deadline">Deadline</label>
                <input
                  type="text"
                  id="task-deadline"
                  name="deadline"
                  value={newTask.deadline}
                  onChange={handleNewTaskChange}
                  placeholder="e.g. May 15, 2025"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>
              
              {/* Priority */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="task-priority">Priority</label>
                <select
                  id="task-priority"
                  name="priority"
                  value={newTask.priority}
                  onChange={handleNewTaskChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              
              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="task-status">Status</label>
                <select
                  id="task-status"
                  name="status"
                  value={newTask.status}
                  onChange={handleNewTaskChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="task-description">Description</label>
                <textarea
                  id="task-description"
                  name="description"
                  value={newTask.description}
                  onChange={handleNewTaskChange}
                  rows={3}
                  placeholder="Enter task description"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                ></textarea>
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-end space-x-3`}>
              <button 
                onClick={() => {
                  setShowAddTaskModal(false);
                  setEditingTask(null);
                  setNewTask({
                    title: '',
                    project: '',
                    deadline: '',
                    priority: 'Medium',
                    status: 'Not Started',
                    description: ''
                  });
                }}
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button 
                onClick={editingTask ? handleUpdateTask : handleAddTask}
                disabled={!newTask.title || !newTask.project || !newTask.deadline}
                className={`px-4 py-2 rounded-lg ${
                  !newTask.title || !newTask.project || !newTask.deadline
                    ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {editingTask ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasklistPage;
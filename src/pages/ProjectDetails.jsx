import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowLeft,
  FaMoneyBillWave, 
  FaCode, 
  FaClock,
  FaCalendarAlt,
  FaStar,
  FaUser,
  FaCheckCircle,
  FaRegClock,
  FaClipboardList,
  FaComment,
  FaFileAlt,
  FaRegFilePdf,
  FaExclamationCircle,
  FaUserCircle,
  FaSearch,
  FaPaperPlane
} from 'react-icons/fa';

import { allProjects, myProjects, bookmarkedProjects } from '../components/AllProject';
import ProjectBidModal from '../Modals/ProjectBidModal';


const ProjectDetailsPage = ({ darkMode }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidDetails, setBidDetails] = useState({
    bidPrice: '',
    timeToComplete: '',
    backgroundDescription: ''
  });
  const [similarProjects, setSimilarProjects] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  // Find project based on ID
  useEffect(() => {
    // First check in user's projects
    let foundProject = myProjects.find(p => p.id.toString() === projectId);
    
    // If not found, check in all projects
    if (!foundProject) {
      foundProject = allProjects.find(p => p.id.toString() === projectId);
    }
    if (!foundProject) {
      foundProject = bookmarkedProjects.find(p => p.id.toString() === projectId);
    }
    
    if (foundProject) {
      setProject(foundProject);
      
      // Find similar projects based on type and skills
      const similar = allProjects
        .filter(p => 
          p.id !== foundProject.id && 
          (p.type === foundProject.type || 
          // Add null check for skills property
          (foundProject.skills && p.skills && 
           p.skills.some(skill => foundProject.skills.includes(skill))))
        )
        .slice(0, 3);
      
      setSimilarProjects(similar);
    }
    
    setIsLoading(false);
  }, [projectId]);
  
  // Handle going back
  const handleBack = () => {
    navigate(-1);
  };
  
  // Handle bid form changes
  const handleBidChange = (e) => {
    const { name, value } = e.target;
    setBidDetails(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle new message input
  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Here would be the logic to send the message to the API
    console.log('Message sent:', newMessage);
    
    // Clear the input field
    setNewMessage('');
  };
  
  // Handle bid submission
  const handleBidSubmit = () => {
    console.log('Bid submitted:', bidDetails, 'for project:', project);
    // Here you would typically send this data to your API
    setShowBidModal(false);
    setBidDetails({
      bidPrice: '',
      timeToComplete: '',
      backgroundDescription: ''
    });
    // Show success notification
    alert('Your bid has been successfully submitted!');
  };
  
  // Format budget range
  const formatBudgetRange = (budget) => {
    if (!budget) return '';
    
    // Extract min and max values
    const match = budget.match(/\$(\d+)\s*-\s*\$(\d+)/);
    if (!match) return budget;
    
    const min = parseInt(match[1]);
    const max = parseInt(match[2]);
    
    return {
      min,
      max,
      average: (min + max) / 2,
      formatted: budget
    };
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading project details...</p>
        </div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <FaExclamationCircle className="text-red-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/browse"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block"
          >
            Browse Projects
          </Link>
        </div>
      </div>
    );
  }
  
  const budget = formatBudgetRange(project.budget);
  const isUserProject = myProjects.some(p => p.id === project.id);
  
  return (
    <div className="min-h-screen pb-16">
      {/* Page Header */}
      <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <button
            onClick={handleBack}
            className="flex items-center font-medium mb-6 hover:text-blue-600"
          >
            <FaArrowLeft className="mr-2" />
            Back to Projects
          </button>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <div className="flex items-center mt-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  darkMode ? 'bg-blue-900 bg-opacity-20 text-blue-300' : 'bg-blue-100 text-blue-800'
                } mr-2`}>
                  {project.type}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Posted {project.postedDate || '2 days ago'}
                </span>
              </div>
            </div>
            
            {!isUserProject && (
              <button
                onClick={() => setShowBidModal(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Submit a Proposal
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex overflow-x-auto">
                <button
                  className={`py-2 px-4 font-medium whitespace-nowrap ${
                    activeTab === 'details' 
                      ? 'border-b-2 border-blue-600 text-blue-600' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab('details')}
                >
                  Project Details
                </button>
                {isUserProject && (
                  <>
                    <button
                      className={`py-2 px-4 font-medium whitespace-nowrap ${
                        activeTab === 'tasks' 
                          ? 'border-b-2 border-blue-600 text-blue-600' 
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('tasks')}
                    >
                      Tasks
                    </button>
                    <button
                      className={`py-2 px-4 font-medium whitespace-nowrap ${
                        activeTab === 'files' 
                          ? 'border-b-2 border-blue-600 text-blue-600' 
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('files')}
                    >
                      Files & Documents
                    </button>
                    <button
                      className={`py-2 px-4 font-medium whitespace-nowrap ${
                        activeTab === 'messages' 
                          ? 'border-b-2 border-blue-600 text-blue-600' 
                          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('messages')}
                    >
                      Messages
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Tab Content */}
            <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8`}>
              {/* Details Tab */}
              {activeTab === 'details' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Project Description</h2>
                  <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  
                  <h3 className="text-lg font-bold mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.skills && project.skills.map((skill, idx) => (
                        <span 
                        key={idx} 
                        className={`${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'} px-3 py-1 rounded-full text-sm`}
                        >
                        {skill}
                        </span>
                    ))}
                 </div>
                  
                  <h3 className="text-lg font-bold mb-3">Deliverables</h3>
                  <ul className={`list-disc list-inside mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li className="mb-2">Complete and fully functional implementation of the described project</li>
                    <li className="mb-2">Clean, well-documented, and maintainable code</li>
                    <li className="mb-2">Responsive design that works on all devices</li>
                    <li className="mb-2">Basic documentation for setup and usage</li>
                    <li>All source files and assets used in the project</li>
                  </ul>
                  
                  {!isUserProject && (
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'} mb-6`}>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <FaExclamationCircle className="text-blue-600 mr-2" />
                        Tips for Submitting a Great Proposal
                      </h3>
                      <ul className={`list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <li className="mb-1">Address the client's specific requirements</li>
                        <li className="mb-1">Highlight your relevant experience and portfolio</li>
                        <li className="mb-1">Be clear about your timeline and approach</li>
                        <li className="mb-1">Set a competitive price within the client's budget</li>
                        <li>Ask clarifying questions if needed</li>
                      </ul>
                    </div>
                  )}
                  
                  {isUserProject && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-bold mb-3">Project Timeline</h3>
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="relative">
                          <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-blue-600"></div>
                          {project.milestones && project.milestones.map((milestone, index) => (
                            <div key={index} className="relative pl-10 pb-8 last:pb-0">
                              <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                milestone.completed 
                                  ? 'bg-green-500 text-white' 
                                  : index === project.milestones.findIndex(m => !m.completed)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                              }`}>
                                {milestone.completed ? <FaCheckCircle /> : index + 1}
                              </div>
                              <h4 className="font-semibold">{milestone.name}</h4>
                              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {milestone.completed 
                                  ? 'Completed' 
                                  : index === project.milestones.findIndex(m => !m.completed)
                                    ? 'In Progress'
                                    : 'Upcoming'}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Tasks Tab */}
              {activeTab === 'tasks' && isUserProject && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Project Tasks</h2>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                      Add New Task
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {project.milestones && project.milestones.map((milestone, mIndex) => (
                      <div key={mIndex} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className="flex items-center mb-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                            milestone.completed 
                              ? 'bg-green-500 text-white' 
                              : 'bg-blue-600 text-white'
                          }`}>
                            {milestone.completed ? <FaCheckCircle size={12} /> : mIndex + 1}
                          </div>
                          <h3 className="font-semibold">{milestone.name}</h3>
                          <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                            milestone.completed 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300' 
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-300'
                          }`}>
                            {milestone.completed ? 'Completed' : 'In Progress'}
                          </span>
                        </div>
                        
                        <div className="pl-9 space-y-2">
                          {/* Mock tasks for each milestone */}
                          {[1, 2, 3].map((task, tIndex) => (
                            <div key={tIndex} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-0">
                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  checked={milestone.completed || Math.random() > 0.5} 
                                  readOnly
                                  className="mr-3"
                                />
                                <span>Task {tIndex + 1} for {milestone.name}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <FaRegClock className="mr-1" />
                                <span>Due in {Math.floor(Math.random() * 5) + 1} days</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Files Tab */}
              {activeTab === 'files' && isUserProject && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Project Files</h2>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                      Upload File
                    </button>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Mock files */}
                    {[
                      { name: 'Project Requirements.pdf', type: 'pdf', date: '2 days ago' },
                      { name: 'Design Mockups.zip', type: 'zip', date: '1 day ago' },
                      { name: 'Project Timeline.xlsx', type: 'excel', date: '5 hours ago' },
                      { name: 'API Documentation.docx', type: 'word', date: '3 hours ago' }
                    ].map((file, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border ${darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'} flex items-center cursor-pointer transition-colors`}
                      >
                        <div className={`w-10 h-10 rounded flex items-center justify-center mr-3 ${
                          file.type === 'pdf' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-400' :
                          file.type === 'zip' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:bg-opacity-20 dark:text-yellow-400' :
                          file.type === 'excel' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-400' :
                          'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-400'
                        }`}>
                          <FaRegFilePdf />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Uploaded {file.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Messages Tab */}
              {activeTab === 'messages' && isUserProject && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Messages</h2>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                      New Message
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Mock messages */}
                    {[
                      { 
                        from: 'client', 
                        name: project.client.name, 
                        avatar: project.client.profile,
                        message: "Hi there! Just checking in on the progress of the project. How's it going so far?",
                        time: '2 days ago'
                      },
                      { 
                        from: 'user', 
                        name: 'You',
                        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
                        message: 'Hi! The project is progressing well. I\'ve completed the initial setup and started working on the main features. I\'ll have the first milestone ready by the end of the week.',
                        time: '2 days ago'
                      },
                      { 
                        from: 'client', 
                        name: project.client.name,
                        avatar: project.client.profile,
                        message: 'That sounds great! Looking forward to seeing the first milestone. Let me know if you need any clarification on the requirements.',
                        time: '1 day ago'
                      },
                    ].map((message, index) => (
                      <div key={index} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] flex ${message.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <img 
                            src={message.avatar} 
                            alt={message.name} 
                            className="w-10 h-10 rounded-full flex-shrink-0 mx-3"
                          />
                          <div>
                            <div className={`p-4 rounded-lg ${
                              message.from === 'user'
                                ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                                : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                            }`}>
                              <p className="text-sm">{message.message}</p>
                            </div>
                            <div className={`flex items-center mt-1 text-xs ${
                              message.from === 'user'
                                ? 'justify-end'
                                : 'justify-start'
                            } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              <span>{message.name}</span>
                              <span className="mx-1">•</span>
                              <span>{message.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={handleMessageChange}
                      className={`flex-1 px-4 py-2 rounded-l-lg border ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                      }`}
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg flex items-center"
                    >
                      <FaPaperPlane className="mr-2" />
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Similar Projects */}
            {!isUserProject && similarProjects.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Similar Projects</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {similarProjects.map(similarProject => (
                    <Link 
                      key={similarProject.id}
                      to={`/project/${similarProject.id}`}
                      className={`block p-4 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-md transition-colors`}
                    >
                      <h3 className="font-bold text-blue-600 dark:text-blue-400">{similarProject.title}</h3>
                      <p className={`text-sm mt-2 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {similarProject.description}
                      </p>
                      <div className="flex items-center justify-between mt-4 text-sm">
                        <span className="flex items-center">
                          <FaMoneyBillWave className="text-green-500 mr-1" />
                          {similarProject.budget}
                        </span>
                        <span className="flex items-center">
                          <FaCode className="text-purple-500 mr-1" />
                          {similarProject.type}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Project Info Card */}
            <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className="text-lg font-bold mb-4">Project Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-100'} mr-3`}>
                      <FaMoneyBillWave className="text-blue-600" />
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Budget Range</p>
                      <p className="font-medium">{project.budget}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-100'} mr-3`}>
                      <FaClock className="text-green-600" />
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Estimated Duration</p>
                      <p className="font-medium">{project.duration}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-100'} mr-3`}>
                      <FaCalendarAlt className="text-yellow-600" />
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Posted Date</p>
                      <p className="font-medium">{project.postedDate || '2 days ago'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-900 bg-opacity-20' : 'bg-purple-100'} mr-3`}>
                      <FaFileAlt className="text-purple-600" />
                    </div>
                    <div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Proposals Received</p>
                      <p className="font-medium">{project.proposalsCount || '12'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Client Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">About the Client</h3>
                <div className="flex items-center mb-4">
                  <img 
                    src={project.client.profile} 
                    alt={project.client.name} 
                    className="w-14 h-14 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-medium">{project.client.name}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(Math.floor(project.client.rating))].map((_, i) => (
                          <FaStar key={i} size={14} />
                        ))}
                      </div>
                      <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">({project.client.rating})</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Member Since:</span>
                    <span>January 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Projects Posted:</span>
                    <span>24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Hire Rate:</span>
                    <span>85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Location:</span>
                    <span>United States</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium mb-3">Client Verification</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span className="text-sm">Payment Method Verified</span>
                    </div>
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span className="text-sm">Email Verified</span>
                    </div>
                    <div className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span className="text-sm">Identity Verified</span>
                    </div>
                  </div>
                </div>
                
                {!isUserProject && (
                  <div className="mt-6">
                    <button
                      onClick={() => setShowBidModal(true)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                    >
                      Submit a Proposal
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Activity Timeline for user projects */}
            {isUserProject && (
              <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { action: 'Milestone completed', details: 'Requirements Analysis', time: '2 days ago' },
                      { action: 'File uploaded', details: 'Design Mockups.zip', time: '1 day ago' },
                      { action: 'Message received', details: 'From ' + project.client.name, time: '1 day ago' },
                      { action: 'Task added', details: 'Implement user authentication', time: '5 hours ago' }
                    ].map((activity, index) => (
                      <div key={index} className="relative pl-6">
                        <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-blue-600"></div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{activity.details}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Project Stats for user projects */}
            {isUserProject && (
              <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-4">Project Statistics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Project Completion</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Tasks Completed</p>
                        <p className="text-xl font-bold">12/20</p>
                      </div>
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Time Remaining</p>
                        <p className="text-xl font-bold">6 days</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Time Tracking</h4>
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className="flex justify-between mb-2">
                          <span>Total Hours</span>
                          <span className="font-medium">32h</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>This Week</span>
                          <span>12h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Related Links */}
            <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link 
                    to="/browse"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-100'}`}>
                      <FaSearch className="text-blue-600" />
                    </div>
                    <span>Browse More Projects</span>
                  </Link>
                  
                  <Link 
                    to="/dashboard"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-100'}`}>
                      <FaUser className="text-green-600" />
                    </div>
                    <span>View Dashboard</span>
                  </Link>
                  
                  <Link 
                    to="/inbox"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${darkMode ? 'bg-purple-900 bg-opacity-20' : 'bg-purple-100'}`}>
                      <FaComment className="text-purple-600" />
                    </div>
                    <span>Messages</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bid Modal */}
      {showBidModal && (
        <ProjectBidModal 
          project={project}
          bidDetails={bidDetails}
          handleBidChange={handleBidChange}
          handleBidSubmit={handleBidSubmit}
          onClose={() => setShowBidModal(false)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default ProjectDetailsPage;
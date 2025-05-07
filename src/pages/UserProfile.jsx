import React, { useState } from 'react';
import { 
  FaUser, 
  FaStar, 
  FaCertificate, 
  FaGraduationCap, 
  FaBriefcase, 
  FaCode, 
  FaCog, 
  FaShieldAlt,
  FaRegCreditCard,
  FaBell,
  FaPlus,
  FaRegCalendarAlt,
  FaEdit,
  FaTrashAlt,
  FaFileAlt,
  FaCheck,
  FaGlobe,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa';

const ProfilePage = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'John Anderson',
    title: 'Full Stack Developer',
    location: 'San Francisco, CA',
    hourlyRate: 45,
    joinDate: 'January 2022',
    about: 'I am a passionate full-stack developer with over 5 years of experience building web applications using React, Node.js, and MongoDB. I specialize in creating responsive, user-friendly interfaces and robust backend systems.',
    skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Express.js', 'GraphQL', 'RESTful APIs'],
    languages: [
      { name: 'English', proficiency: 'Native' },
      { name: 'Spanish', proficiency: 'Conversational' },
      { name: 'French', proficiency: 'Basic' }
    ],
    education: [
      {
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science in Computer Science',
        years: '2015 - 2019'
      },
      {
        institution: 'Online Coding Bootcamp',
        degree: 'Advanced Web Development Certification',
        years: '2020'
      }
    ],
    experience: [
      {
        company: 'Tech Solutions Inc.',
        position: 'Senior Frontend Developer',
        years: '2021 - Present',
        description: 'Developed and maintained multiple React-based web applications. Led a team of 3 junior developers.'
      },
      {
        company: 'StartUp Labs',
        position: 'Full Stack Developer',
        years: '2019 - 2021',
        description: 'Built RESTful APIs using Node.js and Express. Implemented frontend interfaces with React and Redux.'
      }
    ],
    portfolioProjects: [
      {
        name: 'E-commerce Platform',
        description: 'A full-featured e-commerce platform with payment processing, user authentication, and admin dashboard.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'https://github.com/johnanderson/ecommerce-platform'
      },
      {
        name: 'Task Management App',
        description: 'A Kanban-style task management application with drag-and-drop functionality and team collaboration features.',
        technologies: ['React', 'Firebase', 'Material UI'],
        link: 'https://github.com/johnanderson/task-management'
      },
      {
        name: 'Weather Dashboard',
        description: 'A real-time weather dashboard that displays current weather and forecasts for multiple locations.',
        technologies: ['React', 'Redux', 'OpenWeather API'],
        link: 'https://github.com/johnanderson/weather-dashboard'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        date: 'May 2022'
      },
      {
        name: 'MongoDB Certified Developer',
        issuer: 'MongoDB University',
        date: 'November 2021'
      }
    ],
    reviews: [
      {
        clientName: 'Sarah Johnson',
        clientAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        rating: 5,
        date: 'April 2023',
        comment: 'John is an excellent developer! He delivered the project on time and was very responsive to feedback. I would definitely work with him again.'
      },
      {
        clientName: 'Michael Brown',
        clientAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        rating: 4,
        date: 'February 2023',
        comment: 'Very professional and skilled developer. The code was clean and well-documented. Only reason for 4 stars is that there were a few minor delays, but the final product was great.'
      },
      {
        clientName: 'Amanda Harris',
        clientAvatar: 'https://randomuser.me/api/portraits/women/10.jpg',
        rating: 5,
        date: 'December 2022',
        comment: 'John exceeded my expectations! He not only delivered exactly what I asked for but also suggested improvements that made the final product even better. Highly recommend!'
      }
    ]
  });
  
  // Average rating calculation
  const averageRating = userData.reviews.reduce((acc, review) => acc + review.rating, 0) / userData.reviews.length;
  
  // Handle edit profile
  const handleEditProfile = () => {
    setIsEditing(true);
    setActiveTab('overview');
  };
  
  // Handle save profile changes
  const handleSaveChanges = () => {
    setIsEditing(false);
    // Here you would typically send the updated data to your API
    alert('Profile updated successfully!');
  };
  
  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle skill addition
  const [newSkill, setNewSkill] = useState('');
  const handleAddSkill = () => {
    if (newSkill && !userData.skills.includes(newSkill)) {
      setUserData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill('');
    }
  };
  
  // Handle skill removal
  const handleRemoveSkill = (skillToRemove) => {
    setUserData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };
  
  // Handle adding education
  const [newEducation, setNewEducation] = useState({ institution: '', degree: '', years: '' });
  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree && newEducation.years) {
      setUserData(prev => ({
        ...prev,
        education: [...prev.education, newEducation]
      }));
      setNewEducation({ institution: '', degree: '', years: '' });
    }
  };
  
  // Handle education input change
  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducation(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="min-h-screen pb-16">
      {/* Profile Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} pt-8 pb-24 relative`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-end">
            {!isEditing ? (
              <button 
                onClick={handleEditProfile}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            ) : (
              <button 
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center"
              >
                <FaCheck className="mr-2" />
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Profile Info Card */}
      <div className="container mx-auto px-4">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl -mt-20 mb-8 overflow-hidden`}>
          <div className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl">
                    {userData.name.charAt(0)}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      <FaEdit size={12} />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleFormChange}
                      className={`block w-full text-2xl font-bold px-3 py-2 rounded-lg border ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    />
                    <input
                      type="text"
                      name="title"
                      value={userData.title}
                      onChange={handleFormChange}
                      className={`block w-full text-lg text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg border ${
                        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}
                    />
                    <div className="flex items-center mt-2">
                      <FaMapMarkerAlt className="text-gray-500 mr-2" />
                      <input
                        type="text"
                        name="location"
                        value={userData.location}
                        onChange={handleFormChange}
                        className={`w-full text-sm px-3 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-600'
                        }`}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold">{userData.name}</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{userData.title}</p>
                    <div className="flex items-center mt-2">
                      <FaMapMarkerAlt className="text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{userData.location}</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-8 flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={20} className={i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="ml-2 font-bold">{averageRating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{userData.reviews.length} reviews</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className="text-sm text-gray-500 dark:text-gray-400">Hourly Rate</p>
                {isEditing ? (
                  <div className="flex items-center">
                    <span className="mr-1">$</span>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={userData.hourlyRate}
                      onChange={handleFormChange}
                      className={`w-16 px-2 py-1 rounded border ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    />
                    <span className="ml-1">/hr</span>
                  </div>
                ) : (
                  <p className="font-bold">${userData.hourlyRate}/hr</p>
                )}
              </div>
              
              <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                <p className="font-bold">{userData.joinDate}</p>
              </div>
              
              <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className="text-sm text-gray-500 dark:text-gray-400">Projects Completed</p>
                <p className="font-bold">24</p>
              </div>
              
              <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Active</p>
                <p className="font-bold">Now</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Tabs */}
        <div className="flex overflow-x-auto mb-8 border-b border-gray-200 dark:border-gray-700">
          <button 
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'overview' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'portfolio' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
          <button 
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'reviews' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button 
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'settings' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
        
        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* About Section */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <h2 className="text-xl font-bold mb-4">About Me</h2>
                  {isEditing ? (
                    <textarea
                      name="about"
                      value={userData.about}
                      onChange={handleFormChange}
                      rows={4}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    ></textarea>
                  ) : (
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {userData.about}
                    </p>
                  )}
                </div>
                
                {/* Skills Section */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Skills</h2>
                    {isEditing && (
                      <div className="flex">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add new skill"
                          className={`px-3 py-1 rounded-l-lg border ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                        <button
                          onClick={handleAddSkill}
                          className="px-3 py-1 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded-lg flex items-center`}
                      >
                        <FaCode className="mr-2 text-blue-600" />
                        <span>{skill}</span>
                        {isEditing && (
                          <button 
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <FaTrashAlt size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Work Experience Section */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <h2 className="text-xl font-bold mb-4">Work Experience</h2>
                  <div className="space-y-6">
                    {userData.experience.map((exp, index) => (
                      <div key={index} className="relative pl-6 pb-6 border-l-2 border-gray-300 dark:border-gray-700 last:pb-0">
                        <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600"></div>
                        <div>
                          <h3 className="font-bold">{exp.position}</h3>
                          <p className="text-sm text-blue-600 dark:text-blue-400">{exp.company}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{exp.years}</p>
                          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.description}</p>
                          
                          {isEditing && (
                            <div className="mt-2 flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm">
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {isEditing && (
                      <button className="mt-4 flex items-center text-blue-600 hover:text-blue-800">
                        <FaPlus className="mr-2" />
                        Add Work Experience
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Education Section */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <h2 className="text-xl font-bold mb-4">Education</h2>
                  
                  <div className="space-y-6">
                    {userData.education.map((edu, index) => (
                      <div key={index} className="relative pl-6 pb-6 border-l-2 border-gray-300 dark:border-gray-700 last:pb-0">
                        <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600"></div>
                        <div>
                          <h3 className="font-bold">{edu.degree}</h3>
                          <p className="text-sm text-blue-600 dark:text-blue-400">{edu.institution}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{edu.years}</p>
                          
                          {isEditing && (
                            <div className="mt-2 flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm">
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-3">Add New Education</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm mb-1">Institution</label>
                          <input
                            type="text"
                            name="institution"
                            value={newEducation.institution}
                            onChange={handleEducationChange}
                            className={`w-full px-3 py-2 rounded-lg border ${
                              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Degree</label>
                          <input
                            type="text"
                            name="degree"
                            value={newEducation.degree}
                            onChange={handleEducationChange}
                            className={`w-full px-3 py-2 rounded-lg border ${
                              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Years</label>
                          <input
                            type="text"
                            name="years"
                            value={newEducation.years}
                            onChange={handleEducationChange}
                            className={`w-full px-3 py-2 rounded-lg border ${
                              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                          />
                        </div>
                        <button
                          onClick={handleAddEducation}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Add Education
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Certifications Section */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <h2 className="text-xl font-bold mb-4">Certifications</h2>
                  
                  <div className="space-y-4">
                    {userData.certifications.map((cert, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex items-start`}
                      >
                        <FaCertificate className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">{cert.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cert.date}</p>
                          
                          {isEditing && (
                            <div className="mt-2 flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm">
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <button className="mt-4 flex items-center text-blue-600 hover:text-blue-800">
                      <FaPlus className="mr-2" />
                      Add Certification
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="space-y-8">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Project Portfolio</h2>
                    {isEditing && (
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                        <FaPlus className="mr-2" />
                        Add Project
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    {userData.portfolioProjects.map((project, index) => (
                      <div 
                        key={index} 
                        className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg">{project.name}</h3>
                          {isEditing && (
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                                <FaEdit />
                              </button>
                              <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400">
                                <FaTrashAlt />
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {project.description}
                        </p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex} 
                              className={`text-xs px-2 py-1 rounded-full ${
                                darkMode ? 'bg-blue-900 bg-opacity-20 text-blue-300' : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 flex items-center"
                          >
                            <FaGlobe className="mr-2" />
                            View Project
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <h2 className="text-xl font-bold mb-4">Client Reviews</h2>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{averageRating.toFixed(1)}</h3>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} size={16} className={i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'} />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{userData.reviews.length} reviews</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Last 12 months</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {userData.reviews.map((review, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                      >
                        <div className="flex items-start">
                          <img 
                            src={review.clientAvatar} 
                            alt={review.clientName} 
                            className="w-12 h-12 rounded-full mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{review.clientName}</h3>
                                <div className="flex text-yellow-400 mt-1">
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} size={14} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                            </div>
                            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaUser className="text-blue-600 mr-3" />
                          <div>
                            <h3 className="font-medium">Account Information</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your personal information</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                          Edit
                        </button>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaShieldAlt className="text-blue-600 mr-3" />
                          <div>
                            <h3 className="font-medium">Security</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Update password and security settings</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                          Manage
                        </button>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaRegCreditCard className="text-blue-600 mr-3" />
                          <div>
                            <h3 className="font-medium">Payment Methods</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your payment methods and withdrawal settings</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                          Manage
                        </button>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaBell className="text-blue-600 mr-3" />
                          <div>
                            <h3 className="font-medium">Notifications</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage your notification preferences</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                          Settings
                        </button>
                      </div>
                    </div>
                    
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaCog className="text-blue-600 mr-3" />
                          <div>
                            <h3 className="font-medium">Preferences</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Manage language and display settings</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                          Configure
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <h2 className="text-xl font-bold mb-4 text-red-600">Danger Zone</h2>
                  
                  <div className={`p-4 rounded-lg border border-red-500 ${darkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-50'}`}>
                    <h3 className="font-medium text-red-600">Delete Account</h3>
                    <p className={`text-sm mt-1 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Languages Section */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Languages</h2>
                {isEditing && (
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Add Language
                  </button>
                )}
              </div>
              
              <ul className="space-y-3">
                {userData.languages.map((lang, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{lang.name}</span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Availability Section */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h2 className="text-lg font-bold mb-4">Availability</h2>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaClock className="text-green-500 mr-2" />
                  <span>Full-time (40+ hrs/week)</span>
                </div>
                <div className="flex items-center">
                  <FaRegCalendarAlt className="text-blue-500 mr-2" />
                  <span>Available now</span>
                </div>
              </div>
            </div>
            
            {/* Verification Section */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h2 className="text-lg font-bold mb-4">Verification</h2>
              
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <span>Identity Verified</span>
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <span>Payment Verified</span>
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <span>Email Verified</span>
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-green-500 mr-2" />
                  <span>Phone Verified</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
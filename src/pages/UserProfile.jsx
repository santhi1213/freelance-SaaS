// import React, { useState } from 'react';
// import { 
//   FaUser, 
//   FaStar, 
//   FaCertificate, 
//   FaGraduationCap, 
//   FaBriefcase, 
//   FaCode, 
//   FaCog, 
//   FaShieldAlt,
//   FaRegCreditCard,
//   FaBell,
//   FaPlus,
//   FaRegCalendarAlt,
//   FaEdit,
//   FaTrashAlt,
//   FaFileAlt,
//   FaCheck,
//   FaGlobe,
//   FaMapMarkerAlt,
//   FaClock
// } from 'react-icons/fa';

// const ProfilePage = ({ darkMode }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isEditing, setIsEditing] = useState(false);
  
//   // Mock user data
//   const [userData, setUserData] = useState({
//     name: 'John Anderson',
//     title: 'Full Stack Developer',
//     location: 'San Francisco, CA',
//     hourlyRate: 45,
//     joinDate: 'January 2022',
//     about: 'I am a passionate full-stack developer with over 5 years of experience building web applications using React, Node.js, and MongoDB. I specialize in creating responsive, user-friendly interfaces and robust backend systems.',
//     skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Express.js', 'GraphQL', 'RESTful APIs'],
//     languages: [
//       { name: 'English', proficiency: 'Native' },
//       { name: 'Spanish', proficiency: 'Conversational' },
//       { name: 'French', proficiency: 'Basic' }
//     ],
//     education: [
//       {
//         institution: 'University of California, Berkeley',
//         degree: 'Bachelor of Science in Computer Science',
//         years: '2015 - 2019'
//       },
//       {
//         institution: 'Online Coding Bootcamp',
//         degree: 'Advanced Web Development Certification',
//         years: '2020'
//       }
//     ],
//     experience: [
//       {
//         company: 'Tech Solutions Inc.',
//         position: 'Senior Frontend Developer',
//         years: '2021 - Present',
//         description: 'Developed and maintained multiple React-based web applications. Led a team of 3 junior developers.'
//       },
//       {
//         company: 'StartUp Labs',
//         position: 'Full Stack Developer',
//         years: '2019 - 2021',
//         description: 'Built RESTful APIs using Node.js and Express. Implemented frontend interfaces with React and Redux.'
//       }
//     ],
//     portfolioProjects: [
//       {
//         name: 'E-commerce Platform',
//         description: 'A full-featured e-commerce platform with payment processing, user authentication, and admin dashboard.',
//         technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
//         link: 'https://github.com/johnanderson/ecommerce-platform'
//       },
//       {
//         name: 'Task Management App',
//         description: 'A Kanban-style task management application with drag-and-drop functionality and team collaboration features.',
//         technologies: ['React', 'Firebase', 'Material UI'],
//         link: 'https://github.com/johnanderson/task-management'
//       },
//       {
//         name: 'Weather Dashboard',
//         description: 'A real-time weather dashboard that displays current weather and forecasts for multiple locations.',
//         technologies: ['React', 'Redux', 'OpenWeather API'],
//         link: 'https://github.com/johnanderson/weather-dashboard'
//       }
//     ],
//     certifications: [
//       {
//         name: 'AWS Certified Developer',
//         issuer: 'Amazon Web Services',
//         date: 'May 2022'
//       },
//       {
//         name: 'MongoDB Certified Developer',
//         issuer: 'MongoDB University',
//         date: 'November 2021'
//       }
//     ],
//     reviews: [
//       {
//         clientName: 'Sarah Johnson',
//         clientAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
//         rating: 5,
//         date: 'April 2023',
//         comment: 'John is an excellent developer! He delivered the project on time and was very responsive to feedback. I would definitely work with him again.'
//       },
//       {
//         clientName: 'Michael Brown',
//         clientAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
//         rating: 4,
//         date: 'February 2023',
//         comment: 'Very professional and skilled developer. The code was clean and well-documented. Only reason for 4 stars is that there were a few minor delays, but the final product was great.'
//       },
//       {
//         clientName: 'Amanda Harris',
//         clientAvatar: 'https://randomuser.me/api/portraits/women/10.jpg',
//         rating: 5,
//         date: 'December 2022',
//         comment: 'John exceeded my expectations! He not only delivered exactly what I asked for but also suggested improvements that made the final product even better. Highly recommend!'
//       }
//     ]
//   });
  
//   // Average rating calculation
//   const averageRating = userData.reviews.reduce((acc, review) => acc + review.rating, 0) / userData.reviews.length;
  
//   // Handle edit profile
//   const handleEditProfile = () => {
//     setIsEditing(true);
//     setActiveTab('overview');
//   };
  
//   // Handle save profile changes
//   const handleSaveChanges = () => {
//     setIsEditing(false);
//     // Here you would typically send the updated data to your API
//     alert('Profile updated successfully!');
//   };
  
//   // Handle form changes
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setUserData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
  
//   // Handle skill addition
//   const [newSkill, setNewSkill] = useState('');
//   const handleAddSkill = () => {
//     if (newSkill && !userData.skills.includes(newSkill)) {
//       setUserData(prev => ({
//         ...prev,
//         skills: [...prev.skills, newSkill]
//       }));
//       setNewSkill('');
//     }
//   };
  
//   // Handle skill removal
//   const handleRemoveSkill = (skillToRemove) => {
//     setUserData(prev => ({
//       ...prev,
//       skills: prev.skills.filter(skill => skill !== skillToRemove)
//     }));
//   };
  
//   // Handle adding education
//   const [newEducation, setNewEducation] = useState({ institution: '', degree: '', years: '' });
//   const handleAddEducation = () => {
//     if (newEducation.institution && newEducation.degree && newEducation.years) {
//       setUserData(prev => ({
//         ...prev,
//         education: [...prev.education, newEducation]
//       }));
//       setNewEducation({ institution: '', degree: '', years: '' });
//     }
//   };
  
//   // Handle education input change
//   const handleEducationChange = (e) => {
//     const { name, value } = e.target;
//     setNewEducation(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
  
//   return (
//     <div className="min-h-screen pb-16">
//       {/* Profile Header */}
//       <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} pt-8 pb-24 relative`}>
//         <div className="container mx-auto px-4">
//           <div className="flex justify-end">
//             {!isEditing ? (
//               <button 
//                 onClick={handleEditProfile}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
//               >
//                 <FaEdit className="mr-2" />
//                 Edit Profile
//               </button>
//             ) : (
//               <button 
//                 onClick={handleSaveChanges}
//                 className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center"
//               >
//                 <FaCheck className="mr-2" />
//                 Save Changes
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Profile Info Card */}
//       <div className="container mx-auto px-4">
//         <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl -mt-20 mb-8 overflow-hidden`}>
//           <div className="p-6 sm:p-8">
//             <div className="flex flex-col md:flex-row md:items-center">
//               <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
//                 <div className="relative">
//                   <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl">
//                     {userData.name.charAt(0)}
//                   </div>
//                   {isEditing && (
//                     <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
//                       <FaEdit size={12} />
//                     </button>
//                   )}
//                 </div>
//               </div>
              
//               <div className="flex-1">
//                 {isEditing ? (
//                   <div className="space-y-3">
//                     <input
//                       type="text"
//                       name="name"
//                       value={userData.name}
//                       onChange={handleFormChange}
//                       className={`block w-full text-2xl font-bold px-3 py-2 rounded-lg border ${
//                         darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                       }`}
//                     />
//                     <input
//                       type="text"
//                       name="title"
//                       value={userData.title}
//                       onChange={handleFormChange}
//                       className={`block w-full text-lg text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg border ${
//                         darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
//                       }`}
//                     />
//                     <div className="flex items-center mt-2">
//                       <FaMapMarkerAlt className="text-gray-500 mr-2" />
//                       <input
//                         type="text"
//                         name="location"
//                         value={userData.location}
//                         onChange={handleFormChange}
//                         className={`w-full text-sm px-3 py-2 rounded-lg border ${
//                           darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-600'
//                         }`}
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <h1 className="text-2xl font-bold">{userData.name}</h1>
//                     <p className="text-lg text-gray-600 dark:text-gray-300">{userData.title}</p>
//                     <div className="flex items-center mt-2">
//                       <FaMapMarkerAlt className="text-gray-500 mr-2" />
//                       <span className="text-sm text-gray-600 dark:text-gray-400">{userData.location}</span>
//                     </div>
//                   </>
//                 )}
//               </div>
              
//               <div className="mt-4 md:mt-0 md:ml-8 flex flex-col items-center">
//                 <div className="flex items-center mb-2">
//                   <div className="flex text-yellow-400">
//                     {[...Array(5)].map((_, i) => (
//                       <FaStar key={i} size={20} className={i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'} />
//                     ))}
//                   </div>
//                   <span className="ml-2 font-bold">{averageRating.toFixed(1)}</span>
//                 </div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{userData.reviews.length} reviews</p>
//               </div>
//             </div>
            
//             <div className="flex flex-wrap gap-4 mt-6">
//               <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Hourly Rate</p>
//                 {isEditing ? (
//                   <div className="flex items-center">
//                     <span className="mr-1">$</span>
//                     <input
//                       type="number"
//                       name="hourlyRate"
//                       value={userData.hourlyRate}
//                       onChange={handleFormChange}
//                       className={`w-16 px-2 py-1 rounded border ${
//                         darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                       }`}
//                     />
//                     <span className="ml-1">/hr</span>
//                   </div>
//                 ) : (
//                   <p className="font-bold">${userData.hourlyRate}/hr</p>
//                 )}
//               </div>
              
//               <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
//                 <p className="font-bold">{userData.joinDate}</p>
//               </div>
              
//               <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Projects Completed</p>
//                 <p className="font-bold">24</p>
//               </div>
              
//               <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Last Active</p>
//                 <p className="font-bold">Now</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Profile Tabs */}
//         <div className="flex overflow-x-auto mb-8 border-b border-gray-200 dark:border-gray-700">
//           <button 
//             className={`px-4 py-2 font-medium whitespace-nowrap ${
//               activeTab === 'overview' 
//                 ? 'text-blue-600 border-b-2 border-blue-600' 
//                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('overview')}
//           >
//             Overview
//           </button>
//           <button 
//             className={`px-4 py-2 font-medium whitespace-nowrap ${
//               activeTab === 'portfolio' 
//                 ? 'text-blue-600 border-b-2 border-blue-600' 
//                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('portfolio')}
//           >
//             Portfolio
//           </button>
//           <button 
//             className={`px-4 py-2 font-medium whitespace-nowrap ${
//               activeTab === 'reviews' 
//                 ? 'text-blue-600 border-b-2 border-blue-600' 
//                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('reviews')}
//           >
//             Reviews
//           </button>
//           <button 
//             className={`px-4 py-2 font-medium whitespace-nowrap ${
//               activeTab === 'settings' 
//                 ? 'text-blue-600 border-b-2 border-blue-600' 
//                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('settings')}
//           >
//             Settings
//           </button>
//         </div>
        
//         {/* Profile Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             {/* Overview Tab */}
//             {activeTab === 'overview' && (
//               <div className="space-y-8">
//                 {/* About Section */}
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <h2 className="text-xl font-bold mb-4">About Me</h2>
//                   {isEditing ? (
//                     <textarea
//                       name="about"
//                       value={userData.about}
//                       onChange={handleFormChange}
//                       rows={4}
//                       className={`w-full px-3 py-2 rounded-lg border ${
//                         darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                       }`}
//                     ></textarea>
//                   ) : (
//                     <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
//                       {userData.about}
//                     </p>
//                   )}
//                 </div>
                
//                 {/* Skills Section */}
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold">Skills</h2>
//                     {isEditing && (
//                       <div className="flex">
//                         <input
//                           type="text"
//                           value={newSkill}
//                           onChange={(e) => setNewSkill(e.target.value)}
//                           placeholder="Add new skill"
//                           className={`px-3 py-1 rounded-l-lg border ${
//                             darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                           }`}
//                         />
//                         <button
//                           onClick={handleAddSkill}
//                           className="px-3 py-1 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
//                         >
//                           <FaPlus />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {userData.skills.map((skill, index) => (
//                       <div 
//                         key={index} 
//                         className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded-lg flex items-center`}
//                       >
//                         <FaCode className="mr-2 text-blue-600" />
//                         <span>{skill}</span>
//                         {isEditing && (
//                           <button 
//                             onClick={() => handleRemoveSkill(skill)}
//                             className="ml-2 text-red-500 hover:text-red-700"
//                           >
//                             <FaTrashAlt size={12} />
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 {/* Work Experience Section */}
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <h2 className="text-xl font-bold mb-4">Work Experience</h2>
//                   <div className="space-y-6">
//                     {userData.experience.map((exp, index) => (
//                       <div key={index} className="relative pl-6 pb-6 border-l-2 border-gray-300 dark:border-gray-700 last:pb-0">
//                         <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600"></div>
//                         <div>
//                           <h3 className="font-bold">{exp.position}</h3>
//                           <p className="text-sm text-blue-600 dark:text-blue-400">{exp.company}</p>
//                           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{exp.years}</p>
//                           <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.description}</p>
                          
//                           {isEditing && (
//                             <div className="mt-2 flex space-x-2">
//                               <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm">
//                                 Edit
//                               </button>
//                               <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm">
//                                 Delete
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     ))}
                    
//                     {isEditing && (
//                       <button className="mt-4 flex items-center text-blue-600 hover:text-blue-800">
//                         <FaPlus className="mr-2" />
//                         Add Work Experience
//                       </button>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Education Section */}
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <h2 className="text-xl font-bold mb-4">Education</h2>
                  
//                   <div className="space-y-6">
//                     {userData.education.map((edu, index) => (
//                       <div key={index} className="relative pl-6 pb-6 border-l-2 border-gray-300 dark:border-gray-700 last:pb-0">
//                         <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600"></div>
//                         <div>
//                           <h3 className="font-bold">{edu.degree}</h3>
//                           <p className="text-sm text-blue-600 dark:text-blue-400">{edu.institution}</p>
//                           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{edu.years}</p>
                          
//                           {isEditing && (
//                             <div className="mt-2 flex space-x-2">
//                               <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm">
//                                 Edit
//                               </button>
//                               <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm">
//                                 Delete
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
//                   {isEditing && (
//                     <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                       <h4 className="font-medium mb-3">Add New Education</h4>
//                       <div className="space-y-3">
//                         <div>
//                           <label className="block text-sm mb-1">Institution</label>
//                           <input
//                             type="text"
//                             name="institution"
//                             value={newEducation.institution}
//                             onChange={handleEducationChange}
//                             className={`w-full px-3 py-2 rounded-lg border ${
//                               darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                             }`}
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm mb-1">Degree</label>
//                           <input
//                             type="text"
//                             name="degree"
//                             value={newEducation.degree}
//                             onChange={handleEducationChange}
//                             className={`w-full px-3 py-2 rounded-lg border ${
//                               darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                             }`}
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm mb-1">Years</label>
//                           <input
//                             type="text"
//                             name="years"
//                             value={newEducation.years}
//                             onChange={handleEducationChange}
//                             className={`w-full px-3 py-2 rounded-lg border ${
//                               darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                             }`}
//                           />
//                         </div>
//                         <button
//                           onClick={handleAddEducation}
//                           className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//                         >
//                           Add Education
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Certifications Section */}
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <h2 className="text-xl font-bold mb-4">Certifications</h2>
                  
//                   <div className="space-y-4">
//                     {userData.certifications.map((cert, index) => (
//                       <div 
//                         key={index} 
//                         className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex items-start`}
//                       >
//                         <FaCertificate className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
//                         <div>
//                           <h3 className="font-medium">{cert.name}</h3>
//                           <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>
//                           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cert.date}</p>
                          
//                           {isEditing && (
//                             <div className="mt-2 flex space-x-2">
//                               <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm">
//                                 Edit
//                               </button>
//                               <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm">
//                                 Delete
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
//                   {isEditing && (
//                     <button className="mt-4 flex items-center text-blue-600 hover:text-blue-800">
//                       <FaPlus className="mr-2" />
//                       Add Certification
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}
            
//             {/* Portfolio Tab */}
//             {activeTab === 'portfolio' && (
//               <div className="space-y-8">
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold">Project Portfolio</h2>
//                     {isEditing && (
//                       <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
//                         <FaPlus className="mr-2" />
//                         Add Project
//                       </button>
//                     )}
//                   </div>
                  
//                   <div className="space-y-6">
//                     {userData.portfolioProjects.map((project, index) => (
//                       <div 
//                         key={index} 
//                         className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
//                       >
//                         <div className="flex justify-between items-start">
//                           <h3 className="font-bold text-lg">{project.name}</h3>
//                           {isEditing && (
//                             <div className="flex space-x-2">
//                               <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
//                                 <FaEdit />
//                               </button>
//                               <button className="text-red-600 hover:text-red-800 dark:hover:text-red-400">
//                                 <FaTrashAlt />
//                               </button>
//                             </div>
//                           )}
//                         </div>
                        
//                         <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                           {project.description}
//                         </p>
                        
//                         <div className="mt-4 flex flex-wrap gap-2">
//                           {project.technologies.map((tech, techIndex) => (
//                             <span 
//                               key={techIndex} 
//                               className={`text-xs px-2 py-1 rounded-full ${
//                                 darkMode ? 'bg-blue-900 bg-opacity-20 text-blue-300' : 'bg-blue-100 text-blue-800'
//                               }`}
//                             >
//                               {tech}
//                             </span>
//                           ))}
//                         </div>
                        
//                         <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
//                           <a 
//                             href={project.link} 
//                             target="_blank" 
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 flex items-center"
//                           >
//                             <FaGlobe className="mr-2" />
//                             View Project
//                           </a>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Reviews Tab */}
//             {activeTab === 'reviews' && (
//               <div className="space-y-8">
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <h2 className="text-xl font-bold mb-4">Client Reviews</h2>
                  
//                   <div className="mb-6">
//                     <div className="flex items-center mb-2">
//                       <div className="flex-1">
//                         <h3 className="font-bold text-lg">{averageRating.toFixed(1)}</h3>
//                         <div className="flex text-yellow-400">
//                           {[...Array(5)].map((_, i) => (
//                             <FaStar key={i} size={16} className={i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'} />
//                           ))}
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-bold">{userData.reviews.length} reviews</p>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Last 12 months</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-6">
//                     {userData.reviews.map((review, index) => (
//                       <div 
//                         key={index} 
//                         className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
//                       >
//                         <div className="flex items-start">
//                           <img 
//                             src={review.clientAvatar} 
//                             alt={review.clientName} 
//                             className="w-12 h-12 rounded-full mr-4"
//                           />
//                           <div className="flex-1">
//                             <div className="flex justify-between items-start">
//                               <div>
//                                 <h3 className="font-medium">{review.clientName}</h3>
//                                 <div className="flex text-yellow-400 mt-1">
//                                   {[...Array(5)].map((_, i) => (
//                                     <FaStar key={i} size={14} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
//                                   ))}
//                                 </div>
//                               </div>
//                               <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
//                             </div>
//                             <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                               {review.comment}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Settings Tab */}
//             {activeTab === 'settings' && (
//               <div className="space-y-8">
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                  
//                   <div className="space-y-6">
//                     <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <FaUser className="text-blue-600 mr-3" />
//                           <div>
//                             <h3 className="font-medium">Account Information</h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">Manage your personal information</p>
//                           </div>
//                         </div>
//                         <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
//                           Edit
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <FaShieldAlt className="text-blue-600 mr-3" />
//                           <div>
//                             <h3 className="font-medium">Security</h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">Update password and security settings</p>
//                           </div>
//                         </div>
//                         <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
//                           Manage
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <FaRegCreditCard className="text-blue-600 mr-3" />
//                           <div>
//                             <h3 className="font-medium">Payment Methods</h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">Manage your payment methods and withdrawal settings</p>
//                           </div>
//                         </div>
//                         <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
//                           Manage
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <FaBell className="text-blue-600 mr-3" />
//                           <div>
//                             <h3 className="font-medium">Notifications</h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">Manage your notification preferences</p>
//                           </div>
//                         </div>
//                         <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
//                           Settings
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <FaCog className="text-blue-600 mr-3" />
//                           <div>
//                             <h3 className="font-medium">Preferences</h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">Manage language and display settings</p>
//                           </div>
//                         </div>
//                         <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
//                           Configure
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <h2 className="text-xl font-bold mb-4 text-red-600">Danger Zone</h2>
                  
//                   <div className={`p-4 rounded-lg border border-red-500 ${darkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-50'}`}>
//                     <h3 className="font-medium text-red-600">Delete Account</h3>
//                     <p className={`text-sm mt-1 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                       Once you delete your account, there is no going back. Please be certain.
//                     </p>
//                     <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
//                       Delete Account
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Languages Section */}
//             <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-bold">Languages</h2>
//                 {isEditing && (
//                   <button className="text-blue-600 hover:text-blue-800 text-sm">
//                     Add Language
//                   </button>
//                 )}
//               </div>
              
//               <ul className="space-y-3">
//                 {userData.languages.map((lang, index) => (
//                   <li key={index} className="flex justify-between items-center">
//                     <span>{lang.name}</span>
//                     <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lang.proficiency}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             {/* Availability Section */}
//             <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//               <h2 className="text-lg font-bold mb-4">Availability</h2>
              
//               <div className="space-y-3">
//                 <div className="flex items-center">
//                   <FaClock className="text-green-500 mr-2" />
//                   <span>Full-time (40+ hrs/week)</span>
//                 </div>
//                 <div className="flex items-center">
//                   <FaRegCalendarAlt className="text-blue-500 mr-2" />
//                   <span>Available now</span>
//                 </div>
//               </div>
//             </div>
            
//             {/* Verification Section */}
//             <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//               <h2 className="text-lg font-bold mb-4">Verification</h2>
              
//               <ul className="space-y-3">
//                 <li className="flex items-center">
//                   <FaCheck className="text-green-500 mr-2" />
//                   <span>Identity Verified</span>
//                 </li>
//                 <li className="flex items-center">
//                   <FaCheck className="text-green-500 mr-2" />
//                   <span>Payment Verified</span>
//                 </li>
//                 <li className="flex items-center">
//                   <FaCheck className="text-green-500 mr-2" />
//                   <span>Email Verified</span>
//                 </li>
//                 <li className="flex items-center">
//                   <FaCheck className="text-green-500 mr-2" />
//                   <span>Phone Verified</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;



// import React, { useState, useEffect } from 'react';
// import { 
//   FaUser, 
//   FaStar, 
//   FaCertificate, 
//   FaGraduationCap, 
//   FaBriefcase, 
//   FaCode, 
//   FaCog, 
//   FaShieldAlt,
//   FaRegCreditCard,
//   FaBell,
//   FaPlus,
//   FaRegCalendarAlt,
//   FaEdit,
//   FaTrashAlt,
//   FaFileAlt,
//   FaCheck,
//   FaGlobe,
//   FaMapMarkerAlt,
//   FaClock,
//   FaSpinner
// } from 'react-icons/fa';


// const ProfilePage = ({ darkMode }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState('');
  
//   // User data from API
//   const [userData, setUserData] = useState({
//     fullName: '',
//     email: '',
//     title: '',
//     location: '',
//     hourlyRate: 0,
//     bio: '',
//     skills: [],
//     languages: [],
//     education: [],
//     experience: [],
//     portfolioProjects: [],
//     certifications: [],
//     availabilityPerWeek: '',
//     gender: '',
//     joinDate: '',
//     profilePhoto: null,
//     reviews: [] // This might come from a different endpoint
//   });
//   // Handle photo selection
// const handlePhotoSelect = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       alert('Please select a valid image file (JPEG, PNG, GIF, WebP)');
//       return;
//     }
    
//     // Validate file size (5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       alert('File size must be less than 5MB');
//       return;
//     }
    
//     setSelectedPhoto(file);
    
//     // Create preview
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setPhotoPreview(e.target.result);
//     };
//     reader.readAsDataURL(file);
//   }
// };

// // Upload photo function
// const uploadProfilePhoto = async (file) => {
//   const formData = new FormData();
//   formData.append('profilePhoto', file);
  
//   const token = getAuthToken();
  
//   const response = await fetch('/api/profile', {
//     method: 'PUT',
//     headers: {
//       'Authorization': `Bearer ${token}`
//       // Don't set Content-Type for FormData, browser will set it automatically
//     },
//     body: formData
//   });
  
//   if (!response.ok) {
//     throw new Error('Failed to upload photo');
//   }
  
//   return response.json();
// };

// // Handle photo upload
// const handlePhotoUpload = async () => {
//   if (!selectedPhoto) return;
  
//   try {
//     setUploadingPhoto(true);
//     const result = await uploadProfilePhoto(selectedPhoto);
    
//     if (result.success) {
//       // Update user data with new photo
//       setUserData(prev => ({
//         ...prev,
//         profilePhoto: result.data.user.profilePhoto
//       }));
      
//       // Clear selection
//       setSelectedPhoto(null);
//       setPhotoPreview(null);
      
//       alert('Profile photo updated successfully!');
//     }
//   } catch (error) {
//     console.error('Error uploading photo:', error);
//     alert('Failed to upload photo: ' + error.message);
//   } finally {
//     setUploadingPhoto(false);
//   }
// };

// // Handle photo deletion
// const handlePhotoDelete = async () => {
//   try {
//     const token = getAuthToken();
//     const response = await fetch('/api/profile/photo', {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });
    
//     if (response.ok) {
//       setUserData(prev => ({
//         ...prev,
//         profilePhoto: null
//       }));
//       alert('Profile photo deleted successfully!');
//     } else {
//       throw new Error('Failed to delete photo');
//     }
//   } catch (error) {
//     console.error('Error deleting photo:', error);
//     alert('Failed to delete photo: ' + error.message);
//   }
// };
// const ProfilePhotoSection = () => (
//   <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
//     <div className="relative">
//       {userData.profilePhoto || photoPreview ? (
//         <img
//           src={photoPreview || userData.profilePhoto}
//           alt="Profile"
//           className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
//         />
//       ) : (
//         <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl border-4 border-white shadow-lg">
//           {userData.fullName && userData.fullName !== '---' ? userData.fullName.charAt(0) : 'U'}
//         </div>
//       )}
      
//       {isEditing && (
//         <div className="absolute bottom-0 right-0">
//           <input
//             type="file"
//             id="photo-upload"
//             accept="image/*"
//             onChange={handlePhotoSelect}
//             className="hidden"
//           />
//           <label
//             htmlFor="photo-upload"
//             className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-700 transition-colors"
//           >
//             <FaEdit size={12} />
//           </label>
//         </div>
//       )}
//     </div>
    
//     {/* Photo upload controls */}
//     {isEditing && (selectedPhoto || userData.profilePhoto) && (
//       <div className="mt-3 space-y-2">
//         {selectedPhoto && (
//           <button
//             onClick={handlePhotoUpload}
//             disabled={uploadingPhoto}
//             className="w-full px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm disabled:opacity-50 flex items-center justify-center"
//           >
//             {uploadingPhoto ? (
//               <>
//                 <FaSpinner className="animate-spin mr-2" size={12} />
//                 Uploading...
//               </>
//             ) : (
//               'Save Photo'
//             )}
//           </button>
//         )}
        
//         {userData.profilePhoto && (
//           <button
//             onClick={handlePhotoDelete}
//             className="w-full px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm flex items-center justify-center"
//           >
//             <FaTrashAlt className="mr-2" size={10} />
//             Delete Photo
//           </button>
//         )}
//       </div>
//     )}
//   </div>
// );

//   // Form states for adding new items
//   const [newSkill, setNewSkill] = useState('');
//   const [newEducation, setNewEducation] = useState({ institution: '', degree: '', years: '' });
//   const [newExperience, setNewExperience] = useState({ 
//     company: '', 
//     position: '', 
//     fromDate: '', 
//     toDate: '', 
//     description: '' 
//   });
//   const [newCertification, setNewCertification] = useState({ name: '', issuer: '', date: '' });
//   const [newLanguage, setNewLanguage] = useState({ name: '', proficiency: '' });
//   const [newProject, setNewProject] = useState({ 
//     name: '', 
//     description: '', 
//     technologies: [], 
//     link: '' 
//   });

//   // Get auth token from localStorage or context
//   const getAuthToken = () => {
//     return localStorage.getItem('token') || sessionStorage.getItem('token');
//   };

//   // Fetch user profile data
//   const fetchUserProfile = async () => {
//     try {
//       setLoading(true);
//       const token = getAuthToken();
      
//       if (!token) {
//         setError('Authentication token not found');
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/profile', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch profile data');
//       }

//       const data = await response.json();
      
//       if (data.success) {
//         setUserData({
//           fullName: data.data.user.fullName || '---',
//           email: data.data.user.email || '---',
//           title: data.data.user.title || '---',
//           location: data.data.user.location || '---',
//           hourlyRate: data.data.user.hourlyRate || 0,
//           bio: data.data.user.bio || '---',
//           skills: data.data.user.skills || [],
//           languages: data.data.user.languages || [],
//           education: data.data.user.education || [],
//           experience: data.data.user.experience || [],
//           portfolioProjects: data.data.user.portfolioProjects || [],
//           certifications: data.data.user.certifications || [],
//           availabilityPerWeek: data.data.user.availabilityPerWeek || '---',
//           profilePhoto: data.data.user.profilePhoto || null, 
//           gender: data.data.user.gender || '---',
//           joinDate: data.data.user.createdAt ? new Date(data.data.user.createdAt).toLocaleDateString('en-US', { 
//             year: 'numeric', 
//             month: 'long' 
//           }) : '---',
//           reviews: data.data.user.reviews || []
//         });
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching profile:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update user profile
//   // const updateUserProfile = async (updatedData) => {
//   //   try {
//   //     setSaving(true);
//   //     const token = getAuthToken();
      
//   //     if (!token) {
//   //       throw new Error('Authentication token not found');
//   //     }

//   //     // Transform data to match API expectations
//   //     const profilePayload = {
//   //       name: updatedData.fullName,
//   //       email: updatedData.email,
//   //       profile_title: updatedData.title,
//   //       hourlyRate: updatedData.hourlyRate,
//   //       location: updatedData.location,
//   //       aboutDescription: updatedData.bio,
//   //       skillsList: updatedData.skills,
//   //       languages: updatedData.languages,
//   //       experience: updatedData.experience.map(exp => ({
//   //         company: exp.company,
//   //         role: exp.position,
//   //         fromDate: exp.years.split(' - ')[0] || '',
//   //         toDate: exp.years.split(' - ')[1] || '',
//   //         description: exp.description
//   //       })),
//   //       education: updatedData.education.map(edu => ({
//   //         institution: edu.institution,
//   //         degree: edu.degree,
//   //         fromYear: edu.years.split(' - ')[0] || '',
//   //         toYear: edu.years.split(' - ')[1] || ''
//   //       })),
//   //       certifications: updatedData.certifications.map(cert => ({
//   //         name: cert.name,
//   //         issuer: cert.issuer,
//   //         date: cert.date
//   //       })),
//   //       projectPortfolio: updatedData.portfolioProjects.map(project => ({
//   //         name: project.name,
//   //         description: project.description,
//   //         skills: project.technologies,
//   //         link: project.link
//   //       })),
//   //       availabilityPerWeek: updatedData.availabilityPerWeek,
//   //       gender: updatedData.gender
//   //     };

//   //     const response = await fetch('http://localhost:5000/api/profile', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Authorization': `Bearer ${token}`,
//   //         'Content-Type': 'application/json'
//   //       },
//   //       body: JSON.stringify(profilePayload)
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error('Failed to update profile');
//   //     }

//   //     const data = await response.json();
      
//   //     if (data.success) {
//   //       // Refresh the profile data
//   //       await fetchUserProfile();
//   //       setIsEditing(false);
//   //       alert('Profile updated successfully!');
//   //     } else {
//   //       throw new Error(data.message || 'Failed to update profile');
//   //     }
//   //   } catch (err) {
//   //     setError(err.message);
//   //     console.error('Error updating profile:', err);
//   //     alert('Failed to update profile: ' + err.message);
//   //   } finally {
//   //     setSaving(false);
//   //   }
//   // };
//   const updateUserProfile = async (updatedData) => {
//   try {
//     setSaving(true);
//     const token = getAuthToken();
    
//     if (!token) {
//       throw new Error('Authentication token not found');
//     }

//     // If there's a selected photo, upload it first
//     if (selectedPhoto) {
//       await handlePhotoUpload();
//       return; // The photo upload will trigger a refresh
//     }

//     // Transform data to match API expectations (excluding photo data)
//     const profilePayload = {
//       name: updatedData.fullName,
//       email: updatedData.email,
//       profile_title: updatedData.title,
//       hourlyRate: updatedData.hourlyRate,
//       location: updatedData.location,
//       aboutDescription: updatedData.bio,
//       skillsList: updatedData.skills,
//       languages: updatedData.languages,
//       experience: updatedData.experience.map(exp => ({
//         company: exp.company,
//         role: exp.position,
//         fromDate: exp.years.split(' - ')[0] || '',
//         toDate: exp.years.split(' - ')[1] || '',
//         description: exp.description
//       })),
//       education: updatedData.education.map(edu => ({
//         institution: edu.institution,
//         degree: edu.degree,
//         fromYear: edu.years.split(' - ')[0] || '',
//         toYear: edu.years.split(' - ')[1] || ''
//       })),
//       certifications: updatedData.certifications.map(cert => ({
//         name: cert.name,
//         issuer: cert.issuer,
//         date: cert.date
//       })),
//       projectPortfolio: updatedData.portfolioProjects.map(project => ({
//         name: project.name,
//         description: project.description,
//         skills: project.technologies,
//         link: project.link
//       })),
//       availabilityPerWeek: updatedData.availabilityPerWeek,
//       gender: updatedData.gender
//     };

//     const response = await fetch('/api/profile', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(profilePayload)
//     });

//     if (!response.ok) {
//       throw new Error('Failed to update profile');
//     }

//     const data = await response.json();
    
//     if (data.success) {
//       await fetchUserProfile();
//       setIsEditing(false);
//       alert('Profile updated successfully!');
//     } else {
//       throw new Error(data.message || 'Failed to update profile');
//     }
//   } catch (err) {
//     setError(err.message);
//     console.error('Error updating profile:', err);
//     alert('Failed to update profile: ' + err.message);
//   } finally {
//     setSaving(false);
//   }
// };

//   // Load profile data on component mount
//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   // Average rating calculation
//   const averageRating = userData.reviews.length > 0 
//     ? userData.reviews.reduce((acc, review) => acc + review.rating, 0) / userData.reviews.length 
//     : 0;
  
//   // Handle edit profile
//   const handleEditProfile = () => {
//     setIsEditing(true);
//     setActiveTab('overview');
//   };
  
//   // Handle save profile changes
//   const handleSaveChanges = () => {
//     updateUserProfile(userData);
//   };
  
//   // Handle form changes
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setUserData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
  
//   // Handle skill addition
//   const handleAddSkill = () => {
//     if (newSkill && !userData.skills.includes(newSkill)) {
//       setUserData(prev => ({
//         ...prev,
//         skills: [...prev.skills, newSkill]
//       }));
//       setNewSkill('');
//     }
//   };
  
//   // Handle skill removal
//   const handleRemoveSkill = (skillToRemove) => {
//     setUserData(prev => ({
//       ...prev,
//       skills: prev.skills.filter(skill => skill !== skillToRemove)
//     }));
//   };
  
//   // Handle adding education
//   const handleAddEducation = () => {
//     if (newEducation.institution && newEducation.degree && newEducation.years) {
//       setUserData(prev => ({
//         ...prev,
//         education: [...prev.education, newEducation]
//       }));
//       setNewEducation({ institution: '', degree: '', years: '' });
//     }
//   };
  
//   // Handle education input change
//   const handleEducationChange = (e) => {
//     const { name, value } = e.target;
//     setNewEducation(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle adding experience
//   const handleAddExperience = () => {
//     if (newExperience.company && newExperience.position) {
//       const experienceData = {
//         company: newExperience.company,
//         position: newExperience.position,
//         years: `${newExperience.fromDate} - ${newExperience.toDate}`,
//         description: newExperience.description
//       };
      
//       setUserData(prev => ({
//         ...prev,
//         experience: [...prev.experience, experienceData]
//       }));
//       setNewExperience({ company: '', position: '', fromDate: '', toDate: '', description: '' });
//     }
//   };

//   // Handle adding certification
//   const handleAddCertification = () => {
//     if (newCertification.name && newCertification.issuer) {
//       setUserData(prev => ({
//         ...prev,
//         certifications: [...prev.certifications, newCertification]
//       }));
//       setNewCertification({ name: '', issuer: '', date: '' });
//     }
//   };

//   // Handle adding language
//   const handleAddLanguage = () => {
//     if (newLanguage.name && newLanguage.proficiency) {
//       setUserData(prev => ({
//         ...prev,
//         languages: [...prev.languages, newLanguage]
//       }));
//       setNewLanguage({ name: '', proficiency: '' });
//     }
//   };

//   // Handle adding project
//   const handleAddProject = () => {
//     if (newProject.name && newProject.description) {
//       setUserData(prev => ({
//         ...prev,
//         portfolioProjects: [...prev.portfolioProjects, newProject]
//       }));
//       setNewProject({ name: '', description: '', technologies: [], link: '' });
//     }
//   };

//   // Remove functions for arrays
//   const handleRemoveEducation = (index) => {
//     setUserData(prev => ({
//       ...prev,
//       education: prev.education.filter((_, i) => i !== index)
//     }));
//   };

//   const handleRemoveExperience = (index) => {
//     setUserData(prev => ({
//       ...prev,
//       experience: prev.experience.filter((_, i) => i !== index)
//     }));
//   };

//   const handleRemoveCertification = (index) => {
//     setUserData(prev => ({
//       ...prev,
//       certifications: prev.certifications.filter((_, i) => i !== index)
//     }));
//   };

//   const handleRemoveLanguage = (index) => {
//     setUserData(prev => ({
//       ...prev,
//       languages: prev.languages.filter((_, i) => i !== index)
//     }));
//   };

//   const handleRemoveProject = (index) => {
//     setUserData(prev => ({
//       ...prev,
//       portfolioProjects: prev.portfolioProjects.filter((_, i) => i !== index)
//     }));
//   };

//   // Show loading spinner
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="flex items-center space-x-2">
//           <FaSpinner className="animate-spin text-blue-600" size={24} />
//           <span>Loading profile...</span>
//         </div>
//       </div>
//     );
//   }

//   // Show error message
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">Error: {error}</p>
//           <button 
//             onClick={fetchUserProfile}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="min-h-screen pb-16">
//       {/* Profile Header */}
//       <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} pt-8 pb-24 relative`}>
//         <div className="container mx-auto px-4">
//           <div className="flex justify-end">
//             {!isEditing ? (
//               <button 
//                 onClick={handleEditProfile}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
//               >
//                 <FaEdit className="mr-2" />
//                 Edit Profile
//               </button>
//             ) : (
//               <button 
//                 onClick={handleSaveChanges}
//                 disabled={saving}
//                 className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center disabled:opacity-50"
//               >
//                 {saving ? <FaSpinner className="animate-spin mr-2" /> : <FaCheck className="mr-2" />}
//                 {saving ? 'Saving...' : 'Save Changes'}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Profile Info Card */}
//       <div className="container mx-auto px-4">
//         <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl -mt-20 mb-8 overflow-hidden`}>
//           <div className="p-6 sm:p-8">
//             <div className="flex flex-col md:flex-row md:items-center">
//               <ProfilePhotoSection/>
//               {/* <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
//                 <div className="relative">
//                   <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl">
//                     {userData.fullName && userData.fullName !== '---' ? userData.fullName.charAt(0) : 'U'}
//                   </div>
//                   {isEditing && (
//                     <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
//                       <FaEdit size={12} />
//                     </button>
//                   )}
//                 </div>
//               </div> */}
              
//               <div className="flex-1">
//                 {isEditing ? (
//                   <div className="space-y-3">
//                     <input
//                       type="text"
//                       name="fullName"
//                       value={userData.fullName}
//                       onChange={handleFormChange}
//                       placeholder="Full Name"
//                       className={`block w-full text-2xl font-bold px-3 py-2 rounded-lg border ${
//                         darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                       }`}
//                     />
//                     <input
//                       type="text"
//                       name="title"
//                       value={userData.title}
//                       onChange={handleFormChange}
//                       placeholder="Professional Title"
//                       className={`block w-full text-lg text-gray-600 dark:text-gray-300 px-3 py-2 rounded-lg border ${
//                         darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
//                       }`}
//                     />
//                     <div className="flex items-center mt-2">
//                       <FaMapMarkerAlt className="text-gray-500 mr-2" />
//                       <input
//                         type="text"
//                         name="location"
//                         value={userData.location}
//                         onChange={handleFormChange}
//                         placeholder="Location"
//                         className={`w-full text-sm px-3 py-2 rounded-lg border ${
//                           darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-600'
//                         }`}
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <h1 className="text-2xl font-bold">{userData.fullName}</h1>
//                     <p className="text-lg text-gray-600 dark:text-gray-300">{userData.title}</p>
//                     <div className="flex items-center mt-2">
//                       <FaMapMarkerAlt className="text-gray-500 mr-2" />
//                       <span className="text-sm text-gray-600 dark:text-gray-400">{userData.location}</span>
//                     </div>
//                   </>
//                 )}
//               </div>
              
//               <div className="mt-4 md:mt-0 md:ml-8 flex flex-col items-center">
//                 <div className="flex items-center mb-2">
//                   <div className="flex text-yellow-400">
//                     {[...Array(5)].map((_, i) => (
//                       <FaStar key={i} size={20} className={i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'} />
//                     ))}
//                   </div>
//                   <span className="ml-2 font-bold">{averageRating > 0 ? averageRating.toFixed(1) : '---'}</span>
//                 </div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{userData.reviews.length} reviews</p>
//               </div>
//             </div>
            
//             <div className="flex flex-wrap gap-4 mt-6">
//               <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Hourly Rate</p>
//                 {isEditing ? (
//                   <div className="flex items-center">
//                     <span className="mr-1">$</span>
//                     <input
//                       type="number"
//                       name="hourlyRate"
//                       value={userData.hourlyRate}
//                       onChange={handleFormChange}
//                       className={`w-16 px-2 py-1 rounded border ${
//                         darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                       }`}
//                     />
//                     <span className="ml-1">/hr</span>
//                   </div>
//                 ) : (
//                   <p className="font-bold">{userData.hourlyRate > 0 ? `$${userData.hourlyRate}/hr` : '---'}</p>
//                 )}
//               </div>
              
//               <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
//                 <p className="font-bold">{userData.joinDate}</p>
//               </div>
              
//               <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Availability</p>
//                 <p className="font-bold">{userData.availabilityPerWeek}</p>
//               </div>
              
//               <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
//                 <p className="font-bold">{userData.gender}</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Profile Tabs */}
//         <div className="flex overflow-x-auto mb-8 border-b border-gray-200 dark:border-gray-700">
//           <button 
//             className={`px-4 py-2 font-medium whitespace-nowrap ${
//               activeTab === 'overview' 
//                 ? 'text-blue-600 border-b-2 border-blue-600' 
//                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('overview')}
//           >
//             Overview
//           </button>
//           <button 
//             className={`px-4 py-2 font-medium whitespace-nowrap ${
//               activeTab === 'portfolio' 
//                 ? 'text-blue-600 border-b-2 border-blue-600' 
//                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('portfolio')}
//           >
//             Portfolio
//           </button>
//           <button 
//             className={`px-4 py-2 font-medium whitespace-nowrap ${
//               activeTab === 'reviews' 
//                 ? 'text-blue-600 border-b-2 border-blue-600' 
//                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('reviews')}
//           >
//             Reviews
//           </button>
//           <button 
//             className={`px-4 py-2 font-medium whitespace-nowrap ${
//               activeTab === 'settings' 
//                 ? 'text-blue-600 border-b-2 border-blue-600' 
//                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('settings')}
//           >
//             Settings
//           </button>
//         </div>
        
//         {/* Profile Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             {/* Overview Tab */}
//             {activeTab === 'overview' && (
//               <div className="space-y-8">
//                 {/* About Section */}
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <h2 className="text-xl font-bold mb-4">About Me</h2>
//                   {isEditing ? (
//                     <textarea
//                       name="bio"
//                       value={userData.bio}
//                       onChange={handleFormChange}
//                       rows={4}
//                       placeholder="Tell us about yourself..."
//                       className={`w-full px-3 py-2 rounded-lg border ${
//                         darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                       }`}
//                     ></textarea>
//                   ) : (
//                     <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
//                       {userData.bio}
//                     </p>
//                   )}
//                 </div>
                
//                 {/* Skills Section */}
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold">Skills</h2>
//                     {isEditing && (
//                       <div className="flex">
//                         <input
//                           type="text"
//                           value={newSkill}
//                           onChange={(e) => setNewSkill(e.target.value)}
//                           placeholder="Add new skill"
//                           className={`px-3 py-1 rounded-l-lg border ${
//                             darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                           }`}
//                         />
//                         <button
//                           onClick={handleAddSkill}
//                           className="px-3 py-1 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
//                         >
//                           <FaPlus />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {userData.skills.length > 0 ? (
//                       userData.skills.map((skill, index) => (
//                         <div 
//                           key={index} 
//                           className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded-lg flex items-center`}
//                         >
//                           <FaCode className="mr-2 text-blue-600" />
//                           <span>{skill}</span>
//                           {isEditing && (
//                             <button 
//                               onClick={() => handleRemoveSkill(skill)}
//                               className="ml-2 text-red-500 hover:text-red-700"
//                             >
//                               <FaTrashAlt size={12} />
//                             </button>
//                           )}
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-gray-500 dark:text-gray-400">No skills added yet</p>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Work Experience Section */}
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <h2 className="text-xl font-bold mb-4">Work Experience</h2>
//                   <div className="space-y-6">
//                     {userData.experience.length > 0 ? (
//                       userData.experience.map((exp, index) => (
//                         <div key={index} className="relative pl-6 pb-6 border-l-2 border-gray-300 dark:border-gray-700 last:pb-0">
//                           <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600"></div>
//                           <div>
//                             <h3 className="font-bold">{exp.position || '---'}</h3>
//                             <p className="text-sm text-blue-600 dark:text-blue-400">{exp.company || '---'}</p>
//                             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{exp.years || '---'}</p>
//                             <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.description || '---'}</p>
                            
//                             {isEditing && (
//                               <div className="mt-2 flex space-x-2">
//                                 <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm">
//                                   Edit
//                                 </button>
//                                 <button 
//                                   onClick={() => handleRemoveExperience(index)}
//                                   className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm"
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-gray-500 dark:text-gray-400">No work experience added yet</p>
//                     )}
                    
//                     {isEditing && (
//                       <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                         <h4 className="font-medium mb-3">Add Work Experience</h4>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                           <input
//                             type="text"
//                             placeholder="Company"
//                             value={newExperience.company}
//                             onChange={(e) => setNewExperience(prev => ({...prev, company: e.target.value}))}
//                             className={`px-3 py-2 rounded-lg border ${
//                               darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                             }`}
//                           />
//                           <input
//                             type="text"
//                             placeholder="Position"
//                             value={newExperience.position}
//                             onChange={(e) => setNewExperience(prev => ({...prev, position: e.target.value}))}
//                             className={`px-3 py-2 rounded-lg border ${
//                               darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                             }`}
//                           />
//                           <input
//                             type="text"
//                             placeholder="From Date"
//                             value={newExperience.fromDate}
//                             onChange={(e) => setNewExperience(prev => ({...prev, fromDate: e.target.value}))}
//                             className={`px-3 py-2 rounded-lg border ${
//                               darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                             }`}
//                           />
//                           <input
//                             type="text"
//                             placeholder="To Date"
//                             value={newExperience.toDate}
//                             onChange={(e) => setNewExperience(prev => ({...prev, toDate: e.target.value}))}
//                             className={`px-3 py-2 rounded-lg border ${
//                               darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                             }`}
//                           />
//                         </div>
//                         <textarea
//                           placeholder="Job Description"
//                           value={newExperience.description}
//                           onChange={(e) => setNewExperience(prev => ({...prev, description: e.target.value}))}
//                           rows={3}
//                           className={`w-full mt-3 px-3 py-2 rounded-lg border ${
//                             darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                           }`}
//                         />
//                         <button
//                           onClick={handleAddExperience}
//                           className="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//                         >
//                           Add Experience
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Education Section */}
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <h2 className="text-xl font-bold mb-4">Education</h2>
                  
//                   <div className="space-y-6">
//                     {userData.education.length > 0 ? (
//                       userData.education.map((edu, index) => (
//                         <div key={index} className="relative pl-6 pb-6 border-l-2 border-gray-300 dark:border-gray-700 last:pb-0">
//                           <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600"></div>
//                           <div>
//                             <h3 className="font-bold">{edu.degree || '---'}</h3>
//                             <p className="text-sm text-blue-600 dark:text-blue-400">{edu.institution || '---'}</p>
//                             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{edu.years || '---'}</p>
                            
//                             {isEditing && (
//                               <div className="mt-2 flex space-x-2">
//                                 <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm">
//                                   Edit
//                                 </button>
//                                 <button 
//                                   onClick={() => handleRemoveEducation(index)}
//                                   className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm"
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-gray-500 dark:text-gray-400">No education added yet</p>
//                     )}
//                   </div>
                  
//                   {isEditing && (
//                     <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                       <h4 className="font-medium mb-3">Add New Education</h4>
//                       <div className="space-y-3">
//                         <div>
//                           <label className="block text-sm mb-1">Institution</label>
//                           <input
//                             type="text"
//                             name="institution"
//                             value={newEducation.institution}
//                             onChange={handleEducationChange}
//                             className={`w-full px-3 py-2 rounded-lg border ${
//                               darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                             }`}
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm mb-1">Degree</label>
//                           <input
//                             type="text"
//                             name="degree"
//                             value={newEducation.degree}
//                             onChange={handleEducationChange}
//                             className={`w-full px-3 py-2 rounded-lg border ${
//                               darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                             }`}
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm mb-1">Years</label>
//                           <input
//                             type="text"
//                             name="years"
//                             value={newEducation.years}
//                             onChange={handleEducationChange}
//                             placeholder="e.g., 2015 - 2019"
//                             className={`w-full px-3 py-2 rounded-lg border ${
//                               darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                             }`}
//                           />
//                         </div>
//                         <button
//                           onClick={handleAddEducation}
//                           className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//                         >
//                           Add Education
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Certifications Section */}
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <h2 className="text-xl font-bold mb-4">Certifications</h2>
                  
//                   <div className="space-y-4">
//                     {userData.certifications.length > 0 ? (
//                       userData.certifications.map((cert, index) => (
//                         <div 
//                           key={index} 
//                           className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex items-start`}
//                         >
//                           <FaCertificate className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
//                           <div className="flex-1">
//                             <h3 className="font-medium">{cert.name || '---'}</h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer || '---'}</p>
//                             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cert.date || '---'}</p>
                            
//                             {isEditing && (
//                               <div className="mt-2 flex space-x-2">
//                                 <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm">
//                                   Edit
//                                 </button>
//                                 <button 
//                                   onClick={() => handleRemoveCertification(index)}
//                                   className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm"
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-gray-500 dark:text-gray-400">No certifications added yet</p>
//                     )}
//                   </div>
                  
//                   {isEditing && (
//                     <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                       <h4 className="font-medium mb-3">Add Certification</h4>
//                       <div className="space-y-3">
//                         <input
//                           type="text"
//                           placeholder="Certification Name"
//                           value={newCertification.name}
//                           onChange={(e) => setNewCertification(prev => ({...prev, name: e.target.value}))}
//                           className={`w-full px-3 py-2 rounded-lg border ${
//                             darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                           }`}
//                         />
//                         <input
//                           type="text"
//                           placeholder="Issuing Organization"
//                           value={newCertification.issuer}
//                           onChange={(e) => setNewCertification(prev => ({...prev, issuer: e.target.value}))}
//                           className={`w-full px-3 py-2 rounded-lg border ${
//                             darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                           }`}
//                         />
//                         <input
//                           type="text"
//                           placeholder="Date Obtained"
//                           value={newCertification.date}
//                           onChange={(e) => setNewCertification(prev => ({...prev, date: e.target.value}))}
//                           className={`w-full px-3 py-2 rounded-lg border ${
//                             darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                           }`}
//                         />
//                         <button
//                           onClick={handleAddCertification}
//                           className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//                         >
//                           Add Certification
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
            
//             {/* Portfolio Tab */}
//             {activeTab === 'portfolio' && (
//               <div className="space-y-8">
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold">Project Portfolio</h2>
//                     {isEditing && (
//                       <button 
//                         onClick={() => {
//                           // Show add project form
//                           const form = document.getElementById('add-project-form');
//                           if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
//                         }}
//                         className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
//                       >
//                         <FaPlus className="mr-2" />
//                         Add Project
//                       </button>
//                     )}
//                   </div>
                  
//                   {isEditing && (
//                     <div id="add-project-form" style={{display: 'none'}} className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
//                       <h4 className="font-medium mb-3">Add New Project</h4>
//                       <div className="space-y-3">
//                         <input
//                           type="text"
//                           placeholder="Project Name"
//                           value={newProject.name}
//                           onChange={(e) => setNewProject(prev => ({...prev, name: e.target.value}))}
//                           className={`w-full px-3 py-2 rounded-lg border ${
//                             darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                           }`}
//                         />
//                         <textarea
//                           placeholder="Project Description"
//                           value={newProject.description}
//                           onChange={(e) => setNewProject(prev => ({...prev, description: e.target.value}))}
//                           rows={3}
//                           className={`w-full px-3 py-2 rounded-lg border ${
//                             darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                           }`}
//                         />
//                         <input
//                           type="text"
//                           placeholder="Technologies (comma separated)"
//                           value={newProject.technologies.join(', ')}
//                           onChange={(e) => setNewProject(prev => ({...prev, technologies: e.target.value.split(', ').filter(t => t.trim())}))}
//                           className={`w-full px-3 py-2 rounded-lg border ${
//                             darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                           }`}
//                         />
//                         <input
//                           type="url"
//                           placeholder="Project Link"
//                           value={newProject.link}
//                           onChange={(e) => setNewProject(prev => ({...prev, link: e.target.value}))}
//                           className={`w-full px-3 py-2 rounded-lg border ${
//                             darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                           }`}
//                         />
//                         <button
//                           onClick={handleAddProject}
//                           className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//                         >
//                           Add Project
//                         </button>
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className="space-y-6">
//                     {userData.portfolioProjects.length > 0 ? (
//                       userData.portfolioProjects.map((project, index) => (
//                         <div 
//                           key={index} 
//                           className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
//                         >
//                           <div className="flex justify-between items-start">
//                             <h3 className="font-bold text-lg">{project.name || '---'}</h3>
//                             {isEditing && (
//                               <div className="flex space-x-2">
//                                 <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
//                                   <FaEdit />
//                                 </button>
//                                 <button 
//                                   onClick={() => handleRemoveProject(index)}
//                                   className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
//                                 >
//                                   <FaTrashAlt />
//                                 </button>
//                               </div>
//                             )}
//                           </div>
                          
//                           <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                             {project.description || '---'}
//                           </p>
                          
//                           <div className="mt-4 flex flex-wrap gap-2">
//                             {project.technologies && project.technologies.length > 0 ? (
//                               project.technologies.map((tech, techIndex) => (
//                                 <span 
//                                   key={techIndex} 
//                                   className={`text-xs px-2 py-1 rounded-full ${
//                                     darkMode ? 'bg-blue-900 bg-opacity-20 text-blue-300' : 'bg-blue-100 text-blue-800'
//                                   }`}
//                                 >
//                                   {tech}
//                                 </span>
//                               ))
//                             ) : (
//                               <span className="text-gray-500 dark:text-gray-400 text-sm">No technologies listed</span>
//                             )}
//                           </div>
                          
//                           <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
//                             {project.link ? (
//                               <a 
//                                 href={project.link} 
//                                 target="_blank" 
//                                 rel="noopener noreferrer"
//                                 className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 flex items-center"
//                               >
//                                 <FaGlobe className="mr-2" />
//                                 View Project
//                               </a>
//                             ) : (
//                               <span className="text-gray-500 dark:text-gray-400 text-sm">No project link available</span>
//                             )}
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-gray-500 dark:text-gray-400">No projects added yet</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Reviews Tab */}
//             {activeTab === 'reviews' && (
//               <div className="space-y-8">
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <h2 className="text-xl font-bold mb-4">Client Reviews</h2>
                  
//                   <div className="mb-6">
//                     <div className="flex items-center mb-2">
//                       <div className="flex-1">
//                         <h3 className="font-bold text-lg">{averageRating > 0 ? averageRating.toFixed(1) : '---'}</h3>
//                         <div className="flex text-yellow-400">
//                           {[...Array(5)].map((_, i) => (
//                             <FaStar key={i} size={16} className={i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'} />
//                           ))}
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-bold">{userData.reviews.length} reviews</p>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">All time</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="space-y-6">
//                     {userData.reviews.length > 0 ? (
//                       userData.reviews.map((review, index) => (
//                         <div 
//                           key={index} 
//                           className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
//                         >
//                           <div className="flex items-start">
//                             <img 
//                               src={review.clientAvatar || 'https://via.placeholder.com/48'} 
//                               alt={review.clientName || 'Client'} 
//                               className="w-12 h-12 rounded-full mr-4"
//                             />
//                             <div className="flex-1">
//                               <div className="flex justify-between items-start">
//                                 <div>
//                                   <h3 className="font-medium">{review.clientName || '---'}</h3>
//                                   <div className="flex text-yellow-400 mt-1">
//                                     {[...Array(5)].map((_, i) => (
//                                       <FaStar key={i} size={14} className={i < (review.rating || 0) ? 'text-yellow-400' : 'text-gray-300'} />
//                                     ))}
//                                   </div>
//                                 </div>
//                                 <span className="text-sm text-gray-500 dark:text-gray-400">{review.date || '---'}</span>
//                               </div>
//                               <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                                 {review.comment || '---'}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p className="text-gray-500 dark:text-gray-400">No reviews yet</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Settings Tab */}
//             {activeTab === 'settings' && (
//               <div className="space-y-8">
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                  
//                   <div className="space-y-6">
//                     <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <FaUser className="text-blue-600 mr-3" />
//                           <div>
//                             <h3 className="font-medium">Account Information</h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">Email: {userData.email}</p>
//                           </div>
//                         </div>
//                         <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
//                           Edit
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <FaShieldAlt className="text-blue-600 mr-3" />
//                           <div>
//                             <h3 className="font-medium">Security</h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">Update password and security settings</p>
//                           </div>
//                         </div>
//                         <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
//                           Manage
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <FaRegCreditCard className="text-blue-600 mr-3" />
//                           <div>
//                             <h3 className="font-medium">Payment Methods</h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">Manage your payment methods and withdrawal settings</p>
//                           </div>
//                         </div>
//                         <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
//                           Manage
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <FaBell className="text-blue-600 mr-3" />
//                           <div>
//                             <h3 className="font-medium">Notifications</h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">Manage your notification preferences</p>
//                           </div>
//                         </div>
//                         <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
//                           Settings
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <FaCog className="text-blue-600 mr-3" />
//                           <div>
//                             <h3 className="font-medium">Preferences</h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">Manage language and display settings</p>
//                           </div>
//                         </div>
//                         <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
//                           Configure
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                   <h2 className="text-xl font-bold mb-4 text-red-600">Danger Zone</h2>
                  
//                   <div className={`p-4 rounded-lg border border-red-500 ${darkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-50'}`}>
//                     <h3 className="font-medium text-red-600">Delete Account</h3>
//                     <p className={`text-sm mt-1 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                       Once you delete your account, there is no going back. Please be certain.
//                     </p>
//                     <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
//                       Delete Account
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Languages Section */}
//             <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-lg font-bold">Languages</h2>
//                 {isEditing && (
//                   <button 
//                     onClick={() => {
//                       const form = document.getElementById('add-language-form');
//                       if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
//                     }}
//                     className="text-blue-600 hover:text-blue-800 text-sm"
//                   >
//                     Add Language
//                   </button>
//                 )}
//               </div>
              
//               {isEditing && (
//                 <div id="add-language-form" style={{display: 'none'}} className="mb-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
//                   <div className="space-y-2">
//                     <input
//                       type="text"
//                       placeholder="Language"
//                       value={newLanguage.name}
//                       onChange={(e) => setNewLanguage(prev => ({...prev, name: e.target.value}))}
//                       className={`w-full px-2 py-1 text-sm rounded border ${
//                         darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                       }`}
//                     />
//                     <select
//                       value={newLanguage.proficiency}
//                       onChange={(e) => setNewLanguage(prev => ({...prev, proficiency: e.target.value}))}
//                       className={`w-full px-2 py-1 text-sm rounded border ${
//                         darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
//                       }`}
//                     >
//                       <option value="">Select Proficiency</option>
//                       <option value="Basic">Basic</option>
//                       <option value="Conversational">Conversational</option>
//                       <option value="Fluent">Fluent</option>
//                       <option value="Native">Native</option>
//                     </select>
//                     <button
//                       onClick={handleAddLanguage}
//                       className="w-full py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               )}
              
//               <ul className="space-y-3">
//                 {userData.languages.length > 0 ? (
//                   userData.languages.map((lang, index) => (
//                     <li key={index} className="flex justify-between items-center">
//                       <span>{lang.name || '---'}</span>
//                       <div className="flex items-center">
//                         <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                           {lang.proficiency || '---'}
//                         </span>
//                         {isEditing && (
//                           <button 
//                             onClick={() => handleRemoveLanguage(index)}
//                             className="ml-2 text-red-500 hover:text-red-700"
//                           >
//                             <FaTrashAlt size={12} />
//                           </button>
//                         )}
//                       </div>
//                     </li>
//                   ))
//                 ) : (
//                   <li className="text-gray-500 dark:text-gray-400">No languages added yet</li>
//                 )}
//               </ul>
//             </div>
            
//             {/* Availability Section */}
//             <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//               <h2 className="text-lg font-bold mb-4">Availability</h2>
              
//               <div className="space-y-3">
//                 <div className="flex items-center">
//                   <FaClock className="text-green-500 mr-2" />
//                   <span>{userData.availabilityPerWeek || 'Not specified'}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <FaRegCalendarAlt className="text-blue-500 mr-2" />
//                   <span>Available now</span>
//                 </div>
//               </div>
//             </div>
            
//             {/* Verification Section */}
//             <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//               <h2 className="text-lg font-bold mb-4">Verification</h2>
              
//               <ul className="space-y-3">
//                 <li className="flex items-center">
//                   <FaCheck className="text-green-500 mr-2" />
//                   <span>Identity Verified</span>
//                 </li>
//                 <li className="flex items-center">
//                   <FaCheck className="text-green-500 mr-2" />
//                   <span>Payment Verified</span>
//                 </li>
//                 <li className="flex items-center">
//                   <FaCheck className="text-green-500 mr-2" />
//                   <span>Email Verified</span>
//                 </li>
//                 <li className="flex items-center">
//                   <FaCheck className="text-green-500 mr-2" />
//                   <span>Phone Verified</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from 'react';
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
  FaClock,
  FaSpinner
} from 'react-icons/fa';

const ProfilePage = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  // Photo upload states - ADD THESE MISSING STATES
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  
  // User data from API
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    title: '',
    location: '',
    hourlyRate: 0,
    bio: '',
    skills: [],
    languages: [],
    education: [],
    experience: [],
    portfolioProjects: [],
    certifications: [],
    availabilityPerWeek: '',
    gender: '',
    joinDate: '',
    profilePhoto: null,
    reviews: []
  });

  // Form states for adding new items
  const [newSkill, setNewSkill] = useState('');
  const [newEducation, setNewEducation] = useState({ institution: '', degree: '', years: '' });
  const [newExperience, setNewExperience] = useState({ 
    company: '', 
    position: '', 
    fromDate: '', 
    toDate: '', 
    description: '' 
  });
  const [newCertification, setNewCertification] = useState({ name: '', issuer: '', date: '' });
  const [newLanguage, setNewLanguage] = useState({ name: '', proficiency: '' });
  const [newProject, setNewProject] = useState({ 
    name: '', 
    description: '', 
    technologies: [], 
    link: '' 
  });

  // Get auth token from localStorage or context
  const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };

  // Handle photo selection
  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF, WebP)');
        return;
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setSelectedPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload photo function
  const uploadProfilePhoto = async (file) => {
    const formData = new FormData();
    formData.append('profilePhoto', file);
    
    const token = getAuthToken();
    
    const response = await fetch('http://localhost:5000/api/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
        // Don't set Content-Type for FormData, browser will set it automatically
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload photo');
    }
    
    return response.json();
  };

  // Handle photo upload
const handlePhotoUpload = async () => {
  if (!selectedPhoto) return;
  
  try {
    setUploadingPhoto(true);
    const result = await uploadProfilePhoto(selectedPhoto);
    
    if (result.success) {
      // Update user data with new photo
      setUserData(prev => ({
        ...prev,
        profilePhoto: result.data.user.profilePhoto
      }));
      
      // Clear selection
      setSelectedPhoto(null);
      setPhotoPreview(null);
      
      alert('Profile photo updated successfully!');
    } else {
      throw new Error(result.message || 'Failed to upload photo');
    }
  } catch (error) {
    console.error('Error uploading photo:', error);
    alert('Failed to upload photo: ' + error.message);
  } finally {
    setUploadingPhoto(false);
  }
};

  // Handle photo deletion
  const handlePhotoDelete = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:5000/api/profile/photo', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setUserData(prev => ({
          ...prev,
          profilePhoto: null
        }));
        alert('Profile photo deleted successfully!');
      } else {
        throw new Error('Failed to delete photo');
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo: ' + error.message);
    }
  };

const ProfilePhotoSection = () => (
  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
    <div className="relative">
      {userData.profilePhoto || photoPreview ? (
        <img
          src={photoPreview || `http://localhost:5000${userData.profilePhoto}`} // ADD BASE URL
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          onError={(e) => {
            console.error('Image failed to load:', e.target.src);
            // Fallback to initial avatar if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl border-4 border-white shadow-lg">
          {userData.fullName && userData.fullName !== '---' ? userData.fullName.charAt(0) : 'U'}
        </div>
      )}
      
      {/* Fallback avatar (hidden by default, shown if image fails) */}
      {(userData.profilePhoto || photoPreview) && (
        <div 
          className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl border-4 border-white shadow-lg absolute inset-0"
          style={{ display: 'none' }}
        >
          {userData.fullName && userData.fullName !== '---' ? userData.fullName.charAt(0) : 'U'}
        </div>
      )}
      
      {isEditing && (
        <div className="absolute bottom-0 right-0">
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handlePhotoSelect}
            className="hidden"
          />
          <label
            htmlFor="photo-upload"
            className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-700 transition-colors"
          >
            <FaEdit size={12} />
          </label>
        </div>
      )}
    </div>
    
    {/* Photo upload controls */}
    {isEditing && (selectedPhoto || userData.profilePhoto) && (
      <div className="mt-3 space-y-2">
        {selectedPhoto && (
          <button
            onClick={handlePhotoUpload}
            disabled={uploadingPhoto}
            className="w-full px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm disabled:opacity-50 flex items-center justify-center"
          >
            {uploadingPhoto ? (
              <>
                <FaSpinner className="animate-spin mr-2" size={12} />
                Uploading...
              </>
            ) : (
              'Save Photo'
            )}
          </button>
        )}
        
        {userData.profilePhoto && (
          <button
            onClick={handlePhotoDelete}
            className="w-full px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm flex items-center justify-center"
          >
            <FaTrashAlt className="mr-2" size={10} />
            Delete Photo
          </button>
        )}
      </div>
    )}
  </div>
);


  // Fetch user profile data
  // const fetchUserProfile = async () => {
  //   try {
  //     setLoading(true);
  //     const token = getAuthToken();
      
  //     if (!token) {
  //       setError('Authentication token not found');
  //       return;
  //     }

  //     const response = await fetch('http://localhost:5000/api/profile', {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch profile data');
  //     }

  //     const data = await response.json();
      
  //     if (data.success) {
  //       setUserData({
  //         fullName: data.data.user.fullName || '---',
  //         email: data.data.user.email || '---',
  //         title: data.data.user.title || '---',
  //         location: data.data.user.location || '---',
  //         hourlyRate: data.data.user.hourlyRate || 0,
  //         bio: data.data.user.bio || '---',
  //         skills: data.data.user.skills || [],
  //         languages: data.data.user.languages || [],
  //         education: data.data.user.education || [],
  //         experience: data.data.user.experience || [],
  //         portfolioProjects: data.data.user.portfolioProjects || [],
  //         certifications: data.data.user.certifications || [],
  //         availabilityPerWeek: data.data.user.availabilityPerWeek || '---',
  //         profilePhoto: data.data.user.profilePhoto || null, 
  //         gender: data.data.user.gender || '---',
  //         joinDate: data.data.user.createdAt ? new Date(data.data.user.createdAt).toLocaleDateString('en-US', { 
  //           year: 'numeric', 
  //           month: 'long' 
  //         }) : '---',
  //         reviews: data.data.user.reviews || []
  //       });
  //     }
  //   } catch (err) {
  //     setError(err.message);
  //     console.error('Error fetching profile:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchUserProfile = async () => {
  try {
    setLoading(true);
    const token = getAuthToken();
    
    if (!token) {
      setError('Authentication token not found');
      return;
    }

    const response = await fetch('http://localhost:5000/api/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fetch profile error:', response.status, errorText);
      throw new Error(`Failed to fetch profile data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetched profile data:', data); // DEBUG LOG
    
    if (data.success) {
      setUserData({
        fullName: data.data.user.fullName || '',
        email: data.data.user.email || '',
        title: data.data.user.title || '',
        location: data.data.user.location || '',
        hourlyRate: data.data.user.hourlyRate || 0,
        bio: data.data.user.bio || '',
        skills: data.data.user.skills || [],
        languages: data.data.user.languages || [],
        education: data.data.user.education || [],
        experience: data.data.user.experience || [],
        portfolioProjects: data.data.user.portfolioProjects || [],
        certifications: data.data.user.certifications || [],
        availabilityPerWeek: data.data.user.availabilityPerWeek || '',
        profilePhoto: data.data.user.profilePhoto || null, 
        gender: data.data.user.gender || '',
        joinDate: data.data.user.createdAt ? new Date(data.data.user.createdAt).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        }) : '---',
        reviews: data.data.user.reviews || []
      });
      
      // Clear any previous errors
      setError('');
    } else {
      throw new Error(data.message || 'Failed to fetch profile data');
    }
  } catch (err) {
    setError(err.message);
    console.error('Error fetching profile:', err);
  } finally {
    setLoading(false);
  }
};

  // Update user profile
 const updateUserProfile = async (updatedData) => {
  try {
    setSaving(true);
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Authentication token not found');
    }

    // If there's a selected photo, upload it first
    if (selectedPhoto) {
      await handlePhotoUpload();
      return; // The photo upload will trigger a refresh
    }

    // Clean and validate data before sending
    const cleanedData = {
      name: updatedData.fullName?.trim() || '',
      email: updatedData.email?.trim() || '',
      profile_title: updatedData.title?.trim() || '',
      hourlyRate: parseFloat(updatedData.hourlyRate) || 0,
      location: updatedData.location?.trim() || '',
      aboutDescription: updatedData.bio?.trim() || '',
      skillsList: Array.isArray(updatedData.skills) ? updatedData.skills.filter(skill => skill?.trim()) : [],
      gender: updatedData.gender?.trim() || '',
      availabilityPerWeek: updatedData.availabilityPerWeek?.trim() || ''
    };

    // Process languages array
    if (Array.isArray(updatedData.languages)) {
      cleanedData.languages = updatedData.languages
        .filter(lang => lang?.name?.trim() && lang?.proficiency?.trim())
        .map(lang => ({
          name: lang.name.trim(),
          proficiency: lang.proficiency.trim()
        }));
    } else {
      cleanedData.languages = [];
    }

    // Process experience array
    if (Array.isArray(updatedData.experience)) {
      cleanedData.experience = updatedData.experience
        .filter(exp => exp?.company?.trim() || exp?.position?.trim())
        .map(exp => ({
          company: exp.company?.trim() || '',
          role: exp.position?.trim() || '',
          fromDate: exp.years?.split(' - ')[0]?.trim() || '',
          toDate: exp.years?.split(' - ')[1]?.trim() || '',
          description: exp.description?.trim() || ''
        }));
    } else {
      cleanedData.experience = [];
    }

    // Process education array
    if (Array.isArray(updatedData.education)) {
      cleanedData.education = updatedData.education
        .filter(edu => edu?.institution?.trim() || edu?.degree?.trim())
        .map(edu => ({
          institution: edu.institution?.trim() || '',
          degree: edu.degree?.trim() || '',
          fromYear: edu.years?.split(' - ')[0]?.trim() || '',
          toYear: edu.years?.split(' - ')[1]?.trim() || ''
        }));
    } else {
      cleanedData.education = [];
    }

    // Process certifications array
    if (Array.isArray(updatedData.certifications)) {
      cleanedData.certifications = updatedData.certifications
        .filter(cert => cert?.name?.trim() || cert?.issuer?.trim())
        .map(cert => ({
          name: cert.name?.trim() || '',
          issuer: cert.issuer?.trim() || '',
          date: cert.date?.trim() || ''
        }));
    } else {
      cleanedData.certifications = [];
    }

    // Process portfolio projects array
    if (Array.isArray(updatedData.portfolioProjects)) {
      cleanedData.projectPortfolio = updatedData.portfolioProjects
        .filter(project => project?.name?.trim() || project?.description?.trim())
        .map(project => ({
          name: project.name?.trim() || '',
          description: project.description?.trim() || '',
          skills: Array.isArray(project.technologies) ? 
            project.technologies.filter(tech => tech?.trim()).map(tech => tech.trim()) : [],
          link: project.link?.trim() || ''
        }));
    } else {
      cleanedData.projectPortfolio = [];
    }

    console.log('Sending profile data:', cleanedData); // DEBUG LOG

    const response = await fetch('http://localhost:5000/api/profile', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cleanedData)
    });

    // Log response for debugging
    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response text:', responseText);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorMessage;
        if (errorData.errors) {
          errorMessage += '\nErrors: ' + errorData.errors.join(', ');
        }
      } catch (e) {
        // Response is not JSON, use the text
        errorMessage = responseText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = JSON.parse(responseText);
    
    if (data.success) {
      await fetchUserProfile();
      setIsEditing(false);
      alert('Profile updated successfully!');
    } else {
      throw new Error(data.message || 'Failed to update profile');
    }
  } catch (err) {
    setError(err.message);
    console.error('Error updating profile:', err);
    alert('Failed to update profile: ' + err.message);
  } finally {
    setSaving(false);
  }
};

  // Load profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Average rating calculation
  const averageRating = userData.reviews.length > 0 
    ? userData.reviews.reduce((acc, review) => acc + review.rating, 0) / userData.reviews.length 
    : 0;
  
  // Handle edit profile
  const handleEditProfile = () => {
    setIsEditing(true);
    setActiveTab('overview');
  };
  
  // Handle save profile changes
  const handleSaveChanges = () => {
    updateUserProfile(userData);
  };
  
  // Handle form changes
  const handleFormChange = (e) => {
  const { name, value } = e.target;
  
  // Handle special cases
  let processedValue = value;
  
  if (name === 'hourlyRate') {
    // Ensure hourly rate is a valid number
    processedValue = value === '' ? 0 : parseFloat(value) || 0;
  }
  
  console.log(`Updating ${name} to:`, processedValue); // DEBUG LOG
  
  setUserData(prev => ({
    ...prev,
    [name]: processedValue
  }));
};
  
  // Handle skill addition
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

  // Handle adding experience
  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position) {
      const experienceData = {
        company: newExperience.company,
        position: newExperience.position,
        years: `${newExperience.fromDate} - ${newExperience.toDate}`,
        description: newExperience.description
      };
      
      setUserData(prev => ({
        ...prev,
        experience: [...prev.experience, experienceData]
      }));
      setNewExperience({ company: '', position: '', fromDate: '', toDate: '', description: '' });
    }
  };

  // Handle adding certification
  const handleAddCertification = () => {
    if (newCertification.name && newCertification.issuer) {
      setUserData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification]
      }));
      setNewCertification({ name: '', issuer: '', date: '' });
    }
  };

  // Handle adding language
  const handleAddLanguage = () => {
    if (newLanguage.name && newLanguage.proficiency) {
      setUserData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage]
      }));
      setNewLanguage({ name: '', proficiency: '' });
    }
  };

  // Handle adding project
  const handleAddProject = () => {
    if (newProject.name && newProject.description) {
      setUserData(prev => ({
        ...prev,
        portfolioProjects: [...prev.portfolioProjects, newProject]
      }));
      setNewProject({ name: '', description: '', technologies: [], link: '' });
    }
  };

  // Remove functions for arrays
  const handleRemoveEducation = (index) => {
    setUserData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveExperience = (index) => {
    setUserData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveCertification = (index) => {
    setUserData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveLanguage = (index) => {
    setUserData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveProject = (index) => {
    setUserData(prev => ({
      ...prev,
      portfolioProjects: prev.portfolioProjects.filter((_, i) => i !== index)
    }));
  };

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <FaSpinner className="animate-spin text-blue-600" size={24} />
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  // Show error message
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={fetchUserProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
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
                disabled={saving}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center disabled:opacity-50"
              >
                {saving ? <FaSpinner className="animate-spin mr-2" /> : <FaCheck className="mr-2" />}
                {saving ? 'Saving...' : 'Save Changes'}
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
              <ProfilePhotoSection/>
              
              <div className="flex-1 mt-12">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="fullName"
                      value={userData.fullName}
                      onChange={handleFormChange}
                      placeholder="Full Name"
                      className={`block w-full text-2xl font-bold px-3 py-2 mt-4 rounded-lg border ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    />
                    <input
                      type="text"
                      name="title"
                      value={userData.title}
                      onChange={handleFormChange}
                      placeholder="Professional Title"
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
                        placeholder="Location"
                        className={`w-full text-sm px-3 py-2 rounded-lg border ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-300 text-gray-600'
                        }`}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold">{userData.fullName}</h1>
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
                  <span className="ml-2 font-bold">{averageRating > 0 ? averageRating.toFixed(1) : '---'}</span>
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
          value={userData.hourlyRate || ''}
          onChange={handleFormChange}
          className={`w-16 px-2 py-1 rounded border ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
          }`}
        />
        <span className="ml-1">/hr</span>
      </div>
    ) : (
      <p className="font-bold">{userData.hourlyRate > 0 ? `$${userData.hourlyRate}/hr` : '---'}</p>
    )}
  </div>
  
  <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
    <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
    <p className="font-bold">{userData.joinDate}</p>
  </div>
  
  <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
    <p className="text-sm text-gray-500 dark:text-gray-400">Availability</p>
    {isEditing ? (
      <select
        name="availabilityPerWeek"
        value={userData.availabilityPerWeek || ''}
        onChange={handleFormChange}
        className={`px-2 py-1 rounded border text-sm ${
          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
        }`}
      >
        <option value="">Select Availability</option>
        <option value="Less than 30 hrs/week">Less than 30 hrs/week</option>
        <option value="30+ hrs/week">30+ hrs/week</option>
        <option value="As needed - open to offers">As needed - open to offers</option>
        <option value="Not available">Not available</option>
      </select>
    ) : (
      <p className="font-bold">{userData.availabilityPerWeek || '---'}</p>
    )}
  </div>
  
  <div className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
    <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
    {isEditing ? (
      <select
        name="gender"
        value={userData.gender || ''}
        onChange={handleFormChange}
        className={`px-2 py-1 rounded border text-sm ${
          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
        }`}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
        <option value="Prefer not to say">Prefer not to say</option>
      </select>
    ) : (
      <p className="font-bold">{userData.gender || '---'}</p>
    )}
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
                      name="bio"
                      value={userData.bio}
                      onChange={handleFormChange}
                      rows={4}
                      placeholder="Tell us about yourself..."
                      className={`w-full px-3 py-2 rounded-lg border ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    ></textarea>
                  ) : (
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {userData.bio}
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
                    {userData.skills.length > 0 ? (
                      userData.skills.map((skill, index) => (
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
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No skills added yet</p>
                    )}
                  </div>
                </div>
                
                {/* Work Experience Section */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <h2 className="text-xl font-bold mb-4">Work Experience</h2>
                  <div className="space-y-6">
                    {userData.experience.length > 0 ? (
                      userData.experience.map((exp, index) => (
                        <div key={index} className="relative pl-6 pb-6 border-l-2 border-gray-300 dark:border-gray-700 last:pb-0">
                          <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600"></div>
                          <div>
                            <h3 className="font-bold">{exp.position || '---'}</h3>
                            <p className="text-sm text-blue-600 dark:text-blue-400">{exp.company || '---'}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{exp.years || '---'}</p>
                            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.description || '---'}</p>
                            
                            {isEditing && (
                              <div className="mt-2 flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm">
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleRemoveExperience(index)}
                                  className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No work experience added yet</p>
                    )}
                    
                    {isEditing && (
                      <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <h4 className="font-medium mb-3">Add Work Experience</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Company"
                            value={newExperience.company}
                            onChange={(e) => setNewExperience(prev => ({...prev, company: e.target.value}))}
                            className={`px-3 py-2 rounded-lg border ${
                              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                          />
                          <input
                            type="text"
                            placeholder="Position"
                            value={newExperience.position}
                            onChange={(e) => setNewExperience(prev => ({...prev, position: e.target.value}))}
                            className={`px-3 py-2 rounded-lg border ${
                              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                          />
                          <input
                            type="text"
                            placeholder="From Date"
                            value={newExperience.fromDate}
                            onChange={(e) => setNewExperience(prev => ({...prev, fromDate: e.target.value}))}
                            className={`px-3 py-2 rounded-lg border ${
                              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                          />
                          <input
                            type="text"
                            placeholder="To Date"
                            value={newExperience.toDate}
                            onChange={(e) => setNewExperience(prev => ({...prev, toDate: e.target.value}))}
                            className={`px-3 py-2 rounded-lg border ${
                              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                          />
                        </div>
                        <textarea
                          placeholder="Job Description"
                          value={newExperience.description}
                          onChange={(e) => setNewExperience(prev => ({...prev, description: e.target.value}))}
                          rows={3}
                          className={`w-full mt-3 px-3 py-2 rounded-lg border ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                        <button
                          onClick={handleAddExperience}
                          className="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Add Experience
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Education Section */}
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <h2 className="text-xl font-bold mb-4">Education</h2>
                  
                  <div className="space-y-6">
                    {userData.education.length > 0 ? (
                      userData.education.map((edu, index) => (
                        <div key={index} className="relative pl-6 pb-6 border-l-2 border-gray-300 dark:border-gray-700 last:pb-0">
                          <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-blue-600"></div>
                          <div>
                            <h3 className="font-bold">{edu.degree || '---'}</h3>
                            <p className="text-sm text-blue-600 dark:text-blue-400">{edu.institution || '---'}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{edu.years || '---'}</p>
                            
                            {isEditing && (
                              <div className="mt-2 flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm">
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleRemoveEducation(index)}
                                  className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No education added yet</p>
                    )}
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
                            placeholder="e.g., 2015 - 2019"
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
                    {userData.certifications.length > 0 ? (
                      userData.certifications.map((cert, index) => (
                        <div 
                          key={index} 
                          className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} flex items-start`}
                        >
                          <FaCertificate className="text-blue-600 mr-3 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <h3 className="font-medium">{cert.name || '---'}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer || '---'}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cert.date || '---'}</p>
                            
                            {isEditing && (
                              <div className="mt-2 flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm">
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleRemoveCertification(index)}
                                  className="text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No certifications added yet</p>
                    )}
                  </div>
                  
                  {isEditing && (
                    <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-3">Add Certification</h4>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Certification Name"
                          value={newCertification.name}
                          onChange={(e) => setNewCertification(prev => ({...prev, name: e.target.value}))}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                        <input
                          type="text"
                          placeholder="Issuing Organization"
                          value={newCertification.issuer}
                          onChange={(e) => setNewCertification(prev => ({...prev, issuer: e.target.value}))}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                        <input
                          type="text"
                          placeholder="Date Obtained"
                          value={newCertification.date}
                          onChange={(e) => setNewCertification(prev => ({...prev, date: e.target.value}))}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                        <button
                          onClick={handleAddCertification}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Add Certification
                        </button>
                      </div>
                    </div>
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
                      <button 
                        onClick={() => {
                          const form = document.getElementById('add-project-form');
                          if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                      >
                        <FaPlus className="mr-2" />
                        Add Project
                      </button>
                    )}
                  </div>
                  
                  {isEditing && (
                    <div id="add-project-form" style={{display: 'none'}} className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium mb-3">Add New Project</h4>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Project Name"
                          value={newProject.name}
                          onChange={(e) => setNewProject(prev => ({...prev, name: e.target.value}))}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                        <textarea
                          placeholder="Project Description"
                          value={newProject.description}
                          onChange={(e) => setNewProject(prev => ({...prev, description: e.target.value}))}
                          rows={3}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                        <input
                          type="text"
                          placeholder="Technologies (comma separated)"
                          value={newProject.technologies.join(', ')}
                          onChange={(e) => setNewProject(prev => ({...prev, technologies: e.target.value.split(', ').filter(t => t.trim())}))}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                        <input
                          type="url"
                          placeholder="Project Link"
                          value={newProject.link}
                          onChange={(e) => setNewProject(prev => ({...prev, link: e.target.value}))}
                          className={`w-full px-3 py-2 rounded-lg border ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                          }`}
                        />
                        <button
                          onClick={handleAddProject}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                          Add Project
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    {userData.portfolioProjects.length > 0 ? (
                      userData.portfolioProjects.map((project, index) => (
                        <div 
                          key={index} 
                          className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                        >
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg">{project.name || '---'}</h3>
                            {isEditing && (
                              <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                                  <FaEdit />
                                </button>
                                <button 
                                  onClick={() => handleRemoveProject(index)}
                                  className="text-red-600 hover:text-red-800 dark:hover:text-red-400"
                                >
                                  <FaTrashAlt />
                                </button>
                              </div>
                            )}
                          </div>
                          
                          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {project.description || '---'}
                          </p>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.technologies && project.technologies.length > 0 ? (
                              project.technologies.map((tech, techIndex) => (
                                <span 
                                  key={techIndex} 
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    darkMode ? 'bg-blue-900 bg-opacity-20 text-blue-300' : 'bg-blue-100 text-blue-800'
                                  }`}
                                >
                                  {tech}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500 dark:text-gray-400 text-sm">No technologies listed</span>
                            )}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                            {project.link ? (
                              <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 flex items-center"
                              >
                                <FaGlobe className="mr-2" />
                                View Project
                              </a>
                            ) : (
                              <span className="text-gray-500 dark:text-gray-400 text-sm">No project link available</span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No projects added yet</p>
                    )}
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
                        <h3 className="font-bold text-lg">{averageRating > 0 ? averageRating.toFixed(1) : '---'}</h3>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} size={16} className={i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'} />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{userData.reviews.length} reviews</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">All time</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {userData.reviews.length > 0 ? (
                      userData.reviews.map((review, index) => (
                        <div 
                          key={index} 
                          className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                        >
                          <div className="flex items-start">
                            <img 
                              src={review.clientAvatar || 'https://via.placeholder.com/48'} 
                              alt={review.clientName || 'Client'} 
                              className="w-12 h-12 rounded-full mr-4"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{review.clientName || '---'}</h3>
                                  <div className="flex text-yellow-400 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar key={i} size={14} className={i < (review.rating || 0) ? 'text-yellow-400' : 'text-gray-300'} />
                                    ))}
                                  </div>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{review.date || '---'}</span>
                              </div>
                              <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {review.comment || '---'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No reviews yet</p>
                    )}
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
                            <p className="text-sm text-gray-500 dark:text-gray-400">Email: {userData.email}</p>
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
                  <button 
                    onClick={() => {
                      const form = document.getElementById('add-language-form');
                      if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
                    }}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Add Language
                  </button>
                )}
              </div>
              
              {isEditing && (
                <div id="add-language-form" style={{display: 'none'}} className="mb-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Language"
                      value={newLanguage.name}
                      onChange={(e) => setNewLanguage(prev => ({...prev, name: e.target.value}))}
                      className={`w-full px-2 py-1 text-sm rounded border ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    />
                    <select
                      value={newLanguage.proficiency}
                      onChange={(e) => setNewLanguage(prev => ({...prev, proficiency: e.target.value}))}
                      className={`w-full px-2 py-1 text-sm rounded border ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                      }`}
                    >
                      <option value="">Select Proficiency</option>
                      <option value="Basic">Basic</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Native">Native</option>
                    </select>
                    <button
                      onClick={handleAddLanguage}
                      className="w-full py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
              
              <ul className="space-y-3">
                {userData.languages.length > 0 ? (
                  userData.languages.map((lang, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{lang.name || '---'}</span>
                      <div className="flex items-center">
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {lang.proficiency || '---'}
                        </span>
                        {isEditing && (
                          <button 
                            onClick={() => handleRemoveLanguage(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <FaTrashAlt size={12} />
                          </button>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 dark:text-gray-400">No languages added yet</li>
                )}
              </ul>
            </div>
            
            {/* Availability Section */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
              <h2 className="text-lg font-bold mb-4">Availability</h2>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaClock className="text-green-500 mr-2" />
                  <span>{userData.availabilityPerWeek || 'Not specified'}</span>
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
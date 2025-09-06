// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { 
//   FaUser, 
//   FaBriefcase, 
//   FaRegClock, 
//   FaChartLine, 
//   FaStar, 
//   FaRegBell, 
//   FaRegEnvelope, 
//   FaRegCalendarAlt,
//   FaRegCheckCircle,
//   FaEdit,
//   FaEllipsisH,
//   FaLongArrowAltUp,
//   FaLongArrowAltDown,
//   FaSearch
// } from 'react-icons/fa';

// const DashboardPage = ({ darkMode }) => {
//   const [activeTab, setActiveTab] = useState('overview');
  
//   // Mock data for dashboard
//   const dashboardData = {
//     activeProjects: 3,
//     completedProjects: 12,
//     totalEarnings: 4850,
//     availableBalance: 1250,
//     profileCompleteness: 85,
//     averageRating: 4.8,
//     reviewCount: 17,
    
//     // Recent activities
//     activities: [
//       { 
//         id: 1, 
//         type: 'project_awarded', 
//         title: 'You were awarded "Frontend Developer Needed"', 
//         time: '2 hours ago',
//         isNew: true
//       },
//       { 
//         id: 2, 
//         type: 'message', 
//         title: 'New message from Sarah Johnson', 
//         time: '5 hours ago',
//         isNew: true
//       },
//       { 
//         id: 3, 
//         type: 'payment', 
//         title: 'Payment of $350 received', 
//         time: '1 day ago',
//         isNew: false
//       },
//       { 
//         id: 4, 
//         type: 'review', 
//         title: 'Michael Brown left you a 5-star review', 
//         time: '2 days ago',
//         isNew: false
//       },
//       { 
//         id: 5, 
//         type: 'proposal', 
//         title: 'Your proposal for "Mobile App UI Design" was viewed', 
//         time: '3 days ago',
//         isNew: false
//       }
//     ],
    
//     // Active projects
//     projects: [
//       {
//         id: 1,
//         title: "Frontend Developer Needed",
//         client: "John Doe",
//         deadline: "May 15, 2025",
//         progress: 65,
//         budget: "$400"
//       },
//       {
//         id: 2,
//         title: "Backend API Development",
//         client: "Sarah Johnson",
//         deadline: "May 20, 2025",
//         progress: 30,
//         budget: "$800"
//       },
//       {
//         id: 3,
//         title: "Mobile App UI Design",
//         client: "Michael Brown",
//         deadline: "May 25, 2025",
//         progress: 10,
//         budget: "$600"
//       }
//     ],
    
//     // Upcoming deadlines
//     deadlines: [
//       {
//         id: 1,
//         title: "Frontend Developer Needed",
//         deadline: "May 15, 2025",
//         daysLeft: 8
//       },
//       {
//         id: 2,
//         title: "Backend API Development",
//         deadline: "May 20, 2025",
//         daysLeft: 13
//       },
//       {
//         id: 3,
//         title: "Mobile App UI Design",
//         deadline: "May 25, 2025",
//         daysLeft: 18
//       }
//     ],
    
//     // Monthly earnings data for chart
//     earnings: [
//       { month: 'Jan', amount: 850 },
//       { month: 'Feb', amount: 1200 },
//       { month: 'Mar', amount: 750 },
//       { month: 'Apr', amount: 1450 },
//       { month: 'May', amount: 600 },
//     ]
//   };

//   // Activity icon mapping
//   const getActivityIcon = (type) => {
//     switch (type) {
//       case 'project_awarded':
//         return <FaBriefcase className="text-green-500" />;
//       case 'message':
//         return <FaRegEnvelope className="text-blue-500" />;
//       case 'payment':
//         return <FaChartLine className="text-purple-500" />;
//       case 'review':
//         return <FaStar className="text-yellow-500" />;
//       case 'proposal':
//         return <FaRegCheckCircle className="text-orange-500" />;
//       default:
//         return <FaRegBell className="text-gray-500" />;
//     }
//   };

//   return (
//     <div className="min-h-screen pb-16">
//       {/* Page Header */}
//       <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
//         <div className="container mx-auto px-4">
//           <h1 className="text-3xl font-bold">Dashboard</h1>
//           <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//             Welcome back, John! Here's what's happening with your projects today.
//           </p>
//         </div>
//       </div>
      
//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         {/* Dashboard Tabs */}
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
//               activeTab === 'projects' 
//                 ? 'text-blue-600 border-b-2 border-blue-600' 
//                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('projects')}
//           >
//             My Projects
//           </button>
//           <button 
//             className={`px-4 py-2 font-medium whitespace-nowrap ${
//               activeTab === 'proposals' 
//                 ? 'text-blue-600 border-b-2 border-blue-600' 
//                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('proposals')}
//           >
//             My Proposals
//           </button>
//           <button 
//             className={`px-4 py-2 font-medium whitespace-nowrap ${
//               activeTab === 'earnings' 
//                 ? 'text-blue-600 border-b-2 border-blue-600' 
//                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('earnings')}
//           >
//             Earnings
//           </button>
//           <button 
//             className={`px-4 py-2 font-medium whitespace-nowrap ${
//               activeTab === 'profile' 
//                 ? 'text-blue-600 border-b-2 border-blue-600' 
//                 : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('profile')}
//           >
//             Profile
//           </button>
//         </div>
        
//         {/* Main Dashboard Content - Overview Tab */}
//         {activeTab === 'overview' && (
//           <div>
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {/* Active Projects Card */}
//               <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Projects</p>
//                     <h3 className="text-2xl font-bold mt-1">{dashboardData.activeProjects}</h3>
//                   </div>
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
//                     <FaBriefcase className="text-blue-600" />
//                   </div>
//                 </div>
//                 <div className="mt-4 flex items-center text-sm">
//                   <FaLongArrowAltUp className="text-green-500 mr-1" />
//                   <span className="text-green-500 font-medium">+2</span>
//                   <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>from last month</span>
//                 </div>
//               </div>
              
//               {/* Completed Projects Card */}
//               <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Completed Projects</p>
//                     <h3 className="text-2xl font-bold mt-1">{dashboardData.completedProjects}</h3>
//                   </div>
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
//                     <FaRegCheckCircle className="text-green-600" />
//                   </div>
//                 </div>
//                 <div className="mt-4 flex items-center text-sm">
//                   <FaLongArrowAltUp className="text-green-500 mr-1" />
//                   <span className="text-green-500 font-medium">+5</span>
//                   <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>from last month</span>
//                 </div>
//               </div>
              
//               {/* Total Earnings Card */}
//               <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Earnings</p>
//                     <h3 className="text-2xl font-bold mt-1">${dashboardData.totalEarnings}</h3>
//                   </div>
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
//                     <FaChartLine className="text-purple-600" />
//                   </div>
//                 </div>
//                 <div className="mt-4 flex items-center text-sm">
//                   <FaLongArrowAltDown className="text-red-500 mr-1" />
//                   <span className="text-red-500 font-medium">-$250</span>
//                   <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>from last month</span>
//                 </div>
//               </div>
              
//               {/* Rating Card */}
//               <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Average Rating</p>
//                     <h3 className="text-2xl font-bold mt-1">{dashboardData.averageRating}</h3>
//                   </div>
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
//                     <FaStar className="text-yellow-500" />
//                   </div>
//                 </div>
//                 <div className="mt-4 flex items-center text-sm">
//                   <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>from {dashboardData.reviewCount} reviews</span>
//                 </div>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//               {/* Active Projects */}
//               <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 lg:col-span-2`}>
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="text-lg font-bold">Active Projects</h3>
//                   <Link to="/my-projects" className="text-blue-600 text-sm hover:underline">View All</Link>
//                 </div>
                
//                 <div className="space-y-6">
//                   {dashboardData.projects.map(project => (
//                     <div key={project.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//                       <div className="flex justify-between">
//                         <div>
//                           <h4 className="font-medium">{project.title}</h4>
//                           <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Client: {project.client}</p>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-medium">{project.budget}</p>
//                           <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Deadline: {project.deadline}</p>
//                         </div>
//                       </div>
                      
//                       <div className="mt-4">
//                         <div className="flex justify-between text-sm mb-1">
//                           <span>Progress</span>
//                           <span>{project.progress}%</span>
//                         </div>
//                         <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
//                           <div 
//                             className="h-full bg-blue-600 rounded-full" 
//                             style={{ width: `${project.progress}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               {/* Recent Activity */}
//               <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="text-lg font-bold">Recent Activity</h3>
//                   <button className="text-blue-600 text-sm hover:underline">Mark All Read</button>
//                 </div>
                
//                 <div className="space-y-4">
//                   {dashboardData.activities.map(activity => (
//                     <div 
//                       key={activity.id} 
//                       className={`flex items-start p-3 rounded-lg ${
//                         activity.isNew 
//                           ? darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50' 
//                           : darkMode ? 'bg-gray-700' : 'bg-gray-50'
//                       }`}
//                     >
//                       <div className={`mr-3 mt-1 ${activity.isNew ? 'text-blue-600' : ''}`}>
//                         {getActivityIcon(activity.type)}
//                       </div>
//                       <div className="flex-1">
//                         <p className={`${activity.isNew ? 'font-medium' : ''}`}>{activity.title}</p>
//                         <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</p>
//                       </div>
//                       <div>
//                         <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
//                           <FaEllipsisH size={14} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Profile Completeness */}
//               <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="text-lg font-bold">Profile Completeness</h3>
//                   <Link to="/dashboard?tab=profile" className="text-blue-600 text-sm hover:underline">Edit Profile</Link>
//                 </div>
                
//                 <div className="flex justify-center mb-4">
//                   <div className="relative w-32 h-32">
//                     <svg className="w-full h-full" viewBox="0 0 36 36">
//                       <path
//                         d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                         fill="none"
//                         stroke={darkMode ? "#374151" : "#E5E7EB"}
//                         strokeWidth="3"
//                       />
//                       <path
//                         d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                         fill="none"
//                         stroke="#3B82F6"
//                         strokeWidth="3"
//                         strokeDasharray={`${dashboardData.profileCompleteness}, 100`}
//                       />
//                     </svg>
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
//                       <span className="text-2xl font-bold">{dashboardData.profileCompleteness}%</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="space-y-2 text-sm">
//                   <div className="flex items-center">
//                     <FaRegCheckCircle className="text-green-500 mr-2" />
//                     <span>Basic Info</span>
//                   </div>
//                   <div className="flex items-center">
//                     <FaRegCheckCircle className="text-green-500 mr-2" />
//                     <span>Skills & Expertise</span>
//                   </div>
//                   <div className="flex items-center">
//                     <FaRegCheckCircle className="text-green-500 mr-2" />
//                     <span>Education</span>
//                   </div>
//                   <div className="flex items-center text-gray-400">
//                     <FaRegCheckCircle className="mr-2" />
//                     <span>Portfolio (Missing)</span>
//                   </div>
//                   <div className="flex items-center text-gray-400">
//                     <FaRegCheckCircle className="mr-2" />
//                     <span>Payment Methods (Missing)</span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Upcoming Deadlines */}
//               <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="text-lg font-bold">Upcoming Deadlines</h3>
//                   <Link to="/tasklist" className="text-blue-600 text-sm hover:underline">View All</Link>
//                 </div>
                
//                 <div className="space-y-4">
//                   {dashboardData.deadlines.map(deadline => (
//                     <div 
//                       key={deadline.id} 
//                       className={`p-4 rounded-lg ${
//                         deadline.daysLeft <= 10 
//                           ? darkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-50' 
//                           : darkMode ? 'bg-gray-700' : 'bg-gray-50'
//                       }`}
//                     >
//                       <div className="flex justify-between">
//                         <h4 className="font-medium">{deadline.title}</h4>
//                         <span className={`text-sm font-medium ${
//                           deadline.daysLeft <= 5 
//                             ? 'text-red-600' 
//                             : deadline.daysLeft <= 10 
//                               ? 'text-yellow-600' 
//                               : 'text-green-600'
//                         }`}>
//                           {deadline.daysLeft} days left
//                         </span>
//                       </div>
//                       <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         Due: {deadline.deadline}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               {/* Quick Actions */}
//               <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
//                 <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <Link 
//                     to="/browse" 
//                     className={`p-4 rounded-lg text-center flex flex-col items-center justify-center ${
//                       darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
//                     }`}
//                   >
//                     <FaSearch className="text-blue-600 text-2xl mb-2" />
//                     <span className="text-sm">Find Projects</span>
//                   </Link>
                  
//                   <Link 
//                     to="/my-projects" 
//                     className={`p-4 rounded-lg text-center flex flex-col items-center justify-center ${
//                       darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
//                     }`}
//                   >
//                     <FaBriefcase className="text-purple-600 text-2xl mb-2" />
//                     <span className="text-sm">My Projects</span>
//                   </Link>
                  
//                   <Link 
//                     to="/inbox" 
//                     className={`p-4 rounded-lg text-center flex flex-col items-center justify-center ${
//                       darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
//                     }`}
//                   >
//                     <FaRegEnvelope className="text-green-600 text-2xl mb-2" />
//                     <span className="text-sm">Messages</span>
//                   </Link>
                  
//                   <Link 
//                     to="/dashboard?tab=profile" 
//                     className={`p-4 rounded-lg text-center flex flex-col items-center justify-center ${
//                       darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
//                     }`}
//                   >
//                     <FaEdit className="text-orange-600 text-2xl mb-2" />
//                     <span className="text-sm">Edit Profile</span>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       </div>
//   )
// }
// export default DashboardPage


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaBriefcase, 
  FaRegClock, 
  FaChartLine, 
  FaStar, 
  FaRegBell, 
  FaRegEnvelope, 
  FaRegCalendarAlt,
  FaRegCheckCircle,
  FaEdit,
  FaEllipsisH,
  FaLongArrowAltUp,
  FaLongArrowAltDown,
  FaSearch,
  FaDollarSign,
  FaSpinner,
  FaExclamationTriangle,
  FaClock,
  FaUsers,
  FaProjectDiagram,
  FaTrophy,
  FaHandshake
} from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const DashboardPage = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard analytics
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost:5000/api/dashboard/analytics', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
          setDashboardData(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch dashboard data');
        }
      } catch (err) {
        console.error('Dashboard error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen pb-16 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen pb-16 flex items-center justify-center">
        <div className="text-center">
          <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to load dashboard</h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const userRole = dashboardData?.role || 'user';
  const isFreelancer = userRole === 'freelancer';
  const isClient = userRole === 'client';

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${Math.round(value || 0)}%`;
  };

  // Colors for charts
  const chartColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  // Render freelancer overview cards
  const renderFreelancerOverviewCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex justify-between items-start">
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Bids</p>
            <h3 className="text-2xl font-bold mt-1">{dashboardData.overview.totalBids}</h3>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
            <FaHandshake className="text-blue-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-500 font-medium">{dashboardData.overview.acceptedBids} accepted</span>
          <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            ({formatPercentage(dashboardData.overview.bidSuccessRate)} success rate)
          </span>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex justify-between items-start">
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Earnings</p>
            <h3 className="text-2xl font-bold mt-1">{formatCurrency(dashboardData.overview.totalEarnings)}</h3>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
            <FaDollarSign className="text-green-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Avg: {formatCurrency(dashboardData.overview.averageEarningsPerProject)} per project
          </span>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex justify-between items-start">
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Average Rating</p>
            <h3 className="text-2xl font-bold mt-1">{dashboardData.overview.rating || 'N/A'}</h3>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
            <FaStar className="text-yellow-500" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Profile: {formatPercentage(dashboardData.overview.profileCompleteness)} complete
          </span>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex justify-between items-start">
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Conversations</p>
            <h3 className="text-2xl font-bold mt-1">{dashboardData.overview.activeConversations}</h3>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
            <FaRegEnvelope className="text-purple-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          {dashboardData.overview.unreadMessages > 0 && (
            <span className="text-red-500 font-medium">{dashboardData.overview.unreadMessages} unread</span>
          )}
        </div>
      </div>
    </div>
  );

  // Render client overview cards
  const renderClientOverviewCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex justify-between items-start">
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Projects</p>
            <h3 className="text-2xl font-bold mt-1">{dashboardData.overview.totalProjects}</h3>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
            <FaProjectDiagram className="text-blue-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className="text-green-500 font-medium">{dashboardData.overview.completedProjects} completed</span>
          <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {dashboardData.overview.activeProjects} active
          </span>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex justify-between items-start">
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Spent</p>
            <h3 className="text-2xl font-bold mt-1">{formatCurrency(dashboardData.overview.totalSpent)}</h3>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
            <FaDollarSign className="text-green-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Avg: {formatCurrency(dashboardData.overview.averageProjectBudget)} per project
          </span>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex justify-between items-start">
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg Bids/Project</p>
            <h3 className="text-2xl font-bold mt-1">{dashboardData.overview.averageBidsPerProject}</h3>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
            <FaUsers className="text-purple-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Freelancer applications
          </span>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <div className="flex justify-between items-start">
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Conversations</p>
            <h3 className="text-2xl font-bold mt-1">{dashboardData.overview.activeConversations}</h3>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
            <FaRegEnvelope className="text-yellow-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          {dashboardData.overview.unreadMessages > 0 && (
            <span className="text-red-500 font-medium">{dashboardData.overview.unreadMessages} unread</span>
          )}
        </div>
      </div>
    </div>
  );

  // Render earnings chart for freelancer
  const renderEarningsChart = () => {
    if (!dashboardData.earnings || !dashboardData.earnings.monthlyEarnings) return null;

    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h3 className="text-lg font-bold mb-6">Monthly Earnings</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dashboardData.earnings.monthlyEarnings}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
            <XAxis 
              dataKey="month" 
              stroke={darkMode ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
            />
            <YAxis 
              stroke={darkMode ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                borderRadius: '8px'
              }}
              formatter={(value) => [`$${value}`, 'Earnings']}
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Render spending chart for client
  const renderSpendingChart = () => {
    if (!dashboardData.spending || !dashboardData.spending.monthlySpending) return null;

    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h3 className="text-lg font-bold mb-6">Monthly Spending</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dashboardData.spending.monthlySpending}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
            <XAxis 
              dataKey="month" 
              stroke={darkMode ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
            />
            <YAxis 
              stroke={darkMode ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                borderRadius: '8px'
              }}
              formatter={(value) => [`$${value}`, 'Spending']}
            />
            <Bar 
              dataKey="amount" 
              fill="#10B981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Render skills distribution pie chart
  const renderSkillsChart = () => {
    if (!dashboardData.skills || !dashboardData.skills.skillsDistribution) return null;

    const data = dashboardData.skills.skillsDistribution.slice(0, 6);

    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h3 className="text-lg font-bold mb-6">Skills Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({skill, percent}) => `${skill} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Render project type distribution
  const renderProjectTypeChart = () => {
    const data = isFreelancer 
      ? dashboardData.projects?.projectTypeDistribution 
      : dashboardData.projects?.projectTypeDistribution;
    
    if (!data || data.length === 0) return null;

    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h3 className="text-lg font-bold mb-6">Project Types</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.slice(0, 8)} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
            <XAxis 
              type="number" 
              stroke={darkMode ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
            />
            <YAxis 
              type="category" 
              dataKey="type" 
              stroke={darkMode ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
              width={100}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                borderRadius: '8px'
              }}
            />
            <Bar 
              dataKey="count" 
              fill="#8B5CF6"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  // Render top freelancers for client
  const renderTopFreelancers = () => {
    if (!isClient || !dashboardData.freelancers?.topFreelancers) return null;

    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h3 className="text-lg font-bold mb-6">Top Freelancers</h3>
        <div className="space-y-4">
          {dashboardData.freelancers.topFreelancers.map((freelancer, index) => (
            <div key={freelancer.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{freelancer.name}</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {freelancer.projects} projects • {formatCurrency(freelancer.hourlyRate)}/hr
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{formatCurrency(freelancer.totalEarned)}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total paid</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render most profitable skills for freelancer
  const renderProfitableSkills = () => {
    if (!isFreelancer || !dashboardData.skills?.mostProfitableSkills) return null;

    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
        <h3 className="text-lg font-bold mb-6">Most Profitable Skills</h3>
        <div className="space-y-4">
          {dashboardData.skills.mostProfitableSkills.map((skill, index) => (
            <div key={skill.skill} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{skill.skill}</h4>
                  <div className={`w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full mt-2`}>
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ 
                        width: `${(skill.earnings / dashboardData.skills.mostProfitableSkills[0].earnings) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-green-600">{formatCurrency(skill.earnings)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Page Header */}
      <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {isFreelancer && "Welcome back! Here's your freelancing overview."}
            {isClient && "Welcome back! Here's your project management overview."}
            {!isFreelancer && !isClient && "Welcome to your dashboard."}
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Tabs */}
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
              activeTab === 'analytics' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
          {isFreelancer && (
            <button 
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'earnings' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('earnings')}
            >
              Earnings
            </button>
          )}
          {isClient && (
            <button 
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'spending' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('spending')}
            >
              Spending
            </button>
          )}
          <button 
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'performance' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('performance')}
          >
            Performance
          </button>
        </div>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Role-specific overview cards */}
            {isFreelancer && renderFreelancerOverviewCards()}
            {isClient && renderClientOverviewCards()}
            
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {isFreelancer && renderEarningsChart()}
              {isClient && renderSpendingChart()}
              {renderProjectTypeChart()}
            </div>

            {/* Secondary Cards Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {isFreelancer && renderSkillsChart()}
              {isFreelancer && renderProfitableSkills()}
              {isClient && renderTopFreelancers()}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderSkillsChart()}
            {renderProjectTypeChart()}
            {isFreelancer && renderEarningsChart()}
            {isClient && renderSpendingChart()}
          </div>
        )}

        {/* Earnings Tab (Freelancer only) */}
        {activeTab === 'earnings' && isFreelancer && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <h3 className="text-lg font-bold mb-2">Total Earnings</h3>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(dashboardData.overview.totalEarnings)}
                </p>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <h3 className="text-lg font-bold mb-2">Average Per Project</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(dashboardData.overview.averageEarningsPerProject)}
                </p>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <h3 className="text-lg font-bold mb-2">Success Rate</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {formatPercentage(dashboardData.overview.bidSuccessRate)}
                </p>
              </div>
            </div>
            {renderEarningsChart()}
            {renderProfitableSkills()}
          </div>
        )}

       {/* Spending Tab (Client only) */}
        {activeTab === 'spending' && isClient && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <h3 className="text-lg font-bold mb-2">Total Spent</h3>
                <p className="text-3xl font-bold text-green-600">
                  {formatCurrency(dashboardData.overview.totalSpent)}
                </p>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <h3 className="text-lg font-bold mb-2">Average Per Project</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(dashboardData.overview.averageProjectBudget)}
                </p>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <h3 className="text-lg font-bold mb-2">Active Projects</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {dashboardData.overview.activeProjects}
                </p>
              </div>
            </div>
            {renderSpendingChart()}
            {renderTopFreelancers()}
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            {/* Performance metrics cards */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              {isFreelancer && (
                <>
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Response Time</p>
                        <h3 className="text-2xl font-bold mt-1">
                          {dashboardData.performance?.responseTime || 'N/A'}
                        </h3>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                        <FaClock className="text-blue-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Client Satisfaction</p>
                        <h3 className="text-2xl font-bold mt-1">
                          {formatPercentage(dashboardData.performance?.clientSatisfaction)}
                        </h3>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                        <FaTrophy className="text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Completion Rate</p>
                        <h3 className="text-2xl font-bold mt-1">
                          {formatPercentage(dashboardData.projects?.completionRate)}
                        </h3>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
                        <FaRegCheckCircle className="text-purple-600" />
                      </div>
                    </div>
                  </div>

                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Profile Views</p>
                        <h3 className="text-2xl font-bold mt-1">
                          {dashboardData.performance?.profileViews || 0}
                        </h3>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
                        <FaChartLine className="text-yellow-600" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {isClient && (
                <>
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Project Completion Rate</p>
                        <h3 className="text-2xl font-bold mt-1">
                          {formatPercentage(dashboardData.performance?.projectCompletionRate)}
                        </h3>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                        <FaRegCheckCircle className="text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Freelancer Satisfaction</p>
                        <h3 className="text-2xl font-bold mt-1">
                          {formatPercentage(dashboardData.performance?.freelancerSatisfaction)}
                        </h3>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                        <FaTrophy className="text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg Response Time</p>
                        <h3 className="text-2xl font-bold mt-1">
                          {dashboardData.performance?.averageResponseTime || 'N/A'}
                        </h3>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
                        <FaClock className="text-purple-600" />
                      </div>
                    </div>
                  </div>

                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg Time to Hire</p>
                        <h3 className="text-2xl font-bold mt-1">
                          {dashboardData.projects?.averageTimeToHire || 'N/A'}
                        </h3>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
                        <FaRegClock className="text-yellow-600" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Performance charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bid Activity Chart (Freelancer) */}
              {isFreelancer && dashboardData.activity?.bidsLast30Days && (
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <h3 className="text-lg font-bold mb-6">Bid Activity (Last 30 Days)</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={dashboardData.activity.bidsLast30Days}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                      <XAxis 
                        dataKey="_id" 
                        stroke={darkMode ? '#9CA3AF' : '#6B7280'}
                        fontSize={12}
                      />
                      <YAxis 
                        stroke={darkMode ? '#9CA3AF' : '#6B7280'}
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                          border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                          borderRadius: '8px'
                        }}
                        formatter={(value) => [value, 'Bids']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        dot={{ fill: '#8B5CF6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Project Activity Chart (Client) */}
              {isClient && dashboardData.activity?.projectsLast30Days && (
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <h3 className="text-lg font-bold mb-6">Project Activity (Last 30 Days)</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={dashboardData.activity.projectsLast30Days}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                      <XAxis 
                        dataKey="_id" 
                        stroke={darkMode ? '#9CA3AF' : '#6B7280'}
                        fontSize={12}
                      />
                      <YAxis 
                        stroke={darkMode ? '#9CA3AF' : '#6B7280'}
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                          border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                          borderRadius: '8px'
                        }}
                        formatter={(value) => [value, 'Projects']}
                      />
                      <Bar 
                        dataKey="count" 
                        fill="#F59E0B"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Budget Distribution Chart (Client) */}
              {isClient && dashboardData.projects?.budgetDistribution && (
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <h3 className="text-lg font-bold mb-6">Budget Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={dashboardData.projects.budgetDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({range, percent}) => `${range} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {dashboardData.projects.budgetDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Hiring Patterns (Client) */}
              {isClient && dashboardData.freelancers?.hiringPatterns && (
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                  <h3 className="text-lg font-bold mb-6">Hiring Patterns</h3>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h4 className="font-medium mb-2">Average Time to Accept Bid</h4>
                      <p className="text-2xl font-bold text-blue-600">
                        {dashboardData.freelancers.hiringPatterns.averageTimeToAccept}
                      </p>
                    </div>
                    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <h4 className="font-medium mb-2">Avg Bid vs Budget Ratio</h4>
                      <p className="text-2xl font-bold text-green-600">
                        {dashboardData.freelancers.hiringPatterns.averageBidVsBudgetRatio}x
                      </p>
                    </div>
                    {dashboardData.freelancers.hiringPatterns.mostCommonSkills && (
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <h4 className="font-medium mb-2">Most Hired Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {dashboardData.freelancers.hiringPatterns.mostCommonSkills.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                            >
                              {skill.skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
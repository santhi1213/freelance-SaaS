import React, { useState } from 'react';
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
  FaSearch
} from 'react-icons/fa';

const DashboardPage = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for dashboard
  const dashboardData = {
    activeProjects: 3,
    completedProjects: 12,
    totalEarnings: 4850,
    availableBalance: 1250,
    profileCompleteness: 85,
    averageRating: 4.8,
    reviewCount: 17,
    
    // Recent activities
    activities: [
      { 
        id: 1, 
        type: 'project_awarded', 
        title: 'You were awarded "Frontend Developer Needed"', 
        time: '2 hours ago',
        isNew: true
      },
      { 
        id: 2, 
        type: 'message', 
        title: 'New message from Sarah Johnson', 
        time: '5 hours ago',
        isNew: true
      },
      { 
        id: 3, 
        type: 'payment', 
        title: 'Payment of $350 received', 
        time: '1 day ago',
        isNew: false
      },
      { 
        id: 4, 
        type: 'review', 
        title: 'Michael Brown left you a 5-star review', 
        time: '2 days ago',
        isNew: false
      },
      { 
        id: 5, 
        type: 'proposal', 
        title: 'Your proposal for "Mobile App UI Design" was viewed', 
        time: '3 days ago',
        isNew: false
      }
    ],
    
    // Active projects
    projects: [
      {
        id: 1,
        title: "Frontend Developer Needed",
        client: "John Doe",
        deadline: "May 15, 2025",
        progress: 65,
        budget: "$400"
      },
      {
        id: 2,
        title: "Backend API Development",
        client: "Sarah Johnson",
        deadline: "May 20, 2025",
        progress: 30,
        budget: "$800"
      },
      {
        id: 3,
        title: "Mobile App UI Design",
        client: "Michael Brown",
        deadline: "May 25, 2025",
        progress: 10,
        budget: "$600"
      }
    ],
    
    // Upcoming deadlines
    deadlines: [
      {
        id: 1,
        title: "Frontend Developer Needed",
        deadline: "May 15, 2025",
        daysLeft: 8
      },
      {
        id: 2,
        title: "Backend API Development",
        deadline: "May 20, 2025",
        daysLeft: 13
      },
      {
        id: 3,
        title: "Mobile App UI Design",
        deadline: "May 25, 2025",
        daysLeft: 18
      }
    ],
    
    // Monthly earnings data for chart
    earnings: [
      { month: 'Jan', amount: 850 },
      { month: 'Feb', amount: 1200 },
      { month: 'Mar', amount: 750 },
      { month: 'Apr', amount: 1450 },
      { month: 'May', amount: 600 },
    ]
  };

  // Activity icon mapping
  const getActivityIcon = (type) => {
    switch (type) {
      case 'project_awarded':
        return <FaBriefcase className="text-green-500" />;
      case 'message':
        return <FaRegEnvelope className="text-blue-500" />;
      case 'payment':
        return <FaChartLine className="text-purple-500" />;
      case 'review':
        return <FaStar className="text-yellow-500" />;
      case 'proposal':
        return <FaRegCheckCircle className="text-orange-500" />;
      default:
        return <FaRegBell className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Page Header */}
      <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Welcome back, John! Here's what's happening with your projects today.
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
              activeTab === 'projects' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            My Projects
          </button>
          <button 
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'proposals' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('proposals')}
          >
            My Proposals
          </button>
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
          <button 
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'profile' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
        </div>
        
        {/* Main Dashboard Content - Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Active Projects Card */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Active Projects</p>
                    <h3 className="text-2xl font-bold mt-1">{dashboardData.activeProjects}</h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                    <FaBriefcase className="text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <FaLongArrowAltUp className="text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+2</span>
                  <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>from last month</span>
                </div>
              </div>
              
              {/* Completed Projects Card */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Completed Projects</p>
                    <h3 className="text-2xl font-bold mt-1">{dashboardData.completedProjects}</h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                    <FaRegCheckCircle className="text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <FaLongArrowAltUp className="text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">+5</span>
                  <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>from last month</span>
                </div>
              </div>
              
              {/* Total Earnings Card */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Earnings</p>
                    <h3 className="text-2xl font-bold mt-1">${dashboardData.totalEarnings}</h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
                    <FaChartLine className="text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <FaLongArrowAltDown className="text-red-500 mr-1" />
                  <span className="text-red-500 font-medium">-$250</span>
                  <span className={`ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>from last month</span>
                </div>
              </div>
              
              {/* Rating Card */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Average Rating</p>
                    <h3 className="text-2xl font-bold mt-1">{dashboardData.averageRating}</h3>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
                    <FaStar className="text-yellow-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>from {dashboardData.reviewCount} reviews</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Active Projects */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 lg:col-span-2`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Active Projects</h3>
                  <Link to="/my-projects" className="text-blue-600 text-sm hover:underline">View All</Link>
                </div>
                
                <div className="space-y-6">
                  {dashboardData.projects.map(project => (
                    <div key={project.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{project.title}</h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Client: {project.client}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{project.budget}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Deadline: {project.deadline}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Recent Activity</h3>
                  <button className="text-blue-600 text-sm hover:underline">Mark All Read</button>
                </div>
                
                <div className="space-y-4">
                  {dashboardData.activities.map(activity => (
                    <div 
                      key={activity.id} 
                      className={`flex items-start p-3 rounded-lg ${
                        activity.isNew 
                          ? darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50' 
                          : darkMode ? 'bg-gray-700' : 'bg-gray-50'
                      }`}
                    >
                      <div className={`mr-3 mt-1 ${activity.isNew ? 'text-blue-600' : ''}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className={`${activity.isNew ? 'font-medium' : ''}`}>{activity.title}</p>
                        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</p>
                      </div>
                      <div>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <FaEllipsisH size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Completeness */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Profile Completeness</h3>
                  <Link to="/dashboard?tab=profile" className="text-blue-600 text-sm hover:underline">Edit Profile</Link>
                </div>
                
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={darkMode ? "#374151" : "#E5E7EB"}
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeDasharray={`${dashboardData.profileCompleteness}, 100`}
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <span className="text-2xl font-bold">{dashboardData.profileCompleteness}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <FaRegCheckCircle className="text-green-500 mr-2" />
                    <span>Basic Info</span>
                  </div>
                  <div className="flex items-center">
                    <FaRegCheckCircle className="text-green-500 mr-2" />
                    <span>Skills & Expertise</span>
                  </div>
                  <div className="flex items-center">
                    <FaRegCheckCircle className="text-green-500 mr-2" />
                    <span>Education</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FaRegCheckCircle className="mr-2" />
                    <span>Portfolio (Missing)</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FaRegCheckCircle className="mr-2" />
                    <span>Payment Methods (Missing)</span>
                  </div>
                </div>
              </div>
              
              {/* Upcoming Deadlines */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Upcoming Deadlines</h3>
                  <Link to="/tasklist" className="text-blue-600 text-sm hover:underline">View All</Link>
                </div>
                
                <div className="space-y-4">
                  {dashboardData.deadlines.map(deadline => (
                    <div 
                      key={deadline.id} 
                      className={`p-4 rounded-lg ${
                        deadline.daysLeft <= 10 
                          ? darkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-50' 
                          : darkMode ? 'bg-gray-700' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium">{deadline.title}</h4>
                        <span className={`text-sm font-medium ${
                          deadline.daysLeft <= 5 
                            ? 'text-red-600' 
                            : deadline.daysLeft <= 10 
                              ? 'text-yellow-600' 
                              : 'text-green-600'
                        }`}>
                          {deadline.daysLeft} days left
                        </span>
                      </div>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Due: {deadline.deadline}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <Link 
                    to="/browse" 
                    className={`p-4 rounded-lg text-center flex flex-col items-center justify-center ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <FaSearch className="text-blue-600 text-2xl mb-2" />
                    <span className="text-sm">Find Projects</span>
                  </Link>
                  
                  <Link 
                    to="/my-projects" 
                    className={`p-4 rounded-lg text-center flex flex-col items-center justify-center ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <FaBriefcase className="text-purple-600 text-2xl mb-2" />
                    <span className="text-sm">My Projects</span>
                  </Link>
                  
                  <Link 
                    to="/inbox" 
                    className={`p-4 rounded-lg text-center flex flex-col items-center justify-center ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <FaRegEnvelope className="text-green-600 text-2xl mb-2" />
                    <span className="text-sm">Messages</span>
                  </Link>
                  
                  <Link 
                    to="/dashboard?tab=profile" 
                    className={`p-4 rounded-lg text-center flex flex-col items-center justify-center ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <FaEdit className="text-orange-600 text-2xl mb-2" />
                    <span className="text-sm">Edit Profile</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
  )
}
export default DashboardPage
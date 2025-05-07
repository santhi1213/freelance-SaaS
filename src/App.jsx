import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import all page components
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import BrowsePage from './pages/BrowsePage';
import DashboardPage from './pages/DashBoard';
import TasklistPage from './pages/TaskList';
import MyProjectsPage from './pages/MyProjects';
import InboxPage from './pages/Inbox';
import BookmarksPage from './pages/BookMarksPage';
import ProjectDetailsPage from './pages/ProjectDetails';
import ProfilePage from './pages/UserProfile';
import PostProjectModal from './Modals/PostProject';

// Main App component with routing
const App = () => {
  // State for dark mode
  const [darkMode, setDarkMode] = useState(false);
  // State for post project modal
  const [showPostProjectModal, setShowPostProjectModal] = useState(false);
  
  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  
  // Handle project post
  const handleProjectPost = (projectData) => {
    console.log('New project data:', projectData);
    // Here you would typically send the data to your API
    setShowPostProjectModal(false);
  };

  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-gray-50 text-gray-800 min-h-screen'}>
      <BrowserRouter>
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          onPostProjectClick={() => setShowPostProjectModal(true)}
        />
        
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage darkMode={darkMode} />} />
          
          {/* Browse Projects */}
          <Route path="/browse" element={<BrowsePage darkMode={darkMode} />} />
          
          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardPage darkMode={darkMode} />} />
          
          {/* Task List */}
          <Route path="/tasklist" element={<TasklistPage darkMode={darkMode} />} />
          
          {/* My Projects */}
          <Route path="/my-projects" element={<MyProjectsPage darkMode={darkMode} />} />
          
          {/* Inbox / Messages */}
          <Route path="/inbox" element={<InboxPage darkMode={darkMode} />} />
          
          {/* Bookmarks */}
          <Route path="/bookmarks" element={<BookmarksPage darkMode={darkMode} />} />
          
          {/* Project Details Page */}
          <Route path="/project/:projectId" element={<ProjectDetailsPage darkMode={darkMode} />} />
          
          {/* Profile Page */}
          <Route path="/profile" element={<ProfilePage darkMode={darkMode} />} />
          
          {/* Redirect to home for any unmatched routes */}
          <Route path="*" element={<HomePage darkMode={darkMode} />} />
        </Routes>
        
        {/* Post Project Modal */}
        {showPostProjectModal && (
          <PostProjectModal 
            onClose={() => setShowPostProjectModal(false)}
            darkMode={darkMode}
            onProjectPost={handleProjectPost}
          />
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
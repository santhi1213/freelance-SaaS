import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from './components/AuthContext'; // adjust the path as needed

// Import all page components
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import BrowsePage from './pages/BrowsePage';
import DashboardPage from './pages/DashBoard';
import TasklistPage from './pages/TaskList';
import MyProjectsPage from './pages/MyProjects';
import InboxPage from './pages/Inbox';
import UploadedProjects from './pages/UploadedProjects';
import BookmarksPage from './pages/BookMarksPage';
import ProjectDetailsPage from './pages/ProjectDetails';
import ProfilePage from './pages/UserProfile';
import PostProjectModal from './Modals/PostProject';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showPostProjectModal, setShowPostProjectModal] = useState(false);
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // On mount, check localStorage and set login state
  useEffect(() => {
    const isLogged = localStorage.getItem('isLoggedIn');
    if (isLogged === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const handleProjectPost = (projectData) => {
    console.log('New project data:', projectData);
    setShowPostProjectModal(false);
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-gray-50 text-gray-800 min-h-screen'}>
      <BrowserRouter>
        {/* Show Navbar only when authenticated */}
        {isLoggedIn && (
          <Navbar 
            logged={setIsLoggedIn}
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            onPostProjectClick={() => setShowPostProjectModal(true)}
          />
        )}

        <Routes>
          {/* Always available routes */}
          <Route path="/login" element={<Login logged={setIsLoggedIn} darkMode={darkMode} />} />
          <Route path="/register" element={<Register logged={setIsLoggedIn} darkMode={darkMode} />} />

          {/* Protected routes */}
          {isLoggedIn && (
            <>
              <Route path="/" element={<HomePage darkMode={darkMode} />} />
              <Route path="/browse" element={<BrowsePage darkMode={darkMode} />} />
              <Route path="/dashboard" element={<DashboardPage darkMode={darkMode} />} />
              <Route path="/tasklist" element={<TasklistPage darkMode={darkMode} />} />
              <Route path="/my-projects" element={<MyProjectsPage darkMode={darkMode} />} />
              <Route path="/inbox" element={<InboxPage darkMode={darkMode} />} />
              <Route path="/bookmarks" element={<BookmarksPage darkMode={darkMode} />} />
              <Route path="/project/:projectId" element={<ProjectDetailsPage darkMode={darkMode} />} />
              <Route path="/profile" element={<ProfilePage darkMode={darkMode} />} />
              <Route path="/uploaded-projects" element={<UploadedProjects darkMode={darkMode} />} />
              <Route path="*" element={<HomePage darkMode={darkMode} />} />
            </>
          )}
        </Routes>

        {/* Post Project Modal */}
        {isLoggedIn && showPostProjectModal && (
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

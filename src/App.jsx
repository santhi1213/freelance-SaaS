// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// // Import all page components
// import Navbar from './components/Navbar';
// import HomePage from './pages/Home';
// import BrowsePage from './pages/BrowsePage';
// import DashboardPage from './pages/DashBoard';
// import TasklistPage from './pages/TaskList';
// import MyProjectsPage from './pages/MyProjects';
// import InboxPage from './pages/Inbox';
// import BookmarksPage from './pages/BookMarksPage';
// import ProjectDetailsPage from './pages/ProjectDetails';
// import ProfilePage from './pages/UserProfile';
// import PostProjectModal from './Modals/PostProject';
// import Login from './pages/Login';
// import Register from './pages/Register';

// // Main App component with routing
// const App = () => {
//   // State for dark mode
//   const [darkMode, setDarkMode] = useState(false);
//   // State for post project modal
//   const [showPostProjectModal, setShowPostProjectModal] = useState(false);
  
//   // Toggle dark mode
//   const toggleDarkMode = () => setDarkMode(prev => !prev);
  
//   // Handle project post
//   const handleProjectPost = (projectData) => {
//     console.log('New project data:', projectData);
//     // Here you would typically send the data to your API
//     setShowPostProjectModal(false);
//   };

//   return (
//     <div className={darkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-gray-50 text-gray-800 min-h-screen'}>
//       <BrowserRouter>
//         <Navbar 
//           darkMode={darkMode} 
//           toggleDarkMode={toggleDarkMode} 
//           onPostProjectClick={() => setShowPostProjectModal(true)}
//         />
        
//         <Routes>
//           {/* Home Page */}
//           <Route path="/" element={<HomePage darkMode={darkMode} />} />
//           <Route path="/login" element={<Login darkMode={darkMode} />} />
//           <Route path="/register" element={<Register darkMode={darkMode} />} />
          
//           {/* Browse Projects */}
//           <Route path="/browse" element={<BrowsePage darkMode={darkMode} />} />
          
//           {/* Dashboard */}
//           <Route path="/dashboard" element={<DashboardPage darkMode={darkMode} />} />
          
//           {/* Task List */}
//           <Route path="/tasklist" element={<TasklistPage darkMode={darkMode} />} />
          
//           {/* My Projects */}
//           <Route path="/my-projects" element={<MyProjectsPage darkMode={darkMode} />} />
          
//           {/* Inbox / Messages */}
//           <Route path="/inbox" element={<InboxPage darkMode={darkMode} />} />
          
//           {/* Bookmarks */}
//           <Route path="/bookmarks" element={<BookmarksPage darkMode={darkMode} />} />
          
//           {/* Project Details Page */}
//           <Route path="/project/:projectId" element={<ProjectDetailsPage darkMode={darkMode} />} />
          
//           {/* Profile Page */}
//           <Route path="/profile" element={<ProfilePage darkMode={darkMode} />} />
          
//           {/* Redirect to home for any unmatched routes */}
//           <Route path="*" element={<HomePage darkMode={darkMode} />} />
//         </Routes>
        
//         {/* Post Project Modal */}
//         {showPostProjectModal && (
//           <PostProjectModal 
//             onClose={() => setShowPostProjectModal(false)}
//             darkMode={darkMode}
//             onProjectPost={handleProjectPost}
//           />
//         )}
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;

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

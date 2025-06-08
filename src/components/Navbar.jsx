import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SiFramework7 } from "react-icons/si";
import { FaSnowman, FaBell, FaComments, FaMoon, FaSun } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = ({ darkMode, toggleDarkMode, onPostProjectClick, logged }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Check if the current path matches the given path
  const isActive = (path) => {
    return location.pathname === path;
  };
  const handleLogout = async () => {
    try {
      // Call API
      await fetch('http://localhost:5000/api/auth/logout', {
        credentials: 'include',
      });
  
      // Clear auth tokens
      localStorage.removeItem('token');
      localStorage.removeItem('email')
  
      toast.success('Logged out successfully!');
  
      // Redirect to login
      logged(false)
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className={`shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      {/* Logo Section */}
      <Link to="/" className="flex items-center space-x-2 text-blue-600 text-2xl font-bold">
        <SiFramework7 className="text-3xl" />
        <span className="hidden sm:inline">Freelancer</span>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6 font-medium">
        <li>
          <Link 
            to="/browse" 
            className={`transition ${isActive('/browse') ? 'text-blue-600' : 'hover:text-blue-600'}`}
          >
            Browse
          </Link>
        </li>
        <li>
          <Link 
            to="/dashboard" 
            className={`transition ${isActive('/dashboard') ? 'text-blue-600' : 'hover:text-blue-600'}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/tasklist" 
            className={`transition ${isActive('/tasklist') ? 'text-blue-600' : 'hover:text-blue-600'}`}
          >
            Tasklist
          </Link>
        </li>
        <li>
          <Link 
            to="/my-projects" 
            className={`transition ${isActive('/my-projects') ? 'text-blue-600' : 'hover:text-blue-600'}`}
          >
            My Projects
          </Link>
        </li>
        <li>
          <Link 
            to="/inbox" 
            className={`transition ${isActive('/inbox') ? 'text-blue-600' : 'hover:text-blue-600'}`}
          >
            Inbox
          </Link>
        </li>
        <li>
          <Link 
            to="/bookmarks" 
            className={`transition ${isActive('/bookmarks') ? 'text-blue-600' : 'hover:text-blue-600'}`}
          >
            Bookmarks
          </Link>
        </li>
         <li>
          <Link 
            to="/uploaded-projects" 
            className={`transition ${isActive('/uploaded-projects') ? 'text-blue-600' : 'hover:text-blue-600'}`}
          >
            Uploaded Projects
          </Link>
        </li>
      </ul>

      {/* Icons & Button */}
      <div className="flex items-center space-x-4">
        <button className="relative hover:text-blue-500">
          <FaBell className="text-xl" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
        </button>

        <button className="relative hover:text-green-500">
          <FaComments className="text-xl" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full" />
        </button>

        <button onClick={toggleDarkMode} className="text-xl hover:text-yellow-500">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={onPostProjectClick}>
          Post a Project
        </button>
        <button onClick={handleLogout}>Logout</button>
        <Link to="/profile" className="text-blue-600 text-2xl cursor-pointer hover:scale-110 transition">
          <FaSnowman />
        </Link>

        {/* <div className="text-blue-600 text-2xl cursor-pointer hover:scale-110 transition">
          <FaSnowman />
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
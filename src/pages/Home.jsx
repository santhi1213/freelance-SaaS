import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave, FaCode, FaClock, FaFilter, FaStar, FaSearch, FaUserCircle, FaChevronDown, FaChevronUp, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import ProjectModal from '../Modals/ProjectBidModal';
import { allProjects } from '../components/AllProject';

const HomePage = ({ darkMode }) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [filters, setFilters] = useState({ 
    budget: '', 
    type: '', 
    duration: '', 
    skill: '',
    searchQuery: ''
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [bidDetails, setBidDetails] = useState({
    bidPrice: '',
    timeToComplete: '',
    backgroundDescription: ''
  });
  const [featuredProjects, setFeaturedProjects] = useState([]);

  // Toggle filter expansion
  const toggleFilterExpansion = () => setIsFilterExpanded(prev => !prev);

  // Handle project selection for bidding
  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  // Handle bid form changes
  const handleBidChange = (e) => {
    const { name, value } = e.target;
    setBidDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle bid submission
  const handleBidSubmit = () => {
    console.log('Bid submitted:', bidDetails, 'for project:', selectedProject);
    // Here you would typically send this data to your API
    setSelectedProject(null);
    setBidDetails({
      bidPrice: '',
      timeToComplete: '',
      backgroundDescription: ''
    });
    // Show success notification
    alert('Your bid has been successfully submitted!');
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      budget: '',
      type: '',
      duration: '',
      skill: '',
      searchQuery: ''
    });
  };

  // Get unique values for filters
  const getUniqueValues = (key) => {
    if (key === 'skills') {
      // Flatten the skills arrays and get unique values
      const allSkills = allProjects.flatMap(project => project.skills);
      return [...new Set(allSkills)];
    }
    return [...new Set(allProjects.map(project => project[key]))];
  };

  // Filter projects based on selected filters and search query
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = !filters.searchQuery || 
      project.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      project.skills.some(skill => skill.toLowerCase().includes(filters.searchQuery.toLowerCase()));
    
    return (
      matchesSearch &&
      (!filters.budget || project.budget === filters.budget) &&
      (!filters.type || project.type === filters.type) &&
      (!filters.duration || project.duration === filters.duration) &&
      (!filters.skill || project.skills.includes(filters.skill))
    );
  });

  // Set featured projects on initial load
  useEffect(() => {
    // Get 3 random high-value projects
    const highValueProjects = allProjects
      .filter(project => {
        const minBudget = parseInt(project.budget.split(' - ')[0].replace('$', ''));
        return minBudget >= 500;
      })
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    
    setFeaturedProjects(highValueProjects);
  }, []);

  return (
    <div>
      {/* Hero Section with animated gradient background */}
      <section className={`py-16 text-center relative overflow-hidden ${darkMode ? 'bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500'}`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 text-white">Find Your Next Freelance Project</h1>
          <p className="text-xl mb-8 text-white opacity-90 max-w-2xl mx-auto">
            Connect with clients, showcase your skills, and grow your freelance career with our platform.
          </p>
          <div className="max-w-xl mx-auto">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-full overflow-hidden shadow-lg p-1">
              <input
                type="text"
                placeholder="Search for projects..."
                className="w-full px-5 py-3 outline-none text-gray-800 dark:text-white dark:bg-gray-800"
                value={filters.searchQuery}
                onChange={handleSearchChange}
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} py-8 shadow-md`}>
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="px-8 py-4">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">2500+</p>
              <p className="text-sm uppercase font-semibold mt-1">Active Projects</p>
            </div>
            <div className="px-8 py-4">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">12,000+</p>
              <p className="text-sm uppercase font-semibold mt-1">Freelancers</p>
            </div>
            <div className="px-8 py-4">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">$2.5M+</p>
              <p className="text-sm uppercase font-semibold mt-1">Paid to Freelancers</p>
            </div>
            <div className="px-8 py-4">
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">98%</p>
              <p className="text-sm uppercase font-semibold mt-1">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-10 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Opportunities</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredProjects.map(project => (
            <div 
              key={`featured-${project.id}`} 
              className={`${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-blue-50 border-blue-100'} 
                p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border transform hover:-translate-y-1 cursor-pointer relative overflow-hidden`}
              onClick={() => handleProjectClick(project)}
            >
              <div className="absolute top-0 right-0 bg-blue-600 text-white py-1 px-3 text-xs font-bold rounded-bl-lg">
                Featured
              </div>
              
              <div className="flex items-start mb-4">
                <img 
                  src={project.client.profile} 
                  alt={project.client.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-300"
                />
                <div>
                  <h3 className="font-bold text-lg text-blue-700 dark:text-blue-400">{project.title}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{project.client.name}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="flex items-center text-yellow-500">
                      <FaStar className="mr-1" size={14} />{project.client.rating}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill, idx) => (
                  <span key={idx} className={`${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-1 rounded-full font-medium`}>
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className={`flex justify-between items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="flex items-center gap-1 font-bold">
                  <FaMoneyBillWave className="text-green-500" />
                  {project.budget}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-purple-500" />
                  {project.duration}
                </span>
              </div>
              
              <Link to={`/browse`} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                View Details <FaArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Section */}
      <section className={`container mx-auto px-4 mb-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-xl overflow-hidden`}>
        <div 
          className="py-4 px-6 flex justify-between items-center cursor-pointer border-b border-gray-200 dark:border-gray-700"
          onClick={toggleFilterExpansion}
        >
          <div className="flex items-center gap-2 text-xl font-semibold">
            <FaFilter className="text-blue-600 dark:text-blue-400" />
            <span>Filter Projects</span>
          </div>
          <div>
            {isFilterExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        
        {isFilterExpanded && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Budget Filter */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="budget">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={filters.budget}
                onChange={handleFilterChange}
                className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              >
                <option value="">All Budgets</option>
                {getUniqueValues('budget').map(budget => (
                  <option key={budget} value={budget}>{budget}</option>
                ))}
              </select>
            </div>
            
            {/* Project Type Filter */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="type">
                Project Type
              </label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              >
                <option value="">All Types</option>
                {getUniqueValues('type').map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="duration">
                Project Duration
              </label>
              <select
                id="duration"
                name="duration"
                value={filters.duration}
                onChange={handleFilterChange}
                className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              >
                <option value="">Any Duration</option>
                {getUniqueValues('duration').map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>
            
            {/* Skills Filter */}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="skill">
                Required Skills
              </label>
              <select
                id="skill"
                name="skill"
                value={filters.skill}
                onChange={handleFilterChange}
                className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              >
                <option value="">Any Skill</option>
                {getUniqueValues('skills').map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
            
            {/* Filter Actions */}
            <div className="md:col-span-4 flex justify-end gap-3 mt-4">
              <button 
                onClick={clearFilters}
                className={`py-2 px-4 rounded-lg border ${darkMode ? 'text-white border-gray-600 hover:bg-gray-700' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              >
                Clear All
              </button>
              <button className="py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Projects Grid */}
      <main className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold">{filteredProjects.length} Available Projects</h3>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Showing {filteredProjects.length} of {allProjects.length} projects
          </div>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.slice(0, 6).map(project => (
            <div 
              key={project.id} 
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300 
                border-l-4 border-blue-500 dark:border-blue-400 cursor-pointer transform hover:-translate-y-1`} 
              onClick={() => handleProjectClick(project)}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={project.client.profile} 
                  alt={project.client.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.client.name}</p>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(Math.floor(project.client.rating))].map((_, i) => (
                        <FaStar key={i} size={12} />
                      ))}
                    </div>
                    <span className="text-xs ml-1 text-gray-500 dark:text-gray-400">({project.client.rating})</span>
                  </div>
                </div>
              </div>
              
              <h4 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">{project.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className={`${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-1 rounded-full`}>
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-sm mt-auto">
                <span className="flex items-center gap-1 font-medium">
                  <FaMoneyBillWave className="text-green-500" />
                  {project.budget}
                </span>
                <span className="flex items-center gap-1">
                  <FaCode className="text-purple-500" />
                  {project.type}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock className="text-yellow-500" />
                  {project.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            to="/browse" 
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            View All Projects
          </Link>
        </div>
      </main>

      {/* Call to Action */}
      <section className={`py-16 ${darkMode ? 'bg-gradient-to-r from-blue-900 to-indigo-900' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} text-white text-center`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
            Join thousands of freelancers and clients on our platform. Post a project or start bidding today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/my-projects"
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Post a Project
            </Link>
            <Link 
              to="/dashboard"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Create Your Profile
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'} py-10`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">FreelanceHub</h4>
              <p className="text-sm opacity-75">
                Connecting talented freelancers with quality clients since 2020.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">For Freelancers</h4>
              <ul className="text-sm space-y-2 opacity-75">
                <li><Link to="/browse" className="hover:text-blue-500">Find Projects</Link></li>
                <li><Link to="/dashboard" className="hover:text-blue-500">Create Profile</Link></li>
                <li><Link to="/" className="hover:text-blue-500">Pricing</Link></li>
                <li><Link to="/" className="hover:text-blue-500">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">For Clients</h4>
              <ul className="text-sm space-y-2 opacity-75">
                <li><Link to="/my-projects" className="hover:text-blue-500">Post a Project</Link></li>
                <li><Link to="/browse" className="hover:text-blue-500">Find Talent</Link></li>
                <li><Link to="/" className="hover:text-blue-500">Enterprise Solutions</Link></li>
                <li><Link to="/" className="hover:text-blue-500">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="text-sm space-y-2 opacity-75">
                <li><Link to="/" className="hover:text-blue-500">Help Center</Link></li>
                <li><Link to="/" className="hover:text-blue-500">Blog</Link></li>
                <li><Link to="/" className="hover:text-blue-500">Community</Link></li>
                <li><Link to="/" className="hover:text-blue-500">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center text-sm opacity-75">
            <p>© 2025 FreelanceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Project Bid Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject}
          bidDetails={bidDetails}
          handleBidChange={handleBidChange}
          handleBidSubmit={handleBidSubmit}
          onClose={() => setSelectedProject(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default HomePage;
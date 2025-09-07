import React, { useState } from 'react';
import {
  FaTimes,
  FaMoneyBillWave,
  FaUser,
  FaClock,
  FaCode,
  FaStar,
  FaCheck
} from 'react-icons/fa';
import PopupMessage from '../components/PopupMessage';

const ProjectBidModal = ({ project, bidDetails, handleBidChange, onClose, darkMode }) => {
  console.log(project)
  // State for tracking submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const userId = localStorage.getItem('id')

  const submitBid = async () => {
    setIsSubmitting(true);

    const response = await handleBidSubmit(); // wait for response
    setIsSubmitting(false);

    if (response.success) {
      setSubmitSuccess(true);
      // Auto-close modal after short delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      if (response.error === "duplicate") {
        setPopup({ show: true, type: 'error', message: 'You have already placed a bid on this project.' })
      } else if (response.error === "network") {
        setPopup({ show: true, type: 'error', message: 'Network error. Please try again later.' })
      } else {
        setPopup({ show: true, type: 'error', message: 'Failed to submit bid. Please try again.' })
      }
    }
  };

  const handleBidSubmit = async () => {
    const bidData = {
      projectId: project.id,
      freelancerId: userId,
      price: bidDetails.bidPrice,
      estimatedTime: bidDetails.timeToComplete,
      description: bidDetails.backgroundDescription
    };

    try {
      const res = await fetch('https://freelance-backend-0tw4.onrender.com/api/projects/place_bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bidData)
      });

      const result = await res.json();

      if (res.ok) {
        console.log("Bid submitted:", result.bid);
        return { success: true };
      } else if (res.status === 409) {
        console.warn("Duplicate bid error:", result.message);
        return { success: false, error: "duplicate" };
      } else {
        console.error("Error:", result.message);
        return { success: false, error: "general" };
      }
    } catch (err) {
      console.error("Request failed:", err);
      return { success: false, error: "network" };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className={`w-full max-w-4xl ${darkMode
        ? 'bg-gray-800 bg-opacity-95 text-white'
        : 'bg-white bg-opacity-95 text-gray-800'
        } rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm`}>

        {submitSuccess ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Bid Submitted Successfully!</h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your bid has been submitted to the client. You'll be notified when they respond.
            </p>
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-800 to-indigo-900' : 'from-blue-500 to-indigo-600'} px-6 py-4 flex justify-between items-center`}>
              <h2 className="text-xl font-bold text-white">Submit a Proposal</h2>
              <button
                onClick={onClose}
                className="text-white hover:text-red-300 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Project Details Section */}
              <div className="md:w-2/5 p-6 border-r border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">{project.title}</h3>

                <div className="flex items-center mb-4">
                  <img
                    src={project.client.profile}
                    alt={project.client.name}
                    className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                  <div>
                    <p className="font-medium">{project.client.name}</p>
                    <div className="flex items-center text-yellow-400">
                      {[...Array(Math.floor(project.client.rating))].map((_, i) => (
                        <FaStar key={i} size={14} />
                      ))}
                      <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">({project.client.rating})</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaMoneyBillWave className="text-green-500 mr-2" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Budget:</span>
                    </div>
                    <span className="font-medium">{project.budget}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaClock className="text-yellow-500 mr-2" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Duration:</span>
                    </div>
                    <span className="font-medium">{project.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaCode className="text-purple-500 mr-2" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Type:</span>
                    </div>
                    <span className="font-medium">{project.type}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-medium mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, idx) => (
                      <span key={idx} className={`${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-1 rounded-full`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bid Form Section */}
              <div className="md:w-3/5 p-6">
                <h3 className="text-lg font-bold mb-4">Your Proposal</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="bidPrice">
                      Your Bid Amount (USD)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>$</span>
                      </div>
                      <input
                        type="number"
                        id="bidPrice"
                        name="bidPrice"
                        min="0"
                        placeholder="Enter your bid"
                        value={bidDetails.bidPrice}
                        onChange={handleBidChange}
                        className={`pl-7 block w-full rounded-md py-2 px-3 ${darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                          } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                    <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      The client's budget is {project.budget}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="timeToComplete">
                      Estimated Time to Complete
                    </label>
                    <input
                      type="text"
                      id="timeToComplete"
                      name="timeToComplete"
                      placeholder="e.g. 2 weeks, 10 days"
                      value={bidDetails.timeToComplete}
                      onChange={handleBidChange}
                      className={`block w-full rounded-md py-2 px-3 ${darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                        } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      The client expects the project to be completed in {project.duration}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="backgroundDescription">
                      Proposal Description
                    </label>
                    <textarea
                      id="backgroundDescription"
                      name="backgroundDescription"
                      rows={6}
                      placeholder="Describe why you're a good fit for this project, your relevant experience, and your approach to the project..."
                      value={bidDetails.backgroundDescription}
                      onChange={handleBidChange}
                      className={`block w-full rounded-md py-2 px-3 ${darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                        } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    ></textarea>
                    <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      A detailed proposal significantly increases your chances of getting hired
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h4 className="font-medium mb-2">Tips for a Great Proposal:</h4>
                    <ul className={`text-sm list-disc list-inside space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <li>Highlight your relevant experience and skills</li>
                      <li>Explain your approach to the project</li>
                      <li>Ask clarifying questions if needed</li>
                      <li>Be specific about your deliverables and timeline</li>
                      <li>Provide examples of similar work you've done</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-end space-x-3`}>
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
              >
                Cancel
              </button>
              <button
                onClick={submitBid}
                disabled={isSubmitting || !bidDetails.bidPrice || !bidDetails.timeToComplete || !bidDetails.backgroundDescription}
                className={`px-6 py-2 rounded-lg flex items-center ${isSubmitting || !bidDetails.bidPrice || !bidDetails.timeToComplete || !bidDetails.backgroundDescription
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  'Submit Proposal'
                )}
              </button>
            </div>
          </>
        )}
        {popup.show && (
          <PopupMessage
            type={popup.type}
            message={popup.message}
            onClose={() => setPopup({ show: false, type: '', message: '' })}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectBidModal;
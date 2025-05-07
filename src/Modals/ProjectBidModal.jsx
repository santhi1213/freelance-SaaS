// import React, { useState, useEffect } from 'react';
// import { 
//   FaMoneyBillWave, 
//   FaCode, 
//   FaClock, 
//   FaStar, 
//   FaPaperPlane, 
//   FaTimes, 
//   FaUserCircle,
//   FaCalendarAlt,
//   FaCheckCircle,
//   FaBriefcase,
//   FaListUl,
//   FaComments,
//   FaHandshake,
//   FaPaperclip,
//   FaSmile,
//   FaFileAlt
// } from 'react-icons/fa';

// const ProjectModal = ({ project, bidDetails, handleBidChange, handleBidSubmit, onClose, darkMode }) => {
//   const [chatMessages, setChatMessages] = useState([
//     { from: 'client', text: "I need a landing page in React and Tailwind. Can you do it?", time: "10:25 AM" },
//     { from: 'freelancer', text: "Yes, I have experience with that. I can deliver it within a week.", time: "10:27 AM" },
//   ]);
//   const [newMessage, setNewMessage] = useState('');
//   const [activeTab, setActiveTab] = useState('details');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [bidSuccess, setBidSuccess] = useState(false);

//   // Animation for chat scroll
//   useEffect(() => {
//     const chatContainer = document.getElementById('chat-container');
//     if (chatContainer) {
//       chatContainer.scrollTop = chatContainer.scrollHeight;
//     }
//   }, [chatMessages]);

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const now = new Date();
//       const hours = now.getHours();
//       const minutes = now.getMinutes();
//       const timeString = `${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
      
//       setChatMessages([...chatMessages, { from: 'freelancer', text: newMessage, time: timeString }]);
//       setNewMessage('');
      
//       // Simulate client response after a short delay
//       if (Math.random() > 0.5) {
//         setTimeout(() => {
//           const responses = [
//             "That sounds great! When can you start?",
//             "Could you share some of your previous work?",
//             "What's your experience with similar projects?",
//             "I'm comparing a few freelancers. What makes you the best fit?"
//           ];
//           const randomResponse = responses[Math.floor(Math.random() * responses.length)];
//           setChatMessages(prev => [...prev, { from: 'client', text: randomResponse, time: timeString }]);
//         }, 2000);
//       }
//     }
//   };

//   const handleFormSubmit = () => {
//     setIsSubmitting(true);
//     // Simulate form submission
//     setTimeout(() => {
//       handleBidSubmit();
//       setIsSubmitting(false);
//       setBidSuccess(true);
//       setTimeout(() => setBidSuccess(false), 4000);
//     }, 1500);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center p-4 overflow-auto backdrop-blur-sm">
//       <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'} rounded-xl shadow-2xl w-full max-w-6xl flex flex-col relative overflow-hidden`}>
//         {/* Modal Header with Accent Gradient */}
//         <div className={`${darkMode ? 'from-blue-800 to-indigo-900' : 'from-blue-500 to-indigo-600'} bg-gradient-to-r px-6 py-4 flex justify-between items-center`}>
//           <h2 className="text-xl font-bold text-white flex items-center">
//             <FaBriefcase className="mr-2" /> Project Details
//           </h2>
//           <button 
//             onClick={onClose} 
//             className="text-white hover:text-red-300 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10"
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>

//         {/* Tab Navigation */}
//         <div className="flex border-b border-gray-200 dark:border-gray-700">
//           <button 
//             className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 ${
//               activeTab === 'details' 
//                 ? `${darkMode ? 'border-blue-400 text-blue-400' : 'border-blue-600 text-blue-600'}` 
//                 : 'border-transparent hover:text-gray-600 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('details')}
//           >
//             <FaListUl className="mr-2" /> Project Details
//           </button>
//           <button 
//             className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 ${
//               activeTab === 'bid' 
//                 ? `${darkMode ? 'border-blue-400 text-blue-400' : 'border-blue-600 text-blue-600'}` 
//                 : 'border-transparent hover:text-gray-600 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('bid')}
//           >
//             <FaHandshake className="mr-2" /> Submit Bid
//           </button>
//           <button 
//             className={`flex items-center px-6 py-3 text-sm font-medium border-b-2 ${
//               activeTab === 'messages' 
//                 ? `${darkMode ? 'border-blue-400 text-blue-400' : 'border-blue-600 text-blue-600'}` 
//                 : 'border-transparent hover:text-gray-600 dark:hover:text-gray-300'
//             }`}
//             onClick={() => setActiveTab('messages')}
//           >
//             <FaComments className="mr-2" /> Messages
//           </button>
//         </div>

//         <div className="flex flex-col md:flex-row">
//           {/* Main Content Area */}
//           <div className="w-full p-6 space-y-6 overflow-y-auto max-h-[70vh]">
//             {/* Project Details Tab */}
//             {activeTab === 'details' && (
//               <div className="animate-fadeIn">
//                 <div className={`p-5 rounded-xl mb-6 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
//                   <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
//                   <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{project.description}</p>
                  
//                   {/* Client Info */}
//                   <div className="flex items-center gap-4 mb-6">
//                     <div className="relative">
//                       <img src={project.client.profile} alt="client" className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-700" />
//                       <div className={`absolute -bottom-1 -right-1 ${project.client.rating >= 4.5 ? 'bg-green-500' : 'bg-blue-500'} text-white text-xs rounded-full w-8 h-8 flex items-center justify-center font-bold`}>
//                         {project.client.rating}
//                       </div>
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-lg">{project.client.name}</h3>
//                       <div className="flex items-center text-yellow-400">
//                         {[...Array(Math.floor(project.client.rating))].map((_, i) => (
//                           <FaStar key={i} />
//                         ))}
//                         {project.client.rating % 1 !== 0 && <FaStar className="opacity-50" />}
//                       </div>
//                       <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Project Manager</p>
//                     </div>
//                   </div>
                  
//                   {/* Project Details Cards */}
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                     <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
//                       <h4 className="text-xs uppercase font-semibold opacity-70 mb-1">Budget</h4>
//                       <div className="flex items-center">
//                         <FaMoneyBillWave className="text-green-500 mr-2 text-lg" />
//                         <span className="text-xl font-bold">{project.budget}</span>
//                       </div>
//                     </div>
//                     <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
//                       <h4 className="text-xs uppercase font-semibold opacity-70 mb-1">Duration</h4>
//                       <div className="flex items-center">
//                         <FaCalendarAlt className="text-purple-500 mr-2 text-lg" />
//                         <span className="text-xl font-bold">{project.duration}</span>
//                       </div>
//                     </div>
//                     <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
//                       <h4 className="text-xs uppercase font-semibold opacity-70 mb-1">Type</h4>
//                       <div className="flex items-center">
//                         <FaCode className="text-blue-500 mr-2 text-lg" />
//                         <span className="text-xl font-bold">{project.type}</span>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Required Skills */}
//                   <div className="mb-6">
//                     <h4 className="text-sm font-semibold uppercase opacity-70 mb-3">Required Skills</h4>
//                     <div className="flex flex-wrap gap-2">
//                       {project.skills.map((skill, index) => (
//                         <span 
//                           key={index} 
//                           className={`px-3 py-1.5 rounded-full text-sm font-medium ${
//                             darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
//                           }`}
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
                  
//                   {/* Project Description */}
//                   <div className="mb-6">
//                     <h4 className="text-sm font-semibold uppercase opacity-70 mb-3">Detailed Description</h4>
//                     <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg`}>
//                       <p className="leading-relaxed">
//                         {project.description} This project requires attention to detail and adherence to 
//                         best practices. The successful freelancer will work closely with our team to ensure 
//                         the deliverables meet our requirements and quality standards.
//                       </p>
//                       <p className="leading-relaxed mt-4">
//                         You should have a portfolio demonstrating similar work and the ability to 
//                         communicate effectively throughout the project lifecycle.
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-center">
//                     <button 
//                       onClick={() => setActiveTab('bid')}
//                       className={`px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
//                         darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
//                       } text-white shadow-lg`}
//                     >
//                       Submit a Bid
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             {/* Bid Form Tab */}
//             {activeTab === 'bid' && (
//               <div className="animate-fadeIn">
//                 {bidSuccess ? (
//                   <div className={`p-8 text-center rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-green-50'}`}>
//                     <div className="w-20 h-20 mx-auto bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
//                       <FaCheckCircle size={40} />
//                     </div>
//                     <h3 className="text-2xl font-bold mb-2">Bid Submitted Successfully!</h3>
//                     <p className="text-gray-600 dark:text-gray-300 mb-4">
//                       Your bid has been sent to {project.client.name}. You'll be notified when they respond.
//                     </p>
//                     <button 
//                       onClick={onClose}
//                       className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 ) : (
//                   <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border border-gray-200 dark:border-gray-700`}>
//                     <h3 className="text-xl font-bold mb-6 flex items-center">
//                       <FaHandshake className="mr-2 text-blue-500" /> Submit Your Proposal
//                     </h3>
                    
//                     <div className="space-y-6">
//                       {/* Bid Amount */}
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Your Bid Amount</label>
//                         <div className="relative">
//                           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                             <span className="text-gray-500">$</span>
//                           </div>
//                           <input
//                             type="number"
//                             name="bidPrice"
//                             placeholder="Enter your bid price"
//                             value={bidDetails.bidPrice}
//                             onChange={handleBidChange}
//                             className={`w-full pl-8 pr-4 py-3 rounded-lg ${
//                               darkMode 
//                                 ? 'bg-gray-700 border-gray-600 focus:border-blue-500 text-white' 
//                                 : 'bg-gray-50 border-gray-200 focus:border-blue-500'
//                             } border focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
//                           />
//                           <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                             Project budget: {project.budget}
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Delivery Time */}
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Delivery Timeline</label>
//                         <div className="relative">
//                           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                             <FaCalendarAlt className="text-gray-500" />
//                           </div>
//                           <input
//                             type="text"
//                             name="timeToComplete"
//                             placeholder="e.g., 5 days, 2 weeks"
//                             value={bidDetails.timeToComplete}
//                             onChange={handleBidChange}
//                             className={`w-full pl-10 pr-4 py-3 rounded-lg ${
//                               darkMode 
//                                 ? 'bg-gray-700 border-gray-600 focus:border-blue-500 text-white' 
//                                 : 'bg-gray-50 border-gray-200 focus:border-blue-500'
//                             } border focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
//                           />
//                           <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                             Client's expectation: {project.duration}
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Cover Letter */}
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Cover Letter</label>
//                         <textarea
//                           name="backgroundDescription"
//                           placeholder="Introduce yourself, highlight relevant experience, and explain why you're the best fit for this project..."
//                           value={bidDetails.backgroundDescription}
//                           onChange={handleBidChange}
//                           className={`w-full p-4 rounded-lg ${
//                             darkMode 
//                               ? 'bg-gray-700 border-gray-600 focus:border-blue-500 text-white' 
//                               : 'bg-gray-50 border-gray-200 focus:border-blue-500'
//                           } border focus:ring-2 focus:ring-blue-200 outline-none transition-all min-h-[150px]`}
//                           rows={6}
//                         />
//                         <div className="flex justify-between items-center mt-1">
//                           <div className="text-xs text-gray-500 dark:text-gray-400">
//                             Minimum 100 characters
//                           </div>
//                           <div className="text-xs font-medium">
//                             {bidDetails.backgroundDescription.length} / 1000
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Attachments (simulated) */}
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Portfolio Samples (Optional)</label>
//                         <div className={`border border-dashed rounded-lg p-4 text-center ${
//                           darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
//                         }`}>
//                           <FaPaperclip className="mx-auto mb-2 text-gray-400" size={24} />
//                           <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
//                             Drag & drop files here or click to browse
//                           </p>
//                           <button className={`text-xs px-3 py-1 rounded ${
//                             darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
//                           }`}>
//                             Select Files
//                           </button>
//                         </div>
//                       </div>
                      
//                       {/* Submit Button */}
//                       <button
//                         onClick={handleFormSubmit}
//                         disabled={isSubmitting}
//                         className={`w-full py-3 rounded-lg font-medium transition-all ${
//                           isSubmitting 
//                             ? 'bg-gray-400 cursor-not-allowed' 
//                             : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-[1.02]'
//                         } text-white shadow-lg flex items-center justify-center space-x-2`}
//                       >
//                         {isSubmitting ? (
//                           <>
//                             <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             <span>Submitting...</span>
//                           </>
//                         ) : (
//                           <>
//                             <FaHandshake />
//                             <span>Submit Proposal</span>
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
            
//             {/* Messages Tab */}
//             {activeTab === 'messages' && (
//               <div className="animate-fadeIn h-[60vh] flex flex-col">
//                 <div className="mb-4 flex items-center">
//                   <img src={project.client.profile} alt="client" className="w-10 h-10 rounded-full mr-3" />
//                   <div>
//                     <h3 className="font-semibold">{project.client.name}</h3>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">Project Client • Online</p>
//                   </div>
//                 </div>
                
//                 {/* Chat Messages */}
//                 <div 
//                   id="chat-container"
//                   className={`flex-1 overflow-y-auto p-4 mb-4 rounded-lg ${
//                     darkMode ? 'bg-gray-800' : 'bg-gray-100'
//                   }`}
//                 >
//                   <div className="space-y-4">
//                     {chatMessages.map((msg, index) => (
//                       <div key={index} className={`flex ${msg.from === 'freelancer' ? 'justify-end' : 'justify-start'}`}>
//                         <div className={`max-w-[80%] ${msg.from === 'freelancer' ? 'order-1' : 'order-2'}`}>
//                           <div 
//                             className={`px-4 py-3 rounded-2xl ${
//                               msg.from === 'freelancer'
//                                 ? 'bg-blue-600 text-white rounded-tr-none'
//                                 : darkMode ? 'bg-gray-700 text-white rounded-tl-none' : 'bg-white text-gray-800 rounded-tl-none shadow'
//                             }`}
//                           >
//                             {msg.text}
//                           </div>
//                           <div className={`text-xs mt-1 ${msg.from === 'freelancer' ? 'text-right' : ''} text-gray-500 dark:text-gray-400`}>
//                             {msg.time}
//                           </div>
//                         </div>
//                         {msg.from !== 'freelancer' && (
//                           <img src={project.client.profile} alt="client" className="w-8 h-8 rounded-full order-1 mr-2" />
//                         )}
//                         {msg.from === 'freelancer' && (
//                           <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white order-2 ml-2">
//                             <FaUserCircle />
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 {/* Message Input */}
//                 <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border border-gray-200 dark:border-gray-700`}>
//                   <div className="flex gap-2">
//                     <div className="flex-1 relative">
//                       <textarea
//                         rows={1}
//                         placeholder="Type a message..."
//                         className={`w-full py-3 px-4 pr-12 rounded-lg ${
//                           darkMode 
//                             ? 'bg-gray-700 text-white border-gray-600' 
//                             : 'bg-gray-50 text-gray-800 border-gray-200'
//                         } border resize-none overflow-hidden focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none`}
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         onKeyDown={handleKeyDown}
//                       />
//                       <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
//                         <FaSmile />
//                       </button>
//                     </div>
//                     <button 
//                       onClick={handleSendMessage} 
//                       className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg shadow transition-colors"
//                     >
//                       <FaPaperPlane />
//                     </button>
//                   </div>
//                   <div className="flex mt-2 text-xs text-gray-500">
//                     <button className="mr-4 flex items-center hover:text-gray-700 dark:hover:text-gray-300">
//                       <FaPaperclip className="mr-1" /> Attach
//                     </button>
//                     <button className="flex items-center hover:text-gray-700 dark:hover:text-gray-300">
//                       <FaFileAlt className="mr-1" /> Send Proposal
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className={`px-6 py-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-center text-sm text-gray-500 dark:text-gray-400`}>
//           {activeTab === 'details' && "Review project details carefully before submitting your bid"}
//           {activeTab === 'bid' && "Make your proposal stand out by addressing the client's specific needs"}
//           {activeTab === 'messages' && "Be professional and responsive in your communication"}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Add these animations to your CSS
// const styleTag = document.createElement('style');
// styleTag.innerHTML = `
//   @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(10px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
//   .animate-fadeIn {
//     animation: fadeIn 0.3s ease-out forwards;
//   }
// `;
// document.head.appendChild(styleTag);

// export default ProjectModal;



// import React from 'react';
// import { 
//   FaTimes, 
//   FaMoneyBillWave, 
//   FaUser, 
//   FaClock, 
//   FaCode, 
//   FaStar, 
//   FaCheck 
// } from 'react-icons/fa';

// const ProjectBidModal = ({ project, bidDetails, handleBidChange, handleBidSubmit, onClose, darkMode }) => {
//   // State for tracking submission status
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   // Enhanced submit handler with loading and success states
//   const submitBid = () => {
//     setIsSubmitting(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       handleBidSubmit();
//       setIsSubmitting(false);
//       setSubmitSuccess(true);
      
//       // Close modal after showing success message
//       setTimeout(() => {
//         onClose();
//       }, 2000);
//     }, 1500);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//       <div className={`w-full max-w-4xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl shadow-2xl overflow-hidden`}>
//         {submitSuccess ? (
//           <div className="p-8 text-center">
//             <div className="w-20 h-20 bg-green-100 dark:bg-green-900 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
//               <FaCheck size={40} />
//             </div>
//             <h3 className="text-2xl font-bold mb-2">Bid Submitted Successfully!</h3>
//             <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//               Your bid has been submitted to the client. You'll be notified when they respond.
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Modal Header */}
//             <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-800 to-indigo-900' : 'from-blue-500 to-indigo-600'} px-6 py-4 flex justify-between items-center`}>
//               <h2 className="text-xl font-bold text-white">Submit a Proposal</h2>
//               <button 
//                 onClick={onClose} 
//                 className="text-white hover:text-red-300 transition-colors"
//               >
//                 <FaTimes size={24} />
//               </button>
//             </div>
            
//             <div className="flex flex-col md:flex-row">
//               {/* Project Details Section */}
//               <div className="md:w-2/5 p-6 border-r border-gray-200 dark:border-gray-700">
//                 <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">{project.title}</h3>
                
//                 <div className="flex items-center mb-4">
//                   <img 
//                     src={project.client.profile} 
//                     alt={project.client.name}
//                     className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-gray-200 dark:border-gray-700"
//                   />
//                   <div>
//                     <p className="font-medium">{project.client.name}</p>
//                     <div className="flex items-center text-yellow-400">
//                       {[...Array(Math.floor(project.client.rating))].map((_, i) => (
//                         <FaStar key={i} size={14} />
//                       ))}
//                       <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">({project.client.rating})</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mb-4">
//                   <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{project.description}</p>
//                 </div>
                
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <FaMoneyBillWave className="text-green-500 mr-2" />
//                       <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Budget:</span>
//                     </div>
//                     <span className="font-medium">{project.budget}</span>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <FaClock className="text-yellow-500 mr-2" />
//                       <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Duration:</span>
//                     </div>
//                     <span className="font-medium">{project.duration}</span>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <FaCode className="text-purple-500 mr-2" />
//                       <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Type:</span>
//                     </div>
//                     <span className="font-medium">{project.type}</span>
//                   </div>
//                 </div>
                
//                 <div className="mt-4">
//                   <p className="font-medium mb-2">Required Skills:</p>
//                   <div className="flex flex-wrap gap-2">
//                     {project.skills.map((skill, idx) => (
//                       <span key={idx} className={`${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-1 rounded-full`}>
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
              
//               {/* Bid Form Section */}
//               <div className="md:w-3/5 p-6">
//                 <h3 className="text-lg font-bold mb-4">Your Proposal</h3>
                
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2" htmlFor="bidPrice">
//                       Your Bid Amount (USD)
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>$</span>
//                       </div>
//                       <input
//                         type="number"
//                         id="bidPrice"
//                         name="bidPrice"
//                         min="0"
//                         placeholder="Enter your bid"
//                         value={bidDetails.bidPrice}
//                         onChange={handleBidChange}
//                         className={`pl-7 block w-full rounded-md py-2 px-3 ${
//                           darkMode 
//                             ? 'bg-gray-700 border-gray-600 text-white'
//                             : 'bg-white border-gray-300 text-gray-900'
//                         } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                       />
//                     </div>
//                     <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                       The client's budget is {project.budget}
//                     </p>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-2" htmlFor="timeToComplete">
//                       Estimated Time to Complete
//                     </label>
//                     <input
//                       type="text"
//                       id="timeToComplete"
//                       name="timeToComplete"
//                       placeholder="e.g. 2 weeks, 10 days"
//                       value={bidDetails.timeToComplete}
//                       onChange={handleBidChange}
//                       className={`block w-full rounded-md py-2 px-3 ${
//                         darkMode 
//                           ? 'bg-gray-700 border-gray-600 text-white'
//                           : 'bg-white border-gray-300 text-gray-900'
//                       } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                     />
//                     <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                       The client expects the project to be completed in {project.duration}
//                     </p>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-2" htmlFor="backgroundDescription">
//                       Proposal Description
//                     </label>
//                     <textarea
//                       id="backgroundDescription"
//                       name="backgroundDescription"
//                       rows={6}
//                       placeholder="Describe why you're a good fit for this project, your relevant experience, and your approach to the project..."
//                       value={bidDetails.backgroundDescription}
//                       onChange={handleBidChange}
//                       className={`block w-full rounded-md py-2 px-3 ${
//                         darkMode 
//                           ? 'bg-gray-700 border-gray-600 text-white'
//                           : 'bg-white border-gray-300 text-gray-900'
//                       } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                     ></textarea>
//                     <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                       A detailed proposal significantly increases your chances of getting hired
//                     </p>
//                   </div>
                  
//                   <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                     <h4 className="font-medium mb-2">Tips for a Great Proposal:</h4>
//                     <ul className={`text-sm list-disc list-inside space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                       <li>Highlight your relevant experience and skills</li>
//                       <li>Explain your approach to the project</li>
//                       <li>Ask clarifying questions if needed</li>
//                       <li>Be specific about your deliverables and timeline</li>
//                       <li>Provide examples of similar work you've done</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Modal Footer */}
//             <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-end space-x-3`}>
//               <button 
//                 onClick={onClose}
//                 className={`px-4 py-2 rounded-lg ${
//                   darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
//                 }`}
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={submitBid}
//                 disabled={isSubmitting || !bidDetails.bidPrice || !bidDetails.timeToComplete || !bidDetails.backgroundDescription}
//                 className={`px-6 py-2 rounded-lg flex items-center ${
//                   isSubmitting || !bidDetails.bidPrice || !bidDetails.timeToComplete || !bidDetails.backgroundDescription
//                     ? 'bg-gray-400 cursor-not-allowed'
//                     : 'bg-blue-600 hover:bg-blue-700 text-white'
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Submitting...</span>
//                   </>
//                 ) : (
//                   'Submit Proposal'
//                 )}
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectBidModal;

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

const ProjectBidModal = ({ project, bidDetails, handleBidChange, handleBidSubmit, onClose, darkMode }) => {
  // State for tracking submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Enhanced submit handler with loading and success states
  const submitBid = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      handleBidSubmit();
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Close modal after showing success message
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className={`w-full max-w-4xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl shadow-2xl overflow-hidden`}>
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
                        className={`pl-7 block w-full rounded-md py-2 px-3 ${
                          darkMode 
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
                      className={`block w-full rounded-md py-2 px-3 ${
                        darkMode 
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
                      className={`block w-full rounded-md py-2 px-3 ${
                        darkMode 
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
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button 
                onClick={submitBid}
                disabled={isSubmitting || !bidDetails.bidPrice || !bidDetails.timeToComplete || !bidDetails.backgroundDescription}
                className={`px-6 py-2 rounded-lg flex items-center ${
                  isSubmitting || !bidDetails.bidPrice || !bidDetails.timeToComplete || !bidDetails.backgroundDescription
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
      </div>
    </div>
  );
};

export default ProjectBidModal;
// import React, { useState } from 'react';
// import { 
//   FaTimes, 
//   FaMoneyBillWave, 
//   FaCalendarAlt, 
//   FaTags, 
//   FaClipboardList, 
//   FaPlus, 
//   FaCheck,
//   FaLightbulb,
//   FaInfoCircle,
//   FaUpload,
//   FaChevronRight
// } from 'react-icons/fa';

// const PostProjectModal = ({ onClose, darkMode, onProjectPost }) => {
//   const initialFormState = {
//     title: '',
//     description: '',
//     budget: { min: '', max: '' },
//     duration: '',
//     type: '',
//     skills: [],
//     additionalDetails: '',
//     attachments: []
//   };

//   const [formData, setFormData] = useState(initialFormState);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [customSkill, setCustomSkill] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState(false);

//   // Pre-defined project types and skills
//   const projectTypes = [
//     'Development', 'Design', 'Marketing', 'Content', 'Data Science', 
//     'Audio', 'Video', 'Translation', 'E-commerce', 'DevOps', 'Security'
//   ];

//   const popularSkills = [
//     'React', 'JavaScript', 'Python', 'UI/UX Design', 'Content Writing', 
//     'SEO', 'WordPress', 'Graphic Design', 'Data Analysis', 'Node.js',
//     'Figma', 'MongoDB', 'Mobile Development', 'Social Media', 'Video Editing'
//   ];

//   const durationOptions = [
//     'Less than 1 week', '1-2 weeks', '2-4 weeks', '1-3 months', '3-6 months', '6+ months'
//   ];

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData({
//         ...formData,
//         [parent]: {
//           ...formData[parent],
//           [child]: value
//         }
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }
//   };

//   // Handle skill selection
//   const handleSkillToggle = (skill) => {
//     if (formData.skills.includes(skill)) {
//       setFormData({
//         ...formData,
//         skills: formData.skills.filter(s => s !== skill)
//       });
//     } else {
//       setFormData({
//         ...formData,
//         skills: [...formData.skills, skill]
//       });
//     }
//   };

//   // Add custom skill
//   const handleAddCustomSkill = () => {
//     if (customSkill && !formData.skills.includes(customSkill)) {
//       setFormData({
//         ...formData,
//         skills: [...formData.skills, customSkill]
//       });
//       setCustomSkill('');
//     }
//   };

//   // Handle file uploads
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData({
//       ...formData,
//       attachments: [...formData.attachments, ...files]
//     });
//   };

//   // Remove an attachment
//   const removeAttachment = (index) => {
//     const updatedAttachments = [...formData.attachments];
//     updatedAttachments.splice(index, 1);
//     setFormData({
//       ...formData,
//       attachments: updatedAttachments
//     });
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     setIsSubmitting(true);
    
//     // Simulate API call
//     setTimeout(() => {
//       // Call the parent component's callback with the form data
//       if (onProjectPost) {
//         onProjectPost(formData);
//       }
//       setIsSubmitting(false);
//       setSuccessMessage(true);
      
//       // Reset form after a delay
//       setTimeout(() => {
//         setFormData(initialFormState);
//         setCurrentStep(1);
//         setSuccessMessage(false);
//         onClose();
//       }, 3000);
//     }, 1500);
//   };

//   // Next step in multi-step form
//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   // Previous step in multi-step form
//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   // Check if current step is valid
//   const isStepValid = () => {
//     switch (currentStep) {
//       case 1:
//         return formData.title.trim() !== '' && formData.description.trim() !== '';
//       case 2:
//         return formData.budget.min !== '' && formData.budget.max !== '' && 
//                formData.type !== '' && formData.duration !== '';
//       case 3:
//         return formData.skills.length > 0;
//       default:
//         return true;
//     }
//   };

//   // Progress percentage
//   const progressPercentage = () => {
//     return ((currentStep - 1) / 3) * 100;
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4 overflow-y-auto">
//       <div className={`w-full max-w-3xl ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'} rounded-xl shadow-2xl overflow-hidden`}>
//         {/* Modal Header */}
//         <div className={`${darkMode ? 'bg-gradient-to-r from-blue-800 to-indigo-900' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} px-6 py-4 flex justify-between items-center`}>
//           <h2 className="text-xl font-bold text-white">Post a New Project</h2>
//           <button 
//             onClick={onClose} 
//             className="text-white hover:text-red-300 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10"
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>
        
//         {/* Progress Bar */}
//         <div className="w-full h-2 bg-gray-200 dark:bg-gray-700">
//           <div 
//             className="h-full bg-blue-600 transition-all duration-300" 
//             style={{ width: `${progressPercentage()}%` }}
//           ></div>
//         </div>
        
//         {/* Step Indicator */}
//         <div className="flex justify-between px-8 py-3 border-b border-gray-200 dark:border-gray-700">
//           <div className="flex items-center space-x-4">
//             <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
//               currentStep >= 1 
//                 ? 'bg-blue-600 text-white' 
//                 : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
//             }`}>
//               1
//             </div>
//             <span className={`text-sm font-medium ${currentStep === 1 ? 'text-blue-600 dark:text-blue-400' : ''}`}>
//               Basic Details
//             </span>
//           </div>
          
//           <div className={`flex items-center ${currentStep >= 2 ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400'}`}>
//             <FaChevronRight size={14} className="mx-2" />
//             <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
//               currentStep >= 2 
//                 ? 'bg-blue-600 text-white' 
//                 : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
//             }`}>
//               2
//             </div>
//             <span className={`text-sm font-medium ml-4 ${currentStep === 2 ? 'text-blue-600 dark:text-blue-400' : ''}`}>
//               Project Details
//             </span>
//           </div>
          
//           <div className={`flex items-center ${currentStep >= 3 ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400'}`}>
//             <FaChevronRight size={14} className="mx-2" />
//             <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
//               currentStep >= 3 
//                 ? 'bg-blue-600 text-white' 
//                 : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
//             }`}>
//               3
//             </div>
//             <span className={`text-sm font-medium ml-4 ${currentStep === 3 ? 'text-blue-600 dark:text-blue-400' : ''}`}>
//               Skills & Finish
//             </span>
//           </div>
//         </div>
        
//         {/* Modal Content */}
//         <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
//           {successMessage ? (
//             <div className="text-center py-10">
//               <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
//                 <FaCheck size={40} />
//               </div>
//               <h3 className="text-2xl font-bold mb-2">Project Posted Successfully!</h3>
//               <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
//                 Your project has been posted and is now visible to freelancers.
//               </p>
//               <p className="text-sm text-blue-600 dark:text-blue-400">
//                 Redirecting you to the projects page...
//               </p>
//             </div>
//           ) : (
//             <>
//               {/* Step 1: Basic Info */}
//               {currentStep === 1 && (
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Project Title</label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleChange}
//                       placeholder="E.g., Website Redesign for E-commerce Store"
//                       className={`w-full px-4 py-3 rounded-lg border ${
//                         darkMode 
//                           ? 'bg-gray-800 border-gray-700 focus:border-blue-500 text-white' 
//                           : 'bg-gray-50 border-gray-200 focus:border-blue-500'
//                       } focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
//                     />
//                     <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
//                       A clear, specific title will attract more qualified freelancers.
//                     </p>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Project Description</label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       placeholder="Describe your project in detail. Include your goals, requirements, and any specific skills needed."
//                       rows={6}
//                       className={`w-full px-4 py-3 rounded-lg border ${
//                         darkMode 
//                           ? 'bg-gray-800 border-gray-700 focus:border-blue-500 text-white' 
//                           : 'bg-gray-50 border-gray-200 focus:border-blue-500'
//                       } focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
//                     ></textarea>
//                     <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
//                       Be as detailed as possible to attract the right freelancers.
//                     </p>
//                   </div>
                  
//                   <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'} flex items-start`}>
//                     <FaLightbulb className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
//                     <div>
//                       <h4 className="font-medium text-blue-700 dark:text-blue-400">Tips for a Great Project Description</h4>
//                       <ul className="text-sm mt-2 space-y-1 list-disc list-inside text-gray-600 dark:text-gray-300">
//                         <li>Be specific about what you're looking for</li>
//                         <li>Include any technical requirements</li>
//                         <li>Mention your timeline expectations</li>
//                         <li>Describe your ideal outcome</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               {/* Step 2: Project Details */}
//               {currentStep === 2 && (
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Budget Range (USD)</label>
//                     <div className="flex items-center space-x-4">
//                       <div className="relative flex-1">
//                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                           <span className="text-gray-500">$</span>
//                         </div>
//                         <input
//                           type="number"
//                           name="budget.min"
//                           value={formData.budget.min}
//                           onChange={handleChange}
//                           placeholder="Min"
//                           className={`w-full pl-7 px-4 py-3 rounded-lg border ${
//                             darkMode 
//                               ? 'bg-gray-800 border-gray-700 focus:border-blue-500 text-white' 
//                               : 'bg-gray-50 border-gray-200 focus:border-blue-500'
//                           } focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
//                         />
//                       </div>
//                       <span className="text-gray-500">to</span>
//                       <div className="relative flex-1">
//                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                           <span className="text-gray-500">$</span>
//                         </div>
//                         <input
//                           type="number"
//                           name="budget.max"
//                           value={formData.budget.max}
//                           onChange={handleChange}
//                           placeholder="Max"
//                           className={`w-full pl-7 px-4 py-3 rounded-lg border ${
//                             darkMode 
//                               ? 'bg-gray-800 border-gray-700 focus:border-blue-500 text-white' 
//                               : 'bg-gray-50 border-gray-200 focus:border-blue-500'
//                           } focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
//                         />
//                       </div>
//                     </div>
//                     <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
//                       Setting a realistic budget helps attract qualified freelancers.
//                     </p>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Project Type</label>
//                     <select
//                       name="type"
//                       value={formData.type}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 rounded-lg border ${
//                         darkMode 
//                           ? 'bg-gray-800 border-gray-700 focus:border-blue-500 text-white' 
//                           : 'bg-gray-50 border-gray-200 focus:border-blue-500'
//                       } focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
//                     >
//                       <option value="">Select Project Type</option>
//                       {projectTypes.map((type, index) => (
//                         <option key={index} value={type}>{type}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Project Duration</label>
//                     <select
//                       name="duration"
//                       value={formData.duration}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 rounded-lg border ${
//                         darkMode 
//                           ? 'bg-gray-800 border-gray-700 focus:border-blue-500 text-white' 
//                           : 'bg-gray-50 border-gray-200 focus:border-blue-500'
//                       } focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
//                     >
//                       <option value="">Select Project Duration</option>
//                       {durationOptions.map((duration, index) => (
//                         <option key={index} value={duration}>{duration}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Additional Details (Optional)</label>
//                     <textarea
//                       name="additionalDetails"
//                       value={formData.additionalDetails}
//                       onChange={handleChange}
//                       placeholder="Add any additional information that might help freelancers understand your project better."
//                       rows={3}
//                       className={`w-full px-4 py-3 rounded-lg border ${
//                         darkMode 
//                           ? 'bg-gray-800 border-gray-700 focus:border-blue-500 text-white' 
//                           : 'bg-gray-50 border-gray-200 focus:border-blue-500'
//                       } focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
//                     ></textarea>
//                   </div>
//                 </div>
//               )}
              
//               {/* Step 3: Skills & Files */}
//               {currentStep === 3 && (
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Required Skills</label>
//                     <div className="flex flex-wrap gap-2 mb-3">
//                       {formData.skills.map((skill, index) => (
//                         <span 
//                           key={index} 
//                           className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center ${
//                             darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
//                           }`}
//                         >
//                           {skill}
//                           <button 
//                             onClick={() => handleSkillToggle(skill)}
//                             className="ml-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300"
//                           >
//                             <FaTimes size={12} />
//                           </button>
//                         </span>
//                       ))}
//                     </div>
                    
//                     <div className="flex mb-4">
//                       <input
//                         type="text"
//                         value={customSkill}
//                         onChange={(e) => setCustomSkill(e.target.value)}
//                         placeholder="Add a custom skill"
//                         className={`flex-1 px-4 py-2 rounded-l-lg border-y border-l ${
//                           darkMode 
//                             ? 'bg-gray-800 border-gray-700 text-white' 
//                             : 'bg-gray-50 border-gray-200'
//                         } outline-none transition-all`}
//                       />
//                       <button
//                         onClick={handleAddCustomSkill}
//                         disabled={!customSkill}
//                         className={`px-4 py-2 rounded-r-lg ${
//                           customSkill
//                             ? 'bg-blue-600 hover:bg-blue-700 text-white' 
//                             : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
//                         }`}
//                       >
//                         <FaPlus />
//                       </button>
//                     </div>
                    
//                     <p className="text-sm font-medium mb-2">Popular Skills</p>
//                     <div className="flex flex-wrap gap-2">
//                       {popularSkills.map((skill, index) => (
//                         <button
//                           key={index}
//                           onClick={() => handleSkillToggle(skill)}
//                           className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
//                             formData.skills.includes(skill)
//                               ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
//                               : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                           }`}
//                         >
//                           {skill}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Attachments (Optional)</label>
//                     <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
//                       darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'
//                     }`}>
//                       <FaUpload className="mx-auto mb-3 text-gray-400" size={32} />
//                       <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                         Drag & drop files here or click to browse
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
//                         You can upload images, PDFs, Word documents, or any relevant files (Max 5 MB each)
//                       </p>
//                       <input
//                         type="file"
//                         multiple
//                         onChange={handleFileChange}
//                         className="hidden"
//                         id="file-upload"
//                       />
//                       <label
//                         htmlFor="file-upload"
//                         className={`inline-block px-4 py-2 rounded-lg cursor-pointer ${
//                           darkMode 
//                             ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
//                             : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
//                         }`}
//                       >
//                         Select Files
//                       </label>
//                     </div>
                    
//                     {formData.attachments.length > 0 && (
//                       <div className="mt-4 space-y-2">
//                         <p className="text-sm font-medium">Uploaded Files:</p>
//                         {formData.attachments.map((file, index) => (
//                           <div 
//                             key={index} 
//                             className={`flex items-center justify-between p-2 rounded ${
//                               darkMode ? 'bg-gray-800' : 'bg-gray-100'
//                             }`}
//                           >
//                             <div className="flex items-center">
//                               <FaFileAlt className="mr-2 text-blue-500" />
//                               <span className="text-sm truncate max-w-[200px]">{file.name}</span>
//                             </div>
//                             <button 
//                               onClick={() => removeAttachment(index)}
//                               className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
//                             >
//                               <FaTimes />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                     <div className="flex items-start">
//                       <FaInfoCircle className={`mt-1 mr-3 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
//                       <div>
//                         <h4 className="font-medium">Ready to Post Your Project?</h4>
//                         <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
//                           Once posted, your project will be visible to freelancers who can submit proposals. You'll be able to review them and choose the best match for your project.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
        
//         {/* Modal Footer */}
//         {!successMessage && (
//           <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between`}>
//             {currentStep > 1 ? (
//               <button
//                 onClick={prevStep}
//                 className={`px-5 py-2 rounded-lg ${
//                   darkMode 
//                     ? 'bg-gray-700 hover:bg-gray-600 text-white' 
//                     : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
//                 }`}
//               >
//                 Back
//               </button>
//             ) : (
//               <button
//                 onClick={onClose}
//                 className={`px-5 py-2 rounded-lg ${
//                   darkMode 
//                     ? 'bg-gray-700 hover:bg-gray-600 text-white' 
//                     : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
//                 }`}
//               >
//                 Cancel
//               </button>
//             )}
            
//             {currentStep < 3 ? (
//               <button
//                 onClick={nextStep}
//                 disabled={!isStepValid()}
//                 className={`px-5 py-2 rounded-lg ${
//                   isStepValid()
//                     ? 'bg-blue-600 hover:bg-blue-700 text-white' 
//                     : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
//                 }`}
//               >
//                 Next
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 disabled={isSubmitting || !isStepValid()}
//                 className={`px-6 py-2 rounded-lg flex items-center ${
//                   isSubmitting
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : isStepValid()
//                       ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                       : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
//                 }`}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Posting...</span>
//                   </>
//                 ) : (
//                   'Post Project'
//                 )}
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostProjectModal;

import React, { useState } from 'react';
import { 
  FaTimes, 
  FaMoneyBillWave, 
  FaCalendarAlt, 
  FaTags, 
  FaClipboardList, 
  FaPlus, 
  FaCheck,
  FaLightbulb,
  FaInfoCircle,
  FaUpload,
  FaChevronRight,
  FaFileAlt,
  FaExclamationTriangle
} from 'react-icons/fa';

const PostProjectModal = ({ onClose, darkMode, onProjectPost }) => {
  console.log(onProjectPost)
  const initialFormState = {
    title: '',
    description: '',
    budget: { min: '', max: '' },
    duration: '',
    type: '',
    skills: [],
    additionalDetails: '',
    attachments: []
  };

  const [formData, setFormData] = useState(initialFormState);
  const [currentStep, setCurrentStep] = useState(1);
  const [customSkill, setCustomSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-defined project types and skills
  const projectTypes = [
    'Development', 'Design', 'Marketing', 'Content', 'Data Science', 
    'Audio', 'Video', 'Translation', 'E-commerce', 'DevOps', 'Security'
  ];

  const popularSkills = [
    'React', 'JavaScript', 'Python', 'UI/UX Design', 'Content Writing', 
    'SEO', 'WordPress', 'Graphic Design', 'Data Analysis', 'Node.js',
    'Figma', 'MongoDB', 'Mobile Development', 'Social Media', 'Video Editing'
  ];

  const durationOptions = [
    'Less than 1 week', '1-2 weeks', '2-4 weeks', '1-3 months', '3-6 months', '6+ months'
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle skill selection
  const handleSkillToggle = (skill) => {
    if (formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: formData.skills.filter(s => s !== skill)
      });
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill]
      });
    }
  };

  // Add custom skill
  const handleAddCustomSkill = () => {
    if (customSkill && !formData.skills.includes(customSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, customSkill]
      });
      setCustomSkill('');
    }
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...files]
    });
  };

  // Remove an attachment
  const removeAttachment = (index) => {
    const updatedAttachments = [...formData.attachments];
    updatedAttachments.splice(index, 1);
    setFormData({
      ...formData,
      attachments: updatedAttachments
    });
  };

  // API call to post project
  const postProjectToAPI = async (projectData) => {
    try {
      const response = await fetch('http://localhost:5000/api/post_project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error posting project:', error);
      throw error;
    }
  };
  const userEmail = localStorage.getItem('email')
  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Prepare data according to API payload structure
      const apiPayload = {
        email: userEmail,
        title: formData.title,
        description: formData.description,
        budget_from: parseInt(formData.budget.min) || 0,
        budget_to: parseInt(formData.budget.max) || 0,
        project_type: formData.type.toLowerCase(),
        project_duration: formData.duration,
        req_skills: formData.skills
      };

      // Call the API
      const result = await postProjectToAPI(apiPayload);
      
      // Call the parent component's callback with the form data
      if (onProjectPost) {
        onProjectPost({
          ...formData,
          apiResponse: result
        });
      }
      
      setIsSubmitting(false);
      setSuccessMessage(true);
      alert('Project Saved Successfully')
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData(initialFormState);
        setCurrentStep(1);
        setSuccessMessage(false);
        onClose();
      }, 3000);
      
    } catch (error) {
      setIsSubmitting(false);
      setErrorMessage(error.message || 'Failed to post project. Please try again.');
    }
  };

  // Next step in multi-step form
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Previous step in multi-step form
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Check if current step is valid
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title.trim() !== '' && formData.description.trim() !== '';
      case 2:
        return formData.budget.min !== '' && formData.budget.max !== '' && 
               formData.type !== '' && formData.duration !== '';
      case 3:
        return formData.skills.length > 0;
      default:
        return true;
    }
  };

  // Progress percentage
  const progressPercentage = () => {
    return ((currentStep - 1) / 3) * 100;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className={`w-full max-w-3xl ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'} rounded-xl shadow-2xl overflow-hidden`}>
        {/* Modal Header */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-blue-800 to-indigo-900' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} px-6 py-4 flex justify-between items-center`}>
          <h2 className="text-xl font-bold text-white">Post a New Project</h2>
          <button 
            onClick={onClose} 
            className="text-white hover:text-red-300 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10"
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700">
          <div 
            className="h-full bg-blue-600 transition-all duration-300" 
            style={{ width: `${progressPercentage()}%` }}
          ></div>
        </div>
        
        {/* Step Indicator */}
        <div className="flex justify-between px-8 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              currentStep >= 1 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}>
              1
            </div>
            <span className={`text-sm font-medium ${currentStep === 1 ? 'text-blue-600 dark:text-blue-400' : ''}`}>
              Basic Details
            </span>
          </div>
          
          <div className={`flex items-center ${currentStep >= 2 ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400'}`}>
            <FaChevronRight size={14} className="mx-2" />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              currentStep >= 2 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}>
              2
            </div>
            <span className={`text-sm font-medium ml-4 ${currentStep === 2 ? 'text-blue-600 dark:text-blue-400' : ''}`}>
              Project Details
            </span>
          </div>
          
          <div className={`flex items-center ${currentStep >= 3 ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400'}`}>
            <FaChevronRight size={14} className="mx-2" />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
              currentStep >= 3 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}>
              3
            </div>
            <span className={`text-sm font-medium ml-4 ${currentStep === 3 ? 'text-blue-600 dark:text-blue-400' : ''}`}>
              Skills & Finish
            </span>
          </div>
        </div>
        
        {/* Modal Content */}
        <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-4 rounded-lg bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-200 dark:border-red-800 flex items-start">
              <FaExclamationTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-red-700 dark:text-red-400">Error</h4>
                <p className="text-sm mt-1 text-red-600 dark:text-red-300">{errorMessage}</p>
              </div>
            </div>
          )}

          {successMessage ? (
            <div className="text-center py-10">
              <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                <FaCheck size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Project Posted Successfully!</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                Your project has been posted and is now visible to freelancers.
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Redirecting you to the projects page...
              </p>
            </div>
          ) : (
            <>
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="E.g., Website Redesign for E-commerce Store"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 focus:border-blue-500 text-white' 
                          : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                    />
                    <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                      A clear, specific title will attract more qualified freelancers.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your project in detail. Include your goals, requirements, and any specific skills needed."
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 focus:border-blue-500 text-white' 
                          : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                    ></textarea>
                    <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                      Be as detailed as possible to attract the right freelancers.
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'} flex items-start`}>
                    <FaLightbulb className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-700 dark:text-blue-400">Tips for a Great Project Description</h4>
                      <ul className="text-sm mt-2 space-y-1 list-disc list-inside text-gray-600 dark:text-gray-300">
                        <li>Be specific about what you're looking for</li>
                        <li>Include any technical requirements</li>
                        <li>Mention your timeline expectations</li>
                        <li>Describe your ideal outcome</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range (USD)</label>
                    <div className="flex items-center space-x-4">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="number"
                          name="budget.min"
                          value={formData.budget.min}
                          onChange={handleChange}
                          placeholder="Min"
                          className={`w-full pl-7 px-4 py-3 rounded-lg border ${
                            darkMode 
                              ? 'bg-gray-800 border-gray-700 focus:border-blue-500 text-white' 
                              : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                          } focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                        />
                      </div>
                      <span className="text-gray-500">to</span>
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="number"
                          name="budget.max"
                          value={formData.budget.max}
                          onChange={handleChange}
                          placeholder="Max"
                          className={`w-full pl-7 px-4 py-3 rounded-lg border ${
                            darkMode 
                              ? 'bg-gray-800 border-gray-700 focus:border-blue-500 text-white' 
                              : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                          } focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                        />
                      </div>
                    </div>
                    <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                      Setting a realistic budget helps attract qualified freelancers.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 focus:border-blue-500 text-white' 
                          : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                    >
                      <option value="">Select Project Type</option>
                      {projectTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Duration</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 focus:border-blue-500 text-white' 
                          : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                    >
                      <option value="">Select Project Duration</option>
                      {durationOptions.map((duration, index) => (
                        <option key={index} value={duration}>{duration}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Details (Optional)</label>
                    <textarea
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleChange}
                      placeholder="Add any additional information that might help freelancers understand your project better."
                      rows={3}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-800 border-gray-700 focus:border-blue-500 text-white' 
                          : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-200 outline-none transition-all`}
                    ></textarea>
                  </div>
                </div>
              )}
              
              {/* Step 3: Skills & Files */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Required Skills</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center ${
                            darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {skill}
                          <button 
                            onClick={() => handleSkillToggle(skill)}
                            className="ml-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300"
                          >
                            <FaTimes size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex mb-4">
                      <input
                        type="text"
                        value={customSkill}
                        onChange={(e) => setCustomSkill(e.target.value)}
                        placeholder="Add a custom skill"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCustomSkill()}
                        className={`flex-1 px-4 py-2 rounded-l-lg border-y border-l ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'bg-gray-50 border-gray-200'
                        } outline-none transition-all`}
                      />
                      <button
                        onClick={handleAddCustomSkill}
                        disabled={!customSkill}
                        className={`px-4 py-2 rounded-r-lg ${
                          customSkill
                            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    
                    <p className="text-sm font-medium mb-2">Popular Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {popularSkills.map((skill, index) => (
                        <button
                          key={index}
                          onClick={() => handleSkillToggle(skill)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            formData.skills.includes(skill)
                              ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                              : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Attachments (Optional)</label>
                    <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-gray-50'
                    }`}>
                      <FaUpload className="mx-auto mb-3 text-gray-400" size={32} />
                      <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Drag & drop files here or click to browse
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        You can upload images, PDFs, Word documents, or any relevant files (Max 5 MB each)
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className={`inline-block px-4 py-2 rounded-lg cursor-pointer ${
                          darkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                      >
                        Select Files
                      </label>
                    </div>
                    
                    {formData.attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium">Uploaded Files:</p>
                        {formData.attachments.map((file, index) => (
                          <div 
                            key={index} 
                            className={`flex items-center justify-between p-2 rounded ${
                              darkMode ? 'bg-gray-800' : 'bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center">
                              <FaFileAlt className="mr-2 text-blue-500" />
                              <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                            </div>
                            <button 
                              onClick={() => removeAttachment(index)}
                              className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-start">
                      <FaInfoCircle className={`mt-1 mr-3 flex-shrink-0 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      <div>
                        <h4 className="font-medium">Ready to Post Your Project?</h4>
                        <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                          Once posted, your project will be visible to freelancers who can submit proposals. You'll be able to review them and choose the best match for your project.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Modal Footer */}
        {!successMessage && (
          <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between`}>
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                disabled={isSubmitting}
                className={`px-5 py-2 rounded-lg ${
                  isSubmitting
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    : darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Back
              </button>
            ) : (
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className={`px-5 py-2 rounded-lg ${
                  isSubmitting
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    : darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Cancel
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid() || isSubmitting}
                className={`px-5 py-2 rounded-lg ${
                  isStepValid() && !isSubmitting
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !isStepValid()}
                className={`px-6 py-2 rounded-lg flex items-center ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : isStepValid()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Posting...</span>
                  </>
                ) : (
                  'Post Project'
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostProjectModal;
// import React, { useState } from 'react';
// import { 
//   FaSearch, 
//   FaPaperPlane,
//   FaRegClock,
//   FaRegEnvelope,
//   FaRegEnvelopeOpen,
//   FaEllipsisV,
//   FaRegTrashAlt,
//   FaRegStar,
//   FaStar,
//   FaArchive,
//   FaReply,
//   FaFileAlt,
//   FaPlus,
//   FaPaperclip,
//   FaSmile,
//   FaTimes
// } from 'react-icons/fa';
// import { myMessages } from '../components/AllProject';

// const InboxPage = ({ darkMode }) => {
//   const [conversations, setConversations] = useState(myMessages);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [newMessage, setNewMessage] = useState('');
//   const [showComposeModal, setShowComposeModal] = useState(false);
//   const [composeData, setComposeData] = useState({
//     recipient: '',
//     subject: '',
//     message: ''
//   });

//   // Demo messages for the selected conversation
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       from: 'client',
//       content: 'Hi there! Just checking in on the progress of the landing page.',
//       timestamp: 'May 7, 10:30 AM',
//       read: true
//     },
//     {
//       id: 2,
//       from: 'user',
//       content: 'Hello! Thanks for checking in. I\'ve completed the header and hero sections and I\'m currently working on the features section. Everything is on track for the deadline.',
//       timestamp: 'May 7, 10:45 AM',
//       read: true
//     },
//     {
//       id: 3,
//       from: 'client',
//       content: 'That sounds great! Could you share a preview of what you have so far?',
//       timestamp: 'May 7, 11:00 AM',
//       read: true
//     },
//     {
//       id: 4,
//       from: 'user',
//       content: 'Sure thing! I\'ll put together a preview link and share it with you by the end of the day.',
//       timestamp: 'May 7, 11:15 AM',
//       read: true
//     },
//     {
//       id: 5,
//       from: 'client',
//       content: 'Perfect! Looking forward to seeing it. Also, I was thinking about adding a testimonials section. What do you think?',
//       timestamp: '12:30 PM, Today',
//       read: false
//     }
//   ]);

//   // Handle search input
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // Filter conversations based on search query
//   const filteredConversations = conversations.filter(conversation => {
//     return (
//       conversation.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       conversation.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   });

//   // Mark conversation as read
//   const handleConversationClick = (conversationId) => {
//     setSelectedConversation(conversationId);
//     setConversations(prevConversations => 
//       prevConversations.map(conv => 
//         conv.id === conversationId ? { ...conv, unread: false } : conv
//       )
//     );
//   };

//   // Handle new message input
//   const handleNewMessageChange = (e) => {
//     setNewMessage(e.target.value);
//   };

//   // Send a new message
//   const handleSendMessage = () => {
//     if (newMessage.trim() === '') return;

//     const newMessageObj = {
//       id: messages.length + 1,
//       from: 'user',
//       content: newMessage,
//       timestamp: 'Just now',
//       read: true
//     };

//     setMessages([...messages, newMessageObj]);
//     setNewMessage('');
//   };

//   // Handle compose modal input changes
//   const handleComposeChange = (e) => {
//     const { name, value } = e.target;
//     setComposeData(prev => ({ ...prev, [name]: value }));
//   };

//   // Send a new composed message
//   const handleComposeSubmit = () => {
//     // Validation
//     if (!composeData.recipient || !composeData.subject || !composeData.message) {
//       alert('Please fill in all fields');
//       return;
//     }

//     // Here you would typically send the message to your API
//     console.log('New message:', composeData);

//     // Close the modal and reset form
//     setShowComposeModal(false);
//     setComposeData({
//       recipient: '',
//       subject: '',
//       message: ''
//     });

//     // Show success notification
//     alert('Message sent successfully!');
//   };

//   return (
//     <div className="min-h-screen pb-16">
//       {/* Page Header */}
//       <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold">Inbox</h1>
//               <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                 Manage your conversations with clients
//               </p>
//             </div>
//             <button 
//               onClick={() => setShowComposeModal(true)}
//               className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//             >
//               <FaPlus className="mr-2" />
//               New Message
//             </button>
//           </div>
//         </div>
//       </div>
      
//       <div className="container mx-auto px-4 py-8">
//         <div className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//           <div className="flex flex-col md:flex-row h-[calc(100vh-280px)] min-h-[500px]">
//             {/* Conversations List */}
//             <div className={`w-full md:w-1/3 lg:w-1/4 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//               <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search messages..."
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
//                       darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-800'
//                     }`}
//                   />
//                   <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 </div>
//               </div>
              
//               <div className="overflow-y-auto h-[calc(100%-65px)]">
//                 {filteredConversations.length > 0 ? (
//                   filteredConversations.map(conversation => (
//                     <div 
//                       key={conversation.id}
//                       onClick={() => handleConversationClick(conversation.id)}
//                       className={`flex items-start p-4 border-b cursor-pointer ${
//                         darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
//                       } ${selectedConversation === conversation.id ? darkMode ? 'bg-gray-700' : 'bg-blue-50' : ''} ${
//                         conversation.unread ? darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50' : ''
//                       }`}
//                     >
//                       <div className="relative mr-3 flex-shrink-0">
//                         <img 
//                           src={conversation.sender.profile} 
//                           alt={conversation.sender.name} 
//                           className="w-10 h-10 rounded-full"
//                         />
//                         {conversation.unread && (
//                           <span className="absolute top-0 right-0 w-3 h-3 bg-blue-600 rounded-full border-2 border-white dark:border-gray-800"></span>
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex justify-between">
//                           <h3 className={`font-medium truncate ${conversation.unread ? 'font-semibold' : ''}`}>
//                             {conversation.sender.name}
//                           </h3>
//                           <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                             {conversation.timestamp}
//                           </span>
//                         </div>
//                         <p className={`text-sm truncate mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'} ${
//                           conversation.unread ? darkMode ? 'text-white' : 'text-gray-900' : ''
//                         }`}>
//                           {conversation.lastMessage}
//                         </p>
//                         <p className="text-xs text-blue-600 mt-1">{conversation.project}</p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="p-6 text-center">
//                     <FaRegEnvelope className="mx-auto text-gray-400 text-4xl mb-2" />
//                     <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                       {searchQuery ? 'No messages found' : 'Your inbox is empty'}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* Message Thread */}
//             <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
//               {selectedConversation ? (
//                 <>
//                   {/* Message Header */}
//                   <div className={`p-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                     {conversations.filter(c => c.id === selectedConversation).map(conversation => (
//                       <div key={conversation.id} className="flex items-center">
//                         <img 
//                           src={conversation.sender.profile} 
//                           alt={conversation.sender.name} 
//                           className="w-10 h-10 rounded-full mr-3"
//                         />
//                         <div>
//                           <h3 className="font-medium">{conversation.sender.name}</h3>
//                           <p className="text-xs text-blue-600">{conversation.project}</p>
//                         </div>
//                       </div>
//                     ))}
                    
//                     <div className="flex space-x-2">
//                       <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
//                         <FaArchive className="text-gray-500" />
//                       </button>
//                       <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
//                         <FaRegTrashAlt className="text-gray-500" />
//                       </button>
//                       <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
//                         <FaRegStar className="text-gray-500" />
//                       </button>
//                     </div>
//                   </div>
                  
//                   {/* Message Thread */}
//                   <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                     {messages.map(message => (
//                       <div 
//                         key={message.id} 
//                         className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
//                       >
//                         <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
//                           message.from === 'user' 
//                             ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white' 
//                             : darkMode ? 'bg-gray-700' : 'bg-gray-100'
//                         }`}>
//                           <p className="text-sm mb-1">{message.content}</p>
//                           <p className={`text-xs text-right ${
//                             message.from === 'user' 
//                               ? 'text-blue-200' 
//                               : darkMode ? 'text-gray-400' : 'text-gray-500'
//                           }`}>
//                             {message.timestamp}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
//                   {/* Message Input */}
//                   <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//                     <div className="flex">
//                       <div className="flex-1 relative">
//                         <textarea
//                           value={newMessage}
//                           onChange={handleNewMessageChange}
//                           placeholder="Type your message..."
//                           className={`w-full pl-4 pr-10 py-2 rounded-lg border resize-none ${
//                             darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
//                           }`}
//                           rows={2}
//                         ></textarea>
//                         <div className="absolute right-2 bottom-2 flex space-x-2">
//                           <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
//                             <FaPaperclip />
//                           </button>
//                           <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
//                             <FaSmile />
//                           </button>
//                         </div>
//                       </div>
//                       <button 
//                         onClick={handleSendMessage}
//                         disabled={!newMessage.trim()}
//                         className={`ml-2 px-4 rounded-lg flex items-center justify-center ${
//                           !newMessage.trim() 
//                             ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
//                             : 'bg-blue-600 text-white hover:bg-blue-700'
//                         }`}
//                       >
//                         <FaPaperPlane />
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex-1 flex items-center justify-center">
//                   <div className="text-center max-w-md px-4">
//                     <FaRegEnvelopeOpen className="mx-auto text-gray-400 text-5xl mb-4" />
//                     <h3 className="text-xl font-semibold mb-2">No conversation selected</h3>
//                     <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                       Select a conversation from the list or start a new one
//                     </p>
//                     <button 
//                       onClick={() => setShowComposeModal(true)}
//                       className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
//                     >
//                       Start New Conversation
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Compose Message Modal */}
//       {showComposeModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className={`w-full max-w-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl shadow-2xl`}>
//             <div className={`px-6 py-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
//               <h3 className="text-xl font-bold">New Message</h3>
//               <button 
//                 onClick={() => setShowComposeModal(false)}
//                 className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//             <div className="p-6 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="recipient">Recipient</label>
//                 <input
//                   type="text"
//                   id="recipient"
//                   name="recipient"
//                   value={composeData.recipient}
//                   onChange={handleComposeChange}
//                   placeholder="Enter recipient name or email"
//                   className={`w-full px-4 py-2 rounded-lg border ${
//                     darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
//                   }`}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="subject">Subject</label>
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   value={composeData.subject}
//                   onChange={handleComposeChange}
//                   placeholder="Enter message subject"
//                   className={`w-full px-4 py-2 rounded-lg border ${
//                     darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
//                   }`}
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={composeData.message}
//                   onChange={handleComposeChange}
//                   placeholder="Type your message here..."
//                   rows={6}
//                   className={`w-full px-4 py-2 rounded-lg border ${
//                     darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
//                   }`}
//                 ></textarea>
//               </div>
              
//               <div className="mt-2">
//                 <label className="block text-sm font-medium mb-2">Attachments</label>
//                 <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
//                   darkMode ? 'border-gray-700' : 'border-gray-300'
//                 }`}>
//                   <FaPaperclip className="mx-auto text-gray-400 mb-2" />
//                   <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                     Drag files here or click to browse
//                   </p>
//                   <input type="file" className="hidden" id="file-upload" multiple />
//                   <label
//                     htmlFor="file-upload"
//                     className={`mt-2 inline-block px-4 py-2 rounded-lg cursor-pointer ${
//                       darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
//                     }`}
//                   >
//                     Select Files
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-end space-x-3`}>
//               <button 
//                 onClick={() => setShowComposeModal(false)}
//                 className={`px-4 py-2 rounded-lg ${
//                   darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
//                 }`}
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleComposeSubmit}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
//               >
//                 <FaPaperPlane className="mr-2" />
//                 Send Message
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };  

// export default InboxPage;








import React, { useState, useEffect, useRef } from 'react';
import { 
  FaSearch, 
  FaPaperPlane,
  FaRegClock,
  FaRegEnvelope,
  FaRegEnvelopeOpen,
  FaEllipsisV,
  FaRegTrashAlt,
  FaRegStar,
  FaStar,
  FaArchive,
  FaReply,
  FaFileAlt,
  FaPlus,
  FaPaperclip,
  FaSmile,
  FaTimes,
  FaSpinner
} from 'react-icons/fa';
import io from 'socket.io-client';

const InboxPage = ({ darkMode }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedConversationData, setSelectedConversationData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeData, setComposeData] = useState({
    participantId: '',
    projectId: '',
    initialMessage: ''
  });
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false
  });
  const [messagePagination, setMessagePagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalConversations: 0,
    unreadMessages: 0,
    activeChats: 0
  });
  
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // API base URL - adjust this to match your backend
  const API_BASE_URL = 'http://localhost:5000';

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io(API_BASE_URL, {
      withCredentials: true
    });

    // Get user ID from localStorage or wherever you store it
    const userId = localStorage.getItem('userId');
    if (userId) {
      socketRef.current.emit('join_user_room', userId);
    }

    // Listen for new messages
    socketRef.current.on('new_message', (data) => {
      // Update conversations list
      fetchConversations();
      
      // If the message is for the currently selected conversation, add it to messages
      if (selectedConversation === data.conversationId) {
        setMessages(prev => [...prev, data.message]);
      }
    });

    // Listen for typing indicators
    socketRef.current.on('user_typing', (data) => {
      // Handle typing indicator
      console.log(`${data.userName} is typing...`);
    });

    socketRef.current.on('user_stopped_typing', (data) => {
      // Handle stop typing
      console.log(`User stopped typing`);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [selectedConversation]);

  // Fetch conversations
  const fetchConversations = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/conversations?page=${page}&limit=20`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }

      const data = await response.json();
      if (data.success) {
        setConversations(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      setError('Failed to load conversations');
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for a conversation
  const fetchMessages = async (conversationId, page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/conversations/${conversationId}/messages?page=${page}&limit=50`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
        setMessagePagination(data.pagination);
      }
    } catch (error) {
      setError('Failed to load messages');
      console.error('Error fetching messages:', error);
    }
  };

  // Fetch conversation details
  const fetchConversationDetails = async (conversationId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/conversations/${conversationId}`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch conversation details');
      }

      const data = await response.json();
      if (data.success) {
        setSelectedConversationData(data.data);
      }
    } catch (error) {
      console.error('Error fetching conversation details:', error);
    }
  };

  // Fetch chat statistics
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/stats`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Search conversations
  const searchConversations = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      const response = await fetch(`${API_BASE_URL}/api/conversations/search?query=${encodeURIComponent(query)}`, {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to search conversations');
      }

      const data = await response.json();
      if (data.success) {
        setSearchResults(data.data);
      }
    } catch (error) {
      console.error('Error searching conversations:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Send message
  const sendMessage = async (conversationId, content, attachment = null) => {
    try {
      setSendingMessage(true);
      const formData = new FormData();
      formData.append('content', content);
      
      if (attachment) {
        formData.append('attachment', attachment);
      }

      const response = await fetch(`${API_BASE_URL}/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, data.data]);
        setNewMessage('');
        setSelectedAttachment(null);
        
        // Update conversations list to reflect new message
        fetchConversations();
        
        // Scroll to bottom
        scrollToBottom();
      }
    } catch (error) {
      setError('Failed to send message');
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  // Create new conversation
  const createConversation = async (participantId, projectId, initialMessage) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/conversations/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          participantId,
          projectId,
          initialMessage
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create conversation');
      }

      const data = await response.json();
      if (data.success) {
        // Refresh conversations list
        fetchConversations();
        setShowComposeModal(false);
        setComposeData({ participantId: '', projectId: '', initialMessage: '' });
        
        // Select the new conversation
        setSelectedConversation(data.data._id);
        fetchConversationDetails(data.data._id);
        fetchMessages(data.data._id);
      }
    } catch (error) {
      setError('Failed to create conversation');
      console.error('Error creating conversation:', error);
    }
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle search input with debouncing
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      searchConversations(searchQuery);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  // Initial data fetch
  useEffect(() => {
    fetchConversations();
    fetchStats();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle conversation selection
  const handleConversationClick = (conversationId) => {
    setSelectedConversation(conversationId);
    fetchConversationDetails(conversationId);
    fetchMessages(conversationId);
    
    // Join conversation room for real-time updates
    if (socketRef.current) {
      socketRef.current.emit('join_conversation', conversationId);
    }
  };

  // Handle send message
  const handleSendMessage = () => {
    if (!newMessage.trim() && !selectedAttachment) return;
    if (!selectedConversation) return;

    sendMessage(selectedConversation, newMessage, selectedAttachment);
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAttachment(file);
    }
  };

  // Handle compose submit
  const handleComposeSubmit = () => {
    if (!composeData.participantId || !composeData.projectId || !composeData.initialMessage) {
      setError('Please fill in all fields');
      return;
    }

    createConversation(composeData.participantId, composeData.projectId, composeData.initialMessage);
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Get display conversations (search results or all conversations)
  const displayConversations = searchQuery ? searchResults : conversations;

  return (
    <div className="min-h-screen pb-16">
      {/* Page Header */}
      <div className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Inbox</h1>
              <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Manage your conversations with clients
              </p>
              {/* Stats */}
              <div className="flex gap-4 mt-4 text-sm">
                <span className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {stats.totalConversations} Total
                </span>
                <span className={`${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                  {stats.unreadMessages} Unread
                </span>
                <span className={`${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {stats.activeChats} Active
                </span>
              </div>
            </div>
            <button 
              onClick={() => setShowComposeModal(true)}
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FaPlus className="mr-2" />
              New Message
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-4 py-2">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button 
              onClick={() => setError(null)}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row h-[calc(100vh-280px)] min-h-[500px]">
            {/* Conversations List */}
            <div className={`w-full md:w-1/3 lg:w-1/4 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-800'
                    }`}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  {isSearching && (
                    <FaSpinner className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin" />
                  )}
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(100%-65px)]">
                {loading ? (
                  <div className="p-6 text-center">
                    <FaSpinner className="mx-auto text-gray-400 text-4xl mb-2 animate-spin" />
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Loading conversations...
                    </p>
                  </div>
                ) : displayConversations.length > 0 ? (
                  displayConversations.map(conversation => (
                    <div 
                      key={conversation.id}
                      onClick={() => handleConversationClick(conversation.id)}
                      className={`flex items-start p-4 border-b cursor-pointer ${
                        darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                      } ${selectedConversation === conversation.id ? darkMode ? 'bg-gray-700' : 'bg-blue-50' : ''} ${
                        conversation.unreadCount > 0 ? darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="relative mr-3 flex-shrink-0">
                        <img 
                          src={conversation.participant?.profilePhoto || '/api/placeholder/40/40'} 
                          alt={conversation.participant?.fullName || 'User'} 
                          className="w-10 h-10 rounded-full"
                        />
                        {conversation.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className={`font-medium truncate ${conversation.unreadCount > 0 ? 'font-semibold' : ''}`}>
                            {conversation.participant?.fullName || 'Unknown User'}
                          </h3>
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {formatTimestamp(conversation.updatedAt)}
                          </span>
                        </div>
                        <p className={`text-sm truncate mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'} ${
                          conversation.unreadCount > 0 ? darkMode ? 'text-white' : 'text-gray-900' : ''
                        }`}>
                          {conversation.lastMessage?.content || 'No messages yet'}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">{conversation.project?.title}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <FaRegEnvelope className="mx-auto text-gray-400 text-4xl mb-2" />
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {searchQuery ? 'No messages found' : 'Your inbox is empty'}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Message Thread */}
            <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
              {selectedConversation && selectedConversationData ? (
                <>
                  {/* Message Header */}
                  <div className={`p-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center">
                      <img 
                        src={selectedConversationData.participants?.find(p => p._id !== localStorage.getItem('userId'))?.profilePhoto || '/api/placeholder/40/40'} 
                        alt="User" 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="font-medium">
                          {selectedConversationData.participants?.find(p => p._id !== localStorage.getItem('userId'))?.fullName || 'Unknown User'}
                        </h3>
                        <p className="text-xs text-blue-600">{selectedConversationData.project?.title}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                        <FaArchive className="text-gray-500" />
                      </button>
                      <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                        <FaRegTrashAlt className="text-gray-500" />
                      </button>
                      <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                        <FaRegStar className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Message Thread */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(message => {
                      const isCurrentUser = message.sender._id === localStorage.getItem('id');
                      return (
                        <div 
                          key={message._id} 
                          className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
                            isCurrentUser 
                              ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white' 
                              : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>
                            <p className="text-sm mb-1">{message.content}</p>
                            {message.attachment && (
                              <div className="mt-2">
                                <a 
                                  href={`${API_BASE_URL}${message.attachment}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-200 hover:text-blue-100 text-sm flex items-center"
                                >
                                  <FaPaperclip className="mr-1" />
                                  View Attachment
                                </a>
                              </div>
                            )}
                            <p className={`text-xs text-right ${
                              isCurrentUser 
                                ? 'text-blue-200' 
                                : darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {formatTimestamp(message.createdAt)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Message Input */}
                  <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    {selectedAttachment && (
                      <div className={`mb-2 p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-between`}>
                        <span className="text-sm">{selectedAttachment.name}</span>
                        <button 
                          onClick={() => setSelectedAttachment(null)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    )}
                    <div className="flex">
                      <div className="flex-1 relative">
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className={`w-full pl-4 pr-20 py-2 rounded-lg border resize-none ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                          }`}
                          rows={2}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        ></textarea>
                        <div className="absolute right-2 bottom-2 flex space-x-2">
                          <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <FaPaperclip />
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <FaSmile />
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={handleSendMessage}
                        disabled={(!newMessage.trim() && !selectedAttachment) || sendingMessage}
                        className={`ml-2 px-4 rounded-lg flex items-center justify-center ${
                          (!newMessage.trim() && !selectedAttachment) || sendingMessage
                            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {sendingMessage ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center max-w-md px-4">
                    <FaRegEnvelopeOpen className="mx-auto text-gray-400 text-5xl mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No conversation selected</h3>
                    <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Select a conversation from the list or start a new one
                    </p>
                    <button 
                      onClick={() => setShowComposeModal(true)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      Start New Conversation
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Compose Message Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className={`w-full max-w-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl shadow-2xl`}>
            <div className={`px-6 py-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className="text-xl font-bold">New Message</h3>
              <button 
                onClick={() => setShowComposeModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="participantId">Participant ID</label>
                <input
                  type="text"
                  id="participantId"
                  value={composeData.participantId}
                  onChange={(e) => setComposeData(prev => ({ ...prev, participantId: e.target.value }))}
                  placeholder="Enter participant ID"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="projectId">Project ID</label>
                <input
                  type="text"
                  id="projectId"
                  value={composeData.projectId}
                  onChange={(e) => setComposeData(prev => ({ ...prev, projectId: e.target.value }))}
                  placeholder="Enter project ID"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="initialMessage">Message</label>
                <textarea
                  id="initialMessage"
                  value={composeData.initialMessage}
                  onChange={(e) => setComposeData(prev => ({ ...prev, initialMessage: e.target.value }))}
                  placeholder="Type your message here..."
                  rows={6}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                ></textarea>
              </div>
            </div>
            <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-end space-x-3`}>
              <button 
                onClick={() => setShowComposeModal(false)}
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button 
                onClick={handleComposeSubmit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
              >
                <FaPaperPlane className="mr-2" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InboxPage;










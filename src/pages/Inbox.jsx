import React, { useState } from 'react';
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
  FaTimes
} from 'react-icons/fa';
import { myMessages } from '../components/AllProject';

const InboxPage = ({ darkMode }) => {
  const [conversations, setConversations] = useState(myMessages);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeData, setComposeData] = useState({
    recipient: '',
    subject: '',
    message: ''
  });

  // Demo messages for the selected conversation
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'client',
      content: 'Hi there! Just checking in on the progress of the landing page.',
      timestamp: 'May 7, 10:30 AM',
      read: true
    },
    {
      id: 2,
      from: 'user',
      content: 'Hello! Thanks for checking in. I\'ve completed the header and hero sections and I\'m currently working on the features section. Everything is on track for the deadline.',
      timestamp: 'May 7, 10:45 AM',
      read: true
    },
    {
      id: 3,
      from: 'client',
      content: 'That sounds great! Could you share a preview of what you have so far?',
      timestamp: 'May 7, 11:00 AM',
      read: true
    },
    {
      id: 4,
      from: 'user',
      content: 'Sure thing! I\'ll put together a preview link and share it with you by the end of the day.',
      timestamp: 'May 7, 11:15 AM',
      read: true
    },
    {
      id: 5,
      from: 'client',
      content: 'Perfect! Looking forward to seeing it. Also, I was thinking about adding a testimonials section. What do you think?',
      timestamp: '12:30 PM, Today',
      read: false
    }
  ]);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => {
    return (
      conversation.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Mark conversation as read
  const handleConversationClick = (conversationId) => {
    setSelectedConversation(conversationId);
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === conversationId ? { ...conv, unread: false } : conv
      )
    );
  };

  // Handle new message input
  const handleNewMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Send a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMessageObj = {
      id: messages.length + 1,
      from: 'user',
      content: newMessage,
      timestamp: 'Just now',
      read: true
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  // Handle compose modal input changes
  const handleComposeChange = (e) => {
    const { name, value } = e.target;
    setComposeData(prev => ({ ...prev, [name]: value }));
  };

  // Send a new composed message
  const handleComposeSubmit = () => {
    // Validation
    if (!composeData.recipient || !composeData.subject || !composeData.message) {
      alert('Please fill in all fields');
      return;
    }

    // Here you would typically send the message to your API
    console.log('New message:', composeData);

    // Close the modal and reset form
    setShowComposeModal(false);
    setComposeData({
      recipient: '',
      subject: '',
      message: ''
    });

    // Show success notification
    alert('Message sent successfully!');
  };

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
                    onChange={handleSearchChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-800'
                    }`}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(100%-65px)]">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map(conversation => (
                    <div 
                      key={conversation.id}
                      onClick={() => handleConversationClick(conversation.id)}
                      className={`flex items-start p-4 border-b cursor-pointer ${
                        darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                      } ${selectedConversation === conversation.id ? darkMode ? 'bg-gray-700' : 'bg-blue-50' : ''} ${
                        conversation.unread ? darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="relative mr-3 flex-shrink-0">
                        <img 
                          src={conversation.sender.profile} 
                          alt={conversation.sender.name} 
                          className="w-10 h-10 rounded-full"
                        />
                        {conversation.unread && (
                          <span className="absolute top-0 right-0 w-3 h-3 bg-blue-600 rounded-full border-2 border-white dark:border-gray-800"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className={`font-medium truncate ${conversation.unread ? 'font-semibold' : ''}`}>
                            {conversation.sender.name}
                          </h3>
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {conversation.timestamp}
                          </span>
                        </div>
                        <p className={`text-sm truncate mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'} ${
                          conversation.unread ? darkMode ? 'text-white' : 'text-gray-900' : ''
                        }`}>
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">{conversation.project}</p>
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
              {selectedConversation ? (
                <>
                  {/* Message Header */}
                  <div className={`p-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    {conversations.filter(c => c.id === selectedConversation).map(conversation => (
                      <div key={conversation.id} className="flex items-center">
                        <img 
                          src={conversation.sender.profile} 
                          alt={conversation.sender.name} 
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <h3 className="font-medium">{conversation.sender.name}</h3>
                          <p className="text-xs text-blue-600">{conversation.project}</p>
                        </div>
                      </div>
                    ))}
                    
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
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
                          message.from === 'user' 
                            ? darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white' 
                            : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <p className="text-sm mb-1">{message.content}</p>
                          <p className={`text-xs text-right ${
                            message.from === 'user' 
                              ? 'text-blue-200' 
                              : darkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex">
                      <div className="flex-1 relative">
                        <textarea
                          value={newMessage}
                          onChange={handleNewMessageChange}
                          placeholder="Type your message..."
                          className={`w-full pl-4 pr-10 py-2 rounded-lg border resize-none ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                          }`}
                          rows={2}
                        ></textarea>
                        <div className="absolute right-2 bottom-2 flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <FaPaperclip />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <FaSmile />
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className={`ml-2 px-4 rounded-lg flex items-center justify-center ${
                          !newMessage.trim() 
                            ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        <FaPaperPlane />
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
                <label className="block text-sm font-medium mb-1" htmlFor="recipient">Recipient</label>
                <input
                  type="text"
                  id="recipient"
                  name="recipient"
                  value={composeData.recipient}
                  onChange={handleComposeChange}
                  placeholder="Enter recipient name or email"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={composeData.subject}
                  onChange={handleComposeChange}
                  placeholder="Enter message subject"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={composeData.message}
                  onChange={handleComposeChange}
                  placeholder="Type your message here..."
                  rows={6}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                  }`}
                ></textarea>
              </div>
              
              <div className="mt-2">
                <label className="block text-sm font-medium mb-2">Attachments</label>
                <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
                  darkMode ? 'border-gray-700' : 'border-gray-300'
                }`}>
                  <FaPaperclip className="mx-auto text-gray-400 mb-2" />
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Drag files here or click to browse
                  </p>
                  <input type="file" className="hidden" id="file-upload" multiple />
                  <label
                    htmlFor="file-upload"
                    className={`mt-2 inline-block px-4 py-2 rounded-lg cursor-pointer ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    Select Files
                  </label>
                </div>
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
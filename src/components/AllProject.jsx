// src/data/projectsData.js
export const allProjects = [
  {
    id: 1,
    title: "Frontend Developer Needed",
    description: "Build a landing page using React and Tailwind CSS.",
    budget: "$200 - $400",
    type: "Development",
    duration: "1 week",
    skills: ["React", "Tailwind"],
    client: {
      name: "John Doe",
      profile: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 4.5
    }
  },
  {
    id: 2,
    title: "Backend API Development",
    description: "Create a RESTful API using Node.js and Express for an e-commerce platform.",
    budget: "$500 - $800",
    type: "Development",
    duration: "2 weeks",
    skills: ["Node.js", "Express", "MongoDB"],
    client: {
      name: "Sarah Johnson",
      profile: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4.8
    }
  },
  {
    id: 3,
    title: "Mobile App UI Design",
    description: "Design a modern UI for a fitness tracking mobile application.",
    budget: "$300 - $600",
    type: "Design",
    duration: "1 week",
    skills: ["UI/UX", "Figma", "Mobile Design"],
    client: {
      name: "Michael Brown",
      profile: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 4.2
    }
  },
  {
    id: 4,
    title: "WordPress Website Migration",
    description: "Migrate an existing WordPress website to a new hosting provider with zero downtime.",
    budget: "$150 - $250",
    type: "Development",
    duration: "3 days",
    skills: ["WordPress", "PHP", "Database Migration"],
    client: {
      name: "Emma Wilson",
      profile: "https://randomuser.me/api/portraits/women/4.jpg",
      rating: 4.7
    }
  },
  {
    id: 5,
    title: "SEO Content Writing",
    description: "Create 10 SEO-optimized blog posts for a tech startup.",
    budget: "$250 - $400",
    type: "Content",
    duration: "2 weeks",
    skills: ["SEO", "Content Writing", "Research"],
    client: {
      name: "Robert Martinez",
      profile: "https://randomuser.me/api/portraits/men/5.jpg",
      rating: 4.9
    }
  },
  {
    id: 6,
    title: "E-commerce Product Photography",
    description: "Professional photography for 50 fashion products with editing and retouching.",
    budget: "$450 - $700",
    type: "Design",
    duration: "1 week",
    skills: ["Photography", "Photoshop", "Product Styling"],
    client: {
      name: "Lisa Taylor",
      profile: "https://randomuser.me/api/portraits/women/6.jpg",
      rating: 4.6
    }
  },
  {
    id: 7,
    title: "Django Web Application",
    description: "Develop a customer management system using Django and PostgreSQL.",
    budget: "$600 - $900",
    type: "Development",
    duration: "3 weeks",
    skills: ["Python", "Django", "PostgreSQL"],
    client: {
      name: "David Clark",
      profile: "https://randomuser.me/api/portraits/men/7.jpg",
      rating: 4.3
    }
  },
  {
    id: 8,
    title: "Logo Design for Tech Startup",
    description: "Create a modern, minimalist logo for an AI-based startup.",
    budget: "$180 - $350",
    type: "Design",
    duration: "5 days",
    skills: ["Logo Design", "Illustrator", "Branding"],
    client: {
      name: "Jennifer Lopez",
      profile: "https://randomuser.me/api/portraits/women/8.jpg",
      rating: 4.4
    }
  },
  {
    id: 9,
    title: "Data Analysis and Visualization",
    description: "Analyze sales data and create interactive dashboards using Power BI.",
    budget: "$400 - $700",
    type: "Data",
    duration: "10 days",
    skills: ["Power BI", "Data Analysis", "SQL"],
    client: {
      name: "Thomas White",
      profile: "https://randomuser.me/api/portraits/men/9.jpg",
      rating: 4.8
    }
  },
  {
    id: 10,
    title: "Social Media Marketing Campaign",
    description: "Plan and execute a month-long social media campaign across multiple platforms.",
    budget: "$500 - $800",
    type: "Marketing",
    duration: "1 month",
    skills: ["Social Media", "Content Strategy", "Analytics"],
    client: {
      name: "Amanda Harris",
      profile: "https://randomuser.me/api/portraits/women/10.jpg",
      rating: 4.7
    }
  }
];

// These are the user's active projects
export const myProjects = [
  {
    id: 101,
    title: "E-commerce Website Development",
    client: {
      name: "Tech Solutions Inc.",
      profile: "https://randomuser.me/api/portraits/men/20.jpg",
      rating: 4.9
    },
    status: "In Progress",
    progress: 65,
    startDate: "April 15, 2025",
    deadline: "May 15, 2025",
    budget: "$2,000",
    description: "Building a full-featured e-commerce website with product catalog, shopping cart, and payment processing.",
    milestones: [
      { name: "Requirements Analysis", completed: true },
      { name: "UI/UX Design", completed: true },
      { name: "Frontend Development", completed: true },
      { name: "Backend Development", completed: false },
      { name: "Payment Integration", completed: false },
      { name: "Testing", completed: false },
      { name: "Deployment", completed: false }
    ]
  },
  {
    id: 102,
    title: "Mobile App UI Redesign",
    client: {
      name: "HealthFit",
      profile: "https://randomuser.me/api/portraits/women/22.jpg",
      rating: 4.7
    },
    status: "In Progress",
    progress: 35,
    startDate: "April 25, 2025",
    deadline: "May 20, 2025",
    budget: "$1,500",
    description: "Redesigning the UI for a fitness tracking mobile application to improve user experience and visual appeal.",
    milestones: [
      { name: "Research & Analysis", completed: true },
      { name: "Wireframing", completed: true },
      { name: "UI Design - Home Screen", completed: false },
      { name: "UI Design - Tracking Features", completed: false },
      { name: "UI Design - User Profile", completed: false },
      { name: "Design Review & Revisions", completed: false }
    ]
  },
  {
    id: 103,
    title: "Content Writing for Blog",
    client: {
      name: "Digital Marketing Pro",
      profile: "https://randomuser.me/api/portraits/men/25.jpg",
      rating: 4.8
    },
    status: "In Progress",
    progress: 50,
    startDate: "April 20, 2025",
    deadline: "May 10, 2025",
    budget: "$800",
    description: "Writing 8 SEO-optimized blog posts about digital marketing trends and strategies.",
    milestones: [
      { name: "Topic Research", completed: true },
      { name: "Outline Creation", completed: true },
      { name: "First 4 Articles", completed: true },
      { name: "Remaining 4 Articles", completed: false },
      { name: "Revisions & Edits", completed: false }
    ]
  }
];

// These are the user's submitted proposals
export const myProposals = [
  {
    id: 201,
    projectTitle: "WordPress Website Redesign",
    client: "Marketing Agency XYZ",
    submittedDate: "May 2, 2025",
    status: "Under Review",
    bidAmount: "$1,200",
    proposedDuration: "2 weeks",
    viewed: true
  },
  {
    id: 202,
    projectTitle: "Logo Design for Restaurant",
    client: "FoodieSpot",
    submittedDate: "May 4, 2025",
    status: "Shortlisted",
    bidAmount: "$350",
    proposedDuration: "5 days",
    viewed: true
  },
  {
    id: 203,
    projectTitle: "Social Media Content Creation",
    client: "Fashion Boutique",
    submittedDate: "May 5, 2025",
    status: "Under Review",
    bidAmount: "$600",
    proposedDuration: "10 days",
    viewed: false
  },
  {
    id: 204,
    projectTitle: "Python Script for Data Analysis",
    client: "Research Institute",
    submittedDate: "April 30, 2025",
    status: "Rejected",
    bidAmount: "$800",
    proposedDuration: "1 week",
    viewed: true
  },
  {
    id: 205,
    projectTitle: "Email Newsletter Design",
    client: "Online Retailer",
    submittedDate: "May 3, 2025",
    status: "Under Review",
    bidAmount: "$250",
    proposedDuration: "3 days",
    viewed: false
  }
];

// These are the user's tasks
export const myTasks = [
  {
    id: 301,
    title: "Complete homepage design",
    project: "E-commerce Website Development",
    deadline: "May 10, 2025",
    priority: "High",
    status: "In Progress",
    description: "Design the homepage layout and components for the e-commerce website."
  },
  {
    id: 302,
    title: "Implement product filtering",
    project: "E-commerce Website Development",
    deadline: "May 12, 2025",
    priority: "Medium",
    status: "Not Started",
    description: "Create filtering functionality for products by category, price, and other attributes."
  },
  {
    id: 303,
    title: "Design user profile screen",
    project: "Mobile App UI Redesign",
    deadline: "May 15, 2025",
    priority: "Medium",
    status: "Not Started",
    description: "Create the UI design for the user profile screen with all necessary components."
  },
  {
    id: 304,
    title: "Write blog post on SEO",
    project: "Content Writing for Blog",
    deadline: "May 8, 2025",
    priority: "High",
    status: "In Progress",
    description: "Write a comprehensive blog post about modern SEO strategies for e-commerce."
  },
  {
    id: 305,
    title: "Create payment processing flow",
    project: "E-commerce Website Development",
    deadline: "May 14, 2025",
    priority: "High",
    status: "Not Started",
    description: "Implement the payment processing flow with Stripe integration."
  },
  {
    id: 306,
    title: "Design fitness tracking screen",
    project: "Mobile App UI Redesign",
    deadline: "May 11, 2025",
    priority: "Medium",
    status: "In Progress",
    description: "Create the UI for the main fitness tracking screen with charts and progress indicators."
  },
  {
    id: 307,
    title: "Write blog post on social media",
    project: "Content Writing for Blog",
    deadline: "May 9, 2025",
    priority: "Medium",
    status: "Not Started",
    description: "Write a blog post about effective social media strategies for small businesses."
  }
];

// These are the user's messages
export const myMessages = [
  {
    id: 401,
    sender: {
      name: "John Doe",
      profile: "https://randomuser.me/api/portraits/men/1.jpg",
      isClient: true
    },
    lastMessage: "Hi there! Just checking in on the progress of the landing page.",
    timestamp: "10:30 AM, Today",
    unread: true,
    project: "Frontend Developer Needed"
  },
  {
    id: 402,
    sender: {
      name: "Sarah Johnson",
      profile: "https://randomuser.me/api/portraits/women/2.jpg",
      isClient: true
    },
    lastMessage: "Can we schedule a call to discuss the API requirements in more detail?",
    timestamp: "Yesterday, 3:45 PM",
    unread: true,
    project: "Backend API Development"
  },
  {
    id: 403,
    sender: {
      name: "Michael Brown",
      profile: "https://randomuser.me/api/portraits/men/3.jpg",
      isClient: true
    },
    lastMessage: "I've reviewed your initial designs and have some feedback.",
    timestamp: "Yesterday, 11:20 AM",
    unread: false,
    project: "Mobile App UI Design"
  },
  {
    id: 404,
    sender: {
      name: "Emma Wilson",
      profile: "https://randomuser.me/api/portraits/women/4.jpg",
      isClient: true
    },
    lastMessage: "The migration was successful. Thanks for your help!",
    timestamp: "May 3, 2025",
    unread: false,
    project: "WordPress Website Migration"
  },
  {
    id: 405,
    sender: {
      name: "Tech Solutions Inc.",
      profile: "https://randomuser.me/api/portraits/men/20.jpg",
      isClient: true
    },
    lastMessage: "Can you provide an update on the payment integration?",
    timestamp: "Today, 8:15 AM",
    unread: true,
    project: "E-commerce Website Development"
  }
];

// These are the user's bookmarked projects
export const bookmarkedProjects = [
  {
    id: 11,
    title: "Flutter Mobile App Development",
    description: "Develop a cross-platform mobile app for food delivery using Flutter.",
    budget: "$700 - $1200",
    type: "Development",
    duration: "1 month",
    skills: ["Flutter", "Dart", "Firebase"],
    client: {
      name: "Christopher Young",
      profile: "https://randomuser.me/api/portraits/men/11.jpg",
      rating: 4.5
    },
    bookmarkedOn: "May 2, 2025"
  },
  {
    id: 12,
    title: "UX Research for SaaS Product",
    description: "Conduct user interviews and usability testing for a B2B SaaS platform.",
    budget: "$350 - $650",
    type: "Research",
    duration: "2 weeks",
    skills: ["UX Research", "User Testing", "Reporting"],
    client: {
      name: "Michelle Garcia",
      profile: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 4.9
    },
    bookmarkedOn: "May 4, 2025"
  },
  {
    id: 13,
    title: "Blockchain Smart Contract Development",
    description: "Create and deploy a smart contract for an NFT marketplace on Ethereum.",
    budget: "$800 - $1500",
    type: "Development",
    duration: "3 weeks",
    skills: ["Solidity", "Ethereum", "Web3.js"],
    client: {
      name: "Richard Moore",
      profile: "https://randomuser.me/api/portraits/men/13.jpg",
      rating: 4.6
    },
    bookmarkedOn: "May 1, 2025"
  },
  {
    id: 15,
    title: "Email Marketing Automation",
    description: "Set up automated email marketing campaigns using Mailchimp for an online store.",
    budget: "$200 - $400",
    type: "Marketing",
    duration: "1 week",
    skills: ["Email Marketing", "Mailchimp", "Copywriting"],
    client: {
      name: "Daniel Wright",
      profile: "https://randomuser.me/api/portraits/men/15.jpg",
      rating: 4.7
    },
    bookmarkedOn: "April 29, 2025"
  },
  {
    id: 17,
    title: "Vue.js Dashboard Development",
    description: "Create an analytics dashboard using Vue.js and Chart.js with API integration.",
    budget: "$450 - $800",
    type: "Development",
    duration: "2 weeks",
    skills: ["Vue.js", "Chart.js", "API Integration"],
    client: {
      name: "Brandon Turner",
      profile: "https://randomuser.me/api/portraits/men/17.jpg",
      rating: 4.5
    },
    bookmarkedOn: "May 5, 2025"
  }
];
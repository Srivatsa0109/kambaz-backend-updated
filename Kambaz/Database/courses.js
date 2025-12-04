const courses = [
  {
    "_id": "CS101",
    "name": "Full Stack Development",
    "startDate": "2023-01-10",
    "endDate": "2023-05-15",
    "image": "/images/react.png",
    "department": "D123",
    "credits": 4,
    "description": "Learn how to build modern, responsive web applications usin React.js.Covers component design, state management, and full-stack integration.",
    "modules": [
      {
        "_id": "M101",
        "name": "Objectives",
        "description": "Basic introduction to the course and its objectives.",
        "lessons": [
          { "_id": "L101", "name": "Introduction to Course", "description": "Overview of the course structure and goals." },
          { "_id": "L102", "name": "What is Web Development?", "description": "Introduction to web development and technologies used." },
          { "_id": "L103", "name": "Setting Up the Environment", "description": "Setting up the development environment for full stack projects." }
        ]
      },
      {
        "_id": "M102",
        "name": "Prototyping the React Kambaz UI with HTML",
        "description": "Learn to create UI prototypes using HTML and React components.",
        "lessons": [
          { "_id": "L201", "name": "Learn to Create User Interface", "description": "Building the initial UI structure using HTML." },
          { "_id": "L202", "name": "Keep Working on the Assignment", "description": "Incrementally develop the course assignment." },
          { "_id": "L203", "name": "Deploy the Assignment", "description": "Deploy your first React assignment online." }
        ]
      },
      {
        "_id": "M103",
        "name": "Styling Web Pages with CSS and Bootstrap",
        "description": "Learn CSS fundamentals and Bootstrap styling for responsive design.",
        "lessons": [
          { "_id": "L301", "name": "Introduction to CSS", "description": "Basics of CSS for styling web pages." },
          { "_id": "L302", "name": "Selectors by Tag and ID", "description": "Understanding CSS selectors for targeting elements." },
          { "_id": "L303", "name": "Color and Background Color", "description": "Applying colors, backgrounds, and themes to pages." }
        ]
      }
    ]
  },
  {
    "_id": "CS102",
    "name": "Data Science",
    "startDate": "2023-01-10",
    "endDate": "2023-05-15",
    "image": "/images/ds.jpeg",
    "department": "D123",
    "credits": 3,
    "description": "Explore core data science concepts like data wrangling, visualization, and analysis. Work with real-world datasets and build interactive dashboards using React.",
    "modules": [
      {
        "_id": "M201",
        "name": "Introduction to Data Science",
        "description": "Overview of data science concepts and tools.",
        "lessons": [
          { "_id": "L401", "name": "Data Science Basics", "description": "Understanding what data science is and its applications." },
          { "_id": "L402", "name": "Data Wrangling", "description": "Techniques to clean and prepare datasets." },
          { "_id": "L403", "name": "Data Visualization", "description": "Visualizing data using charts and graphs." }
        ]
      },
      {
        "_id": "M202",
        "name": "Working with Real Datasets",
        "description": "Hands-on exercises with real-world datasets.",
        "lessons": [
          { "_id": "L404", "name": "Loading Datasets", "description": "Learn to load datasets into your environment." },
          { "_id": "L405", "name": "Analyzing Data", "description": "Perform basic data analysis and insights." },
          { "_id": "L406", "name": "Creating Dashboards", "description": "Build interactive dashboards to display data insights." }
        ]
      }
    ]
  },
  {
    "_id": "CS103",
    "name": "Cloud Computing",
    "startDate": "2023-01-10",
    "endDate": "2023-05-15",
    "image": "/images/cc.jpeg",
    "department": "D123",
    "credits": 4,
    "description": "Understand the foundations of cloud computing, including IaaS, PaaS, and SaaS. Learn to deploy and manage cloud-native React applications.",
    "modules": [
      {
        "_id": "M301",
        "name": "Introduction to Cloud Computing",
        "description": "Learn the basics of cloud computing concepts.",
        "lessons": [
          { "_id": "L501", "name": "Cloud Basics", "description": "Understand IaaS, PaaS, SaaS and cloud principles." },
          { "_id": "L502", "name": "Deploying a Cloud App", "description": "Deploy a simple application on a cloud provider." },
          { "_id": "L503", "name": "Managing Cloud Resources", "description": "Learn how to manage and monitor cloud resources." }
        ]
      },
      {
        "_id": "M302",
        "name": "Advanced Cloud Concepts",
        "description": "Deep dive into cloud services and architecture.",
        "lessons": [
          { "_id": "L504", "name": "Scaling Applications", "description": "Techniques to scale cloud applications efficiently." },
          { "_id": "L505", "name": "Security in the Cloud", "description": "Learn best practices for securing cloud apps." },
          { "_id": "L506", "name": "Monitoring and Logging", "description": "Implement monitoring and logging for cloud systems." }
        ]
      }
    ]
  },
  {
    "_id": "CS104",
    "name": "Programming Design Paradigm",
    "startDate": "2023-01-10",
    "endDate": "2023-05-15",
    "image": "/images/pdp.jpg",
    "department": "D134",
    "credits": 3,
    "description": "Dive into software design principles and paradigms such as OOP and functional programming. Focus on scalable architecture in React-based projects.",
    "modules": [
      {
        "_id": "M401",
        "name": "Programming Design Principles",
        "description": "Learn design paradigms including OOP and functional programming.",
        "lessons": [
          { "_id": "L601", "name": "Object-Oriented Programming", "description": "Introduction to OOP concepts and design." },
          { "_id": "L602", "name": "Functional Programming Basics", "description": "Learn functional programming concepts." },
          { "_id": "L603", "name": "Design Patterns", "description": "Introduction to common software design patterns." }
        ]
      }
    ]
  },
  {
    "_id": "CS105",
    "name": "Algorithms",
    "startDate": "2023-01-10",
    "endDate": "2023-05-15",
    "image": "/images/algo.jpeg",
    "department": "D134",
    "credits": 3,
    "description": "Study algorithm design, analysis, and implementation with real-world problems. Enhance efficiency and interactivity in React applications using algorithmic logic.",
    "modules": [
      {
        "_id": "M501",
        "name": "Algorithms and Problem Solving",
        "description": "Study of algorithms, data structures, and problem solving.",
        "lessons": [
          { "_id": "L701", "name": "Introduction to Algorithms", "description": "Basic concepts and analysis of algorithms." },
          { "_id": "L702", "name": "Sorting and Searching", "description": "Learn common sorting and searching algorithms." },
          { "_id": "L703", "name": "Problem Solving Techniques", "description": "Practice problem solving using algorithms." }
        ]
      }
    ]
  },
  {
    "_id": "CS106",
    "name": "Foundations of AI",
    "startDate": "2023-01-10",
    "endDate": "2023-05-15",
    "image": "/images/ai.jpeg",
    "department": "D134",
    "credits": 3,
    "description": "Discover the fundamentals of Artificial Intelligence, including search, logic, and learning. Build simple AI features into React applications.",
    "modules": [
      {
        "_id": "M601",
        "name": "Foundations of Artificial Intelligence",
        "description": "Introduction to AI concepts and techniques.",
        "lessons": [
          { "_id": "L801", "name": "AI Basics", "description": "Understanding AI principles and applications." },
          { "_id": "L802", "name": "Search and Logic", "description": "Introduction to search algorithms and logic reasoning." },
          { "_id": "L803", "name": "Learning Algorithms", "description": "Basics of machine learning algorithms." }
        ]
      }
    ]
  },
  {
    "_id": "CS107",
    "name": "Computer Graphics",
    "startDate": "2023-01-10",
    "endDate": "2023-05-15",
    "image": "/images/graphics.jpeg",
    "department": "Languages",
    "credits": 3,
    "description": "Learn the basics of 2D and 3D graphics programming and rendering. Create interactive visual elements and animations using React and WebGL.",
    "author": "654f9ec2ea7ead465908d1e3",
    "modules": [
      {
        "_id": "M701",
        "name": "Introduction to Computer Graphics",
        "description": "Learn 2D and 3D graphics programming fundamentals.",
        "lessons": [
          { "_id": "L901", "name": "Graphics Basics", "description": "Understand 2D and 3D graphics principles." },
          { "_id": "L902", "name": "Rendering and Animation", "description": "Learn how to render and animate graphics." },
          { "_id": "L903", "name": "Interactive Visuals", "description": "Create interactive visual elements using WebGL and React." }
        ]
      }
    ]
  }
]
export default courses;
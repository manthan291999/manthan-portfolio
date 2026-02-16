export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "contract" | "freelance" | "internship";
  startDate: string;
  endDate: string | "Present";
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  gpa?: string;
  highlights: string[];
  coursework?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  skills: string[];
}

// ─── Experience Data ───
export const experiences: Experience[] = [
  {
    id: "km-steel-ai",
    title: "AI & Data Analytics",
    company: "KM Steel",
    location: "Remote (UK/India)",
    type: "contract",
    startDate: "Dec 2024",
    endDate: "Present",
    description:
      "Driving data-driven decision making for an international steel manufacturing client by building predictive analytics systems and interactive business intelligence dashboards.",
    responsibilities: [
      "Cleaning and processing large-scale manufacturing datasets to improve reporting accuracy and data quality for cross-border operations",
      "Building predictive models using Python (Scikit-learn, Pandas) to forecast sales trends, demand cycles, and track operational performance",
      "Designing and deploying interactive dashboards that visualize KPIs — enabling management to make quicker, evidence-based decisions",
      "Collaborating directly with the operations team to integrate data insights into their daily workflow and supply chain processes",
    ],
    achievements: [
      "Improved reporting accuracy by 40% through automated data cleaning pipelines",
      "Built sales forecasting model with 89% prediction accuracy across quarterly projections",
      "Reduced manual reporting time by 70% with automated KPI dashboards",
    ],
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Power BI", "PostgreSQL", "Matplotlib", "Jupyter"],
  },
  {
    id: "freelance-developer",
    title: "Full-Stack & Automation Developer",
    company: "Freelance",
    location: "Remote",
    type: "freelance",
    startDate: "2019",
    endDate: "Present",
    description:
      "Delivering end-to-end web solutions and automation tools for diverse clients — from e-commerce platforms to browser automation scripts that streamline repetitive workflows.",
    responsibilities: [
      "Delivering custom full-stack web solutions for clients, including a complete e-commerce platform for Indian Sarees with payment integration and inventory management",
      "Building browser automation scripts (Web Task Autopilot) using Selenium and Python to handle form-filling, data extraction, and repetitive web tasks",
      "Managing the full project lifecycle — from gathering client requirements and system design to development, testing, deployment, and hosting",
      "Providing ongoing maintenance, performance optimization, and feature enhancements for client applications",
    ],
    achievements: [
      "Delivered 15+ client projects across e-commerce, automation, and web applications",
      "Built Web Task Autopilot tool saving clients 20+ hours/week on repetitive browser tasks",
      "Maintained 100% client satisfaction rate with repeat business from multiple clients",
    ],
    technologies: ["React", "Next.js", "Node.js", "Python", "Selenium", "TypeScript", "MongoDB", "AWS"],
  },
  {
    id: "silver-touch-intern",
    title: "Android Development Intern",
    company: "Silver Touch Technologies Ltd.",
    location: "Ahmedabad, India",
    type: "internship",
    startDate: "Jan 2022",
    endDate: "Apr 2022",
    description:
      "Developed a real-time messaging application from scratch using the Android SDK, building both client-side UI and cloud-based backend infrastructure.",
    responsibilities: [
      "Developed a real-time chat application using the Android SDK and Java with Material Design UI components",
      "Architected and built the backend with Firebase Realtime Database and Express.js to handle message transmission, user authentication, and push notifications",
      "Debugged and resolved complex issues related to real-time database synchronization across multiple devices and network conditions",
      "Implemented user presence indicators, typing status, and message read receipts for enhanced UX",
    ],
    achievements: [
      "Delivered production-ready chat app supporting 100+ concurrent users with real-time sync",
      "Achieved sub-200ms message delivery latency across different network conditions",
      "Received commendation from senior engineers for clean code architecture and documentation",
    ],
    technologies: ["Java", "Android SDK", "Firebase", "Express.js", "Node.js", "REST APIs", "Git"],
  },
  {
    id: "cad-desk-intern",
    title: "Python Programming Intern",
    company: "CAD DESK",
    location: "Jaipur, India",
    type: "internship",
    startDate: "June 2021",
    endDate: "July 2021",
    description:
      "Completed intensive Python training covering core programming methodologies, object-oriented design, and practical automation — culminating in hands-on project delivery.",
    responsibilities: [
      "Mastered Python core concepts including OOP, file handling, exception management, and module development",
      "Built small automation projects for data processing and file management tasks",
      "Delivered all assigned projects on deadline with clean, documented code",
      "Gained foundational experience in scripting and problem-solving using Python",
    ],
    achievements: [
      "Completed all training modules with distinction ahead of schedule",
      "Built a file organizer automation tool that categorizes and sorts 1000+ files by type",
      "Earned Python programming certification from CAD DESK",
    ],
    technologies: ["Python", "Automation", "OOP", "File Handling", "Git"],
  },
];

// ─── Education Data ───
export const education: Education[] = [
  {
    id: "msc-ai-essex",
    degree: "Master of Science (MSc)",
    field: "Artificial Intelligence",
    institution: "University of Essex",
    location: "United Kingdom",
    startYear: "2023",
    endYear: "2024",
    highlights: [
      "Specialized in advanced AI/ML techniques including deep learning, reinforcement learning, and NLP",
      "Completed dissertation on applied machine learning for real-world data analytics and prediction systems",
      "Gained hands-on experience with large-scale model training, evaluation, and deployment strategies",
      "Collaborated on group research projects involving computer vision and natural language understanding",
    ],
    coursework: [
      "Deep Learning & Neural Networks",
      "Natural Language Processing",
      "Computer Vision",
      "Reinforcement Learning",
      "Big Data & Text Analytics",
      "Intelligent Systems & Robotics",
      "Research Methods in AI",
      "Applied Machine Learning",
    ],
  },
  {
    id: "be-it-ait",
    degree: "Bachelor of Engineering (BE)",
    field: "Information Technology",
    institution: "Ahmedabad Institute of Technology",
    location: "Gujarat, India",
    startYear: "2018",
    endYear: "2022",
    highlights: [
      "Built strong foundations in software engineering, data structures, algorithms, and system design",
      "Developed multiple full-stack projects including Android apps and web applications as part of coursework",
      "Active participant in coding competitions, hackathons, and tech community events",
      "Completed capstone project on real-time communication systems using Firebase and Android SDK",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Computer Networks",
      "Operating Systems",
      "Software Engineering",
      "Web Technologies",
      "Mobile Application Development",
    ],
  },
];

// ─── Certifications Data ───
export const certifications: Certification[] = [
  {
    id: "aws-cloud-practitioner",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    skills: ["AWS", "Cloud Architecture", "EC2", "S3", "Lambda"],
  },
  {
    id: "deep-learning-spec",
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI (Coursera)",
    date: "2023",
    skills: ["Neural Networks", "CNNs", "RNNs", "Transformers", "TensorFlow"],
  },
  {
    id: "mlops-spec",
    name: "Machine Learning Engineering for Production (MLOps)",
    issuer: "DeepLearning.AI (Coursera)",
    date: "2023",
    skills: ["MLflow", "Model Monitoring", "Data Pipelines", "Model Serving"],
  },
  {
    id: "docker-kubernetes",
    name: "Docker & Kubernetes: The Practical Guide",
    issuer: "Udemy",
    date: "2023",
    skills: ["Docker", "Kubernetes", "Container Orchestration", "Helm"],
  },
  {
    id: "fullstack-react",
    name: "Full-Stack Web Development with React",
    issuer: "The Hong Kong University of Science and Technology (Coursera)",
    date: "2022",
    skills: ["React", "Node.js", "Express", "MongoDB"],
  },
];

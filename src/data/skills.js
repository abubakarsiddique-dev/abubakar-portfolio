/**
 * @typedef {Object} SkillItem
 * @property {string} name - Name of the technical competency or tool.
 * @property {string} level - Classification level or role category.
 * @property {string} description - Brief summary of implementation scope.
 * 
 * @typedef {Object} SkillCategory
 * @property {string} id - Unique category identifier.
 * @property {string} title - Human-readable category title.
 * @property {string} iconName - Icon reference from react-icons.
 * @property {string} description - Explanatory category description.
 * @property {SkillItem[]} skills - Array of competencies belonging to this category.
 */

/** @type {SkillCategory[]} */
export const skillCategories = [
  {
    id: "mobile",
    title: "Mobile Development",
    iconName: "FaMobileAlt",
    description: "Core cross-platform engineering with Flutter & Dart.",
    skills: [
      { name: "Flutter", level: "Primary Framework", description: "Cross-platform mobile framework for iOS & Android" },
      { name: "Dart", level: "Primary Language", description: "Object-oriented language optimized for client UIs" },
      { name: "Responsive UI", level: "Implementation", description: "Layouts adapting seamlessly to all screen sizes" },
      { name: "State Management", level: "Architecture", description: "Provider, Riverpod, and Bloc state patterns" }
    ]
  },
  {
    id: "backend",
    title: "Backend & Services",
    iconName: "FaServer",
    description: "Cloud infrastructure, database modeling, and authentication.",
    skills: [
      { name: "Firebase", level: "Cloud Platform", description: "Core suite for mobile application backends" },
      { name: "Firestore", level: "Database", description: "NoSQL document database for real-time data" },
      { name: "Firebase Auth", level: "Authentication", description: "Email/Password, Google Sign-In, and OAuth flow" },
      { name: "Firebase Storage", level: "Cloud Storage", description: "Secure image & file upload management" },
      { name: "FCM", level: "Messaging", description: "Firebase Cloud Messaging for push notifications" }
    ]
  },
  {
    id: "integration",
    title: "Integration & Networking",
    iconName: "FaPlug",
    description: "Connecting mobile UIs with web services and network protocols.",
    skills: [
      { name: "REST APIs", level: "Networking", description: "HTTP client operations, JSON parsing, and handling" },
      { name: "Dio", level: "HTTP Client", description: "Advanced Dart HTTP package for interceptors & API calls" }
    ]
  },
  {
    id: "realtime",
    title: "Real-Time Features",
    iconName: "FaBolt",
    description: "Powering instant messaging and live media streams.",
    skills: [
      { name: "Firebase Streams", level: "Real-Time Sync", description: "Live database state listeners & reactive UI updates" },
      { name: "Agora", level: "RTC Stream", description: "Real-time voice and video streaming integration" }
    ]
  },
  {
    id: "development",
    title: "Software Engineering & Tools",
    iconName: "FaCodeBranch",
    description: "Foundational software engineering principles and workflows.",
    skills: [
      { name: "Git", level: "Version Control", description: "Branching, committing, and code history management" },
      { name: "GitHub", level: "Collaboration", description: "Remote repository hosting, PRs, and code tracking" },
      { name: "Debugging", level: "Problem Solving", description: "DevTools profiling, stack trace analysis, and bug fixing" },
      { name: "UI/UX Implementation", level: "Frontend Craft", description: "Transforming design wireframes into responsive code" },
      { name: "Software Architecture", level: "Design Pattern", description: "Clean architecture, modular folders, and separation of concerns" }
    ]
  }
];

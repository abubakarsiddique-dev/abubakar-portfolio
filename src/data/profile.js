import { socialLinks } from './socialLinks';
import profileImg from '../assets/images/profile.png';
import { projectsData } from './projects';

/**
 * @typedef {Object} LearningTopic
 * @property {string} title - Topic or framework name.
 * @property {string} detail - Description of focus area.
 *
 * @typedef {Object} StatItem
 * @property {string} label - Metric label.
 * @property {number} count - Metric numeric value.
 * @property {string} suffix - Metric suffix.
 * @property {string} detail - Brief context of the statistic.
 *
 * @typedef {Object} JourneyItem
 * @property {string} period - Time period or stage badge.
 * @property {string} role - Role or focus title.
 * @property {string} institution - Educational or project setting.
 * @property {string} description - Description of achievements.
 * @property {string[]} skills - Array of relevant skills or practices.
 *
 * @typedef {Object} BuildStep
 * @property {string} step - Step numbering.
 * @property {string} title - Step title.
 * @property {string} description - Step methodology description.
 *
 * @typedef {Object} ProfileData
 * @property {string} name - Developer's full name.
 * @property {string} shortName - Monogram or initials.
 * @property {string} title - Professional headline.
 * @property {string} status - Current availability status.
 * @property {string} education - Academic degree.
 * @property {string} email - Primary contact email.
 * @property {string} location - Developer's location.
 * @property {string} profileImage - Profile portrait asset.
 * @property {string} heroBadge - Hero banner badge.
 * @property {string} heroHeading - Primary hero heading.
 * @property {string} heroSubheading - Subheading.
 * @property {string} heroDescription - Introductory pitch.
 * @property {string[]} aboutText - Detailed about paragraphs.
 * @property {{ heading: string, bullets: string[] }} philosophy - Engineering principles.
 * @property {LearningTopic[]} currentlyLearning - Continuous learning topics.
 * @property {StatItem[]} stats - Profile summary statistics.
 * @property {JourneyItem[]} journey - Educational and practical timeline.
 * @property {BuildStep[]} howIBuild - Engineering methodology steps.
 * @property {typeof socialLinks} socials - Connected social profile endpoints.
 */

/** @type {ProfileData} */
export const profileData = {
  name: "Abubakar Siddique",
  shortName: "AS",
  title: "Flutter App Developer & Firebase Engineer",
  status: "Available for Freelance Projects",
  education: "BS Software Engineering",
  email: socialLinks.email,
  location: "Pakistan",
  profileImage: profileImg,
  
  heroBadge: "From idea → App Store",
  heroHeading: "Production-ready Flutter apps, from idea to App Store.",
  heroSubheading: "Flutter apps with Firebase backends for real-world products",
  heroDescription: "I help founders and teams turn product ideas into reliable, user-friendly mobile apps with Flutter, Firebase, and REST APIs — built to ship, scale, and solve real problems.",
  
  aboutText: [
    "I build production-ready cross-platform mobile apps that turn ideas into useful products. Using Flutter and Dart, I create polished interfaces, dependable flows, and maintainable foundations for launch.",
    "From authentication and real-time data to notifications and REST API integrations, I connect the pieces behind the experience with Firebase, Firestore, Provider, and clean architecture patterns.",
    "My work is focused on solving the details that make an app dependable — from preventing unintended refreshes in ZiloLive to designing multi-role Firestore security rules for Mentora and the School Management System.",
    "Alongside client-focused product work, I am completing a BS in Software Engineering. That academic foundation strengthens my approach to architecture, testing, collaboration, and continuous improvement."
  ],
  
  philosophy: {
    heading: "My Engineering Mindset",
    bullets: [
      "Understand domain & data flows first — as learned while engineering Firestore stream listeners for Mentora.",
      "Decouple state logic from widget trees to prevent RenderViewport clipping and unnecessary rebuilds.",
      "Test edge cases early — handling network timeouts, FCM registration tokens, and role-based access rules."
    ]
  },

  currentlyLearning: [
    { title: "Riverpod & BLoC", detail: "Advanced Flutter State Management" },
    { title: "Clean Architecture", detail: "Repository Pattern & Data Decoupling" },
    { title: "Node.js & Express", detail: "Backend API Integration" }
  ],
  
  stats: [
    {
      label: "Featured Apps",
      count: projectsData.length,
      suffix: " Projects",
      detail: "Flutter & Mobile Projects"
    },
    {
      label: "Firebase Tech",
      count: 5,
      suffix: "+ Services",
      detail: "Auth, Firestore, Storage & FCM"
    },
    {
      label: "Core Stack",
      count: 7,
      suffix: "+ Core Tools",
      detail: "Flutter, Dart, Firebase, REST APIs"
    },
    {
      label: "Access Roles",
      count: 4,
      suffix: " Access Levels",
      detail: "Parent, Student, Teacher & Admin"
    }
  ],
  
  journey: [
    {
      period: "Academic Foundation",
      role: "Software Engineering Student",
      institution: "BS Software Engineering Program",
      description: "Building strong fundamentals in software architecture, object-oriented design, data structures, requirements engineering, database management, and software quality.",
      skills: ["Software Architecture", "OOP", "Data Structures", "Requirements", "Database Design"]
    },
    {
      period: "Mobile Specialization",
      role: "Flutter Developer",
      institution: "Hands-on Mobile Engineering",
      description: "Specializing in cross-platform mobile engineering with Flutter & Dart. Crafting responsive widget interfaces, managing app state, and creating reusable component architectures.",
      skills: ["Flutter", "Dart", "State Management", "Widget Architecture", "Responsive UI"]
    },
    {
      period: "Full-Stack Mobile Apps",
      role: "Real-World Application Development",
      institution: "Building & Refining Complete Apps",
      description: "Developing end-to-end mobile applications like Mentora, ZiloLive, and a School Management System, connecting Flutter frontends with Firebase, APIs, and real-time features.",
      skills: ["Firebase Auth", "Firestore", "REST APIs", "Real-Time Chat", "Git & GitHub"]
    }
  ],

  howIBuild: [
    {
      step: "01",
      title: "Understand",
      description: "Understand the core problem, target audience, functional requirements, and application goals before writing code."
    },
    {
      step: "02",
      title: "Design",
      description: "Plan the UI/UX layout, widget hierarchy, state management approach, and database/API data flows."
    },
    {
      step: "03",
      title: "Build",
      description: "Develop the application using Flutter & Dart, integrating Firebase services, REST APIs, and clean architecture patterns."
    },
    {
      step: "04",
      title: "Improve",
      description: "Test functionality, debug edge cases, optimize performance frame rates, and continuously refine the user experience."
    }
  ],
  
  socials: socialLinks
};

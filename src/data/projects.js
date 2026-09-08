import ziloliveImg from '../assets/images/zilolive.png';
import mentoraImg from '../assets/images/mentora_real.png';
import schoolSystemImg from '../assets/images/edu_manage_mockup.png';

export const projectsData = [
  {
    id: "mentora",
    projectType: "full-stack",
    title: "Mentora",
    tagline: "Campus Peer Learning & Skill Exchange Platform",
    category: "Education & Peer Learning",
    badge: "Mobile Platform",
    image: mentoraImg,
    technologies: ["Flutter", "Agora RTC (Video)", "Cloud Firestore", "Firebase Auth", "Provider", "Google Sign-In"],
    shortDescription: "A Flutter mobile application designed to connect university students for peer tutoring, skill exchanges, and study requests backed by Firebase services.",
    features: [
      "1-on-1 HD real-time video consultation sessions powered by Agora RTC",
      "Firebase Auth & Google Sign-In secure onboarding flow",
      "Student profiles with customizable skills offered & requested",
      "Real-time direct messaging and session proposal pipeline"
    ],
    githubUrl: "https://github.com/mrabukust-cmd/Mentora",
    liveUrl: "",
    demoType: "apk", // Options: "live" | "video" | "apk" | "none"
    githubStatus: "public", // Options: "public" | "private" | "case-study"
    githubStatusNote: "Public Repository",
    proofPoints: [
      "2 sign-in paths: email and Google",
      "4 core flows: profiles, skills, matching, requests",
      "Firestore + Storage integration"
    ],
    modalData: {
      problem: "In campus peer learning data flows, skills added by users would save to backend records but fail to reflect dynamically on MySkillsScreen due to UI state sync mismatches and initial Firestore security permission issues.",
      solution: "Resolved security rules and re-architected state listener flows across Firebase Auth, Cloud Firestore, and Provider so user skills, profile updates, and study requests refresh reliably.",
      result: "Skills, profile updates, and study requests now have a reliable refresh path across the main peer-learning flows.",
      challenges: [
        "Debugging Firestore permission-denied security rule errors during initial user profile creation.",
        "Fixing state management flow so newly added user skills render immediately in MySkillsScreen.",
        "Structuring user profile documents and peer connection requests in Cloud Firestore."
      ],
      contribution: "Developed Flutter frontend modules including authentication, profile management, skill listing UI, matching feed, connection requests, and Firebase service integration."
    },
    contribution: {
      role: "Flutter UI Developer",
      summary: "Contributed to the Flutter user interface as part of a cross-functional team.",
      responsibilities: [
        "Built and refined Flutter UI screens and reusable interface components.",
        "Translated product requirements into clear, consistent mobile user flows.",
        "Collaborated with the Node.js and MongoDB team members during integration."
      ],
      team: "Team project"
    }
  },
  {
    id: "zilolive",
    projectType: "contributed",
    title: "ZiloLive",
    tagline: "Live Streaming & Social Interaction App",
    category: "Social & Media",
    badge: "Live Media Project",
    image: ziloliveImg,
    technologies: ["Flutter", "Node.js", "MongoDB"],
    shortDescription: "A Flutter social and live-streaming client featuring real-time stream interactions, ranking leaderboards, virtual gifting, coin wallet management, and user leveling.",
    features: [
      "Live stream view layer with ranking leaderboards & coin wallet state",
      "Deep pull-to-refresh profile gesture matching YouTube & TikTok UX",
      "VIP membership status, user levels, and Boost Now ranking persistence",
      "FCM token lifecycle handling & REST API integration with timeout fallbacks"
    ],
    githubUrl: "",
    liveUrl: "",
    demoType: "video",
    githubStatus: "private",
    githubStatusNote: "Private Client Repository",
    proofPoints: [
      "4 live/social systems: streams, rankings, wallet, levels",
      "Deep pull-to-refresh interaction tuned for intentional use",
      "REST API timeouts and FCM edge cases handled"
    ],
    modalData: {
      problem: "Over-sensitive default pull-to-refresh gestures triggered accidental profile reloads during routine scrolling, while dynamic layout feeds triggered RenderViewport/RenderSliver runtime errors and network timeouts.",
      solution: "Customized pull gesture thresholds to require an intentional deep pull (matching YouTube/TikTok profile UX), fixed sliver viewport constraints, and stabilized Boost Now ranking and coin deduction persistence.",
      result: "Profile refresh became intentional instead of accidental, while ranking, wallet deduction, and FCM edge cases were stabilized.",
      challenges: [
        "Resolving RenderViewport and RenderSliver layout errors during dynamic widget rendering.",
        "Re-engineering profile pull-to-refresh to prevent accidental triggers on minor vertical swipes.",
        "Simulating Boost Now ranking with local wallet state, coin deduction, and Booster badge updates.",
        "Handling backend REST API network timeouts and FCM token registration edge cases."
      ],
      contribution: "Contributed across the Flutter UI and backend integration, with focused work on resolving a live-streaming issue."
    },
    contribution: {
      role: "Flutter UI & Backend Contributor",
      summary: "Worked on both the Flutter interface and selected backend tasks in a team-built live-streaming product.",
      responsibilities: [
        "Implemented and refined Flutter UI for live-streaming and social interaction flows.",
        "Contributed to Node.js and MongoDB backend work where required.",
        "Investigated and helped resolve a live-streaming issue affecting the product experience."
      ],
      team: "Team project"
    }
  },
  {
    id: "copono",
    projectType: "contributed",
    title: "Copono",
    tagline: "Collaborative Product Interface",
    category: "Team Product",
    badge: "Team Project",
    image: null,
    technologies: ["Flutter", "Node.js", "MongoDB"],
    shortDescription: "A team-built product where I focused on designing and implementing the Flutter user interface.",
    features: [
      "Flutter UI implementation across the product experience",
      "Reusable interface components and consistent screen layouts",
      "Team collaboration around Node.js and MongoDB integration"
    ],
    githubUrl: "",
    liveUrl: "",
    demoType: "none",
    githubStatus: "private",
    githubStatusNote: "Private Team Repository",
    proofPoints: [
      "Flutter UI contribution",
      "Reusable interface patterns",
      "Node.js and MongoDB integration context"
    ],
    modalData: {
      problem: "The product needed a consistent and usable mobile interface that could connect cleanly with the team’s backend work.",
      solution: "Implemented the Flutter UI and collaborated with the backend contributors to keep the interface aligned with the product requirements.",
      result: "Delivered a consistent mobile interface that could be integrated with the team’s Node.js and MongoDB backend work.",
      challenges: [
        "Translating product requirements into practical Flutter screens.",
        "Maintaining consistent UI patterns across the application.",
        "Coordinating frontend work with Node.js and MongoDB integration."
      ],
      contribution: "Focused on the Flutter UI as part of a team project, building the interface and collaborating around backend integration."
    },
    contribution: {
      role: "Flutter UI Developer",
      summary: "Focused on the mobile user interface as part of a team project.",
      responsibilities: [
        "Built the Flutter UI and translated requirements into usable screens.",
        "Created consistent layouts and reusable interface patterns.",
        "Worked with the team during Node.js and MongoDB integration."
      ],
      team: "Team project"
    }
  },
  {
    id: "veralive",
    projectType: "contributed",
    title: "VeraLive",
    tagline: "Flutter Application Experience",
    category: "Team Product",
    badge: "Team Project",
    image: null,
    technologies: ["Flutter"],
    shortDescription: "A team-built Flutter application where I contributed to the user interface and mobile experience.",
    features: [
      "Flutter UI implementation",
      "Responsive mobile screen layouts",
      "Consistent interface styling across the application"
    ],
    githubUrl: "",
    liveUrl: "",
    demoType: "none",
    githubStatus: "private",
    githubStatusNote: "Private Team Repository",
    proofPoints: [
      "Flutter UI contribution",
      "Responsive mobile layouts",
      "Consistent styling across screens"
    ],
    modalData: {
      problem: "The product needed a clear and consistent Flutter interface for its mobile users.",
      solution: "Contributed to the Flutter UI and helped shape a cohesive mobile experience within the team workflow.",
      result: "Improved consistency across the application’s mobile screens and interaction patterns.",
      challenges: [
        "Implementing UI screens from product requirements.",
        "Keeping layouts consistent across different mobile screen sizes.",
        "Coordinating interface decisions with the wider project team."
      ],
      contribution: "Worked on the Flutter UI as part of a team project, contributing to the application’s mobile interface and visual consistency."
    },
    contribution: {
      role: "Flutter UI Developer",
      summary: "Contributed to the Flutter user interface in a collaborative team project.",
      responsibilities: [
        "Implemented Flutter UI screens and mobile layouts.",
        "Helped maintain consistent styling and interaction patterns.",
        "Collaborated with the team to refine the application experience."
      ],
      team: "Team project"
    }
  },
  {
    id: "legalace",
    projectType: "contributed",
    title: "Legalace",
    tagline: "Administrative Management Panel",
    category: "Business Operations",
    badge: "Admin Panel",
    image: null,
    technologies: ["React.js", "Firebase"],
    shortDescription: "An administrative panel where I focused on building the management interface for the product team.",
    features: [
      "Admin panel interface implementation",
      "Management-focused layouts and navigation",
      "Collaborative delivery within a team project"
    ],
    githubUrl: "",
    liveUrl: "",
    demoType: "none",
    githubStatus: "private",
    githubStatusNote: "Private Team Repository",
    proofPoints: [
      "React.js admin panel contribution",
      "Management-focused navigation",
      "Firebase-backed product context"
    ],
    modalData: {
      problem: "The project needed a focused administrative interface for managing the product’s operational workflows.",
      solution: "Built the admin panel interface and organized the management experience around the project requirements.",
      result: "Provided the product team with a focused management interface for its operational workflows.",
      challenges: [
        "Translating administrative requirements into a practical panel layout.",
        "Organizing navigation and management-focused screens.",
        "Coordinating the panel work with the wider project team."
      ],
      contribution: "Built the admin panel as part of a team project, focusing on the management interface and its user experience."
    },
    contribution: {
      role: "Admin Panel Developer",
      summary: "Built the administrative panel as part of a collaborative team project.",
      responsibilities: [
        "Implemented the admin panel interface.",
        "Structured management-focused screens and navigation.",
        "Collaborated with the team to align the panel with project requirements."
      ],
      team: "Team project"
    }
  },
  {
    id: "school-management-system",
    projectType: "full-stack",
    title: "School Management System",
    tagline: "Multi-Role Academic Portal & Attendance Tracker",
    category: "Education & Peer Learning",
    badge: "Full-Stack Project",
    image: schoolSystemImg,
    technologies: ["Flutter", "Riverpod", "Node.js", "Express.js", "REST APIs", "JWT Auth"],
    shortDescription: "A school academic platform connecting Parents, Students, Teachers, and Admins to digitize attendance marking, grade tracking, and extra-class schedule visibility.",
    features: [
      "4 primary access roles: Parent, Student, Teacher, and Admin",
      "Daily attendance tracking & grade management operated by Teachers",
      "Parent visibility into daily attendance and special/extra class schedules",
      "Student grade and attendance portal dashboards"
    ],
    githubUrl: "https://github.com/mrabukust-cmd/EduManage",
    liveUrl: "",
    demoType: "apk",
    githubStatus: "public",
    githubStatusNote: "Public Repository",
    proofPoints: [
      "4 access roles: Parent, Student, Teacher, Admin",
      "3 workflows: attendance, grades, schedules",
      "Solo full-stack mobile implementation"
    ],
    modalData: {
      problem: "Parents lacked direct visibility into their child's actual daily school attendance and extra class schedules, having to rely solely on unverified verbal reports from students.",
      solution: "Built a unified 4-role portal enabling teachers to log attendance and grades directly, providing parents and students with real-time schedule visibility.",
      result: "Created one role-aware portal connecting attendance, grades, and schedules for Parents, Students, Teachers, and Admins.",
      challenges: [
        "Structuring role-restricted data models across 4 distinct user access levels (Parent, Student, Teacher, Admin).",
        "Ensuring teacher-entered attendance records and grades propagate accurately to relevant parents and students.",
        "Coupling business logic closely with UI widgets during initial build (an architectural tradeoff to decouple in future iterations)."
      ],
      contribution: "Sole developer responsible for full project execution: designed mobile UI layouts, backend Firebase integration, role-based access rules, attendance workflows, and grade dashboards."
    },
    contribution: {
      role: "Full-Stack Mobile Developer",
      summary: "Led the complete implementation of the school management application.",
      responsibilities: [
        "Designed the mobile UI and role-specific dashboards.",
        "Integrated Firebase services and role-based access rules.",
        "Built attendance, grade, and schedule workflows."
      ],
      team: "Solo project"
    }
  }
];

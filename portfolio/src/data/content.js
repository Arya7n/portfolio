export const profile = {
  name: "Aryan",
  title: "Software Engineer",
  focus: "Full Stack · Backend-focused",
  email: "aryan11jr@gmail.com",
  phone: "+91 78763 89507",
  location: "Mohali, Punjab",
  summary:
    "Software Engineer with 1.5+ years of experience building scalable backend systems and modern web apps using Node.js, TypeScript, NestJS, React, and Next.js. Experienced in microservices, WebSockets, Redis, Docker, PostgreSQL, and MongoDB — focused on backend architecture, performance, and shipping real products.",
  links: {
    github: "https://github.com/Arya7n",
    linkedin: "https://www.linkedin.com/in/aryan-46191b265",
    resume: "/resume.pdf",
  },
};

export const education = {
  school: "CGC Landran, Mohali",
  degree: "B.Tech in Information Technology",
  period: "June 2021 — June 2025",
  detail: "CGPA 7.5 / 10",
};

export const experience = [
  {
    company: "PSQUARE COMPANY",
    role: "Full Stack Developer",
    period: "Dec 2025 — Present",
    highlights: [
      "Designed and developed scalable backend services using Node.js, TypeScript, and microservices architecture.",
      "Implemented Docker, Redis, and BullMQ for containerization, caching, and background processing.",
      "Integrated AWS (S3, SES) for storage and email workflows.",
      "Optimized MongoDB aggregation pipelines, improving query performance by 40%.",
      "Developed key features including notification and real-time chat services.",
      "Built and optimized REST APIs with efficient architecture, reducing response time and improving performance by 30–40%.",
    ],
  },
  {
    company: "NetscapeLabs Infotech Pvt. Ltd.",
    role: "Full Stack Developer (Trainee)",
    period: "Jun 2025 — Nov 2025",
    highlights: [
      "Built and deployed 2 live production applications using Next.js, React.js, and Node.js.",
      "Developed reusable UI components using Tailwind CSS and Shadcn, improving code reusability and maintainability.",
      "Implemented real-time features like live notifications and updates using Socket.io.",
      "Integrated REST APIs and Firebase for authentication, data storage, and analytics.",
      "Collaborated with backend and UI teams to optimize page load performance by 30% and enhance SEO.",
    ],
  },
];

export const projects = [
  {
    title: "Cursor Tracker",
    description:
      "Company hub for Cursor usage — a desktop/CLI agent on each PC reads local Cursor data and reports only aggregates (plan, %, billing cycle) to a Next.js dashboard on Neon Postgres. Cursor login tokens never leave the machine.",
    tech: [
      "TypeScript",
      "Next.js",
      "Electron",
      "Node.js",
      "PostgreSQL",
      "Neon",
      "Vercel",
    ],
    github: "https://github.com/Arya7n/cursor-tracker",
    live: "https://cursor-tracker-nu.vercel.app",
    featured: true,
  },
  {
    title: "DevTunnel",
    description:
      "Self-hosted ngrok-style tunneling platform — secure public access to local apps via CLI and web dashboard. Real-time HTTP tunneling over WebSockets, JWT + API key auth, NestJS/PostgreSQL/Redis backend, and live traffic inspection.",
    tech: [
      "TypeScript",
      "NestJS",
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Docker",
      "WebSockets",
    ],
    github: "https://github.com/Arya7n/devtunnel",
    live: null,
    featured: true,
  },
  {
    title: "APEX",
    description:
      "Premium motorcycle intelligence platform — browse machines, compare specs, and explore a modern product experience built for riders and enthusiasts.",
    tech: ["TypeScript", "React", "Next.js", "Tailwind"],
    github: "https://github.com/Arya7n/APEX",
    live: "https://apex-bikes.vercel.app/",
    featured: true,
  },
  {
    title: "JobMate",
    description:
      "Local-first Chrome extension that stores your profile and resumes on-device, autofills job applications with confidence-based field detection, and tracks submissions — no backend or analytics.",
    tech: ["TypeScript", "React", "WXT", "Chrome Extension", "IndexedDB"],
    github: "https://github.com/Arya7n/JobMate",
    live: null,
    featured: true,
  },
  {
    title: "Time Machine",
    description:
      "Immersive interactive site that travels through time — drag the timeline, scroll, or use the keys and the entire interface morphs with the year.",
    tech: ["TypeScript", "React", "Three.js", "GSAP", "Framer Motion"],
    github: "https://github.com/Arya7n/time-travel",
    live: "https://time-travel-sage.vercel.app",
    featured: true,
  },
  {
    title: "Portfolio OS",
    description:
      "Interactive portfolio that boots as a desktop OS — windowed apps for experience, projects, and skills, a working terminal, recruiter mode, and Three.js wallpaper scenes.",
    tech: ["TypeScript", "React", "Three.js", "Zustand", "Vite"],
    github: "https://github.com/Arya7n/portfolio-Os",
    live: "https://portfolioos-phi.vercel.app",
    featured: true,
  },
  {
    title: "CMIYGL",
    description:
      "Make your own Call Me If You Get Lost passport ID — upload a photo, add your name, and download a high-res card.",
    tech: ["TypeScript", "React", "Vite", "Tailwind"],
    github: "https://github.com/Arya7n/CMIYGL",
    live: "https://cmiygl-arya7n.vercel.app",
    featured: false,
  },
  {
    title: "Cartify",
    description:
      "Full-stack e-commerce platform with JWT auth, Razorpay payments, admin dashboard, invoice generation, and role-based access.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT", "Razorpay"],
    github: "https://github.com/Arya7n/cartify",
    live: "https://cartifymern.vercel.app/",
    featured: true,
  },
  {
    title: "One Piece",
    description:
      "Three.js One Piece–inspired open world — play as Luffy and Zoro, explore islands, swim, smash barrels, and sail the Going Merry.",
    tech: ["Three.js", "JavaScript", "Vite"],
    github: "https://github.com/Arya7n/one-piece",
    live: "https://onepiece3js.vercel.app/",
    featured: false,
  },
  {
    title: "Veloce",
    description:
      "Interactive showcase for super and hyper cars — explore vehicles, listen to their engines, and learn what makes each machine special.",
    tech: ["JavaScript", "React"],
    github: "https://github.com/Arya7n/veloce",
    live: "https://veloce-beta-cyan.vercel.app/",
    featured: false,
  },
  {
    title: "HRMS",
    description:
      "Human resource management dashboard for day-to-day HR workflows — built for clarity and operational speed.",
    tech: ["React", "Node.js", "JavaScript"],
    github: "https://github.com/Arya7n/HRMS",
    live: "https://hrms-three-black.vercel.app",
    featured: false,
  },
];

export const skills = [
  {
    label: "Languages",
    items: ["JavaScript", "TypeScript"],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Nest.js",
      "Express.js",
      "REST APIs",
      "Socket.IO",
      "WebSockets",
      "Microservices",
    ],
  },
  {
    label: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Three.js",
      "HTML5",
      "CSS3",
    ],
  },
  {
    label: "Databases & ORMs",
    items: ["MongoDB", "PostgreSQL", "SQLite", "Prisma", "Mongoose"],
  },
  {
    label: "Cloud & DevOps",
    items: ["Docker", "Redis", "BullMQ", "AWS (S3, SES)", "Neon", "Vercel", "PM2"],
  },
  {
    label: "Tools",
    items: [
      "Git",
      "GitHub",
      "Electron",
      "Postman",
      "Firebase",
      "Linux",
      "Chrome Extensions",
    ],
  },
];

export const capabilities = [
  {
    title: "Backend systems",
    description:
      "Node.js, TypeScript, and NestJS services with clean architecture, REST APIs, WebSockets, and microservices that hold up in production.",
  },
  {
    title: "Performance",
    description:
      "MongoDB tuning, Redis caching, and BullMQ jobs — measurable gains on query speed and API response time.",
  },
  {
    title: "Product shipping",
    description:
      "From company dashboards and desktop agents to Three.js experiences and Chrome extensions — building end-to-end and shipping live.",
  },
];

export const navItems = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Work", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

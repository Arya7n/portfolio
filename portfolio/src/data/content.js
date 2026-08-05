export const profile = {
  name: "Aryan",
  title: "Full Stack Developer",
  focus: "Backend-Focused",
  email: "aryan11jr@gmail.com",
  phone: "+91 78763 89507",
  location: "Mohali, Punjab",
  summary:
    "Full Stack Developer with professional experience building scalable backend systems and modern web apps using Node.js, TypeScript, NestJS, React, and Next.js. Experienced in microservices, WebSockets, Redis, Docker, PostgreSQL, and MongoDB — focused on backend architecture, performance, and distributed systems.",
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
    role: "MERN Stack Developer",
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
    role: "MERN Stack Developer (Trainee)",
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
    title: "DevTunnel",
    description:
      "Self-hosted ngrok-style tunneling platform — secure public access to local apps via CLI and web dashboard. Real-time HTTP tunneling over WebSockets, JWT + API key auth, NestJS/PostgreSQL/Redis backend, and a Next.js dashboard for live traffic inspection.",
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
    title: "Cartify",
    description:
      "Full-stack e-commerce platform with JWT auth, Razorpay payments, admin dashboard, invoice generation, and role-based access.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT", "Razorpay", "Tailwind"],
    github: "https://github.com/Arya7n/cartify",
    live: "https://cartifymern.vercel.app/",
    featured: true,
  },
  {
    title: "One Piece",
    description:
      "Three.js One Piece–inspired open world — play as Luffy and Zoro, explore islands, swim, smash barrels, and sail the Going Merry. Gear 5 stretch attacks, triple-slash VFX, collectibles, and a boardable pirate ship.",
    tech: ["Three.js", "JavaScript", "Vite"],
    github: "https://github.com/Arya7n/one-piece",
    live: "https://onepiece3js.vercel.app/",
    featured: true,
  },
  {
    title: "Veloce",
    description:
      "Interactive showcase for super and hyper cars — explore vehicles, listen to their engines, and learn what makes each machine special.",
    tech: ["JavaScript", "React"],
    github: "https://github.com/Arya7n/veloce",
    live: "https://veloce-beta-cyan.vercel.app/",
    featured: true,
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
    items: ["React.js", "Next.js", "Redux", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    label: "Databases & ORMs",
    items: ["MongoDB", "PostgreSQL", "Prisma", "Mongoose"],
  },
  {
    label: "Cloud & DevOps",
    items: ["Docker", "Redis", "BullMQ", "AWS (S3, SES)", "PM2"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Postman", "Firebase", "Linux"],
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
    title: "Cloud & delivery",
    description:
      "Dockerized apps, AWS S3/SES workflows, and shipping features end-to-end with React and Next.js when needed.",
  },
];

export const navItems = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Work", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

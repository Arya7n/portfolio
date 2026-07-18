export const profile = {
  name: "Aryan",
  title: "MERN Stack Developer",
  focus: "Backend-Focused",
  email: "aryan11jr@gmail.com",
  phone: "+91 78763 89507",
  location: "Mohali, Punjab",
  summary:
    "Building scalable backend systems with Node.js, TypeScript, and microservices. Experienced with Redis, Docker, and AWS — focused on performance, clean architecture, and production-grade apps.",
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
      "Built scalable backend services with Node.js, TypeScript, and microservices architecture.",
      "Implemented Docker, Redis, and BullMQ for containerization, caching, and background jobs.",
      "Integrated AWS S3 and SES for storage and email workflows.",
      "Optimized MongoDB aggregation pipelines, improving query performance by ~40%.",
      "Shipped notification and real-time chat services; mentored interns on a SaaS elevator-management product.",
    ],
  },
  {
    company: "NetscapeLabs Infotech",
    role: "MERN Stack Developer (Trainee)",
    period: "July 2025 — December 2025",
    highlights: [
      "Built and deployed 2 live production apps with Next.js, React, and Node.js.",
      "Created reusable UI with Tailwind CSS and Shadcn for maintainability.",
      "Added real-time notifications with Socket.io; integrated REST APIs and Firebase.",
      "Collaborated across teams to cut page load time by ~30% and improve SEO.",
    ],
  },
];

export const projects = [
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
    title: "HRMS",
    description:
      "Human resource management dashboard for day-to-day HR workflows — built for clarity and operational speed.",
    tech: ["React", "Node.js", "JavaScript"],
    github: "https://github.com/Arya7n/HRMS",
    live: "https://hrms-three-black.vercel.app",
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
    items: ["Node.js", "Express.js", "REST APIs", "Microservices"],
  },
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "Redux", "Tailwind CSS"],
  },
  {
    label: "Databases",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    label: "Tools & DevOps",
    items: ["Docker", "Redis", "BullMQ", "AWS (S3, SES)", "PM2", "Git"],
  },
];

export const capabilities = [
  {
    title: "Backend systems",
    description:
      "Node.js and TypeScript services with clean architecture, REST APIs, and microservices that hold up in production.",
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

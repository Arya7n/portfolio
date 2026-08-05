import { useEffect } from "react";
import "@/App.css";
import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { PaperFoldOverlay } from "@/animation";

const marqueeItems = [
  "Node.js",
  "TypeScript",
  "NestJS",
  "React",
  "Next.js",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Redis",
  "Docker",
  "WebSockets",
  "BullMQ",
  "AWS",
  "Three.js",
  "Microservices",
];

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <>
      <div className="App" id="portfolio-root">
        <ScrollProgress />
        <Header />
        <main>
          <Hero />
          <Marquee items={marqueeItems} speed={25} />
          <About />
          <Capabilities />
          <Experience />
          <Projects />
          <Skills />
          <CTA />
          <Contact />
        </main>
        <Footer />
      </div>
      <PaperFoldOverlay />
    </>
  );
}

export default App;

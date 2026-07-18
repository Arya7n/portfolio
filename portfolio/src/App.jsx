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

const marqueeItems = [
  "Node.js",
  "TypeScript",
  "React",
  "Next.js",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Docker",
  "BullMQ",
  "AWS",
  "Microservices",
  "Express",
];

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="App">
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
  );
}

export default App;

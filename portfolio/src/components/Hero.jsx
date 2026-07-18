import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowDownRight, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/content";
import MagneticButton from "@/components/MagneticButton";

const nameLetters = profile.name.split("");

const Hero = () => {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(40);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${springX}% ${springY}%, rgba(27,77,62,0.16), transparent 55%)`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleMove = (e) => {
    if (reduceMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden pt-24 pb-10 md:pb-16"
    >
      <motion.div className="absolute inset-0 bg-paper" style={{ scale: bgScale }} aria-hidden />
      <motion.div
        className="absolute inset-0"
        aria-hidden
        style={{
          scale: bgScale,
          background:
            "radial-gradient(ellipse 80% 55% at 12% 18%, #d8e6df 0%, transparent 55%), radial-gradient(ellipse 65% 45% at 92% 78%, #dddcd4 0%, transparent 50%), linear-gradient(165deg, #f3f3f0 0%, #ebebe6 50%, #e4e8e4 100%)",
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: spotlight }}
        aria-hidden
      />
      <div className="absolute inset-0 noise opacity-40 pointer-events-none" aria-hidden />

      {!reduceMotion && (
        <>
          <motion.div
            className="absolute -top-24 right-[8%] w-72 h-72 rounded-full border border-accent/15 bg-accent/[0.04]"
            animate={{ y: [0, 24, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="absolute bottom-[18%] left-[4%] w-40 h-40 rounded-[2rem] border border-ink/8 bg-ink/[0.02]"
            animate={{ y: [0, -18, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="absolute top-[35%] right-[18%] w-3 h-3 rounded-full bg-accent/30"
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="absolute top-[55%] right-[30%] w-2 h-2 rounded-full bg-ink/20"
            animate={{ y: [0, 20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            aria-hidden
          />
        </>
      )}

      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none hidden md:block"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(18,18,18,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,18,18,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      {/* Animated edge line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent origin-left"
        aria-hidden
      />

      <motion.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-content mx-auto px-6 md:px-8 flex-1 flex flex-col justify-end"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-flex items-center gap-2.5 mb-8 md:mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-40" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-ink-muted">
            {profile.location} · Open to opportunities
          </p>
        </motion.div>

        <h1 className="font-display text-[clamp(4.5rem,18vw,11rem)] leading-[0.85] tracking-tightest text-ink mb-8 md:mb-10 overflow-hidden">
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden className="inline-flex">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                initial={{ y: "110%", opacity: 0, rotateX: 40 }}
                animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.12 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block origin-bottom"
                style={{ transformPerspective: 600 }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </h1>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7"
          >
            <h2 className="text-xl md:text-2xl font-medium tracking-tight text-ink text-balance mb-4">
              {profile.title}
              <span className="text-ink-muted font-normal"> — {profile.focus}</span>
            </h2>
            <p className="text-base md:text-lg text-ink-muted leading-relaxed max-w-xl text-balance">
              {profile.summary}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:items-end md:justify-end"
          >
            <MagneticButton
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink text-paper text-sm font-medium tracking-tight rounded-md hover:bg-ink-soft transition-colors btn-shine"
            >
              View selected work
              <ArrowDownRight size={16} strokeWidth={1.75} />
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center justify-center px-6 py-3.5 border border-ink/20 text-ink text-sm font-medium tracking-tight rounded-md hover:border-ink/45 hover:bg-paper/70 transition-colors backdrop-blur-sm"
            >
              Get in touch
            </MagneticButton>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t border-ink/10 pt-6">
          <motion.button
            type="button"
            onClick={() => scrollTo("about")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="self-start flex items-center gap-2 text-xs font-mono tracking-[0.16em] uppercase text-ink-muted hover:text-ink transition-colors group"
          >
            Scroll
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={14} className="group-hover:text-accent transition-colors" />
            </motion.span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-ink/10 text-sm text-ink-muted hover:text-ink hover:border-ink/25 hover:bg-paper/60 transition-colors"
            >
              <Github size={15} />
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md border border-ink/10 text-sm text-ink-muted hover:text-ink hover:border-ink/25 hover:bg-paper/60 transition-colors"
            >
              <Linkedin size={15} />
              LinkedIn
            </a>
            <a
              href={profile.links.resume}
              download
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-ink text-paper text-sm hover:bg-ink-soft transition-colors"
            >
              Resume
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

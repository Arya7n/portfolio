import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { education, profile } from "@/data/content";

const Counter = ({ value, suffix = "", inView }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, value, count]);

  return (
    <span className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const stats = [
  { value: 1, suffix: "+", label: "Year building products" },
  { value: 40, suffix: "%", label: "Query performance gains" },
  { value: 4, suffix: "+", label: "Live production apps" },
];

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-ink/8 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-8 relative" ref={ref}>
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4"
          >
            <p className="font-mono text-xs tracking-[0.18em] uppercase text-ink-muted mb-3">
              About
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-ink mb-4">
              Profile
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-px w-16 bg-accent origin-left"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-8 space-y-12"
          >
            <p className="text-lg md:text-xl leading-relaxed text-ink-soft text-balance">
              I&apos;m a {profile.title.toLowerCase()} with hands-on experience shipping
              production systems — from microservices and Redis-backed queues to
              MongoDB performance work and AWS-integrated workflows. I care about
              clean architecture, measurable performance, and code that teams can
              maintain.
            </p>

            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  whileHover={{ y: -4, borderColor: "rgba(27,77,62,0.35)" }}
                  className="rounded-2xl border border-ink/10 bg-paper-soft/70 p-4 md:p-5 backdrop-blur-sm transition-colors"
                >
                  <p className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} inView={inView} />
                  </p>
                  <p className="text-xs md:text-sm text-ink-muted leading-snug">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="rounded-2xl border border-ink/10 bg-gradient-to-br from-paper to-accent-mist/40 p-6 md:p-7"
              >
                <p className="font-mono text-xs tracking-[0.16em] uppercase text-ink-muted mb-3">
                  Education
                </p>
                <p className="text-ink font-medium tracking-tight mb-1">
                  {education.degree}
                </p>
                <p className="text-ink-muted text-sm leading-relaxed">
                  {education.school}
                  <br />
                  {education.period}
                  <br />
                  {education.detail}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.42 }}
                className="rounded-2xl border border-ink/10 bg-ink text-paper p-6 md:p-7"
              >
                <p className="font-mono text-xs tracking-[0.16em] uppercase text-paper/50 mb-3">
                  Focus
                </p>
                <p className="font-medium tracking-tight mb-1">Backend systems & APIs</p>
                <p className="text-paper/65 text-sm leading-relaxed">
                  Node.js · TypeScript · Microservices
                  <br />
                  Redis · Docker · AWS (S3, SES)
                  <br />
                  MongoDB · Performance optimization
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

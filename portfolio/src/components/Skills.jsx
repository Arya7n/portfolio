import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skills } from "@/data/content";
import TextReveal from "@/components/TextReveal";

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const allSkills = skills.flatMap((g) => g.items);

  return (
    <section id="skills" className="relative py-24 md:py-32 bg-ink text-paper overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(216,230,223,0.12), transparent 40%), radial-gradient(circle at 80% 70%, rgba(42,107,85,0.2), transparent 35%)",
        }}
      />

      <motion.div
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full border border-paper/5"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-16 left-[8%] w-40 h-40 rounded-full border border-paper/5"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />

      <div className="max-w-content mx-auto px-6 md:px-8 relative" ref={ref}>
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-mono text-xs tracking-[0.18em] uppercase text-paper/45 mb-3"
          >
            Toolkit
          </motion.p>
          <TextReveal>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-paper">
              Skills
            </h2>
          </TextReveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-14 md:mb-16">
          {skills.map((group, index) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.08 + index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-paper/10 bg-paper/[0.03] p-5 md:p-6 hover:bg-paper/[0.07] hover:border-paper/25 transition-colors duration-300"
            >
              <h3 className="font-mono text-xs tracking-[0.16em] uppercase text-accent-mist mb-5">
                {group.label}
              </h3>
              <ul className="space-y-0">
                {group.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.15 + index * 0.05 + i * 0.04 }}
                    className="text-lg tracking-tight text-paper/90 border-b border-paper/10 py-2.5 last:border-0 flex items-center gap-3 group/item"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent-mist/70 shrink-0 group-hover/item:scale-150 transition-transform" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap gap-2.5"
        >
          {allSkills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.4 + i * 0.03 }}
              whileHover={{
                y: -3,
                scale: 1.04,
                backgroundColor: "rgba(216,230,223,0.18)",
                borderColor: "rgba(216,230,223,0.35)",
              }}
              className="px-3.5 py-1.5 text-sm text-paper/80 border border-paper/15 rounded-full cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

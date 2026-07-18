import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experience } from "@/data/content";

const Experience = () => {
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 bg-paper-soft/70 border-t border-ink/8 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 md:px-8 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20"
        >
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-ink-muted mb-3">
            Career
          </p>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight text-ink">
            Experience
          </h2>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[7px] md:left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent origin-top hidden sm:block"
            aria-hidden
          />

          <div className="space-y-8 md:space-y-10">
            {experience.map((job, index) => (
              <motion.article
                key={job.company}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.55,
                  delay: 0.12 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative sm:pl-12 md:pl-14 group"
              >
                <span className="absolute left-0 top-6 hidden sm:flex h-4 w-4 md:h-6 md:w-6 items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-accent/20 scale-0 group-hover:scale-150 transition-transform duration-500" />
                  <span className="relative h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-accent ring-4 ring-paper-soft" />
                </span>

                <div className="rounded-2xl border border-ink/10 bg-paper/80 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 hover:border-accent/25 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-28px_rgba(18,18,18,0.35)]">
                  <div className="grid md:grid-cols-12 gap-6 md:gap-10">
                    <div className="md:col-span-4">
                      <p className="font-mono text-xs text-ink-muted mb-2">
                        {job.period}
                      </p>
                      <h3 className="text-xl font-medium tracking-tight text-ink mb-1">
                        {job.company}
                      </h3>
                      <p className="text-sm text-accent font-medium">{job.role}</p>
                    </div>
                    <ul className="md:col-span-8 space-y-3">
                      {job.highlights.map((item, hi) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, y: 8 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{
                            duration: 0.4,
                            delay: 0.25 + index * 0.1 + hi * 0.04,
                          }}
                          className="text-ink-soft leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-1.5 before:h-px before:bg-accent"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

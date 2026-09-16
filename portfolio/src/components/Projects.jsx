import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/content";
import TextReveal from "@/components/TextReveal";

const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0.08, triggerOnce: true });
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 md:py-32 border-t border-ink/8 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-8 relative" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45 }}
              className="font-mono text-xs tracking-[0.18em] uppercase text-ink-muted mb-3"
            >
              Selected work
            </motion.p>
            <TextReveal>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight text-ink">
                Projects
              </h2>
            </TextReveal>
          </div>
          <motion.a
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            href="https://github.com/Arya7n"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors group"
          >
            All repositories on GitHub
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        </div>

        <div className="space-y-4 md:space-y-5">
          {featured.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.08 + index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative grid md:grid-cols-12 gap-5 md:gap-8 rounded-2xl border border-ink/10 bg-paper p-6 md:p-8 overflow-hidden transition-all duration-400 hover:border-accent/30 hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgba(18,18,18,0.4)]"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-accent scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100" />

              <div className="md:col-span-1 flex items-start">
                <span className="font-mono text-xs text-ink-faint pt-1 group-hover:text-accent transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="md:col-span-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-ink group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0 md:hidden">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-ink/10 text-ink-muted hover:text-accent hover:border-accent/30 transition-colors"
                        aria-label={`${project.title} live demo`}
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-ink/10 text-ink-muted hover:text-accent hover:border-accent/30 transition-colors"
                      aria-label={`${project.title} on GitHub`}
                    >
                      <Github size={15} />
                    </a>
                  </div>
                </div>
                <div className="hidden md:flex flex-wrap gap-x-4 gap-y-2">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-accent hover:underline underline-offset-4"
                    >
                      Live demo
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink transition-colors"
                  >
                    GitHub
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              <div className="md:col-span-7">
                <p className="text-ink-soft leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-mono tracking-wide text-ink-muted bg-ink/[0.04] border border-ink/8 rounded-md group-hover:border-accent/20 group-hover:bg-accent/[0.06] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {more.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-16 pt-12 border-t border-ink/10"
          >
            <p className="font-mono text-xs tracking-[0.16em] uppercase text-ink-muted mb-8">
              More projects
            </p>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
              {more.map((project, i) => (
                <motion.a
                  key={project.title}
                  href={project.live || project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                  whileHover={{ y: -3 }}
                  className="group block rounded-2xl border border-ink/10 bg-paper-soft/50 p-5 hover:bg-paper hover:border-accent/25 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-base font-medium tracking-tight text-ink group-hover:text-accent transition-colors">
                      {project.title}
                    </h4>
                    <ArrowUpRight
                      size={14}
                      className="text-ink-faint group-hover:text-accent shrink-0 mt-1 transition-all"
                    />
                  </div>
                  <p className="text-sm text-ink-muted leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <p className="font-mono text-[11px] text-ink-faint">
                    {project.tech.join(" · ")}
                  </p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;

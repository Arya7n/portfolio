import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight } from "lucide-react";
import { capabilities } from "@/data/content";
import TextReveal from "@/components/TextReveal";

const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * 8);
    rotateY.set(px * 8);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Capabilities = () => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section
      id="capabilities"
      className="relative py-24 md:py-32 border-t border-ink/8 overflow-hidden"
    >
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="max-w-content mx-auto px-6 md:px-8 relative" ref={ref}>
        <div className="mb-12 md:mb-16 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="font-mono text-xs tracking-[0.18em] uppercase text-ink-muted mb-3"
          >
            Strengths
          </motion.p>
          <TextReveal>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-ink mb-4">
              What I bring
            </h2>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-ink-muted text-lg leading-relaxed"
          >
            The work I focus on professionally — systems that scale, stay
            maintainable, and move product forward.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.1 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TiltCard className="group relative rounded-2xl border border-ink/10 bg-gradient-to-b from-paper to-paper-soft/80 p-6 md:p-8 min-h-[220px] flex flex-col justify-between overflow-hidden hover:border-accent/30 transition-colors duration-400 hover:shadow-[0_24px_48px_-28px_rgba(18,18,18,0.35)] h-full">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-accent/[0.07] blur-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                />
                <div className="relative">
                  <span className="font-mono text-xs text-ink-faint mb-6 block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight text-ink mb-3 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-ink-muted leading-relaxed text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-2 text-xs font-mono tracking-[0.14em] uppercase text-ink-faint group-hover:text-accent transition-colors">
                  Core focus
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all"
                  />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/content";
import MagneticButton from "@/components/MagneticButton";
import TextReveal from "@/components/TextReveal";

const CTA = () => {
  const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true });

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-ink" aria-hidden />
      <div
        className="absolute inset-0 opacity-80"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 15% 50%, rgba(42,107,85,0.35), transparent 55%), radial-gradient(ellipse 50% 60% at 90% 20%, rgba(216,230,223,0.08), transparent 45%)",
        }}
      />

      <motion.div
        className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-paper/10"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="absolute -left-10 bottom-0 w-48 h-48 rounded-full bg-accent/20 blur-3xl"
        animate={{ opacity: [0.3, 0.6, 0.3], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="max-w-content mx-auto px-6 md:px-8 relative" ref={ref}>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="font-mono text-xs tracking-[0.18em] uppercase text-paper/45 mb-4"
            >
              Next step
            </motion.p>
            <TextReveal>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-paper text-balance mb-5">
                Looking for a backend-focused MERN engineer?
              </h2>
            </TextReveal>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-paper/60 text-lg leading-relaxed max-w-xl"
            >
              Currently at PSQUARE — open to full-time roles where clean systems
              and shipping speed both matter.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 shrink-0"
          >
            <MagneticButton
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-paper text-ink text-sm font-medium tracking-tight rounded-md hover:bg-accent-mist transition-colors btn-shine"
            >
              Start a conversation
              <ArrowDownRight size={16} />
            </MagneticButton>
            <MagneticButton
              as="a"
              href={profile.links.resume}
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-paper/25 text-paper text-sm font-medium tracking-tight rounded-md hover:border-paper/50 hover:bg-paper/5 transition-colors"
            >
              Download resume
              <ArrowUpRight size={15} />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

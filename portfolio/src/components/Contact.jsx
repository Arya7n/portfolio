import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/content";
import MagneticButton from "@/components/MagneticButton";
import TextReveal from "@/components/TextReveal";

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const links = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      label: "LinkedIn",
      value: "aryan-46191b265",
      href: profile.links.linkedin,
    },
    {
      label: "GitHub",
      value: "Arya7n",
      href: profile.links.github,
    },
    {
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-ink/8 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 80% 20%, rgba(216,230,223,0.55), transparent 60%)",
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 -translate-x-1/2 top-8 md:top-4 font-display italic text-[18vw] leading-none text-ink/[0.035] whitespace-nowrap select-none pointer-events-none"
        aria-hidden
      >
        Hello
      </motion.p>

      <div className="max-w-content mx-auto px-6 md:px-8 relative" ref={ref}>
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5"
          >
            <p className="font-mono text-xs tracking-[0.18em] uppercase text-ink-muted mb-3">
              Contact
            </p>
            <TextReveal>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight text-ink mb-6">
                Let&apos;s talk
              </h2>
            </TextReveal>
            <p className="text-ink-muted leading-relaxed text-balance mb-8">
              Open to full-time roles and interesting backend or full-stack
              opportunities. Prefer email for first contact.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-2">
              <MagneticButton
                as="a"
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-paper text-sm font-medium tracking-tight rounded-md hover:bg-accent-soft transition-colors btn-shine"
              >
                {profile.email}
                <ArrowUpRight size={15} />
              </MagneticButton>
              <MagneticButton
                as="a"
                href={profile.links.resume}
                download
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-ink/20 text-ink text-sm font-medium tracking-tight rounded-md hover:border-ink/45 hover:bg-paper-soft transition-colors"
              >
                Download resume
                <ArrowUpRight size={15} />
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7"
          >
            <ul className="rounded-2xl border border-ink/10 overflow-hidden bg-paper/70 backdrop-blur-sm divide-y divide-ink/10 shadow-[0_20px_50px_-36px_rgba(18,18,18,0.35)]">
              {links.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: 12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                >
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex items-center justify-between gap-4 py-5 px-5 md:px-6 hover:bg-accent/[0.06] transition-colors"
                  >
                    <span className="font-mono text-xs tracking-[0.14em] uppercase text-ink-muted w-24 shrink-0">
                      {link.label}
                    </span>
                    <span className="flex-1 text-ink tracking-tight group-hover:text-accent transition-colors text-right sm:text-left">
                      {link.value}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-ink-faint group-hover:text-accent shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

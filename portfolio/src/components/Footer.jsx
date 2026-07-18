import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { navItems, profile } from "@/data/content";

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollTo = (id) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-ink/10 bg-paper-soft/40 relative overflow-hidden">
      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />

      <div className="max-w-content mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display text-3xl tracking-tight text-ink mb-2">
              {profile.name}
            </p>
            <p className="text-sm text-ink-muted">
              {profile.title} · {profile.focus}
            </p>
          </motion.div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm text-ink-muted hover:text-ink transition-colors relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <motion.button
            onClick={() => scrollTo("top")}
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors self-start"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp size={14} />
          </motion.button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-8 border-t border-ink/8">
          <p className="text-xs text-ink-faint">
            © {year} {profile.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-ink-faint hover:text-ink transition-colors"
            >
              GitHub
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-ink-faint hover:text-ink transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

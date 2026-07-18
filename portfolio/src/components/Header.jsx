import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, profile } from "@/data/content";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const sections = navItems.map((item) => item.id);
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
    setActiveSection(sectionId);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
    setActiveSection("");
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-paper/85 backdrop-blur-xl border-b border-ink/8 shadow-[0_8px_30px_-18px_rgba(18,18,18,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-content mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem] gap-4">
          <button
            onClick={scrollToTop}
            className="font-display text-2xl tracking-tight text-ink hover:text-accent transition-colors relative group shrink-0"
            aria-label="Back to top"
          >
            {profile.name}
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          </button>

          <nav className="hidden md:flex items-center gap-1 rounded-full border border-ink/8 bg-paper/50 backdrop-blur-md px-1.5 py-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-1.5 text-sm tracking-tight transition-colors rounded-full ${
                  activeSection === item.id
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent/10 border border-accent/15"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.links.resume}
              download
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium tracking-tight text-ink border border-ink/15 rounded-md hover:border-ink/40 hover:bg-paper-soft/80 transition-colors"
            >
              Resume
              <ArrowUpRight size={14} />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-ink-muted hover:text-ink transition-colors rounded-lg hover:bg-ink/5"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-ink/8"
            >
              <div className="flex flex-col py-4 gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-2 py-3 text-base tracking-tight ${
                      activeSection === item.id
                        ? "text-ink font-medium"
                        : "text-ink-muted"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href={profile.links.resume}
                  download
                  className="text-left px-2 py-3 text-base tracking-tight text-accent font-medium"
                >
                  Download resume
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;

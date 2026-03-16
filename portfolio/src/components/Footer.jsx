import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github size={22} />,
      href: "https://github.com/Arya7n",
      label: "GitHub"
    },
    { 
      icon: <Linkedin size={22} />,
      href: "https://www.linkedin.com/in/aryan-46191b265",
      label: "LinkedIn"
    },
    {
      icon: <Mail size={22} />, 
      href: "mailto:aryan11jr@gmail.com",
      label: "Email"
    }
  ];

  const scrollToSection = (sectionId) => {  
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => { 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-black border-t-2 border-purple-500/30 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-purple-600/10 blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent mb-4 font-mono">
              &lt;Aryan /&gt;
            </h3>
            <p className="text-purple-300 text-sm leading-relaxed">
              Full Stack Developer passionate about building scalable backend systems and modern web applications.
            </p>
          </motion.div> 

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-purple-200 font-bold text-lg mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3"> 
              {quickLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  whileHover={{ x: 5, color: '#ffffff' }}
                  className="text-purple-400 hover:text-white transition-all text-left text-sm flex items-center gap-2"
                >
                  <span className="text-purple-500">→</span> {link.label}
                </motion.button>
              ))}
            </div> 
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-purple-200 font-bold text-lg mb-6">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 bg-purple-950/40 border-2 border-purple-500/30 rounded-xl text-purple-400 hover:text-white hover:border-purple-400/60 hover:bg-purple-900/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-purple-500/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p 
              className="text-purple-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              © {currentYear} Aryan. All rights reserved.
            </motion.p>
            
            <motion.p 
              className="text-purple-400 text-sm flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Built with <Heart size={14} className="text-purple-500 fill-purple-500 animate-pulse" /> using React & Framer Motion
            </motion.p>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-purple-950/40 border-2 border-purple-500/30 rounded-xl text-purple-400 hover:text-white hover:border-purple-400/60 hover:bg-purple-900/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

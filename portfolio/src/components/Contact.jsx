import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Linkedin, Github, MapPin, Briefcase, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [isHovered, setIsHovered] = useState(null);

  const contactMethods = [
    {
      icon: <Mail size={28} />,
      label: "Email",
      value: "aryan11jr@gmail.com",
      link: "mailto:aryan11jr@gmail.com"
    },
    {
      icon: <Linkedin size={28} />,
      label: "LinkedIn",
      value: "Connect with me",
      link: "https://www.linkedin.com/in/aryan-46191b265"
    },
    {
      icon: <Github size={28} />,
      label: "GitHub",
      value: "@Arya7n",
      link: "https://github.com/Arya7n"
    }
  ];

  const info = [
    {
      icon: <Briefcase size={22} />,
      label: "Experience",
      value: "8+ months professional"
    },
    {
      icon: <MapPin size={22} />,
      label: "Education",
      value: "B.Tech in IT"
    }
  ];

  return (
    <section id="contact" className="py-28 bg-gradient-to-b from-black via-purple-950/10 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-800/10 rounded-full blur-3xl" />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.2) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(147, 51, 234, 0.2) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <span className="text-purple-500 text-sm font-mono tracking-wider">04. Contact</span>
          </motion.div>
          <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent mb-6">
            Get In Touch
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-purple-300 text-xl mb-8"
          >
            Let's build something amazing together
          </motion.p>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"
            initial={{ width: 0 }}
            animate={inView ? { width: 128 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left side - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-950/40 to-black backdrop-blur-sm border-2 border-purple-500/30 rounded-3xl p-10 h-full relative overflow-hidden group"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <h3 className="text-3xl font-bold text-purple-100 mb-8 group-hover:text-white transition-colors">
                  Contact Information
                </h3>

                <div className="space-y-6 mb-10">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={index}
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 10, scale: 1.03 }}
                      onHoverStart={() => setIsHovered(index)}
                      onHoverEnd={() => setIsHovered(null)}
                      className="flex items-start gap-5 p-5 rounded-2xl hover:bg-purple-900/30 transition-all duration-300 group/item border-2 border-transparent hover:border-purple-500/30"
                    >
                      <motion.div 
                        className="text-purple-400 group-hover/item:text-purple-300 transition-colors"
                        animate={isHovered === index ? { rotate: 360, scale: 1.2 } : {}}
                        transition={{ duration: 0.6 }}
                      >
                        {method.icon}
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-sm text-purple-400 mb-1 font-mono">
                          {method.label}
                        </div>
                        <div className="text-lg text-purple-100 group-hover/item:text-white transition-colors font-medium">
                          {method.value}
                        </div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={isHovered === index ? { opacity: 1, x: 5 } : { opacity: 0, x: 0 }}
                        className="text-purple-400"
                      >
                        <Send size={20} />
                      </motion.div>
                    </motion.a>
                  ))}
                </div>

                <div className="border-t-2 border-purple-500/30 pt-8 space-y-5">
                  {info.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 text-purple-300 p-3 rounded-xl hover:bg-purple-900/20 transition-all"
                    >
                      <div className="text-purple-400">{item.icon}</div>
                      <span className="text-sm">
                        <span className="text-purple-400 font-semibold">{item.label}:</span> {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - CTA */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-950/40 to-black backdrop-blur-sm border-2 border-purple-500/30 rounded-3xl p-10 relative overflow-hidden group"
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-600/20 to-purple-600/0"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="inline-block mb-6"
                >
                  <CheckCircle className="text-purple-400" size={48} />
                </motion.div>
                
                <h3 className="text-3xl font-bold text-purple-100 mb-5 group-hover:text-white transition-colors">
                  Let's Collaborate
                </h3>
                <p className="text-purple-300 text-lg leading-relaxed mb-10 group-hover:text-purple-200 transition-colors">
                  I'm currently open to new opportunities and interesting projects. Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out!
                </p>

                <div className="space-y-5">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold py-6 text-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 border-0"
                    >
                      <a href="mailto:aryan11jr@gmail.com" className="flex items-center justify-center gap-3">
                        <Mail size={22} />
                        Send me an email
                      </a>
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full border-2 border-purple-500/50 text-purple-200 hover:bg-purple-900/40 hover:border-purple-400 font-semibold py-6 text-lg backdrop-blur-sm transition-all duration-300"
                    >
                      <a
                        href="https://www.linkedin.com/in/aryan-46191b265"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3"
                      >
                        <Linkedin size={22} />
                        Connect on LinkedIn
                      </a>
                    </Button>
                  </motion.div>
                </div>

                <motion.div 
                  className="mt-10 pt-8 border-t-2 border-purple-500/30"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-sm text-purple-400 text-center font-medium">
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"
                    />
                    Available for full-time opportunities and freelance projects
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

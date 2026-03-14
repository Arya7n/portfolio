import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Layout, Terminal } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const features = [
    {
      icon: <Code2 size={28} />,
      title: "Clean Code",
      description: "Writing maintainable, scalable code"
    },
    {
      icon: <Database size={28} />,
      title: "Backend Focus",
      description: "Specialized in server-side architecture"
    },
    {
      icon: <Layout size={28} />,
      title: "Full Stack",
      description: "End-to-end development capabilities"
    },
    {
      icon: <Terminal size={28} />,
      title: "Modern Tech",
      description: "Latest web development practices"
    }
  ];

  return (
    <section id="about" className="py-28 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl" />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(147, 51, 234, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
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
            <span className="text-purple-500 text-sm font-mono tracking-wider">Introduction</span>
          </motion.div>
          <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent mb-6">
            About Me
          </h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"
            initial={{ width: 0 }}
            animate={inView ? { width: 128 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left side - Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-purple-950/20 backdrop-blur-sm border-2 border-purple-500/20 rounded-3xl p-10 relative overflow-hidden group"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <p className="text-lg text-purple-100 leading-relaxed mb-6">
                  I'm a <span className="text-purple-300 font-semibold">Full Stack  Developer</span> with professional experience building dynamic and responsive web applications. I specialize in modern JavaScript technologies including Next.js, React, Node.js, and MongoDB.
                </p>
                <p className="text-lg text-purple-100 leading-relaxed mb-6">
                  I focus on writing clean, maintainable code and developing <span className="text-purple-300 font-semibold">scalable backend architectures</span> that support seamless user experiences. I enjoy solving complex technical problems and contributing to high-impact projects that align with business goals.
                </p>
                <p className="text-lg text-purple-100 leading-relaxed">
                  I'm committed to continuous learning and staying updated with modern web development trends. My goal is to deliver innovative digital solutions while collaborating with teams to build reliable and impactful digital products.
                </p>

                <div className="mt-10 pt-8 border-t border-purple-500/30">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-4 rounded-xl bg-purple-900/20 border border-purple-500/20"
                    >
                      <div className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">9+</div>
                      <div className="text-sm text-purple-300 mt-1">Months Experience</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-4 rounded-xl bg-purple-900/20 border border-purple-500/20"
                    >
                      <div className="text-4xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">3+</div>
                      <div className="text-sm text-purple-300 mt-1">live projects</div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-5"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6 + index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -10,
                  rotateZ: 2,
                  boxShadow: "0 0 30px rgba(147, 51, 234, 0.4)"
                }}
                className="bg-gradient-to-br from-purple-950/40 to-black backdrop-blur-sm border-2 border-purple-500/30 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300 group cursor-pointer"
              >
                <motion.div 
                  className="text-purple-400 mb-4 group-hover:text-purple-300 transition-colors"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-purple-100 mb-3 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-purple-300 group-hover:text-purple-200 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-purple-950/20 backdrop-blur-sm border-2 border-purple-500/20 rounded-3xl p-10 relative overflow-hidden group max-w-4xl mx-auto"
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative">
              <h3 className="text-3xl font-bold text-purple-100 mb-8 text-center">Professional Experience</h3>
              
              <div className="space-y-8">
                {/* Current Position */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-purple-200">MERN Stack Developer</h4>
                      <p className="text-purple-300">Psquare Company</p>
                    </div>
                    <div className="text-purple-400 font-mono text-sm mt-2 md:mt-0">
                      Dec 2025 - Present
                    </div>
                  </div>
                  <p className="text-purple-100 leading-relaxed">
                    Currently working as a MERN Stack Developer, focusing on building scalable web applications using MongoDB, Express.js, React.js, and Node.js.
                  </p>
                </motion.div>

                {/* Previous Position */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-purple-900/10 border border-purple-500/20 rounded-2xl p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-purple-200">MERN Stack Developer</h4>
                      <p className="text-purple-300">NetscapeLabs Infotech Pvt Ltd</p>
                    </div>
                    <div className="text-purple-400 font-mono text-sm mt-2 md:mt-0">
                      Jul 2025 - Dec 2025
                    </div>
                  </div>
                  <p className="text-purple-100 leading-relaxed">
                    Developed full-stack web applications using the MERN stack, contributing to multiple projects and gaining expertise in modern web development practices.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

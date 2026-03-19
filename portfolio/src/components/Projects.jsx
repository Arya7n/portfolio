import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Star } from 'lucide-react';
import { Button } from './ui/button';
import { mockProjects } from '../data/mock';

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="projects" className="py-28 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl" />
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

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, type: "spring" }}
            className="inline-block mb-4"  
          >
            <span className="text-purple-500 text-sm font-mono tracking-wider">Portfolio</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl font-bold bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent mb-6"
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-purple-300 text-xl mb-8"
          >
            A selection of my recent work  
          </motion.p>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"
            initial={{ width: 0 }}
            animate={inView ? { width: 128 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          />  
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100      
              }}
              whileHover={{ 
                y: -15,
                scale: 1.02
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}   
              className="group bg-gradient-to-br from-purple-950/40 to-black backdrop-blur-sm border-2 border-purple-500/30 rounded-3xl overflow-hidden hover:border-purple-400/60 transition-all duration-500 relative"
            >
              {/* Glowing effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-600/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={hoveredIndex === index ? {
                  backgroundPosition: ['0% 0%', '100% 100%']
                } : {}}
              />
              
              <div className="p-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <motion.div 
                    className="p-4 bg-purple-900/30 rounded-2xl border border-purple-500/30 group-hover:bg-purple-800/40 group-hover:border-purple-400/50 transition-all duration-300"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Github className="text-purple-400 group-hover:text-purple-300" size={28} />
                  </motion.div>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-purple-500 hover:text-purple-300 transition-colors p-2 rounded-full hover:bg-purple-900/30"
                  >
                    <ExternalLink size={22} />
                  </motion.a>
                </div>

                <motion.h3 
                  className="text-2xl font-bold text-purple-100 mb-3 group-hover:text-white transition-colors"
                  initial={{ x: -20, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  className="text-purple-300 text-sm mb-6 leading-relaxed group-hover:text-purple-200 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {project.description}
                </motion.p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.techStack.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: index * 0.1 + 0.4 + techIndex * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1.5 bg-purple-900/40 border border-purple-500/40 rounded-full text-xs font-medium text-purple-300 group-hover:bg-purple-800/40 group-hover:border-purple-400/60 transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {project.stars && (
                  <motion.div 
                    className="flex items-center gap-2 text-sm text-purple-400"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <Star size={16} className="fill-purple-400" />
                    <span>{project.stars} stars</span>
                  </motion.div>
                )}
              </div>

              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.5), transparent)',
                  backgroundSize: '200% 100%',
                }}
                animate={hoveredIndex === index ? {
                  backgroundPosition: ['200% 0', '-200% 0']
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold px-10 py-6 text-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 border-0"
            >
              <a
                href="https://github.com/Arya7n"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <Github size={24} />
                View More on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

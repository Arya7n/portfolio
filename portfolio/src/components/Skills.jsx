import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const skillCategories = [
    {
      category: "Frontend",
      color: "from-purple-400 to-purple-600",
      skills: [
        { name: "React.js", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Redux", level: 80 },
        { name: "Tailwind CSS", level: 90 },
      ]
    },
    {
      category: "Backend",
      color: "from-purple-500 to-purple-700",
      skills: [
        { name: "Node.js", level: 95 },
        { name: "Express.js", level: 95 },
        { name: "NestJS", level: 85 },
        { name: "Microservices", level: 80 },
      ]
    },
    {
      category: "Database",
      color: "from-purple-600 to-purple-800",
      skills: [
        { name: "MongoDB", level: 90 },
        { name: "PostgreSQL", level: 85 },
      ]
    },
    {
      category: "Tools & DevOps",
      color: "from-purple-700 to-purple-900",
      skills: [
        { name: "Git & GitHub", level: 90 },
        { name: "Postman", level: 95 },
        { name: "AWS Services", level: 75 },
        { name: "Docker", level: 70 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-28 bg-gradient-to-b from-black via-purple-950/10 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-800/10 rounded-full blur-3xl" />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.2) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(147, 51, 234, 0.2) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
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
            <span className="text-purple-500 text-sm font-mono tracking-wider">Expertise</span>
          </motion.div>
          <h2 className="text-6xl font-bold bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent mb-6">
            Technical Skills
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-purple-300 text-xl mb-8"
          >
            Backend-focused with full-stack capabilities
          </motion.p>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto"
            initial={{ width: 0 }}
            animate={inView ? { width: 128 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: categoryIndex * 0.15,
                type: "spring"
              }}
              whileHover={{ 
                scale: 1.03,
                y: -10,
                boxShadow: "0 20px 60px rgba(147, 51, 234, 0.3)"
              }}
              className="bg-gradient-to-br from-purple-950/40 to-black backdrop-blur-sm border-2 border-purple-500/30 rounded-3xl p-10 hover:border-purple-400/50 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Animated background on hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-bold text-purple-100 group-hover:text-white transition-colors">
                    {category.category}
                  </h3>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-purple-400/30 group-hover:text-purple-400/60"
                  >
                    <Zap size={32} />
                  </motion.div>
                </div>
                
                <div className="space-y-7">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: categoryIndex * 0.15 + skillIndex * 0.1 }}
                    >
                      <div className="flex justify-between mb-3">
                        <span className="text-purple-200 font-semibold text-lg group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                        <motion.span 
                          className="text-purple-400 text-sm font-mono"
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ delay: categoryIndex * 0.15 + skillIndex * 0.1 + 0.3 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="h-3 bg-black/50 rounded-full overflow-hidden border border-purple-900/50">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{
                            duration: 1.5,
                            delay: categoryIndex * 0.15 + skillIndex * 0.1,
                            ease: "easeOut"
                          }}
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full relative overflow-hidden`}
                        >
                          {/* Animated shine effect */}
                          <motion.div
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              repeatDelay: 1,
                              ease: "easeInOut" 
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-purple-300 mb-8 text-lg">Technologies I work with:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "JavaScript", "TypeScript", "React", "Next.js", "Node.js", 
              "Express", "NestJS", "MongoDB", "PostgreSQL", "REST APIs", 
              "Git", "AWS", "Docker"
            ].map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.9 + index * 0.05,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.2, 
                  y: -5,
                  boxShadow: "0 10px 30px rgba(147, 51, 234, 0.4)",
                  backgroundColor: "rgba(147, 51, 234, 0.2)"
                }}
                className="px-6 py-3 bg-purple-950/40 border-2 border-purple-500/30 rounded-full text-sm font-medium text-purple-200 hover:border-purple-400/60 hover:text-white transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

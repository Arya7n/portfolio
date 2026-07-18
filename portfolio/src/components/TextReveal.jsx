import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TextReveal = ({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}) => {
  const [ref, inView] = useInView({ threshold: 0.35, triggerOnce: true });
  const MotionTag = motion[Tag] || motion.div;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <MotionTag
        initial={{ y: "110%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : {}}
        transition={{
          duration: 0.75,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </MotionTag>
    </div>
  );
};

export default TextReveal;

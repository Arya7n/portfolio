import { forwardRef, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MagneticButton = forwardRef(function MagneticButton(
  {
    children,
    className = "",
    strength = 0.35,
    as: Tag = "button",
    ...props
  },
  _ref
) {
  const localRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22 });
  const springY = useSpring(y, { stiffness: 280, damping: 22 });

  const handleMove = (e) => {
    const el = localRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-flex">
      <Tag
        ref={localRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={className}
        {...props}
      >
        {children}
      </Tag>
    </motion.div>
  );
});

export default MagneticButton;

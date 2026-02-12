"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999]"
    >
      <div
        className="w-full h-full"
        style={{
          background: "linear-gradient(90deg, #00D1FF, #7C3AED, #F59E0B, #00D1FF)",
          backgroundSize: "300% 100%",
          animation: "shimmer 3s linear infinite",
        }}
      />
    </motion.div>
  );
}

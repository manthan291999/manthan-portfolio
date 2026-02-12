"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const initial = {
    up: { opacity: 0, y: 60 },
    left: { opacity: 0, x: -60 },
    right: { opacity: 0, x: 60 },
  };

  return (
    <motion.div
      ref={ref}
      initial={initial[direction]}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial[direction]}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.2, 0.8, 0.2, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

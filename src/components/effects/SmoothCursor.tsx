"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function SmoothCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on mobile/touch devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, input, textarea, select, [role='button'], [data-hover]");
      setHovering(!!isInteractive);
    };

    let animFrame: number;
    const animate = () => {
      // Smooth lerp for trail
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.15;
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px) translate(-50%, -50%)`;
      }
      animFrame = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        ref={cursorRef}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference hidden md:block"
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-200 ease-out ${
            hovering ? "w-[48px] h-[48px] opacity-30" : "w-[8px] h-[8px] opacity-80"
          }`}
        />
      </motion.div>

      {/* Trailing glow */}
      <motion.div
        ref={trailRef}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="fixed top-0 left-0 z-[9997] pointer-events-none hidden md:block"
        style={{ willChange: "transform" }}
      >
        <div
          className={`rounded-full transition-all duration-300 ease-out ${
            hovering
              ? "w-[64px] h-[64px] bg-accent-cyan/10 shadow-[0_0_30px_rgba(0,209,255,0.15)]"
              : "w-[32px] h-[32px] bg-accent-cyan/5 shadow-[0_0_20px_rgba(0,209,255,0.08)]"
          }`}
        />
      </motion.div>
    </>
  );
}

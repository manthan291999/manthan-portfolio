"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface VariableProximityProps {
  text: string;
  className?: string;
  radius?: number;
  minWeight?: number;
  maxWeight?: number;
}

export default function VariableProximity({
  text,
  className = "",
  radius = 120,
  minWeight = 300,
  maxWeight = 800,
}: VariableProximityProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || isMobile) return;

      const chars = containerRef.current.querySelectorAll<HTMLSpanElement>("[data-char]");
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;
        const dist = Math.sqrt((e.clientX - charX) ** 2 + (e.clientY - charY) ** 2);
        const weight =
          dist < radius
            ? maxWeight - (dist / radius) * (maxWeight - minWeight)
            : minWeight;
        char.style.fontWeight = String(Math.round(weight));
      });
    },
    [radius, minWeight, maxWeight, isMobile]
  );

  useEffect(() => {
    if (isMobile) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, isMobile]);

  if (isMobile) {
    return (
      <span className={className} style={{ fontWeight: 400 }}>
        {text}
      </span>
    );
  }

  return (
    <span ref={containerRef} className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          data-char
          style={{
            fontWeight: minWeight,
            transition: "font-weight 80ms ease-out",
            display: "inline",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

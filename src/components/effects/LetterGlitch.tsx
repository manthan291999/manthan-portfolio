"use client";

import { useRef, useEffect, useState } from "react";

interface LetterGlitchProps {
  className?: string;
}

export default function LetterGlitch({ className = "" }: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/{}[]|\\";
    const fontSize = 14;
    let animId: number;
    let columns: number;
    let rows: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Math.floor(canvas.width / fontSize);
      rows = Math.floor(canvas.height / fontSize);
    };

    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.innerWidth < 768;
    const density = isMobile ? 0.02 : 0.04;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows; r++) {
          if (Math.random() > density) continue;

          const char = chars[Math.floor(Math.random() * chars.length)];
          const x = c * fontSize;
          const y = (r + 1) * fontSize;

          // Mostly dark text with occasional cyan spark
          if (Math.random() < 0.08) {
            ctx.fillStyle = "rgba(0, 209, 255, 0.20)";
          } else {
            ctx.fillStyle = "rgba(20, 20, 20, 0.07)";
          }

          ctx.fillText(char, x, y);
        }
      }

      animId = requestAnimationFrame(() => {
        setTimeout(() => draw(), 100);
      });
    };

    setIsVisible(true);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: isVisible ? 0.08 : 0 , transition: "opacity 1s ease" }}
      aria-hidden="true"
    />
  );
}

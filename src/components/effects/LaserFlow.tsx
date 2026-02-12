"use client";

import { useRef, useEffect, useState } from "react";

interface LaserFlowProps {
  className?: string;
}

export default function LaserFlow({ className = "" }: LaserFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    interface Line {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      hue: number;
    }

    const lines: Line[] = [];
    const lineCount = window.innerWidth < 768 ? 8 : 15;

    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        length: 40 + Math.random() * 80,
        hue: 190 + Math.random() * 40, // cyan range
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        const endX = line.x + line.vx * line.length * 0.3;
        const endY = line.y + line.vy * line.length * 0.3;

        const gradient = ctx.createLinearGradient(line.x, line.y, endX, endY);
        gradient.addColorStop(0, `hsla(${line.hue}, 100%, 60%, 0)`);
        gradient.addColorStop(0.5, `hsla(${line.hue}, 100%, 60%, 0.12)`);
        gradient.addColorStop(1, `hsla(${line.hue}, 100%, 60%, 0)`);

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        line.x += line.vx;
        line.y += line.vy;

        if (line.x < -50 || line.x > canvas.width + 50) line.vx *= -1;
        if (line.y < -50 || line.y > canvas.height + 50) line.vy *= -1;
      });

      animId = requestAnimationFrame(draw);
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
      style={{ opacity: isVisible ? 0.3 : 0, transition: "opacity 1s ease" }}
      aria-hidden="true"
    />
  );
}

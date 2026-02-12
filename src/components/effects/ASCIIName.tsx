"use client";

import { useEffect, useState, useCallback, useMemo } from "react";

interface ASCIINameProps {
  name: string;
  className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";

export default function ASCIIName({ name, className = "" }: ASCIINameProps) {
  const target = useMemo(() => name.toUpperCase(), [name]);
  const [chars, setChars] = useState<string[]>(() => target.split(""));
  const [revealed, setRevealed] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Map each character to its index among non-space chars (for even distribution)
  const charMeta = useMemo(() => {
    let idx = 0;
    const nonSpaceTotal = target.replace(/ /g, "").length;
    return target.split("").map((ch) => ({
      char: ch,
      isSpace: ch === " ",
      position: ch === " " ? -1 : idx++,
      total: nonSpaceTotal,
    }));
  }, [target]);

  // Scramble animation helper
  const runScramble = useCallback(
    (totalFrames: number, speed: number, onDone?: () => void) => {
      let frame = 0;
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        setChars(
          charMeta.map((m) => {
            if (m.isSpace) return " ";
            if (progress > (m.position + 1) / m.total) return m.char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
        );
        if (frame >= totalFrames) {
          setChars(target.split(""));
          clearInterval(interval);
          onDone?.();
        }
      }, speed);
      return interval;
    },
    [charMeta, target]
  );

  // Initial scramble-reveal
  useEffect(() => {
    // Start with scrambled text
    setChars(
      charMeta.map((m) =>
        m.isSpace ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]
      )
    );

    const timer = setTimeout(() => {
      setRevealed(true);
      runScramble(20, 50);
    }, 400);

    return () => clearTimeout(timer);
  }, [charMeta, runScramble]);

  // Hover re-scramble
  const handleHover = useCallback(() => {
    if (hovering) return;
    setHovering(true);
    runScramble(14, 40, () => setHovering(false));
  }, [hovering, runScramble]);

  // Split chars array back into words (preserving spaces as word separators)
  const words = useMemo(() => {
    const result: { char: string; isResolved: boolean }[][] = [[]];
    chars.forEach((ch, i) => {
      if (target[i] === " ") {
        result.push([]);
      } else {
        result[result.length - 1].push({
          char: ch,
          isResolved: ch === target[i],
        });
      }
    });
    return result;
  }, [chars, target]);

  return (
    <div
      className={`select-none cursor-default ${className}`}
      onMouseEnter={handleHover}
      aria-label={name}
    >
      {/* Decorative line */}
      <div className="flex items-center gap-3 mb-3 justify-center">
        <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-accent-cyan/50" />
        <span className="text-[10px] sm:text-[11px] tracking-[0.3em] text-text-muted font-mono uppercase">
          Hello, I&apos;m
        </span>
        <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-accent-cyan/50" />
      </div>

      {/* Name — large, bold */}
      <h2
        className="text-[42px] sm:text-[56px] md:text-[72px] lg:text-[86px] font-extrabold tracking-tight leading-[0.95] font-heading"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {words.map((word, wi) => (
          <span key={wi} className="inline-block">
            {word.map((letter, ci) => (
              <span
                key={`${wi}-${ci}`}
                className="inline-block transition-colors duration-200"
                style={{
                  color: letter.isResolved
                    ? undefined
                    : "var(--color-accent-cyan, #00D1FF)",
                }}
              >
                {letter.char}
              </span>
            ))}
            {wi < words.length - 1 && (
              <span className="inline-block w-[0.3em]">&nbsp;</span>
            )}
          </span>
        ))}
      </h2>

      {/* Underline accent bar */}
      <div
        className="mt-3 mx-auto h-[3px] rounded-full bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-cyan"
        style={{
          width: revealed ? "100%" : "0%",
          maxWidth: "280px",
          transition: "width 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.4s",
        }}
      />
    </div>
  );
}

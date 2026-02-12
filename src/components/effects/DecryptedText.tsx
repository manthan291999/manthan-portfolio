"use client";

import { useState, useEffect, useCallback } from "react";

interface DecryptedTextProps {
  text: string;
  className?: string;
  duration?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

export default function DecryptedText({
  text,
  className = "",
  duration = 1000,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const decrypt = useCallback(() => {
    const length = text.length;
    const intervalTime = duration / (length * 3);
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 3) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration++;
      if (iteration >= length * 3) {
        clearInterval(interval);
        setDisplayText(text);
        setIsComplete(true);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [text, duration]);

  useEffect(() => {
    let cleanupInterval: (() => void) | undefined;
    const timer = setTimeout(() => {
      cleanupInterval = decrypt();
    }, 300);
    return () => {
      clearTimeout(timer);
      cleanupInterval?.();
    };
  }, [decrypt]);

  return (
    <span
      className={`${className} ${isComplete ? "" : "opacity-90"}`}
      aria-label={text}
    >
      {displayText || text}
    </span>
  );
}

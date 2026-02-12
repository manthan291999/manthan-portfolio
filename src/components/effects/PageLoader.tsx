"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const fullText = "MANTHAN MITTAL";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>/";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        fullText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 2) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration >= fullText.length * 2 + 8) {
        setText(fullText);
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      }
    }, 40);

    // Safety timeout
    const safety = setTimeout(() => setLoading(false), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(safety);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-base"
        >
          <div className="text-center">
            {/* Decrypt name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-[20px] md:text-[28px] font-bold tracking-[0.15em] text-text-primary mb-4"
              style={{ fontVariantLigatures: "none" }}
            >
              {text}
            </motion.div>

            {/* Loading bar */}
            <div className="w-48 h-[2px] mx-auto bg-[rgba(20,20,20,0.08)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] as const }}
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #00D1FF, #7C3AED, #00D1FF)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            </div>

            {/* Micro label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="micro-label mt-4"
            >
              Initializing Portfolio
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

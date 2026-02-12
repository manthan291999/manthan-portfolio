"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/content/site-config";
import { Brain, Code, Cloud, ArrowRight } from "lucide-react";
import AnimatedCounter from "@/components/effects/AnimatedCounter";
import SectionReveal from "@/components/effects/SectionReveal";
import TiltCard from "@/components/effects/TiltCard";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Brain,
  Code,
  Cloud,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const },
  }),
};

export default function ProofStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="section-padding relative">
      {/* Gradient section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Stats with animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 md:mb-24">
          {siteConfig.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              className="text-center group"
            >
              <div className="text-[36px] md:text-[48px] font-bold leading-none mb-2">
                <AnimatedCounter
                  value={stat.value}
                  className="gradient-text"
                />
              </div>
              <div className="micro-label group-hover:text-accent-cyan transition-colors duration-200">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* What I Do */}
        <SectionReveal className="text-center mb-10">
          <span className="micro-label mb-3 block">What I Do</span>
          <h2 className="text-[28px] md:text-[36px] font-bold leading-[1.15] text-text-primary">
            Expertise That <span className="gradient-text">Ships</span>
          </h2>
        </SectionReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {siteConfig.whatIDo.map((item, i) => {
            const Icon = iconMap[item.icon] || Code;
            return (
              <SectionReveal key={item.title} delay={i * 0.1}>
                <TiltCard className="h-full">
                  <div className="bg-surface rounded-[18px] border border-[var(--border-hairline)] p-6 md:p-8 card-glow gradient-border h-full">
                    <div className="w-12 h-12 rounded-xl bg-[rgba(0,209,255,0.08)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon size={22} className="text-accent-cyan" />
                    </div>
                    <h3 className="text-[18px] md:text-[20px] font-semibold text-text-primary mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[15px] leading-[1.6] text-text-secondary mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-[13px] font-semibold text-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight size={14} />
                    </div>
                  </div>
                </TiltCard>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

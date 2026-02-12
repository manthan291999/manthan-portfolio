"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Server, Monitor, Cloud, Zap } from "lucide-react";
import { skillCategories, logoLoopItems } from "@/content/skills";
import SectionReveal from "@/components/effects/SectionReveal";
import TiltCard from "@/components/effects/TiltCard";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Brain,
  Server,
  Monitor,
  Cloud,
};

const levelColors = {
  expert: "bg-accent-cyan/15 text-cyan-700 border-accent-cyan/25",
  advanced: "bg-accent-violet/10 text-violet-700 border-accent-violet/20",
  intermediate: "bg-accent-amber/10 text-amber-700 border-accent-amber/20",
};

const levelBarWidth = {
  expert: "100%",
  advanced: "75%",
  intermediate: "50%",
};

const levelGradient = {
  expert: "from-accent-cyan/60 to-accent-cyan/30",
  advanced: "from-accent-violet/50 to-accent-violet/25",
  intermediate: "from-accent-amber/50 to-accent-amber/25",
};

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" ref={ref} className="section-padding relative">
      {/* Gradient section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <SectionReveal className="text-center mb-12">
          <span className="micro-label mb-3 block flex items-center justify-center gap-2">
            <Zap size={12} className="text-accent-cyan" />
            Skills
          </span>
          <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary leading-[1.15]">
            Technologies & <span className="gradient-text">Tools</span>
          </h2>
        </SectionReveal>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {skillCategories.map((category, i) => {
            const Icon = iconMap[category.icon] || Monitor;
            return (
              <SectionReveal key={category.title} delay={i * 0.1}>
                <TiltCard>
                  <div className="bg-surface rounded-[18px] border border-[var(--border-hairline)] p-6 card-glow gradient-border h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[rgba(0,209,255,0.08)] flex items-center justify-center">
                        <Icon size={20} className="text-accent-cyan" />
                      </div>
                      <h3 className="text-[18px] font-semibold text-text-primary">
                        {category.title}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {category.skills.map((skill, si) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: 0.2 + i * 0.1 + si * 0.03, duration: 0.3 }}
                          className="group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[13px] font-semibold text-text-primary group-hover:text-accent-cyan transition-colors">
                              {skill.name}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${levelColors[skill.level]}`}
                            >
                              {skill.level}
                            </span>
                          </div>
                          {/* Professional Interactive Level Bar */}
                          <div className="skill-bar-container group-hover:bg-gradient-professional group-hover:shadow-luxury transition-all duration-500">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isInView ? { width: levelBarWidth[skill.level] } : { width: 0 }}
                              transition={{ delay: 0.4 + i * 0.1 + si * 0.05, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const }}
                              className={`skill-bar-fill bg-gradient-to-r ${levelGradient[skill.level]} group-hover:shadow-luxury`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </SectionReveal>
            );
          })}
        </div>

        {/* Logo Loop */}
        <SectionReveal delay={0.3}>
          <div className="overflow-hidden rounded-[18px] border border-[var(--border-hairline)] bg-surface py-6">
            <div className="logo-loop flex whitespace-nowrap">
              {[...logoLoopItems, ...logoLoopItems].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="inline-flex items-center mx-6 text-[14px] font-semibold text-text-muted select-none hover:text-accent-cyan transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-accent-cyan/30 mr-3" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, MapPin, Calendar, ChevronRight, Sparkles } from "lucide-react";
import { experiences } from "@/content/experience";
import SectionReveal from "@/components/effects/SectionReveal";

const typeColors: Record<string, string> = {
  "full-time": "bg-accent-cyan/10 text-cyan-700 border-accent-cyan/20",
  contract: "bg-accent-violet/10 text-violet-700 border-accent-violet/20",
  freelance: "bg-accent-amber/10 text-amber-700 border-accent-amber/20",
  internship: "bg-green-50 text-green-700 border-green-200",
};

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="section-padding relative">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[900px] mx-auto px-6">
        {/* Header */}
        <SectionReveal className="text-center mb-14">
          <span className="micro-label mb-3 block flex items-center justify-center gap-2">
            <Briefcase size={12} className="text-accent-cyan" />
            Experience
          </span>
          <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary leading-[1.15]">
            Where I&apos;ve <span className="gradient-text">Worked</span>
          </h2>
        </SectionReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-accent-cyan/30 via-accent-violet/20 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <SectionReveal key={exp.id} delay={i * 0.12}>
                <div className="relative pl-12 md:pl-14 group">
                  {/* Timeline node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 300 }}
                    className="absolute left-[10px] md:left-[14px] top-[6px] z-10"
                  >
                    <div className="w-[18px] h-[18px] rounded-full bg-surface border-[3px] border-accent-cyan shadow-[0_0_0_4px_rgba(0,209,255,0.12)] group-hover:border-accent-violet group-hover:shadow-[0_0_0_6px_rgba(124,58,237,0.12)] transition-all duration-300" />
                  </motion.div>

                  {/* Card */}
                  <div className="bg-surface rounded-[18px] border border-[var(--border-hairline)] p-6 card-glow gradient-border hover:shadow-hover transition-all duration-300">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-[18px] font-bold text-text-primary group-hover:text-accent-cyan transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-[14px] font-semibold text-text-secondary mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${typeColors[exp.type] || typeColors["full-time"]}`}
                      >
                        {exp.type}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mb-4 text-[12px] text-text-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-accent-cyan/60" />
                        {exp.startDate} — {exp.endDate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-accent-cyan/60" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[13px] text-text-secondary leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles size={10} className="text-accent-amber" />
                        Key Achievements
                      </p>
                      <div className="space-y-1.5">
                        {exp.achievements.map((a, ai) => (
                          <motion.div
                            key={ai}
                            initial={{ opacity: 0, x: -8 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                            transition={{ delay: 0.5 + i * 0.1 + ai * 0.05 }}
                            className="flex items-start gap-2 text-[13px] text-text-secondary"
                          >
                            <ChevronRight size={12} className="text-accent-cyan mt-0.5 shrink-0" />
                            <span>{a}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[rgba(20,20,20,0.04)] text-text-muted hover:bg-accent-cyan/8 hover:text-text-primary transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

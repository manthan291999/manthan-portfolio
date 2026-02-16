"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, BookOpen, Star } from "lucide-react";
import { education } from "@/content/experience";
import SectionReveal from "@/components/effects/SectionReveal";
import TiltCard from "@/components/effects/TiltCard";

export default function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" ref={ref} className="section-padding relative">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[900px] mx-auto px-6">
        {/* Header */}
        <SectionReveal className="text-center mb-14">
          <span className="micro-label mb-3 block flex items-center justify-center gap-2">
            <GraduationCap size={12} className="text-accent-cyan" />
            Education
          </span>
          <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary leading-[1.15]">
            Academic <span className="gradient-text">Foundation</span>
          </h2>
        </SectionReveal>

        {education.map((edu, i) => (
          <SectionReveal key={edu.id} delay={i * 0.1}>
            <TiltCard>
              <div className="bg-surface rounded-[18px] border border-[var(--border-hairline)] overflow-hidden gradient-border card-glow">
                {/* Top accent bar */}
                <div className="h-1 bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-amber" />

                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan/10 to-accent-violet/10 flex items-center justify-center shrink-0">
                        <GraduationCap size={24} className="text-accent-cyan" />
                      </div>
                      <div>
                        <h3 className="text-[20px] font-bold text-text-primary">
                          {edu.degree}
                        </h3>
                        <p className="text-[15px] font-semibold text-accent-violet mt-0.5">
                          {edu.field}
                        </p>
                        <p className="text-[14px] text-text-secondary mt-1">
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    {/* Year badge */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(0,209,255,0.06)] border border-accent-cyan/15">
                      <BookOpen size={13} className="text-accent-cyan" />
                      <span className="text-[13px] font-semibold text-text-primary">
                        {edu.startYear} — {edu.endYear}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-[12px] text-text-muted mb-6">
                    <MapPin size={12} className="text-accent-cyan/60" />
                    {edu.location}
                  </div>

                  {/* Two-column layout */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Highlights */}
                    <div>
                      <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Star size={10} className="text-accent-amber" />
                        Highlights
                      </p>
                      <div className="space-y-2">
                        {edu.highlights.map((h, hi) => (
                          <motion.div
                            key={hi}
                            initial={{ opacity: 0, x: -8 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                            transition={{ delay: 0.3 + hi * 0.06 }}
                            className="flex items-start gap-2 text-[13px] text-text-secondary"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/50 mt-1.5 shrink-0" />
                            <span>{h}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Coursework */}
                    {edu.coursework && edu.coursework.length > 0 && (
                      <div>
                        <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <BookOpen size={10} className="text-accent-violet" />
                          Key Coursework
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {edu.coursework.map((course, ci) => (
                            <motion.span
                              key={ci}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                              transition={{ delay: 0.4 + ci * 0.04 }}
                              className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[rgba(20,20,20,0.04)] text-text-muted border border-[var(--border-hairline)] hover:bg-accent-violet/8 hover:text-text-primary hover:border-accent-violet/20 transition-all duration-200"
                            >
                              {course}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

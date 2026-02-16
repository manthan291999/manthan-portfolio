"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ExternalLink, Calendar, BadgeCheck } from "lucide-react";
import { certifications } from "@/content/experience";
import SectionReveal from "@/components/effects/SectionReveal";
import TiltCard from "@/components/effects/TiltCard";

// Accent color cycling for visual variety
const accentCycle = [
  { border: "border-accent-cyan/20", bg: "from-accent-cyan/8 to-accent-cyan/3", icon: "text-accent-cyan", glow: "hover:shadow-[0_0_24px_rgba(0,209,255,0.08)]" },
  { border: "border-accent-violet/20", bg: "from-accent-violet/8 to-accent-violet/3", icon: "text-accent-violet", glow: "hover:shadow-[0_0_24px_rgba(124,58,237,0.08)]" },
  { border: "border-accent-amber/20", bg: "from-accent-amber/8 to-accent-amber/3", icon: "text-accent-amber", glow: "hover:shadow-[0_0_24px_rgba(245,158,11,0.08)]" },
];

export default function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="certifications" ref={ref} className="section-padding relative">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[1000px] mx-auto px-6">
        {/* Header */}
        <SectionReveal className="text-center mb-14">
          <span className="micro-label mb-3 block flex items-center justify-center gap-2">
            <Award size={12} className="text-accent-cyan" />
            Certifications
          </span>
          <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary leading-[1.15]">
            Continuous <span className="gradient-text">Learning</span>
          </h2>
        </SectionReveal>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => {
            const accent = accentCycle[i % accentCycle.length];
            return (
              <SectionReveal key={cert.id} delay={i * 0.08}>
                <TiltCard className="h-full">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className={`h-full bg-surface rounded-[18px] border border-[var(--border-hairline)] p-5 gradient-border transition-all duration-300 ${accent.glow} flex flex-col`}
                  >
                    {/* Icon + Year */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent.bg} flex items-center justify-center`}>
                        <BadgeCheck size={20} className={accent.icon} />
                      </div>
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-text-muted">
                        <Calendar size={11} />
                        {cert.date}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-[15px] font-bold text-text-primary leading-snug mb-1.5">
                      {cert.name}
                    </h3>

                    {/* Issuer */}
                    <p className="text-[12px] text-text-secondary font-medium mb-4">
                      {cert.issuer}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mt-auto mb-3">
                      {cert.skills.map((skill, si) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                          transition={{ delay: 0.4 + i * 0.06 + si * 0.03 }}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${accent.border} bg-gradient-to-r ${accent.bg}`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    {/* Link */}
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent-cyan hover:text-accent-violet transition-colors mt-auto pt-2"
                      >
                        View Credential
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </motion.div>
                </TiltCard>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

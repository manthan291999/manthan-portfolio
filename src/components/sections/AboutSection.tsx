"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Download, Mail, MapPin, Briefcase, CheckCircle, Sparkles } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import SectionReveal from "@/components/effects/SectionReveal";
import TiltCard from "@/components/effects/TiltCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const },
  }),
};

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="section-padding relative">
      {/* Gradient section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <SectionReveal className="text-center mb-12">
          <span className="micro-label mb-3 block">About</span>
          <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary leading-[1.15]">
            {siteConfig.about.intro}
          </h2>
        </SectionReveal>

        <div className="grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-12">
          {/* Profile Card with 3D tilt */}
          <SectionReveal direction="left" delay={0.1}>
            <TiltCard className="self-start">
              <div className="relative bg-surface rounded-[18px] border border-[var(--border-hairline)] p-6 shadow-luxury overflow-hidden gradient-border card-reveal float-elegant">
                {/* Luxury Glass highlight gradient */}
                <div
                  className="absolute top-0 left-0 right-0 h-28 pointer-events-none gradient-luxury opacity-20"
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  {/* Avatar with pulse ring */}
                  <div className="relative w-[56px] h-[56px] max-md:w-[48px] max-md:h-[48px] mb-4">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <Image
                        src="/profile.jpg"
                        alt={siteConfig.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                    {/* Animated ring */}
                    <div className="absolute inset-[-3px] rounded-full border-2 border-accent-cyan/20" style={{ animation: "pulse-ring 3s ease-out infinite" }} />
                  </div>

                  <h3 className="text-[20px] font-bold text-text-primary mb-1">
                    {siteConfig.name}
                  </h3>
                  <p className="text-[14px] text-text-secondary mb-4">
                    {siteConfig.role}
                  </p>

                  {/* Info pills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-text-muted bg-[rgba(20,20,20,0.04)] px-3 py-1.5 rounded-full hover:bg-[rgba(0,209,255,0.06)] hover:text-text-primary transition-all">
                      <MapPin size={12} /> {siteConfig.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-text-muted bg-[rgba(20,20,20,0.04)] px-3 py-1.5 rounded-full hover:bg-[rgba(0,209,255,0.06)] hover:text-text-primary transition-all">
                      <Briefcase size={12} /> {siteConfig.role}
                    </span>
                    {siteConfig.available && (
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                        <span className="relative w-1.5 h-1.5 rounded-full bg-green-500">
                          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
                        </span>
                        Available
                      </span>
                    )}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5 mb-6">
                    {siteConfig.about.highlights.map((h, i) => (
                      <motion.div
                        key={h}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: 0.3 + i * 0.08, ease: [0.2, 0.8, 0.2, 1] as const }}
                        className="flex items-start gap-2 text-[13px] text-text-secondary"
                      >
                        <CheckCircle
                          size={14}
                          className="text-accent-cyan mt-0.5 shrink-0"
                        />
                        <span>{h}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Card CTAs */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href={siteConfig.resumeUrl}
                      download
                      data-hover
                      className="inline-flex items-center justify-center gap-2 h-[42px] px-4 rounded-[12px] btn-professional text-[13px] font-bold transition-all magnetic float-elegant flex-1"
                    >
                      <Download size={14} />
                      Resume
                    </a>
                    <a
                      href="#contact"
                      data-hover
                      className="inline-flex items-center justify-center gap-2 h-[42px] px-4 rounded-[12px] border border-[var(--border-strong)] text-text-primary text-[13px] font-bold transition-all neomorphic magnetic hover:shadow-luxury hover:-translate-y-[1px] flex-1"
                    >
                      <Mail size={14} />
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </SectionReveal>

          {/* Story content */}
          <SectionReveal direction="right" delay={0.2}>
            <div className="space-y-5">
              {siteConfig.about.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const }}
                  className="text-[16px] leading-[1.7] text-text-secondary"
                >
                  {p}
                </motion.p>
              ))}

              {/* Toolbelt snapshot */}
              <div className="mt-8">
                <h4 className="micro-label mb-4 flex items-center gap-2">
                  <Sparkles size={12} className="text-accent-cyan" />
                  Core Toolbelt
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "PyTorch",
                    "React",
                    "Next.js",
                    "TypeScript",
                    "FastAPI",
                    "Docker",
                    "AWS",
                    "PostgreSQL",
                    "Kubernetes",
                    "Hugging Face",
                    "Node.js",
                  ].map((tool, i) => (
                    <motion.span
                      key={tool}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.5 + i * 0.04, duration: 0.3 }}
                      className="px-3 py-1.5 rounded-full text-[12px] font-semibold text-text-primary bg-[rgba(20,20,20,0.05)] border border-[var(--border-hairline)] hover:border-[rgba(0,209,255,0.30)] hover:bg-[rgba(0,209,255,0.06)] hover:shadow-[0_4px_16px_rgba(0,209,255,0.10)] hover:-translate-y-[1px] transition-all duration-200 cursor-default"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

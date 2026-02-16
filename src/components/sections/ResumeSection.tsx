"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, Linkedin, ExternalLink, Award, Briefcase, GraduationCap, FileText } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import SectionReveal from "@/components/effects/SectionReveal";
import TiltCard from "@/components/effects/TiltCard";

const highlights = [
  {
    icon: Briefcase,
    title: "5+ Years Experience",
    description: "From freelance web development to AI & data analytics for international clients.",
    accent: "cyan",
  },
  {
    icon: Award,
    title: "MSc in AI (Essex, UK)",
    description: "Advanced AI/ML expertise from a top UK university, combined with hands-on engineering.",
    accent: "violet",
  },
  {
    icon: GraduationCap,
    title: "15+ Projects Delivered",
    description: "E-commerce platforms, automation tools, predictive models, and real-time applications.",
    accent: "amber",
  },
];

const accentBg: Record<string, string> = {
  cyan: "bg-[rgba(0,209,255,0.08)]",
  violet: "bg-[rgba(124,58,237,0.08)]",
  amber: "bg-[rgba(245,158,11,0.08)]",
};
const accentText: Record<string, string> = {
  cyan: "text-accent-cyan",
  violet: "text-accent-violet",
  amber: "text-accent-amber",
};

export default function ResumeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="resume" ref={ref} className="section-padding relative">
      {/* Gradient section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <SectionReveal className="text-center mb-12">
          <span className="micro-label mb-3 block flex items-center justify-center gap-2">
            <FileText size={12} className="text-accent-cyan" />
            Resume
          </span>
          <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary leading-[1.15]">
            Experience & <span className="gradient-text">Background</span>
          </h2>
        </SectionReveal>

        {/* Download & LinkedIn */}
        <SectionReveal delay={0.1} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <a
            href={siteConfig.resumeUrl}
            download
            data-hover
            className="group inline-flex items-center gap-2 h-[48px] px-[20px] rounded-[14px] bg-text-primary text-base text-[14px] font-bold transition-all hover:-translate-y-[2px] hover:shadow-[0_18px_50px_rgba(20,20,20,0.16)]"
          >
            <Download size={16} className="group-hover:translate-y-[2px] transition-transform" />
            Download Resume (PDF)
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="group inline-flex items-center gap-2 h-[48px] px-[20px] rounded-[14px] border-2 border-[rgba(20,20,20,0.14)] text-text-primary text-[14px] font-bold transition-all hover:bg-[rgba(0,209,255,0.06)] hover:border-[rgba(0,209,255,0.30)] hover:-translate-y-[2px]"
          >
            <Linkedin size={16} />
            View LinkedIn
            <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </SectionReveal>

        {/* PDF Viewer */}
        <SectionReveal delay={0.15}>
          <div className="bg-surface rounded-[18px] border border-[var(--border-hairline)] shadow-[var(--shadow-soft)] overflow-hidden mb-12 gradient-border">
            <object
              data={siteConfig.resumeUrl}
              type="application/pdf"
              className="w-full h-[700px] max-md:h-[500px]"
              aria-label="Resume Preview"
            >
              {/* Fallback for browsers that can't render PDFs inline */}
              <div className="flex flex-col items-center justify-center h-[400px] gap-4 px-6 text-center">
                <FileText size={48} className="text-text-muted" />
                <p className="text-[15px] text-text-secondary font-medium">
                  PDF preview is not supported in your browser.
                </p>
                <a
                  href={siteConfig.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 h-[42px] px-5 rounded-[12px] bg-text-primary text-base text-[13px] font-bold hover:shadow-hover transition-all"
                >
                  <Download size={14} />
                  Download Resume
                </a>
              </div>
            </object>
          </div>
        </SectionReveal>

        {/* Highlights with TiltCard */}
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <SectionReveal key={item.title} delay={0.2 + i * 0.1}>
                <TiltCard className="h-full">
                  <div className="bg-surface rounded-[18px] border border-[var(--border-hairline)] p-6 card-glow gradient-border h-full">
                    <div className={`w-10 h-10 rounded-xl ${accentBg[item.accent]} flex items-center justify-center mb-4`}>
                      <Icon size={20} className={accentText[item.accent]} />
                    </div>
                    <h3 className="text-[16px] font-semibold text-text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-text-secondary leading-[1.6]">
                      {item.description}
                    </p>
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

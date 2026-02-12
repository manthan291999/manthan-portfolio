"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ChevronRight,
  X,
  ArrowRight,
  Sparkles,
  Layers,
} from "lucide-react";
import { projects, getAllTags, type Project } from "@/content/projects";
import LetterGlitch from "@/components/effects/LetterGlitch";
import SectionReveal from "@/components/effects/SectionReveal";
import TiltCard from "@/components/effects/TiltCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const },
  }),
};

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const tags = getAllTags();
  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  return (
    <section id="projects" ref={ref} className="section-padding relative overflow-hidden">
      {/* Letter Glitch Background */}
      <LetterGlitch />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <SectionReveal className="text-center mb-8">
          <span className="micro-label mb-3 block flex items-center justify-center gap-2">
            <Layers size={12} className="text-accent-cyan" />
            Projects
          </span>
          <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary leading-[1.15]">
            Built to Ship, Designed to <span className="gradient-text">Scale</span>
          </h2>
        </SectionReveal>

        {/* Filters with active animation */}
        <motion.div
          custom={1}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <button
            onClick={() => setActiveTag(null)}
            className={`relative px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 ${
              activeTag === null
                ? "bg-text-primary text-base shadow-[0_4px_16px_rgba(20,20,20,0.15)]"
                : "bg-[rgba(20,20,20,0.05)] text-text-secondary hover:bg-[rgba(20,20,20,0.08)] hover:-translate-y-[1px]"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`relative px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 ${
                activeTag === tag
                  ? "bg-text-primary text-base shadow-[0_4px_16px_rgba(20,20,20,0.15)]"
                  : "bg-[rgba(20,20,20,0.05)] text-text-secondary hover:bg-[rgba(20,20,20,0.08)] hover:-translate-y-[1px]"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Stacked Cards with TiltCard */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const }}
              >
                <TiltCard>
                  <div
                    className="group relative bg-surface rounded-[18px] border border-[var(--border-hairline)] p-6 md:p-8 card-glow gradient-border cursor-pointer card-reveal hover:shadow-luxury transition-all duration-300"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="micro-label text-accent-cyan">{project.year}</span>
                          {project.featured && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-amber/10 text-amber-700 uppercase tracking-widest">
                              <Sparkles size={8} />
                              Featured
                            </span>
                          )}
                        </div>
                        <h3 className="text-[18px] md:text-[22px] font-semibold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors duration-200">
                          {project.title}
                        </h3>
                        <p className="text-[14px] md:text-[15px] text-text-secondary leading-[1.6] mb-4 max-w-[600px]">
                          {project.tagline}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.stack.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-lg text-[11px] uppercase font-bold tracking-[0.10em] bg-[rgba(20,20,20,0.04)] text-text-muted border border-transparent group-hover:border-[rgba(0,209,255,0.12)] transition-colors duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.stack.length > 5 && (
                            <span className="px-2.5 py-1 rounded-lg text-[11px] uppercase font-bold tracking-[0.10em] bg-[rgba(0,209,255,0.06)] text-accent-cyan">
                              +{project.stack.length - 5}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* View arrow */}
                      <div className="flex items-center gap-2 shrink-0 text-text-muted group-hover:text-accent-cyan transition-colors">
                        <span className="text-[13px] font-semibold hidden md:inline">View Details</span>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[5vh] pb-[5vh] px-4 bg-black/40 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const }}
        className="relative w-full max-w-[800px] bg-surface rounded-[22px] border border-[var(--border-hairline)] shadow-[0_30px_80px_rgba(0,0,0,0.15)] p-6 md:p-10 my-auto"
      >
        {/* Gradient top accent */}
        <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, transparent, #00D1FF, #7C3AED, transparent)" }} />

        {/* Close button */}
        <button
          onClick={onClose}
          data-hover
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[rgba(20,20,20,0.06)] flex items-center justify-center hover:bg-[rgba(20,20,20,0.12)] hover:rotate-90 transition-all duration-200"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="micro-label text-accent-cyan">{project.year}</span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-amber/10 text-amber-700 uppercase tracking-widest">
                <Sparkles size={8} />
                Featured
              </span>
            )}
          </div>
          <h2 className="text-[24px] md:text-[32px] font-bold text-text-primary mb-2">
            {project.title}
          </h2>
          <p className="text-[16px] text-text-secondary">{project.tagline}</p>
        </div>

        {/* Case study sections */}
        <div className="space-y-6">
          <DetailBlock title="Problem" content={project.problem} accent="cyan" />
          <DetailBlock title="Solution" content={project.solution} accent="violet" />
          <DetailBlock title="Architecture" content={project.architecture} accent="amber" />

          {/* Stack */}
          <div>
            <h4 className="micro-label mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full text-[12px] font-semibold bg-[rgba(20,20,20,0.05)] text-text-primary border border-[var(--border-hairline)] hover:border-[rgba(0,209,255,0.25)] hover:bg-[rgba(0,209,255,0.06)] transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            <h4 className="micro-label mb-3">Results</h4>
            <ul className="space-y-2">
              {project.results.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-[14px] text-text-secondary">
                  <ArrowRight size={14} className="text-accent-cyan mt-1 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Tradeoffs */}
          {project.tradeoffs.length > 0 && (
            <div>
              <h4 className="micro-label mb-3">Key Tradeoffs</h4>
              <ul className="space-y-2">
                {project.tradeoffs.map((t, i) => (
                  <li key={i} className="text-[14px] text-text-secondary leading-[1.6]">
                    • {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next steps */}
          {project.nextSteps.length > 0 && (
            <div>
              <h4 className="micro-label mb-3">Next Steps</h4>
              <ul className="space-y-1">
                {project.nextSteps.map((n, i) => (
                  <li key={i} className="text-[14px] text-text-secondary">
                    → {n}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--border-hairline)]">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="inline-flex items-center gap-2 h-[40px] px-4 rounded-[12px] border border-[var(--border-strong)] text-[13px] font-bold text-text-primary hover:bg-[rgba(0,209,255,0.06)] hover:border-[rgba(0,209,255,0.25)] hover:-translate-y-[1px] transition-all"
                >
                  {link.label.toLowerCase().includes("github") ? (
                    <Github size={14} />
                  ) : (
                    <ExternalLink size={14} />
                  )}
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="pt-4">
            <a
              href="#contact"
              onClick={onClose}
              data-hover
              className="group inline-flex items-center gap-2 h-[44px] px-[18px] rounded-[14px] bg-text-primary text-base text-[14px] font-bold transition-all hover:-translate-y-[1px] hover:shadow-[0_18px_50px_rgba(20,20,20,0.16)]"
            >
              Interested? Let&apos;s Talk
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DetailBlock({ title, content, accent = "cyan" }: { title: string; content: string; accent?: string }) {
  const colorMap: Record<string, string> = {
    cyan: "border-l-accent-cyan/40",
    violet: "border-l-accent-violet/40",
    amber: "border-l-accent-amber/40",
  };
  return (
    <div className={`border-l-2 ${colorMap[accent] || colorMap.cyan} pl-4`}>
      <h4 className="micro-label mb-2">{title}</h4>
      <p className="text-[14px] md:text-[15px] text-text-secondary leading-[1.7]">
        {content}
      </p>
    </div>
  );
}

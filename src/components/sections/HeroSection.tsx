"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, MousePointer2 } from "lucide-react";
import { siteConfig } from "@/content/site-config";

import ASCIIName from "@/components/effects/ASCIIName";
import VariableProximity from "@/components/effects/VariableProximity";
import FloatingParticles from "@/components/effects/FloatingParticles";
import TypewriterRole from "@/components/effects/TypewriterRole";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const },
  }),
};

const wordReveal = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.35 + i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const },
  }),
};

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const auraY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const auraScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.4]);
  const auraOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const headingWords = "Building Intelligent Systems".split(" ");

  return (
    <section
      id="home"
      className="relative min-h-[92vh] max-md:min-h-[80vh] flex items-center justify-center grid-bg overflow-hidden"
    >
      {/* Floating particles background */}
      <FloatingParticles className="absolute inset-0 z-0" />

      {/* Parallax aura blob */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] max-md:w-[350px] max-md:h-[280px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,209,255,0.12) 0%, rgba(124,58,237,0.10) 35%, rgba(245,158,11,0.04) 55%, transparent 70%)",
          filter: "blur(60px)",
          y: auraY,
          scale: auraScale,
          opacity: auraOpacity,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        {/* ASCII Name */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex justify-center mb-4"
        >
          <ASCIIName name="MANTHAN MITTAL" />
        </motion.div>

        {/* Typewriter Role */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-5"
        >
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[2px] bg-accent-cyan/40 rounded-full" />
            <TypewriterRole
              roles={["AI ENGINEER", "SOFTWARE DEVELOPER", "ML SYSTEMS BUILDER", "FULL-STACK DEVELOPER"]}
              className="text-[14px] font-bold tracking-[0.12em] text-text-primary font-mono"
              typingSpeed={70}
              deletingSpeed={35}
              pauseDuration={2500}
            />
            <span className="w-8 h-[2px] bg-accent-cyan/40 rounded-full" />
          </div>
        </motion.div>

        {/* H1 Statement — word-by-word reveal with blur */}
        <h1 className="text-[40px] md:text-[60px] font-bold leading-[1.05] tracking-tight text-text-primary mb-4 flex flex-wrap justify-center gap-x-[0.3em]">
          {headingWords.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={wordReveal}
              className={i === 1 ? "text-luxury" : ""}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Proximity Subtitle */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10"
        >
          <VariableProximity
            text={siteConfig.tagline}
            className="text-[16px] md:text-[18px] text-text-secondary leading-[1.6] max-w-[52ch] mx-auto inline-block"
            radius={120}
            minWeight={300}
            maxWeight={700}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          <a
            href="#contact"
            data-hover
            className="group btn-professional inline-flex items-center gap-2 h-[48px] max-md:h-[44px] px-[22px] rounded-[16px] text-[14px] font-bold transition-all duration-300 magnetic float-elegant max-sm:w-full justify-center"
          >
            <MousePointer2 size={16} className="group-hover:rotate-[-12deg] transition-transform duration-200" />
            Get in Touch
          </a>
          <a
            href={siteConfig.resumeUrl}
            download
            data-hover
            className="group inline-flex items-center gap-2 h-[48px] max-md:h-[44px] px-[22px] rounded-[16px] border-2 border-[rgba(20,20,20,0.14)] text-text-primary text-[14px] font-bold transition-all duration-300 neomorphic magnetic hover:shadow-luxury hover:-translate-y-[2px] active:translate-y-0 max-sm:w-full justify-center"
          >
            <Download size={16} className="group-hover:translate-y-[2px] transition-transform duration-200" />
            Download Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center justify-center gap-3"
        >
          {[
            { icon: Github, href: siteConfig.social.github, label: "GitHub" },
            { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
            { icon: Mail, href: siteConfig.social.email, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel={label !== "Email" ? "noopener noreferrer" : undefined}
              aria-label={label}
              data-hover
              className="group flex items-center justify-center w-11 h-11 rounded-full bg-[rgba(20,20,20,0.04)] border border-transparent text-text-secondary hover:text-accent-cyan hover:bg-[rgba(0,209,255,0.08)] hover:border-[rgba(0,209,255,0.20)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,209,255,0.12)]"
            >
              <Icon size={18} className="group-hover:scale-110 transition-transform duration-200" />
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-text-muted">Scroll</span>
            <ArrowDown size={16} className="text-text-muted" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

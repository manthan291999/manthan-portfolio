"use client";

import { Github, Linkedin, Mail, Copy, ArrowUp, Heart } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = siteConfig.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative">
      {/* Gradient section divider */}
      <div className="section-divider" />

      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Left: Name + Role */}
          <div>
            <h4 className="text-[16px] font-bold text-text-primary mb-1">
              {siteConfig.name}
            </h4>
            <p className="text-[13px] text-text-muted mb-3">
              {siteConfig.role}
            </p>
            {siteConfig.available && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                <span className="relative w-1.5 h-1.5 rounded-full bg-green-500">
                  <span className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
                </span>
                Open to opportunities
              </span>
            )}
          </div>

          {/* Middle: Nav Links */}
          <div>
            <h5 className="micro-label mb-3">Navigation</h5>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-hover
                  className="text-[13px] font-medium text-text-secondary hover:text-accent-cyan transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-[-2px] left-0 w-0 h-[1.5px] bg-gradient-to-r from-accent-cyan to-accent-violet group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Social */}
          <div>
            <h5 className="micro-label mb-3">Connect</h5>
            <div className="flex items-center gap-2">
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
                  className="group flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(20,20,20,0.04)] text-text-muted transition-all duration-200 neomorphic-inset magnetic hover:shadow-luxury hover:-translate-y-[2px] hover:text-luxury"
                >
                  <Icon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
              <button
                onClick={copyEmail}
                data-hover
                className="flex items-center gap-1.5 ml-2 px-3 py-1.5 rounded-full text-[12px] font-medium bg-[rgba(20,20,20,0.04)] text-text-muted hover:bg-[rgba(0,209,255,0.08)] hover:text-accent-cyan transition-all"
              >
                <Copy size={12} />
                {emailCopied ? "Copied!" : "Copy email"}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[rgba(20,20,20,0.50)] flex items-center gap-1">
            © {new Date().getFullYear()} {siteConfig.name}. Built with
            <Heart size={10} className="text-accent-cyan mx-0.5" />
            using Next.js & Tailwind CSS.
          </p>
          <button
            onClick={scrollToTop}
            data-hover
            className="group flex items-center gap-1.5 text-[12px] font-medium text-text-muted transition-colors magnetic text-professional hover:shadow-luxury"
          >
            Back to top
            <motion.span
              className="inline-block"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowUp size={14} />
            </motion.span>
          </button>
        </div>
      </div>
    </footer>
  );
}

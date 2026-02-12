"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    if (diff > 5 && latest > 200) setHidden(true);
    else if (diff < -5) setHidden(false);
    lastScrollY.current = latest;
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const observerOptions = {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const }}
        className={cn(
          "fixed top-[18px] left-1/2 -translate-x-1/2 z-50",
          "max-md:top-[12px]"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-[6px] px-[6px] h-[56px] rounded-full transition-all duration-300",
            "max-md:h-[52px]",
            isScrolled
              ? "bg-[rgba(255,255,255,0.72)] border border-[rgba(20,20,20,0.10)] shadow-luxury backdrop-blur-2xl"
              : "bg-[rgba(255,255,255,0.50)] border border-[rgba(20,20,20,0.06)] shadow-elegant backdrop-blur-xl"
          )}
        >
          {/* Desktop nav items */}
          <div className="hidden md:flex items-center gap-[2px] relative">
            {siteConfig.nav.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "relative px-[14px] py-[8px] rounded-full text-[13px] font-semibold tracking-[0.04em] transition-all duration-200 z-10",
                    "hover:-translate-y-[1px]",
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {/* Active background pill with layout animation */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-[rgba(0,209,255,0.12)] border border-[rgba(0,209,255,0.25)]"
                      style={{ boxShadow: "0 4px 20px rgba(0,209,255,0.12), inset 0 1px 0 rgba(255,255,255,0.5)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Separator */}
          <div className="hidden md:block w-[1px] h-6 bg-[rgba(20,20,20,0.08)] mx-1" />

          {/* Professional Contact CTA (desktop) */}
          <button
            onClick={() => handleNavClick("#contact")}
            className={cn(
              "hidden md:inline-flex items-center gap-1.5 px-[16px] py-[8px] rounded-full text-[13px] font-bold btn-professional",
              "text-white transition-all duration-200",
              "hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(20,20,20,0.2)]",
              "active:translate-y-0 active:shadow-none"
            )}
          >
            <Sparkles size={12} />
            Hire Me
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center gap-2 px-[14px] py-[8px] text-[13px] font-semibold text-text-primary"
            aria-label="Toggle navigation menu"
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.div>
            <span>Menu</span>
          </button>

          {/* Professional Contact CTA mobile */}
          <button
            onClick={() => handleNavClick("#contact")}
            className={cn(
              "md:hidden ml-auto px-[14px] py-[8px] rounded-full text-[13px] font-bold btn-professional text-white",
            )}
          >
            <Sparkles size={12} className="inline mr-1" />
            Hire Me
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] as const }}
              className="fixed inset-x-0 top-[72px] z-40 mx-4 md:hidden"
            >
              <div className="rounded-2xl border border-[rgba(20,20,20,0.10)] bg-[rgba(255,255,255,0.92)] backdrop-blur-2xl p-3 shadow-[0_20px_60px_rgba(20,20,20,0.15)]">
                <div className="flex flex-col gap-0.5">
                  {siteConfig.nav.map((item, index) => {
                    const sectionId = item.href.replace("#", "");
                    const isActive = activeSection === sectionId;
                    return (
                      <motion.button
                        key={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleNavClick(item.href)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl text-[14px] font-semibold transition-all",
                          isActive
                            ? "bg-[rgba(0,209,255,0.10)] text-text-primary"
                            : "text-text-secondary hover:bg-[rgba(20,20,20,0.04)]"
                        )}
                      >
                        {item.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

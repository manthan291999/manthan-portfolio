"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Github, Linkedin, Copy, Check, MapPin, Clock, Sparkles, MessageSquare } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import LaserFlow from "@/components/effects/LaserFlow";
import SectionReveal from "@/components/effects/SectionReveal";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  reason: z.string().min(1, "Please select a reason"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { honeypot: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch {
      alert("Network error. Please try again or email me directly.");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
    } catch {
      // Fallback for non-HTTPS or older browsers
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

  const inputStyles = (hasError: boolean) =>
    `w-full h-[48px] px-[16px] rounded-[14px] bg-[rgba(255,255,255,0.80)] border-2 text-text-primary text-[14px] placeholder:text-[rgba(20,20,20,0.30)] transition-all duration-200 focus:border-[rgba(102,126,234,0.50)] focus:shadow-[0_0_0_4px_rgba(102,126,234,0.08)] outline-none ${
      hasError
        ? "border-[rgba(245,158,11,0.55)]"
        : "border-[rgba(20,20,20,0.10)] hover:border-[rgba(102,126,234,0.25)]"
    }`;

  return (
    <section id="contact" ref={ref} className="section-padding relative overflow-hidden">
      {/* Laser Flow Background */}
      <LaserFlow />

      <div className="relative z-10 max-w-[720px] mx-auto px-6">
        {/* Header */}
        <SectionReveal className="text-center mb-10">
          <span className="micro-label mb-3 block flex items-center justify-center gap-2">
            <MessageSquare size={12} className="text-accent-cyan" />
            Contact
          </span>
          <h2 className="text-[28px] md:text-[36px] font-bold text-text-primary leading-[1.15] mb-3">
            Let&apos;s Build Something <span className="gradient-text">Together</span>
          </h2>
          <div className="flex items-center justify-center gap-4 text-[14px] text-text-secondary">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-accent-cyan" />
              {siteConfig.location}
            </span>
            {siteConfig.available && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-green-600" />
                <span className="text-green-700 font-medium">Available for work</span>
              </span>
            )}
          </div>
        </SectionReveal>

        {/* Enhanced Professional Form Card */}
        <SectionReveal delay={0.1}>
          <div className="relative rounded-[22px] p-[1px] gradient-border">
            <div className="bg-surface rounded-[22px] p-6 md:p-8 shadow-luxury">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const }}
                  className="text-center py-14"
                >
                  {/* Success ring animation */}
                  <div className="relative w-20 h-20 mx-auto mb-5">
                    <div className="absolute inset-0 rounded-full bg-accent-cyan/10" />
                    <div className="absolute inset-[-4px] rounded-full border-2 border-accent-cyan/20" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <Check size={32} className="text-accent-cyan" />
                      </motion.div>
                    </div>
                  </div>
                  <h3 className="text-[22px] font-bold text-text-primary mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-[15px] text-text-secondary mb-1">
                    Thank you for reaching out.
                  </p>
                  <p className="text-[14px] text-text-muted">
                    I&apos;ll get back to you within 24–48 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  {/* Honeypot */}
                  <input
                    {...register("honeypot")}
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute opacity-0 h-0 w-0 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Name + Email row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="micro-label mb-2 block">
                        Name
                      </label>
                      <input
                        {...register("name")}
                        id="name"
                        type="text"
                        placeholder="Your name"
                        className={inputStyles(!!errors.name)}
                      />
                      {errors.name && (
                        <p className="text-[12px] text-amber-700 mt-1.5 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-amber-500" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="micro-label mb-2 block">
                        Email
                      </label>
                      <input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className={inputStyles(!!errors.email)}
                      />
                      {errors.email && (
                        <p className="text-[12px] text-amber-700 mt-1.5 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-amber-500" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <label htmlFor="reason" className="micro-label mb-2 block">
                      Reason
                    </label>
                    <select
                      {...register("reason")}
                      id="reason"
                      className={`${inputStyles(!!errors.reason)} appearance-none`}
                    >
                      <option value="">Select a reason</option>
                      <option value="hiring">Hiring / Job Opportunity</option>
                      <option value="freelance">Freelance / Contract Work</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.reason && (
                      <p className="text-[12px] text-amber-700 mt-1.5 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-amber-500" />
                        {errors.reason.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="micro-label mb-2 block">
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      id="message"
                      placeholder="Tell me about your project or opportunity..."
                      rows={5}
                      className={`w-full min-h-[140px] px-[16px] py-[14px] rounded-[14px] bg-[rgba(255,255,255,0.80)] border-2 text-text-primary text-[14px] placeholder:text-[rgba(20,20,20,0.30)] transition-all duration-200 focus:border-[rgba(0,209,255,0.50)] focus:shadow-[0_0_0_4px_rgba(0,209,255,0.08)] outline-none resize-y ${
                        errors.message
                          ? "border-[rgba(245,158,11,0.55)]"
                          : "border-[rgba(20,20,20,0.10)] hover:border-[rgba(20,20,20,0.20)]"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[12px] text-amber-700 mt-1.5 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-amber-500" />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-hover
                    className="group btn-professional inline-flex items-center justify-center gap-2 w-full h-[48px] rounded-[14px] text-base text-[14px] font-bold transition-all duration-300 hover:-translate-y-[1px] magnetic float-elegant disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-base/30 border-t-base rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </SectionReveal>

        {/* Direct links */}
        <SectionReveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={copyEmail}
              data-hover
              className="inline-flex items-center gap-2 h-[42px] px-5 rounded-[12px] border border-[var(--border-hairline)] bg-surface text-[13px] font-semibold text-text-secondary hover:border-[rgba(0,209,255,0.25)] hover:text-text-primary hover:shadow-[0_4px_16px_rgba(0,209,255,0.08)] transition-all"
            >
              {emailCopied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
              {emailCopied ? "Copied!" : siteConfig.email}
            </button>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="inline-flex items-center gap-2 h-[42px] px-5 rounded-[12px] border border-[var(--border-hairline)] bg-surface text-[13px] font-semibold text-text-secondary hover:border-[rgba(0,209,255,0.25)] hover:text-text-primary hover:shadow-[0_4px_16px_rgba(0,209,255,0.08)] transition-all"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="inline-flex items-center gap-2 h-[42px] px-5 rounded-[12px] border border-[var(--border-hairline)] bg-surface text-[13px] font-semibold text-text-secondary hover:border-[rgba(0,209,255,0.25)] hover:text-text-primary hover:shadow-[0_4px_16px_rgba(0,209,255,0.08)] transition-all"
            >
              <Github size={14} />
              GitHub
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

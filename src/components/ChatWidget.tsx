"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Folder,
  Code,
  Calendar,
  FileText,
  ChevronDown,
  Bot,
  User,
  Minus,
} from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { QUICK_ACTIONS } from "@/types/chat";
import type { ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";

// ─── Icon map for quick actions ───
const iconMap: Record<string, typeof Folder> = {
  folder: Folder,
  code: Code,
  calendar: Calendar,
  file: FileText,
};

// ─── Simple markdown renderer ───
function renderMarkdown(text: string) {
  // Split into parts, handling bold, inline code, and links
  const parts: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold: **text**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Inline code: `code`
    const codeMatch = remaining.match(/`([^`]+)`/);
    // Link: [text](url)
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    // Find earliest match
    const matches = [
      boldMatch ? { type: "bold", index: boldMatch.index!, match: boldMatch } : null,
      codeMatch ? { type: "code", index: codeMatch.index!, match: codeMatch } : null,
      linkMatch ? { type: "link", index: linkMatch.index!, match: linkMatch } : null,
    ]
      .filter(Boolean)
      .sort((a, b) => a!.index - b!.index);

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0]!;
    const before = remaining.slice(0, first.index);
    if (before) parts.push(before);

    if (first.type === "bold") {
      parts.push(
        <strong key={key++} className="font-semibold">
          {first.match[1]}
        </strong>
      );
      remaining = remaining.slice(first.index + first.match[0].length);
    } else if (first.type === "code") {
      parts.push(
        <code
          key={key++}
          className="bg-[rgba(0,0,0,0.06)] px-1.5 py-0.5 rounded text-[12px] font-mono"
        >
          {first.match[1]}
        </code>
      );
      remaining = remaining.slice(first.index + first.match[0].length);
    } else if (first.type === "link") {
      parts.push(
        <a
          key={key++}
          href={first.match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-cyan underline underline-offset-2 hover:text-accent-violet transition-colors"
        >
          {first.match[1]}
        </a>
      );
      remaining = remaining.slice(first.index + first.match[0].length);
    }
  }

  return parts;
}

function formatMessageContent(content: string) {
  const lines = content.split("\n");
  const elements: ReactNode[] = [];
  let listBuffer: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-1 my-1.5">
          {listBuffer.map((item, i) => (
            <li key={i} className="text-[13px] leading-[1.6]">
              {renderMarkdown(item)}
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
      listBuffer.push(trimmed.slice(2));
    } else {
      flushList();
      if (trimmed === "") {
        elements.push(<div key={key++} className="h-2" />);
      } else {
        elements.push(
          <p key={key++} className="text-[13px] leading-[1.6]">
            {renderMarkdown(trimmed)}
          </p>
        );
      }
    }
  }

  flushList();
  return elements;
}

// ─── Typing Indicator ───
function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20">
        <Bot size={12} className="text-accent-cyan" />
      </div>
      <div className="flex gap-1 items-center bg-white/80 rounded-2xl px-3 py-2 border border-[rgba(20,20,20,0.06)]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-[6px] h-[6px] rounded-full bg-text-muted"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Single Message Bubble ───
function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn("flex gap-2 px-4", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1",
          isUser
            ? "bg-gradient-to-br from-accent-violet/20 to-accent-amber/20"
            : "bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20"
        )}
      >
        {isUser ? (
          <User size={12} className="text-accent-violet" />
        ) : (
          <Bot size={12} className="text-accent-cyan" />
        )}
      </div>

      {/* Message content */}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-sm",
          isUser
            ? "bg-gradient-to-br from-[#141414] to-[#2a2a2a] text-white rounded-tr-md"
            : "bg-white/80 border border-[rgba(20,20,20,0.06)] text-text-primary rounded-tl-md"
        )}
      >
        <div className={cn(isUser && "[&_*]:text-white [&_code]:bg-white/10 [&_a]:text-accent-cyan")}>
          {formatMessageContent(message.content)}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Quick Actions Grid ───
function QuickActions({
  onAction,
  visible,
}: {
  onAction: (message: string) => void;
  visible: boolean;
}) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="px-4 pb-2"
    >
      <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-2">
        Quick Actions
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {QUICK_ACTIONS.map((action) => {
          const Icon = iconMap[action.icon] || Code;
          return (
            <button
              key={action.label}
              onClick={() => onAction(action.message)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-left",
                "bg-white/60 border border-[rgba(20,20,20,0.06)]",
                "hover:bg-white/90 hover:border-accent-cyan/30 hover:shadow-sm",
                "transition-all duration-200 group"
              )}
            >
              <Icon
                size={14}
                className="text-text-muted group-hover:text-accent-cyan transition-colors flex-shrink-0"
              />
              <span className="text-[12px] font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Main ChatWidget ───
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { messages, isTyping, sendMessage, clearChat } = useChat();

  // Show quick actions only when conversation just started
  const showQuickActions = messages.length <= 1;

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;
    sendMessage(input);
    setInput("");
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleQuickAction = (message: string) => {
    sendMessage(message);
  };

  // Auto-resize textarea
  const handleTextareaInput = (value: string) => {
    setInput(value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 100)}px`;
    }
  };

  return (
    <>
      {/* ─── Floating Chat Button ─── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className={cn(
              "fixed bottom-6 right-6 z-[9998]",
              "w-14 h-14 rounded-full",
              "bg-gradient-to-br from-[#141414] to-[#2a2a2a]",
              "text-white shadow-luxury",
              "flex items-center justify-center",
              "hover:shadow-hover hover:scale-105",
              "active:scale-95",
              "transition-all duration-200",
              "group"
            )}
            aria-label="Open AI Assistant"
          >
            <MessageSquare
              size={22}
              className="group-hover:scale-110 transition-transform"
            />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping-slow bg-accent-cyan/20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className={cn(
              "fixed z-[9998]",
              // Desktop
              "bottom-6 right-6 w-[400px] h-[600px]",
              // Mobile
              "max-md:inset-0 max-md:w-full max-md:h-full max-md:bottom-0 max-md:right-0",
              "flex flex-col",
              "bg-base/95 backdrop-blur-xl",
              "md:rounded-2xl md:border md:border-[rgba(20,20,20,0.08)]",
              "md:shadow-luxury",
              "overflow-hidden"
            )}
            role="dialog"
            aria-label="AI Portfolio Assistant"
          >
            {/* ─── Header ─── */}
            <div
              className={cn(
                "flex items-center justify-between px-4 py-3",
                "bg-white/60 backdrop-blur-sm",
                "border-b border-[rgba(20,20,20,0.06)]"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 flex items-center justify-center">
                    <Bot size={18} className="text-accent-cyan" />
                  </div>
                  {/* Online dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-text-primary leading-tight">
                    AI Assistant
                  </h3>
                  <p className="text-[11px] text-text-muted">
                    Ask me about Manthan&apos;s work
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="p-2 rounded-lg hover:bg-[rgba(0,0,0,0.04)] transition-colors text-text-muted hover:text-text-primary"
                  aria-label="Reset conversation"
                  title="Reset conversation"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-[rgba(0,0,0,0.04)] transition-colors text-text-muted hover:text-text-primary md:hidden"
                  aria-label="Minimize chat"
                >
                  <Minus size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-[rgba(0,0,0,0.04)] transition-colors text-text-muted hover:text-text-primary"
                  aria-label="Close chat"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* ─── Messages ─── */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 chatbot-scrollbar">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {/* Quick Actions */}
              <QuickActions
                onAction={handleQuickAction}
                visible={showQuickActions}
              />

              {/* Typing indicator */}
              {isTyping && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* ─── Scroll-to-bottom Button ─── */}
            <ScrollToBottom
              containerRef={messagesEndRef}
              messages={messages}
            />

            {/* ─── Input Area ─── */}
            <form
              onSubmit={handleSubmit}
              className={cn(
                "flex items-end gap-2 px-4 py-3",
                "bg-white/60 backdrop-blur-sm",
                "border-t border-[rgba(20,20,20,0.06)]"
              )}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => handleTextareaInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about skills, projects, experience..."
                rows={1}
                className={cn(
                  "flex-1 resize-none",
                  "min-h-[40px] max-h-[100px]",
                  "px-3.5 py-2.5 rounded-xl",
                  "bg-white/80 border border-[rgba(20,20,20,0.08)]",
                  "text-[13px] text-text-primary placeholder:text-text-muted/50",
                  "focus:outline-none focus:border-accent-cyan/40 focus:shadow-[0_0_0_3px_rgba(0,209,255,0.08)]",
                  "transition-all duration-200"
                )}
                disabled={isTyping}
                aria-label="Type your message"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-xl",
                  "flex items-center justify-center",
                  "transition-all duration-200",
                  input.trim() && !isTyping
                    ? "bg-gradient-to-br from-[#141414] to-[#2a2a2a] text-white shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                    : "bg-[rgba(0,0,0,0.04)] text-text-muted cursor-not-allowed"
                )}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>

            {/* ─── Footer ─── */}
            <div className="px-4 py-1.5 text-center border-t border-[rgba(20,20,20,0.04)]">
              <p className="text-[10px] text-text-muted/60">
                Powered by AI • Responses may not be 100% accurate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Scroll-to-Bottom Indicator ───
function ScrollToBottom({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  messages: ChatMessage[];
}) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const container = containerRef.current?.parentElement;
    if (!container) return;

    const handler = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowButton(scrollHeight - scrollTop - clientHeight > 80);
    };

    container.addEventListener("scroll", handler);
    return () => container.removeEventListener("scroll", handler);
  }, [containerRef]);

  if (!showButton) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      onClick={() =>
        containerRef.current?.scrollIntoView({ behavior: "smooth" })
      }
      className={cn(
        "absolute bottom-[72px] left-1/2 -translate-x-1/2",
        "w-8 h-8 rounded-full",
        "bg-white/90 border border-[rgba(20,20,20,0.08)] shadow-sm",
        "flex items-center justify-center",
        "hover:shadow-md transition-all duration-200",
        "text-text-muted hover:text-text-primary"
      )}
      aria-label="Scroll to bottom"
    >
      <ChevronDown size={16} />
    </motion.button>
  );
}

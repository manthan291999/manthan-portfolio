"use client";

import { useState, useCallback, useRef } from "react";
import type { ChatMessage, ChatAPIResponse } from "@/types/chat";
import { WELCOME_MESSAGE } from "@/types/chat";

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isTyping) return;

      setError(null);

      // Add user message
      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content: content.trim(),
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // Build history for API (exclude welcome message)
      const history = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));

      try {
        // Cancel any in-flight request
        abortRef.current?.abort();
        abortRef.current = new AbortController();

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content.trim(),
            history,
          }),
          signal: abortRef.current.signal,
        });

        const data: ChatAPIResponse = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Something went wrong. Please try again."
          );
        }

        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: data.message,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        const errorMsg =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
        setError(errorMsg);

        // Add error as bot message so user sees it
        const errorMessage: ChatMessage = {
          id: generateId(),
          role: "assistant",
          content: `⚠️ ${errorMsg}`,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, isTyping]
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        ...WELCOME_MESSAGE,
        id: generateId(),
        timestamp: Date.now(),
      },
    ]);
    setError(null);
    setIsTyping(false);
  }, []);

  return {
    messages,
    isTyping,
    error,
    sendMessage,
    clearChat,
  };
}

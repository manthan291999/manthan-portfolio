// ─── Chat Message Types ───

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  error: string | null;
}

export interface ChatAPIRequest {
  message: string;
  history: { role: "user" | "assistant"; content: string }[];
}

export interface ChatAPIResponse {
  message: string;
  error?: string;
}

export interface QuickAction {
  label: string;
  message: string;
  icon: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
  { label: "View Projects", message: "Show me your top projects", icon: "folder" },
  { label: "Check Skills", message: "What are your technical skills?", icon: "code" },
  { label: "Availability", message: "Are you available for work?", icon: "calendar" },
  { label: "Download Resume", message: "I'd like to download your resume", icon: "file" },
];

export const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm an AI assistant for **Manthan Mittal's** portfolio. I can tell you about his skills, projects, experience, and availability.\n\nHow can I help you today?",
  timestamp: Date.now(),
};

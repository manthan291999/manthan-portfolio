import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/content/chatbot-knowledge";

// ─── Rate Limiting (in-memory, per IP) ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30; // messages per window
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ─── OpenAI-compatible chat completion (NVIDIA Kimi-2.5) ───
async function callLLM(
  systemPrompt: string,
  messages: { role: string; content: string }[]
): Promise<string> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    throw new Error("NVIDIA_API_KEY is not configured");
  }

  const model = process.env.CHATBOT_MODEL || "moonshotai/kimi-k2.5";
  const apiUrl = process.env.CHATBOT_API_URL || "https://integrate.api.nvidia.com/v1/chat/completions";

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      max_tokens: 600,
      temperature: 0.7,
      top_p: 1.0,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Kimi API error:", response.status, errorData);
    throw new Error(`LLM API returned ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || "I'm sorry, I couldn't generate a response. Please try again.";
}

// ─── Input Validation ───
function sanitizeInput(text: string): string {
  return text
    .trim()
    .slice(0, 500) // Max 500 characters
    .replace(/<[^>]*>/g, ""); // Strip HTML tags
}

function isInappropriate(text: string): boolean {
  // Basic content filter — block prompt injection attempts
  const blocked = [
    /ignore (all |your |previous |above )?instructions/i,
    /you are now/i,
    /new system prompt/i,
    /forget (all |your |everything)/i,
    /act as/i,
    /pretend to be/i,
  ];
  return blocked.some((pattern) => pattern.test(text));
}

// ─── API Route ───
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error:
            "You've reached the message limit. Please try again later or email manthanmittal93@gmail.com directly.",
        },
        { status: 429 }
      );
    }

    // Parse body
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const sanitized = sanitizeInput(message);

    if (sanitized.length < 1) {
      return NextResponse.json(
        { error: "Please enter a valid message" },
        { status: 400 }
      );
    }

    // Content filter
    if (isInappropriate(sanitized)) {
      return NextResponse.json({
        message:
          "I'm here to discuss Manthan Mittal's professional portfolio and expertise. How can I help you with that?",
      });
    }

    // Build conversation messages (keep last 10 turns)
    const conversationHistory = Array.isArray(history)
      ? history.slice(-10).map((msg: { role: string; content: string }) => ({
          role: msg.role as "user" | "assistant",
          content: sanitizeInput(msg.content),
        }))
      : [];

    conversationHistory.push({ role: "user", content: sanitized });

    // Get system prompt with knowledge base
    const systemPrompt = buildSystemPrompt();

    // Call LLM
    const reply = await callLLM(systemPrompt, conversationHistory);

    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error:
          "I'm having trouble responding right now. Please try again in a moment, or email manthanmittal93@gmail.com directly.",
      },
      { status: 500 }
    );
  }
}

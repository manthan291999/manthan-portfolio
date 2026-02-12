import { NextResponse } from "next/server";

// Rate limiting - simple in-memory store
const submissions = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_SUBMISSIONS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userSubmissions = submissions.get(ip) || [];
  const recent = userSubmissions.filter((t) => now - t < RATE_LIMIT_WINDOW);
  submissions.set(ip, recent);
  return recent.length >= MAX_SUBMISSIONS;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, reason, message, honeypot } = body;

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true }); // Silently accept spam
    }

    // Basic validation
    if (!name || !email || !reason || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // Record submission for rate limiting
    const userSubmissions = submissions.get(ip) || [];
    userSubmissions.push(Date.now());
    submissions.set(ip, userSubmissions);

    // TODO: Integrate with Resend or Nodemailer for email delivery
    // For now, log the submission
    console.log("Contact form submission:", { name, email, reason, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

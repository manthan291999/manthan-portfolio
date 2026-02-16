import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manthan Mittal — AI Engineer & Software Developer",
  description:
    "Portfolio of Manthan Mittal — AI Engineer and Full-Stack Software Developer. Specializing in production ML systems, NLP, and scalable web applications.",
  keywords: [
    "AI Engineer",
    "Software Developer",
    "Machine Learning",
    "Full Stack Developer",
    "Python",
    "React",
    "Next.js",
    "Portfolio",
    "Manthan Mittal",
  ],
  authors: [{ name: "Manthan Mittal" }],
  openGraph: {
    title: "Manthan Mittal — AI Engineer & Software Developer",
    description:
      "Building intelligent systems that solve real-world problems — from ML pipelines to full-stack applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manthan Mittal — AI Engineer & Software Developer",
    description:
      "Building intelligent systems that solve real-world problems — from ML pipelines to full-stack applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased noise-overlay`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

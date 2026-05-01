import { Inter, Instrument_Serif, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vinod Biradar",
    template: "%s — Vinod Biradar",
  },
  description:
    "Full-stack developer working across the JavaScript ecosystem, mainly with TypeScript, Next.js, and Node.js.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        inter.variable,
        instrumentSerif.variable,
        geistMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-[#0d0d0d]">{children}</body>
    </html>
  );
}

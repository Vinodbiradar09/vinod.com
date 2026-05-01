import { Instrument_Serif, Space_Grotesk, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
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
  openGraph: {
    title: "Vinod Biradar",
    description:
      "Full-stack developer working across the JavaScript ecosystem.",
    url: "https://vinodbiradar.dev",
    siteName: "Vinod Biradar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        instrumentSerif.variable,
        spaceGrotesk.variable,
        geistMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-[#0d0d0d]">{children}</body>
    </html>
  );
}

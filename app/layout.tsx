import type { Metadata } from "next";
import { Lora, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", lora.variable, geistMono.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

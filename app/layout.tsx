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
    url: "https://vinodbiradar.dev ",
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
      <body className="min-h-full flex flex-col">
        {/* Background image — full bleed, fixed, covering */}
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/vin.jpeg')" }}
        />

        {/* Light warm overlay — just enough to tint, not hide */}
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10 bg-[#f5f2ee]/40"
        />

        {/* Soft vignette for depth and readability at edges */}
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.12) 100%)",
          }}
        />

        {children}
      </body>
    </html>
  );
}

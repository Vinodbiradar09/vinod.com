import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Not Found",
};

export default function NotFound() {
  return (
    <main className="max-w-155 mx-auto px-6 py-16 w-full">
      <div className="mb-10">
        <Link href="/" className="block no-underline mb-6">
          <h1 className="text-[22px] font-semibold tracking-tight text-[#1a1a1a]">
            Vinod Biradar
          </h1>
        </Link>
      </div>

      <hr className="border-none border-t border-[#e8e4de] mb-10" />

      <div className="py-8">
        <p className="text-[11px] tracking-[0.12em] text-[#aaa] uppercase mb-5 font-sans">
          404
        </p>
        <p className="text-[15px] text-[#555] leading-relaxed mb-6">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="text-[13px] text-[#999] no-underline hover:text-[#1a1a1a] transition-colors font-sans"
        >
          ← Back home
        </Link>
      </div>
    </main>
  );
}

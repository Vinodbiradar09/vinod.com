import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { FadeIn } from "@/components/fade-in";

export const metadata: Metadata = {
  title: "404",
};

const links = [
  { href: "/", label: "Home" },
  { href: "/writings", label: "Writings" },
  { href: "/uses", label: "Uses" },
  { href: "/people", label: "People" },
];

export default function NotFound() {
  return (
    <main className="max-w-155 mx-auto px-6 py-16 w-full">
      <FadeIn delay={0}>
        <Nav active="home" />
      </FadeIn>

      <FadeIn delay={80}>
        <hr className="border-none border-t border-[#242424] mb-12" />

        <div className="py-4">
          <p className="text-[11px] tracking-[0.12em] text-[#444] uppercase font-mono mb-6">
            404
          </p>

          <p className="text-[22px] font-semibold text-[#e8e5df] tracking-tight mb-3">
            Nothing here.
          </p>

          <p className="text-[15px] text-[#666] leading-relaxed mb-10 max-w-sm">
            This page doesn&apos;t exist. You might have followed a broken link,
            or mistyped the URL.
          </p>

          <div className="space-y-2">
            <p className="text-[11px] tracking-[0.12em] text-[#444] uppercase font-mono mb-3">
              Pages that do exist
            </p>
            {links.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className="text-[14px] text-[#555] no-underline hover:text-[#e8e5df] transition-colors"
                >
                  → {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </main>
  );
}

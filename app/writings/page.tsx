import { SectionDivider } from "@/components/section-divider";
import { WritingsList } from "@/components/writings-list";
import { GlassNav } from "@/components/glass-nav";
import { FadeIn } from "@/components/fade-in";
import { Nav } from "@/components/nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writings",
  description: "Writings by Vinod Biradar on software, systems, and building.",
};

export const revalidate = false;

export default function WritingsPage() {
  return (
    <main className="max-w-155 mx-auto px-6 py-16 w-full">
      <GlassNav active="writings" />
      <FadeIn delay={0}>
        <Nav active="writings" />
      </FadeIn>
      <FadeIn delay={80}>
        <SectionDivider />
        <WritingsList />
      </FadeIn>
    </main>
  );
}

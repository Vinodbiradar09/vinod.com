import { ExperienceSection } from "@/components/experience-section";
import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { Nav } from "@/components/nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "Where Vinod has worked.",
};

export const revalidate = false;

export default function ExperiencePage() {
  return (
    <main className="max-w-155 mx-auto px-6 py-16 w-full">
      <FadeIn delay={0}>
        <Nav active="experience" />
      </FadeIn>
      <FadeIn delay={80}>
        <SectionDivider />
        <ExperienceSection />
      </FadeIn>
    </main>
  );
}

import { WritingsPreview } from "@/components/writings-preview";
import { SectionDivider } from "@/components/section-divider";
import { ContactSection } from "@/components/contact-section";
import { AboutSection } from "@/components/about-section";
import { WorkSection } from "@/components/work-section";
import { FadeIn } from "@/components/fade-in";
import { Nav } from "@/components/nav";

export const revalidate = false;

export default function HomePage() {
  return (
    <main className="max-w-155 mx-auto px-6 py-16 w-full">
      <FadeIn delay={0}>
        <Nav active="home" />
      </FadeIn>
      <FadeIn delay={80}>
        <AboutSection />
      </FadeIn>
      <FadeIn delay={160}>
        <SectionDivider />
        <WorkSection />
      </FadeIn>
      <FadeIn delay={240}>
        <SectionDivider />
        <WritingsPreview />
      </FadeIn>
      <FadeIn delay={320}>
        <SectionDivider />
        <ContactSection />
      </FadeIn>
    </main>
  );
}

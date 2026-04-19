import { WritingsPreview } from "@/components/writings-preview";
import { SectionDivider } from "@/components/section-divider";
import { ContactSection } from "@/components/contact-section";
import { AboutSection } from "@/components/about-section";
import { WorkSection } from "@/components/work-section";
import { Nav } from "@/components/nav";

export const revalidate = false;

export default function HomePage() {
  return (
    <main className="max-w-155 mx-auto px-6 py-16 w-full">
      <Nav active="home" />
      <AboutSection />
      <SectionDivider />
      <WorkSection />
      <SectionDivider />
      <WritingsPreview />
      <SectionDivider />
      <ContactSection />
    </main>
  );
}

import { SectionDivider } from "@/components/section-divider";
import { FadeIn } from "@/components/fade-in";
import { Nav } from "@/components/nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "People",
  description: "People Vinod looks up to.",
};

const people = [
  {
    name: "Low Level TV",
    handle: "@LowLevelTweets",
    url: "https://x.com/LowLevelTweets",
  },
  {
    name: "ThePrimeagen",
    handle: "@ThePrimeagen",
    url: "https://x.com/ThePrimeagen",
  },
  {
    name: "Manu Arora",
    handle: "@mannupaaji",
    url: "https://x.com/mannupaaji",
  },
  {
    name: "TJ DeVries",
    handle: "@teej_dv",
    url: "https://x.com/teej_dv",
  },
  {
    name: "Dax Raad",
    handle: "@thdxr",
    url: "https://x.com/thdxr",
  },
  {
    name: "Theo",
    handle: "@theo",
    url: "https://x.com/theo",
  },
];

export default function PeoplePage() {
  return (
    <main className="max-w-155 mx-auto px-6 py-16 w-full">
      <FadeIn delay={0}>
        <Nav active="people" />
      </FadeIn>
      <FadeIn delay={80}>
        <SectionDivider />
        <section>
          <p className="text-[11px] tracking-[0.12em] text-[#555] uppercase mb-5 font-sans">
            Who I look up to
          </p>
          <div className="space-y-1">
            {people.map((person, i) => (
              <FadeIn key={person.handle} delay={100 + i * 40}>
                <div className="flex items-baseline gap-x-3 py-0.5 text-[15px]">
                  <span className="text-[#e8e5df] font-medium">
                    {person.name}
                  </span>
                  <span className="text-[#333]">/</span>
                  <a
                    href={person.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#555] no-underline hover:text-[#e8e5df] transition-colors font-mono text-[13px]"
                  >
                    {person.handle}
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </FadeIn>
    </main>
  );
}

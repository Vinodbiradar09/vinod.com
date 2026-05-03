import { SectionDivider } from "@/components/section-divider";
import { SectionLabel } from "@/components/section-label";
import { FadeIn } from "@/components/fade-in";
import { Nav } from "@/components/nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "Tools, gear, and setup Vinod uses daily.",
};

const gear = [
  {
    category: "Editor & Terminal",
    items: [
      {
        name: "macOS Terminal",
        note: "Default terminal. Simple and reliable.",
      },
      {
        name: "Zed",
        note: "Primary editor. Fast, minimal, no nonsense.",
      },
    ],
  },
  {
    category: "Services",
    items: [
      {
        name: "Cloudflare Workers",
        note: "Edge functions and edge hosting.",
      },
      {
        name: "Render",
        note: "Backend services and long-running APIs.",
      },
      {
        name: "GitHub",
        note: "Source control, issues, and collaboration.",
      },
      {
        name: "Vercel",
        note: "Frontend deployments and edge hosting.",
      },
      {
        name: "Neon",
        note: "Serverless Postgres for production apps.",
      },
    ],
  },
  {
    category: "Machines",
    items: [
      {
        name: "Samsung Galaxy S24",
        note: "Primary mobile device for daily use.",
      },
      {
        name: "MacBook M1",
        note: "Daily development machine.",
      },
    ],
  },
];

export default function UsesPage() {
  return (
    <main className="max-w-155 mx-auto px-6 py-16 w-full">
      <FadeIn delay={0}>
        <Nav active="uses" />
      </FadeIn>
      <FadeIn delay={80}>
        <SectionDivider />
        <div className="space-y-10">
          {gear.map((group, gi) => (
            <FadeIn key={group.category} delay={100 + gi * 60}>
              <section>
                <SectionLabel label={group.category} />
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-wrap items-baseline gap-x-2 text-[15px]"
                    >
                      <span className="font-medium text-[#e8e5df]">
                        {item.name}
                      </span>
                      <span className="text-[#333]">/</span>
                      <span className="text-[#666]">{item.note}</span>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </main>
  );
}

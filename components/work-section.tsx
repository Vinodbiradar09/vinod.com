import { SectionLabel } from "./section-label";

const projects = [
  {
    name: "Invitely.gg",
    description: "Send Invitations At Scale On Your Behalf",
    url: "https://invitely-gg.vercel.app",
  },
  {
    name: "Cosrx",
    description: "A lightweight Promise based HTTP client built on Fetch",
    url: "https://www.npmjs.com/package/@cosrx/core",
  },
];

export function WorkSection() {
  return (
    <section>
      <SectionLabel label="Work" />
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.name}
            className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[15px]"
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#1a1a1a] no-underline hover:underline underline-offset-[3px]"
            >
              {project.name}
            </a>
            <span className="text-[#ccc]">/</span>
            <span className="text-[#666]">{project.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

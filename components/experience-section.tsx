import { SectionLabel } from "./section-label";

interface Role {
  company: string;
  href: string;
  logo: string;
  title: string;
  dates: string;
  bullets: string[];
}

const ROLES: Role[] = [
  {
    company: "Scalio",
    href: "https://scalio.app",
    logo: "/scalio.png",
    title: "Software Engineer Intern",
    dates: "May 2026 — Now",
    bullets: ["Joined an amazing team as SWE Intern."],
  },
];

export function ExperienceSection() {
  return (
    <section>
      <SectionLabel label="Experience" />
      <div className="space-y-6">
        {ROLES.map((role) => (
          <div key={`${role.company}-${role.title}`} className="flex gap-3">
            <a
              href={role.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={role.company}
              className="shrink-0 mt-0.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={role.logo}
                alt={`${role.company} logo`}
                width={32}
                height={32}
                className="w-8 h-8 rounded-md object-cover"
              />
            </a>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <a
                    href={role.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#e8e5df] no-underline hover:underline underline-offset-[3px] text-[15px]"
                  >
                    {role.company}
                  </a>
                  <span className="text-[#333]">/</span>
                  <span className="text-[#a8a49e] text-[15px]">
                    {role.title}
                  </span>
                </div>
                <span className="ml-auto text-[11px] font-mono text-[#666]">
                  {role.dates}
                </span>
              </div>
              <ul className="mt-2 space-y-1.5 text-[14px] leading-[1.7] text-[#a8a49e]">
                {role.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#444] select-none">·</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

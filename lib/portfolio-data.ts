export interface Role {
  company: string;
  role: string;
  href: string;
  logo: string;
}

export interface CreationLink {
  label: "GitHub" | "Live" | "npm";
  href: string;
}

export interface Creation {
  command: string;
  name: string;
  identity: string;
  description: string;
  href: string;
  links: readonly CreationLink[];
}

export const currentRole = {
  company: "Scalio",
  role: "Software Engineer",
  href: "https://scalio.app",
  logo: "/scalio.png",
} as const satisfies Role;

export const roles = [currentRole] as const satisfies readonly Role[];

export const creations = [
  {
    command: "git clone https://github.com/toovinod/Invitely.gg.git",
    name: "Invitely.gg",
    identity: "toovinod/Invitely",
    description: "Send invitations at scale, on your behalf.",
    href: "https://invitely-gg.vercel.app",
    links: [
      { label: "GitHub", href: "https://github.com/toovinod/Invitely.gg" },
      { label: "Live", href: "https://invitely-gg.vercel.app" },
    ],
  },
  {
    command: "bun add @cosrx/core",
    name: "Cosrx",
    identity: "@cosrx/core",
    description: "A lightweight Promise-based HTTP client built on Fetch.",
    href: "https://www.npmjs.com/package/@cosrx/core",
    links: [
      { label: "GitHub", href: "https://github.com/toovinod/cosrx" },
      { label: "npm", href: "https://www.npmjs.com/package/@cosrx/core" },
    ],
  },
  {
    command: "git clone https://github.com/toovinod/NeetCode.git",
    name: "NeetCode",
    identity: "toovinod/NeetCode",
    description: "Solve coding challenges or create your own.",
    href: "https://github.com/toovinod/NeetCode",
    links: [{ label: "GitHub", href: "https://github.com/toovinod/NeetCode" }],
  },
] as const satisfies readonly Creation[];

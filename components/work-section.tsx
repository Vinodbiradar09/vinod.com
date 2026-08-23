import { SectionLabel } from "./section-label";

interface GithubStats {
  stars: number | null;
}

interface NpmStats {
  downloads: number | null;
  version: string | null;
}

async function getGithubStats(repo: string): Promise<GithubStats> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 86400 },
      headers: {
        Accept: "application/vnd.github+json",
      },
    });
    if (!res.ok) return { stars: null };
    const data = await res.json();
    return { stars: data.stargazers_count ?? null };
  } catch {
    return { stars: null };
  }
}

async function getCosrxStats(): Promise<NpmStats> {
  try {
    const [downloadsRes, registryRes] = await Promise.all([
      fetch("https://api.npmjs.org/downloads/point/last-month/@cosrx/core", {
        next: { revalidate: 86400 },
      }),
      fetch("https://registry.npmjs.org/@cosrx/core/latest", {
        next: { revalidate: 86400 },
      }),
    ]);
    const downloads = downloadsRes.ok ? await downloadsRes.json() : null;
    const registry = registryRes.ok ? await registryRes.json() : null;
    return {
      downloads: downloads?.downloads ?? null,
      version: registry?.version ?? null,
    };
  } catch {
    return { downloads: null, version: null };
  }
}

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function Stat({ label }: { label: string }) {
  return <span className="text-[11px] font-mono text-[#444]">{label}</span>;
}

function StatLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[11px] font-mono text-[#333] no-underline hover:text-[#666] transition-colors"
    >
      {label} ↗
    </a>
  );
}

export async function WorkSection() {
  const INVITELY_REPO = "toovinod/Invitely.gg";
  const COSRX_REPO = "toovinod/cosrx";

  const [invitely, cosrxNpm, cosrxGh] = await Promise.all([
    getGithubStats(INVITELY_REPO),
    getCosrxStats(),
    getGithubStats(COSRX_REPO),
  ]);

  return (
    <section>
      <SectionLabel label="Work" />
      <div className="space-y-5">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[15px]">
            <a
              href="https://invitely-gg.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#e8e5df] no-underline hover:underline underline-offset-[3px]"
            >
              Invitely.gg
            </a>
            <span className="text-[#333]">/</span>
            <span className="text-[#666]">
              Send Invitations At Scale On Your Behalf
            </span>
          </div>
          <div className="flex items-center gap-4 mt-1.5">
            {invitely.stars !== null && (
              <Stat label={`⭐️ ${fmt(invitely.stars)}`} />
            )}
            <StatLink
              href={`https://github.com/${INVITELY_REPO}`}
              label="github"
            />
            <StatLink href="https://invitely-gg.vercel.app" label="live" />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[15px]">
            <a
              href="https://www.npmjs.com/package/@cosrx/core"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#e8e5df] no-underline hover:underline underline-offset-[3px]"
            >
              Cosrx
            </a>
            <span className="text-[#333]">/</span>
            <span className="text-[#666]">
              A lightweight Promise based HTTP client built on Fetch
            </span>
          </div>
          <div className="flex items-center gap-4 mt-1.5">
            {cosrxGh.stars !== null && (
              <Stat label={`⭐️ ${fmt(cosrxGh.stars)}`} />
            )}
            {cosrxNpm.version && <Stat label={`v${cosrxNpm.version}`} />}
            {cosrxNpm.downloads !== null && (
              <Stat label={`${fmt(cosrxNpm.downloads)} dl/mo`} />
            )}
            <StatLink
              href={`https://github.com/${COSRX_REPO}`}
              label="github"
            />
            <StatLink
              href="https://www.npmjs.com/package/@cosrx/core"
              label="npm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

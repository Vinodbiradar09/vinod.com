import { PortfolioLink } from "@/components/ui/portfolio-link";
import { getCosrxTotalDownloads } from "@/lib/npm-downloads";
import { type Creation, creations } from "@/lib/portfolio-data";

function NpmDownloadBadge({ downloads }: { downloads: number }) {
  const label = downloads.toLocaleString("en-US");

  return (
    <span
      aria-hidden="true"
      title={`${label} total downloads`}
      className="pointer-events-none absolute top-1/2 left-[calc(100%+7px)] inline-grid min-w-6 -translate-y-1/2 -rotate-3 scale-90 place-items-center px-1 font-mono text-[9px] leading-none font-medium whitespace-nowrap text-[#ff2d9a] opacity-0 transition-[opacity,scale,rotate] duration-200 ease-out group-hover/npm:rotate-0 group-hover/npm:scale-100 group-hover/npm:opacity-100 group-focus-visible/npm:rotate-0 group-focus-visible/npm:scale-100 group-focus-visible/npm:opacity-100 motion-reduce:transition-none"
    >
      {label}
      <svg
        aria-hidden="true"
        viewBox="0 0 32 18"
        fill="none"
        preserveAspectRatio="none"
        className="absolute h-5.5 w-[calc(100%+8px)] overflow-visible"
      >
        <path
          d="M2.4 9.7C3.2 3.1 10.6.7 18.3 1.5c7.6.8 12.5 3.4 11.4 8.3-1.2 5.1-8.3 7.2-15.7 6.5C6.6 15.6 1.8 13.4 2.4 9.7Z"
          pathLength="1"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] delay-75 duration-500 ease-out group-hover/npm:[stroke-dashoffset:0] group-focus-visible/npm:[stroke-dashoffset:0] motion-reduce:transition-none"
        />
        <path
          d="M1.2 8.2C2.8 3.4 9.4 1 17 1.2c8.1.3 13.9 3.2 13.7 7.7-.2 4.8-6.7 7.7-14.7 7.6C7.8 16.4 1.3 13.4 1.2 8.2Z"
          pathLength="1"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.72"
          className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] delay-150 duration-500 ease-out group-hover/npm:[stroke-dashoffset:0] group-focus-visible/npm:[stroke-dashoffset:0] motion-reduce:transition-none"
        />
      </svg>
    </span>
  );
}

function CreationItem({
  creation,
  index,
  npmDownloads,
}: {
  creation: Creation;
  index: number;
  npmDownloads: number;
}) {
  return (
    <article
      data-rerun-item="row"
      data-rerun-delay={index + 5}
      className="group/creation relative isolate grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-0.5 border-b border-rule py-3.5 opacity-0 transition-[opacity,transform] duration-180 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:animate-row-in motion-reduce:opacity-100 last:border-b-0 hover:translate-x-0.5 focus-within:translate-x-0.5 [&:has(a:active)]:translate-x-0.5 [&:has(a:active)]:opacity-75 sm:grid-cols-[108px_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:py-3.25"
      style={{ animationDelay: `${290 + index * 40}ms` }}
    >
      <div className="relative z-10 w-fit min-w-0">
        <PortfolioLink
          href={creation.href}
          aria-label={`Open ${creation.name}`}
          variant="title"
          className="col-start-1 row-start-1"
        >
          <h3>{creation.name}</h3>
        </PortfolioLink>
      </div>
      <p className="relative z-10 col-span-2 row-start-2 text-[13px] text-muted sm:col-span-1 sm:row-start-auto sm:whitespace-nowrap">
        <span className="transition-colors duration-180 group-hover/creation:text-ink group-focus-within/creation:text-ink">
          {creation.description}
        </span>
      </p>
      <div className="relative z-10 col-start-2 row-start-1 flex flex-wrap justify-end gap-2.5 whitespace-nowrap sm:col-start-auto sm:row-start-auto">
        {creation.links.map((link) => (
          <PortfolioLink
            key={link.label}
            href={link.href}
            variant="muted"
            aria-label={
              link.label === "npm"
                ? `Open ${creation.name} on npm, ${npmDownloads.toLocaleString("en-US")} total downloads`
                : undefined
            }
            className={
              link.label === "npm"
                ? "group/npm relative overflow-visible group-hover/creation:text-ink group-focus-within/creation:text-ink"
                : "group-hover/creation:text-ink group-focus-within/creation:text-ink"
            }
          >
            {link.label}
            {link.label === "npm" ? (
              <NpmDownloadBadge downloads={npmDownloads} />
            ) : null}
          </PortfolioLink>
        ))}
      </div>
    </article>
  );
}

export async function CreationList() {
  const npmDownloads = await getCosrxTotalDownloads();

  return (
    <div className="border-b border-rule [@media(hover:hover)]:[&:hover>article:not(:hover)]:opacity-60 [&:has(article:focus-within)>article:not(:focus-within)]:opacity-60">
      {creations.map((creation, index) => (
        <CreationItem
          key={creation.name}
          creation={creation}
          index={index}
          npmDownloads={npmDownloads}
        />
      ))}
    </div>
  );
}

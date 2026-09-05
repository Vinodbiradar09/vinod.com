import { PortfolioLink } from "@/components/ui/portfolio-link";
import { type Creation, creations } from "@/lib/portfolio-data";

function CreationItem({ creation, index }: { creation: Creation; index: number }) {
  return (
    <article
      data-rerun-item="row"
      data-rerun-delay={index + 5}
      className="group/creation relative isolate grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-0.5 border-b border-rule py-3.5 opacity-0 transition-[opacity,transform] duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:animate-row-in motion-reduce:opacity-100 last:border-b-0 hover:translate-x-0.5 focus-within:translate-x-0.5 [&:has(a:active)]:translate-x-0.5 [&:has(a:active)]:opacity-75 sm:grid-cols-[108px_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:py-[13px]"
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
        <span className="transition-colors duration-[180ms] group-hover/creation:text-ink group-focus-within/creation:text-ink">
          {creation.description}
        </span>
      </p>
      <div className="relative z-10 col-start-2 row-start-1 flex flex-wrap justify-end gap-2.5 whitespace-nowrap sm:col-start-auto sm:row-start-auto">
        {creation.links.map((link) => (
          <PortfolioLink
            key={link.label}
            href={link.href}
            variant="muted"
            className="group-hover/creation:text-ink group-focus-within/creation:text-ink"
          >
            {link.label}
          </PortfolioLink>
        ))}
      </div>
    </article>
  );
}

export function CreationList() {
  return (
    <div className="border-b border-rule [@media(hover:hover)]:[&:hover>article:not(:hover)]:opacity-60 [&:has(article:focus-within)>article:not(:focus-within)]:opacity-60">
      {creations.map((creation, index) => (
        <CreationItem key={creation.name} creation={creation} index={index} />
      ))}
    </div>
  );
}

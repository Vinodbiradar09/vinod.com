import { PortfolioLink } from "@/components/ui/portfolio-link";
import { type Creation, creations } from "@/lib/portfolio-data";

function CreationItem({ creation }: { creation: Creation }) {
  return (
    <article className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-0.5 border-b border-rule py-3.5 transition-[opacity,transform] duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] last:border-b-0 hover:translate-x-0.5 sm:grid-cols-[108px_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:py-[13px]">
      <PortfolioLink href={creation.href} variant="title" showIcon revealIcon>
        <h3>{creation.name}</h3>
      </PortfolioLink>
      <p className="col-span-2 row-start-2 text-[13px] text-muted sm:col-span-1 sm:row-start-auto sm:whitespace-nowrap">
        {creation.description}
      </p>
      <div className="col-start-2 row-start-1 flex flex-wrap justify-end gap-2.5 whitespace-nowrap sm:col-start-auto sm:row-start-auto">
        {creation.links.map((link) => (
          <PortfolioLink key={link.label} href={link.href} variant="muted" showIcon>
            {link.label}
          </PortfolioLink>
        ))}
      </div>
    </article>
  );
}

export function CreationList() {
  return (
    <div className="border-b border-rule [@media(hover:hover)]:[&:hover>article:not(:hover)]:opacity-35">
      {creations.map((creation) => (
        <CreationItem key={creation.name} creation={creation} />
      ))}
    </div>
  );
}

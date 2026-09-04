"use client";

import { useRef, useState } from "react";
import { PortfolioLink } from "@/components/ui/portfolio-link";
import { type Creation, creations } from "@/lib/portfolio-data";

interface ProjectRoute {
  height: number;
  path: string;
  width: number;
}

function CreationItem({ creation, index }: { creation: Creation; index: number }) {
  const articleRef = useRef<HTMLElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const [route, setRoute] = useState<ProjectRoute | null>(null);

  function drawRoute(target: HTMLElement) {
    const article = articleRef.current;
    const source = sourceRef.current;
    if (!article || !source) return;

    const articleBox = article.getBoundingClientRect();
    const sourceBox = source.getBoundingClientRect();
    const targetBox = target.getBoundingClientRect();
    const startX = sourceBox.right - articleBox.left + 5;
    const startY = sourceBox.bottom - articleBox.top - 4;
    const endX = targetBox.left - articleBox.left - 5;
    const endY = targetBox.bottom - articleBox.top - 4;
    const laneY = articleBox.height - 3;
    const firstTurn = Math.min(startX + 12, (startX + endX) / 2);
    const lastTurn = Math.max(endX - 12, (startX + endX) / 2);

    setRoute({
      width: articleBox.width,
      height: articleBox.height,
      path: `M ${startX} ${startY} C ${firstTurn} ${startY}, ${firstTurn} ${laneY}, ${firstTurn + 8} ${laneY} L ${lastTurn - 8} ${laneY} C ${lastTurn} ${laneY}, ${lastTurn} ${endY}, ${endX} ${endY}`,
    });
  }

  return (
    <article
      ref={articleRef}
      className="group/creation relative isolate grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-0.5 border-b border-rule py-3.5 opacity-0 transition-[opacity,transform] duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:animate-row-in motion-reduce:opacity-100 last:border-b-0 hover:translate-x-0.5 focus-within:translate-x-0.5 [&:has(a:active)]:translate-x-0.5 [&:has(a:active)]:opacity-75 sm:grid-cols-[108px_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:py-[13px]"
      style={{ animationDelay: `${290 + index * 40}ms` }}
    >
      {route ? (
        <svg
          key={route.path}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible text-ink"
          viewBox={`0 0 ${route.width} ${route.height}`}
          preserveAspectRatio="none"
        >
          <path
            d={route.path}
            pathLength="1"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            vectorEffect="non-scaling-stroke"
            className="opacity-35 motion-safe:animate-project-route-draw motion-reduce:[stroke-dashoffset:0]"
          />
          <g fill="none" stroke="currentColor" strokeWidth="0.9" className="motion-reduce:hidden">
            <path d="M -3 -2.5 L 1 0 L -3 2.5" vectorEffect="non-scaling-stroke" />
            <animateMotion path={route.path} begin="70ms" dur="450ms" fill="freeze" rotate="auto" />
          </g>
        </svg>
      ) : null}
      <div ref={sourceRef} className="relative z-10 w-fit min-w-0">
        <PortfolioLink
          href={creation.href}
          aria-label={`Open ${creation.name}`}
          variant="title"
          showIcon
          revealIcon
        >
          <span className="relative grid">
            <h3 className="col-start-1 row-start-1 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/creation:-translate-y-1 group-hover/creation:opacity-0 group-focus-within/creation:-translate-y-1 group-focus-within/creation:opacity-0">
              {creation.name}
            </h3>
            <span
              aria-hidden="true"
              className="col-start-1 row-start-1 translate-y-1 font-mono text-[9px] leading-5 whitespace-nowrap text-muted opacity-0 transition-[color,opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/creation:translate-y-0 group-hover/creation:text-ink group-hover/creation:opacity-100 group-focus-within/creation:translate-y-0 group-focus-within/creation:text-ink group-focus-within/creation:opacity-100"
            >
              {creation.identity}
            </span>
          </span>
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
            showIcon
            iconClassName="[animation-delay:520ms]"
            className="group-hover/creation:text-ink group-focus-within/creation:text-ink"
            onPointerEnter={(event) => drawRoute(event.currentTarget)}
            onPointerLeave={(event) => {
              if (!event.currentTarget.contains(document.activeElement)) setRoute(null);
            }}
            onFocus={(event) => drawRoute(event.currentTarget)}
            onBlur={() => setRoute(null)}
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

"use client";

import { useEffect, useRef, useState } from "react";
import { CommandTearOff } from "@/components/ui/command-tear-off";
import { PortfolioLink } from "@/components/ui/portfolio-link";
import { type Creation, creations } from "@/lib/portfolio-data";

interface ProjectRoute {
  branchPath?: string;
  height: number;
  path: string;
  width: number;
}

function CreationItem({ creation, index }: { creation: Creation; index: number }) {
  const articleRef = useRef<HTMLElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const [route, setRoute] = useState<ProjectRoute | null>(null);
  const [routeVisible, setRouteVisible] = useState(false);
  const routeHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (routeHideTimer.current) clearTimeout(routeHideTimer.current);
    },
    [],
  );

  function drawRoute(target: HTMLElement, destination: Creation["links"][number]["label"]) {
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
    const branchStartX = firstTurn + (lastTurn - firstTurn) * 0.48;
    const branchEndX = Math.min(endX - 10, branchStartX + 34);
    const branchEndY = Math.max(7, laneY - 10);
    const branchPath =
      destination === "GitHub" && branchEndX - branchStartX > 10
        ? `M ${branchStartX} ${laneY} C ${branchStartX + 7} ${laneY}, ${branchStartX + 8} ${branchEndY}, ${branchEndX} ${branchEndY}`
        : undefined;

    if (routeHideTimer.current) clearTimeout(routeHideTimer.current);
    setRoute({
      width: articleBox.width,
      height: articleBox.height,
      branchPath,
      path: `M ${startX} ${startY} C ${firstTurn} ${startY}, ${firstTurn} ${laneY}, ${firstTurn + 8} ${laneY} L ${lastTurn - 8} ${laneY} C ${lastTurn} ${laneY}, ${lastTurn} ${endY}, ${endX} ${endY}`,
    });
    setRouteVisible(true);
  }

  function hideRoute() {
    setRouteVisible(false);
    if (routeHideTimer.current) clearTimeout(routeHideTimer.current);
    routeHideTimer.current = setTimeout(() => setRoute(null), 200);
  }

  return (
    <article
      ref={articleRef}
      data-rerun-item="row"
      data-rerun-delay={index + 5}
      className="group/creation relative isolate grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-0.5 border-b border-rule py-3.5 opacity-0 transition-[opacity,transform] duration-[180ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:animate-row-in motion-reduce:opacity-100 last:border-b-0 hover:translate-x-0.5 focus-within:translate-x-0.5 [&:has(a:active)]:translate-x-0.5 [&:has(a:active)]:opacity-75 sm:grid-cols-[108px_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:py-[13px]"
      style={{ animationDelay: `${290 + index * 40}ms` }}
    >
      {route ? (
        <svg
          key={route.path}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible text-ink transition-opacity duration-200 ease-out motion-reduce:transition-none ${routeVisible ? "opacity-100" : "opacity-0"}`}
          viewBox={`0 0 ${route.width} ${route.height}`}
          preserveAspectRatio="none"
        >
          <path
            d={route.path}
            pathLength="1"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className="opacity-35 motion-safe:animate-project-route-draw motion-reduce:[stroke-dashoffset:0]"
          />
          {route.branchPath ? (
            <path
              d={route.branchPath}
              pathLength="1"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.65"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className="opacity-30 motion-safe:animate-project-branch motion-reduce:hidden"
            />
          ) : null}
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="motion-reduce:hidden"
          >
            <path d="M -3 -2.5 L 1 0 L -3 2.5" vectorEffect="non-scaling-stroke" />
            <animateMotion
              path={route.path}
              begin="40ms"
              dur="520ms"
              fill="freeze"
              rotate="auto"
              calcMode="spline"
              keyPoints="0;1"
              keyTimes="0;1"
              keySplines="0.22 1 0.36 1"
            />
          </g>
        </svg>
      ) : null}
      <div ref={sourceRef} className="relative z-10 grid w-fit min-w-0">
        <PortfolioLink
          href={creation.href}
          aria-label={`Open ${creation.name}`}
          variant="title"
          showIcon
          revealIcon
          className="col-start-1 row-start-1"
        >
          <h3 className="transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/creation:-translate-y-1 group-hover/creation:opacity-0 group-focus-within/creation:-translate-y-1 group-focus-within/creation:opacity-0">
            {creation.name}
          </h3>
        </PortfolioLink>
        <CommandTearOff
          command={creation.command}
          href={creation.href}
          identity={creation.identity}
        />
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
            onPointerEnter={(event) => drawRoute(event.currentTarget, link.label)}
            onPointerLeave={(event) => {
              if (!event.currentTarget.contains(document.activeElement)) hideRoute();
            }}
            onFocus={(event) => drawRoute(event.currentTarget, link.label)}
            onBlur={hideRoute}
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

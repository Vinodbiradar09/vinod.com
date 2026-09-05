"use client";

import Image from "next/image";
import { type MouseEvent, type PointerEvent, useEffect, useRef } from "react";
import { PortfolioLink } from "@/components/ui/portfolio-link";
import { type Role, roles } from "@/lib/portfolio-data";

const DRAG_LIMIT = 12;

function DraggableNow() {
  const annotationRef = useRef<HTMLSpanElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (snapTimer.current) clearTimeout(snapTimer.current);
    },
    [],
  );

  function startDragging(event: PointerEvent<HTMLSpanElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, y: event.clientY };
    isDragging.current = true;
    event.currentTarget.style.transition = "none";
  }

  function drag(event: PointerEvent<HTMLSpanElement>) {
    if (!isDragging.current) return;

    event.preventDefault();
    event.stopPropagation();
    const x = Math.max(
      -DRAG_LIMIT,
      Math.min(DRAG_LIMIT, event.clientX - dragStart.current.x),
    );
    const y = Math.max(
      -DRAG_LIMIT,
      Math.min(DRAG_LIMIT, event.clientY - dragStart.current.y),
    );
    event.currentTarget.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${x * 0.35}deg)`;
  }

  function stopDragging(event: PointerEvent<HTMLSpanElement>) {
    if (!isDragging.current) return;

    event.preventDefault();
    event.stopPropagation();
    isDragging.current = false;

    const annotation = annotationRef.current;
    if (!annotation) return;

    annotation.style.transition =
      "transform 420ms cubic-bezier(0.16, 1, 0.3, 1)";
    annotation.style.transform = "";
    snapTimer.current = setTimeout(() => {
      annotation.style.removeProperty("transition");
    }, 420);
  }

  function preventNavigation(event: MouseEvent<HTMLSpanElement>) {
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <span
      ref={annotationRef}
      aria-hidden="true"
      onClick={preventNavigation}
      onPointerDown={startDragging}
      onPointerMove={drag}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className="relative inline-grid -rotate-3 touch-none cursor-grab place-items-center text-[11px] leading-none font-medium text-[#ff2d9a] opacity-0 transition-[opacity,transform] duration-200 ease-out select-none group-hover/role:rotate-0 group-hover/role:opacity-100 group-focus-visible/role:rotate-0 group-focus-visible/role:opacity-100 active:cursor-grabbing motion-reduce:transition-none"
    >
      now
      <svg
        aria-hidden="true"
        viewBox="0 0 32 18"
        fill="none"
        className="pointer-events-none absolute h-5.5 w-9.5 overflow-visible"
      >
        <path
          d="M2.4 9.7C3.2 3.1 10.6.7 18.3 1.5c7.6.8 12.5 3.4 11.4 8.3-1.2 5.1-8.3 7.2-15.7 6.5C6.6 15.6 1.8 13.4 2.4 9.7Z"
          pathLength="1"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] delay-75 duration-500 ease-out group-hover/role:[stroke-dashoffset:0] group-focus-visible/role:[stroke-dashoffset:0] motion-reduce:transition-none"
        />
        <path
          d="M1.2 8.2C2.8 3.4 9.4 1 17 1.2c8.1.3 13.9 3.2 13.7 7.7-.2 4.8-6.7 7.7-14.7 7.6C7.8 16.4 1.3 13.4 1.2 8.2Z"
          pathLength="1"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.72"
          className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] delay-150 duration-500 ease-out group-hover/role:[stroke-dashoffset:0] group-focus-visible/role:[stroke-dashoffset:0] motion-reduce:transition-none"
        />
      </svg>
    </span>
  );
}

function RoleItem({ role }: { role: Role }) {
  return (
    <PortfolioLink
      href={role.href}
      aria-label={`Visit ${role.company}`}
      data-rerun-item="row"
      data-rerun-delay="4"
      className="group/role grid grid-cols-[44px_minmax(0,1fr)] items-center gap-3 py-3.5 opacity-0 motion-safe:animate-row-in motion-reduce:opacity-100 [animation-delay:230ms]"
      variant="plain"
    >
      <span
        data-role-logo
        className="relative grid size-11 place-items-center overflow-hidden rounded-xl border border-rule bg-surface transition-[border-color,box-shadow,scale,translate] duration-180 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/role:-translate-y-px group-hover/role:scale-[1.015] group-hover/role:border-rule-strong group-hover/role:shadow-[0_0_0_1px_rgb(255_255_255/3%)] group-focus-visible/role:-translate-y-px group-focus-visible/role:scale-[1.015] group-focus-visible/role:border-rule-strong group-focus-visible/role:shadow-[0_0_0_1px_rgb(255_255_255/3%)]"
      >
        <Image
          src={role.logo}
          alt=""
          width={44}
          height={44}
          sizes="44px"
          loading="eager"
          className="size-full object-cover"
        />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-3">
          <span className="font-medium text-ink">{role.company}</span>
          <DraggableNow />
        </span>
        <span className="block text-[13px] leading-4.5 text-muted">
          {role.role}
        </span>
      </span>
    </PortfolioLink>
  );
}

export function RoleList() {
  return roles.map((role) => <RoleItem key={role.company} role={role} />);
}

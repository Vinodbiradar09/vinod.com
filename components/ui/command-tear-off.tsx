"use client";

import { type MouseEvent, type PointerEvent, useEffect, useRef, useState } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CommandTearOffProps {
  command: string;
  href: string;
  identity: string;
}

const SNAP_DURATION_MS = 420;

export function CommandTearOff({ command, href, identity }: CommandTearOffProps) {
  const { copied, copy } = useCopyToClipboard();
  const [isDragging, setIsDragging] = useState(false);
  const [isLifted, setIsLifted] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const didDrag = useRef(false);
  const activePointer = useRef<number | null>(null);
  const suppressNavigation = useRef(false);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (snapTimer.current) clearTimeout(snapTimer.current);
    },
    [],
  );

  function startDragging(event: PointerEvent<HTMLAnchorElement>) {
    if (event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    activePointer.current = event.pointerId;
    dragStart.current = { x: event.clientX, y: event.clientY };
    didDrag.current = false;
    setIsDragging(true);
    setIsLifted(true);
  }

  function drag(event: PointerEvent<HTMLAnchorElement>) {
    if (activePointer.current !== event.pointerId) return;

    const x = event.clientX - dragStart.current.x;
    const y = event.clientY - dragStart.current.y;
    didDrag.current ||= Math.hypot(x, y) > 4;
    if (!didDrag.current) return;

    event.preventDefault();
    setOffset({
      x: Math.max(-170, Math.min(170, x)),
      y: Math.max(-52, Math.min(52, y)),
    });
  }

  function settle(copyCommand: boolean) {
    activePointer.current = null;
    setIsDragging(false);
    setOffset({ x: 0, y: 0 });

    if (copyCommand && didDrag.current) {
      suppressNavigation.current = true;
      void copy(command);
    }

    if (snapTimer.current) clearTimeout(snapTimer.current);
    snapTimer.current = setTimeout(() => setIsLifted(false), SNAP_DURATION_MS);
    window.setTimeout(() => {
      suppressNavigation.current = false;
    }, 0);
  }

  function finishDragging(event: PointerEvent<HTMLAnchorElement>) {
    if (activePointer.current !== event.pointerId) return;
    settle(true);
  }

  function cancelDragging(event: PointerEvent<HTMLAnchorElement>) {
    if (activePointer.current !== event.pointerId) return;
    settle(false);
  }

  function followLink(event: MouseEvent<HTMLAnchorElement>) {
    if (suppressNavigation.current) event.preventDefault();
  }

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        draggable={false}
        aria-label={`Open ${identity}; drag to copy ${command}`}
        data-lifted={isLifted}
        data-dragging={isDragging}
        onClick={followLink}
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={startDragging}
        onPointerMove={drag}
        onPointerUp={finishDragging}
        onPointerCancel={cancelDragging}
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
        className="group/command relative z-20 col-start-1 row-start-1 inline-grid touch-none cursor-grab rounded-[2px] font-mono text-[9px] leading-5 whitespace-nowrap text-muted opacity-0 transition-[color,opacity,transform] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-none pointer-events-none group-hover/creation:text-ink group-hover/creation:opacity-100 group-hover/creation:pointer-events-auto group-focus-within/creation:text-ink group-focus-within/creation:opacity-100 group-focus-within/creation:pointer-events-auto active:cursor-grabbing focus-visible:text-ink focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus data-[dragging=true]:duration-0 data-[lifted=true]:text-ink data-[lifted=true]:opacity-100 data-[lifted=true]:pointer-events-auto"
      >
        <span className="sr-only">{identity}</span>
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 transition-opacity duration-100 group-data-[lifted=true]/command:opacity-0"
        >
          {identity}
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-0.5 -left-1.5 rounded-[3px] border border-rule-strong bg-page px-1.5 py-0.5 text-ink opacity-0 shadow-[0_5px_16px_rgb(0_0_0/8%)] transition-opacity duration-100 group-data-[lifted=true]/command:opacity-100 dark:shadow-[0_5px_18px_rgb(0_0_0/45%)]"
        >
          $ {command}
        </span>
      </a>
      <span className="sr-only" aria-live="polite">
        {copied ? `${command} copied` : ""}
      </span>
    </>
  );
}

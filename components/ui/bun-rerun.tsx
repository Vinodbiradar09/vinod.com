"use client";

import {
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const RERUN_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
type RerunType = "rise" | "row" | "section";

const rerunFrames: Record<RerunType, Keyframe[]> = {
  rise: [
    { opacity: 0.18, transform: "translateY(5px)", filter: "blur(1px)" },
    { opacity: 1, transform: "none", filter: "blur(0)" },
  ],
  row: [
    { opacity: 0.15, transform: "translateX(-5px)", filter: "blur(0.75px)" },
    { opacity: 1, transform: "none", filter: "blur(0)" },
  ],
  section: [
    { opacity: 0.2, clipPath: "inset(0 100% 0 0)" },
    { opacity: 1, clipPath: "inset(0 0 0 0)" },
  ],
};

export function BunRerun() {
  const [runId, setRunId] = useState(0);
  const activeAnimations = useRef<Animation[]>([]);

  useEffect(
    () => () => {
      for (const animation of activeAnimations.current) animation.cancel();
    },
    [],
  );

  function rerun() {
    for (const animation of activeAnimations.current) animation.cancel();
    activeAnimations.current = [];
    setRunId((current) => current + 1);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = document.querySelectorAll<HTMLElement>("[data-rerun-item]");
    for (const item of items) {
      const type = item.dataset.rerunItem as RerunType;
      const delay = Number(item.dataset.rerunDelay ?? 0) * 12;
      const duration = type === "section" ? 145 : type === "rise" ? 130 : 120;
      const frames = rerunFrames[type];
      if (!frames) continue;

      activeAnimations.current.push(
        item.animate(frames, {
          delay,
          duration,
          easing: RERUN_EASING,
        }),
      );
    }
  }

  function doubleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    rerun();
  }

  function rerunWithKeyboard(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.repeat || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    rerun();
  }

  return (
    <button
      type="button"
      aria-label="Bun, double-click to rerun the page animations"
      onDoubleClick={doubleClick}
      onKeyDown={rerunWithKeyboard}
      className="relative inline-block touch-manipulation cursor-pointer rounded-xs text-inherit select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
    >
      Bun
      {runId > 0 ? (
        <span
          key={runId}
          aria-hidden="true"
          className="pointer-events-none absolute -top-2.5 left-1/2 font-mono text-[8px] leading-none font-semibold whitespace-nowrap text-[#ff2d9a] motion-safe:animate-bun-afterimage"
        >
          7ms
        </span>
      ) : null}
    </button>
  );
}

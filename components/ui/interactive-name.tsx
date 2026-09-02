"use client";

import type { PointerEvent } from "react";

interface InteractiveNameProps {
  name: string;
}

export function InteractiveName({ name }: InteractiveNameProps) {
  function updateHighlight(event: PointerEvent<HTMLHeadingElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = ((event.clientX - bounds.left) / bounds.width) * 100;
    event.currentTarget.style.setProperty("--name-highlight", `${position}%`);
  }

  return (
    <h1
      onPointerMove={updateHighlight}
      className="group/name relative w-fit font-medium text-ink [--name-highlight:50%]"
    >
      <span>{name}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-clip-text text-transparent opacity-0 transition-opacity duration-[180ms] group-hover/name:opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(circle 26px at var(--name-highlight) 50%, var(--focus-ring), transparent 78%)",
        }}
      >
        {name}
      </span>
    </h1>
  );
}

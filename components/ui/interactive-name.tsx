"use client";

import { type PointerEvent, useEffect, useRef } from "react";

interface InteractiveNameProps {
  name: string;
}

const INFLUENCE_RADIUS = 54;
const RESTING_WEIGHT = 500;
const ACTIVE_WEIGHT = 650;

export function InteractiveName({ name }: InteractiveNameProps) {
  const letterRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const frameRef = useRef<number | null>(null);
  const pointerX = useRef(0);
  const letters = Array.from(name).map((character, index) => ({
    character,
    id: `${character}-${name.slice(0, index).split(character).length}`,
  }));

  useEffect(
    () => () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  function renderWeight() {
    const boundsByLetter = letterRefs.current.map((letter) => letter?.getBoundingClientRect());

    for (const [index, letter] of letterRefs.current.entries()) {
      const bounds = boundsByLetter[index];
      if (!letter || !bounds) continue;

      const distance = Math.abs(pointerX.current - (bounds.left + bounds.width / 2));
      const influence = Math.max(0, 1 - distance / INFLUENCE_RADIUS);

      letter.style.fontWeight = `${RESTING_WEIGHT + influence * (ACTIVE_WEIGHT - RESTING_WEIGHT)}`;
      letter.style.transform = `translate3d(0, ${influence * -0.75}px, 0)`;
    }

    frameRef.current = null;
  }

  function updateLetters(event: PointerEvent<HTMLHeadingElement>) {
    if (
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    pointerX.current = event.clientX;
    if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(renderWeight);
  }

  function resetLetters() {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = null;

    for (const letter of letterRefs.current) {
      if (!letter) continue;
      letter.style.fontWeight = `${RESTING_WEIGHT}`;
      letter.style.transform = "translate3d(0, 0, 0)";
    }
  }

  return (
    <h1
      aria-label={name}
      onPointerMove={updateLetters}
      onPointerLeave={resetLetters}
      className="group/name relative w-fit cursor-default whitespace-nowrap text-ink"
    >
      <span aria-hidden="true">
        {letters.map(({ character, id }, index) => {
          const displayCharacter = character === " " ? "\u00a0" : character;

          return (
            <span key={id} className="relative inline-block">
              <span className="invisible font-[500]">{displayCharacter}</span>
              <span
                ref={(element) => {
                  letterRefs.current[index] = element;
                }}
                className="absolute inset-0 inline-block font-[500] transition-[font-weight,transform] duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none"
              >
                {displayCharacter}
              </span>
            </span>
          );
        })}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute -bottom-1 -left-1 h-2 w-[calc(100%+8px)] overflow-visible text-[#ff2d9a] opacity-0 transition-opacity duration-150 group-hover/name:opacity-100 motion-reduce:transition-none"
      >
        <path
          d="M2 5.4C18.5 3.8 32.7 5.9 49.2 4.5C65.8 3.1 81.1 4.1 98 2.7"
          pathLength="1"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/name:[stroke-dashoffset:0] motion-reduce:transition-none"
        />
        <path
          d="M4 6.7C26 5.6 43 6.6 61 5.2C74.6 4.2 86.2 4.7 96.5 4"
          pathLength="1"
          stroke="currentColor"
          strokeWidth="0.65"
          strokeLinecap="round"
          opacity="0.65"
          className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] delay-100 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/name:[stroke-dashoffset:0] motion-reduce:transition-none"
        />
      </svg>
    </h1>
  );
}
